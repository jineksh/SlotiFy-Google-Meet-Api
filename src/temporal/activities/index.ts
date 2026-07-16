import {regenerateSlots, generateSlotsInput} from '../../service/slot-generation.service.js';


export async function regenerateSlotsActivity(input: generateSlotsInput) {
    await regenerateSlots(input);
}


