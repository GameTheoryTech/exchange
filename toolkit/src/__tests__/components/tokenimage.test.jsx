"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var testHelpers_1 = require("../../testHelpers");
var TokenImage_1 = require("../../components/Image/TokenImage");
it("renders correctly", function () {
    testHelpers_1.setupMockIntersectionObserver();
    var asFragment = testHelpers_1.renderWithTheme(<TokenImage_1.default src="https://pancakeswap.finance/images/tokens/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82.svg" height={48} width={48}/>).asFragment;
    expect(asFragment()).toMatchInlineSnapshot("\n    <DocumentFragment>\n      .c0 {\n      max-height: 48px;\n      max-width: 48px;\n      position: relative;\n      width: 100%;\n    }\n\n    .c0:after {\n      content: \"\";\n      display: block;\n      padding-top: 100%;\n    }\n\n    .c2 {\n      height: 100%;\n      left: 0;\n      position: absolute;\n      top: 0;\n      width: 100%;\n    }\n\n    .c1:before {\n      border-radius: 50%;\n      border: 1px solid rgba(0,0,0,0.25);\n      content: \"\";\n      height: 100%;\n      left: 0;\n      position: absolute;\n      top: 0;\n      width: 100%;\n      z-index: 7;\n    }\n\n    <div\n        class=\"c0 c1\"\n      >\n        <div\n          class=\"c2\"\n        />\n      </div>\n    </DocumentFragment>\n  ");
});
