"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
var react_1 = require("react");
var useKonamiCheatCode_1 = require("./useKonamiCheatCode");
exports.default = {
    title: "Hooks/useKonamiCheatCode",
    argTypes: {},
};
var Default = function () {
    var _a = (0, react_1.useState)(false), correctCodeEntered = _a[0], setCorrectCodeEntered = _a[1];
    var correctCodeHandler = (0, react_1.useCallback)(function () { return setCorrectCodeEntered(true); }, [setCorrectCodeEntered]);
    (0, useKonamiCheatCode_1.default)(correctCodeHandler);
    return (React.createElement("div", { style: { padding: "32px" } },
        React.createElement("div", null, "Enter: ArrowUp, ArrowUp, ArrowDown, ArrowDown, ArrowLeft, ArrowRight, ArrowLeft, ArrowRight"),
        React.createElement("pre", null,
            "Code Entered: ",
            JSON.stringify(correctCodeEntered))));
};
exports.Default = Default;
