import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {ClinicType} from "@/types/clinic";
import {dateFormatter} from "@/lib/utils.ts";
import {AiOutlineDelete} from "react-icons/ai";
import {FiEdit} from "react-icons/fi";
import {useNavigate} from "react-router-dom";

type ClinicTableProps = {
    data: ClinicType[],
    onDelete: (id: number) => void,
}

const ClinicsTable = ({data, onDelete}: ClinicTableProps) => {
    const navigate = useNavigate();

    return (
        <div className={"bg-white shadow rounded-md"}>
            <Table className="max-lg:w-[700px]">
                <TableHeader>
                    <TableRow>
                        <TableHead className={"min-w-56"}>ID</TableHead>
                        <TableHead className={"min-w-56"}>Name</TableHead>
                        <TableHead className={"min-w-40 pl-7"}>Logo</TableHead>
                        <TableHead className={"min-w-40"}>Description</TableHead>
                        <TableHead className={"min-w-40"}>CreatedAt</TableHead>
                        <TableHead className={"min-w-40"}>UpdatedAt</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {
                        data?.map(clinic => (
                            <TableRow key={clinic.id}>
                                <TableCell>{clinic.id}</TableCell>
                                <TableCell>{clinic.name}</TableCell>
                                <TableCell>
                                    <img src={clinic.logo} alt="logo-image" className={"w-24 h-14"}/>
                                </TableCell>
                                <TableCell>{clinic.descr.length <= 50 ? clinic.descr : `${clinic.descr.slice(0, 51)}...`}</TableCell>
                                <TableCell>{dateFormatter(clinic.createdAt)}</TableCell>
                                <TableCell>{dateFormatter(clinic.updatedAt)}</TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        <FiEdit
                                            onClick={() => navigate(`/edit/${clinic.id}`)}
                                            className="text-[18px] text-amber-700 opacity-60 cursor-pointer"
                                        />

                                        <AiOutlineDelete
                                            onClick={() => onDelete(clinic.id)}
                                            className={"text-[19px] text-destructive cursor-pointer"}
                                        />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
};

export default ClinicsTable;