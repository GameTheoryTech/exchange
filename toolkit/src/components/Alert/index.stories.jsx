"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithHandler = exports.Default = void 0;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var noop_1 = require("lodash/noop");
var Alert_1 = require("./Alert");
var Text_1 = require("../Text");
var Row = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin-bottom: 32px;\n"], ["\n  margin-bottom: 32px;\n"])));
exports.default = {
    title: "Components/Alert",
    component: Alert_1.default,
    argTypes: {},
};
var Default = function () {
    return (<div style={{ padding: "32px", width: "400px" }}>
      <Row>
        <Alert_1.default title="Info">
          <Text_1.Text as="p">This is a description</Text_1.Text>
        </Alert_1.default>
      </Row>
      <Row>
        <Alert_1.default title="Success" variant="success">
          <Text_1.Text as="p">This is a description</Text_1.Text>
        </Alert_1.default>
      </Row>
      <Row>
        <Alert_1.default title="Warning" variant="warning">
          <Text_1.Text as="p">This is a description</Text_1.Text>
        </Alert_1.default>
      </Row>
      <Row>
        <Alert_1.default title="Danger" variant="danger">
          <Text_1.Text as="p">This is a description</Text_1.Text>
        </Alert_1.default>
      </Row>
    </div>);
};
exports.Default = Default;
var handleClick = noop_1.default;
var WithHandler = function () {
    return (<div style={{ padding: "32px", width: "400px" }}>
      <Row>
        <Alert_1.default onClick={handleClick} title="Info"/>
      </Row>
      <Row>
        <Alert_1.default onClick={handleClick} title="Success" variant="success">
          A description of the success alert
        </Alert_1.default>
      </Row>
      <Row>
        <Alert_1.default onClick={handleClick} title="Danger A Long Title" variant="danger"/>
      </Row>
      <Row>
        <Alert_1.default onClick={handleClick} title="Warning" variant="warning"/>
      </Row>
    </div>);
};
exports.WithHandler = WithHandler;
var templateObject_1;
