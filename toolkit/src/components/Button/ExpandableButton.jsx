"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpandableLabel = exports.ExpandableButton = void 0;
var react_1 = require("react");
var Svg_1 = require("../Svg");
var Button_1 = require("./Button");
var IconButton_1 = require("./IconButton");
var ExpandableButton = function (_a) {
    var onClick = _a.onClick, expanded = _a.expanded, children = _a.children;
    return (<IconButton_1.default aria-label="Hide or show expandable content" onClick={onClick}>
      {children}
      {expanded ? <Svg_1.ChevronUpIcon color="invertedContrast"/> : <Svg_1.ChevronDownIcon color="invertedContrast"/>}
    </IconButton_1.default>);
};
exports.ExpandableButton = ExpandableButton;
exports.ExpandableButton.defaultProps = {
    expanded: false,
};
var ExpandableLabel = function (_a) {
    var onClick = _a.onClick, expanded = _a.expanded, children = _a.children;
    return (<Button_1.default variant="text" aria-label="Hide or show expandable content" onClick={onClick} endIcon={expanded ? <Svg_1.ChevronUpIcon color="primary"/> : <Svg_1.ChevronDownIcon color="primary"/>}>
      {children}
    </Button_1.default>);
};
exports.ExpandableLabel = ExpandableLabel;
exports.ExpandableLabel.defaultProps = {
    expanded: false,
};
