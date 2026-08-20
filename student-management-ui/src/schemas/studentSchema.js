import {z} from "zod"
import { requiredNumber } from "./schemaHelpers"

export const studentSchema=z.object({
    name: z
    .string()
    .trim()
    .min(1,"Student name is required.")
    .min(3,"Student name must be at least three characters.")
    .max(50,"Student name cannot exceed 50 characters."),

    email: z
    .string()
    .trim()
    .min(1,"Email is required.")
    .email("Enter a valid email."),

   age: z.preprocess(
    (val) => {
        if (val === null || val === undefined || val === "") return undefined
        return Number(val)
    },
    z.union([
        z.undefined(),
        z.number().int("Age must be a whole number.").min(1, "Age must be greater than zero.")
    ])
).refine((val) => val !== undefined, { message: "Age is required." }),

   departmentId: requiredNumber("Please select a department.")
})