import React from "react";
import Button from "../../components/Button/Button";
import Text from "../../components/Text/Text";
import { connectorLocalStorageKey } from "./config";
import { Login, Config } from "./types";
import styled from "styled-components";

interface Props {
  walletConfig: Config;
  login: Login;
  onDismiss: () => void;
  mb: string;
}

const StyledButton = styled(Button)`
  background-color: transparent;
  color: var(--accent);
  border: 2px solid var(--accent);
  box-shadow: none;
  text-shadow: none;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }

  svg {
    transition: all .25s cubic-bezier(.4,0,.2,1);
  }

  &:hover {
    background-color: transparent!important;
    box-shadow: 0px 0px 20px 0px var(--accent)!important;
    text-shadow: rgb(255 255 255) 0px 0px 20px!important;

    svg {
      filter: drop-shadow(0 0 20px #fff);
    }
  }
`;

const WalletCard: React.FC<Props> = ({ login, walletConfig, onDismiss, mb }) => {
  const { title, icon: Icon } = walletConfig;
  return (
    <StyledButton
      width="100%"
      variant="primary"
      onClick={() => {
        login(walletConfig.connectorId);
        window.localStorage.setItem(connectorLocalStorageKey, walletConfig.connectorId);
        onDismiss();
      }}
      style={{ justifyContent: "space-between" }}
      mb={mb}
      id={`wallet-connect-${title.toLocaleLowerCase()}`}
    >
      <Text>
        {title}
      </Text>
      <Icon width="32px" />
    </StyledButton>
  );
};

export default WalletCard;
