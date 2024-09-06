import { ChangeEvent, FC, useEffect, useState } from "react";
import { useActions, useTypedSelector } from "../../hooks";
import { Button, Error, Loader, user } from "../../ui";
import { Link, useNavigate } from "react-router-dom";
import { selectUser } from "../../store/selectors";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";

const userSchema = yup.object().shape({
  email: yup
    .string()
    .required("Заполните электронную почту")
    .matches(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Введите пожалуйста корректный адрес электронной почты!",
    ),
  password: yup
    .string()
    .required("Введите пожалуйста пароль для входа")
    .min(3, "Пароль должен быть не менее 3 символа")
    .max(32, "Пароль не может быть более 32 символов"),
  confirmPassword: yup
    .string()
    .required("Пожалуйста, подтвердите пароль")
    .oneOf([yup.ref("password")], "Пароли должны совпадать"),
});

interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
}

const initialRegistrationUserData = {
  email: "",
  password: "",
  confirmPassword: "",
};

export const RegisterPage: FC = () => {
  const [registerData, setRegisterData] = useState<RegisterData>(
    initialRegistrationUserData,
  );
  const [serverError, setServerError] = useState("");
  const [isRegistration, setIsRegistration] = useState(false);

  const { registration } = useActions();
  const { isAuth } = useTypedSelector(selectUser);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: yupResolver(userSchema),
  });

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setRegisterData((prevState: RegisterData) => ({
      ...prevState,
      [target.name]: target.value,
    }));
    setServerError("");
  };

  const onSubmit = async () => {
    const { email, password } = registerData;

    try {
      setIsRegistration(true);
      await registration(email, password);

      setRegisterData({
        email: "",
        password: "",
        confirmPassword: "",
      });
      navigate("/");
    } catch (error: any) {
      setServerError(error.message || "Произошла ошибка при входе.");
    } finally {
      setIsRegistration(false);
    }
  };

  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth, navigate]);

  const errorForm =
    errors?.email?.message ||
    errors?.password?.message ||
    errors?.confirmPassword?.message;
  const errorMessage = errorForm || serverError;

  return (
    <RegisterPageStyled>
      {isRegistration ? (
        <Loader message="Регистрируем, ссылка на активацию будет выслана на почту..." />
      ) : (
        <>
          <FormStyled onSubmit={handleSubmit(onSubmit)}>
            <div className="input-control">
              <input
                type="email"
                required
                value={registerData.email}
                placeholder="Email..."
                {...register("email", { onChange: handleChange })}
              />
            </div>
            <div className="input-control">
              <input
                type="password"
                required
                value={registerData.password}
                placeholder="Пароль..."
                {...register("password", { onChange: handleChange })}
              />
            </div>
            <div className="input-control">
              <input
                type="password"
                required
                value={registerData.confirmPassword}
                placeholder="Повторите пароль..."
                {...register("confirmPassword", { onChange: handleChange })}
              />
            </div>
            <div className="submit-btn">
              <Button
                disabled={isRegistration}
                name="Зарегистрироваться"
                icon={user}
                $bPad="0.8rem 1.6rem"
                $bRad="30px"
                $bg="var(--color-accent)"
                $color="#fff"
              />
            </div>
            <div className="link">
              <Link to="/login">Войти</Link>
              <Link to="/request-password-reset">Восстановить пароль</Link>
            </div>
          </FormStyled>
          <Error message={errorMessage || ""} />
        </>
      )}
    </RegisterPageStyled>
  );
};

const RegisterPageStyled = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: rgba(252, 246, 249, 0.78);
  padding: 2rem;
  backdrop-filter: blur(4.5px);
  z-index: 1;
`;

const FormStyled = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.1);

  input {
    font-family: inherit;
    font-size: inherit;
    outline: none;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    border: 2px solid #fff;
    background: transparent;
    box-shadow: 0 1px 15px rgba(0, 0, 0, 0.06);
    color: rgba(34, 34, 96, 0.9);

    &::placeholder {
      color: rgba(34, 34, 96, 0.4);
    }
  }

  .input-control {
    input {
      width: 100%;
    }
  }

  .submit-btn {
    display: flex;
    justify-content: center;

    button {
      box-shadow: 0 1px 15px rgba(0, 0, 0, 0.06);
      &:hover {
        background: var(--color-green) !important;
      }
    }
  }

  .link {
    font-size: 1rem;
    margin-top: 1rem;
    text-align: center;

    a {
      color: var(--color-accent);
      text-decoration: none;
      margin-left: 1rem;

      &:hover {
        text-decoration: underline;
      }
    }
  }
`;
