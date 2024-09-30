import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {customToast, localizedDay} from "@/lib/utils.ts";
import {AiOutlineDelete} from "react-icons/ai";
import {FiEdit} from "react-icons/fi";
import {WorkingHoursType} from "@/types/working-hours";
import {useState} from "react";
import {useUpdateWorkingHoursModal} from "@/hooks/useZustand.ts";
import {useDeleteWorkingHours} from "@/hooks/useWorkingHours.ts";
import {DialogModal} from "@/components/ui/dialog.tsx";
import WorkingHoursForm from "@/components/forms/working-hours.tsx";

type ClinicTableProps = {
    data: WorkingHoursType[],
}

const WorkHoursTable = ({data}: ClinicTableProps) => {
    const [workingHours, setWorkingHours] = useState<WorkingHoursType>();

    const deleteWorkingHoursMutation = useDeleteWorkingHours()
    const updateWorkingHoursModal = useUpdateWorkingHoursModal();

    const onEdit = (id: number) => {
        const findWorkingHours = data?.find(item => item.id === id);
        if (!findWorkingHours) {
            return customToast("ERROR", "Working Hours is not found!")
        }

        setWorkingHours(findWorkingHours);
        updateWorkingHoursModal.onOpen()
    }

    const onDelete = (id: number) => {
        const isOk = confirm("Are you sure to delete?")
        if (isOk) {
            deleteWorkingHoursMutation.mutate(id)
        }
    }

    return (
        <>
            <DialogModal isOpen={updateWorkingHoursModal.isOpen} onClose={updateWorkingHoursModal.onClose}>
                <WorkingHoursForm clinicId={workingHours?.clinicId!} action={"EDIT"} data={workingHours}/>
            </DialogModal>

            <Table className="max-lg:w-[700px]">
                <TableHeader>
                    <TableRow>
                        {/*<TableHead className={"min-w-56"}>ID</TableHead>*/}
                        <TableHead className={"min-w-56"}>Day</TableHead>
                        <TableHead className={"min-w-40"}>LunchTime</TableHead>
                        <TableHead className={"min-w-40"}>Working Hours</TableHead>
                        {/*<TableHead className={"min-w-40"}>CreatedAt</TableHead>*/}
                        {/*<TableHead className={"min-w-40"}>UpdatedAt</TableHead>*/}
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        data?.map(workHours => (
                            <TableRow key={workHours.id}>
                                {/*<TableCell>{workHours.id}</TableCell>*/}
                                <TableCell>{localizedDay(workHours.day)}</TableCell>
                                <TableCell>{`${workHours.lunchStartTime}-${workHours.lunchEndTime}`}</TableCell>
                                <TableCell>{`${workHours.startTime}-${workHours.endTime}`}</TableCell>
                                {/*<TableCell>{dateFormatter(workHours.createdAt)}</TableCell>*/}
                                {/*<TableCell>{dateFormatter(workHours.updatedAt)}</TableCell>*/}
                                <TableCell>
                                    <div className="flex gap-2">
                                        <FiEdit
                                            onClick={() => onEdit(workHours.id)}
                                            className="text-[18px] text-amber-700 opacity-60 cursor-pointer"
                                        />

                                        <AiOutlineDelete
                                            onClick={() => onDelete(workHours.id)}
                                            className={"text-[19px] text-destructive cursor-pointer"}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
};

export default WorkHoursTable;