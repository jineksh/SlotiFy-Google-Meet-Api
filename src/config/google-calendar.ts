import { google } from 'googleapis'

import path from 'path';

const KEY_PATH = path.join(process.cwd(), 'src/config/booking-service-apis-640ef0ce4675.json');
const SCOPES = ['https://www.googleapis.com/auth/calendar'];


const auth = new google.auth.GoogleAuth({
    keyFile: KEY_PATH,
    scopes: SCOPES,
});


export const calendar = google.calendar({ version: 'v3', auth });