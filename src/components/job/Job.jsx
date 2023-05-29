import React from "react";
import "./job.scss";
import { LocationOn } from "@mui/icons-material";
import { Link } from "react-router-dom";

export const Job = ({
  position,
  company,
  location,
  desc,
  date,
  type,
  jobId,
}) => {
  return (
    <div className="job">
      <div className="job_top">
        <div className="job_name">{position}</div>
        <div className="job_type">{type}</div>
        <div className="job_date">{date?.split("T")[0]}</div>
      </div>
      <div className="job_middle">
        <div className="job_company">{company}</div>
        <div className="job_location">
          <LocationOn className="location" />
          <span>{location}</span>
        </div>
      </div>
      <div className="job_desc">{desc}</div>
      <Link to={`/apply/${jobId}`}>
        <button className="job_apply">Apply</button>
      </Link>
    </div>
  );
};
