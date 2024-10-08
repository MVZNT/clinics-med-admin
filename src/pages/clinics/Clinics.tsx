import {Navbar} from "../../components";
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import ClinicsTable from "@/components/tables/clinics.tsx";
import {useEffect, useState} from "react";
import {useDeleteClinic, useGetClinics} from "@/hooks/useClinic.ts";
import {GetClinicsType} from "@/types/clinic";
import {Pagination} from "antd";
import StateShower from "@/components/stateShower.tsx";
import {useNavigate} from "react-router-dom";

const Clinics = () => {
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [keyword, setKeyword] = useState<string>("");

    const getClinicsQuery = useGetClinics(page, limit, keyword);
    const clinicsData: GetClinicsType = getClinicsQuery.data?.data

    const deleteClinicMutation = useDeleteClinic()

    const navigate = useNavigate();

    const onDelete = (id: number) => {
        const isOk = confirm("Are you sure to delete clinic!")
        if (isOk) {
            deleteClinicMutation.mutate(id)
        }
    }

    useEffect(() => {
        getClinicsQuery.refetch()
    }, [keyword, page, limit]);

    return (
        <>
            <Navbar name="Clinics"/>
            
            <div className={"flex justify-between"}>
                <div className={"w-1/4"}>
                    <Input placeholder={"Search"} onChange={(e) => setKeyword(e.target.value)}/>
                </div>

                <Button onClick={() => navigate("/create")}>+ Add clinic</Button>
            </div>

            {
                getClinicsQuery.isLoading || deleteClinicMutation.isPending
                    ? <StateShower id={"loading"} name={"Loading..."}/>
                    : clinicsData?.clinics?.length === 0
                        ? <StateShower id={"no_data"} name={"No data found!"}/>
                        : <>
                            <ClinicsTable
                                onDelete={onDelete}
                                data={clinicsData?.clinics}
                            />

                            <Pagination
                                showSizeChanger
                                defaultCurrent={clinicsData?.meta?.currentPage}
                                total={clinicsData?.meta?.totalClinics}
                                pageSizeOptions={[5, 10, 20]}
                                pageSize={limit}
                                onChange={(page: number, pageSize: number) => {
                                    setPage(page);
                                    setLimit(pageSize);
                                }}
                            />
                        </>
            }
        </>
    );
};

export default Clinics;
