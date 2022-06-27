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
    return (React.createElement("div", { style: { padding: "32px", width: "500px" } },
        React.createElement(Row, null,
            React.createElement(Card_1.default, null,
                React.createElement(CardBody_1.default, null, "Body"),
                React.createElement(CardFooter_1.default, null, "Footer"))),
        React.createElement(Row, null,
            React.createElement(Card_1.default, { isActive: true },
                React.createElement(CardBody_1.default, null, "Active"),
                React.createElement(CardFooter_1.default, null, "Footer"))),
        React.createElement(Row, null,
            React.createElement(Card_1.default, { isSuccess: true },
                React.createElement(CardBody_1.default, null, "Success"),
                React.createElement(CardFooter_1.default, null, "Footer"))),
        React.createElement(Row, null,
            React.createElement(Card_1.default, { isWarning: true },
                React.createElement(CardBody_1.default, null, "Warning"),
                React.createElement(CardFooter_1.default, null, "Footer"))),
        React.createElement(Row, null,
            React.createElement(Card_1.default, { isDisabled: true },
                React.createElement(CardBody_1.default, null, "Disabled"),
                React.createElement(CardFooter_1.default, null, "Footer")))));
};
exports.Default = Default;
var CardHeader = function () {
    return (React.createElement("div", { style: { padding: "32px", width: "500px" } },
        React.createElement(Row, null,
            React.createElement(Card_1.default, null,
                React.createElement(CardHeader_1.default, null,
                    React.createElement(Heading_1.default, { size: "xl" }, "Card Header")),
                React.createElement(CardBody_1.default, null, "Body"),
                React.createElement(CardFooter_1.default, null, "Footer"))),
        React.createElement(Row, null,
            React.createElement(Card_1.default, null,
                React.createElement(CardHeader_1.default, { variant: "blue" },
                    React.createElement(Heading_1.default, { size: "xl" }, "Card Header")),
                React.createElement(CardBody_1.default, null, "Body"),
                React.createElement(CardFooter_1.default, null, "Footer"))),
        React.createElement(Row, null,
            React.createElement(Card_1.default, null,
                React.createElement(CardHeader_1.default, { variant: "violet" },
                    React.createElement(Heading_1.default, { size: "xl" }, "Card Header")),
                React.createElement(CardBody_1.default, null, "Body"),
                React.createElement(CardFooter_1.default, null, "Footer"))),
        React.createElement(Row, null,
            React.createElement(Card_1.default, null,
                React.createElement(CardHeader_1.default, { variant: "bubblegum" },
                    React.createElement(Heading_1.default, { size: "xl" }, "Card Header")),
                React.createElement(CardBody_1.default, null, "Body"),
                React.createElement(CardFooter_1.default, null, "Footer")))));
};
exports.CardHeader = CardHeader;
var Ribbon = function () {
    return (React.createElement("div", { style: { padding: "32px", width: "500px" } },
        React.createElement(Row, null,
            React.createElement(Card_1.default, { ribbon: React.createElement(CardRibbon_1.default, { text: "Ribbon" }) },
                React.createElement("div", { style: { height: "112px", backgroundColor: "#191326" } }),
                React.createElement(CardBody_1.default, { style: { height: "150px" } }, "Body"))),
        React.createElement(Row, null,
            React.createElement(Card_1.default, { ribbon: React.createElement(CardRibbon_1.default, { variantColor: "textDisabled", text: "Ribbon with Long Text" }) },
                React.createElement(CardBody_1.default, { style: { height: "150px" } }, "Ribbons will truncate when text is too long"))),
        React.createElement(Row, null,
            React.createElement(Card_1.default, { ribbon: React.createElement(CardRibbon_1.default, { variantColor: "success", text: "Success" }) },
                React.createElement(CardBody_1.default, { style: { height: "150px" } }, "Card"))),
        React.createElement(Row, null,
            React.createElement(Card_1.default, { ribbon: React.createElement(CardRibbon_1.default, { variantColor: "failure", text: "Failure" }) },
                React.createElement(CardBody_1.default, { style: { height: "150px" } }, "Any Color in the theme"))),
        React.createElement(Row, null,
            React.createElement(Card_1.default, { ribbon: React.createElement(CardRibbon_1.default, { variantColor: "failure", text: "Failure", ribbonPosition: "left" }) },
                React.createElement(CardBody_1.default, { style: { height: "150px" } }, "Any Color in the theme")))));
};
exports.Ribbon = Ribbon;
var templateObject_1;
