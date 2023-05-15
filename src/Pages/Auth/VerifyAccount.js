import { useState } from "react";
import { SVG } from "../../Helpers/svgFiles";
import { forgotPasswordApi, otpVerificationApi } from "../../Api/auth/index";
import { ToastContainer, toast } from "react-toastify";
import AppTextInput from "../../Components/Common/AppTextInput";
import OTPInput, { ResendOTP } from "otp-input-react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const VerifyAccount = () => {
  const [mobileNumber, setmobileNumber] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setotp] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  const CustomerMobileNo = location.state;
  console.log(CustomerMobileNo);
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      mobileNumber: CustomerMobileNo.mobileNumber,
      otp: otp,
    };
    console.log(data);
    const resp = await otpVerificationApi(data).catch((e) => {
      toast.error(e.data.message);
      setIsLoading(false);
    });
    console.log(resp);
    if (resp && resp.statusCode == 200) {
      toast.success("Otp Add  SuccessFully!");
      navigate("/auth/confirmPassword", {
        state: { mobileNumber: data.mobileNumber },
      });
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };
  return (
    <div className="login-main">
      <div className="login-box">
        <div className="logo">
          <img src={SVG.trippLogo} />
        </div>
        <h1 className="login-title">Verify Account</h1>
        <div className="login-input-area mt-2">
          <form autoComplete="on" onSubmit={onSubmit}>
            <div className="custom-input">
              <label>Enter The OTP</label>
              <div className="verify-textbox">
                <OTPInput
                  value={otp}
                  onChange={setotp}
                  autoFocus
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  secure
                  className="custom-otp"
                />
              </div>
              <p className="light d-flex justify-content-end mt-3">
                <a onClick={onSubmit}>Resend OTP</a>
              </p>
              <div className="form-group mt-2 d-flex justify-content-center">
                <button className="btn btn-default" disabled={isLoading}>
                  <b>Submit</b>
                </button>
              </div>
            </div>
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;

{
  /* <input
                  type="number"
                  placeholder=""
                  autoFocus
                  maxLength="1"
                  onChange={(text) => setotp(text.target.value)}
                />
                <input
                  type="number"
                  placeholder=""
                  maxLength="1"
                  onChange={(text) => setotp(text.target.value)}
                />
                <input
                  type="number"
                  placeholder=""
                  maxLength="1"
                  onChange={(text) => setotp(text.target.value)}
                />
                <input
                  type="number"
                  placeholder=""
                  maxLength="1"
                  onChange={(text) => setotp(text.target.value)}
                />
                <input
                  type="number"
                  placeholder=""
                  maxLength="1"
                  onChange={(text) => setotp(text.target.value)}
                />
                <input
                  type="number"
                  placeholder=""
                  maxLength="1"
                  onChange={(text) => setotp(text.target.value)}
                /> */
}
