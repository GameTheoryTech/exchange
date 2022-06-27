"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
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
    return (<Stepper_1.default>
      {steps.map(function (step, index) { return (<Step_1.Step key={step} index={index} status={status[index]}>
          <Card_1.default>
            <CardBody_1.default>{step}</CardBody_1.default>
          </Card_1.default>
        </Step_1.Step>); })}
    </Stepper_1.default>);
};
exports.Default = Default;
var Components = function () {
    return (<div>
      <Row>
        <Step_1.StepNumber status="past">1</Step_1.StepNumber>
        <Step_1.StepNumber status="current">1</Step_1.StepNumber>
        <Step_1.StepNumber status="future">1</Step_1.StepNumber>
      </Row>
      <Row>
        <Step_1.Step index={0} status="past">
          <Card_1.default>
            <CardBody_1.default>
              <h2>Step 0</h2>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae nisl imperdiet, vestibulum lacus at,
                placerat nisi. Vestibulum quis scelerisque purus. Curabitur non magna tincidunt, fermentum neque sed,
                finibus neque. Phasellus consequat at lorem a venenatis.
              </div>
            </CardBody_1.default>
          </Card_1.default>
        </Step_1.Step>
      </Row>
      <Row>
        <Step_1.Step index={1} status="current">
          <Card_1.default>
            <CardBody_1.default>
              <h2>Step 1</h2>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae nisl imperdiet, vestibulum lacus at,
                placerat nisi. Vestibulum quis scelerisque purus. Curabitur non magna tincidunt, fermentum neque sed,
                finibus neque. Phasellus consequat at lorem a venenatis.
              </div>
            </CardBody_1.default>
          </Card_1.default>
        </Step_1.Step>
      </Row>
      <Row>
        <Step_1.Step index={2} status="future">
          <Card_1.default>
            <CardBody_1.default>
              <h2>Step 2</h2>
              <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vitae nisl imperdiet, vestibulum lacus at,
                placerat nisi. Vestibulum quis scelerisque purus. Curabitur non magna tincidunt, fermentum neque sed,
                finibus neque. Phasellus consequat at lorem a venenatis.
              </div>
            </CardBody_1.default>
          </Card_1.default>
        </Step_1.Step>
      </Row>
    </div>);
};
exports.Components = Components;
var templateObject_1;
