import {z} from "zod";

export const registerSchema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    phone: z.number().min(10).max(15),
    password: z.string().min(6).max(255),
});