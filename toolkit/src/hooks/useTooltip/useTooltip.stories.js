"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) {
        Object.defineProperty(cooked, "raw", { value: raw });
    }
    else {
        cooked.raw = raw;
    }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeInversion = exports.ScreenEdges = exports.Flipping = exports.FineTuning = exports.EventPropagationAndMobile = exports.Triggers = exports.Placement = void 0;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var Input_1 = require("../../components/Input/Input");
var Toggle_1 = require("../../components/Toggle/Toggle");
var Text_1 = require("../../components/Text/Text");
var Help_1 = require("../../components/Svg/Icons/Help");
var useTooltip_1 = require("./useTooltip");
var BalanceInput_1 = require("../../components/BalanceInput/BalanceInput");
var GridCell = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"], ["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"])));
var ReferenceElement = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  background-color: #1fc7d4;\n  width: 160px;\n  height: 160px;\n  border-radius: 8px;\n"], ["\n  background-color: #1fc7d4;\n  width: 160px;\n  height: 160px;\n  border-radius: 8px;\n"])));
var Container = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  padding: 64px 120px;\n  display: grid;\n  grid-template-columns: repeat(3, 200px);\n  grid-template-rows: repeat(4, 200px);\n"], ["\n  padding: 64px 120px;\n  display: grid;\n  grid-template-columns: repeat(3, 200px);\n  grid-template-rows: repeat(4, 200px);\n"])));
var ExpandableCard = styled_components_1.default.div(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  width: 300px;\n  margin: 0 auto;\n  padding: 0 10px;\n  background-color: #fff;\n  border-radius: 8px;\n  box-shadow: rgba(70, 70, 80, 0.2) 0px 7px 29px 0px;\n"], ["\n  width: 300px;\n  margin: 0 auto;\n  padding: 0 10px;\n  background-color: #fff;\n  border-radius: 8px;\n  box-shadow: rgba(70, 70, 80, 0.2) 0px 7px 29px 0px;\n"])));
var ExpandableHeader = styled_components_1.default.div(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  height: 40px;\n  cursor: pointer;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n"], ["\n  height: 40px;\n  cursor: pointer;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n"])));
exports.default = {
    title: "Hooks/useTooltip",
};
var Placement = function () {
    // Trigger doesn't matter in this story, it just shows tooltips no matter what
    // TOP
    var _a = (0, useTooltip_1.default)("top-start", {
        placement: "top-start",
    }), targetRefTopStart = _a.targetRef, tooltipTopStart = _a.tooltip;
    var _b = (0, useTooltip_1.default)("top", { placement: "top" }), targetRefTop = _b.targetRef, tooltipTop = _b.tooltip;
    var _c = (0, useTooltip_1.default)("top-end", {
        placement: "top-end",
    }), targetRefTopEnd = _c.targetRef, tooltipTopEnd = _c.tooltip;
    // LEFT
    var _d = (0, useTooltip_1.default)("left-start", {
        placement: "left-start",
    }), targetRefLeftStart = _d.targetRef, tooltipLeftStart = _d.tooltip;
    var _e = (0, useTooltip_1.default)("left", {
        placement: "left",
    }), targetRefLeft = _e.targetRef, tooltipLeft = _e.tooltip;
    var _f = (0, useTooltip_1.default)("left-end", { placement: "left-end" }), targetRefLeftEnd = _f.targetRef, tooltipLeftEnd = _f.tooltip;
    // RIGHT
    var _g = (0, useTooltip_1.default)("right-start", {
        placement: "right-start",
    }), targetRefRightStart = _g.targetRef, tooltipRightStart = _g.tooltip;
    var _h = (0, useTooltip_1.default)("right", { placement: "right" }), targetRefRight = _h.targetRef, tooltipRight = _h.tooltip;
    var _j = (0, useTooltip_1.default)("right-end", {
        placement: "right-end",
    }), targetRefRightEnd = _j.targetRef, tooltipRightEnd = _j.tooltip;
    // BOTTOM
    var _k = (0, useTooltip_1.default)("bottom-start", {
        placement: "bottom-start",
    }), targetRefBottomStart = _k.targetRef, tooltipBottomStart = _k.tooltip;
    var _l = (0, useTooltip_1.default)("bottom", { placement: "bottom" }), targetRefBottom = _l.targetRef, tooltipBottom = _l.tooltip;
    var _m = (0, useTooltip_1.default)("bottom-end", {
        placement: "bottom-end",
    }), targetRefBottomEnd = _m.targetRef, tooltipBottomEnd = _m.tooltip;
    return (React.createElement(Container, null,
        React.createElement(GridCell, null,
            React.createElement(ReferenceElement, { ref: targetRefTopStart }),
            tooltipTopStart),
        React.createElement(GridCell, null,
            React.createElement(ReferenceElement, { ref: targetRefTop }),
            tooltipTop),
        React.createElement(GridCell, null,
            React.createElement(ReferenceElement, { ref: targetRefTopEnd }),
            tooltipTopEnd),
        React.createElement(GridCell, null,
            React.createElement(ReferenceElement, { ref: targetRefLeftStart }),
            tooltipLeftStart),
        React.createElement("div", null),
        React.createElement(GridCell, null,
            React.createElement(ReferenceElement, { ref: targetRefRightStart }),
            tooltipRightStart),
        React.createElement(GridCell, null,
            React.createElement(ReferenceElement, { ref: targetRefLeft }),
            tooltipLeft),
        React.createElement("div", null),
        React.createElement(GridCell, null,
            React.createElement(ReferenceElement, { ref: targetRefRight }),
            tooltipRight),
        React.createElement(GridCell, null,
            React.createElement(ReferenceElement, { ref: targetRefLeftEnd }),
            tooltipLeftEnd),
        React.createElement("div", null),
        React.createElement(GridCell, null,
            React.createElement(ReferenceElement, { ref: targetRefRightEnd }),
            tooltipRightEnd),
        React.createElement(GridCell, null,
            React.createElement(ReferenceElement, { ref: targetRefBottomStart }),
            tooltipBottomStart),
        React.createElement(GridCell, null,
            React.createElement(ReferenceElement, { ref: targetRefBottom }),
            tooltipBottom),
        React.createElement(GridCell, null,
            React.createElement(ReferenceElement, { ref: targetRefBottomEnd }),
            tooltipBottomEnd)));
};
exports.Placement = Placement;
var Triggers = function () {
    var _a = (0, useTooltip_1.default)("You clicked me!", { placement: "right", trigger: "click" }), tooltipVisibleClick = _a.tooltipVisible, targetRefClick = _a.targetRef, tooltipClick = _a.tooltip;
    var _b = (0, useTooltip_1.default)("Hovering", { placement: "right", trigger: "hover" }), tooltipVisibleHover = _b.tooltipVisible, targetRefHover = _b.targetRef, tooltipHover = _b.tooltip;
    var _c = (0, useTooltip_1.default)("You focused me!", { placement: "right", trigger: "focus" }), tooltipVisibleFocus = _c.tooltipVisible, targetRefFocus = _c.targetRef, tooltipFocus = _c.tooltip;
    return (React.createElement("div", { style: {
            display: "flex",
            flexDirection: "column",
            height: "300px",
            width: "200px",
            justifyContent: "space-evenly",
        } },
        React.createElement(Input_1.default, { ref: targetRefClick, placeholder: "click" }),
        tooltipVisibleClick && tooltipClick,
        React.createElement(Input_1.default, { ref: targetRefHover, placeholder: "hover" }),
        tooltipVisibleHover && tooltipHover,
        React.createElement(Input_1.default, { ref: targetRefFocus, placeholder: "focus" }),
        tooltipVisibleFocus && tooltipFocus));
};
exports.Triggers = Triggers;
var EventPropagationAndMobile = function () {
    var _a = (0, react_1.useState)(false), showExpandedClick = _a[0], setShowExpandedClick = _a[1];
    var _b = (0, react_1.useState)(false), showExpandedHover = _b[0], setShowExpandedHover = _b[1];
    var _c = (0, useTooltip_1.default)("You clicked on the help icon but the card did not expand", { placement: "right", trigger: "click" }), tooltipVisibleClick = _c.tooltipVisible, targetRefClick = _c.targetRef, tooltipClick = _c.tooltip;
    var _d = (0, useTooltip_1.default)("You hovered over the help icon", { placement: "right", trigger: "hover" }), tooltipVisibleHover = _d.tooltipVisible, targetRefHover = _d.targetRef, tooltipHover = _d.tooltip;
    return (React.createElement("div", { style: {
            display: "flex",
            flexDirection: "column",
            height: "600px",
            width: "500px",
            justifyContent: "space-evenly",
        } },
        React.createElement(Text_1.default, null, "Events do not propagate to other elements in the tree. This helps to not cause unwanted bahaviour like expanding the cards when clicking on the tooltip target."),
        React.createElement(ExpandableCard, { onClick: function () { return setShowExpandedClick(!showExpandedClick); } },
            React.createElement(ExpandableHeader, null,
                "On click ",
                showExpandedClick ? "▴" : "▾",
                React.createElement("span", { ref: targetRefClick },
                    React.createElement(Help_1.default, null))),
            showExpandedClick && (React.createElement("div", { style: { margin: "15px 0" } }, "You clicked on the header but not on the help icon inside the header")),
            tooltipVisibleClick && tooltipClick),
        React.createElement(Text_1.default, null, "On touch screen devices hover interactions are also properly handled with `touchstart` and `touchend` events (`mouseenter` and `mouseleave` cause unwated behaviour on some mobile browsers)."),
        React.createElement(ExpandableCard, { onClick: function () { return setShowExpandedHover(!showExpandedHover); } },
            React.createElement(ExpandableHeader, null,
                "On hover ",
                showExpandedHover ? "▴" : "▾",
                React.createElement("span", { ref: targetRefHover },
                    React.createElement(Help_1.default, null))),
            showExpandedHover && (React.createElement("div", { style: { margin: "15px 0" } }, "On mobile hovering (or more specifically touching and holding) over the help icon does not trigger expansion of this card")),
            tooltipVisibleHover && tooltipHover)));
};
exports.EventPropagationAndMobile = EventPropagationAndMobile;
var FineTuning = function () {
    var _a = (0, useTooltip_1.default)("Just default tooltip", { placement: "top-start" }), tooltipVisibleDefault = _a.tooltipVisible, targetRefDefault = _a.targetRef, tooltipDefault = _a.tooltip;
    var _b = (0, useTooltip_1.default)("Didn't you know that 6 comes before 7?", {
        placement: "top-start",
        arrowPadding: { right: 221 },
        tooltipOffset: [0, -8],
    }), tooltipVisibleFineTuned = _b.tooltipVisible, targetRefFineTuned = _b.targetRef, tooltipFineTuned = _b.tooltip;
    return (React.createElement("div", { style: { width: "500px", height: "500px" } },
        React.createElement(Text_1.default, { fontSize: "20px" }, "Hover over inputs"),
        React.createElement(Text_1.default, { bold: true }, "Default placement"),
        React.createElement(Input_1.default, { ref: targetRefDefault, value: "0x1234567890000" }),
        tooltipVisibleDefault && tooltipDefault,
        React.createElement(Text_1.default, { bold: true }, "Fine tuned arrow placement"),
        React.createElement(Input_1.default, { ref: targetRefFineTuned, value: "0x1234576890000" }),
        tooltipVisibleFineTuned && tooltipFineTuned));
};
exports.FineTuning = FineTuning;
var Flipping = function () {
    var _a = (0, useTooltip_1.default)("All tooltips flip automatically when you scroll", { placement: "top" }), targetRef = _a.targetRef, tooltip = _a.tooltip;
    return (React.createElement("div", { style: { padding: "200px", width: "500px", height: "2000px" } },
        React.createElement(ReferenceElement, { ref: targetRef }),
        tooltip));
};
exports.Flipping = Flipping;
var ScreenEdges = function () {
    var _a = (0, useTooltip_1.default)("I should not touch the edge of the screen", { placement: "top", trigger: "click" }), targetRefLeft = _a.targetRef, tooltipLeft = _a.tooltip, leftVisible = _a.tooltipVisible;
    var _b = (0, useTooltip_1.default)("I should not touch the edge of the screen", { placement: "top", trigger: "click" }), targetRefRight = _b.targetRef, tooltipRight = _b.tooltip, rightVisible = _b.tooltipVisible;
    var _c = (0, useTooltip_1.default)("I should not touch the edge of the screen", { placement: "top", trigger: "click" }), targetRefMiddle = _c.targetRef, tooltipMiddle = _c.tooltip, middleVisible = _c.tooltipVisible;
    return (React.createElement("div", { style: { padding: "16px", height: "800px", backgroundColor: "#EEE" } },
        React.createElement(Text_1.default, null, "This story can be used to visually tooltip behavior when the target element is positioned close to the screen edge. Open this screen on the phone or in browser with responsive mode. Tooltips should not touch the screen edge."),
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", padding: "24px" } },
            React.createElement("span", { ref: targetRefLeft },
                React.createElement(Help_1.default, null)),
            leftVisible && tooltipLeft,
            React.createElement("span", { ref: targetRefMiddle },
                React.createElement(Help_1.default, null)),
            middleVisible && tooltipMiddle,
            React.createElement("span", { ref: targetRefRight },
                React.createElement(Help_1.default, null)),
            rightVisible && tooltipRight)));
};
exports.ScreenEdges = ScreenEdges;
var ThemeInversion = function () {
    var tooltipContent = (React.createElement(React.Fragment, null,
        React.createElement(Text_1.default, null, "Tooltips have inverted theme"),
        React.createElement(Toggle_1.default, null),
        React.createElement(BalanceInput_1.default, { value: "1.0", currencyValue: "~623.45 USD", placeholder: "0.0" })));
    var _a = (0, useTooltip_1.default)(tooltipContent, { placement: "bottom" }), targetRef = _a.targetRef, tooltip = _a.tooltip;
    return (React.createElement("div", { style: { padding: "60px 25px", width: "550px", display: "flex", gap: "15px" } },
        React.createElement("div", { style: { flex: "1" } },
            React.createElement(Text_1.default, null, "Current theme looks like this"),
            React.createElement(Toggle_1.default, null),
            React.createElement(BalanceInput_1.default, { value: "1.0", currencyValue: "~623.45 USD", placeholder: "0.0" })),
        React.createElement("div", { style: { flex: "1", textAlign: "center" } },
            React.createElement("span", { ref: targetRef },
                React.createElement(Help_1.default, null))),
        tooltip));
};
exports.ThemeInversion = ThemeInversion;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
