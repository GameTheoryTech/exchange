"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var testHelpers_1 = require("../../testHelpers");
var Skeleton_1 = require("../../components/Skeleton/Skeleton");
it("renders correctly", function () {
    var asFragment = testHelpers_1.renderWithTheme(<Skeleton_1.default />).asFragment;
    expect(asFragment()).toMatchInlineSnapshot("\n    <DocumentFragment>\n      .c0 {\n      min-height: 20px;\n      display: block;\n      background-color: #E9EAEB;\n      border-radius: 4px;\n    }\n\n    .c1 {\n      -webkit-animation: wAFEO 2s infinite ease-out;\n      animation: wAFEO 2s infinite ease-out;\n      -webkit-transform: translate3d(0,0,0);\n      -ms-transform: translate3d(0,0,0);\n      transform: translate3d(0,0,0);\n    }\n\n    <div\n        class=\"c0 c1\"\n      />\n    </DocumentFragment>\n  ");
});
it("renders correctly avatar", function () {
    var asFragment = testHelpers_1.renderWithTheme(<Skeleton_1.default width={50} height={50} variant="circle"/>).asFragment;
    expect(asFragment()).toMatchInlineSnapshot("\n    <DocumentFragment>\n      .c0 {\n      min-height: 20px;\n      display: block;\n      background-color: #E9EAEB;\n      border-radius: 50%;\n      width: 50px;\n      height: 50px;\n    }\n\n    .c1 {\n      -webkit-animation: wAFEO 2s infinite ease-out;\n      animation: wAFEO 2s infinite ease-out;\n      -webkit-transform: translate3d(0,0,0);\n      -ms-transform: translate3d(0,0,0);\n      transform: translate3d(0,0,0);\n    }\n\n    <div\n        class=\"c0 c1\"\n        height=\"50\"\n        width=\"50\"\n      />\n    </DocumentFragment>\n  ");
});
it("renders correctly waves animation", function () {
    var asFragment = testHelpers_1.renderWithTheme(<Skeleton_1.default width={50} height={50} animation="waves"/>).asFragment;
    expect(asFragment()).toMatchInlineSnapshot("\n    <DocumentFragment>\n      .c0 {\n      min-height: 20px;\n      display: block;\n      background-color: #E9EAEB;\n      border-radius: 4px;\n      width: 50px;\n      height: 50px;\n    }\n\n    .c1 {\n      position: relative;\n      overflow: hidden;\n      -webkit-transform: translate3d(0,0,0);\n      -ms-transform: translate3d(0,0,0);\n      transform: translate3d(0,0,0);\n    }\n\n    .c1:before {\n      content: \"\";\n      position: absolute;\n      background-image: linear-gradient(90deg,transparent,rgba(243,243,243,0.5),transparent);\n      top: 0;\n      left: -150px;\n      height: 100%;\n      width: 150px;\n      -webkit-animation: kudDcV 2s cubic-bezier(0.4,0,0.2,1) infinite;\n      animation: kudDcV 2s cubic-bezier(0.4,0,0.2,1) infinite;\n    }\n\n    <div\n        class=\"c0 c1\"\n        height=\"50\"\n        width=\"50\"\n      />\n    </DocumentFragment>\n  ");
});
