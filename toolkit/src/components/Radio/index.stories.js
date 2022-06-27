import React, { useState } from "react";
import Radio from "./Radio";
export default {
    title: "Components/Radio",
    component: Radio,
    argTypes: {},
};
export var Default = function () {
    var _a = useState("one"), radio = _a[0], setRadio = _a[1];
    var _b = useState("one"), radioSm = _b[0], setRadioSm = _b[1];
    var handleChange = function (evt) {
        // eslint-disable-next-line
        console.info("fired");
        var value = evt.target.value;
        setRadio(value);
    };
    var handleChangeSm = function (evt) {
        var value = evt.target.value;
        setRadioSm(value);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { style: { marginBottom: "32px" } },
            React.createElement(Radio, { name: "md", value: "one", onChange: handleChange, checked: radio === "one" }),
            React.createElement(Radio, { name: "md", value: "two", onChange: handleChange, checked: radio === "two" })),
        React.createElement("div", null,
            React.createElement(Radio, { scale: "sm", name: "sm", value: "one", onChange: handleChangeSm, checked: radioSm === "one" }),
            React.createElement(Radio, { scale: "sm", name: "sm", value: "two", onChange: handleChangeSm, checked: radioSm === "two" }))));
};
