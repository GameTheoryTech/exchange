"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var testHelpers_1 = require("../../testHelpers");
var Layouts_1 = require("../../components/Layouts");
it("renders base layout correctly", function () {
    var asFragment = testHelpers_1.renderWithTheme(<Layouts_1.BaseLayout>basic layout</Layouts_1.BaseLayout>).asFragment;
    expect(asFragment()).toMatchInlineSnapshot("\n    <DocumentFragment>\n      .c0 {\n      display: grid;\n    }\n\n    .c1 {\n      grid-template-columns: repeat(6,1fr);\n      grid-gap: 16px;\n    }\n\n    @media screen and (min-width:576px) {\n      .c1 {\n        grid-template-columns: repeat(8,1fr);\n        grid-gap: 24px;\n      }\n    }\n\n    @media screen and (min-width:852px) {\n      .c1 {\n        grid-template-columns: repeat(12,1fr);\n        grid-gap: 24px;\n      }\n    }\n\n    @media screen and (min-width:968px) {\n      .c1 {\n        grid-template-columns: repeat(12,1fr);\n        grid-gap: 32px;\n      }\n    }\n\n    <div\n        class=\"c0 c1\"\n      >\n        basic layout\n      </div>\n    </DocumentFragment>\n  ");
});
it("renders card layout correctly", function () {
    var asFragment = testHelpers_1.renderWithTheme(<Layouts_1.CardsLayout>cards layout</Layouts_1.CardsLayout>).asFragment;
    expect(asFragment()).toMatchInlineSnapshot("\n    <DocumentFragment>\n      .c0 {\n      display: grid;\n    }\n\n    .c1 {\n      grid-template-columns: repeat(6,1fr);\n      grid-gap: 16px;\n    }\n\n    .c2 > div {\n      grid-column: span 6;\n    }\n\n    @media screen and (min-width:576px) {\n      .c1 {\n        grid-template-columns: repeat(8,1fr);\n        grid-gap: 24px;\n      }\n    }\n\n    @media screen and (min-width:852px) {\n      .c1 {\n        grid-template-columns: repeat(12,1fr);\n        grid-gap: 24px;\n      }\n    }\n\n    @media screen and (min-width:968px) {\n      .c1 {\n        grid-template-columns: repeat(12,1fr);\n        grid-gap: 32px;\n      }\n    }\n\n    @media screen and (min-width:576px) {\n      .c2 > div {\n        grid-column: span 4;\n      }\n    }\n\n    <div\n        class=\"c0 c1 c2\"\n      >\n        cards layout\n      </div>\n    </DocumentFragment>\n  ");
});
