export interface Dipendente {
    id: number
    email: string
    first_name: string
    last_name: string
    avatar: string
}

export interface ListaDipendenti {
    page: number
    per_page: number
    total: number
    total_pages: number
    data: Dipendente[]
}