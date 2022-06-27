import React from "react";
import { PancakesIcon } from "../Svg";
import { Link, LinkExternal } from "./index";
export default {
    title: "Components/Link",
    component: Link,
    argTypes: {
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
    },
};
export var Default = function () {
    return (React.createElement("div", null,
        React.createElement("div", null,
            React.createElement(Link, { href: "/" }, "Default")),
        React.createElement("div", null,
            React.createElement(Link, { href: "/", color: "text" }, "Custom color")),
        React.createElement("div", null,
            React.createElement(Link, { external: true, href: "/" }, "External")),
        React.createElement("div", null,
            React.createElement(Link, { href: "/" },
                "With icon",
                React.createElement(PancakesIcon, null))),
        React.createElement("div", null,
            React.createElement(LinkExternal, { href: "/" }, "LinkExternal"))));
};
