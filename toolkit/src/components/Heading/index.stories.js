import React from "react";
import Heading from "./Heading";
export default {
    title: "Components/Heading",
    component: Heading,
    argTypes: {},
};
export var Sizes = function () {
    return (React.createElement("div", null,
        React.createElement(Heading, null, "Default"),
        React.createElement(Heading, { scale: "md" }, "Size md"),
        React.createElement(Heading, { scale: "lg" }, "Size lg"),
        React.createElement(Heading, { scale: "xl" }, "Size xl"),
        React.createElement(Heading, { scale: "xxl" }, "Size xxl")));
};
export var tags = function () {
    return (React.createElement("div", null,
        React.createElement(Heading, null, "Default"),
        React.createElement(Heading, { as: "h1" }, "Tag h1"),
        React.createElement(Heading, { as: "h2" }, "Tag h2"),
        React.createElement(Heading, { as: "h3" }, "Tag h3"),
        React.createElement(Heading, { as: "h4" }, "Tag h4"),
        React.createElement(Heading, { as: "h5" }, "Tag h5"),
        React.createElement(Heading, { as: "h6" }, "Tag h6")));
};
