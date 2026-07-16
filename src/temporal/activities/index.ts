import {regenerateSlots, generateSlotsInput} from '../../service/slot-generation.service.js';
import {mailType,sendMail} from '../../utils/sendMail.js'



export async function regenerateSlotsActivity(input: generateSlotsInput) {
    await regenerateSlots(input);
}

export async function sendEmail(input : mailType ){
    await sendMail(input);
}
