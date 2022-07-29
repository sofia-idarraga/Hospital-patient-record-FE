const formModelSpeciality: string = `
<h3 id="title-form-speciality" class="pt-4 text-2xl text-center">Create new Medical Speciality</h3>
<form class="px-8 pt-6 pb-8 mb-4 bg-white rounded">
    <div class="mb-4 md:flex md:justify-between w-full mt-10 p-6">
        <div class="mb-4 md:mr-2 md:mb-0">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="specialityName">
                Name
            </label>
            <input pattern=".{5,}"
                class="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="specialityName" type="text" placeholder="Name" autocomplete="off" required />
        </div>
        <div class="md:ml-2">
            <label class="block mb-2 text-sm font-bold text-gray-700" for="physician">
                Phisician in charge
            </label>
            <input pattern=".{10,}"
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
`

const editButtonFormat: string = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
<path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
</svg>`;

const deleteButtonFormat: string = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
<path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
</svg>`;

export {
    formModelSpeciality,
    formModelPatient,
    editButtonFormat,
    deleteButtonFormat
}