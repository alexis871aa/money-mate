import { FC } from "react";
import styled from "styled-components";

interface ErrorProps {
  message: string;
}

export const Error: FC<ErrorProps> = ({ message }) => {
  return <ErrorStyled>{message}</ErrorStyled>;
};

const ErrorStyled = styled.div`
  margin-top: 1rem;
  background-color: ${({ children }) =>
    children ? "rgba(255, 0, 0, 0.1)" : "inherit"};
  border: ${({ children }) =>
    children ? "1px solid var(--color-accent)" : "inherit"};
  padding: 1rem;
  text-align: center;
  color: ${({ children }) => (children ? "var(--color-accent)" : "inherit")};
  border-radius: 10px;
  font-size: 0.9rem;
`;
