"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_transition_group_1 = require("react-transition-group");
var styled_components_1 = require("styled-components");
var Alert_1 = require("../../components/Alert");
var types_1 = require("./types");
var alertTypeMap = (_a = {},
    _a[types_1.types.INFO] = Alert_1.alertVariants.INFO,
    _a[types_1.types.SUCCESS] = Alert_1.alertVariants.SUCCESS,
    _a[types_1.types.DANGER] = Alert_1.alertVariants.DANGER,
    _a[types_1.types.WARNING] = Alert_1.alertVariants.WARNING,
    _a);
var StyledToast = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  right: 16px;\n  position: fixed;\n  max-width: calc(100% - 32px);\n  transition: all 250ms ease-in;\n  width: 100%;\n\n  ", " {\n    max-width: 400px;\n  }\n"], ["\n  right: 16px;\n  position: fixed;\n  max-width: calc(100% - 32px);\n  transition: all 250ms ease-in;\n  width: 100%;\n\n  ", " {\n    max-width: 400px;\n  }\n"])), function (_a) {
    var theme = _a.theme;
    return theme.mediaQueries.sm;
});
var Toast = function (_a) {
    var toast = _a.toast, onRemove = _a.onRemove, style = _a.style, ttl = _a.ttl, props = __rest(_a, ["toast", "onRemove", "style", "ttl"]);
    var timer = react_1.useRef();
    var ref = react_1.useRef(null);
    var removeHandler = react_1.useRef(onRemove);
    var id = toast.id, title = toast.title, description = toast.description, type = toast.type;
    var handleRemove = react_1.useCallback(function () { return removeHandler.current(id); }, [id, removeHandler]);
    var handleMouseEnter = function () {
        clearTimeout(timer.current);
    };
    var handleMouseLeave = function () {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = window.setTimeout(function () {
            handleRemove();
        }, ttl);
    };
    react_1.useEffect(function () {
        if (timer.current) {
            clearTimeout(timer.current);
        }
        timer.current = window.setTimeout(function () {
            handleRemove();
        }, ttl);
        return function () {
            clearTimeout(timer.current);
        };
    }, [timer, ttl, handleRemove]);
    return (<react_transition_group_1.CSSTransition nodeRef={ref} timeout={250} style={style} {...props}>
      <StyledToast ref={ref} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Alert_1.Alert title={title} variant={alertTypeMap[type]} onClick={handleRemove}>
          {description}
        </Alert_1.Alert>
      </StyledToast>
    </react_transition_group_1.CSSTransition>);
};
exports.default = Toast;
var templateObject_1;
