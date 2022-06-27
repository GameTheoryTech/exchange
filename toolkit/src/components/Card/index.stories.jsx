"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ribbon = exports.CardHeader = exports.Default = void 0;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var Heading_1 = require("../Heading/Heading");
var CardRibbon_1 = require("./CardRibbon");
var CardHeader_1 = require("./CardHeader");
var CardBody_1 = require("./CardBody");
var CardFooter_1 = require("./CardFooter");
var Card_1 = require("./Card");
var Row = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin-bottom: 32px;\n"], ["\n  margin-bottom: 32px;\n"])));
exports.default = {
    title: "Components/Card",
    component: Card_1.default,
    argTypes: {},
};
var Default = function () {
    return (<div style={{ padding: "32px", width: "500px" }}>
      <Row>
        <Card_1.default>
          <CardBody_1.default>Body</CardBody_1.default>
          <CardFooter_1.default>Footer</CardFooter_1.default>
        </Card_1.default>
      </Row>
      <Row>
        <Card_1.default isActive>
          <CardBody_1.default>Active</CardBody_1.default>
          <CardFooter_1.default>Footer</CardFooter_1.default>
        </Card_1.default>
      </Row>
      <Row>
        <Card_1.default isSuccess>
          <CardBody_1.default>Success</CardBody_1.default>
          <CardFooter_1.default>Footer</CardFooter_1.default>
        </Card_1.default>
      </Row>
      <Row>
        <Card_1.default isWarning>
          <CardBody_1.default>Warning</CardBody_1.default>
          <CardFooter_1.default>Footer</CardFooter_1.default>
        </Card_1.default>
      </Row>
      <Row>
        <Card_1.default isDisabled>
          <CardBody_1.default>Disabled</CardBody_1.default>
          <CardFooter_1.default>Footer</CardFooter_1.default>
        </Card_1.default>
      </Row>
    </div>);
};
exports.Default = Default;
var CardHeader = function () {
    return (<div style={{ padding: "32px", width: "500px" }}>
      <Row>
        <Card_1.default>
          <CardHeader_1.default>
            <Heading_1.default size="xl">Card Header</Heading_1.default>
          </CardHeader_1.default>
          <CardBody_1.default>Body</CardBody_1.default>
          <CardFooter_1.default>Footer</CardFooter_1.default>
        </Card_1.default>
      </Row>
      <Row>
        <Card_1.default>
          <CardHeader_1.default variant="blue">
            <Heading_1.default size="xl">Card Header</Heading_1.default>
          </CardHeader_1.default>
          <CardBody_1.default>Body</CardBody_1.default>
          <CardFooter_1.default>Footer</CardFooter_1.default>
        </Card_1.default>
      </Row>
      <Row>
        <Card_1.default>
          <CardHeader_1.default variant="violet">
            <Heading_1.default size="xl">Card Header</Heading_1.default>
          </CardHeader_1.default>
          <CardBody_1.default>Body</CardBody_1.default>
          <CardFooter_1.default>Footer</CardFooter_1.default>
        </Card_1.default>
      </Row>
      <Row>
        <Card_1.default>
          <CardHeader_1.default variant="bubblegum">
            <Heading_1.default size="xl">Card Header</Heading_1.default>
          </CardHeader_1.default>
          <CardBody_1.default>Body</CardBody_1.default>
          <CardFooter_1.default>Footer</CardFooter_1.default>
        </Card_1.default>
      </Row>
    </div>);
};
exports.CardHeader = CardHeader;
var Ribbon = function () {
    return (<div style={{ padding: "32px", width: "500px" }}>
      <Row>
        <Card_1.default ribbon={<CardRibbon_1.default text="Ribbon"/>}>
          <div style={{ height: "112px", backgroundColor: "#191326" }}/>
          <CardBody_1.default style={{ height: "150px" }}>Body</CardBody_1.default>
        </Card_1.default>
      </Row>
      <Row>
        <Card_1.default ribbon={<CardRibbon_1.default variantColor="textDisabled" text="Ribbon with Long Text"/>}>
          <CardBody_1.default style={{ height: "150px" }}>Ribbons will truncate when text is too long</CardBody_1.default>
        </Card_1.default>
      </Row>
      <Row>
        <Card_1.default ribbon={<CardRibbon_1.default variantColor="success" text="Success"/>}>
          <CardBody_1.default style={{ height: "150px" }}>Card</CardBody_1.default>
        </Card_1.default>
      </Row>
      <Row>
        <Card_1.default ribbon={<CardRibbon_1.default variantColor="failure" text="Failure"/>}>
          <CardBody_1.default style={{ height: "150px" }}>Any Color in the theme</CardBody_1.default>
        </Card_1.default>
      </Row>
      <Row>
        <Card_1.default ribbon={<CardRibbon_1.default variantColor="failure" text="Failure" ribbonPosition="left"/>}>
          <CardBody_1.default style={{ height: "150px" }}>Any Color in the theme</CardBody_1.default>
        </Card_1.default>
      </Row>
    </div>);
};
exports.Ribbon = Ribbon;
var templateObject_1;
