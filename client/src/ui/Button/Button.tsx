import { FC, ReactNode } from "react";
import styled from "styled-components";

interface ButtonProps {
  name?: string;
  icon: ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  $bg?: string;
  $bPad?: string;
  $color?: string;
  $bRad?: string;
  $iColor?: string;
  $hColor?: string;
}

export const Button: FC<ButtonProps> = ({ name, icon, onClick, ...props }) => (
  <ButtonStyled onClick={onClick} {...props}>
    {icon}
    {name}
  </ButtonStyled>
);

interface ButtonStyledProps {
  $bg?: string;
  $bPad?: string;
  $color?: string;
  $bRad?: string;
  $iColor?: string;
  $hColor?: string;
}

const ButtonStyled = styled.button<ButtonStyledProps>`
  background: ${({ $bg }) => $bg};
  padding: ${({ $bPad }) => $bPad};
  color: ${({ $color }) => $color};
  border-radius: ${({ $bRad }) => $bRad};
  outline: none;
  border: none;
  font-family: inherit;
  font-size: inherit;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: all 0.4s ease-in-out;

  i {
    color: ${({ $iColor }) => $iColor};
  }

  &:hover {
    background-color: ${({ $hColor }) => $hColor};
  }
`;
