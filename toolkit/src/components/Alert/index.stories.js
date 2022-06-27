var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import React from "react";
import styled from "styled-components";
import noop from "lodash/noop";
import Alert from "./Alert";
import { Text } from "../Text";
var Row = styled.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin-bottom: 32px;\n"], ["\n  margin-bottom: 32px;\n"])));
export default {
    title: "Components/Alert",
    component: Alert,
    argTypes: {},
};
export var Default = function () {
    return (React.createElement("div", { style: { padding: "32px", width: "400px" } },
        React.createElement(Row, null,
            React.createElement(Alert, { title: "Info" },
                React.createElement(Text, { as: "p" }, "This is a description"))),
        React.createElement(Row, null,
            React.createElement(Alert, { title: "Success", variant: "success" },
                React.createElement(Text, { as: "p" }, "This is a description"))),
        React.createElement(Row, null,
            React.createElement(Alert, { title: "Warning", variant: "warning" },
                React.createElement(Text, { as: "p" }, "This is a description"))),
        React.createElement(Row, null,
            React.createElement(Alert, { title: "Danger", variant: "danger" },
                React.createElement(Text, { as: "p" }, "This is a description")))));
};
var handleClick = noop;
export var WithHandler = function () {
    return (React.createElement("div", { style: { padding: "32px", width: "400px" } },
        React.createElement(Row, null,
            React.createElement(Alert, { onClick: handleClick, title: "Info" })),
        React.createElement(Row, null,
            React.createElement(Alert, { onClick: handleClick, title: "Success", variant: "success" }, "A description of the success alert")),
        React.createElement(Row, null,
            React.createElement(Alert, { onClick: handleClick, title: "Danger A Long Title", variant: "danger" })),
        React.createElement(Row, null,
            React.createElement(Alert, { onClick: handleClick, title: "Warning", variant: "warning" }))));
};
var templateObject_1;
