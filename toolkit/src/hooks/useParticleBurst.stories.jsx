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
    useParticleBurst_1.default({ imgSrc: imagePath, selector: "button" });
    return (<div style={{ padding: "32px" }}>
      <Button_1.default type="button" mr="16px">
        Click Me
      </Button_1.default>
      <Button_1.default type="button" variant="secondary" mr="16px">
        Or Me
      </Button_1.default>
      <Button_1.default type="button" variant="tertiary">
        Or Me
      </Button_1.default>
    </div>);
};
exports.WithSelector = WithSelector;
var Document = function () {
    useParticleBurst_1.default({ imgSrc: imagePath });
    return (<div style={{ padding: "32px" }}>
      <Text_1.default>Any click (not recommended)</Text_1.default>
    </div>);
};
exports.Document = Document;
var AdjustDistance = function () {
    useParticleBurst_1.default({ imgSrc: imagePath, particleOptions: { distance: 800 } });
    return (<div style={{ padding: "32px" }}>
      <Text_1.default>Adjust distance</Text_1.default>
    </div>);
};
exports.AdjustDistance = AdjustDistance;
var AdjustSize = function () {
    useParticleBurst_1.default({ imgSrc: imagePath, particleOptions: { size: 80 } });
    return (<div style={{ padding: "32px" }}>
      <Text_1.default>Adjust size</Text_1.default>
    </div>);
};
exports.AdjustSize = AdjustSize;
var AdjustNumberOfParticles = function () {
    useParticleBurst_1.default({ imgSrc: imagePath, numberOfParticles: 100 });
    return (<div style={{ padding: "32px" }}>
      <Text_1.default>100 particles (beware of performance)</Text_1.default>
    </div>);
};
exports.AdjustNumberOfParticles = AdjustNumberOfParticles;
var DisableUnderCondition = function () {
    var disableWhen = function () {
        var date = new Date();
        var currentMinutes = date.getMinutes();
        return currentMinutes % 2 !== 0;
    };
    useParticleBurst_1.default({ selector: "button", imgSrc: imagePath, disableWhen: disableWhen });
    return (<div style={{ padding: "32px" }}>
      <Text_1.default mb="8px">Will only burst when current minute is even</Text_1.default>
      <Button_1.default variant="success">Click Me</Button_1.default>
    </div>);
};
exports.DisableUnderCondition = DisableUnderCondition;
var StopAndStart = function () {
    var _a = useParticleBurst_1.default({ imgSrc: imagePath }), initialize = _a.initialize, teardown = _a.teardown;
    var handleInitialize = function () { return initialize(); };
    var handleTeardown = function () { return teardown(); };
    return (<div style={{ padding: "32px" }}>
      <Text_1.default mb="8px">100 particles (beware of performance)</Text_1.default>
      <Button_1.default variant="secondary" onClick={handleInitialize} mr="8px">
        Start Bursts
      </Button_1.default>
      <Button_1.default variant="tertiary" onClick={handleTeardown}>
        Stop Bursts
      </Button_1.default>
    </div>);
};
exports.StopAndStart = StopAndStart;
