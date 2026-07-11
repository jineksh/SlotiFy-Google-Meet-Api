import { DateTime, Interval } from 'luxon';

export interface TimeWindow {
    start: DateTime,
    end: DateTime
}

/**
 * Takes a date and a "HH:mm" time string, and returns a DateTime
 * that combines the date with that time, in the given timezone.
 *
 * @example
 * const date = DateTime.fromISO('2024-06-10');
 * const result = parseTimeonDate(date, "09:30", "Asia/Kolkata");
 * // result => 2024-06-10T09:30:00.000+05:30
 */
export function parseTimeonDate(date: DateTime, time: string, timezone: string) {

    const [hour, minute] = time.split(":").map(Number);

    return date.setZone(timezone).set({
        hour,
        minute,
        second: 0,
        millisecond: 0,
    })
}

/**
 * Merges overlapping or touching TimeWindows into a minimal set of
 * non-overlapping windows.
 *
 * @example
 * mergeWindows([
 *   { start: DateTime.fromISO("2024-06-10T09:00"), end: DateTime.fromISO("2024-06-10T10:00") },
 *   { start: DateTime.fromISO("2024-06-10T09:30"), end: DateTime.fromISO("2024-06-10T11:00") },
 * ]);
 * // => [{ start: 09:00, end: 11:00 }]
 */
export function mergeWindows(windows: TimeWindow[]): TimeWindow[] {
    if (windows.length === 0) return [];

    const intervals = windows
        .map(w => Interval.fromDateTimes(w.start, w.end))


    const merged = Interval.merge(intervals);

    return merged.map(i => ({
        start: i.start!,
        end: i.end!
    }));
}

/**
 * Returns a single-day TimeWindow (start-end) for a given date, ONLY if
 * that date falls on the specified weekday. Otherwise returns an empty array.
 *
 * weekday follows JS convention: 0 = Sunday, 1 = Monday, ..., 6 = Saturday.
 *
 * @example
 * // date is a Monday
 * windowsforWeekday(DateTime.fromISO("2024-06-10"), "09:00", "17:00", 1, "Asia/Kolkata");
 * // => [{ start: 2024-06-10T09:00, end: 2024-06-10T17:00 }]
 *
 * @example
 * // date is a Monday, but weekday asked is Tuesday (2) -> no match
 * windowsforWeekday(DateTime.fromISO("2024-06-10"), "09:00", "17:00", 2, "Asia/Kolkata");
 * // => []
 */
export function windowsforWeekday(date: DateTime, startTime: string, endTime: string, weekday: number, timeZone: string): TimeWindow[] {

    const localDate = date.setZone(timeZone).startOf('day');
    const luxonWeekday = weekday === 0 ? 7 : weekday;

    if (localDate.weekday !== luxonWeekday) return [];

    const start = parseTimeonDate(localDate, startTime, timeZone);
    const end = parseTimeonDate(localDate, endTime, timeZone);

    if (!start.isValid || !end.isValid || start >= end) return [];

    return [{ start, end }];


}

/**
 * Subtracts a "blocked" TimeWindow from a list of TimeWindows, splitting
 * any window that overlaps the block into the remaining (non-blocked) pieces.
 *
 * @example
 * subtractWindows(
 *   [{ start: 09:00, end: 17:00 }],
 *   { start: 12:00, end: 13:00 }
 * );
 * // => [{ start: 09:00, end: 12:00 }, { start: 13:00, end: 17:00 }]
 *
 * @example
 * // Block fully covers the window -> nothing left
 * subtractWindows(
 *   [{ start: 09:00, end: 10:00 }],
 *   { start: 08:00, end: 11:00 }
 * );
 * // => []
 */
export function subtractWindows(windows: TimeWindow[], block: TimeWindow): TimeWindow[] {



    const results: TimeWindow[] = []

    for (const window of windows) {
        const interval = Interval.fromDateTimes(window.start, window.end);
        const blockInterval = Interval.fromDateTimes(block.start, block.end);

        // No overlap at all -> keep window untouched
        if (!interval.overlaps(blockInterval)) {
            results.push(window);
            continue;
        }

        // Keep the portion of the window that comes BEFORE the block starts
        if (block.start > window.start) {
            results.push({
                start: window.start,
                end: block.start
            })
        }

        // Keep the portion of the window that comes AFTER the block ends
        if (window.end > block.end) {
            results.push({
                start: block.end,
                end: window.end
            })
        }



    }

    // Drop any zero/negative-length leftovers
    return results.filter((w) => w.end >= w.start);



}

/**
 * Applies a list of date-specific exceptions (full-day block, partial-day
 * block, or extra available window) on top of a base list of TimeWindows
 * for a given date, and returns the resulting merged windows.
 *
 * @example
 * applyExceptionForDate(
 *   [{ start: 09:00, end: 17:00 }],
 *   [{ type: "BLOCK_PARTIAL_DAY", startTime: "12:00", endTime: "13:00", timezone: "Asia/Kolkata" }],
 *   DateTime.fromISO("2024-06-10")
 * );
 * // => [{ start: 09:00, end: 12:00 }, { start: 13:00, end: 17:00 }]
 *
 * @example
 * // Full-day block wipes out all availability regardless of other exceptions
 * applyExceptionForDate(
 *   [{ start: 09:00, end: 17:00 }],
 *   [{ type: "BLOCK_FULL_DAY", startTime: "", endTime: "", timezone: "Asia/Kolkata" }],
 *   DateTime.fromISO("2024-06-10")
 * );
 * // => []
 */
export function applyExceptionForDate(
    window: TimeWindow[],
    ex: Array<{
        type: string,
        startTime: string,
        endTime: string,
        timezone: string
    }>,
    date: DateTime
): TimeWindow[] {

    let baseWindow = [...window];

    for (const e of ex) {

        // A full-day block wipes out ALL availability for this date immediately
        if (e.type === 'BLOCK_FULL_DAY') {
            return [];
        }

        // A partial-day block removes a chunk of time from existing windows
        if (e.type === 'BLOCK_PARTIAL_DAY' && e.startTime && e.endTime) {
            const blockInterval = {
                start: parseTimeonDate(date, e.startTime, e.timezone),
                end: parseTimeonDate(date, e.endTime, e.timezone)
            };

            baseWindow = subtractWindows(baseWindow, blockInterval);
        }

        // Adds an extra window of availability (e.g. a one-off extra slot)
        if (e.type === 'ADD_AVAILABLE_WINDOW' && e.startTime && e.endTime) {
            baseWindow.push({
                start: parseTimeonDate(date, e.startTime, e.timezone),
                end: parseTimeonDate(date, e.endTime, e.timezone),
            });
        }
    }

    // Merge in case ADD_AVAILABLE_WINDOW created overlaps with existing windows
    return mergeWindows(baseWindow);
}


/**
 * Generates bookable slots inside a list of TimeWindows, given a fixed
 * meeting duration plus buffer time required before and after each meeting.
 *
 * NOTE: the returned start/end currently represent only the bookable
 * (duration) portion of each slot -- NOT including the surrounding buffer.
 * The buffer time is reserved (it affects where the next slot starts) but
 * is not reflected in the start/end of the slot itself.
 *
 * @example
 * generateSlots(5, 5, 30, [{ start: 09:00, end: 10:00 }]);
 * // Slot 1: cursor=09:00 -> { start: 09:00, end: 09:30 }, cursor moves to 09:40
 * // Slot 2: cursor=09:40 -> { start: 09:40, end: 10:10 } -> exceeds window.end (10:00), loop stops
 * // => [{ start: 09:00, end: 09:30 }]
 */
export function generateSlots(bufferBeforeMinutes: number, bufferAfterMinutes: number, durationMinutes: number, windows: TimeWindow[]): TimeWindow[] {


    let slots: TimeWindow[] = [];

    for (const window of windows) {

        let cursor = window.start;

        const totalMinutes = durationMinutes + bufferBeforeMinutes + bufferAfterMinutes;

        while (cursor.plus({ minutes: totalMinutes }) <= window.end) {



            const slotStart = cursor.plus({ minutes: bufferBeforeMinutes });

            const slotEnd = slotStart.plus({ minutes: durationMinutes });

            // Advance cursor past this slot's duration AND both buffers,
            // so the next slot doesn't start inside the buffer window.
            cursor = cursor.plus({ minutes: totalMinutes });

            slots.push({
                start: slotStart,
                end: slotEnd
            })

            // cursor at 9 slotStart : 9:05 slotEnd : 9:35 next cursor : 9:40 
            // next slot look like 9:45 to 10:15 next cursor 10:20


        }

    }


    return slots;



}




export function overlapsBooked(
    slot: TimeWindow,
    bookedWindows: TimeWindow[],
    bufferBeforeMinutes: number,
    bufferAfterMinutes: number
): boolean {

    // 1. Pad the candidate slot with its required buffers
    const paddedStart = slot.start.minus({ minutes: bufferBeforeMinutes });
    const paddedEnd = slot.end.plus({ minutes: bufferAfterMinutes });
    const candidateInterval = Interval.fromDateTimes(paddedStart, paddedEnd);

    // 2. Check if this padded window collides with ANY booked event
    return bookedWindows.some((booked) => {
        const bookedInterval = Interval.fromDateTimes(booked.start, booked.end);
        return candidateInterval.overlaps(bookedInterval);
    });
}