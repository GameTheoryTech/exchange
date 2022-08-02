import React from "react";
import Button from "../../../components/Button/Button";
import { useWalletModal } from "../../WalletModal";
import { Login } from "../../WalletModal/types";
import { WalletIcon } from "../icons";
import styled from "styled-components";

const StyledButton = styled(Button)`
  span {
    margin-left: 10px;
  }

  svg {
    position: relative;
    top: -2.5px;
    height: 24px;
  }

  @media (max-width: 767px) {
    padding: 10px 0;
    min-width: 64px;

    span {
      display: none;
    }
  }
`;

interface Props {
  account?: string;
  login: Login;
  logout: () => void;
}

const UserBlock: React.FC<Props> = ({ account, login, logout }) => {
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(login, logout, account);
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;
  return (
    <div>
      {account ? (
        <StyledButton
          scale="sm"
          onClick={() => {
            onPresentAccountModal();
          }}
        >
          <WalletIcon />
          <span>{accountEllipsis}</span>
        </StyledButton>
      ) : (
        <StyledButton
          scale="sm"
          onClick={() => {
            onPresentConnectModal();
          }}
        >
          <WalletIcon />
          <span>Connect</span>
        </StyledButton>
      )}
    </div>
  );
};

export default React.memo(
  UserBlock,
  (prevProps, nextProps) =>
    prevProps.account === nextProps.account &&
    prevProps.login === nextProps.login &&
    prevProps.logout === nextProps.logout
);
