import {createTemporalClient} from '../config/temporal.js';
import { generateSlotsInput } from '../service/slot-generation.service.js';
import {mailType} from '../utils/sendMail.js'

import { TEMPORAL_TASK_QUEUE } from '../config/envFile.js';

export async function startWorkflow(workflowName: string,workflowId : string,taskQueue: string, args : any[]) {



    try{
        const client = await createTemporalClient();
        const handle = await client.workflow.start(workflowName, {
            taskQueue: taskQueue,
            workflowId: workflowId,
            args: args
        });

        return handle.workflowId;
    }
    catch(err){
        console.error('[temporal] : Error starting workflow:', err);
        throw err;
    }


}

export function regenerateSlotsWorkflow(input : generateSlotsInput) {
    return startWorkflow('regenerateSlotsWorkflow', `generate-host-slots|${input.hostId}`, TEMPORAL_TASK_QUEUE, [input]);
}


export function sendMailWorkflow(input : mailType){
    return startWorkflow('sendMailWorkFlow',`sendMail|${input.inviteeEmail}|${input.time}`,TEMPORAL_TASK_QUEUE,[input]);
}

