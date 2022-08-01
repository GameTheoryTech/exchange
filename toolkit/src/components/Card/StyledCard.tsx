import styled, { DefaultTheme } from "styled-components";
import { space } from "styled-system";
import { CardProps } from "./types";

interface StyledCardProps extends CardProps {
  theme: DefaultTheme;
}

/**
 * Priority: Warning --> Success --> Active
 */
const getBoxShadow = ({ isActive, isSuccess, isWarning, theme }: StyledCardProps) => {
  if (isWarning) {
    return theme.card.boxShadowWarning;
  }

  if (isSuccess) {
    return theme.card.boxShadowSuccess;
  }

  if (isActive) {
    return theme.card.boxShadowActive;
  }

  return theme.card.boxShadow;
};

const StyledCard = styled.div<StyledCardProps>`
  border: 2px solid var(--extra-color-1);
  border-radius: 20px;
  box-shadow: 0 0 5px var(--extra-color-1);
  backdrop-filter: blur(15px);
  overflow: hidden;
  position: relative;

  &.link {
    cursor: pointer;
    transition: box-shadow 0.2s ease-out;

    &:hover {
      box-shadow: 0px 0px 20px 0px var(--extra-color-1);
    }
  }

  ${space}
`;

StyledCard.defaultProps = {
  isActive: false,
  isSuccess: false,
  isWarning: false,
  isDisabled: false,
};

export default StyledCard;
