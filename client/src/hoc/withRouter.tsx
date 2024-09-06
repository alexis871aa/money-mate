import { ComponentType } from "react";
import { BrowserRouter } from "react-router-dom";

export const withRouter = <P extends object>(Component: ComponentType<P>) => {
  return (props: P) => (
    <>
      <BrowserRouter>
        <Component {...props} />
      </BrowserRouter>
    </>
  );
};
