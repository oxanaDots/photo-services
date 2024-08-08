"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const axios_1 = __importDefault(require("axios"));
const utils_1 = require("../utils/utils");
const Nav_1 = __importDefault(require("./Nav"));
const initialState = {
    fieldState: {
        nameInput: '',
        emailInput: '',
        phoneNumber: '',
        dateRequired: '',
        message: '',
    },
    specificErrors: {
        nameInput: '',
        emailInput: '',
        phoneNumber: '',
        dateRequired: '',
        message: '',
    },
    generalError: '',
    isSubmitted: false,
};
const availableServices = [
    { id: 1, serviceName: 'Photography', isSelected: false },
    { id: 2, serviceName: 'Videography', isSelected: false },
    { id: 3, serviceName: 'Both', isSelected: false },
];
const typeOfOcassion = [
    { id: 1, eventName: 'Commercial', isSelected: false },
    { id: 2, eventName: 'Music', isSelected: false },
    { id: 3, eventName: 'Real Estate', isSelected: false },
    { id: 4, eventName: 'Portrait', isSelected: false },
    { id: 5, eventName: 'E-commerce', isSelected: false }
];
function reducer(state, action) {
    switch (action.type) {
        case 'SET_FIELD':
            return Object.assign(Object.assign({}, state), { fieldState: Object.assign(Object.assign({}, state.fieldState), { [action.field]: action.value }) });
        case 'SET_GENERALERROR':
            return Object.assign(Object.assign({}, state), { generalError: action.erroMessage });
        case 'CLEAR_GENERALERROR':
            return Object.assign(Object.assign({}, state), { generalError: '' });
        case 'SET_ERROR':
            return Object.assign(Object.assign({}, state), { specificErrors: Object.assign(Object.assign({}, state.specificErrors), { [action.field]: action.errorMessage }) });
        case 'CLEAR_ERROR':
            return Object.assign(Object.assign({}, state), { specificErrors: Object.assign(Object.assign({}, state.specificErrors), { [action.field]: '' }) });
        case "SUBMIT_BOOKING":
            return Object.assign(Object.assign({}, state), { isSubmitted: true });
        default: return state;
    }
}
const Booking = () => {
    var _a, _b;
    const [state, dispatch] = (0, react_1.useReducer)(reducer, initialState);
    const [services, setServices] = (0, react_1.useState)(availableServices);
    const [ocassions, setOccasions] = (0, react_1.useState)(typeOfOcassion);
    const { nameInput, emailInput, phoneNumber, dateRequired } = state.fieldState;
    const hasSelectedService = services.some(service => service.isSelected);
    const hasSelectedOccasion = ocassions.some(occasion => occasion.isSelected);
    (0, react_1.useEffect)(() => {
        if (hasSelectedOccasion && hasSelectedService) {
            dispatch({ type: 'CLEAR_GENERALERROR' });
        }
    }, [hasSelectedOccasion, hasSelectedService]);
    const selectedOcassion = ((_a = ocassions.find(ocassion => ocassion.isSelected)) === null || _a === void 0 ? void 0 : _a.eventName) || '';
    const selectedService = ((_b = services.find(service => service.isSelected)) === null || _b === void 0 ? void 0 : _b.serviceName) || '';
    const handleChange = (field) => (e) => {
        if (nameInput || emailInput || phoneNumber || dateRequired) {
            dispatch({ type: 'CLEAR_GENERALERROR' });
        }
        const value = e.target.value;
        dispatch({
            type: 'SET_FIELD',
            field,
            value
        });
        let error = '';
        switch (field) {
            case 'nameInput':
                error = (0, utils_1.validateFullName)(value);
                break;
            case 'emailInput':
                error = (0, utils_1.validateEmail)(value);
                break;
            case 'phoneNumber':
                error = (0, utils_1.validateContactNumber)(value);
                break;
            default: break;
        }
        if (error) {
            dispatch({ type: "SET_ERROR", field, errorMessage: error });
        }
        else {
            dispatch({ type: "CLEAR_ERROR", field });
        }
    };
    const handleChoiceOfService = (id) => {
        setServices((services) => services.map(service => service.id === id ? Object.assign(Object.assign({}, service), { isSelected: !service.isSelected }) : service));
    };
    const handleChoiceOfEvent = (id) => {
        setOccasions(() => ocassions.map(ocassion => ocassion.id === id ? Object.assign(Object.assign({}, ocassion), { isSelected: !ocassion.isSelected }) : ocassion));
    };
    function handleSubmit(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            if ((0, utils_1.hasNoErrors)(state.generalError)) {
                console.log('no general error');
            }
            else {
                console.log('err: general error');
            }
            let generalError = '';
            if (!nameInput || !emailInput || !phoneNumber || !dateRequired || !hasSelectedService || !hasSelectedOccasion) {
                generalError = 'Fill in all the fields and make your selections';
            }
            dispatch({ type: 'SET_GENERALERROR', erroMessage: generalError });
            const noErrors = !generalError && Object.values(state.specificErrors).every((error) => !error);
            if (noErrors) {
                try {
                    dispatch({ type: "SUBMIT_BOOKING" });
                    const response = yield axios_1.default.post('https://photo-services-nine.vercel.app/api/submit', {
                        nameInput: state.fieldState.nameInput,
                        emailInput: state.fieldState.emailInput,
                        phoneNumber: state.fieldState.phoneNumber,
                        eventType: selectedOcassion,
                        requiredService: selectedService,
                        dateRequired: state.fieldState.dateRequired
                    });
                    console.log(response.data);
                }
                catch (error) {
                    console.error('There was an error submitting the form!', error);
                }
            }
            else {
                return;
            }
            if (state.isSubmitted) {
                console.log('submit: true');
            }
            else {
                console.log('submit: false');
            }
        });
    }
    const nameInputBorder = (0, utils_1.colorBorder)(state.fieldState.nameInput, state.specificErrors.nameInput, state.generalError);
    const emailInputBorder = (0, utils_1.colorBorder)(state.fieldState.emailInput, state.specificErrors.emailInput, state.generalError);
    const phoneInputBorder = (0, utils_1.colorBorder)(state.fieldState.phoneNumber, state.specificErrors.phoneNumber, state.generalError);
    const dateInputBorder = (0, utils_1.colorBorder)(state.fieldState.dateRequired, state.specificErrors.dateRequired, state.generalError);
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Nav_1.default, {}), (0, jsx_runtime_1.jsx)("div", { className: 'flex justify-center', children: (0, jsx_runtime_1.jsx)("form", { onSubmit: handleSubmit, className: 'w-[40rem] xss:w-11/12 grid \n grid-cols-1 gap-2 bg-opacity-35 justify-center items-center  my-8\n  shadow-md   bg-indigo-100 rounded-lg backdrop-blur-md z-80 p-8 shadow-mg ', children: !state.isSubmitted ?
                        (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("legend", { className: 'text-4xl text-gray-700 font-semibold text-center mb-6', children: "Book Now" }), (0, jsx_runtime_1.jsx)("span", { children: (0, jsx_runtime_1.jsx)("p", { className: 'text-red-600', children: state.generalError }) }), (0, jsx_runtime_1.jsxs)("div", { className: 'flex flex-col justify-between gap-2 mb-2', children: [(0, jsx_runtime_1.jsx)("input", { placeholder: 'full name', className: `w-full p-3 bg-transparent rounded-md border  placeholder-gray-500 focus:outline-none
   ${nameInputBorder} border-gray-600 
     `, value: state.fieldState.nameInput, onChange: handleChange('nameInput') }), (0, jsx_runtime_1.jsx)("p", { className: 'mt text-red-600 text-xs', children: state.specificErrors.nameInput })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'flex  flex-col justify-between gap-2 mb-2', children: [(0, jsx_runtime_1.jsx)("input", { placeholder: 'email', className: `w-full p-3 bg-transparent rounded-md border  border-gray-600  placeholder-gray-500 focus:outline-none
     ${emailInputBorder}
     `, value: state.fieldState.emailInput, onChange: handleChange('emailInput') }), (0, jsx_runtime_1.jsx)("p", { className: 'mt text-red-600 text-xs', children: state.specificErrors.emailInput })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'flex flex-col justify-between gap-2 mb-2', children: [(0, jsx_runtime_1.jsx)("input", { placeholder: 'phone number', className: `w-full p-3 bg-transparent rounded-md border   border-gray-600 placeholder-gray-500 focus:outline-none
    ${phoneInputBorder}
     `, value: state.fieldState.phoneNumber, onChange: handleChange('phoneNumber') }), (0, jsx_runtime_1.jsx)("p", { className: 'mt text-red-600 text-xs', children: state.specificErrors.phoneNumber })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'flex justify-between gap-', children: [(0, jsx_runtime_1.jsx)("input", { type: 'date', className: `w-full p-3 bg-transparent rounded-md border border-gray-600 text-gray-500 placeholder-gray-500 focus:outline-none
       ${dateInputBorder}
    `, value: state.fieldState.dateRequired, onChange: handleChange('dateRequired') }), (0, jsx_runtime_1.jsx)("p", { className: 'mt text-red-600 text-xs', children: state.specificErrors.dateRequired })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'grid gap-4 my-6', children: [(0, jsx_runtime_1.jsx)("h3", { className: ' font-semibold text-gray-900', children: "What's the ocassion?" }), (0, jsx_runtime_1.jsx)("div", { className: 'grid gap-4 grid-cols-3 xs:grid-cols-2 xss:grid-cols-1', children: ocassions.map(ocassion => (0, jsx_runtime_1.jsxs)("p", { onClick: () => handleChoiceOfEvent(ocassion.id), className: `text-center w-full h-24 font-semibold flex items-center justify-center
        border rounded-md  p-10 cursor-pointer shadow-lg 
        ${ocassion.isSelected ? ' bg-gray-100 bg-opacity-60 border-blue-800 border-2  text-blue-800' :
                                                    state.generalError && !hasSelectedOccasion ? 'border-red-600' : ' bg-slate-200 bg-opacity-20 text-gray-800 border-none'}
      `, children: [" ", ocassion.eventName] }, ocassion.id)) })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'grid gap-4 my-6', children: [(0, jsx_runtime_1.jsx)("h3", { className: 'font-semibold text-gray-900', children: "Choose desired services:" }), (0, jsx_runtime_1.jsx)("div", { className: 'grid gap-4 grid-cols-3 xs:grid-cols-2 xss:grid-cols-1', children: services.map(item => (0, jsx_runtime_1.jsx)("p", { onClick: () => handleChoiceOfService(item.id), className: `text-center w-full h-24 font-semibold flex items-center justify-center
            border rounded-md  p-10 cursor-pointer shadow-lg 
            ${item.isSelected ? ' bg-gray-100 bg-opacity-60 border-emerald-600 border-2  text-emerald-600' :
                                                    state.generalError && !hasSelectedService ? 'border-red-600' : ' bg-slate-200 bg-opacity-20 text-gray-800 border-none'}
          `, children: item.serviceName }, item.id)) })] }), (0, jsx_runtime_1.jsx)("button", { className: ' bg-neutral-100 bg-opacity-65 py-2 text-gray-700 text-lg font-semibold rounded-md mt-6 ', children: "Submit" })] })
                        :
                            (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsxs)("div", { className: 'flex flex-col justify-center items-center text-neutral-700', children: [(0, jsx_runtime_1.jsx)("h1", { className: 'text-4xl  font-semibold text-center mb-6', children: "Booking successful!" }), (0, jsx_runtime_1.jsxs)("h3", { className: 'text-center ', children: [" Someone from our team will be in touch with you shortly at ", (0, jsx_runtime_1.jsx)("span", { className: 'text-green-600 font-medium', children: state.fieldState.emailInput })] })] }) }) }) })] }));
};
exports.default = Booking;
