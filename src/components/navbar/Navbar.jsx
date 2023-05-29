import React, { useState } from "react";
import "./navbar.scss";
import { ArrowDropDown } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { hideLoading, showLoading } from "../../redux/slice/alertSlice";
import { removeUser } from "../../redux/slice/authSlice";

export const Navbar = () => {
  const user = useSelector((state) => state.auth.user);
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggle = () => {
    setActive(!active);
  };

  const handelLogout = async () => {
    try {
      dispatch(showLoading());
      dispatch(removeUser());
      localStorage.clear();
      dispatch(hideLoading());
      navigate("/login");
      toast.success("you have been logged out");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <div className="navbar">
      <div className="nav-container">
        <Link to="/">
          <div className="left">Job Portal</div>
        </Link>
        <div className="right">
          {user ? (
            <>
              <Link to="/jobs">
                <div className="r1">Jobs</div>
              </Link>
              <Link to="/applications">
                <div className="r1">My Application's</div>
              </Link>
              <div className="r2">
                <div className="dropUp" onClick={toggle}>
                  <span>{user.name}</span>
                  <ArrowDropDown />
                </div>
                <div className={`dropDown + ${active ? " active" : ""}`}>
                  <span>Profile</span>
                  <span onClick={handelLogout}>Logout</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="Rlogin">Login</button>
              </Link>
              <Link to="/register">
                <button className="Rlogin">Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
