"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var testHelpers_1 = require("../../testHelpers");
var Heading_1 = require("../../components/Heading/Heading");
it("renders correctly", function () {
    var asFragment = testHelpers_1.renderWithTheme(<Heading_1.default>Title</Heading_1.default>).asFragment;
    expect(asFragment()).toMatchInlineSnapshot("\n    <DocumentFragment>\n      .c0 {\n      color: #280D5F;\n      font-size: 16px;\n      font-weight: 600;\n      line-height: 1.5;\n    }\n\n    .c1 {\n      font-size: 20px;\n      font-weight: 600;\n      line-height: 1.1;\n    }\n\n    @media screen and (min-width:968px) {\n      .c1 {\n        font-size: 20px;\n      }\n    }\n\n    <h2\n        class=\"c0 c1\"\n        color=\"text\"\n      >\n        Title\n      </h2>\n    </DocumentFragment>\n  ");
});
