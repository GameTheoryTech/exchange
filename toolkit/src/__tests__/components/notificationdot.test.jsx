"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var testHelpers_1 = require("../../testHelpers");
var NotificationDot_1 = require("../../components/NotificationDot/NotificationDot");
it("renders correctly", function () {
    var asFragment = testHelpers_1.renderWithTheme(<NotificationDot_1.default>
      <div />
    </NotificationDot_1.default>).asFragment;
    expect(asFragment()).toMatchInlineSnapshot("\n    <DocumentFragment>\n      .c0 {\n      display: -webkit-inline-box;\n      display: -webkit-inline-flex;\n      display: -ms-inline-flexbox;\n      display: inline-flex;\n      position: relative;\n    }\n\n    .c1 {\n      display: none;\n      position: absolute;\n      top: 0;\n      right: 0;\n      width: 10px;\n      height: 10px;\n      pointer-events: none;\n      border: 2px solid #FFFFFF;\n      border-radius: 50%;\n      background-color: #ED4B9E;\n    }\n\n    <span\n        class=\"c0\"\n      >\n        <div />\n        <span\n          class=\"c1\"\n        />\n      </span>\n    </DocumentFragment>\n  ");
});
