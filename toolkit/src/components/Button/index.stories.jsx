"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expandable = exports.Variants = exports.Anchors = exports.Default = void 0;
var lodash_1 = require("lodash");
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var styled_components_1 = require("styled-components");
var Box_1 = require("../Box/Box");
var Flex_1 = require("../Box/Flex");
var Svg_1 = require("../Svg");
var IconButton_1 = require("./IconButton");
var Button_1 = require("./Button");
var ExpandableButton_1 = require("./ExpandableButton");
var types_1 = require("./types");
exports.default = {
    title: "Components/Button",
    component: Button_1.default,
    argTypes: {},
};
var Row = styled_components_1.default(Flex_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  margin-bottom: 32px;\n  & > button + button,\n  & > a + a {\n    margin-left: 16px;\n  }\n"], ["\n  margin-bottom: 32px;\n  & > button + button,\n  & > a + a {\n    margin-left: 16px;\n  }\n"])));
var Default = function () {
    return (<>
      <Box_1.default mb="32px">
        <button type="button">Unstyled Button</button>
      </Box_1.default>
      <Box_1.default mb="32px">
        {Object.values(types_1.variants).map(function (variant) {
            return (<Box_1.default key={variant} mb="32px">
              {Object.values(types_1.scales).map(function (scale) {
                    return (<Button_1.default key={scale} variant={variant} scale={scale} mr="8px">
                    {lodash_1.capitalize(variant) + " " + scale.toUpperCase()}
                  </Button_1.default>);
                })}
            </Box_1.default>);
        })}
      </Box_1.default>
      <Box_1.default>
        <Button_1.default mr="8px" disabled>
          Disabled
        </Button_1.default>
        <Button_1.default variant="secondary" disabled>
          Disabled
        </Button_1.default>
      </Box_1.default>
    </>);
};
exports.Default = Default;
var Anchors = function () {
    return (<>
      <Box_1.default mb="32px">
        {Object.values(types_1.variants).map(function (variant) {
            return (<Box_1.default key={variant} mb="32px">
              {Object.values(types_1.scales).map(function (scale) {
                    return (<Button_1.default as="a" href="https://pancakeswap.finance" key={scale} variant={variant} scale={scale} external mr="8px">
                    {lodash_1.capitalize(variant) + " anchor " + scale.toUpperCase()}
                  </Button_1.default>);
                })}
            </Box_1.default>);
        })}
      </Box_1.default>
      <Box_1.default>
        <Button_1.default as="a" href="https://pancakeswap.finance" mr="8px" external disabled>
          Disabled
        </Button_1.default>
        <Button_1.default as="a" href="https://pancakeswap.finance" variant="secondary" external disabled>
          Disabled
        </Button_1.default>
      </Box_1.default>
    </>);
};
exports.Anchors = Anchors;
var Variants = function () {
    return (<Box_1.default width="640px">
      <react_router_dom_1.BrowserRouter>
        <Row>
          <Button_1.default as={react_router_dom_1.Link} to="/router-link" variant="secondary">
            As an React Router link
          </Button_1.default>
        </Row>
        <Row>
          <Button_1.default width="100%">Full size</Button_1.default>
        </Row>
        <Row>
          <Button_1.default isLoading endIcon={<Svg_1.AutoRenewIcon spin color="currentColor"/>}>
            Approving
          </Button_1.default>
          <Button_1.default isLoading variant="success">
            Approving
          </Button_1.default>
        </Row>
        <Row>
          <Button_1.default startIcon={<Svg_1.LogoIcon />}>Start Icon</Button_1.default>
          <Button_1.default endIcon={<Svg_1.LogoIcon />}>End Icon</Button_1.default>
          <Button_1.default startIcon={<Svg_1.LogoIcon />} endIcon={<Svg_1.LogoIcon />}>
            Start & End Icon
          </Button_1.default>
        </Row>
        <Row>
          <IconButton_1.default>
            <Svg_1.LogoIcon />
          </IconButton_1.default>
          <IconButton_1.default variant="secondary">
            <Svg_1.AddIcon />
          </IconButton_1.default>
        </Row>
        <Row>
          <IconButton_1.default scale="sm" variant="danger">
            <Svg_1.LogoIcon />
          </IconButton_1.default>
          <IconButton_1.default scale="sm" variant="success">
            <Svg_1.AddIcon color="currentColor"/>
          </IconButton_1.default>
        </Row>
      </react_router_dom_1.BrowserRouter>
    </Box_1.default>);
};
exports.Variants = Variants;
var Expandable = function () {
    var _a = react_1.useState(false), expanded = _a[0], setExpanded = _a[1];
    return (<Box_1.default width="640px">
      <react_router_dom_1.BrowserRouter>
        <Row>
          <ExpandableButton_1.ExpandableButton expanded={expanded} onClick={function () { return setExpanded(function (prev) { return !prev; }); }}/>
          <ExpandableButton_1.ExpandableLabel expanded={expanded} onClick={function () { return setExpanded(function (prev) { return !prev; }); }}>
            ExpandableLabel
          </ExpandableButton_1.ExpandableLabel>
        </Row>
      </react_router_dom_1.BrowserRouter>
    </Box_1.default>);
};
exports.Expandable = Expandable;
var templateObject_1;
