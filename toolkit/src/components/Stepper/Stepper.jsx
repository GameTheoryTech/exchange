"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var StepperWrapper = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  flex-direction: column;\n  width: fit-content;\n"], ["\n  display: flex;\n  flex-direction: column;\n  width: fit-content;\n"])));
var Stepper = function (_a) {
    var children = _a.children;
    var numberOfSteps = react_1.default.Children.count(children);
    return (<StepperWrapper>
      {react_1.default.Children.map(children, function (child) {
            if (react_1.default.isValidElement(child)) {
                return react_1.default.cloneElement(child, { numberOfSteps: numberOfSteps });
            }
            return child;
        })}
    </StepperWrapper>);
};
exports.default = Stepper;
var templateObject_1;
