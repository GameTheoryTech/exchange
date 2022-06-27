"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
var react_1 = require("react");
var Svg_1 = require("../Svg");
var index_1 = require("./index");
exports.default = {
    title: "Components/Link",
    component: index_1.Link,
    argTypes: {
        fontSize: {
            name: "fontSize",
            table: {
                type: { summary: "string", detail: "Fontsize in px or em" },
                defaultValue: { summary: "16px" },
            },
            control: {
                type: null,
            },
        },
    },
};
var Default = function () {
    return (<div>
      <div>
        <index_1.Link href="/">Default</index_1.Link>
      </div>
      <div>
        <index_1.Link href="/" color="text">
          Custom color
        </index_1.Link>
      </div>
      <div>
        <index_1.Link external href="/">
          External
        </index_1.Link>
      </div>
      <div>
        <index_1.Link href="/">
          With icon
          <Svg_1.PancakesIcon />
        </index_1.Link>
      </div>
      <div>
        <index_1.LinkExternal href="/">LinkExternal</index_1.LinkExternal>
      </div>
    </div>);
};
exports.Default = Default;
