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
const axios_1 = __importDefault(require("axios"));
const Nav_1 = __importDefault(require("../components/Nav"));
const react_router_dom_1 = require("react-router-dom");
const SignUp = () => {
    const { register, handleSubmit, setError, formState: { errors, isSubmitting, isSubmitSuccessful } } = (0, react_hook_form_1.useForm)({ shouldUseNativeValidation: false,
    });
    const apiURL = 'https://photo-services-nine.vercel.app';
    const onSubmit = (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios_1.default.post(`${apiURL}/api/signup`, data);
            console.log('User registered', response.data);
        }
        catch (error) {
            if (axios_1.default.isAxiosError(error)) {
                const axiosError = error;
                if (axiosError.response && axiosError.response.status === 409) {
                    const errorMessage = axiosError.response.data.error;
                    console.log(axiosError);
                    if (errorMessage === 'Email is taken') {
                        setError('root', {
                            type: 'manual',
                            message: errorMessage,
                        });
                    }
                    else if (errorMessage === 'Username is already taken') {
                        setError('root', {
                            type: 'manual',
                            message: errorMessage,
                        });
                    }
                    else if (errorMessage === 'Email and username are taken') {
                        setError('root', {
                            type: 'manual',
                            message: errorMessage
                        });
                    }
                    else {
                        setError('root', {
                            type: 'manual',
                            message: 'Server Error'
                        });
                    }
                }
            }
        }
        finally {
        }
    });
    const onError = () => {
        console.log('wrong');
    };
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Nav_1.default, {}), (0, jsx_runtime_1.jsx)("div", { className: 'flex justify-center items-center ', children: (0, jsx_runtime_1.jsx)("form", { onSubmit: handleSubmit(onSubmit, onError), className: 'flex flex-col align-middle justify-center items-center px-6 py-10 w-[30rem]', children: !isSubmitSuccessful ?
                        (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("legend", { className: 'pb-6 text-3xl font-semibold text-blue-800', children: "Create your Account" }), (0, jsx_runtime_1.jsxs)("div", { className: 'py-2 w-full ', children: [(0, jsx_runtime_1.jsx)("input", Object.assign({ className: 'w-full shadow-md py-2 px-4 rounded-3xl', placeholder: 'username' }, register('username', { required: 'this field is required',
                                        }))), errors.username && (0, jsx_runtime_1.jsx)("p", { className: 'text-red-700 pl-4 text-xs pt-1', children: errors.username.message })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'py-2 w-full', children: [(0, jsx_runtime_1.jsx)("input", Object.assign({ className: 'w-full shadow-md py-2 px-4 rounded-3xl', placeholder: 'email address' }, register('email', { required: 'this field is required',
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                                message: 'Invalid email'
                                            },
                                            validate: (value) => {
                                                if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
                                                    return "Email must include @";
                                                }
                                                return true;
                                            }
                                        }))), errors.email && (0, jsx_runtime_1.jsx)("p", { className: 'text-red-700 pl-4 text-xs pt-1', children: errors.email.message })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'py-2 w-full', children: [(0, jsx_runtime_1.jsx)("input", Object.assign({ className: 'w-full shadow-md py-2 px-4 rounded-3xl', placeholder: 'password' }, register('password', { required: 'this field is required',
                                            minLength: {
                                                value: 8,
                                                message: "Password must have at least 8 characters"
                                            },
                                            pattern: {
                                                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                                                message: 'Password must contain at least one letter and one number'
                                            }
                                        }))), errors.password && (0, jsx_runtime_1.jsx)("p", { className: 'text-red-700 pl-4 text-xs pt-1', children: errors.password.message })] }), (0, jsx_runtime_1.jsxs)("div", { className: 'py-2 w-full', children: [(0, jsx_runtime_1.jsx)("input", Object.assign({ className: 'w-full py-2 px-4 shadow-md rounded-3xl', placeholder: 'confirm password' }, register('confirmPassword', { required: 'this field is required',
                                            validate: (value, FormInputs) => value === FormInputs.password ? true : "Password do not match"
                                        }))), errors.confirmPassword && (0, jsx_runtime_1.jsx)("p", { className: 'text-red-700 pl-4 text-xs pt-1', children: errors.confirmPassword.message })] }), errors.root && (0, jsx_runtime_1.jsx)("p", { className: 'text-red-700 self-start text-left place-items-start pl-4 text-xs pt-1', children: errors.root.message }), (0, jsx_runtime_1.jsx)("button", { disabled: isSubmitting, className: ` ${isSubmitting && 'bg-blue-300'} bg-blue-200 w-full mt-6 border-blue-700 border-2  text-blue-900 font-semibold rounded-3xl py-2 px-5`, children: isSubmitting ? 'Creating account...' : 'Create account' })] })
                        :
                            (0, jsx_runtime_1.jsxs)("div", { className: 'flex flex-col  w-auto justify-center text-center ', children: [(0, jsx_runtime_1.jsx)("h2", { className: ' text-4xl w-full font-semibold text-gray-700 pb-1', children: "Thank you for signing up." }), (0, jsx_runtime_1.jsx)("br", {}), (0, jsx_runtime_1.jsx)("h3", { className: 'text-xl text-emerald-600 font-semibold pb-6', children: "Your account has been created!" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, { to: '/signin', children: (0, jsx_runtime_1.jsx)("button", { className: 'w-full mt-6 border-blue-700 border-2  text-blue-900 font-semibold rounded-3xl py-2 px-5', children: " Sign In" }) })] }) }) })] }));
};
exports.default = SignUp;
