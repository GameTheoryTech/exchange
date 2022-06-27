"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
var react_1 = require("react");
var lodash_1 = require("lodash");
var Box_1 = require("../Box/Box");
var Flex_1 = require("../Box/Flex");
var Svg_1 = require("../Svg");
var Tag_1 = require("./Tag");
var types_1 = require("./types");
exports.default = {
    title: "Components/Tag",
    argTypes: {},
};
var Default = function () {
    return (<Box_1.default>
      {Object.values(types_1.variants).map(function (variant) {
            return (<Box_1.default key={variant} mb="32px ">
            <Flex_1.default alignItems="center">
              {Object.values(types_1.scales).map(function (scale) {
                    return (<Tag_1.default scale={scale} variant={variant} mr="8px">
                    {lodash_1.capitalize(variant) + ": " + scale.toUpperCase()}
                  </Tag_1.default>);
                })}
              <Tag_1.default variant={variant} outline mr="8px">
                {lodash_1.capitalize(variant) + " Outline"}
              </Tag_1.default>
              <Tag_1.default variant={variant} outline startIcon={<Svg_1.CommunityIcon />} mr="8px">
                {lodash_1.capitalize(variant) + " Icon Left"}
              </Tag_1.default>
              <Tag_1.default variant={variant} outline endIcon={<Svg_1.RemoveIcon />} mr="8px">
                {lodash_1.capitalize(variant) + " Icon Right"}
              </Tag_1.default>
              <Tag_1.default variant={variant} outline startIcon={<Svg_1.CommunityIcon />} endIcon={<Svg_1.RemoveIcon />}>
                {lodash_1.capitalize(variant) + " Both"}
              </Tag_1.default>
            </Flex_1.default>
          </Box_1.default>);
        })}
    </Box_1.default>);
};
exports.Default = Default;
