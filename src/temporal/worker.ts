import { Worker } from '@temporalio/worker';
import * as activities from './activities/index.js';
import { TEMPORAL_TASK_QUEUE } from '../config/envFile.js';
import { fileURLToPath } from 'url';

async function run() {

    const worker = await Worker.create({
        workflowsPath: fileURLToPath(new URL('./workflows/index.ts', import.meta.url)),
        activities,
        taskQueue: TEMPORAL_TASK_QUEUE,
    });

    console.log('[temporal] :  Worker is online and listening for tasks...');


    await worker.run();
}


run().catch((err) => {
    console.error('[temporal] :  Worker failed to start', err);
    process.exit(1);
});