var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
export var baseColors = {
    failure: "#ED4B9E",
    primary: "#FF20DF",
    primaryBright: "#C85AB8",
    primaryDark: "#b2169c",
    secondary: "#2FF0DD",
    tertiary: "#EEEB78",
    success: "#31D0AA",
    warning: "#FFB237",
};
export var additionalColors = {
    binance: "#F0B90B",
    overlay: "#452a7a",
};
export var lightColors = __assign(__assign(__assign({}, baseColors), additionalColors), { background: "#20293c", backgroundDisabled: "#162136", backgroundAlt: "#162136", cardBorder: "#E7E3EB", contrast: "#191326", dropdown: "#F6F6F6", dropdownDeep: "#EEEEEE", invertedContrast: "#FFFFFF", input: "#eeeaf4", inputSecondary: "#d7caec", text: "#280D5F", textDisabled: "#BDC2C4", textSubtle: "#7A6EAA", disabled: "#E9EAEB", gradients: {
        bubblegum: "linear-gradient(139.73deg, #E5FDFF 0%, #F3EFFF 100%)",
        inverseBubblegum: "linear-gradient(139.73deg, #F3EFFF 0%, #E5FDFF 100%)",
        cardHeader: "linear-gradient(111.68deg, #F2ECF2 0%, #E8F2F6 100%)",
        blue: "linear-gradient(180deg, #A7E8F1 0%, #94E1F2 100%)",
        violet: "linear-gradient(180deg, #E2C9FB 0%, #CDB8FA 100%)",
        violetAlt: "linear-gradient(180deg, #CBD7EF 0%, #9A9FD0 100%)",
        gold: "linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)",
    } });
export var darkColors = __assign(__assign(__assign({}, baseColors), additionalColors), { background: "#20293c", backgroundDisabled: "#0A101C", backgroundAlt: "#0A101C", cardBorder: "#383241", contrast: "#FFFFFF", dropdown: "#0A101C", dropdownDeep: "#0A101C", invertedContrast: "#191326", input: "#372F47", inputSecondary: "#262130", text: "#fff", textDisabled: "#666171", textSubtle: "#B8ADD2", disabled: "#524B63", gradients: {
        bubblegum: "linear-gradient(139.73deg, #313D5C 0%, #3D2A54 100%)",
        inverseBubblegum: "linear-gradient(139.73deg, #3D2A54 0%, #313D5C 100%)",
        cardHeader: "linear-gradient(166.77deg, #3B4155 0%, #3A3045 100%)",
        blue: "linear-gradient(180deg, #00707F 0%, #19778C 100%)",
        violet: "linear-gradient(180deg, #6C4999 0%, #6D4DB2 100%)",
        violetAlt: "linear-gradient(180deg, #434575 0%, #66578D 100%)",
        gold: "linear-gradient(180deg, #FFD800 0%, #FDAB32 100%)",
    } });
