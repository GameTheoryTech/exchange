import React, { cloneElement, Children, ReactElement } from "react";
import styled, { DefaultTheme } from "styled-components";
import { space } from "styled-system";
import { scales, variants } from "../Button/types";
import { ButtonMenuProps } from "./types";

interface StyledButtonMenuProps extends ButtonMenuProps {
  theme: DefaultTheme;
}

const StyledButtonMenu = styled.div<StyledButtonMenuProps>`
  background-color: rgba(0,0,0,0.4);
  border-radius: 20px;
  display: inline-flex;

  & > button + button,
  & > a + a {
    margin-left: 2px; // To avoid focus shadow overlap
  }
  ${space}
`;

const ButtonMenu: React.FC<ButtonMenuProps> = ({
  activeIndex = 0,
  scale = scales.MD,
  variant = variants.PRIMARY,
  onItemClick,
  children,
  ...props
}) => {
  return (
    <StyledButtonMenu variant={variant} {...props}>
      {Children.map(children, (child: ReactElement, index) => {
        return cloneElement(child, {
          isActive: activeIndex === index,
          onClick: onItemClick ? () => onItemClick(index) : undefined,
          scale,
          variant,
        });
      })}
    </StyledButtonMenu>
  );
};

export default ButtonMenu;
