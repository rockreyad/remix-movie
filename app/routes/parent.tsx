import { Outlet } from "@remix-run/react";
import React from "react";

const parent = () => {
  return (
    <div className="p-10">
      <Outlet />
    </div>
  );
};

export default parent;
