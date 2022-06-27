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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var options_1 = require("./options");
var Wrapper_1 = require("./Wrapper");
var StyledBackgroundImage = styled_components_1.default(Wrapper_1.default)(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  background-repeat: no-repeat;\n  background-size: contain;\n"], ["\n  background-repeat: no-repeat;\n  background-size: contain;\n"])));
var BackgroundImage = function (_a) {
    var src = _a.src, width = _a.width, height = _a.height, props = __rest(_a, ["src", "width", "height"]);
    var ref = react_1.useRef(null);
    react_1.useEffect(function () {
        var observer;
        if (ref.current) {
            var div_1 = ref.current;
            observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    var isIntersecting = entry.isIntersecting;
                    if (isIntersecting) {
                        div_1.style.backgroundImage = "url(\"" + src + "\")";
                        observer.disconnect();
                    }
                });
            }, options_1.default);
            observer.observe(div_1);
        }
        return function () {
            if (observer) {
                observer.disconnect();
            }
        };
    }, [src]);
    return <StyledBackgroundImage ref={ref} width={width} height={height} {...props}/>;
};
exports.default = BackgroundImage;
var templateObject_1;
