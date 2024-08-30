import { FC } from "react";
import { InnerLayout } from "../../styles/Layouts";
import styled from "styled-components";

export const Transactions: FC = () => {
  return (
    <TransactionsStyled>
      <InnerLayout>Transaction</InnerLayout>
    </TransactionsStyled>
  );
};

const TransactionsStyled = styled.div``;
