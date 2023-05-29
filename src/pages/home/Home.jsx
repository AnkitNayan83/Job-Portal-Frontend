import React from "react";
import "./home.scss";
import { Navbar } from "../../components/navbar/Navbar";
import { Header } from "../../components/header/Header";
import { Footer } from "../../components/footer/Footer";

export const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Header />
      <Footer />
    </div>
  );
};
