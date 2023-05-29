import React, { useEffect, useState } from "react";
import "./card.scss";
import { publicRequest } from "../../axiosInstance";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/slice/alertSlice";

export const Card = ({ jobId, status, resume, date, appId }) => {
  const [job, setJob] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const getJob = async () => {
      const { data } = await publicRequest.get(`/job/${jobId}`);
      setJob(data);
    };
    jobId && getJob();
  }, [jobId]);

  const handelWithdraw = async () => {
    try {
      if (window.confirm("Are you sure you wanna delete this application")) {
        dispatch(showLoading());
        const { data } = await publicRequest.delete(
          `/application/delete/${appId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch(hideLoading());
        if (data.success) {
          toast.success(data.message);
        } else toast.error("something went wrong");
      } else {
        console.log("miss");
        return;
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="card">
      <div className="Ctop">
        <h1>{job?.position}</h1>
        <h3>{job?.workType}</h3>
        <h3>Applied on: {date.split("T")[0]}</h3>
      </div>
      <div className="Cmid">
        <h2>{job?.company}</h2>
        <p>{job?.desc}</p>
      </div>
      <div className="Cbottom">
        <h3>Status: {status}</h3>
        <Link target="_blank" to={`http://localhost:8080/${resume}`}>
          <span>view resume</span>
        </Link>
        <button onClick={handelWithdraw}>Withdraw Application</button>
      </div>
    </div>
  );
};
