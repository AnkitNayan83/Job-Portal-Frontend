import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/slice/alertSlice";
import { publicRequest } from "../../axiosInstance";
import { setUser } from "../../redux/slice/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const getUser = async () => {
    try {
      dispatch(showLoading());
      const { data } = await publicRequest.post(
        "/user/get-user",
        {
          token: localStorage.getItem("token"),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (data.success) {
        dispatch(setUser(data.user));
      } else {
        localStorage.clear();
        navigate("/login");
        toast.error("Your session expired");
      }
    } catch (error) {
      localStorage.clear();
      dispatch(hideLoading());
      console.log(error);
      toast.error("Your session expired please login again");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!user) {
      localStorage.getItem("token") && getUser();
    }
  });

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};
