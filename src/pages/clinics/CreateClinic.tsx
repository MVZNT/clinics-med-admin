import {Navbar} from "@/components";
import ClinicForm from "@/components/forms/clinic.tsx";

const CreateClinic = () => {
    return (
        <>
            <Navbar name={"Create clinic"}/>

            <ClinicForm action={"CREATE"}/>
        </>
    );
};

export default CreateClinic;