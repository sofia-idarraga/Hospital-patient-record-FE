import { display, displayPatient } from "../elements.js";
import { Patient, patientI, specialityI } from "../interfaces/interfaces.js";
import { deletePatient, postPatient, postSpeciality, putSpeciality } from "./petitions.js";
import { specialityState} from "../index.js"

const modal = document.querySelector('#form-new-speciality') as HTMLDivElement;

function openModal(){

    modal.innerHTML = formModelSpeciality;

    const sendSpecialityButton = document.querySelector('#sendSpecialityButton') as HTMLButtonElement;
    sendSpecialityButton.addEventListener('click', () => sendSpeciality());
}

function sendSpeciality(){
    
    const nameInput = document.querySelector('#specialityName') as HTMLInputElement;
    const physicianInput = document.querySelector('#physician') as HTMLInputElement;
    if(nameInput.value&&physicianInput.value){
        const newSpeciality: specialityI = {
            specialityId: null,
            name: nameInput.value,
            physicianInCharge: physicianInput.value,
            patients:null
        }
        console.log(newSpeciality);

        postSpeciality(newSpeciality).then(
            response => {
              if(response.status === 201){
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

function openPatientModal(speciality: specialityI){
    
    const divSpeciality = document.querySelector(`#speciality-${speciality.specialityId}`) as HTMLInputElement;
    const div:HTMLDivElement = document.createElement('div');
    div.id = "form-create-patient"

    div.innerHTML = formModelPatient;
    divSpeciality?.append(div);

    const sendPatientButton = document.querySelector('#sendPatientButton') as HTMLButtonElement;
    
    sendPatientButton.addEventListener('click', () => sendPatient(speciality, div));

}

function sendPatient(speciality: specialityI, div:HTMLDivElement){
    const nameInput = document.querySelector('#patientName') as HTMLInputElement;
    const ageInput = document.querySelector('#age') as HTMLInputElement;
    const dniIntpu = document.querySelector('#dni') as HTMLInputElement;
    const dateInput = document.querySelector('#date') as HTMLInputElement;
    let id:number = 0;
    if(speciality.specialityId != null){
        id = speciality.specialityId;
    }
    const newPatient: Patient={
        name: nameInput.value,
        age: parseInt(ageInput.value) ,
        dni: parseInt(dniIntpu.value),
        datesOfAppointments: dateInput.value,
        fkSpecialityId: id
    }
    console.log(newPatient);
    let exist:boolean = false;
    speciality.patients?.forEach(patient => {
        if(patient.name === newPatient.name){
            exist = true
        }
    });
    
    if(exist){
        alert("Patient alredy registered")
        return;
    }

    postPatient(newPatient).then(
        response => {
          if(response.status === 201){
            speciality.patients?.push(newPatient);
            div.innerHTML = "";
            console.log("sended!")
          }
        }
      );
}

function openEditSpecModal(speciality: specialityI){
    window.scrollTo(0,0);
    modal.innerHTML = formModelSpeciality;

    const nameInput = document.querySelector('#specialityName') as HTMLInputElement;
    const physicianInput = document.querySelector('#physician') as HTMLInputElement;
    const h3Title = document.querySelector(`#title-form-speciality`) as HTMLHeadingElement;
    h3Title.innerText= "Edit Medical Speciality";


    nameInput.value = speciality.name
    physicianInput.value = speciality.physicianInCharge;    

    const sendSpecialityButton = document.querySelector('#sendSpecialityButton') as HTMLButtonElement;
    sendSpecialityButton.addEventListener('click', () => editSpeciality(speciality, nameInput, physicianInput));

}

function editSpeciality(speciality:specialityI, nameInput:HTMLInputElement, physicianInput:HTMLInputElement){

    const editedpeciality: specialityI = {
        specialityId: speciality.specialityId,
        name: nameInput.value,
        physicianInCharge: physicianInput.value,
        patients:speciality.patients
    }

    putSpeciality(editedpeciality).then(response =>{
        if(response.status === 200){
            const h2Title = document.querySelector(`.single-speciality-title-${speciality.specialityId}`) as HTMLHeadingElement
            h2Title.innerText = editedpeciality.name;
            const h3Physician = document.querySelector(`.physician-in-charge-${speciality.specialityId}`) as HTMLHeadingElement
            h3Physician.innerText = "Physician in Charge: Dr. "+ editedpeciality.physicianInCharge;
            nameInput.value = '';
            physicianInput.value = '';
            modal.innerHTML = "";       

        }
    }
    );
}

function handleDeletePatient(patient: patientI){
    console.log(patient);
    
    deletePatient(patient).then( response =>{
        if(response.status === 200){
            console.log("removed!")
            const patientDiv = document.querySelector(`#content-${patient.dni}`) as HTMLDivElement
            patientDiv.remove();
        }
    }
    )
    
}

const formModelSpeciality: string = `
<h3 id="title-form-speciality" class="pt-4 text-2xl text-center">Create new Medical Speciality</h3>
<form class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
    <div class="mb-4 md:flex md:justify-between w-full mt-10 p-6">
        <div class="mb-4 md:mr-2 md:mb-0">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="specialityName">
                Name
            </label>
            <input
                class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="specialityName" type="text" placeholder="Name" autocomplete="off" required/>
        </div>
        <div class="md:ml-2">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="physician">
                Phisician in charge
            </label>
            <input
                class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="physician" type="text" placeholder="Phisician in charge" autocomplete="off" required/>
        </div>
        <button id="sendSpecialityButton"
            class=" block p-2.5 bg-gray-900 rounded-xl hover:rounded-3xl hover:bg-green-600 transition-all duration-300 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
        </button>
    </div>
</form>
`

const formModelPatient: string = `
<h3 class="pt-4 text-2xl text-center">Agend new patient</h3>
    <form class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
        <div class="mb-4 md:flex md:justify-between">
            <div class="mb-4 md:mr-2 md:mb-0">
                <label class="block mb-2 text-sm font-bold text-gray-700" for="patientName">
                    Name
                </label>
                <input
                    class=" px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="patientName" type="text" placeholder="Name" autocomplete="off" required/>
            </div>
            <div class="md:ml-2">
                <label class="block mb-2 text-sm font-bold text-gray-700" for="age">
                    Age
                </label>
                <input
                    class=" px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="age" type="number" placeholder="Age" min="1" required/>
            </div>
            <div class="md:ml-2">
                <label class="block mb-2 text-sm font-bold text-gray-700" for="dni">
                    Dni
                </label>
                <input
                    class=" px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="dni" type="number" placeholder="Dni" min="0" required/>
            </div>
            <div class="md:ml-2">
                <label class="block mb-2 text-sm font-bold text-gray-700" for="date">
                    Date
                </label>
                <input
                    class=" px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="date" type="date" placeholder="" required/>
            </div>
            <button id="sendPatientButton"
                class=" block p-2.5 bg-gray-900 rounded-xl hover:rounded-3xl hover:bg-green-600 transition-all duration-300 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            </button>
        </div>
    </form>

`


export {openModal,
    openPatientModal,
    openEditSpecModal,
    handleDeletePatient
};