import { ChangeEvent, FC, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useActions } from "../../hooks";
import { Button, Error, key, StatusDisplay } from "../../ui";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import styled from "styled-components";

const passwordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required("Введите новый пароль")
    .min(3, "Пароль должен быть не менее 3 символов")
    .max(32, "Пароль не может быть более 32 символов"),
  confirmPassword: yup
    .string()
    .required("Подтвердите пароль")
    .oneOf([yup.ref("newPassword")], "Пароли должны совпадать"),
});

interface ResetPasswordData {
  newPassword: string;
  confirmPassword: string;
}

const initialResetPasswordData = {
  newPassword: "",
  confirmPassword: "",
};

export const ResetPasswordPage: FC = () => {
  const { resetToken } = useParams<{ resetToken: string }>();
  const [resetPasswordData, setResetPasswordData] = useState<ResetPasswordData>(
    initialResetPasswordData,
  );
  const [serverError, setServerError] = useState("");
  const [message, setMessage] = useState("");

  const { resetPassword } = useActions();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialResetPasswordData,
    resolver: yupResolver(passwordSchema),
  });

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setResetPasswordData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
    setServerError("");
  };

  const onSubmit = async () => {
    const { newPassword } = resetPasswordData;

    try {
      if (resetToken) {
        await resetPassword(resetToken, newPassword);
        setMessage("Пароль успешно изменён!");
        setResetPasswordData(initialResetPasswordData);
      } else {
        setServerError("Токен для сброса пароля отсутствует.");
      }
    } catch (error: any) {
      setServerError(error.message || "Произошла ошибка при сбросе пароля.");
    }
  };

  const errorForm =
    errors?.newPassword?.message || errors?.confirmPassword?.message;
  const errorMessage = errorForm || serverError;

  return (
    <ResetPasswordPageStyled>
      {message === "" ? (
        <>
          <h1>Введите новый пароль</h1>
          <FormStyled onSubmit={handleSubmit(onSubmit)}>
            <div className="input-control">
              <input
                type="password"
                required
                value={resetPasswordData.newPassword}
                placeholder="Новый пароль..."
                {...register("newPassword", { onChange: handleChange })}
              />
            </div>
            <div className="input-control">
              <input
                type="password"
                required
                value={resetPasswordData.confirmPassword}
                placeholder="Подтвердите новый пароль..."
                {...register("confirmPassword", { onChange: handleChange })}
              />
            </div>
            <div className="submit-btn">
              <Button
                name="Сбросить пароль"
                icon={key}
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
          <StatusDisplay message={message} />
          <Link to="/login">Войти</Link>
        </>
      )}
    </ResetPasswordPageStyled>
  );
};

const ResetPasswordPageStyled = styled.div`
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
`;
