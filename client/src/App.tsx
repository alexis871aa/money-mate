import { FC, useMemo } from "react";
import { MainLayout } from "./styles/Layouts";
import {
  Dashboard,
  Expenses,
  Income,
  Navigation,
  Orb,
  Transactions,
} from "./components";
import bg from "./assets/bg.png";
import { useTypedSelector } from "./hooks";
import { selectApp } from "./store/selectors";
import styled from "styled-components";

export const App: FC = () => {
  const { active } = useTypedSelector(selectApp);

  const display = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Transactions />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  return (
    <AppStyled $bg={bg}>
      {orbMemo}
      <MainLayout>
        <div className="container">{display()}</div>
        <Navigation />
      </MainLayout>
    </AppStyled>
  );
};

interface AppStyledProps {
  $bg?: string;
}

const AppStyled = styled.div<AppStyledProps>`
  height: 100vh;
  background-image: url(${(props) => props.$bg});
  position: relative;

  .container {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #fff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;
