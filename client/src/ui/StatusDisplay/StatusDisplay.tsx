import React, { FC, useEffect } from "react";
import { Loader } from "../Loader/Loader";
import { ToastContainer, toast, ToastOptions } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

interface StatusDisplayProps {
  loading?: boolean;
  message?: string;
  type?: "success" | "error" | "info" | "warning";
  autoClose?: number;
}

export const StatusDisplay: FC<StatusDisplayProps> = ({
  loading = false,
  message,
  type = "info",
  autoClose = 5000,
}) => {
  useEffect(() => {
    if (message) {
      const toastOptions: ToastOptions = {
        autoClose,
        type,
      };
      toast(message, toastOptions);
    }
  }, [message, type, autoClose]);

  return (
    <StatusDisplayStyled>
      {loading && <Loader message={message} />}
      <ToastContainer />
    </StatusDisplayStyled>
  );
};

const StatusDisplayStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100px;
  position: relative;
`;
