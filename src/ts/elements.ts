import { Patient, specialityI } from "./interfaces/interfaces.js";
import { openEditSpecModal, openPatientModal } from "./petitions/events.js";

const specialityContainer = document.querySelector('#specialityContainer') as HTMLDivElement;

function displaySpecialities(specialities:specialityI[]){
    specialities.forEach(speciality => display(speciality));
  }

function display(speciality:specialityI){
    specialityContainer
    const div:HTMLDivElement = document.createElement('div');
    div.className = "single-speciality-container rounded-lg text-center overflow-hidden w-full"+
     "transform hover:shadow-2xl hover:scale-105 transition duration-200 ease-in";
    div.id = `speciality-${speciality.specialityId}`;
    
    const divTitle:HTMLDivElement = document.createElement('div');
    divTitle.className = "w-full py-5 border-b border-gray-800";
    divTitle.id="title";
    
    const h2:HTMLHeadElement = document.createElement('h2');
    h2.className = `single-speciality-title-${speciality.specialityId} font-bold text-3xl text-black`;
    h2.innerText = speciality.name;

    const h3:HTMLHeadElement = document.createElement('h3');
    h3.className = `physician-in-charge-${speciality.specialityId} font-normal text-indigo-500 text-xl mt-2`;
    h3.innerText = "Physician in Charge: Dr. "+ speciality.physicianInCharge;  
    divTitle.append(h2,h3);
    div.append(divTitle);
    if(speciality.patients!=null){
    speciality.patients.forEach(patient => displayPatient(patient, div));
    }
    let id:number = 0;
    

    const divButtons:HTMLDivElement = document.createElement('div');
    divButtons.id = "buttons";
    divButtons.className = "w-full mt-10 p-6";
    const editButton:HTMLButtonElement = document.createElement('button');
    editButton.id = `edit-${speciality.specialityId}`
    const createPatientButton:HTMLButtonElement = document.createElement('button');
    editButton.className = "w-full block bg-gray-900 font-medium text-xl p-4 rounded-xl hover:shadow-lg transition duration-200 ease-in-out hover:bg-indigo-600 hover:text-black";
    createPatientButton.className = "w-full block bg-gray-900 font-medium text-xl p-4 rounded-xl hover:shadow-lg transition duration-200 ease-in-out hover:bg-indigo-600 hover:text-black";
    createPatientButton.id = `create-${speciality.specialityId}`
    
    editButton.addEventListener('click', () => openEditSpecModal(speciality));
    createPatientButton.addEventListener('click', () => openPatientModal(speciality));
    
    editButton.innerText = "Edit";
    createPatientButton.innerText = "New Patient";
    if(speciality.patients?.length == 0){
        const deleteButton:HTMLButtonElement = document.createElement('button');
        deleteButton.innerText="Delete";
        deleteButton.className = "w-full block bg-gray-900 font-medium text-xl p-4 rounded-xl hover:shadow-lg transition duration-200 ease-in-out hover:bg-indigo-600 hover:text-black";
        divButtons.append(deleteButton);
    }
    divButtons.append(editButton, createPatientButton);

    div.append(divButtons);

    specialityContainer.append(div);  

} 

function displayPatient(patient:Patient, divSpeciality: HTMLDivElement){
    const div:HTMLDivElement = document.createElement('div');
    div.id = `content-${patient.dni}`;
    div.className = "w-full py-5 border-b border-gray-800";
    
    const patientName:HTMLParagraphElement = document.createElement('p');
    patientName.className = "leading-8 mb-10 text-lg font-light";
    patientName.innerText = patient.name;
    div.append(patientName);

    const divPatientData:HTMLDivElement = document.createElement('div');
    divPatientData.id = `data-${patient.dni}`;
    divPatientData.className = "text-gray-500 text-sm pt-2";
    
    const ul: HTMLUListElement = document.createElement('ul');
    const liAge: HTMLLIElement = document.createElement('li');
    const liDni: HTMLLIElement = document.createElement('li');
    const liDates: HTMLLIElement = document.createElement('li');
    liAge.innerText = "Age: "+ patient.age.toString();
    liDni.innerText = "Dni: "+ patient.dni.toString();
    liDates.innerText = "Dates: "+ patient.datesOfAppointments;

    ul.append(liAge,liDni,liDates);
    divPatientData.append(ul);
    div.append(patientName, divPatientData);

    const divButtons:HTMLDivElement = document.createElement('div');
    divButtons.className = "flex place-items-center text-center mx-auto";
    const deleteButton:HTMLButtonElement = document.createElement('button');
    const editButton:HTMLButtonElement = document.createElement('button');
    
    editButton.className = " block p-2.5 bg-gray-900 rounded-xl hover:rounded-3xl hover:bg-yellow-600 transition-all duration-300 text-white";
    editButton.innerHTML =`<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>`;

    deleteButton.className = " block p-2.5 bg-gray-900 rounded-xl hover:rounded-3xl hover:bg-red-700 transition-all duration-300 text-white";
    deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>`;
    divButtons.append(editButton, deleteButton);
    div.append(divButtons);
    divSpeciality.append(div);
}

export{
    specialityContainer,
    displaySpecialities,
    display,
    displayPatient
}