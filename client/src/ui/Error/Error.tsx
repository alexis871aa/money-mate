import { FC, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ErrorProps {
  errorMessage?: string;
}

export const Error: FC<ErrorProps> = ({ errorMessage }) => {
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  return (
    <div>
      <ToastContainer />
      <h2>Произошла ошибка</h2>
      <p>{errorMessage}</p>
    </div>
  );
};
