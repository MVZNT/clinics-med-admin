export type ClinicType = {
    id: number,
    name: string,
    descr: string,
    logo: string,
    images: {
        id: string,
        url: string,
    }[],
    location: string,
    phone_number: string,
    website_url: string,
    instagram_url: string,
    youtube_url: string
    telegram_url: string,
    week_start_day: string,
    "week_end_day": string,
    "daily_work_start_time": string
    "daily_work_end_time": string
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