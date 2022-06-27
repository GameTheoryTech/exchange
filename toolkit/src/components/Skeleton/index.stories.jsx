"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = exports.ParentSize = exports.Animation = exports.Avatar = exports.Default = void 0;
var react_1 = require("react");
var Skeleton_1 = require("./Skeleton");
exports.default = {
    title: "Components/Skeleton",
    component: Skeleton_1.default,
    argTypes: {
        width: { control: "number" },
        height: { control: "number" },
    },
};
var Default = function (args) {
    return <Skeleton_1.default {...args}/>;
};
exports.Default = Default;
exports.Avatar = exports.Default.bind({});
exports.Avatar.args = {
    width: 40,
    height: 40,
    variant: "circle",
};
exports.Animation = exports.Default.bind({});
exports.Animation.args = {
    width: 100,
    height: 200,
    animation: "waves",
};
var ParentSize = function (args) {
    return (<div style={{ width: 200, height: 90 }}>
      {" "}
      <Skeleton_1.default {...args}/>{" "}
    </div>);
};
exports.ParentSize = ParentSize;
var Text = function (args) {
    var _a = react_1.useState(true), loading = _a[0], setLoading = _a[1];
    react_1.useEffect(function () {
        var timer = setTimeout(function () {
            setLoading(false);
        }, 2000);
        return function () { return clearTimeout(timer); };
    }, []);
    return <h1 style={{ width: 200 }}>{loading ? <Skeleton_1.default {...args}/> : "H1"}</h1>;
};
exports.Text = Text;
