"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateFullName = validateFullName;
exports.validateEmail = validateEmail;
exports.validateContactNumber = validateContactNumber;
exports.colorBorder = colorBorder;
exports.hasNoErrors = hasNoErrors;
function validateFullName(nameInput) {
    const regex = /^[a-zA-Z]+ [a-zA-Z]+$/;
    return regex.test(nameInput) ? null : 'Please enter your full first and last name.';
}
function validateEmail(emailInput) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(emailInput) ? null : 'Please enter a valid email address.';
}
function validateContactNumber(phoneInput) {
    const regex = /^[0-9]{11}$/;
    return regex.test(phoneInput) ? null : 'Please enter a valid contact number';
}
function colorBorder(inputField, specificError, generalError) {
    if (!specificError && inputField) {
        return 'border-emerald-600 focus:border-emerald-600  border-2';
    }
    else if (generalError && !specificError && inputField) {
        return 'border-emerald-600  border-2';
    }
    else if (specificError && inputField) {
        return 'border-red-600 focus:border-red-600  border';
    }
    else if (generalError && !specificError) {
        return 'border-red-600 border';
    }
    else {
        return;
    }
}
function hasNoErrors(errorstate) {
    return Object.values(errorstate).every((error) => !error);
}
