import {useMutation, useQuery} from "@tanstack/react-query";
import {queryKeys} from "@/hooks/queryKeys.ts";
import {customToast} from "@/lib/utils.ts";
import {api} from "@/services/configs";
import {queryClient} from "@/main.tsx";
import {useUpdateClinicModal} from "@/hooks/useZustand.ts";
import {useNavigate} from "react-router-dom";

export const useCreateClinic = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationKey: [queryKeys.CREATE_CLINIC],
        mutationFn: async (data: any) => {
            return await api.post("/clinics", data)
        },
        onSuccess(res) {
            customToast("SUCCESS", "Clinic is created successfully!");
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_CLINICS],
            })
            navigate(`/edit/${res.data?.info?.id}`);
        },
        onError(error: any) {
            console.log(error);
            customToast(
                "ERROR",
                error?.response?.data?.message || "Error while logging in to account!"
            );
        },
    });
};

export const useGetClinics = (page: number, limit: number, keyword?: string) => {
    return useQuery({
        queryKey: [queryKeys.GET_CLINICS],
        queryFn: async () => {
            return await api.get("/clinics", {
                params: {
                    page,
                    limit,
                    keyword,
                }
            })
        },
    });
};

export const useGetSingleClinic = (clinicId: number) => {
    return useQuery({
        queryKey: [queryKeys.GET_SINGLE_CLINIC],
        queryFn: async () => {
            return await api.get(`/clinics/single`, {
                params: {
                    clinicId,
                    long: 1,
                    lat: 1
                }
            })
        },
        refetchOnWindowFocus: false
    });
};

export const useUpdateClinic = () => {
    const updateClinicModal = useUpdateClinicModal()

    return useMutation({
        mutationKey: [queryKeys.UPDATE_CLINIC],
        mutationFn: async ({id, data}: { id: number, data: any }) => {
            return await api.put(`/clinics/${id}`, data)
        },
        onSuccess() {
            customToast("SUCCESS", "Clinic is updated successfully!");
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_CLINICS],
            })

            updateClinicModal.onClose()
        },
        onError(error: any) {
            console.log(error);
            customToast(
                "ERROR",
                error?.response?.data?.message || "Error while logging in to account!"
            );
        },
    });
};

export const useDeleteClinic = () => {
    return useMutation({
        mutationKey: [queryKeys.DELETE_CLINIC],
        mutationFn: async (id: number) => {
            return await api.delete(`/clinics/${id}`)
        },
        onSuccess() {
            customToast("SUCCESS", "Clinic is deleted successfully!");
            queryClient.invalidateQueries({
                queryKey: [queryKeys.GET_CLINICS],
            })
        },
        onError(error: any) {
            console.log(error);
            customToast(
                "ERROR",
                error?.response?.data?.message || "Error while logging in to account!"
            );
        },
    });
};
