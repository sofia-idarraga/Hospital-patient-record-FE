import { display, displayPatient } from "../elements.js";
import { deletePatient, deleteSpeciality, patchPatient, postPatient, postSpeciality, putSpeciality } from "./petitions.js";
import { specialityState } from "../index.js";
import { formModelPatient, formModelSpeciality } from "../formatHtml.js";
const modal = document.querySelector('#form-new-speciality');
function openModal() {
    modal.innerHTML = formModelSpeciality;
    const sendSpecialityButton = document.querySelector('#sendSpecialityButton');
    sendSpecialityButton.addEventListener('click', () => sendSpeciality());
    const closeSpecialityForm = document.querySelector('#closeSpecialityForm');
    closeSpecialityForm.addEventListener('click', () => closeModal(modal));
}
function sendSpeciality() {
    const nameInput = document.querySelector('#specialityName');
    const physicianInput = document.querySelector('#physician');
    specialityState.forEach(speciality => {
        if (nameInput.value === speciality.name) {
            alert("Speciality alredy exist");
            return;
        }
    });
    if (nameInput.value && physicianInput.value) {
        const newSpeciality = {
            specialityId: 0,
            name: nameInput.value,
            physicianInCharge: physicianInput.value,
            patients: [] //null
        };
        console.log(newSpeciality);
        postSpeciality(newSpeciality).then(response => {
            if (response.status === 201) {
                specialityState.push(newSpeciality);
                display(newSpeciality);
                nameInput.value = '';
                physicianInput.value = '';
                modal.innerHTML = "";
                console.log("sended!");
            }
        });
    }
}
function openPatientModal(speciality) {
    const divSpeciality = document.querySelector(`#speciality-${speciality.specialityId}`);
    const div = document.createElement('div');
    div.id = "form-create-patient";
    div.innerHTML = formModelPatient;
    divSpeciality === null || divSpeciality === void 0 ? void 0 : divSpeciality.append(div);
    div.scrollIntoView({ behavior: 'smooth' });
    const sendPatientButton = document.querySelector('#sendPatientButton');
    const closePatientButton = document.querySelector('#closPatientForm');
    closePatientButton.addEventListener('click', () => closeModal(div));
    sendPatientButton.addEventListener('click', () => sendPatient(speciality, div));
}
function sendPatient(speciality, div) {
    var _a;
    const nameInput = document.querySelector('#patientName');
    const ageInput = document.querySelector('#age');
    const dniIntpu = document.querySelector('#dni');
    const dateInput = document.querySelector('#date');
    let id = 0;
    if (speciality.specialityId != null) {
        id = speciality.specialityId;
    }
    const newPatient = {
        name: nameInput.value,
        age: parseInt(ageInput.value),
        dni: parseInt(dniIntpu.value),
        datesOfAppointments: dateInput.value,
        fkSpecialityId: id
    };
    console.log(newPatient);
    let exist = false;
    (_a = speciality.patients) === null || _a === void 0 ? void 0 : _a.forEach(patient => {
        if (patient.name === newPatient.name) {
            exist = true;
        }
    });
    if (exist) {
        alert("Patient alredy registered");
        return;
    }
    postPatient(newPatient).then(response => {
        var _a;
        if (response.status === 201) {
            (_a = speciality.patients) === null || _a === void 0 ? void 0 : _a.push(newPatient);
            div.innerHTML = "";
            console.log("sended!");
            const divPatients = document.querySelector(`#patients-${speciality.specialityId}`);
            displayPatient(newPatient, divPatients);
            //   const newSate = actualState.filter(speciality=> speciality.specialityId !== newPatient.fkSpecialityId);
            //   newSate.push(speciality)
            //   actualState = newSate
        }
    });
}
function openEditSpecModal(speciality) {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
    modal.innerHTML = formModelSpeciality;
    const nameInput = document.querySelector('#specialityName');
    const physicianInput = document.querySelector('#physician');
    const h3Title = document.querySelector(`#title-form-speciality`);
    h3Title.innerText = "Edit Medical Speciality";
    nameInput.value = speciality.name;
    physicianInput.value = speciality.physicianInCharge;
    const sendSpecialityButton = document.querySelector('#sendSpecialityButton');
    sendSpecialityButton.addEventListener('click', () => editSpeciality(speciality, nameInput, physicianInput));
    const closeSpecialityForm = document.querySelector('#closeSpecialityForm');
    closeSpecialityForm.addEventListener('click', () => closeModal(modal));
}
function editSpeciality(speciality, nameInput, physicianInput) {
    let exist = false;
    specialityState.forEach(speciality => {
        if (nameInput.value === speciality.name) {
            exist = true;
        }
    });
    if (!exist) {
        const editedpeciality = {
            specialityId: speciality.specialityId,
            name: nameInput.value,
            physicianInCharge: physicianInput.value,
            patients: speciality.patients
        };
        putSpeciality(editedpeciality).then(response => {
            if (response.status === 200) {
                const h2Title = document.querySelector(`.single-speciality-title-${speciality.specialityId}`);
                h2Title.innerText = editedpeciality.name;
                const h3Physician = document.querySelector(`.physician-in-charge-${speciality.specialityId}`);
                h3Physician.innerText = "Physician in Charge: Dr. " + editedpeciality.physicianInCharge;
                nameInput.value = '';
                physicianInput.value = '';
                modal.innerHTML = "";
                //const newState = specialityState.map(speciality=> speciality.specialityId === editedpeciality.specialityId?editedpeciality:speciality);
                //actualState = newState;
            }
        });
    }
    else {
        alert("Speciality alredy exist");
    }
}
function handleEditPatient(patient) {
    const divSpeciality = document.querySelector(`#speciality-${patient.fkSpecialityId}`);
    const div = document.createElement('div');
    div.id = "form-create-patient";
    div.innerHTML = formModelPatient;
    divSpeciality === null || divSpeciality === void 0 ? void 0 : divSpeciality.append(div);
    div.scrollIntoView({ behavior: 'smooth' });
    const nameInput = document.querySelector('#patientName');
    const ageInput = document.querySelector('#age');
    const dniIntpu = document.querySelector('#dni');
    const dateInput = document.querySelector('#date');
    nameInput.value = patient.name;
    ageInput.value = patient.age.toString();
    dniIntpu.value = patient.dni.toString();
    nameInput.disabled = true;
    ageInput.disabled = true;
    dniIntpu.disabled = true;
    const sendPatientButton = document.querySelector('#sendPatientButton');
    const closePatientButton = document.querySelector('#closPatientForm');
    closePatientButton.addEventListener('click', () => closeModal(div));
    sendPatientButton.addEventListener('click', () => editPatient(patient, dateInput, div));
}
function closeModal(div) {
    div.innerHTML = div.innerHTML = "";
}
function editPatient(patient, dateInput, div) {
    const editedPatien = {
        name: patient.name,
        age: patient.age,
        dni: patient.dni,
        datesOfAppointments: dateInput.value,
        fkSpecialityId: patient.fkSpecialityId
    };
    patchPatient(editedPatien).then(response => {
        if (response.status === 200) {
            const datesLi = document.querySelector(`#dates-patient-${editedPatien.dni}`);
            datesLi.innerText = "Dates: " + patient.datesOfAppointments + "-" + editedPatien.datesOfAppointments;
            div.innerHTML = "";
        }
    });
}
function handleDeletePatient(patient) {
    console.log(patient);
    deletePatient(patient).then(response => {
        if (response.status === 200) {
            console.log("removed!");
            const patientDiv = document.querySelector(`#content-${patient.dni}`);
            patientDiv.remove();
        }
    });
}
function handleDeleteSpeciality(speciality) {
    deleteSpeciality(speciality).then(responsponse => {
        if (responsponse.status === 200) {
            const specialityDiv = document.querySelector(`#speciality-${speciality.specialityId}`);
            specialityDiv.remove();
        }
        if (responsponse.status === 400) {
            alert("Cannot delete a speciality with patients");
        }
    });
}
export { openModal, openPatientModal, openEditSpecModal, handleDeletePatient, handleEditPatient, handleDeleteSpeciality };
