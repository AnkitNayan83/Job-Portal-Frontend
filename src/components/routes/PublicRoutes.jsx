import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/slice/authSlice";
import { hideLoading, showLoading } from "../../redux/slice/alertSlice";
import { publicRequest } from "../../axiosInstance";
import { toast } from "react-toastify";

export const PublicRoutes = ({ children }) => {
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
        toast.error("Your session expired please login again");
      }
    } catch (error) {
      localStorage.clear();
      dispatch(hideLoading());
      console.log(error);
      navigate("/login");
      toast.error("Your session expired please login again");
    }
  };

  useEffect(() => {
    if (!user) {
      localStorage.getItem("token") && getUser();
    }
  });

  return children;
};
