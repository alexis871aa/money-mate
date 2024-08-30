import { FC, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Loader: FC = () => {
  useEffect(() => {
    const toastId = toast.info("Загрузка данных...", {
      autoClose: false,
    });

    return () => {
      toast.dismiss(toastId); // Закрыть тост вручную
    };
  }, []);

  return (
    <div>
      <ToastContainer />
      <h2>Идёт загрузка...</h2>
    </div>
  );
};
