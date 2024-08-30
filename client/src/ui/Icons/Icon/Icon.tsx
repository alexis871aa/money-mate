import { FC } from "react";
import styled from "styled-components";

interface IconProps {
  icon: string;
  onClick?: () => void;
  $size?: string;
  $margin?: string;
  $disabled?: boolean;
}

export const Icon: FC<IconProps> = ({ icon, onClick, ...props }) => (
  <IconStyled {...props}>
    <i className={icon} onClick={onClick}></i>
  </IconStyled>
);

interface IconStyledProps {
  $size?: string;
  $margin?: string;
  $disabled?: boolean;
}

export const IconStyled = styled.div<IconStyledProps>`
  font-size: ${({ $size = "1.4rem" }) => $size};
  margin: ${({ $margin = "0" }) => $margin};
  color: ${({ $disabled }) => ($disabled ? "#000" : "rgba(34, 34, 96, 0.6)")};
`;
