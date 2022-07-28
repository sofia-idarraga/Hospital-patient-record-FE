export interface specialityI{
    specialityId: number|null,
    name: string,
    physicianInCharge: string,
    patients: Patient[]|null
}

export type Patient = {
    name: string,
    age: number,
    dni: number,
    datesOfAppointments: string,
    specialityId: number
} 