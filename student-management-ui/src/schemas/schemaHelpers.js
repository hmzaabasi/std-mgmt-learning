import {z} from "zod"

export const requiredNumber = (message) => {
    return z.number().optional().refine((value) => value !== undefined, {
        message,
    });
};