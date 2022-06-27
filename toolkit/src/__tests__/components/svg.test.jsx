"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var testHelpers_1 = require("../../testHelpers");
var Svg_1 = require("../../components/Svg");
it("renders correctly", function () {
    var asFragment = testHelpers_1.renderWithTheme(<Svg_1.Svg viewBox="0 0 24 24">
      <path d="M18 13H13V18C13 18.55 12.55 19 12 19C11.45 19 11 18.55 11 18V13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H11V6C11 5.45 11.45 5 12 5C12.55 5 13 5.45 13 6V11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z"/>
    </Svg_1.Svg>).asFragment;
    expect(asFragment()).toMatchInlineSnapshot("\n    <DocumentFragment>\n      .c0 {\n      -webkit-align-self: center;\n      -ms-flex-item-align: center;\n      align-self: center;\n      fill: #280D5F;\n      -webkit-flex-shrink: 0;\n      -ms-flex-negative: 0;\n      flex-shrink: 0;\n    }\n\n    <svg\n        class=\"c0\"\n        color=\"text\"\n        viewBox=\"0 0 24 24\"\n        width=\"20px\"\n        xmlns=\"http://www.w3.org/2000/svg\"\n      >\n        <path\n          d=\"M18 13H13V18C13 18.55 12.55 19 12 19C11.45 19 11 18.55 11 18V13H6C5.45 13 5 12.55 5 12C5 11.45 5.45 11 6 11H11V6C11 5.45 11.45 5 12 5C12.55 5 13 5.45 13 6V11H18C18.55 11 19 11.45 19 12C19 12.55 18.55 13 18 13Z\"\n        />\n      </svg>\n    </DocumentFragment>\n  ");
});
