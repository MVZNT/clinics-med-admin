import {create} from "zustand";
import {ModalProps} from "@/types/zustand";

export const useCreateClinicModal = create<ModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));

export const useUpdateClinicModal = create<ModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));

export const useCreateWorkingHoursModal = create<ModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));

export const useUpdateWorkingHoursModal = create<ModalProps>((set) => ({
    isOpen: false,
    onOpen: () => set({isOpen: true}),
    onClose: () => set({isOpen: false}),
}));