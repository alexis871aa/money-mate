import React, { FC, useEffect, useState } from "react";
import { AuthForm, IncomeList, TodoList } from "../index";
import { useActions, useTypedSelector } from "../../hooks";
import { IUser } from "../../types";
import { UserService } from "../../services";

export const App: FC = () => {
  const { user, isAuth, isLoading } = useTypedSelector((state) => state.user);
  const { checkAuth, logout } = useActions();
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuth();
    }
  }, []);

  const getUsers = async () => {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!isAuth) {
    return (
      <div>
        <AuthForm />
        <button onClick={getUsers}>Получить пользователей</button>
      </div>
    );
  }

  return (
    <div>
      <h1>
        {isAuth ? `Пользователь авторизован ${user.email}` : "АВТОРИЗУЙТЕСЬ"}
      </h1>
      <h1>
        {user.isActivated
          ? "Аккаунт подтвержден по почте"
          : "ПОДТВЕРДИТЕ АККАУНТ"}
      </h1>
      <button onClick={() => logout()}>Выйти</button>
      {/*<IncomeList />*/}
      {/*<hr />*/}
      {/*<TodoList />*/}
      <button onClick={getUsers}>Получить пользователей</button>
      {users.map((user) => (
        <div key={user.email}>{user.email}</div>
      ))}
    </div>
  );
};
