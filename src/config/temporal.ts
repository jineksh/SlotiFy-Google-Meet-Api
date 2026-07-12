import { Connection, Client } from '@temporalio/client';
import { TEMPORAL_ADDRESS, TEMPORAL_NAMESPACE } from './envFile.js';

let client: Client | null = null;

export async function createTemporalClient() {

    if (client) {
        return client;
    }


    const connection = await Connection.connect({ address: TEMPORAL_ADDRESS });

    client = new Client({
        connection,
        namespace: TEMPORAL_NAMESPACE,
    });


    return client;

}

