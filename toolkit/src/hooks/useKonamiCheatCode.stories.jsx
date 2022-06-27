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
    var _a = react_1.useState(false), correctCodeEntered = _a[0], setCorrectCodeEntered = _a[1];
    var correctCodeHandler = react_1.useCallback(function () { return setCorrectCodeEntered(true); }, [setCorrectCodeEntered]);
    useKonamiCheatCode_1.default(correctCodeHandler);
    return (<div style={{ padding: "32px" }}>
      <div>Enter: ArrowUp, ArrowUp, ArrowDown, ArrowDown, ArrowLeft, ArrowRight, ArrowLeft, ArrowRight</div>
      <pre>Code Entered: {JSON.stringify(correctCodeEntered)}</pre>
    </div>);
};
exports.Default = Default;
