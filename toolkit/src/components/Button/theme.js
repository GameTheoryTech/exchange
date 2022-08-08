var _a, _b;
import { scales, variants } from "./types";
export var scaleVariants = (_a = {},
    _a[scales.MD] = {
        padding: "10px 30px",
        fontSize: "16px",
    },
    _a[scales.SM] = {
        padding: "10px 30px",
        fontSize: "14px",
    },
    _a[scales.XS] = {
        fontSize: "12px"
    },
    _a);
export var styleVariants = (_b = {},
    _b[variants.PRIMARY] = {
        backgroundColor: "primary",
        color: "white",
    },
    _b[variants.SECONDARY] = {
        backgroundColor: "transparent",
        border: "2px solid",
        borderColor: "primary",
        boxShadow: "none",
        color: "primary",
        ":disabled": {
            backgroundColor: "transparent",
        },
    },
    _b[variants.TERTIARY] = {
        backgroundColor: "tertiary",
        boxShadow: "none",
        color: "primary",
    },
    _b[variants.SUBTLE] = {
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        boxShadow: "none",
        color: "primary",
        '&:hover': {
            backgroundColor: "rgba(0, 0, 0, 0.4)!important",
        }
    },
    _b[variants.DANGER] = {
        backgroundColor: "failure",
        color: "white",
    },
    _b[variants.SUCCESS] = {
        backgroundColor: "success",
        color: "white",
    },
    _b[variants.TEXT] = {
        backgroundColor: "transparent",
        color: "primary",
        boxShadow: "none",
        textShadow: "none",
        padding: 0,
        paddingRight: '10px',
        paddingTop: '5px',
        '&:hover': {
            backgroundColor: "transparent!important",
            textShadow: "var(--accent) 0px 0px 20px",
        }
    },
    _b);
