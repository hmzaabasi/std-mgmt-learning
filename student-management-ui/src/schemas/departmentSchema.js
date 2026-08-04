import {z} from "zod"

export const departmentSchema=z.object({
    name:z
        .string()
        .trim()
        .min(1,"Department name is required.")
        .min(2, "Department name must be at least 2 characters.")
        .max(30, "Department name connot exceed 20 characters.")
})