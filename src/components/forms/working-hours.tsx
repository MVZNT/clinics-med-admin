import {WorkingHoursSchema} from "@/lib";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";

import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage,} from "@/components/ui/form";
import {Button} from "@/components/ui/button.tsx";
import {WorkingHoursType} from "@/types/working-hours";
import Select from "react-select";
import {customToast, weekDays} from "@/lib/utils";
import {useState} from "react";
import {MaskInput} from "../ui/input";
import {useCreateWorkingHours, useGetWorkingHours, useUpdateWorkingHours} from "@/hooks/useWorkingHours.ts";


type ClinicFormType = {
    action: "CREATE" | "EDIT",
    data?: WorkingHoursType,
    clinicId: number,
}

const WorkingHoursForm = ({action, data, clinicId}: ClinicFormType) => {
    const [day, setWorkDay] = useState<string[] | string>(data?.day!)

    const createWorkingHoursMutation = useCreateWorkingHours()
    const updateWorkingHoursMutation = useUpdateWorkingHours()

    const getWorkingHours = useGetWorkingHours(+clinicId!)
    const workingHoursData: WorkingHoursType[] = getWorkingHours.data?.data?.workingHours

    const form = useForm<z.infer<typeof WorkingHoursSchema>>({
        resolver: zodResolver(WorkingHoursSchema),
        defaultValues: {
            startTime: data?.startTime,
            endTime: data?.endTime,
            lunchStartTime: data?.lunchStartTime,
            lunchEndTime: data?.lunchEndTime,
        }
    });

    function onSubmit(values: z.infer<typeof WorkingHoursSchema>) {
        if (!day || day?.length === 0) {
            return customToast("ERROR", "Please choose day!")
        }

        values.day = day
        if (action === "CREATE") {
            delete values.day
            // @ts-ignore
            values["days"] = day
            createWorkingHoursMutation.mutate({
                ...values,
                clinicId,
            })
        } else {
            updateWorkingHoursMutation.mutate({
                id: data?.id!,
                data: {
                    clinicId,
                    ...values
                }
            })
        }
    }

    if (getWorkingHours.isLoading) {
        return <h1>loading...</h1>
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
            >
                <h1 className="text-[22px] font-semibold text-center">
                    {action === "CREATE" ? "Create working hours" : "Update working hours"}
                </h1>

                <div className={"flex flex-col gap-2"}>
                    <span className={"font-medium text-sm"}>Day</span>

                    {
                        action === "EDIT" ?
                            <Select
                                className="text-sm"
                                defaultValue={data?.day
                                    ? {
                                        value: weekDays.find(day => day.value === data.day)?.value,
                                        label: weekDays.find(day => day.value === data.day)?.label
                                    }
                                    : undefined
                                }
                                onChange={(selectedOption) => setWorkDay(selectedOption?.value!)}
                                options={weekDays
                                    .filter(day => !workingHoursData?.some(workingDay => workingDay?.day === day.value))
                                    .map(day => ({
                                        value: day.value,
                                        label: day.label,
                                    }))}
                            /> :
                            <Select
                                isMulti
                                className="text-sm"
                                defaultValue={data?.day
                                    ? {
                                        value: weekDays.find(day => day.value === data.day)?.value,
                                        label: weekDays.find(day => day.value === data.day)?.label
                                    }
                                    : undefined
                                }
                                onChange={(selectedOption) => setWorkDay(selectedOption?.map(option => option.value!))}
                                options={weekDays
                                    .filter(day => !workingHoursData?.some(workingDay => workingDay?.day === day.value))
                                    .map(day => ({
                                        value: day.value,
                                        label: day.label,
                                    }))}
                            />
                    }
                </div>

                <div className={"grid grid-cols-2 gap-5"}>
                    <FormField
                        control={form.control}
                        name="startTime"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Start Time:</FormLabel>
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
                        name="endTime"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>End Time:</FormLabel>
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
                        name="lunchStartTime"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Lunch Time (Start):</FormLabel>
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
                        name="lunchEndTime"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Lunch Time (End):</FormLabel>
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

                <div className={`flex ${action === "CREATE" ? "justify-end" : "justify-start"}`}>
                    <Button
                        isLoading={createWorkingHoursMutation.isPending || updateWorkingHoursMutation.isPending}
                    >
                        {action === "CREATE" ? "Create" : "Save changes"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default WorkingHoursForm;
