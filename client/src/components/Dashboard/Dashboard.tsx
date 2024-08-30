import { FC } from "react";
import { InnerLayout } from "../../styles/Layouts";
import styled from "styled-components";

export const Dashboard: FC = () => {
  return (
    <DashboardStyled>
      <InnerLayout>Dashboard</InnerLayout>
    </DashboardStyled>
  );
};

const DashboardStyled = styled.div``;
