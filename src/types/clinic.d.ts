export type ClinicType = {
    id: number,
    name: string,
    descr: string,
    image: string,
    createdAt: string,
    updatedAt: string,
}

export type GetClinicsType = {
    meta: {
        limit: number,
        currentPage: number,
        total_pages: number,
        totalClinics: number
    },
    clinics: ClinicType[]
}