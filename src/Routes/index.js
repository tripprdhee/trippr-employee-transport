import React from "react";
import "./styles.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "../Pages/Home";
import ScrollToTop from "../ScrollToTop";
import LoginPage from "../Pages/Auth/LoginPage";
import ForgetPassword from "../Pages/Auth/ForgetPassword";
import SignUpPage from "../Pages/Auth/SignUpPage";


const Routing = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/signup" element={<SignUpPage />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/auth/forgetpassword" element={<ForgetPassword />} />
       
      </Routes>
    </Router>
  );
};

export default Routing;
