import {ClinicSchema} from "@/lib";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {ClinicType} from "@/types/clinic";
import {useState} from "react";
import {customToast, weekDays} from "@/lib/utils.ts";
import {useCreateClinic, useUpdateClinic} from "@/hooks/useClinic.ts";
import {Input, MaskInput} from "@/components/ui/input.tsx";
import Select from "react-select"
import Uploader from "@/components/ui/uploader.tsx";
import MultiUploader from "@/components/ui/multi-uploader.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";


type ClinicFormType = {
    action: "CREATE" | "EDIT",
    data?: ClinicType
}

const ClinicForm = ({action, data}: ClinicFormType) => {
    const [logo, setLogo] = useState<File>();
    const [files, setFiles] = useState<File[]>([]);

    const [week_start_day, setWeekStartDay] = useState()
    const [week_end_day, setWeekEndDay] = useState()
    const [deletedImages, setDeletedImages] = useState<any>([]);

    const createClinicMutation = useCreateClinic();
    const updateClinicMutation = useUpdateClinic()

    const form = useForm<z.infer<typeof ClinicSchema>>({
        resolver: zodResolver(ClinicSchema),
        defaultValues: {
            name: data?.name,
            descr: data?.descr,
            youtube_url: data?.youtube_url,
            instagram_url: data?.instagram_url,
            telegram_url: data?.instagram_url,
            website_url: data?.website_url,
            phone_number: data?.phone_number,
            location: data?.location,
            daily_work_start_time: data?.daily_work_start_time,
            daily_work_end_time: data?.daily_work_end_time,
        }
    });

    function onSubmit(values: z.infer<typeof ClinicSchema>) {
        if (!logo && action === "CREATE") {
            return customToast("ERROR", "Please upload image!")
        }

        const formData = new FormData();

        if (logo) {
            formData.append("logo", logo!);
        }

        if (files.length !== 0) {
            files.forEach((file) => {
                formData.append("images", file)
            })
        }


        deletedImages.forEach((id: any) => {
            formData.append("deletedImageIds", String(id))
        })

        formData.append("name", values.name)
        formData.append("descr", values.descr);
        formData.append("location", values.location)
        formData.append("phone_number", values.phone_number)
        formData.append("website_url", values.website_url)
        formData.append("telegram_url", values.telegram_url)
        formData.append("instagram_url", values.instagram_url)
        formData.append("youtube_url", values.youtube_url)

        if (week_start_day) {
            formData.append("week_start_day", week_start_day)
        }

        if (week_end_day) {
            formData.append("week_end_day", week_end_day)
        }

        if (values.daily_work_start_time) {
            formData.append("daily_work_start_time", values.daily_work_start_time)
        }

        if (values.daily_work_end_time) {
            formData.append("daily_work_end_time", values.daily_work_end_time)
        }

        console.log(logo)

        if (action === "CREATE") {
            createClinicMutation.mutate(formData as any)
        } else {
            updateClinicMutation.mutate({
                id: data?.id!,
                data: formData as any,
            })
        }
    }


    // @ts-ignore
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
            >
                <h1 className="text-[22px] font-semibold text-center">{action === "CREATE" ? "Create Clinic" : "Update Clinic"}</h1>


                <div className={"grid grid-cols-3 gap-5 "}>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Name:</FormLabel>
                                <FormControl>
                                    <Input placeholder="name" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone_number"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Phone:</FormLabel>
                                <FormControl>
                                    <MaskInput placeholder="+" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="location"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Location:</FormLabel>
                                <FormControl>
                                    <Input placeholder="1233,1223" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <div className={"flex flex-col gap-2"}>
                        <h1 className={"font-medium text-sm"}>Week day (start)</h1>
                        <Select
                            className="text-sm"
                            defaultValue={data?.week_start_day
                                ? {
                                    value: weekDays.find(day => day.value === data.week_start_day)?.value,
                                    label: weekDays.find(day => day.value === data.week_start_day)?.label
                                }
                                : undefined
                            }
                            onChange={(selectedOption: any) => setWeekStartDay(selectedOption?.value)}
                            options={weekDays.map(day => ({
                                value: day.value,
                                label: day.label,
                            }))}
                        />
                    </div>


                    <div className={"flex flex-col gap-2"}>
                        <h1 className={"font-medium text-sm"}>Week day (end)</h1>
                        <Select
                            className="text-sm"
                            defaultValue={data?.week_end_day
                                ? {
                                    value: weekDays.find(day => day.value === data.week_end_day)?.value,
                                    label: weekDays.find(day => day.value === data.week_end_day)?.label
                                }
                                : undefined
                            }
                            onChange={(selectedOption: any) => setWeekEndDay(selectedOption?.value)}
                            options={weekDays.map(day => ({
                                value: day.value,
                                label: day.label,
                            }))}
                        />
                    </div>

                    <div className={"grid grid-cols-2 gap-5"}>
                        <FormField
                            control={form.control}
                            name="daily_work_start_time"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Time (start):</FormLabel>
                                    <FormControl>
                                        <MaskInput
                                            mask={"99:99"}
                                            placeholder={"00:00"}
                                            className={"text-sm"}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="daily_work_end_time"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Time (end):</FormLabel>
                                    <FormControl>
                                        <MaskInput
                                            mask={"99:99"}
                                            placeholder={"00:00"}
                                            className={"text-sm"}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />

                    </div>
                </div>

                <div className={"grid grid-cols-4 gap-5"}>
                    <FormField
                        control={form.control}
                        name="website_url"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Website:</FormLabel>
                                <FormControl>
                                    <Input placeholder={"enter url"} {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="telegram_url"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Telegram:</FormLabel>
                                <FormControl>
                                    <Input placeholder={"enter url"} {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="instagram_url"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Instagram:</FormLabel>
                                <FormControl>
                                    <Input placeholder={"enter url"} {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="youtube_url"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Youtube:</FormLabel>
                                <FormControl>
                                    <Input placeholder={"enter url"} {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                </div>

                <div className={"flex gap-5"}>
                    <FormField
                        control={form.control}
                        name="descr"
                        render={({field}) => (
                            <FormItem className={"w-2/3"}>
                                <FormLabel>Description:</FormLabel>
                                <FormControl>
                                    <Textarea placeholder={"enter decription..."} {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    <div className={"flex flex-col gap-2 w-1/3"}>
                        <span className={"font-medium"}>Logo:</span>
                        <Uploader name={"logo"} setFile={setLogo} url={data?.logo}/>
                    </div>
                </div>

                <div className={"flex flex-col gap-2 w-full"}>
                    <span className={"font-medium"}>Rasmlar:</span>
                    <div className={"w-full"}>
                        <MultiUploader
                            deletedItems={deletedImages}
                            action={action}
                            files={files}
                            setFiles={setFiles}
                            type={"MULTIPLE"}
                            items={data?.images}
                            setDeletedItems={(id) => setDeletedImages((prev: any) => [...prev, id])}
                        />
                    </div>
                </div>

                <div className={"flex justify-center"}>
                    <Button
                        isLoading={createClinicMutation.isPending || updateClinicMutation.isPending}
                        className={"w-1/4"}
                    >
                        Qo'shish
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default ClinicForm;
