"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var StyledProgress_1 = require("./StyledProgress");
var ProgressBunnyWrapper_1 = require("./ProgressBunnyWrapper");
var Svg_1 = require("../Svg");
var types_1 = require("./types");
var stepGuard = function (step) {
    if (step < 0) {
        return 0;
    }
    if (step > 100) {
        return 100;
    }
    return step;
};
var Progress = function (_a) {
    var _b = _a.variant, variant = _b === void 0 ? types_1.variants.ROUND : _b, _c = _a.scale, scale = _c === void 0 ? types_1.scales.MD : _c, _d = _a.primaryStep, primaryStep = _d === void 0 ? 0 : _d, _e = _a.secondaryStep, secondaryStep = _e === void 0 ? null : _e, _f = _a.showProgressBunny, showProgressBunny = _f === void 0 ? false : _f;
    return (<StyledProgress_1.default variant={variant} scale={scale}>
      {showProgressBunny && (<ProgressBunnyWrapper_1.default style={{ left: stepGuard(primaryStep) + "%" }}>
          <Svg_1.ProgressBunny />
        </ProgressBunnyWrapper_1.default>)}
      <StyledProgress_1.Bar primary style={{ width: stepGuard(primaryStep) + "%" }}/>
      {secondaryStep ? <StyledProgress_1.Bar style={{ width: stepGuard(secondaryStep) + "%" }}/> : null}
    </StyledProgress_1.default>);
};
exports.default = Progress;
