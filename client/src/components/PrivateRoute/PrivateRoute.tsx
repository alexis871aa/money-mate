import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks";
import { InnerLayout } from "../../styles/Layouts";
import { StatusDisplay } from "../../ui";

interface PrivateRouteProps {
  component: FC;
}

export const PrivateRoute: FC<PrivateRouteProps> = ({
  component: Component,
}) => {
  const { isAuth, isLoading } = useTypedSelector((state) => state.user);

  if (isLoading) {
    return <StatusDisplay loading message="Идёт проверка авторизации..." />;
  }

  return isAuth ? <Component /> : <Navigate to="/login" />;
};
