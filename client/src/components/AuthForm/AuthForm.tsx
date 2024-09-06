import { FC, ChangeEvent, useState } from "react";
import { useActions, useTypedSelector } from "../../hooks";

interface UserData {
  email: string;
  password: string;
}

export const AuthForm: FC = () => {
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });
  const { user, isAuth } = useTypedSelector((state) => state.user);

  const { login, registration } = useActions();

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setUserData((prevState: UserData) => {
      return {
        ...prevState,
        [target.name]: target.value,
      };
    });
  };

  return (
    <div>
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={userData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={userData.password}
        onChange={handleChange}
      />
      <button onClick={() => login(userData.email, userData.password)}>
        Логин
      </button>
      <button onClick={() => registration(userData.email, userData.password)}>
        Регистрация
      </button>
    </div>
  );
};
