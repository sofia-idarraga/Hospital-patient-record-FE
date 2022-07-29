import { deleteButtonFormat, editButtonFormat } from "./formatHtml.js";
import { Patient, specialityI } from "./interfaces/interfaces.js";
import { openEditSpecModal, openPatientModal, handleDeletePatient, handleEditPatient, handleDeleteSpeciality } from "./petitions/events.js";

const specialityContainer = document.querySelector('#specialityContainer') as HTMLDivElement;

function displaySpecialities(specialities: specialityI[]) {
  specialities.forEach(speciality => display(speciality));
}

function display(speciality: specialityI) {
  specialityContainer
  const div: HTMLDivElement = document.createElement('div');
  div.className = "single-speciality-container rounded-lg text-center overflow-hidden w-full" +
    "transform hover:shadow-2xl hover:scale-105 transition duration-200 ease-in";
  div.id = `speciality-${speciality.specialityId}`;

  const divTitle: HTMLDivElement = document.createElement('div');
  divTitle.className = "w-full py-5 border-b border-gray-800";
  divTitle.id = `title-${speciality.specialityId}`;

  const h2: HTMLHeadElement = document.createElement('h2');
  h2.className = `single-speciality-title-${speciality.specialityId} font-bold text-3xl text-black`;
  h2.innerText = speciality.name;

  const h3: HTMLHeadElement = document.createElement('h3');
  h3.className = `physician-in-charge-${speciality.specialityId} font-normal text-indigo-500 text-xl mt-2`;
  h3.innerText = "Physician in Charge: Dr. " + speciality.physicianInCharge;
  divTitle.append(h2, h3);
  div.append(divTitle);

  const divPatients: HTMLDivElement = document.createElement('div');
  divPatients.id = `patients-${speciality.specialityId}`;
  div.append(divPatients);


  speciality.patients.forEach(patient => displayPatient(patient, divPatients));




  const divButtons: HTMLDivElement = document.createElement('div');
  divButtons.id = "buttons";
  divButtons.className = "w-full mt-10 p-6";
  const editButton: HTMLButtonElement = document.createElement('button');
  editButton.id = `edit-${speciality.specialityId}`
  const createPatientButton: HTMLButtonElement = document.createElement('button');
  editButton.className = "w-full block bg-gray-900 font-medium text-xl p-4 rounded-xl hover:shadow-lg transition duration-200 ease-in-out hover:bg-indigo-600 hover:text-black";
  createPatientButton.className = "w-full block bg-gray-900 font-medium text-xl p-4 rounded-xl hover:shadow-lg transition duration-200 ease-in-out hover:bg-indigo-600 hover:text-black";
  createPatientButton.id = `create-${speciality.specialityId}`

  editButton.addEventListener('click', () => openEditSpecModal(speciality));
  createPatientButton.addEventListener('click', () => openPatientModal(speciality));

  editButton.innerText = "Edit";
  createPatientButton.innerText = "New Patient";
  const deleteButton: HTMLButtonElement = document.createElement('button');
  deleteButton.innerText = "Delete";
  deleteButton.className = "w-full block bg-gray-900 font-medium text-xl p-4 rounded-xl hover:shadow-lg transition duration-200 ease-in-out hover:bg-indigo-600 hover:text-black";
  deleteButton.addEventListener('click', () => handleDeleteSpeciality(speciality));

  divButtons.append(deleteButton);
  divButtons.append(editButton, createPatientButton);

  div.append(divButtons);

  specialityContainer.append(div);

}

function displayPatient(patient: Patient, divSpeciality: HTMLDivElement) {
  const div: HTMLDivElement = document.createElement('div');
  div.id = `content-${patient.dni}`;
  div.className = "w-full py-5 border-b border-gray-800";

  const patientName: HTMLParagraphElement = document.createElement('p');
  patientName.className = "leading-8 mb-10 text-lg font-light";
  patientName.innerText = patient.name;
  div.append(patientName);

  const divPatientData: HTMLDivElement = document.createElement('div');
  divPatientData.id = `data-${patient.dni}`;
  divPatientData.className = "text-gray-500 text-sm pt-2";

  const ul: HTMLUListElement = document.createElement('ul');
  const liAge: HTMLLIElement = document.createElement('li');
  const liDni: HTMLLIElement = document.createElement('li');
  const liDates: HTMLLIElement = document.createElement('li');
  liDates.id = `dates-patient-${patient.dni}`;
  liAge.innerText = "Age: " + patient.age.toString();
  liDni.innerText = "Dni: " + patient.dni.toString();
  liDates.innerText = "Dates: " + patient.datesOfAppointments;

  ul.append(liAge, liDni, liDates);
  divPatientData.append(ul);
  div.append(patientName, divPatientData);

  const divButtons: HTMLDivElement = document.createElement('div');
  divButtons.className = "flex place-items-center text-center mx-auto";
  const deleteButton: HTMLButtonElement = document.createElement('button');
  const editButton: HTMLButtonElement = document.createElement('button');

  deleteButton.addEventListener('click', () => handleDeletePatient(patient));
  editButton.addEventListener('click', () => handleEditPatient(patient));

  editButton.className = " block p-2.5 bg-gray-900 rounded-xl hover:rounded-3xl hover:bg-yellow-600 transition-all duration-300 text-white";
  editButton.innerHTML = editButtonFormat;

  deleteButton.className = " block p-2.5 bg-gray-900 rounded-xl hover:rounded-3xl hover:bg-red-700 transition-all duration-300 text-white";
  deleteButton.innerHTML = deleteButtonFormat;
  divButtons.append(editButton, deleteButton);
  div.append(divButtons);
  divSpeciality.append(div);
}

export {
  specialityContainer,
  displaySpecialities,
  display,
  displayPatient
}