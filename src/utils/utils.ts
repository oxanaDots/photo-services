import{ ErrorState} from '..//components/Booking';


export function validateFullName(nameInput: string): string | null {
    const regex = /^[a-zA-Z]+ [a-zA-Z]+$/;
    return regex.test(nameInput) ? null : 'Please enter your full first and last name.';
}

export function validateEmail(emailInput: string): string | null {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(emailInput) ? null : 'Please enter a valid email address.';
}

export function validateContactNumber(phoneInput: string): string | null {
    const regex = /^[0-9]{11}$/;
    return regex.test(phoneInput) ? null : 'Please enter a valid contact number';
}

    export function colorBorder(inputField: string, specificError: string, generalError: string){

return     ` ${!specificError && inputField? 'focus:border-green-600 border-2': ''}
             ${specificError && inputField && 'focus:border-red-600 border-2'}
            ${generalError  || specificError ? 'focus:border-red-600' : ' border-gray-500'}
           ${generalError  &&  !specificError && 'border-red-600'}
           ${generalError && inputField && 'border-green-600 ' }

          `
    
}


export function hasNoErrors (errorstate: ErrorState | string): boolean{
 return Object.values(errorstate).every((error)=> !error)
}