import React from "react";
import { capitalize } from "lodash";
import Box from "../Box/Box";
import Flex from "../Box/Flex";
import { CommunityIcon, RemoveIcon } from "../Svg";
import Tag from "./Tag";
import { scales, variants } from "./types";
export default {
    title: "Components/Tag",
    argTypes: {},
};
export var Default = function () {
    return (React.createElement(Box, null, Object.values(variants).map(function (variant) {
        return (React.createElement(Box, { key: variant, mb: "32px " },
            React.createElement(Flex, { alignItems: "center" },
                Object.values(scales).map(function (scale) {
                    return (React.createElement(Tag, { scale: scale, variant: variant, mr: "8px" }, capitalize(variant) + ": " + scale.toUpperCase()));
                }),
                React.createElement(Tag, { variant: variant, outline: true, mr: "8px" }, capitalize(variant) + " Outline"),
                React.createElement(Tag, { variant: variant, outline: true, startIcon: React.createElement(CommunityIcon, null), mr: "8px" }, capitalize(variant) + " Icon Left"),
                React.createElement(Tag, { variant: variant, outline: true, endIcon: React.createElement(RemoveIcon, null), mr: "8px" }, capitalize(variant) + " Icon Right"),
                React.createElement(Tag, { variant: variant, outline: true, startIcon: React.createElement(CommunityIcon, null), endIcon: React.createElement(RemoveIcon, null) }, capitalize(variant) + " Both"))));
    })));
};
