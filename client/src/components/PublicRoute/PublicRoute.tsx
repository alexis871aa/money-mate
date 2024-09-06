import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useTypedSelector } from "../../hooks";
import { selectUser } from "../../store/selectors";

interface PublicRouteProps {
  component: FC;
}

export const PublicRoute: FC<PublicRouteProps> = ({ component: Component }) => {
  const { isAuth } = useTypedSelector(selectUser);

  return isAuth ? <Navigate to="/" /> : <Component />;
};
