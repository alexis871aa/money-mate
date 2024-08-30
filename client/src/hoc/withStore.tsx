import React from "react";
import { Provider } from "react-redux";
import { store } from "../store";

export const withStore = (WrappedComponent: React.ComponentType) => {
  return (props: any) => (
    <Provider store={store}>
      <WrappedComponent {...props} />
    </Provider>
  );
};
