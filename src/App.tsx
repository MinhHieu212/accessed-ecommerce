import * as React from "react";
import AppRoute from "./route/AppRoute";

export default function App() {
  console.log("Re-render App");

  return (
    <div className="w-[100vw] h-[100vh]">
      <AppRoute />
    </div>
  );
}
