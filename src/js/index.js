import { displaySpecialities } from "./elements.js";
import { getAllSpecialities } from "./petitions/petitions.js";
import { openModal } from "./petitions/events.js";
let specialityState = [];
getAllSpecialities().then(specialities => {
    specialityState = specialities;
    console.log(specialityState);
    displaySpecialities(specialities);
});
const newSpecialityButton = document.querySelector('.new-speciality-button');
newSpecialityButton.addEventListener('click', () => openModal());
export { specialityState };
