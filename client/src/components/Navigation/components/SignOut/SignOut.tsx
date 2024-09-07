import { FC } from "react";
import { signout } from "../../../../ui";
import { useNavigate } from "react-router-dom";
import { useActions } from "../../../../hooks";
import styled from "styled-components";

export const SignOut: FC = () => {
  const navigate = useNavigate();
  const { logout } = useActions();

  const handleSignOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <SignOutStyled>
      <li onClick={handleSignOut}>
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
    cursor: pointer;

    span {
      margin-left: 1rem;
      font-size: 1em;
    }
  }
`;
