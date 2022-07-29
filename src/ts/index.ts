import { displaySpecialities } from "./elements.js";
import { Patient,  specialityI } from "./interfaces/interfaces.js";
import { getAllSpecialities } from "./petitions/petitions.js";
import {openModal} from "./petitions/events.js"


let specialityState: specialityI[] = [];

getAllSpecialities().then(specialities => {
    specialityState = specialities;
    console.log(specialityState);
    displaySpecialities(specialities);
  });

  const newSpecialityButton = document.querySelector('.new-speciality-button') as HTMLButtonElement;

  newSpecialityButton.addEventListener('click', () => openModal())

export{
specialityState
}


 


