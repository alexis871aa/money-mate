import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import {
  LoginPage,
  RegisterPage,
  RequestPasswordResetPage,
  ResetPasswordPage,
  Dashboard,
  Income,
  Expense,
} from "../../pages";
import { PrivateRoute } from "../PrivateRoute/PrivateRoute";
import { PublicRoute } from "../PublicRoute/PublicRoute";

export const AppRoutes: FC = () => {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute component={LoginPage} />} />
      <Route
        path="/register"
        element={<PublicRoute component={RegisterPage} />}
      />
      <Route
        path="/request-password-reset"
        element={<PublicRoute component={RequestPasswordResetPage} />}
      />
      <Route
        path="/reset-password/:resetToken"
        element={<PublicRoute component={ResetPasswordPage} />}
      />

      <Route path="/" element={<PrivateRoute component={Dashboard} />} />
      <Route path="/incomes" element={<PrivateRoute component={Income} />} />
      <Route path="/expenses" element={<PrivateRoute component={Expense} />} />
    </Routes>
  );
};
