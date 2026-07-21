import { calendar } from '../config/google-calendar.js'

import { GMAIL_USER } from '../config/envFile.js'

export interface CreateEventParams {
    title: string;
    description?: string;
    startTime: string;
    endTime: string;
    hostEmail: string;
    inviteeEmail: string;
    timeZone : string
}



export const createCalendarEvent = async (
    params: CreateEventParams
) => {
    try {
        const { title, description, startTime, endTime, hostEmail, inviteeEmail ,timeZone} = params;

        const eventPayload = {
            summary: 'EVENT',
            description,
            start: {
                dateTime: startTime,
                timeZone: timeZone,
            },
            end: {
                dateTime: endTime,
                timeZone: timeZone,
            },
            attendees: [
                { email: hostEmail },
                { email: inviteeEmail }
            ],
            conferenceData: {
                createRequest: {
                    requestId: `booking-${Date.now()}`,
                    conferenceSolutionKey: { type: 'hangoutsMeet' },
                },
            },
        };

        const response = await calendar.events.insert({
            calendarId: GMAIL_USER,
            requestBody: eventPayload,
            conferenceDataVersion: 1,
            sendUpdates: 'none',
        });

        // Null checks for Type Safety
        if (!response.data.id || !response.data.hangoutLink) {
            throw new Error('Google API failed to generate Event ID or Meet Link');
        }

        return {
            eventId: response.data.id,
            meetLink: response.data.hangoutLink,
        };
    } catch (error) {
        console.error('Error creating Google Calendar Event:', error);
        throw error;
    }
};