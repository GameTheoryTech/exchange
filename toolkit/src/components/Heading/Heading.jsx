"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var styled_components_1 = require("styled-components");
var Text_1 = require("../Text/Text");
var types_1 = require("./types");
var style = (_a = {},
    _a[types_1.scales.MD] = {
        fontSize: "20px",
        fontSizeLg: "20px",
    },
    _a[types_1.scales.LG] = {
        fontSize: "24px",
        fontSizeLg: "24px",
    },
    _a[types_1.scales.XL] = {
        fontSize: "32px",
        fontSizeLg: "40px",
    },
    _a[types_1.scales.XXL] = {
        fontSize: "48px",
        fontSizeLg: "64px",
    },
    _a);
var Heading = styled_components_1.default(Text_1.default).attrs({ bold: true })(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  font-size: ", ";\n  font-family: \"kallisto\", sans-serif;\n  font-weight: 600;\n  line-height: 1.1;\n\n  ", " {\n    font-size: ", ";\n  }\n"], ["\n  font-size: ", ";\n  font-family: \"kallisto\", sans-serif;\n  font-weight: 600;\n  line-height: 1.1;\n\n  ", " {\n    font-size: ", ";\n  }\n"])), function (_a) {
    var scale = _a.scale;
    return style[scale || types_1.scales.MD].fontSize;
}, function (_a) {
    var theme = _a.theme;
    return theme.mediaQueries.lg;
}, function (_a) {
    var scale = _a.scale;
    return style[scale || types_1.scales.MD].fontSizeLg;
});
Heading.defaultProps = {
    as: types_1.tags.H2,
};
exports.default = Heading;
var templateObject_1;
