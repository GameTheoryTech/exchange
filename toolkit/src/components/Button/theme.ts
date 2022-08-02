import { scales, variants } from "./types";

export const scaleVariants = {
  [scales.MD]: {
    padding: "10px 30px",
    fontSize: "16px",
  },
  [scales.SM]: {
    padding: "10px 30px",
    fontSize: "14px",
  },
  [scales.XS]: {
    fontSize: "12px"
  },
};

export const styleVariants = {
  [variants.PRIMARY]: {
    backgroundColor: "primary",
    color: "white",
  },
  [variants.SECONDARY]: {
    backgroundColor: "transparent",
    border: "2px solid",
    borderColor: "primary",
    boxShadow: "none",
    color: "primary",
    ":disabled": {
      backgroundColor: "transparent",
    },
  },
  [variants.TERTIARY]: {
    backgroundColor: "tertiary",
    boxShadow: "none",
    color: "primary",
  },
  [variants.SUBTLE]: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    boxShadow: "none",
    color: "primary",
    '&:hover': {
      backgroundColor: "rgba(0, 0, 0, 0.4)!important",
    }
  },
  [variants.DANGER]: {
    backgroundColor: "failure",
    color: "white",
  },
  [variants.SUCCESS]: {
    backgroundColor: "success",
    color: "white",
  },
  [variants.TEXT]: {
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
};
