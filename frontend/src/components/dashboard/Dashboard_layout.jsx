import React from "react";
import Navigation from "./Navigation.jsx";
import Footer from "./footer.jsx";
import { Outlet } from "react-router-dom";

function Dashboard_layout() {
  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  );
}

export default Dashboard_layout;
