import { FC } from "react";
import { InnerLayout } from "../../styles/Layouts";
import { Form } from "../Form/Form";
import styled from "styled-components";
import { AuthForm } from "../AuthForm/AuthForm";

export const Income: FC = () => {
  return (
    <IncomesStyled>
      <InnerLayout>
        <h1>Доходы</h1>
        <div className="income-content">
          <div className="form-container">
            {/*<AuthForm />*/}
            <Form />
          </div>
          <div className="incomes"></div>
        </div>
      </InnerLayout>
    </IncomesStyled>
  );
};

const IncomesStyled = styled.div``;
