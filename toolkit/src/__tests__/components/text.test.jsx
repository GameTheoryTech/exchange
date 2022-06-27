"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var testHelpers_1 = require("../../testHelpers");
var Text_1 = require("../../components/Text/Text");
it("renders correctly", function () {
    var asFragment = testHelpers_1.renderWithTheme(<Text_1.default>pancake</Text_1.default>).asFragment;
    expect(asFragment()).toMatchInlineSnapshot("\n    <DocumentFragment>\n      .c0 {\n      color: #280D5F;\n      font-size: 16px;\n      font-weight: 400;\n      line-height: 1.5;\n    }\n\n    <div\n        class=\"c0\"\n        color=\"text\"\n      >\n        pancake\n      </div>\n    </DocumentFragment>\n  ");
});
