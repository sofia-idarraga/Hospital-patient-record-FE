const formModelSpeciality = `
<h3 id="title-form-speciality" class="pt-4 text-2xl text-center">Create new Medical Speciality</h3>
<form class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
    <div class="mb-4 md:flex md:justify-between w-full mt-10 p-6">
        <div class="mb-4 md:mr-2 md:mb-0">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="specialityName">
                Name
            </label>
            <input
                class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="specialityName" type="text" placeholder="Name" autocomplete="off" required />
        </div>
        <div class="md:ml-2">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="physician">
                Phisician in charge
            </label>
            <input
                class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="physician" type="text" placeholder="Phisician in charge" autocomplete="off"
                required />
        </div>
        <div class="flex place-items-center text-center mx-auto">
        <button id="sendSpecialityButton"
            class=" block p-2.5 bg-gray-900 rounded-xl hover:rounded-3xl hover:bg-green-600 transition-all duration-300 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
        </button>
        <button id="closeSpecialityForm"
            class=" block p-2.5 bg-gray-900 rounded-xl hover:rounded-3xl hover:bg-green-600 transition-all duration-300 text-white">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        </div>
    </div>
</form>
`;
const formModelPatient = `
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
            <div class="flex place-items-center text-center mx-auto">
            <button id="sendPatientButton"
                class=" block p-2.5 bg-gray-900 rounded-xl hover:rounded-3xl hover:bg-green-600 transition-all duration-300 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>
            </button>
            <button id="closPatientForm"
                class=" block p-2.5 bg-gray-900 rounded-xl hover:rounded-3xl hover:bg-green-600 transition-all duration-300 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            </div>
            
        </div>
    </form>

`;
export { formModelSpeciality, formModelPatient };
