import React, { useState } from "react";
import { Navbar } from "../../components/navbar/Navbar";
import { Footer } from "../../components/footer/Footer";
import "./register.scss";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { countries } from "../../countrydata";
import { Link, useNavigate } from "react-router-dom";
import { publicRequest } from "../../axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/slice/alertSlice";
import { toast } from "react-toastify";

export const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [location, setLocation] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loading = useSelector((state) => state.alerts.loading);

  const handelRegister = async (e) => {
    e.preventDefault();
    try {
      if (!name || !email || !password || !location)
        return toast.error("please provide all field");
      dispatch(showLoading());
      const res = await publicRequest.post("/auth/register", {
        name,
        email,
        password,
        location,
      });
      dispatch(hideLoading());
      if (res.data.success) {
        toast.success("user registered successfully please login again");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
      toast.error("invalid details!!");
    }
  };

  return (
    <div className="register">
      {loading ? (
        <div className="loading">
          <CircularProgress className="load_icon" />
          <p>Loading please wait...</p>
        </div>
      ) : (
        <>
          <Navbar />
          <div className="register_container">
            <div className="Lwrapper">
              <div className="Lleft">
                <p>Join Us on this journey ....</p>
                <img src="/assests/team.jpg" alt="" />
              </div>
              <div className="Lright">
                <h2>Register</h2>
                <form>
                  <div className="f1">
                    <label htmlFor="name">Username:</label>
                    <input
                      type="text"
                      id="name"
                      placeholder="xyz"
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="f1">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      placeholder="xyz@gmail.com"
                      onChange={(e) => setEmail(e.target.value)}
                      required
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
                  <div className="fx">
                    <Autocomplete
                      className="country"
                      disablePortal
                      id="country-select"
                      options={countries}
                      sx={{ width: 500 }}
                      autoHighlight
                      onChange={(event, value) =>
                        setLocation(value ? value.label : "")
                      }
                      renderInput={(params) => (
                        <TextField {...params} label="Country" />
                      )}
                    />
                  </div>
                  <div className="Finfo">
                    <div className="Fsave">
                      <input type="checkbox" id="check" />
                      <label htmlFor="check">remenber me</label>
                    </div>
                  </div>
                  <button className="Fbutton" onClick={handelRegister}>
                    Register
                  </button>
                  <span>
                    Already have an account?{" "}
                    <Link to="/login">
                      {" "}
                      <strong>click here</strong>{" "}
                    </Link>{" "}
                    to login
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
