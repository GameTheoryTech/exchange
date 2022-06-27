import React from "react";
import Text from "./Text";
import TooltipText from "./TooltipText";
export default {
    title: "Components/Text",
    component: Text,
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
export var Default = function () {
    return (React.createElement("div", null,
        React.createElement(Text, null, "Default"),
        React.createElement(Text, { bold: true }, "Bold text"),
        React.createElement(Text, { small: true }, "Small text"),
        React.createElement(Text, { fontSize: "24px" }, "Custom fontsize"),
        React.createElement(Text, { color: "red" }, "Custom color"),
        React.createElement(Text, { color: "primary" }, "Custom color from theme"),
        React.createElement(Text, { color: "secondary", textTransform: "uppercase" }, "with text transform"),
        React.createElement(Text, { textAlign: "center" }, "center"),
        React.createElement(Text, { display: "inline", color: "textSubtle", textTransform: "uppercase" },
            "Example of",
            " "),
        React.createElement(Text, { display: "inline", bold: true, textTransform: "uppercase" },
            "inline",
            " "),
        React.createElement(Text, { display: "inline", color: "textSubtle", textTransform: "uppercase" }, "Text"),
        React.createElement(Text, { ellipsis: true, width: "250px" }, "Ellipsis: a long text with an ellipsis just for the example")));
};
export var TooltipTextVariant = function () {
    return (React.createElement("div", null,
        React.createElement(Text, null, "Use TooltipText for text that has tooltip, it accepts the same props as normal Text component"),
        React.createElement(TooltipText, null, "Example")));
};
