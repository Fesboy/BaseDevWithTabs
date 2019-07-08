import React from "react";
import { hot } from "react-hot-loader/root";

import BaseLayout from "@/layouts/BaseLayout";
import Home from "./pages/home";
import "./App.css";

function App() {
  return (
    <BaseLayout>
      <Home />
    </BaseLayout>
  );
}

export default hot(App);
