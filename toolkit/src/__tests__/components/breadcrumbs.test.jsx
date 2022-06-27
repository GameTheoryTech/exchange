"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var testHelpers_1 = require("../../testHelpers");
var Breadcrumbs_1 = require("../../components/Breadcrumbs/Breadcrumbs");
it("renders correctly", function () {
    var asFragment = testHelpers_1.renderWithTheme(<Breadcrumbs_1.default>Link</Breadcrumbs_1.default>).asFragment;
    expect(asFragment()).toMatchInlineSnapshot("\n    <DocumentFragment>\n      .c0 {\n      -webkit-align-items: center;\n      -webkit-box-align: center;\n      -ms-flex-align: center;\n      align-items: center;\n      display: -webkit-box;\n      display: -webkit-flex;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-flex-wrap: wrap;\n      -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n      list-style-type: none;\n    }\n\n    <ul\n        class=\"c0\"\n      />\n    </DocumentFragment>\n  ");
});
