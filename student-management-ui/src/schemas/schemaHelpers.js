import { z } from "zod"

export const requiredNumber = (message) => {
    return z
        .number({ invalid_type_error: message })
        .nullable()
        .refine((val) => val !== null, { message })
}