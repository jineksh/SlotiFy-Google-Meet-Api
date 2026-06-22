import 'dotenv/config';

export const PORT : number = process.env.PORT ? parseInt(process.env.PORT) : 5000;

export const DATABASE_URL : string = process.env.DATABASE_URL ? process.env.DATABASE_URL : 'postgresql://user:password@localhost:5432/mydatabase';