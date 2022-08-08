var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import styled from "styled-components";
import Button from "./Button";
var IconButton = styled(Button)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 0;\n  border-radius: 100%;\n  width: ", ";\n  height: ", ";\n\n  &:hover {\n    box-shadow: none!important;\n  }\n"], ["\n  padding: 0;\n  border-radius: 100%;\n  width: ", ";\n  height: ", ";\n\n  &:hover {\n    box-shadow: none!important;\n  }\n"])), function (_a) {
    var scale = _a.scale;
    return (scale === "sm" ? "32px" : "48px");
}, function (_a) {
    var scale = _a.scale;
    return (scale === "sm" ? "32px" : "48px");
});
export default IconButton;
var templateObject_1;
