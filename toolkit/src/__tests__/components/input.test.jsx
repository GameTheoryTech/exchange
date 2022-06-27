"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var testHelpers_1 = require("../../testHelpers");
var Input_1 = require("../../components/Input/Input");
var handleChange = jest.fn();
it("renders correctly", function () {
    var asFragment = testHelpers_1.renderWithTheme(<Input_1.default type="text" value="input" onChange={handleChange}/>).asFragment;
    expect(asFragment()).toMatchInlineSnapshot("\n    <DocumentFragment>\n      .c0 {\n      background-color: #eeeaf4;\n      border: 0;\n      border-radius: 16px;\n      box-shadow: inset 0px 2px 2px -1px rgba(74,74,104,0.1);\n      color: #280D5F;\n      display: block;\n      font-size: 16px;\n      height: 40px;\n      outline: 0;\n      padding: 0 16px;\n      width: 100%;\n    }\n\n    .c0::-webkit-input-placeholder {\n      color: #7A6EAA;\n    }\n\n    .c0::-moz-placeholder {\n      color: #7A6EAA;\n    }\n\n    .c0:-ms-input-placeholder {\n      color: #7A6EAA;\n    }\n\n    .c0::placeholder {\n      color: #7A6EAA;\n    }\n\n    .c0:disabled {\n      background-color: #E9EAEB;\n      box-shadow: none;\n      color: #BDC2C4;\n      cursor: not-allowed;\n    }\n\n    .c0:focus:not(:disabled) {\n      box-shadow: 0px 0px 0px 1px #7645D9,0px 0px 0px 4px rgba(118,69,217,0.6);\n    }\n\n    <input\n        class=\"c0\"\n        scale=\"md\"\n        type=\"text\"\n        value=\"input\"\n      />\n    </DocumentFragment>\n  ");
});
