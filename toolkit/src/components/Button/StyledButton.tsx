import styled, { DefaultTheme } from "styled-components";
import { space, layout, variant } from "styled-system";
import { scaleVariants, styleVariants } from "./theme";
import { BaseButtonProps } from "./types";

interface ThemedButtonProps extends BaseButtonProps {
  theme: DefaultTheme;
}

interface TransientButtonProps extends ThemedButtonProps {
  $isLoading?: boolean;
}

const getDisabledStyles = ({ $isLoading, theme }: TransientButtonProps) => {
  if ($isLoading === true) {
    return `
      &:disabled,
      &.pancake-button--disabled {
        cursor: not-allowed;
        text-shadow: none;
        box-shadow: none;
      }
    `;
  }

  return `
    &:disabled,
    &.pancake-button--disabled {
      background-color: rgba(0,0,0,0.4);
      box-shadow: none;
      color: ${theme.colors.textDisabled};
      cursor: not-allowed;
      text-shadow: none;
    }
  `;
};

/**
 * This is to get around an issue where if you use a Link component
 * React will throw a invalid DOM attribute error
 * @see https://github.com/styled-components/styled-components/issues/135
 */

const getOpacity = ({ $isLoading = false }: TransientButtonProps) => {
  return $isLoading ? ".5" : "1";
};

const StyledButton = styled.button<BaseButtonProps>`
  align-items: center;
  border: 0;
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  justify-content: center;
  letter-spacing: 0.03em;
  line-height: 1.75;
  outline: 0;
  border-radius: 20px;
  font-weight: 700;
  box-shadow: 0px 0px 20px 0px var(--accent);
  text-shadow: rgb(255,255,255) 0px 0px 20px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  opacity: ${getOpacity};

  &:hover:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled):not(:active) {
    text-decoration: none;
    background-color: rgb(178, 22, 156);
    box-shadow: rgba(0,0,0,.2) 0px 2px 4px -1px, rgba(0,0,0,.14) 0px 4px 5px 0px, rgba(0,0,0,.12) 0px 1px 10px 0px;
  }

  &:active:not(:disabled):not(.pancake-button--disabled):not(.pancake-button--disabled) {
    opacity: 0.85;
    transform: translateY(1px);
    box-shadow: none;
  }

  ${getDisabledStyles}
  ${variant({
    prop: "scale",
    variants: scaleVariants,
  })}
  ${variant({
    variants: styleVariants,
  })}
  ${layout}
  ${space}
`;

export default StyledButton;
