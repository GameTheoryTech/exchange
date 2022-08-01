import React from "react";
import styled from "styled-components";
import Flex from "../../components/Box/Flex";
import { Box } from "../../components/Box";
import { ArrowBackIcon, CloseIcon } from "../../components/Svg";
import { IconButton } from "../../components/Button";
import { ModalProps } from "./types";

export const ModalHeader = styled.div<{ background?: string }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  button {
    position: absolute;
    right: 20px;
    font-size: 35px;

    svg {
      width: 1em;
      height: 1em;
      filter: drop-shadow(0 0 5px var(--accent));
    }
  }
`;

export const ModalTitle = styled(Flex)`

`;

export const ModalBody = styled(Flex)`
  flex-direction: column;
  max-height: 90vh;
  overflow-y: auto;
`;

export const ModalCloseButton: React.FC<{ onDismiss: ModalProps["onDismiss"] }> = ({ onDismiss }) => {
  return (
    <IconButton variant="text" onClick={onDismiss} aria-label="Close the dialog">
      <CloseIcon color="primary" />
    </IconButton>
  );
};

export const ModalBackButton: React.FC<{ onBack: ModalProps["onBack"] }> = ({ onBack }) => {
  return (
    <IconButton variant="text" onClick={onBack} area-label="go back" mr="8px">
      <ArrowBackIcon color="primary" />
    </IconButton>
  );
};

export const ModalContainer = styled(Box)<{ minWidth: string }>`
  overflow: hidden;
  background: #212e4d;
  border-radius: 20px;
  width: 100%;
  max-height: 100vh;
  min-width: 500px;
  max-width: 500px;
  z-index: ${({ theme }) => theme.zIndices.modal};

  @media (max-width: 500px) {
    min-width: 100%;
  }
`;
