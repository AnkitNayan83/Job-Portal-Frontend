import React from "react";
import "./footer.scss";

export const Footer = () => {
  return (
    <div className="footerContainer">
      <div className="footer">
        <div className="fLists">
          <ul className="fList">
            <li className="fListItem">Job Portal</li>
            <li className="fListItem">
              <div className="img-container">
                <img src="/assests/logo.png" alt="" />
              </div>
            </li>
          </ul>
          <ul className="fList">
            <li className="fListItem">Questions </li>
            <li className="fListItem">Help</li>
            <li className="fListItem">Teams </li>
            <li className="fListItem">Answers</li>
            <li className="fListItem">Data</li>
          </ul>
          <ul className="fList">
            <li className="fListItem">About </li>
            <li className="fListItem">Reviews</li>
            <li className="fListItem">Legal</li>
            <li className="fListItem">Privacy Policy</li>
            <li className="fListItem">Contact Us</li>
          </ul>
          <ul className="fList">
            <li className="fListItem">Technology</li>
            <li className="fListItem">Life & Arts</li>
            <li className="fListItem">Science</li>
            <li className="fListItem">Business</li>
            <li className="fListItem">Api</li>
          </ul>
        </div>
        <div className="fText">Copyright © 2023</div>
      </div>
    </div>
  );
};
