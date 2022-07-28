export interface specialityI{
    id: number|null,
    name: string,
    physicianInCharge: string,
    patients: Patient[]
}

export type Patient = {
    name: string,
    age: number,
    dni: number,
    datesOfAppointments: string,
    specialityId: number
} 