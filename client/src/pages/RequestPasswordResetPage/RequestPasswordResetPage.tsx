import { ChangeEvent, FC, useState } from "react";
import { useActions } from "../../hooks";
import { Button, Error, user } from "../../ui";
import { Link } from "react-router-dom";
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
});

interface RequestResetData {
  email: string;
}

const initialRequestResetPasswordData = {
  email: "",
};

export const RequestPasswordResetPage: FC = () => {
  const [reqResetData, setReqResetData] = useState<RequestResetData>(
    initialRequestResetPasswordData,
  );
  const [serverError, setServerError] = useState("");
  const [message, setMessage] = useState(
    sessionStorage.getItem("resetMessage") || "",
  );

  const { requestResetPassword } = useActions();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(userSchema),
  });

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setReqResetData((prevState: RequestResetData) => ({
      ...prevState,
      [target.name]: target.value,
    }));
    setServerError("");
  };

  const onSubmit = async () => {
    const { email } = reqResetData;

    try {
      requestResetPassword(email);
      setReqResetData({
        email: "",
      });
      setMessage("Ссылка для восстановления пароля успешно отправлена!");
    } catch (error: any) {
      setServerError(
        error.message || "Произошла ошибка при попытке восстановить пароль",
      );
    }
  };

  const errorForm = errors?.email?.message;
  const errorMessage = errorForm || serverError;

  return (
    <RegisterPageStyled>
      {message === "" ? (
        <>
          <h1>Восстановление пароля</h1>
          <FormStyled onSubmit={handleSubmit(onSubmit)}>
            <div className="input-control">
              <input
                type="email"
                required
                value={reqResetData.email}
                placeholder="Email..."
                {...register("email", { onChange: handleChange })}
              />
            </div>
            <div className="submit-btn">
              <Button
                name="Отправить"
                icon={user}
                $bPad="0.8rem 1.6rem"
                $bRad="30px"
                $bg="var(--color-accent)"
                $color="#fff"
              />
            </div>
          </FormStyled>
          <Error message={errorMessage || ""} />
        </>
      ) : (
        <>
          <div>{message}</div>
          <Link to="/">На главную</Link>
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

  h1 {
    font-size: 26px;
    margin-bottom: 2rem;
  }
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
