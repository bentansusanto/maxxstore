import { ReactNode } from "react";
import {Provider} from "react-redux";
import { store } from "../store/index";
const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <main>{children}</main>
    </Provider>
  );
};

export default Providers;
