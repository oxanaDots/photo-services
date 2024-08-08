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
const react_hook_form_1 = require("react-hook-form");
const react_router_dom_1 = require("react-router-dom");
const axios_1 = __importDefault(require("axios"));
const Nav_1 = __importDefault(require("../components/Nav"));
const SignIn = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { handleSubmit, register, formState: { errors, isSubmitting }, setError } = (0, react_hook_form_1.useForm)({ shouldUseNativeValidation: false });
    const onSubmit = (data) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("form data:", data);
        try {
            const response = yield axios_1.default.post('https://photo-services-nine.vercel.app/api/signin', data);
            console.log('Login successful', response.data);
            localStorage.setItem('token', response.data.token);
            navigate('/');
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                const axiosError = error;
                if (axiosError.response && axiosError.response.status === 401) {
                    setError('root', {
                        type: 'authentication',
                        message: 'Invalid username or password'
                    });
                }
                else {
                    console.error('An unexpected error occurred:', axiosError.message);
                }
            }
            else {
                console.error('An unexpected error occurred:', error);
            }
        }
    });
    const onError = () => {
        console.log('Error');
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Nav_1.default, {}), (0, jsx_runtime_1.jsx)("div", { className: 'flex justify-center items-center', children: (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit(onSubmit, onError), className: 'flex flex-col justify-center items-center  px-6 py-10 w-[30rem]', children: [(0, jsx_runtime_1.jsx)("legend", { className: 'pb-6 text-3xl font-semibold text-blue-800', children: "Welcome back" }), (0, jsx_runtime_1.jsxs)("div", { className: 'py-2 w-full', children: [(0, jsx_runtime_1.jsx)("input", Object.assign({ className: 'w-full shadow-md py-2 px-4 rounded-3xl', placeholder: 'username' }, register('username', { required: 'This field is required' }))), errors.username && (0, jsx_runtime_1.jsx)("p", { className: 'text-red-700 pl-4 text-xs pt-1', children: errors.username.message })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'py-2 w-full', children: [(0, jsx_runtime_1.jsx)("input", Object.assign({ className: 'w-full shadow-md py-2 px-4 rounded-3xl', placeholder: 'password' }, register('password', { required: 'This field is required' }))), errors.password && (0, jsx_runtime_1.jsx)("p", { className: 'text-red-700 pl-4 text-xs pt-1', children: errors.password.message })] }), errors.root && (0, jsx_runtime_1.jsx)("p", { className: 'text-red-700 pl-4 text-xs pt-1', children: errors.root.message }), (0, jsx_runtime_1.jsx)("button", { disabled: isSubmitting, className: ` ${isSubmitting ? 'bg-blue-700' : 'bg-blue-200'}  w-full mt-6 border-blue-700 border-2  text-blue-900 font-semibold rounded-3xl py-2 px-5`, children: isSubmitting ? 'Signing you in...' : 'Sign in' })] }) })] }));
};
exports.default = SignIn;
