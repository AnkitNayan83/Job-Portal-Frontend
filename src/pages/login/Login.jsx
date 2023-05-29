import React, { useState } from "react";
import { Navbar } from "../../components/navbar/Navbar";
import { Footer } from "../../components/footer/Footer";
import "./login.scss";
import { Link, useNavigate } from "react-router-dom";
import { publicRequest } from "../../axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/slice/alertSlice";
import { CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.alerts.loading);

  const handelLogin = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) return toast.error("please enter all field");
      dispatch(showLoading());
      const { data } = await publicRequest.post("/auth/login", {
        email,
        password,
      });
      dispatch(hideLoading());
      if (data.success) {
        localStorage.setItem("token", data.token);
        toast.success("logged in successfully");
        navigate("/jobs");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("wrong email or password");
    }
  };

  return (
    <div className="login">
      {loading ? (
        <div className="loading">
          <CircularProgress className="load_icon" />
          <p>Loading please wait...</p>
        </div>
      ) : (
        <>
          <Navbar />
          <div className="login_container">
            <div className="Lwrapper">
              <div className="Lleft">
                <p>Join Us on this journey ....</p>
                <img src="/assests/team.jpg" alt="" />
              </div>
              <div className="Lright">
                <h2>Login</h2>
                <form>
                  <div className="f1">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="xyz@gmail.com"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="f1">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      id="password"
                      placeholder="******"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="Finfo">
                    <div className="Fsave">
                      <input type="checkbox" id="check" />
                      <label htmlFor="check">remenber me</label>
                    </div>
                    <div className="Ffog">forgot password?</div>
                  </div>
                  <button className="Fbutton" onClick={handelLogin}>
                    Login
                  </button>
                  <span>
                    Dont have an account?{" "}
                    <Link to="/register">
                      <strong>click here</strong>{" "}
                    </Link>{" "}
                    to register
                  </span>
                </form>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};
