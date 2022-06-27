"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var testHelpers_1 = require("../../testHelpers");
var Progress_1 = require("../../components/Progress/Progress");
it("renders correctly", function () {
    var asFragment = testHelpers_1.renderWithTheme(<Progress_1.default primaryStep={50}/>).asFragment;
    expect(asFragment()).toMatchInlineSnapshot("\n    <DocumentFragment>\n      .c2 {\n      position: absolute;\n      top: 0;\n      left: 0;\n      background-color: #7645D9;\n      height: 100%;\n      -webkit-transition: width 200ms ease;\n      transition: width 200ms ease;\n    }\n\n    .c0 {\n      position: relative;\n      background-color: #eeeaf4;\n      box-shadow: inset 0px 2px 2px -1px rgba(74,74,104,0.1);\n      overflow: hidden;\n      border-radius: 32px;\n      height: 16px;\n    }\n\n    .c0 .c1 {\n      border-top-left-radius: 32px;\n      border-bottom-left-radius: 32px;\n    }\n\n    <div\n        class=\"c0\"\n        scale=\"md\"\n      >\n        <div\n          class=\"c1 c2\"\n          style=\"width: 50%;\"\n        />\n      </div>\n    </DocumentFragment>\n  ");
});
