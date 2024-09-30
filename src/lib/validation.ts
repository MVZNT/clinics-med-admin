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
    website_url: z.any().optional(),
    instagram_url: z.any().optional(),
    youtube_url: z.any().optional(),
    telegram_url: z.any().optional(),
});

export const WorkingHoursSchema = z.object({
    day: z.any().optional(),
    startTime: z.any().optional(),
    endTime: z.any().optional(),
    lunchStartTime: z.any().optional(),
    lunchEndTime: z.any().optional(),
});
