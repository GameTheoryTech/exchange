"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StopAndStart = exports.DisableUnderCondition = exports.AdjustNumberOfParticles = exports.AdjustSize = exports.AdjustDistance = exports.Document = exports.WithSelector = void 0;
var react_1 = require("react");
var Button_1 = require("../components/Button/Button");
var Text_1 = require("../components/Text/Text");
var useParticleBurst_1 = require("./useParticleBurst");
var imagePath = "https://via.placeholder.com/10";
exports.default = {
    title: "Hooks/useParticleBurst",
    argTypes: {},
};
var WithSelector = function () {
    (0, useParticleBurst_1.default)({ imgSrc: imagePath, selector: "button" });
    return (React.createElement("div", { style: { padding: "32px" } },
        React.createElement(Button_1.default, { type: "button", mr: "16px" }, "Click Me"),
        React.createElement(Button_1.default, { type: "button", variant: "secondary", mr: "16px" }, "Or Me"),
        React.createElement(Button_1.default, { type: "button", variant: "tertiary" }, "Or Me")));
};
exports.WithSelector = WithSelector;
var Document = function () {
    (0, useParticleBurst_1.default)({ imgSrc: imagePath });
    return (React.createElement("div", { style: { padding: "32px" } },
        React.createElement(Text_1.default, null, "Any click (not recommended)")));
};
exports.Document = Document;
var AdjustDistance = function () {
    (0, useParticleBurst_1.default)({ imgSrc: imagePath, particleOptions: { distance: 800 } });
    return (React.createElement("div", { style: { padding: "32px" } },
        React.createElement(Text_1.default, null, "Adjust distance")));
};
exports.AdjustDistance = AdjustDistance;
var AdjustSize = function () {
    (0, useParticleBurst_1.default)({ imgSrc: imagePath, particleOptions: { size: 80 } });
    return (React.createElement("div", { style: { padding: "32px" } },
        React.createElement(Text_1.default, null, "Adjust size")));
};
exports.AdjustSize = AdjustSize;
var AdjustNumberOfParticles = function () {
    (0, useParticleBurst_1.default)({ imgSrc: imagePath, numberOfParticles: 100 });
    return (React.createElement("div", { style: { padding: "32px" } },
        React.createElement(Text_1.default, null, "100 particles (beware of performance)")));
};
exports.AdjustNumberOfParticles = AdjustNumberOfParticles;
var DisableUnderCondition = function () {
    var disableWhen = function () {
        var date = new Date();
        var currentMinutes = date.getMinutes();
        return currentMinutes % 2 !== 0;
    };
    (0, useParticleBurst_1.default)({ selector: "button", imgSrc: imagePath, disableWhen: disableWhen });
    return (React.createElement("div", { style: { padding: "32px" } },
        React.createElement(Text_1.default, { mb: "8px" }, "Will only burst when current minute is even"),
        React.createElement(Button_1.default, { variant: "success" }, "Click Me")));
};
exports.DisableUnderCondition = DisableUnderCondition;
var StopAndStart = function () {
    var _a = (0, useParticleBurst_1.default)({ imgSrc: imagePath }), initialize = _a.initialize, teardown = _a.teardown;
    var handleInitialize = function () { return initialize(); };
    var handleTeardown = function () { return teardown(); };
    return (React.createElement("div", { style: { padding: "32px" } },
        React.createElement(Text_1.default, { mb: "8px" }, "100 particles (beware of performance)"),
        React.createElement(Button_1.default, { variant: "secondary", onClick: handleInitialize, mr: "8px" }, "Start Bursts"),
        React.createElement(Button_1.default, { variant: "tertiary", onClick: handleTeardown }, "Stop Bursts")));
};
exports.StopAndStart = StopAndStart;
