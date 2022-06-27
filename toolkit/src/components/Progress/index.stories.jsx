"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithSecondaryAndProgressBunny = exports.WithSecondary = exports.Default = void 0;
var react_1 = require("react");
var lodash_1 = require("lodash");
var Box_1 = require("../Box/Box");
var Heading_1 = require("../Heading/Heading");
var Button_1 = require("../Button/Button");
var Progress_1 = require("./Progress");
var types_1 = require("./types");
exports.default = {
    title: "Components/Progress",
    component: Progress_1.default,
    argTypes: {},
};
var Default = function () {
    var _a = react_1.useState(lodash_1.random(1, 100)), progress = _a[0], setProgress = _a[1];
    var handleClick = function () { return setProgress(lodash_1.random(1, 100)); };
    return (<div style={{ padding: "32px", width: "400px" }}>
      {Object.values(types_1.variants).map(function (variant) {
            return (<Box_1.default key={variant} mb="16px">
            <Heading_1.default size="md" mb="8px">
              {lodash_1.capitalize(variant)}
            </Heading_1.default>
            <Progress_1.default variant={variant} primaryStep={progress}/>
          </Box_1.default>);
        })}
      <Heading_1.default size="md" mb="8px">
        Small
      </Heading_1.default>
      <Progress_1.default scale="sm" primaryStep={progress}/>
      <div style={{ marginTop: "32px" }}>
        <Button_1.default type="button" scale="sm" onClick={handleClick}>
          Random Progress
        </Button_1.default>
      </div>
    </div>);
};
exports.Default = Default;
var WithSecondary = function () {
    var _a = react_1.useState(10), primaryStep = _a[0], setPrimaryStep = _a[1];
    var _b = react_1.useState(40), secondaryStep = _b[0], setSecondaryStep = _b[1];
    return (<div style={{ padding: "32px", width: "400px" }}>
      <Progress_1.default primaryStep={primaryStep} secondaryStep={secondaryStep}/>
      <div style={{ marginTop: "32px" }}>
        <Button_1.default type="button" scale="sm" onClick={function () { return setPrimaryStep(lodash_1.random(1, 100)); }}>
          Random Primary Progress
        </Button_1.default>
        <Button_1.default style={{ marginTop: "16px" }} type="button" scale="sm" onClick={function () { return setSecondaryStep(lodash_1.random(1, 100)); }}>
          Random Secondary Progress
        </Button_1.default>
      </div>
    </div>);
};
exports.WithSecondary = WithSecondary;
var WithSecondaryAndProgressBunny = function () {
    var _a = react_1.useState(10), primaryStep = _a[0], setPrimaryStep = _a[1];
    var _b = react_1.useState(40), secondaryStep = _b[0], setSecondaryStep = _b[1];
    return (<div style={{ padding: "32px", width: "400px" }}>
      <Progress_1.default primaryStep={primaryStep} secondaryStep={secondaryStep} showProgressBunny/>
      <div style={{ marginTop: "32px" }}>
        <Button_1.default type="button" scale="sm" onClick={function () { return setPrimaryStep(lodash_1.random(1, 100)); }}>
          Random Primary Progress
        </Button_1.default>
        <Button_1.default style={{ marginTop: "16px" }} type="button" scale="sm" onClick={function () { return setSecondaryStep(lodash_1.random(1, 100)); }}>
          Random Secondary Progress
        </Button_1.default>
      </div>
    </div>);
};
exports.WithSecondaryAndProgressBunny = WithSecondaryAndProgressBunny;
