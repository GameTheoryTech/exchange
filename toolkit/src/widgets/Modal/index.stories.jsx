"use strict";
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
exports.ReactingToOusideChanges = exports.WithCustomHeader = exports.WithBackButton = exports.DisableOverlayClick = exports.Default = void 0;
var react_1 = require("react");
var styled_components_1 = require("styled-components");
var _1 = require(".");
var Button_1 = require("../../components/Button/Button");
var Heading_1 = require("../../components/Heading/Heading");
exports.default = {
    title: "Widgets/Modal",
    component: _1.Modal,
    argTypes: {},
};
var CustomModal = function (_a) {
    var title = _a.title, onDismiss = _a.onDismiss, props = __rest(_a, ["title", "onDismiss"]);
    return (<_1.Modal title={title} onDismiss={onDismiss} {...props}>
    <Heading_1.default>{title}</Heading_1.default>
    <Button_1.default>This button Does nothing</Button_1.default>
  </_1.Modal>);
};
var Default = function () {
    var theme = styled_components_1.useTheme();
    var onPresent1 = _1.useModal(<CustomModal title="Modal 1"/>)[0];
    var onPresent2 = _1.useModal(<CustomModal title="Modal 2"/>)[0];
    var onPresent3 = _1.useModal(<CustomModal title="Modal 3" headerBackground={theme.colors.gradients.cardHeader}/>)[0];
    return (<div>
      <Button_1.default onClick={onPresent1}>Open modal 1</Button_1.default>
      <Button_1.default onClick={onPresent2}>Open modal 2</Button_1.default>
      <Button_1.default onClick={onPresent3}>Open modal with background</Button_1.default>
    </div>);
};
exports.Default = Default;
var DisableOverlayClick = function () {
    var onPresent1 = _1.useModal(<CustomModal title="Modal 1"/>, false)[0];
    return (<div>
      <Button_1.default onClick={onPresent1}>Disabled overlay click</Button_1.default>
    </div>);
};
exports.DisableOverlayClick = DisableOverlayClick;
var WithBackButton = function () {
    var BackButtonModal = function (_a) {
        var title = _a.title, onDismiss = _a.onDismiss;
        var handleOnBack = function () {
            return 1;
        };
        return (<_1.Modal title={title} onDismiss={onDismiss} onBack={handleOnBack} hideCloseButton>
        <Button_1.default onClick={onDismiss} variant="text">
          Consumer can still close it.
        </Button_1.default>
      </_1.Modal>);
    };
    var onPresent1 = _1.useModal(<BackButtonModal title="Modal with no X"/>, false)[0];
    return <Button_1.default onClick={onPresent1}>Only Back Button</Button_1.default>;
};
exports.WithBackButton = WithBackButton;
var WithCustomHeader = function () {
    var CustomHeaderModal = function (_a) {
        var title = _a.title, onDismiss = _a.onDismiss;
        return (<_1.Modal title={title} headerBackground="primary" onDismiss={onDismiss}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu pretium massa. Donec et gravida eros, eget
        sollicitudin sapien. Donec imperdiet lorem nulla, at hendrerit purus lacinia ut. Phasellus rhoncus justo in
        tincidunt cursus. Fusce vulputate, enim id facilisis faucibus, justo nunc consectetur nibh, sit amet euismod
        ante mauris ut est. Vestibulum eu ligula eu erat eleifend imperdiet et eu nulla. Curabitur sodales ullamcorper
        nibh sed sagittis. Integer a elit nec nisl cursus vehicula eu a nibh. Donec posuere tortor id egestas ultrices.
        Aliquam in eros eros. Maecenas fringilla enim varius, fringilla lectus ut, finibus sapien. Phasellus ac
        vulputate libero, id vehicula massa. Ut dignissim lorem ut risus accumsan feugiat. Quisque odio mi, sollicitudin
        non elementum nec, tristique non est. Sed faucibus ante hendrerit viverra volutpat. Proin et enim nec ipsum
        sodales suscipit eu nec lacus. Nulla consequat volutpat scelerisque. Phasellus ligula orci, dictum quis commodo
        et, tempor quis ligula. Pellentesque eget dapibus leo. Aliquam in ipsum vehicula, suscipit ipsum nec, viverra
        mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eu pretium massa. Donec et gravida eros,
        eget sollicitudin sapien. Donec imperdiet lorem nulla, at hendrerit purus lacinia ut. Phasellus rhoncus justo in
        tincidunt cursus. Fusce vulputate, enim id facilisis faucibus, justo nunc consectetur nibh, sit amet euismod
        ante mauris ut est. Vestibulum eu ligula eu erat eleifend imperdiet et eu nulla. Curabitur sodales ullamcorper
        nibh sed sagittis. Integer a elit nec nisl cursus vehicula eu a nibh. Donec posuere tortor id egestas ultrices.
        Aliquam in eros eros. Maecenas fringilla enim varius, fringilla lectus ut, finibus sapien. Phasellus ac
        vulputate libero, id vehicula massa. Ut dignissim lorem ut risus accumsan feugiat. Quisque odio mi, sollicitudin
        non elementum nec, tristique non est. Sed faucibus ante hendrerit viverra volutpat. Proin et enim nec ipsum
        sodales suscipit eu nec lacus. Nulla consequat volutpat scelerisque. Phasellus ligula orci, dictum quis commodo
        et, tempor quis ligula. Pellentesque eget dapibus leo. Aliquam in ipsum vehicula, suscipit ipsum nec, viverra
        mauris.
        <Button_1.default>This button Does nothing</Button_1.default>
      </_1.Modal>);
    };
    var onPresent1 = _1.useModal(<CustomHeaderModal title="Modal with custom header"/>)[0];
    return <Button_1.default onClick={onPresent1}>Modal with custom header</Button_1.default>;
};
exports.WithCustomHeader = WithCustomHeader;
var ReactingToOusideChanges = function () {
    var _a = react_1.useState(0), counter = _a[0], setCounter = _a[1];
    react_1.useEffect(function () {
        var intervalId = setInterval(function () {
            setCounter(function (prev) { return prev + 1; });
        }, 500);
        return function () { return clearInterval(intervalId); };
    }, []);
    var ReactiveModal = function (_a) {
        var title = _a.title, count = _a.count, onDismiss = _a.onDismiss;
        return (<_1.Modal title={title} onDismiss={onDismiss}>
        <h2>Counter: {count}</h2>
        <Button_1.default mt="8px" onClick={onDismiss}>
          Close
        </Button_1.default>
      </_1.Modal>);
    };
    var onPresent1 = _1.useModal(<ReactiveModal title={"[" + counter + "] Modal that reacts to outside change"} count={counter}/>, true, true, "reactiveModal")[0];
    var onPresent2 = _1.useModal(<ReactiveModal title={"[" + counter + "] Modal that does NOT react to outside change"} count={counter}/>)[0];
    return (<div>
      <h2>Counter: {counter}</h2>
      <Button_1.default onClick={onPresent1}>Reactive modal</Button_1.default>
      <Button_1.default ml="16px" onClick={onPresent2}>
        Non-reactive modal
      </Button_1.default>
    </div>);
};
exports.ReactingToOusideChanges = ReactingToOusideChanges;
