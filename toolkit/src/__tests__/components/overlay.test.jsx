"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var testHelpers_1 = require("../../testHelpers");
var Overlay_1 = require("../../components/Overlay/Overlay");
it("renders correctly", function () {
    var asFragment = (0, testHelpers_1.renderWithTheme)(<Overlay_1.default show/>).asFragment;
    expect(asFragment()).toMatchInlineSnapshot("\n    <DocumentFragment>\n      .c0 {\n      position: fixed;\n      top: 0px;\n      left: 0px;\n      width: 100%;\n      height: 100%;\n      background-color: #452a7a;\n      -webkit-transition: opacity 0.4s;\n      transition: opacity 0.4s;\n      opacity: 0.6;\n      z-index: 10;\n      pointer-events: initial;\n    }\n\n    <div\n        class=\"c0\"\n        role=\"presentation\"\n      />\n    </DocumentFragment>\n  ");
});
