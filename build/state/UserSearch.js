"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const users = [
    { name: 'Yoda', age: 34 },
    { name: 'Sonya', age: 4 },
    { name: 'Alex', age: 23 },
    { name: 'Phill', age: 30 },
];
function UserSearch() {
    const inputRef = (0, react_1.useRef)(null);
    const [name, setName] = (0, react_1.useState)('');
    const [user, setUser] = (0, react_1.useState)();
    (0, react_1.useEffect)(function () {
        if (!inputRef.current)
            return;
        inputRef.current.focus();
    }, []);
    const onClick = () => {
        const foundUser = users.find((user) => {
            return user.name === name;
        });
        setUser(foundUser);
    };
    return ((0, jsx_runtime_1.jsxs)("div", { children: ["User Search", (0, jsx_runtime_1.jsx)("input", { ref: inputRef, value: name, onChange: e => setName(e.target.value) }), (0, jsx_runtime_1.jsx)("button", { onClick: onClick, children: "Find User" }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("p", { children: [" ", user && "Name: " + user.name] }), (0, jsx_runtime_1.jsxs)("p", { children: [" ", user && "Age: " + user.age] }), (0, jsx_runtime_1.jsx)("p", { children: !user && 'User not found' })] })] }));
}
exports.default = UserSearch;
