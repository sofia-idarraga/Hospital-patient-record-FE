export interface specialityI{
    specialityId: number, //|null,
    name: string,
    physicianInCharge: string,
    patients: Patient[] //|null
}

export type Patient = {
    name: string,
    age: number,
    dni: number,
    datesOfAppointments: string,
    fkSpecialityId: number
} 

export interface patientI{
    name: string,
    age: number,
    dni: number,
    datesOfAppointments: string,
    fkSpecialityId: number
} 