import {z} from 'zod';




export const userSchema  = z.object({
    email : z.email(),
    name : z.string().min(1,'Name must be required').max(100,'Name must under 100 char')
})


export type userType = z.infer<typeof userSchema>;



