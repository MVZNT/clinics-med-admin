import {Navbar} from "@/components";
import {useParams} from "react-router-dom";
import {useGetSingleClinic} from "@/hooks/useClinic.ts";
import {ClinicType} from "@/types/clinic";
import ClinicForm from "@/components/forms/clinic.tsx";
import {Button} from "@/components/ui/button.tsx";
import WorkHoursTable from "@/components/tables/work-hours.tsx";
import {useGetWorkingHours} from "@/hooks/useWorkingHours.ts";
import {WorkingHoursType} from "@/types/working-hours";
import StateShower from "@/components/stateShower.tsx";
import {useCreateWorkingHoursModal} from "@/hooks/useZustand.ts";
import {DialogModal} from "@/components/ui/dialog.tsx";
import WorkingHoursForm from "@/components/forms/working-hours.tsx";

const EditClinic = () => {
    const {clinicId} = useParams();

    if (!clinicId) {
        return <h1>Clinic id is missed!</h1>
    }

    const getSingleClinicQuery = useGetSingleClinic(+clinicId)
    const getWorkingHours = useGetWorkingHours(+clinicId!)

    const clinicsData: ClinicType = getSingleClinicQuery.data?.data?.info
    const workingHoursData: WorkingHoursType[] = getWorkingHours.data?.data?.workingHours

    const createWorkingHoursModal = useCreateWorkingHoursModal()

    if (getSingleClinicQuery.isFetching || getWorkingHours.isLoading) {
        return <StateShower id={"loading"} name={"Loading..."}/>
    }

    if (getSingleClinicQuery.isError || getWorkingHours.isError) {
        return <StateShower id={"error"} name={"Error while fetching clinic info!"}/>
    }

    return (
        <>
            <Navbar name={"Edit clinic"}/>

            <ClinicForm action={"EDIT"} data={clinicsData}/>

            <DialogModal isOpen={createWorkingHoursModal.isOpen} onClose={createWorkingHoursModal.onClose}>
                <WorkingHoursForm action={"CREATE"} clinicId={+clinicId}/>
            </DialogModal>

            <div className={"bg-white p-4 rounded-md shadow flex flex-col gap-5"}>
                <div className={"flex justify-end"}>
                    <Button
                        onClick={createWorkingHoursModal.onOpen}
                        className={`${workingHoursData?.length === 7 && "hidden"}`}
                    >
                        + Add working hours
                    </Button>
                </div>

                {
                    workingHoursData?.length === 0 ?
                        <StateShower id={"no_data"} name={"No working hours found!"}/>
                        : <WorkHoursTable data={workingHoursData}/>
                }
            </div>
        </>
    );
};

export default EditClinic;