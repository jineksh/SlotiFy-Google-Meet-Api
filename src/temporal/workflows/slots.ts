import { proxyActivities } from '@temporalio/workflow';

import type * as activities from '../activities/index.js';


const { regenerateSlotsActivity } = proxyActivities<typeof activities>({
    startToCloseTimeout: '10 minute',
    retry: {
        maximumAttempts: 5
    }
});


export async function regenerateSlotsWorkflow(input: {
    hostId: number,
    from?: string,
    to?: string

}) {
    await regenerateSlotsActivity(input);
}