import { FC } from "react";
import styled from "styled-components";

interface ButtonProps {
  classname?: string;
}

export const Button: FC<ButtonProps> = ({ classname }) => {
  return <ButtonStyled className={classname}></ButtonStyled>;
};

interface ButtonStyledProps {
  classname?: string;
}

const ButtonStyled = styled.div<ButtonStyledProps>``;
