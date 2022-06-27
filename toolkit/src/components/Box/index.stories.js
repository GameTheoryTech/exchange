"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = exports.Flex = exports.Box = void 0;
var react_1 = require("react");
var Box_1 = require("./Box");
var Flex_1 = require("./Flex");
var Grid_1 = require("./Grid");
var Text_1 = require("../Text/Text");
var Link_1 = require("../Link");
exports.default = {
    title: "Components/Primitives",
    component: Box_1.default,
    argTypes: {},
};
var Box = function () {
    return (React.createElement("div", null,
        React.createElement(Box_1.default, { as: "p" },
            "Contains background, border, layout, position, and space from",
            " ",
            React.createElement(Link_1.Link, { href: "https://styled-system.com/api", target: "_blank" }, "Styled System\u2018s API"))));
};
exports.Box = Box;
var Flex = function () {
    return (React.createElement("div", null,
        React.createElement(Text_1.default, null, "Based on the Box component. You can apply any flexbox properties on the Flex component."),
        React.createElement(Link_1.Link, { href: "https://styled-system.com/api#flexbox", target: "_blank" }, "List of applicable props"),
        React.createElement(Flex_1.default, { justifyContent: "space-between", mt: "40px" },
            React.createElement("span", null, "Left"),
            React.createElement("span", null, "right")),
        React.createElement(Flex_1.default, { justifyContent: "center", mt: "8px" },
            React.createElement("span", null, "center"))));
};
exports.Flex = Flex;
var Grid = function () {
    return (React.createElement(Grid_1.default, { justifyItems: "center", alignContent: "center", gridTemplateColumns: "1fr 1fr", gridColumnGap: "16px", style: { backgroundColor: "#7645D9" } },
        React.createElement(Box_1.default, { style: { backgroundColor: "#1fc7d4", width: "300px", height: "300px" } }),
        React.createElement(Box_1.default, { style: { backgroundColor: "#1fc7d4", width: "300px", height: "300px" } })));
};
exports.Grid = Grid;
