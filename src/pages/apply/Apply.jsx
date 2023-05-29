import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/navbar/Navbar";
import { Link, useNavigate, useParams } from "react-router-dom";
import { publicRequest } from "../../axiosInstance";
import { ArrowBack } from "@mui/icons-material";
import "./apply.scss";
import { Footer } from "../../components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { hideLoading, showLoading } from "../../redux/slice/alertSlice";
import { CircularProgress } from "@mui/material";

export const Apply = () => {
  const { id } = useParams();
  const [data, setData] = useState("");
  const { user } = useSelector((state) => state.auth);
  const [resume, setResume] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alerts);

  useEffect(() => {
    const getData = async () => {
      const { data } = await publicRequest.get(`/job/${id}`);
      setData(data);
    };

    getData();
  }, [id]);

  const handelApply = async () => {
    try {
      if (!resume) return toast.error("you must upload your resume");
      dispatch(showLoading());
      let formData = new FormData();
      formData.append("resume", resume);
      const res = await publicRequest.post(
        `/application/apply/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      navigate("/applications");
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      dispatch(hideLoading());
      toast.error("You have already applied");
    }
  };

  return (
    <div className="apply">
      <Navbar />
      <div className="apply_container">
        {loading ? (
          <div className="loading">
            <CircularProgress className="load_icon" />
            <p>Loading please wait...</p>
          </div>
        ) : (
          <div className="apply_wrapper">
            <div className="ap_top">
              <Link to="/jobs">
                <ArrowBack className="back_icon" />
              </Link>
              <div className="title">
                <p>
                  You are applying for
                  <strong>{" " + data.position + " "}</strong>
                  at <strong>{data.company}</strong>
                </p>
              </div>
            </div>
            <div className="ap_middle">
              <div className="left">
                <p className="name">
                  Your Name: <strong>{user?.name}</strong>
                </p>
                <p className="email">
                  Your email: <strong>{user?.email}</strong>
                </p>
                <div className="upload-res">
                  <label htmlFor="resume" className="file-label">
                    Upload resume
                  </label>
                  <input
                    onChange={(e) => setResume(e.target.files[0])}
                    type="file"
                    name="resume"
                    id="resume"
                    required
                    accept="application/pdf"
                  />
                </div>
              </div>
              <div className="right">
                <h3>You are just one step away...</h3>
                <img src="/assests/apply.jpg" alt="" />
              </div>
            </div>
            <div className="ap_bottom">
              <button onClick={handelApply}>Apply</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
