import { display } from "../elements.js";
import { postSpeciality } from "./petitions.js";
import { specialityState } from "../index.js";
const modal = document.querySelector('#form-new-speciality');
function openModal() {
    modal.innerHTML = `<h3 class="pt-4 text-2xl text-center">Create new Medical Speciality</h3>
    <form class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
        <div class="mb-4 md:flex md:justify-between">
            <div class="mb-4 md:mr-2 md:mb-0">
                <label class="block mb-2 text-sm font-bold text-gray-700" for="name">
                    Name
                </label>
                <input
                    class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="specialityName"
                    type="text"
                    placeholder="Name"
                />
            </div>
            <div class="md:ml-2">
                <label class="block mb-2 text-sm font-bold text-gray-700" for="physicianInCharge">
                    Phisician in charge
                </label>
                <input
                    class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                    id="physician"
                    type="text"
                    placeholder="Phisician in charge"
                />  
            </div>  
            <button id="sendSpecialityButton" class=" block p-2.5 bg-gray-900 rounded-xl hover:rounded-3xl hover:bg-green-600 transition-all duration-300 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            </button>            
            </div>`;
    const sendSpecialityButton = document.querySelector('#sendSpecialityButton');
    sendSpecialityButton.addEventListener('click', () => sendSpeciality());
}
function sendSpeciality() {
    const nameInput = document.querySelector('#specialityName');
    const physicianInput = document.querySelector('#physician');
    if (nameInput.value && physicianInput.value) {
        const newSpeciality = {
            specialityId: null,
            name: nameInput.value,
            physicianInCharge: physicianInput.value,
            patients: null
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
export { openModal };
