import React, { useEffect, useState } from "react";
import { Navbar } from "../../components/navbar/Navbar";
import { Footer } from "../../components/footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { publicRequest } from "../../axiosInstance";
import "./application.scss";
import { Card } from "../../components/card/Card";
import { hideLoading, showLoading } from "../../redux/slice/alertSlice";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

export const Application = () => {
  const [data, setData] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const { loading } = useSelector((state) => state.alerts);
  const dispatch = useDispatch();

  useEffect(() => {
    const getApp = async () => {
      try {
        const { data } = await publicRequest.get(
          `/application/all?userId=${user?._id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setData(data.application);
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
      }
    };
    user && getApp();
  }, [user, loading]);

  return (
    <div className="applications">
      <Navbar />
      <div className="applications_container">
        {loading ? (
          <div className="loading">
            <CircularProgress className="load_icon" />
            <p>Loading please wait...</p>
          </div>
        ) : (
          <div className="Awrapper">
            <h1 className="Ahead">My Application's</h1>
            {data.length === 0 ? (
              <div className="no-app">
                <h2>No application found</h2>
              </div>
            ) : (
              <>
                {data.map((item, i) => (
                  <Card
                    key={i}
                    jobId={item.jobId}
                    status={item.status}
                    resume={item.resume}
                    date={item.createdAt}
                    appId={item._id}
                  />
                ))}
              </>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};
