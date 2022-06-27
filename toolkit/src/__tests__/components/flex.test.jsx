"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var testHelpers_1 = require("../../testHelpers");
var Flex_1 = require("../../components/Box/Flex");
it("renders correctly", function () {
    var asFragment = testHelpers_1.renderWithTheme(<Flex_1.default>flex</Flex_1.default>).asFragment;
    expect(asFragment()).toMatchInlineSnapshot("\n    <DocumentFragment>\n      .c0 {\n      display: -webkit-box;\n      display: -webkit-flex;\n      display: -ms-flexbox;\n      display: flex;\n    }\n\n    <div\n        class=\"c0\"\n      >\n        flex\n      </div>\n    </DocumentFragment>\n  ");
});
