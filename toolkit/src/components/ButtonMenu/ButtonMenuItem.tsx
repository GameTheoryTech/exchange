import React from "react";
import styled from "styled-components";
import Button from "../Button/Button";
import { BaseButtonProps, PolymorphicComponent, variants } from "../Button/types";
import { ButtonMenuItemProps } from "./types";

interface InactiveButtonProps extends BaseButtonProps {
  forwardedAs: BaseButtonProps["as"];
}

const InactiveButton: PolymorphicComponent<InactiveButtonProps, "button"> = styled(Button)<InactiveButtonProps>`
  background-color: transparent;
  color: ${({ theme, variant }) => (variant === variants.PRIMARY ? theme.colors.primary : theme.colors.textSubtle)};
  box-shadow: none;
  text-shadow: none;
  &:hover:not(:disabled):not(:active) {
    background-color: transparent!important;
    color: #fff;
    box-shadow: none!important;
  }
`;

const ButtonMenuItem: PolymorphicComponent<ButtonMenuItemProps, "button"> = ({
  isActive = false,
  variant = variants.PRIMARY,
  as,
  ...props
}: ButtonMenuItemProps) => {
  if (!isActive) {
    return <InactiveButton forwardedAs={as} variant="tertiary" {...props} />;
  }

  return <Button as={as} variant={variants.PRIMARY} {...props} style={{cursor: 'initial', boxShadow: '0px 0px 20px 0px var(--accent)', backgroundColor: 'var(--accent)', transform: 'none', opacity: '1'}} />;
};

export default ButtonMenuItem;
