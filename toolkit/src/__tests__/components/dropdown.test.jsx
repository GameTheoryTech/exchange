"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var testHelpers_1 = require("../../testHelpers");
var Dropdown_1 = require("../../components/Dropdown/Dropdown");
it("renders correctly", function () {
    var asFragment = testHelpers_1.renderWithTheme(<Dropdown_1.default target={<div>target</div>}/>).asFragment;
    expect(asFragment()).toMatchInlineSnapshot("\n    <DocumentFragment>\n      .c2 {\n      width: -webkit-max-content;\n      width: -moz-max-content;\n      width: max-content;\n      display: none;\n      -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n      flex-direction: column;\n      position: absolute;\n      -webkit-transform: translate(-50%,0);\n      -ms-transform: translate(-50%,0);\n      transform: translate(-50%,0);\n      left: 50%;\n      bottom: auto;\n      background-color: #FFFFFF;\n      box-shadow: 0px 2px 12px -8px rgba(25,19,38,0.1),0px 1px 1px rgba(25,19,38,0.05);\n      padding: 16px;\n      max-height: 400px;\n      overflow-y: auto;\n      z-index: 10;\n      border-radius: 4px;\n    }\n\n    .c0 {\n      position: relative;\n    }\n\n    .c0:hover .c1,\n    .c0:focus-within .c1 {\n      display: -webkit-box;\n      display: -webkit-flex;\n      display: -ms-flexbox;\n      display: flex;\n    }\n\n    <div\n        class=\"c0\"\n      >\n        <div>\n          target\n        </div>\n        <div\n          class=\"c1 c2\"\n        />\n      </div>\n    </DocumentFragment>\n  ");
});
