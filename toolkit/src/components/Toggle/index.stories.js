import React, { useState } from "react";
import Toggle from "./Toggle";
export default {
    title: "Components/Toggle",
    component: Toggle,
};
export var Default = function () {
    var _a = useState(false), isChecked = _a[0], setIsChecked = _a[1];
    var toggle = function () { return setIsChecked(!isChecked); };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { style: { marginBottom: "32px" } },
            React.createElement(Toggle, { checked: isChecked, onChange: toggle })),
        React.createElement("div", null,
            React.createElement(Toggle, { checked: isChecked, onChange: toggle, scale: "sm" }))));
};
