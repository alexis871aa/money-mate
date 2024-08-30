import { FC } from "react";
import styled from "styled-components";
import { SignoutIcon } from "../../../../ui";

export const SignOut: FC = () => {
  return (
    <SignOutStyled>
      <li>
        <SignoutIcon />
        <span>Выйти</span>
      </li>
    </SignOutStyled>
  );
};

const SignOutStyled = styled.div`
  li {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
`;
