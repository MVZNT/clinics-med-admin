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
    logo: z.any().optional(),
    images: z.any().optional(),
    descr: z.string({required_error: "Required!"}).min(1, "Required!"),
    location: z.string({required_error: "Required!"}).min(1, "Required!"),
    phone_number: z.string({required_error: "Required!"}),
    website_url: z.string().optional(),
    instagram_url: z.string().optional(),
    youtube_url: z.string().optional(),
    telegram_url: z.string().optional(),
    daily_work_start_time: z.string().optional(),
    daily_work_end_time: z.string().optional()
});
