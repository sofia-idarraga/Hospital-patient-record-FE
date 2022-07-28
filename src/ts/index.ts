import { displaySpecialities } from "./elements.js";
import { Patient,  specialityI } from "./interfaces/interfaces.js";
import { getAllSpecialities } from "./petitions/petitions.js";


let specialityState: specialityI[] = [];

getAllSpecialities().then(specialities => {
    specialityState = specialities;
    console.log(specialityState);
    displaySpecialities(specialities);
  });


 


