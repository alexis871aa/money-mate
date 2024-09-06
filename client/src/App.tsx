import { FC, useEffect, useMemo } from "react";
import { MainLayout } from "./styles/Layouts";
import { AppRoutes, Navigation, Orb } from "./components";
import bg from "./assets/bg.png";
import { useActions, useTypedSelector } from "./hooks";
import { selectUser } from "./store/selectors";
import { StatusDisplay } from "./ui";
import styled from "styled-components";

export const App: FC = () => {
  const { checkAuth } = useActions();
  const { isAuth, isLoading } = useTypedSelector(selectUser);

  const orbMemo = useMemo(() => {
    return <Orb />;
  }, []);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuth();
    }
  }, [checkAuth]);

  if (isLoading) {
    return <StatusDisplay loading message="Идёт проверка авторизации..." />;
  }

  return (
    <AppStyled $bg={bg}>
      {orbMemo}
      <MainLayout>
        <div className="container">
          <AppRoutes />
        </div>
        {isAuth && <Navigation />}
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
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;
