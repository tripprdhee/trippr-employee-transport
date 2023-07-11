import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppTextInput from "../../../Components/Common/AppTextInput";
import AppButton from "../../../Components/Common/Button";
import "../styles.css";
import { loginAPI } from "../../../Api/auth";
import { useNavigate } from "react-router-dom";
import Image from "../../../Assets/png/sign-in-image.png";
import LogoImage from "../../../Assets/png/new-logo.svg";

import instance from "../../../Api";

const LoginPage = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  const getHomePage = () => {
    navigate("/");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const data = { email: email, password: password };
    const resp = await loginAPI(data).catch((e) => {
      toast.error(e.data.message);
      setIsLoading(false);
    });

    if (resp && resp.statusCode === 200) {
      toast.success("Login SuccessFully!");
      localStorage.setItem("hrToken", resp.data.token);
      instance.defaults.headers.common["Authorization"] =
        "Bearer " + resp.data.token;
      localStorage.setItem("HR_LOGIN_INFO", JSON.stringify(resp.data));
      setIsLoading(false);
      navigate("/home");
    } else {
      setIsLoading(false);
    }
  };

  const Forgetpasswordpage = (e) => {
    e.preventDefault();
    navigate("/auth/forgetpassword");
  };

  return (
    <div className="login-container">
      <div className="miiddle-container">
        <img src={LogoImage} alt="" style={{ alignSelf: "flex-start" }} />
        <h1 className="title">Sign In</h1>
        <h2 className="sub-title">Sign in and start managing your Employee!</h2>
        <form onSubmit={onSubmit}>
          <div className="auth_input_div">
            <label>Email</label>
            <AppTextInput
              type="email"
              placeholder="Email"
              className="form-control"
              onChange={(text) => setEmail(text.target.value)}
              id="email"
              required
            />
          </div>
          <div className="auth_input_div">
            <label>Password</label>
            <AppTextInput
              type="password"
              placeholder="Password"
              className="form-control"
              onChange={(text) => setPassword(text.target.value)}
              id="pwd"
              required
            />
          </div>
          <div className="checkbox-container">
            <div>
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label"> Remember me</label>
            </div>
            <p
              className="forgot-password"
              style={{ color: "#605BFF" }}
              onClick={Forgetpasswordpage}
            >
              Forgot password?
            </p>
          </div>
          <div className="btn-container">
            <AppButton title="Login" type="submit" disabled={isLoading} />
          </div>
          <ToastContainer />
          <div className="last-container">
            <p
              onClick={() => getHomePage()}
              style={{ color: "#444", marginTop: "24px" }}
            >
              Don't have an account yet ?
              <b className="join-trippr" style={{ color: "#605BFF" }}>
                {" "}
                Join trippr.co.in
              </b>
            </p>
          </div>
        </form>
      </div>
      <div className="auth_image_container">
        <img src={Image} alt="" className="auth_image" />
      </div>
    </div>
  );
};

export default LoginPage;
