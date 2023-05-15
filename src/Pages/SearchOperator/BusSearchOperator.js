import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment/moment";
import { getBusOperatorList } from "../../Api/operators";
import Header from "../../Components/Header";
import "./styles.css";
import AppLoader from "../../Components/Loader";
import { ToastContainer} from "react-toastify";
import Footer from "../../Components/Footer";
import { motion } from "framer-motion";
import callCenter from "../../Assets/icon/social-icons/callCenter.png";

const SearchOperator = (props) => {
  let location = useLocation();

  const [busOperatorList, setBusOperatorList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  var body = {
    from: location.state.from,
    to: location.state.to,
    fromDate: moment(location.state.startDate).toISOString(),
    toDate: moment(location.state.endDate).toISOString(),
    isAcVehicle: true,
    isBus: true,
  };

  useEffect(() => {
    setIsLoading(true);
    getBusLists();
  }, []);

  const getBusLists = async () => {
    setIsLoading(true);
    const resp = await getBusOperatorList(body);
    console.log("BusbusOperatorList ==> ", resp);

    if (resp.statusCode === 200) {
      setBusOperatorList(resp.data);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  const onPressSelectOperator = (data) => {};
  let startFrom = new Date(location.state.startDate.toString());
  let endDate = new Date(location.state.endDate.toString());

  return (
    <>
      <ToastContainer />

      {isLoading ? (
        <AppLoader />
      ) : (
        <div style={{ backgroundColor: "#1E1E1E" }}>
          <Header />
          <div className=" main-Searchdiv">
            {busOperatorList.length === 0 ? (
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-6 col-12">
                  <div className="notfoundimage">
                    <div className="round-div">
                      <img
                        id="roundDivImg"
                        src={callCenter}
                        alt=""
                        className="callImg"
                      />
                    </div>
                    <h3 className="noResultwhite">
                      Your Trippin’ expert will get in touch with you shortly
                    </h3>
                  </div>
                </div>
              </div>
            ) : (
              <div className="newSearchCard">
                <div
                  className="searchDetails"
                  style={{ color: "#FFC107", fontFamily: "Raleway-Bold" }}
                >
                  <h1>
                    {location.state.from} to {location.state.to}
                  </h1>
                  <h4>
                    {startFrom.toDateString()} - {endDate.toDateString()} ,{" "}
                    {location.state.noOfSeat} Passengers
                  </h4>
                  {busOperatorList[0].bucketPriceAC}
                </div>
                <div className="mainQuat">
                  {busOperatorList.map((item, index) => {
                    return (
                      <div className="card-main" key={index}>
                        <div className="card-body p-0">
                          <div className="rowQuat ">
                            <div className="first-section">
                              <div className="leftModel">
                                <img
                                  // src={imageURL + item.data[0].vehicleImages[0].url}
                                  src={item.data[0].selectVehicle}
                                  alt=""
                                  className="vehicleImage"
                                />
                              </div>
                            </div>
                            <div className="second-section">
                              <div className="second-main">
                                <div className="second-left">
                                  <p className="vehile-names">{`${item.data[0]?.vehicleModel}`}</p>
                                  <div className="kilomodal">
                                    {item.bucketPriceAC ? (
                                      <p className="kolimeters">
                                        {item.localPriceList.hoursAc}/NonAc{" "}
                                      </p>
                                    ) : (
                                      <p className="kolimeters">
                                        {`₹ ${item?.perKmPrice} `}
                                        <b
                                          style={{
                                            color: "#FFFFFF",
                                            fontSize: "20px",
                                            fontWeight: "lighter",
                                          }}
                                        >
                                          /Km -
                                        </b>{" "}
                                        {item?.passengerLimit}{" "}
                                        <b
                                          style={{
                                            color: "#FFFFFF",
                                            fontSize: "22px",
                                            fontWeight: "lighter",
                                          }}
                                        >
                                          {" "}
                                          Seater -{" "}
                                        </b>{" "}
                                        {(item?.type).toUpperCase()}{" "}
                                      </p>
                                    )}

                                    {/* <h4 className="vehicle-model" >{`${item?.passengerLimit} Seater -  ${item?.type}`}</h4> */}
                                  </div>
                                  {item.bucketPriceAC ? (
                                    <div className="localText">
                                      <p>
                                        {" "}
                                        Extra KM-₹{
                                          item.localPriceList.extraKm
                                        }{" "}
                                        - Extra Hours-₹
                                        {item.localPriceList.extraHours}
                                      </p>
                                    </div>
                                  ) : (
                                    <div></div>
                                  )}
                                </div>
                                {item.bucketPriceAC ? (
                                  <div>
                                    <p
                                      className="trip-price"
                                      style={{
                                        fontSize: "14px",
                                        textAlign: "end",
                                      }}
                                    >
                                      Ac-{" "}
                                      <b style={{ fontSize: "23px" }}>
                                        ₹{item.bucketPriceAC}
                                      </b>
                                    </p>
                                    <p
                                      className="trip-price"
                                      style={{
                                        fontSize: "14px",
                                        textAlign: "end",
                                      }}
                                    >
                                      NonAc-{" "}
                                      <b style={{ fontSize: "23px" }}>
                                        ₹{item.bucketPrice}
                                      </b>
                                    </p>
                                  </div>
                                ) : (
                                  <p className="trip-price">
                                    ₹{item.bucketPrice}
                                  </p>
                                )}
                              </div>
                              <div className="restText">
                                <p className="book-now">
                                  {" "}
                                  Book Now at just ₹{" "}
                                  <b
                                    style={{
                                      fontFamily: "Montserrat",
                                      fontSize: "22px",
                                      color: "rgba(255, 193, 7, 0.75)",
                                    }}
                                  >
                                    {((item?.bucketPrice * 10) / 100).toFixed()}
                                    .{" "}
                                  </b>{" "}
                                  Pay the rest later
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="third-section">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            className="selectOpertors"
                            onClick={() => onPressSelectOperator(item)}
                          >
                            Continue
                          </motion.button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <Footer />
        </div>
      )}
    </>
  );
};
export default SearchOperator;
