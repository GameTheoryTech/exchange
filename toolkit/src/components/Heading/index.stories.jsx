"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tags = exports.Sizes = void 0;
var react_1 = require("react");
var Heading_1 = require("./Heading");
exports.default = {
    title: "Components/Heading",
    component: Heading_1.default,
    argTypes: {},
};
var Sizes = function () {
    return (<div>
      <Heading_1.default>Default</Heading_1.default>
      <Heading_1.default scale="md">Size md</Heading_1.default>
      <Heading_1.default scale="lg">Size lg</Heading_1.default>
      <Heading_1.default scale="xl">Size xl</Heading_1.default>
      <Heading_1.default scale="xxl">Size xxl</Heading_1.default>
    </div>);
};
exports.Sizes = Sizes;
var tags = function () {
    return (<div>
      <Heading_1.default>Default</Heading_1.default>
      <Heading_1.default as="h1">Tag h1</Heading_1.default>
      <Heading_1.default as="h2">Tag h2</Heading_1.default>
      <Heading_1.default as="h3">Tag h3</Heading_1.default>
      <Heading_1.default as="h4">Tag h4</Heading_1.default>
      <Heading_1.default as="h5">Tag h5</Heading_1.default>
      <Heading_1.default as="h6">Tag h6</Heading_1.default>
    </div>);
};
exports.tags = tags;
