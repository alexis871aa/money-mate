import { FC } from "react";
import { signout } from "../../../../ui";
import styled from "styled-components";

export const SignOut: FC = () => {
  return (
    <SignOutStyled>
      <li>
        {signout}
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
