import { FC } from "react";
import { InnerLayout } from "../../styles/Layouts";
import styled from "styled-components";

export const Expenses: FC = () => {
  return (
    <ExpensesStyled>
      <InnerLayout>Expenses</InnerLayout>
    </ExpensesStyled>
  );
};

const ExpensesStyled = styled.div``;
