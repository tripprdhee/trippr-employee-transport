import React, { useState } from "react";
import AppTextInput from "../../../Components/Common/AppTextInput";
import AppButton from "../../../Components/Common/Button";
import "../styles.css";
import { loginAPI, signUpAPI } from "../../../Api/auth";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import instance from "../../../Api";

const SignUpPage = () => {
  const [name, setName] = useState();
  const [mobileNumber, setMobileNo] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [area, setArea] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [pincode, setPincode] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();


  const onSubmit = async (e) => {
    e.preventDefault();
    if(!name) return toast.error("Add name")
    if(!email) return toast.error("Add email")
    if(!mobileNumber) return toast.error("Add mobileNumber")
    if(!password) return toast.error("Add password")
    if(!area) return toast.error("Add area")
    if(!city) return toast.error("Add city")
    if(!state) return toast.error("Add state")
    if(!pincode) return toast.error("Add pincode")

    const data = {
      email: email,
      password: password,
      name: name,
      mobileNumber: mobileNumber,
      companyAddress: {
        area: area,
        city: city,
        state: state,
        pincode: pincode
      }
    };
    const resp = await signUpAPI(data).catch((e) => {
      toast.error(e.data.message);
    });

    if (resp?.message !== 'SUCCESS') {
      toast.error(resp.message);
      return
    }
    if (resp && resp.statusCode === 200) {
      toast.success("Register SuccessFully!");
      localStorage.setItem("HR_INFO", JSON.stringify(resp.data));
      setIsLoading(false);

      const LoginData = { email: email, password: password };
      const respL = await loginAPI(LoginData).catch((e) => {
        toast.error(e.data.message);
        setIsLoading(false);
      });
      if (respL && respL.statusCode === 200) {
        localStorage.setItem("hrToken", respL.data.token);
        instance.defaults.headers.common["Authorization"] =
          "Bearer " + respL.data.token;
        localStorage.setItem("HR_LOGIN_INFO", JSON.stringify(respL.data));

        navigate("/", {});

      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };
  return (
    <div className="container-fluid bg-dark login-container">
      <div className="miiddle-container">
        <p className="title signup-title">Sign Up</p>
        <form onSubmit={onSubmit} >
          <div id="signupForm">
            <div>
              <p className="addressSignup">Your Details:-</p>

              <div>
                <AppTextInput
                  type="text"
                  placeholder="Username"
                  className="form-control"
                  onChange={(text) => setName(text.target.value)}
                />
              </div>
              <div>
                <AppTextInput
                  type="email"
                  placeholder="Email"
                  className="form-control"
                  onChange={(text) => setEmail(text.target.value)}
                />
              </div>
              <div>
                <AppTextInput
                  type="text"
                  placeholder="Mobile Number"
                  className="form-control"
                  onChange={(text) => setMobileNo(text.target.value)}
                />
              </div>
              <div>
                <AppTextInput
                  type="password"
                  placeholder="password"
                  className="form-control"
                  onChange={(text) => setPassword(text.target.value)}
                />
              </div>
            </div>
            <div className="addressInputDiv">

              <p className="addressSignup">Company Address:-</p>
              <div>
                <AppTextInput
                  type="text"
                  placeholder="Area/colony"
                  className="form-control"
                  onChange={(text) => setArea(text.target.value)}
                />
              </div>
              <div>
                <AppTextInput
                  type="text"
                  placeholder="city"
                  className="form-control"
                  onChange={(text) => setCity(text.target.value)}
                />
              </div>
              <div>
                <AppTextInput
                  type="text"
                  placeholder="state"
                  className="form-control"
                  onChange={(text) => setState(text.target.value)}
                />
              </div>
              <div>
                <AppTextInput
                  type="text"
                  placeholder="pincode"
                  className="form-control"
                  onChange={(text) => setPincode(text.target.value)}
                />
              </div>
            </div>
          </div>

          <ToastContainer />
          <div className="btn-container">
            <AppButton title="Sign Up" disabled={isLoading} type="submit" />
          </div>
          <div id="Login-text">
            <Link to="/login">
              Already have  an account? <b style={{ color: "#FFC107" }}>Login</b>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SignUpPage;
