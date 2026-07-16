import { proxyActivities } from '@temporalio/workflow';

import type * as activities from '../activities/index.js';
import {mailType} from '../../utils/sendMail.js'


const { sendEmail : sendEmailActivity } = proxyActivities<typeof activities>({
    startToCloseTimeout: '5 minute',
    retry: {
        maximumAttempts: 1
    }
});


export async function sendMailWorkFlow(input : mailType){
    await sendEmailActivity(input);
}