"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var testHelpers_1 = require("../../testHelpers");
var Tag_1 = require("../../components/Tag/Tag");
it("renders correctly", function () {
    var asFragment = testHelpers_1.renderWithTheme(<Tag_1.default>Core</Tag_1.default>).asFragment;
    expect(asFragment()).toMatchInlineSnapshot("\n    <DocumentFragment>\n      .c0 {\n      -webkit-align-items: center;\n      -webkit-box-align: center;\n      -ms-flex-align: center;\n      align-items: center;\n      border-radius: 16px;\n      color: #ffffff;\n      display: -webkit-inline-box;\n      display: -webkit-inline-flex;\n      display: -ms-inline-flexbox;\n      display: inline-flex;\n      font-weight: 400;\n      white-space: nowrap;\n      height: 28px;\n      padding: 0 8px;\n      font-size: 14px;\n      background-color: #1FC7D4;\n    }\n\n    .c0 > svg {\n      fill: currentColor;\n    }\n\n    <div\n        class=\"c0\"\n        scale=\"md\"\n      >\n        Core\n      </div>\n    </DocumentFragment>\n  ");
});
