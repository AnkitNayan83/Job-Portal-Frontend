import { Button } from "@mui/material";
import React, { useState } from "react";
import "./header.scss";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const [position, setPosition] = useState("");
  const navigate = useNavigate();
  const handelSearch = () => {
    navigate("/jobs", { state: { position } });
  };
  return (
    <div className="header">
      <div className="Hcontainer">
        <div className="left">
          <img src="./assests/work.jpg" alt="" />
          <div className="color">
            <h1>Search your dream job. . .</h1>
            <div className="Hinput">
              <input
                type="text"
                placeholder="search by position"
                onChange={(e) => setPosition(e.target.value)}
              />
              <Button
                className="Hbtn"
                variant="contained"
                onClick={handelSearch}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
        <div className="right">
          <img src="./assests/hand.jpg" alt="" />
        </div>
      </div>
    </div>
  );
};
