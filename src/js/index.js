import { displaySpecialities } from "./elements.js";
import { getAllSpecialities } from "./petitions/petitions.js";
let specialityState = [];
getAllSpecialities().then(specialities => {
    specialityState = specialities;
    console.log(specialityState);
    displaySpecialities(specialities);
});
