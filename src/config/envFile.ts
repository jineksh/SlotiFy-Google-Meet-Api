import 'dotenv/config';

export const PORT : number = process.env.PORT ? parseInt(process.env.PORT) : 5000;

export const DATABASE_URL : string = process.env.DATABASE_URL ? process.env.DATABASE_URL : 'postgresql://user:password@localhost:5432/mydatabase';


export const TEMPORAL_ADDRESS : string = process.env.TEMPORAL_ADDRESS ? process.env.TEMPORAL_ADDRESS : 'localhost:7233';

export const TEMPORAL_NAMESPACE : string = process.env.TEMPORAL_NAMESPACE ? process.env.TEMPORAL_NAMESPACE : 'default';

export const TEMPORAL_TASK_QUEUE : string = process.env.TEMPORAL_TASK_QUEUE ? process.env.TEMPORAL_TASK_QUEUE : 'slotify-task-queue';


export const GMAIL_USER  = process.env.GMAIL_USER;

export const GMAIL_PASS = process.env.GMAIL_PASS;