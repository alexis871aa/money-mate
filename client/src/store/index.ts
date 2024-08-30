import { applyMiddleware, legacy_createStore as createStore, compose } from "redux";
import { withExtraArgument, thunk } from "redux-thunk";
import { rootReducer } from "./reducers";

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  undefined,
  composeEnhancers(applyMiddleware(withExtraArgument(thunk))),
);

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
