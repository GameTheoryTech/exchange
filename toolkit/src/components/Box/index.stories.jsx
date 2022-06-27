"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Grid = exports.Flex = exports.Box = void 0;
var react_1 = require("react");
var Box_1 = require("./Box");
var Flex_1 = require("./Flex");
var Grid_1 = require("./Grid");
var Text_1 = require("../Text/Text");
var Link_1 = require("../Link");
exports.default = {
    title: "Components/Primitives",
    component: Box_1.default,
    argTypes: {},
};
var Box = function () {
    return (<div>
      <Box_1.default as="p">
        Contains background, border, layout, position, and space from{" "}
        <Link_1.Link href="https://styled-system.com/api" target="_blank">
          Styled System&lsquo;s API
        </Link_1.Link>
      </Box_1.default>
    </div>);
};
exports.Box = Box;
var Flex = function () {
    return (<div>
      <Text_1.default>Based on the Box component. You can apply any flexbox properties on the Flex component.</Text_1.default>
      <Link_1.Link href="https://styled-system.com/api#flexbox" target="_blank">
        List of applicable props
      </Link_1.Link>
      <Flex_1.default justifyContent="space-between" mt="40px">
        <span>Left</span>
        <span>right</span>
      </Flex_1.default>
      <Flex_1.default justifyContent="center" mt="8px">
        <span>center</span>
      </Flex_1.default>
    </div>);
};
exports.Flex = Flex;
var Grid = function () {
    return (<Grid_1.default justifyItems="center" alignContent="center" gridTemplateColumns="1fr 1fr" gridColumnGap="16px" style={{ backgroundColor: "#7645D9" }}>
      <Box_1.default style={{ backgroundColor: "#1fc7d4", width: "300px", height: "300px" }}/>
      <Box_1.default style={{ backgroundColor: "#1fc7d4", width: "300px", height: "300px" }}/>
    </Grid_1.default>);
};
exports.Grid = Grid;
