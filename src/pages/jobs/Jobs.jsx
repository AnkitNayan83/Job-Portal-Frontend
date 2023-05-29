import React, { useEffect, useRef, useState } from "react";
import "./jobs.scss";
import { Navbar } from "../../components/navbar/Navbar";
import { Footer } from "../../components/footer/Footer";
import { countries, workTypeData } from "../../countrydata";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import { Job } from "../../components/job/Job";
import { publicRequest } from "../../axiosInstance";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/slice/alertSlice";
import { toast } from "react-toastify";

export const Jobs = () => {
  const location = useLocation();
  const [workType, setWorkType] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [position, setPosition] = useState(location.state?.position || "");
  const [company, setCompany] = useState("");
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(10);
  const [maxLimit, setMaxLimit] = useState(10);
  const [show, setShow] = useState(true);
  const inputRef = useRef();
  const companyRef = useRef();
  const locationRef = useRef();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.alerts);

  const handelLimit = () => {
    if (limit < maxLimit) {
      if (limit + 10 >= maxLimit) setShow(false);
      setLimit(limit + 10);
    } else {
      setShow(false);
    }
  };

  const handelChange = () => {
    setPosition(inputRef.current.value);
    setCompany(companyRef.current.value);
  };

  const handelClear = () => {
    setPosition("");
    setCompany("");
    inputRef.current.value = "";
    companyRef.current.value = "";
  };

  useEffect(() => {
    const getJobs = async () => {
      dispatch(showLoading());
      try {
        const res = await publicRequest.get(
          `/job/all?status=open&workLocation=${workLocation}&workType=${workType}&search=${position}&company=${company}&limit=${limit}`
        );
        setData(res.data.jobs);
        setMaxLimit(res.data.totalJobs);
        if (res.data.totalJobs < 10) setShow(false);
        else setShow(true);
        dispatch(hideLoading());
      } catch (error) {
        console.log(error);
        toast.error("server not working");
        dispatch(hideLoading());
      }
    };
    getJobs();
  }, [workLocation, workType, position, company, limit]);

  return (
    <div className="jobs">
      <Navbar />
      <div className="jobs_container">
        <div className="Jleft">
          <div className="filterBox">
            <div className="Fcontainer">
              <div className="fil1">
                <label htmlFor="position">Position</label>
                <input
                  placeholder={`${position}`}
                  type="text"
                  id="position"
                  ref={inputRef}
                />
              </div>
              <div className="fil1">
                <label htmlFor="company">Company</label>
                <input type="text" id="company" ref={companyRef} />
              </div>
              <div className="fill-btns">
                <button className="fil-btn" onClick={handelChange}>
                  Apply Filter
                </button>
                <button className="fil-btn" onClick={handelClear}>
                  Clear Filter
                </button>
              </div>
            </div>
            <div className="Fcontainer">
              <div className="fil2">
                <Autocomplete
                  className="country"
                  ref={locationRef}
                  disablePortal
                  id="country-select"
                  options={workTypeData}
                  sx={{ width: 385 }}
                  autoHighlight
                  onChange={(event, value) =>
                    setWorkType(value ? value.label : "")
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Work Type" />
                  )}
                />
              </div>
              <div className="fil2">
                <Autocomplete
                  className="country"
                  disablePortal
                  id="country-select"
                  options={countries}
                  sx={{ width: 385 }}
                  autoHighlight
                  onChange={(event, value) =>
                    setWorkLocation(value ? value.label : "")
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Country" />
                  )}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="Jright">
          {loading ? (
            <div className="loading">
              <CircularProgress className="load_icon" />
              <p>Loading please wait...</p>
            </div>
          ) : (
            <div className="right_container">
              {data.length === 0 ? (
                <div className="no-post">
                  <img src="./assests/no-search-found.png" alt="" />
                  <h4>No Jobs Found</h4>
                </div>
              ) : (
                <>
                  {data?.map((item, i) => (
                    <Job
                      position={item.position}
                      company={item.company}
                      location={item.workLocation}
                      desc={item.desc}
                      type={item.workType}
                      date={item.createdAt}
                      jobId={item._id}
                      key={i}
                    />
                  ))}
                  <div className="job_pages">
                    <button
                      className={show ? "load-btn" : "disabled"}
                      onClick={handelLimit}
                    >
                      Load More
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};
