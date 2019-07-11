import "babel-polyfill";
import "react-hot-loader";
import dva from "dva";
import createLoading from "dva-loading";

import history from "@/common/history";
import App from "./App";
import home from "@/models/home";

const app = dva({
  history
});

app.use(createLoading());

app.router(App);

app.model(home);

app.start("#root");

export default app;
