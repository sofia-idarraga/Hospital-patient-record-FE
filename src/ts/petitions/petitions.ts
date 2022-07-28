import { specialityI } from "../interfaces/interfaces.js";

const baseUrl = "http://localhost:8080/api";


export async function getAllSpecialities() {
    const response:Response = await fetch(baseUrl+'/speciality')
  
    const data:specialityI[] = await response.json()
  
    return data
  } 