"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var Flex_1 = require("../Box/Flex");
var Wrapper = styled_components_1.default(Flex_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  border-bottom: 2px solid ", ";\n  overflow-x: scroll;\n\n  ::-webkit-scrollbar {\n    display: none;\n  }\n  -ms-overflow-style: none; /* IE and Edge */\n  scrollbar-width: none; /* Firefox */\n"], ["\n  border-bottom: 2px solid ", ";\n  overflow-x: scroll;\n\n  ::-webkit-scrollbar {\n    display: none;\n  }\n  -ms-overflow-style: none; /* IE and Edge */\n  scrollbar-width: none; /* Firefox */\n"])), function (_a) {
    var theme = _a.theme;
    return theme.colors.textSubtle;
});
var Inner = styled_components_1.default(Flex_1.default)(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  justify-content: space-between;\n  flex-grow: 1;\n\n  & > button + button {\n    margin-left: 4px;\n  }\n\n  ", " {\n    flex-grow: 0;\n  }\n"], ["\n  justify-content: space-between;\n  flex-grow: 1;\n\n  & > button + button {\n    margin-left: 4px;\n  }\n\n  ", " {\n    flex-grow: 0;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.mediaQueries.md;
});
var ButtonMenu = function (_a) {
    var _b = _a.activeIndex, activeIndex = _b === void 0 ? 0 : _b, onItemClick = _a.onItemClick, children = _a.children;
    return (<Wrapper p={["0 4px", "0 16px"]}>
      <Inner>
        {react_1.Children.map(children, function (child, index) {
            var isActive = activeIndex === index;
            return react_1.cloneElement(child, {
                isActive: isActive,
                onClick: onItemClick ? function () { return onItemClick(index); } : undefined,
                color: isActive ? "backgroundAlt" : "textSubtle",
                backgroundColor: isActive ? "textSubtle" : "input",
            });
        })}
      </Inner>
    </Wrapper>);
};
exports.default = ButtonMenu;
var templateObject_1, templateObject_2;
