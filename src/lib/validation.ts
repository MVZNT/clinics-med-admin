import * as z from "zod";

export const LoginSchema = z.object({
    username: z
        .string({
            required_error: "username is required!",
        })
        .min(1, "username is required!"),
    password: z
        .string({
            required_error: "password is required!",
        })
        .min(1, "password is required!"),
});

export const ClinicSchema = z.object({
    name: z.string({required_error: "Required!"}).min(1, "Required!"),
    image: z.any().optional(),
    descr: z.string({required_error: "Required!"}).min(1, "Required!"),
});
