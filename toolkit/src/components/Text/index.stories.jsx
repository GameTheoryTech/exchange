"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TooltipTextVariant = exports.Default = void 0;
var react_1 = require("react");
var Text_1 = require("./Text");
var TooltipText_1 = require("./TooltipText");
exports.default = {
    title: "Components/Text",
    component: Text_1.default,
    argTypes: {
        bold: {
            name: "bold",
            table: {
                type: { summary: "bool", detail: "Bold the text" },
                defaultValue: { summary: false },
            },
            control: {
                type: null,
            },
        },
        fontSize: {
            name: "fontSize",
            table: {
                type: { summary: "string", detail: "Fontsize in px or em" },
                defaultValue: { summary: "16px" },
            },
            control: {
                type: null,
            },
        },
        color: {
            name: "color",
            table: {
                type: { summary: "string", detail: "Color from the theme, or CSS color" },
                defaultValue: { summary: "theme.colors.text" },
            },
            control: {
                type: null,
            },
        },
    },
};
var Default = function () {
    return (<div>
      <Text_1.default>Default</Text_1.default>
      <Text_1.default bold>Bold text</Text_1.default>
      <Text_1.default small>Small text</Text_1.default>
      <Text_1.default fontSize="24px">Custom fontsize</Text_1.default>
      <Text_1.default color="red">Custom color</Text_1.default>
      <Text_1.default color="primary">Custom color from theme</Text_1.default>
      <Text_1.default color="secondary" textTransform="uppercase">
        with text transform
      </Text_1.default>
      <Text_1.default textAlign="center">center</Text_1.default>
      <Text_1.default display="inline" color="textSubtle" textTransform="uppercase">
        Example of{" "}
      </Text_1.default>
      <Text_1.default display="inline" bold textTransform="uppercase">
        inline{" "}
      </Text_1.default>
      <Text_1.default display="inline" color="textSubtle" textTransform="uppercase">
        Text
      </Text_1.default>
      <Text_1.default ellipsis width="250px">
        Ellipsis: a long text with an ellipsis just for the example
      </Text_1.default>
    </div>);
};
exports.Default = Default;
var TooltipTextVariant = function () {
    return (<div>
      <Text_1.default>Use TooltipText for text that has tooltip, it accepts the same props as normal Text component</Text_1.default>
      <TooltipText_1.default>Example</TooltipText_1.default>
    </div>);
};
exports.TooltipTextVariant = TooltipTextVariant;
