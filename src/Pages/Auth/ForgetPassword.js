import { useState } from "react";
import { forgotPasswordApi } from "../../Api/auth";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import tripprLogo from "../../Assets/png/Trippr-White-Logo.png"

const ForgetPassword = () => {
  const [mobileNumber, setmobileNumber] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      mobileNumber: mobileNumber,
    };

    const resp = await forgotPasswordApi(data).catch((e) => {
      toast.error(e.data.message);
      setIsLoading(false);
    });

    console.log(resp);
    if (resp && resp.statusCode === 200) {
      toast.success("OTP Sent SuccessFully!");
      navigate("/auth/verifyaccount", {
        state: { mobileNumber: mobileNumber },
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
          <img src={tripprLogo}  alt="trippr-logo"/>
        </div>
        <h1 className="login-title">Verify Account</h1>
        <div className="login-input-area mt-2">
          <form autoComplete="on" onSubmit={onSubmit}>
            <div className="form-group">
              <input
                type="number"
                className="form-control"
                placeholder="Enter Your Mobile No"
                onChange={(text) => setmobileNumber(text.target.value)}
                required
              />
              <div className="information mt-1">
                <p>OTP send your mobile no !</p>
              </div>

              <div className="form-group mt-4 d-flex justify-content-center">
                <button className="btn btn-default" disabled={isLoading}>
                  Next
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

export default ForgetPassword;
