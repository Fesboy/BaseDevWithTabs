import React from "react";

import BaseLayout from "@/layouts/BaseLayout";
import Home from "./pages/home";
import "./App.css";

export default function App() {
  return (
    <BaseLayout>
      <Home />
    </BaseLayout>
  );
}
