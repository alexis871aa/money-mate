import { FC, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface LoaderProps {
  message?: string;
}

export const Loader: FC<LoaderProps> = ({ message = "Загрузка данных..." }) => {
  useEffect(() => {
    const toastId = toast.info(message, {
      autoClose: false,
    });

    return () => {
      toast.dismiss(toastId); // Закрыть тост вручную
    };
  }, []);

  return (
    <div>
      <ToastContainer />
      <h2>{message}</h2>
    </div>
  );
};
