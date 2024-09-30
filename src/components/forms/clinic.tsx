import {ClinicSchema} from "@/lib";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {ClinicType} from "@/types/clinic";
import {useState} from "react";
import {customToast} from "@/lib/utils.ts";
import {useCreateClinic, useUpdateClinic} from "@/hooks/useClinic.ts";
import {Input, MaskInput} from "@/components/ui/input.tsx";
import Uploader from "@/components/ui/uploader.tsx";
import MultiUploader from "@/components/ui/multi-uploader.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import Select from "react-select"
import {regionsData} from "@/constants";


type ClinicFormType = {
    action: "CREATE" | "EDIT",
    data?: ClinicType
}

const ClinicForm = ({action, data}: ClinicFormType) => {
    const [logo, setLogo] = useState<File>();
    const [files, setFiles] = useState<File[]>([]);

    const [deletedImages, setDeletedImages] = useState<any>([]);
    const [regionId, setRegionId] = useState<number>();

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

        if (regionId) {
            formData.append("regionId", regionId.toString())
        }

        if (values.website_url) {
            formData.append("website_url", values.website_url)
        }

        if (values.telegram_url) {
            formData.append("telegram_url", values.telegram_url)
        }

        if (values.instagram_url) {
            formData.append("instagram_url", values.instagram_url)
        }

        if (values.youtube_url) {
            formData.append("youtube_url", values.youtube_url)
        }


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
                className="flex flex-col gap-5 bg-white p-4 border shadow rounded-md"
            >
                <div className={"grid grid-cols-4 gap-5 "}>
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
                        <span className={"text-sm font-medium"}>Region:</span>
                        <Select
                            options={regionsData.map(region => {
                                return {
                                    value: region.id,
                                    label: region.name,
                                }
                            })}
                            placeholder={"Choose"}
                            className={"text-sm"}
                            defaultValue={data?.regionId ? {
                                value: regionsData.find(region => region.id === data?.regionId)?.id,
                                label: regionsData.find(region => region.id === data?.regionId)?.name,
                            } : undefined}
                            onChange={(selectedOption: any) => setRegionId(selectedOption?.value)}
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

                <div className={`flex ${action === "CREATE" ? "justify-end" : "justify-start"}`}>
                    <Button
                        isLoading={createClinicMutation.isPending || updateClinicMutation.isPending}
                    >
                        {action === "CREATE" ? "Create clinic" : "Save changes"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default ClinicForm;
