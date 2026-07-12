import {createTemporalClient} from '../config/temporal.js';
import { generateSlotsInput } from '../service/slot-generation.service.js';


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
    return startWorkflow('regenerateSlotsWorkflow', `generate-host-slots|${input.hostId}`, 'slot-generation', [input]);
}


