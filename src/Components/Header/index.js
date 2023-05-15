import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
// import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import LogoutModal from "../modals/LogoutModal";


const Header = (props) => {
  const data = localStorage.getItem("HR_LOGIN_INFO");
  const hrData = JSON.parse(data);
  const [showLogin, setShowLogin] = useState(false);
  const [clicked, setClicked] = useState(false);

  let navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("HR_LOGIN_INFO");
    localStorage.removeItem("token");
    navigate("/login");
    // setIsLoggedin(false);
  };

  const HandleClick = () => {
    setClicked(!clicked);
  };

  return (
    <>
      <nav>
        <div className="logo-container d-flex justify-content-center">
          
            <LogoutModal
              onLogout={() => logout()}
              isOpen={showLogin}
              onRequestClose={() => setShowLogin(false)}
            />
          
        </div>

        <div>
          <ul id="navbar" className={clicked ? "#navbar active" : "#navbar"}>

            {hrData?.name ? (
              <li className="user-info">
                <p className="menu-title" onClick={() => setShowLogin(true)}>
                  {hrData?.name[0]}
                </p>
              </li>
            ) : (
              <li>
                <Link to="/login" className="menu-title">
                  <button className="menu-title contact-button ">LogIn</button>
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div id="mobile" onClick={() => HandleClick()}>
          <i id="bar" className={clicked ? "fas fa-times" : "fas fa-bars"} />
        </div>
      </nav>
    </>
  );
};
export default Header;

//
// let navigate = useNavigate();
// const logout = () => {
//   localStorage.removeItem("CUSTOMER_LOGIN_INFO");
//   localStorage.removeItem("token");
//   navigate("/auth/login");
//   // setIsLoggedin(false);
// };

// const getHomePage = () => {
//   navigate("/");
// };
// return (
//   <nav className="d-flex justify-content-between p-3">
//     <div className="logo-container d-flex justify-content-center">
//       <img
//         src={SVG.tripprWhiteLogo}
//         alt="ShortLogo"
//         onClick={() => getHomePage()}
//         className="logo-height"
//       />
//     </div>
//     <LogoutModal
//       onLogout={() => logout()}
//       isOpen={showLogin}
//       onRequestClose={() => setShowLogin(false)}
//     />
//     <div className="d-flex justify-content-between">
//       <NavLink className="NavLink" to="/">
//         Home
//       </NavLink>
//       <NavLink className="NavLink" to="/aboutUs">
//         About
//       </NavLink>
//       {/* <NavLink className="NavLink" to="/#">
//         Why us
//       </NavLink>
//       <NavLink className="NavLink" to="/#">
//         Tips
//       </NavLink> */}
//       <NavLink className="NavLink" to="/contactus">
//         <button className="menu-title contact-button ">Contact Us</button>
//       </NavLink>

//       {userData?.name ? (
//         <div className="NavLink user-info">
//           <p className="menu-title" onClick={() => setShowLogin(true)}>
//             {userData?.name[0]}
//           </p>
//         </div>
//       ) : (
//         <NavLink className="NavLink" to="/Auth/Login">
//           <p className="menu-title">LOGIN</p>
//         </NavLink>
//       )}
//     </div>
//   </nav>
// );
