import { specialityI } from "../interfaces/interfaces.js";

const baseUrl = "http://localhost:8080/api";


export async function getAllSpecialities() {
    const response:Response = await fetch(baseUrl+'/speciality')
  
    const data:specialityI[] = await response.json()
  
    return data
} 

export async function postSpeciality(speciality:specialityI){
    const response:Response = await fetch(baseUrl+'/create/speciality', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(speciality)
    })
  
    return response;
  }