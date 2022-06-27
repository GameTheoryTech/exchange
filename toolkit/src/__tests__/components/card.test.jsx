"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var testHelpers_1 = require("../../testHelpers");
var Card_1 = require("../../components/Card");
it("renders correctly", function () {
    var asFragment = testHelpers_1.renderWithTheme(<Card_1.Card>
      <Card_1.CardHeader>Header</Card_1.CardHeader>
      <Card_1.CardBody>Body</Card_1.CardBody>
      <Card_1.CardFooter>Footer</Card_1.CardFooter>
    </Card_1.Card>).asFragment;
    expect(asFragment()).toMatchInlineSnapshot("\n    <DocumentFragment>\n      .c0 {\n      background-color: #FFFFFF;\n      border: 0px 2px 12px -8px rgba(25,19,38,0.1),0px 1px 1px rgba(25,19,38,0.05);\n      border-radius: 24px;\n      box-shadow: 0px 2px 12px -8px rgba(25,19,38,0.1),0px 1px 1px rgba(25,19,38,0.05);\n      color: #280D5F;\n      overflow: hidden;\n      position: relative;\n    }\n\n    .c2 {\n      padding: 24px;\n    }\n\n    .c1 {\n      background: linear-gradient(111.68deg,#F2ECF2 0%,#E8F2F6 100%);\n      padding: 24px;\n    }\n\n    .c3 {\n      border-top: 1px solid #E7E3EB;\n      padding: 24px;\n    }\n\n    <div\n        class=\"c0\"\n      >\n        <div\n          class=\"c1\"\n        >\n          Header\n        </div>\n        <div\n          class=\"c2\"\n        >\n          Body\n        </div>\n        <div\n          class=\"c3\"\n        >\n          Footer\n        </div>\n      </div>\n    </DocumentFragment>\n  ");
});
