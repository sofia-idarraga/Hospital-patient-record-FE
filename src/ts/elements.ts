import { Patient, specialityI } from "./interfaces/interfaces";

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
    h2.className = `single-note-title-${speciality.specialityId} font-bold text-3xl text-black`;
    h2.innerText = speciality.name;

    const h3:HTMLHeadElement = document.createElement('h3');
    h3.className = `physician-in-charge-${speciality.specialityId} font-normal text-indigo-500 text-xl mt-2`;
    h3.innerText = "Physician in Charge: Dr. "+ speciality.physicianInCharge;  
    divTitle.append(h2,h3);
    div.append(divTitle);
    speciality.patients.forEach(patient => displayPatient(patient, div));
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
    divSpeciality.append(div);
}

export{
    specialityContainer,
    displaySpecialities
}