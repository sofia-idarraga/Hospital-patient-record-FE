import { display, displayPatient, displaySpecialities } from "../elements.js";
import { Patient, patientI, specialityI } from "../interfaces/interfaces.js";
import { deletePatient, deleteSpeciality, getAllSpecialities, patchPatient, postPatient, postSpeciality, putSpeciality } from "./petitions.js";
import  {specialityState  } from "../index.js"
import { formModelPatient, formModelSpeciality } from "../formatHtml.js";


const modal = document.querySelector('#form-new-speciality') as HTMLDivElement;



function openModal() {

    modal.innerHTML = formModelSpeciality;

    const sendSpecialityButton = document.querySelector('#sendSpecialityButton') as HTMLButtonElement;
    sendSpecialityButton.addEventListener('click', () => sendSpeciality());
    const closeSpecialityForm = document.querySelector('#closeSpecialityForm') as HTMLButtonElement;
    closeSpecialityForm.addEventListener('click', ()=>closeModal(modal))

}

function sendSpeciality() {

    const nameInput = document.querySelector('#specialityName') as HTMLInputElement;
    const physicianInput = document.querySelector('#physician') as HTMLInputElement;
    specialityState.forEach(speciality =>{
        if(nameInput.value === speciality.name){
            alert("Speciality alredy exist");
            return;
        }
    })
    
    if (nameInput.value && physicianInput.value) {
        const newSpeciality: specialityI = {
            specialityId: 0,//null,
            name: nameInput.value,
            physicianInCharge: physicianInput.value,
            patients: []//null
        }
        console.log(newSpeciality);

        postSpeciality(newSpeciality).then(
            response => {
                if (response.status === 201) {
                    specialityState.push(newSpeciality)      
                    display(newSpeciality);
                    nameInput.value = '';
                    physicianInput.value = '';
                    modal.innerHTML = "";
                    console.log("sended!")
                }
            }
        )
    }
}

function openPatientModal(speciality: specialityI) {

    const divSpeciality = document.querySelector(`#speciality-${speciality.specialityId}`) as HTMLInputElement;
    const div: HTMLDivElement = document.createElement('div');
    div.id = "form-create-patient"

    div.innerHTML = formModelPatient;
    divSpeciality?.append(div);

    div.scrollIntoView({ behavior: 'smooth' });

    const sendPatientButton = document.querySelector('#sendPatientButton') as HTMLButtonElement;
    const closePatientButton = document.querySelector('#closPatientForm') as HTMLButtonElement;

    closePatientButton.addEventListener('click', ()=>
        closeModal(div)
    );

    sendPatientButton.addEventListener('click', () => sendPatient(speciality, div));

}

function sendPatient(speciality: specialityI, div: HTMLDivElement) {
    const nameInput = document.querySelector('#patientName') as HTMLInputElement;
    const ageInput = document.querySelector('#age') as HTMLInputElement;
    const dniIntpu = document.querySelector('#dni') as HTMLInputElement;
    const dateInput = document.querySelector('#date') as HTMLInputElement;
    let id: number = 0;
    if (speciality.specialityId != null) {
        id = speciality.specialityId;
    }
    const newPatient: Patient = {
        name: nameInput.value,
        age: parseInt(ageInput.value),
        dni: parseInt(dniIntpu.value),
        datesOfAppointments: dateInput.value,
        fkSpecialityId: id
    }
    console.log(newPatient);
    let exist: boolean = false;
    speciality.patients?.forEach(patient => {
        if (patient.name === newPatient.name) {
            exist = true
        }
    });

    if (exist) {
        alert("Patient alredy registered")
        return;
    }

    postPatient(newPatient).then(
        response => {
            if (response.status === 201) {
                speciality.patients?.push(newPatient);
                div.innerHTML = "";
                console.log("sended!")
                const divPatients = document.querySelector(`#patients-${speciality.specialityId}`) as HTMLDivElement;
                displayPatient(newPatient,divPatients);
                //   const newSate = actualState.filter(speciality=> speciality.specialityId !== newPatient.fkSpecialityId);
                //   newSate.push(speciality)
                //   actualState = newSate
            }
        }
    );
}

function openEditSpecModal(speciality: specialityI) {
    window.scrollTo(
        {
            top: 0,
            left: 0,
            behavior: 'smooth'
        }
    );
    modal.innerHTML = formModelSpeciality;

    const nameInput = document.querySelector('#specialityName') as HTMLInputElement;
    const physicianInput = document.querySelector('#physician') as HTMLInputElement;
    const h3Title = document.querySelector(`#title-form-speciality`) as HTMLHeadingElement;
    h3Title.innerText = "Edit Medical Speciality";


    nameInput.value = speciality.name
    physicianInput.value = speciality.physicianInCharge;

    const sendSpecialityButton = document.querySelector('#sendSpecialityButton') as HTMLButtonElement;
    sendSpecialityButton.addEventListener('click', () => editSpeciality(speciality, nameInput, physicianInput));
    const closeSpecialityForm = document.querySelector('#closeSpecialityForm') as HTMLButtonElement;
    closeSpecialityForm.addEventListener('click', ()=>closeModal(modal))

}

function editSpeciality(speciality: specialityI, nameInput: HTMLInputElement, physicianInput: HTMLInputElement) {

    let exist: boolean = false
    specialityState.forEach(speciality =>{
        if(nameInput.value === speciality.name){
            exist = true;
        }
    })

    if(!exist){
        const editedpeciality: specialityI = {
            specialityId: speciality.specialityId,
            name: nameInput.value,
            physicianInCharge: physicianInput.value,
            patients: speciality.patients
        }
    
        putSpeciality(editedpeciality).then(response => {
            if (response.status === 200) {
                const h2Title = document.querySelector(`.single-speciality-title-${speciality.specialityId}`) as HTMLHeadingElement
                h2Title.innerText = editedpeciality.name;
                const h3Physician = document.querySelector(`.physician-in-charge-${speciality.specialityId}`) as HTMLHeadingElement
                h3Physician.innerText = "Physician in Charge: Dr. " + editedpeciality.physicianInCharge;
                nameInput.value = '';
                physicianInput.value = '';
                modal.innerHTML = "";
               //const newState = specialityState.map(speciality=> speciality.specialityId === editedpeciality.specialityId?editedpeciality:speciality);
                //actualState = newState;
            }
        }
        );

    }else{alert("Speciality alredy exist")}
    
    
}

function handleEditPatient(patient: patientI) {
    const divSpeciality = document.querySelector(`#speciality-${patient.fkSpecialityId}`) as HTMLInputElement;
    const div: HTMLDivElement = document.createElement('div');
    div.id = "form-create-patient"

    div.innerHTML = formModelPatient;
    divSpeciality?.append(div);

    div.scrollIntoView({ behavior: 'smooth' });

    const nameInput = document.querySelector('#patientName') as HTMLInputElement;
    const ageInput = document.querySelector('#age') as HTMLInputElement;
    const dniIntpu = document.querySelector('#dni') as HTMLInputElement;
    const dateInput = document.querySelector('#date') as HTMLInputElement;

    nameInput.value = patient.name;
    ageInput.value = patient.age.toString();
    dniIntpu.value = patient.dni.toString();
    nameInput.disabled = true;
    ageInput.disabled = true;
    dniIntpu.disabled = true;

    const sendPatientButton = document.querySelector('#sendPatientButton') as HTMLButtonElement;
    const closePatientButton = document.querySelector('#closPatientForm') as HTMLButtonElement;

    closePatientButton.addEventListener('click', ()=>
        closeModal(div)
    );
    sendPatientButton.addEventListener('click', () =>
        editPatient(patient, dateInput,div));

}

function closeModal(div: HTMLDivElement){
    div.innerHTML = div.innerHTML = ""; 
}

function editPatient(patient: patientI, dateInput: HTMLInputElement, div: HTMLDivElement) {

    const editedPatien: patientI = {
        name: patient.name,
        age: patient.age,
        dni: patient.dni,
        datesOfAppointments: dateInput.value,
        fkSpecialityId: patient.fkSpecialityId
    }

    patchPatient(editedPatien).then(response => {
        if (response.status === 200) {
            const datesLi = document.querySelector(`#dates-patient-${editedPatien.dni}`) as HTMLLIElement
            datesLi.innerText = "Dates: "+ patient.datesOfAppointments+"-"+ editedPatien.datesOfAppointments;  
            div.innerHTML = "";          
        }
    });
}

function handleDeletePatient(patient: patientI) {
    console.log(patient);

    deletePatient(patient).then(response => {
        if (response.status === 200) {
            console.log("removed!")
            const patientDiv = document.querySelector(`#content-${patient.dni}`) as HTMLDivElement
            patientDiv.remove();
            
        }
    }
    )
}

function handleDeleteSpeciality(speciality: specialityI){

    deleteSpeciality(speciality).then(responsponse =>{
        if(responsponse.status ===200){
            const specialityDiv = document.querySelector(`#speciality-${speciality.specialityId}`) as HTMLDivElement
            specialityDiv.remove();
        }
        if(responsponse.status ===400){
            alert("Cannot delete a speciality with patients")
        }
    }

    )
}


export {
    openModal,
    openPatientModal,
    openEditSpecModal,
    handleDeletePatient,
    handleEditPatient,
    handleDeleteSpeciality
};