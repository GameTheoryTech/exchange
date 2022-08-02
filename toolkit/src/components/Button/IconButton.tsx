import styled from "styled-components";
import Button from "./Button";
import { BaseButtonProps, PolymorphicComponent } from "./types";

const IconButton: PolymorphicComponent<BaseButtonProps, "button"> = styled(Button)<BaseButtonProps>`
  padding: 0;
  border-radius: 100%;
  width: ${({ scale }) => (scale === "sm" ? "32px" : "48px")};
  height: ${({ scale }) => (scale === "sm" ? "32px" : "48px")};

  &:hover {
    box-shadow: none!important;
  }
`;

export default IconButton;
