"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const GuestList = () => {
    const [name, setName] = (0, react_1.useState)('');
    const [guests, setGeuests] = (0, react_1.useState)([]);
    const onClick = () => {
        setName('');
        setGeuests([...guests, name]);
    };
    return (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("h3", { children: "Guest List" }), (0, jsx_runtime_1.jsx)("ul", { children: guests.map((guest) => ((0, jsx_runtime_1.jsx)("li", { children: guest }, guest))) }), (0, jsx_runtime_1.jsx)("input", { value: name, onChange: (e) => setName(e.target.value) }), (0, jsx_runtime_1.jsx)("button", { onClick: onClick, children: "Add Guest" })] });
};
exports.default = GuestList;
