"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const Nav = () => {
    return ((0, jsx_runtime_1.jsx)("nav", { children: (0, jsx_runtime_1.jsxs)("ul", { className: ' flex w-full  gap-10 p-6 justify-end text-stone-100 font-medium', children: [(0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, { to: '/route/signup', className: ({ isActive }) => isActive ? 'px-3 py-1 rounded-3xl border-2 border-lime-100 shadow-sm' : "", children: "Sign Up" }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, { to: '/signin', className: ({ isActive }) => isActive ? 'px-3 py-1 rounded-3xl border-2 border-lime-100 shadow-sm' : "", children: "Sign In" }) }), (0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, { to: '/book', className: ({ isActive }) => isActive ? 'px-3 py-1 rounded-3xl border-2 border-lime-100 shadow-sm' : "", children: "Book" }) })] }) }));
};
exports.default = Nav;
