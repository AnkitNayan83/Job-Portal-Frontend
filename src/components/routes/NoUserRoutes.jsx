import React from "react";
import { Navigate } from "react-router-dom";

export const NoUserRoutes = ({ children }) => {
  if (localStorage.getItem("token")) {
    return <Navigate to="/jobs" />;
  } else {
    return children;
  }
};
