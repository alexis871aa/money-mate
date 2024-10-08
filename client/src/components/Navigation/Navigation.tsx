import { FC } from "react";
import { MenuItems, MenuUser, SignOut } from "./components";
import styled from "styled-components";

export const Navigation: FC = () => {
  return (
    <NavigationStyled>
      <MenuUser />
      <MenuItems />
      <SignOut />
    </NavigationStyled>
  );
};

const NavigationStyled = styled.nav`
  padding: 2rem 1.5rem;
  min-height: 600px;
  width: 270px;
  height: 100%;
  background: rgba(252, 246, 249, 0.78);
  border: 3px solid #ffffff;
  backdrop-filter: blur(4.5px);
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
`;
