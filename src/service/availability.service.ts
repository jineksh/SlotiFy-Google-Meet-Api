import {
    createAvailability as createAvailabilityRepository,
    getAvailabilityById as getAvailabilityByIdRepository,
    getAvailabilitiesByUserId as getAvailabilitiesByUserIdRepository,
    updateAvailability as updateAvailabilityRepository,
    deleteAvailability as deleteAvailabilityRepository
} from '../repository/availability.repository.js';

import {
    createAvailabilityException as createAvailabilityExceptionRepository,
    getAvailabilityExceptionById as getAvailabilityExceptionByIdRepository,
    getAvailabilityExceptionsByUserId as getAvailabilityExceptionsByUserIdRepository,
    updateAvailabilityException as updateAvailabilityExceptionRepository,
    deleteAvailabilityException as deleteAvailabilityExceptionRepository
} from '../repository/availabilityException.repository.js';

import { badRequest, notFound } from '../utils/errorHandler.js';
import type {
    AvailabilityInput,
    AvailabilityUpdateInput
} from '../dtos/availability.dto.js';
import type {
    AvailabilityExceptionInput,
    AvailabilityExceptionUpdateInput
} from '../dtos/availabilityException.dto.js';

/**
 * Availability
 */
export async function createAvailabilityService(data: AvailabilityInput) {
    const availability = await createAvailabilityRepository(data);
    return availability;
}

// listRuleByID
export async function listRuleByIDService(id: number, ownerId: number) {
    if (!id || id <= 0) {
        throw badRequest('Invalid availability ID provided');
    }
    if (!ownerId || ownerId <= 0) {
        throw badRequest('Invalid owner ID provided');
    }

    const availability = await getAvailabilityByIdRepository(id);
    if (!availability) {
        throw notFound('Availability not found');
    }

    // enforce owner ownership
    if (availability.userId !== ownerId) {
        throw notFound('Availability not found');
    }

    return availability;
}

// listRuleByHost (by owner/user)
export async function listRuleByHostService(ownerId: number) {
    if (!ownerId || ownerId <= 0) {
        throw badRequest('Invalid owner ID provided');
    }

    const availabilities = await getAvailabilitiesByUserIdRepository(ownerId);
    return availabilities;
}

export async function updateAvailabilityService(
    id: number,
    ownerId: number,
    data: Partial<AvailabilityUpdateInput>
) {
    if (!id || id <= 0) {
        throw badRequest('Invalid availability ID provided');
    }
    if (!ownerId || ownerId <= 0) {
        throw badRequest('Invalid owner ID provided');
    }

    const existing = await getAvailabilityByIdRepository(id);
    if (!existing) {
        throw notFound('Availability not found to update');
    }

    if (existing.userId !== ownerId) {
        throw notFound('Availability not found to update');
    }

    const updated = await updateAvailabilityRepository(id, data as AvailabilityUpdateInput);
    return updated;
}

export async function deleteAvailabilityService(id: number, ownerId: number) {
    if (!id || id <= 0) {
        throw badRequest('Invalid availability ID provided');
    }
    if (!ownerId || ownerId <= 0) {
        throw badRequest('Invalid owner ID provided');
    }

    const existing = await getAvailabilityByIdRepository(id);
    if (!existing) {
        throw notFound('Availability not found to delete');
    }

    if (existing.userId !== ownerId) {
        throw notFound('Availability not found to delete');
    }

    const deleted = await deleteAvailabilityRepository(id);
    return deleted;
}

/**
 * AvailabilityException
 */
export async function createAvailabilityExceptionService(data: AvailabilityExceptionInput) {
    const exception = await createAvailabilityExceptionRepository(data);
    return exception;
}

// listRuleByID
export async function listRuleByIDExceptionService(id: number, ownerId: number) {
    if (!id || id <= 0) {
        throw badRequest('Invalid availability exception ID provided');
    }
    if (!ownerId || ownerId <= 0) {
        throw badRequest('Invalid owner ID provided');
    }

    const exception = await getAvailabilityExceptionByIdRepository(id);
    if (!exception) {
        throw notFound('Availability exception not found');
    }

    if (exception.userId !== ownerId) {
        throw notFound('Availability exception not found');
    }

    return exception;
}

// listRuleByHost (by owner/user)
export async function listRuleByHostExceptionService(ownerId: number) {
    if (!ownerId || ownerId <= 0) {
        throw badRequest('Invalid owner ID provided');
    }

    const exceptions = await getAvailabilityExceptionsByUserIdRepository(ownerId);
    return exceptions;
}

export async function updateAvailabilityExceptionService(
    id: number,
    ownerId: number,
    data: Partial<AvailabilityExceptionUpdateInput>
) {
    if (!id || id <= 0) {
        throw badRequest('Invalid availability exception ID provided');
    }
    if (!ownerId || ownerId <= 0) {
        throw badRequest('Invalid owner ID provided');
    }

    const existing = await getAvailabilityExceptionByIdRepository(id);
    if (!existing) {
        throw notFound('Availability exception not found to update');
    }

    if (existing.userId !== ownerId) {
        throw notFound('Availability exception not found to update');
    }

    const updated = await updateAvailabilityExceptionRepository(
        id,
        data as AvailabilityExceptionUpdateInput
    );
    return updated;
}

export async function deleteAvailabilityExceptionService(id: number, ownerId: number) {
    if (!id || id <= 0) {
        throw badRequest('Invalid availability exception ID provided');
    }
    if (!ownerId || ownerId <= 0) {
        throw badRequest('Invalid owner ID provided');
    }

    const existing = await getAvailabilityExceptionByIdRepository(id);
    if (!existing) {
        throw notFound('Availability exception not found to delete');
    }

    if (existing.userId !== ownerId) {
        throw notFound('Availability exception not found to delete');
    }

    const deleted = await deleteAvailabilityExceptionRepository(id);
    return deleted;
}

