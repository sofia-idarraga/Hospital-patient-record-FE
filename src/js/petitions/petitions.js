var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const baseUrl = "http://localhost:8080/api";
export function getAllSpecialities() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(baseUrl + '/speciality');
        const data = yield response.json();
        return data;
    });
}
export function postSpeciality(speciality) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(baseUrl + '/create/speciality', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(speciality)
        });
        return response;
    });
}
export function postPatient(patient) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(baseUrl + '/create/patient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patient)
        });
        return response;
    });
}
export function deletePatient(patient) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(baseUrl + '/delete/patient', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patient)
        });
        return response;
    });
}
export function putSpeciality(speciality) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(baseUrl + '/update/speciality', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(speciality)
        });
        return response;
    });
}
export function patchPatient(patient) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(baseUrl + '/update/date/patient', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patient)
        });
        return response;
    });
}
export function deleteSpeciality(speciality) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(baseUrl + '/delete/speciality', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(speciality)
        });
        return response;
    });
}
