import { useState } from "react";
import AppTextInput from "../../Components/Common/AppTextInput";
import AppButton from "../../Components/Common/Button";
import { SVG } from "../../Helpers/svgFiles";
import { ToastContainer, toast } from "react-toastify";
import { resetPasswordApi } from "../../Api/auth";
import { useLocation, useNavigate } from "react-router-dom";

const ConfirmPasswordPage = () => {
  const [mobileNumber, setmobileNumber] = useState();
  const [newPassword, setnewPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const CustomerMobileNo = location.state;
  console.log(CustomerMobileNo);

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = {
      mobileNumber: CustomerMobileNo.mobileNumber,
      newPassword: newPassword,
    };

    const resp = await resetPasswordApi(data).catch((e) => {
      toast.error(e.data.message);
      setIsLoading(false);
    });

    if (resp && resp.statusCode == 200) {
      toast.success("password Change SuccessFully!");
      navigate("/auth/login", {});
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }

    console.log(resp);
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
            <div>
              <AppTextInput
                type="password"
                placeholder="New Password"
                className="form-control"
                onChange={(text) => setnewPassword(text.target.value)}
                id="pwd"
                required
              />
            </div>
            <div className="btn-container">
              <AppButton title="Submit" type="submit" />
            </div>
            <ToastContainer />
          </form>
        </div>
      </div>
    </div>
  );
};
export default ConfirmPasswordPage;
