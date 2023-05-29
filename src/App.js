import React from "react";
import { Home } from "./pages/home/Home";
import { Login } from "./pages/login/Login";
import { Register } from "./pages/register/Register";
import { Jobs } from "./pages/jobs/Jobs";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { NoUserRoutes } from "./components/routes/NoUserRoutes";
import { PrivateRoute } from "./components/routes/PrivateRoute";
import { PublicRoutes } from "./components/routes/PublicRoutes";
import { Apply } from "./pages/apply/Apply";
import { Application } from "./pages/applications/Application";
import "./app.scss";

export const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoutes>
                <Home />
              </PublicRoutes>
            }
          />
          <Route
            path="/login"
            element={
              <NoUserRoutes>
                <Login />
              </NoUserRoutes>
            }
          />
          <Route
            path="/register"
            element={
              <NoUserRoutes>
                <Register />
              </NoUserRoutes>
            }
          />
          <Route
            path="/jobs"
            element={
              <PrivateRoute>
                <Jobs />
              </PrivateRoute>
            }
          />
          <Route
            path="/apply/:id"
            element={
              <PrivateRoute>
                <Apply />
              </PrivateRoute>
            }
          />
          <Route
            path="/applications"
            element={
              <PrivateRoute>
                <Application />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
