import React from "react";
import "./styles.css";
import { SVG } from "../../Helpers/svgFiles";
import { useNavigate } from "react-router-dom";

function Footer() {
  let navigate = useNavigate();
  const getHomePage = () => {
    navigate("/");
  };
  return (
    <>
      <div className="footer-start">
        <div className="footers justify-content-between container">
          <div className="text-logo">
            <img
              src={SVG.tripprWhiteLogo}
              alt="ShortLogo"
              onClick={() => getHomePage()}
            />
          </div>
          <div className=" footers">
            <div className="container-sm">
              <h6>Company</h6>
              <ul>
                <li>
                  <a href="/privacypolicy" className="footer-items">
                    Privacy-Policy
                  </a>
                </li>
                <li>
                  <a className="footer-items" href="/aboutUs">
                    About
                  </a>
                </li>
                <li>
                  <a href="/paymentpolicy" className="footer-items">
                    Payment-Policy
                  </a>
                </li>
                <li>
                  <a href="/termsandcondition" className="footer-items">
                    Terms & Condition
                  </a>
                </li>
              </ul>
            </div>
            <div className="container-sm">
              <h6>Contact Us</h6>
              <div>
                <ul>
                  <li>
                    <a className="footer-items" href="/contactus">
                      Contact-Us
                    </a>
                  </li>
                  <li>
                    <a className="footer-items" href="/refundpolicy">
                      Refund Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="container-sm">
              <h6>Operator</h6>
              <a href="https://trippr-operator.web.app/">
                <p className="footer-items">Login</p>
              </a>
            </div>
          </div>
          <div className="p-4">
            <div className="container-sm">
              <h6>Social</h6>
            </div>
            {/* <div className="social-icon-container">
              <div className="social-icons">
                <a target={"_blank"} href="https://www.facebook.com/profile.php?id=100086706413373&mibextid=ZbWKwL">
                  <img src={facebook} alt="FbIcon" />
                </a>
              </div>
              <div className="social-icons">
                <a target={"_blank"} href="https://www.instagram.com/trippr.co/">
                  <img src={instagram} alt="IgIcon" />
                </a>
              </div>
              <div className="social-icons">
                <a target={"_blank"}
                  href="https://www.pinterest.com/aadmin0891/"
                  className="d-flex justify-content-center"
                >
                  <img src={pinrest} alt="IgIcon" />
                </a>
              </div>
              <div className="social-icons">
                <a target={"_blank"}
                  href="https://www.linkedin.com/company/trippr-co-in/"
                  className="d-flex justify-content-center"
                >
                  <img src={linkedin} alt="IgIcon" />
                </a>
              </div>
              <div className="social-icons">
                <a target={"_blank"}
                  href="https://twitter.com/trippr_rentals?t=zsVks_58r8iV-titqWGBbw&s=09"
                  className="d-flex justify-content-center"
                >
                  <img src={twitter} alt="IgIcon" />
                </a>
              </div>
            </div>
            <div className="playstore-icon">
              <a target={"_blank"} href="https://play.google.com/store/apps/details?id=com.trippr">
                <img src={playstore} alt="playStore" />
              </a>
            </div> */}
            <div className="social-icon-container">
              <div className="social-icon">
                <a
                  target={"_blank"}
                  href=" https://www.facebook.com/Tripprcoin-105832935777812"
                >
                  <img src={SVG.facebooktwo} alt="FbIcon" />
                </a>
              </div>
              <div className="social-icon">
                <a
                  target={"_blank"}
                  href="https://www.instagram.com/trippr.in/"
                >
                  <img src={SVG.instagramtwo} alt="IgIcon" />
                </a>
              </div>
              <div className="social-icons">
                <a
                  target={"_blank"}
                  href="https://www.pinterest.com/aadmin0891/"
                  className="d-flex justify-content-center"
                >
                  <img src={SVG.Pinterest} alt="IgIcon" />
                </a>
              </div>
            </div>
            <div className="playstore-icon">
              <a
                target={"_blank"}
                href="https://play.google.com/store/apps/details?id=com.trippr"
              >
                <img src={SVG.playstorelabel} alt="playStore" />
              </a>
            </div>
          </div>
        </div>
        <div className="sub-footer d-flex justify-content-center">
          <div className="sub-footer-text">
            <p> Trippology Pvt Ltd. All rights reserved,2023. &#169;</p>
          </div>
        </div>
        {/* <BootamFooter /> */}
      </div>
    </>
  );
}

export default Footer;
