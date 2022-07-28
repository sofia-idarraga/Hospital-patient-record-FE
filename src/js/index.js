import { getAllSpecialities } from "./petitions/petitions.js";
getAllSpecialities().then(specialities => {
    specialityState = specialities;
    console.log(specialities);
});
let specialityState = [];
