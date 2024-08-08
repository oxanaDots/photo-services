"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
// import GuestList from './state/GuestList'
// import UserSearch from './state/UserSearch'
// import EventComponent from './events/EventComponent'
const react_router_dom_1 = require("react-router-dom");
const SignUp_1 = __importDefault(require("./pages/SignUp"));
const Home_1 = __importDefault(require("./pages/Home"));
const Booking_1 = __importDefault(require("./components/Booking"));
const SingIn_1 = __importDefault(require("./pages/SingIn"));
function App() {
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, { children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: '/', element: (0, jsx_runtime_1.jsx)(Home_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: '/book', element: (0, jsx_runtime_1.jsx)(Booking_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: '/route/signup', element: (0, jsx_runtime_1.jsx)(SignUp_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: '/signin', element: (0, jsx_runtime_1.jsx)(SingIn_1.default, {}) })] }) }) }));
}
exports.default = App;
