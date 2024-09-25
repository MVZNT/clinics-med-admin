import {ClinicSchema} from "@/lib";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";

import {Form, FormControl, FormField, FormItem, FormMessage,} from "@/components/ui/form";
import {Button} from "../ui/button";
import {Input} from "../ui/input";
import {Textarea} from "@/components/ui/textarea.tsx";
import {ClinicType} from "@/types/clinic";
import Uploader from "@/components/ui/uploader.tsx";
import {useState} from "react";
import {customToast} from "@/lib/utils.ts";
import {useCreateClinic, useUpdateClinic} from "@/hooks/useClinic.ts";


type ClinicFormType = {
    action: "CREATE" | "EDIT",
    data?: ClinicType
}

const ClinicForm = ({action, data}: ClinicFormType) => {
    const [image, setImage] = useState<File>();

    const createClinicMutation = useCreateClinic();
    const updateClinicMutation = useUpdateClinic()

    console.log(data)

    const form = useForm<z.infer<typeof ClinicSchema>>({
        resolver: zodResolver(ClinicSchema),
        defaultValues: {
            name: data?.name,
            descr: data?.descr,
            image: data?.image,
        }
    });

    function onSubmit(values: z.infer<typeof ClinicSchema>) {
        if (!image && action === "CREATE") {
            return customToast("ERROR", "Please upload image!")
        }

        const formData = new FormData();

        if (image) {
            formData.append("image", image!);
        }
        
        formData.append("name", values.name)
        formData.append("descr", values.descr);

        if (action === "CREATE") {
            createClinicMutation.mutate(formData as any)
        } else {
            updateClinicMutation.mutate({
                id: data?.id!,
                data: formData as any,
            })
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
            >
                <h1 className="text-[22px] font-semibold text-center">{action === "CREATE" ? "Create Clinic" : "Update Clinic"}</h1>

                <div className="flex flex-col gap-2">
                    {/* Name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="name" {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Description */}
                    <FormField
                        control={form.control}
                        name="descr"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea placeholder="description"  {...field} />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />

                    {/* Image */}
                    <Uploader placeholder={"Upload"} setFile={setImage} url={data?.image}/>

                    <Button isLoading={createClinicMutation.isPending || updateClinicMutation.isPending}>Create</Button>
                </div>
            </form>
        </Form>
    );
};

export default ClinicForm;
