"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", { value: raw });
    }
    else {
        cooked.raw = raw;
    }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Components = exports.Default = void 0;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var Stepper_1 = require("./Stepper");
var Step_1 = require("./Step");
var Card_1 = require("../Card/Card");
var CardBody_1 = require("../Card/CardBody");
exports.default = {
    title: "Components/Stepper",
    component: Stepper_1.default,
    argTypes: {},
};
var mock = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae nisl imperdiet, vestibulum lacus at, placerat nisi. Vestibulum quis scelerisque purus. Curabitur non magna tincidunt, fermentum neque sed, finibus neque. Phasellus consequat at lorem a venenatis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae nisl imperdiet, vestibulum lacus at, placerat nisi. Vestibulum quis scelerisque purus. Curabitur non magna tincidunt, fermentum neque sed, finibus neque. Phasellus consequat at lorem a venenatis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae nisl imperdiet, vestibulum lacus at, placerat nisi. Vestibulum quis scelerisque purus. Curabitur non magna tincidunt, fermentum neque sed, finibus neque. Phasellus consequat at lorem a venenatis.";
var steps = [mock, mock, mock, mock];
var status = ["past", "current", "future", "future"];
var Row = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  margin-bottom: 32px;\n"], ["\n  display: flex;\n  margin-bottom: 32px;\n"])));
var Default = function () {
    return (React.createElement(Stepper_1.default, null, steps.map(function (step, index) {
        return (React.createElement(Step_1.Step, { key: step, index: index, status: status[index] },
            React.createElement(Card_1.default, null,
                React.createElement(CardBody_1.default, null, step))));
    })));
};
exports.Default = Default;
var Components = function () {
    return (React.createElement("div", null,
        React.createElement(Row, null,
            React.createElement(Step_1.StepNumber, { status: "past" }, "1"),
            React.createElement(Step_1.StepNumber, { status: "current" }, "1"),
            React.createElement(Step_1.StepNumber, { status: "future" }, "1")),
        React.createElement(Row, null,
            React.createElement(Step_1.Step, { index: 0, status: "past" },
                React.createElement(Card_1.default, null,
                    React.createElement(CardBody_1.default, null,
                        React.createElement("h2", null, "Step 0"),
                        React.createElement("div", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae nisl imperdiet, vestibulum lacus at, placerat nisi. Vestibulum quis scelerisque purus. Curabitur non magna tincidunt, fermentum neque sed, finibus neque. Phasellus consequat at lorem a venenatis."))))),
        React.createElement(Row, null,
            React.createElement(Step_1.Step, { index: 1, status: "current" },
                React.createElement(Card_1.default, null,
                    React.createElement(CardBody_1.default, null,
                        React.createElement("h2", null, "Step 1"),
                        React.createElement("div", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae nisl imperdiet, vestibulum lacus at, placerat nisi. Vestibulum quis scelerisque purus. Curabitur non magna tincidunt, fermentum neque sed, finibus neque. Phasellus consequat at lorem a venenatis."))))),
        React.createElement(Row, null,
            React.createElement(Step_1.Step, { index: 2, status: "future" },
                React.createElement(Card_1.default, null,
                    React.createElement(CardBody_1.default, null,
                        React.createElement("h2", null, "Step 2"),
                        React.createElement("div", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae nisl imperdiet, vestibulum lacus at, placerat nisi. Vestibulum quis scelerisque purus. Curabitur non magna tincidunt, fermentum neque sed, finibus neque. Phasellus consequat at lorem a venenatis.")))))));
};
exports.Components = Components;
var templateObject_1;
