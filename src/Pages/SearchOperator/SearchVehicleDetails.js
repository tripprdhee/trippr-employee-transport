import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import useRazorpay from "react-razorpay";
import "./styles.css";
import AppLoader from "../../Components/Loader";
import { createRazorPayOrder } from "../../Api/razorPay";
import { razorPayApiKey } from "../../Api";
import { bookVehicle } from "../../Api/booking";
import moment from "moment/moment";
import Footer from "../../Components/Footer";
import { motion } from "framer-motion";

const SearchOperatorVehicleDetails = (props) => {
  let navigate = useNavigate();
  let location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const data = localStorage.getItem("CUSTOMER_LOGIN_INFO");
  const userData = JSON.parse(data);

  const {
    tripInfo,
    operatorDetails,
    totalDays,
    isAcVehicle,
    LocationInfo,
    isAC,
    tripType,
  } = location.state;
  console.log("operator ==>", totalDays);
  console.log("price ==>", parseInt(operatorDetails.bucketPrice));
  useEffect(() => {
    console.log("location==>", LocationInfo);
    // eslint-disable-next-line
  }, []);

  const PriceCalculation = (data) => {
    console.log("priceData =====> ", data);

    let baseFare =
      data?.data[0].minimumKmDay *
      totalDays *
      (isAcVehicle ? data.data[0].acPricePerKm : data?.data[0].nonAcPricePerKm);
    console.log("baseFare =====> ", baseFare);
    let driverDayBata = totalDays * data?.data[0].driverBata?.day;
    let gst = (parseFloat(baseFare) * 5) / 100;
    let finalPrice = parseFloat(gst) + baseFare + driverDayBata;
    return finalPrice;
  };

  const Razorpay = useRazorpay();

  const handlePayment = async () => {
    setIsLoading(true);
    var data = JSON.stringify({
      amount:
        // (parseFloat(PriceCalculation(operatorDetails)) * 10) / 100
        parseInt(operatorDetails && displayPrice(operatorDetails)),
      receipt: "Booking ",
    });

    const response = await createRazorPayOrder(data);
    console.log("check Response===>", response);
    if (response.statusCode === 200) {
      setIsLoading(false);
      const options = {
        key: razorPayApiKey,
        amount: parseInt((operatorDetails?.bucketPrice * 10) / 100),
        currency: "INR",
        name: "Trippology Pvt Ltd",
        description: "Booking Confirmation",
        image: "https://i.imgur.com/3g7nmJC.png",
        order_id: `${response.data.id}`,
        handler: function (response) {
          onBookVehicle();
        },
        prefill: {
          name: userData.name,
          email: userData.email,
          contact: userData.mobileNumber,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new Razorpay(options);

      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });

      rzp1.open();
    } else {
      setIsLoading(false);
    }

    const onBookVehicle = async () => {
      setIsLoading(true);
      var data = JSON.stringify({
        passengerName: userData.name,
        passengerEmail: userData.email,
        passengerMobileNo: userData.mobileNumber,
        passengerLimit: parseInt(tripInfo.passengerLimit),
        gender: "Male",
        age: 23,
        vehicleDetail: operatorDetails,
        operatorId: operatorDetails._id,
        fromLocation: LocationInfo.from,
        toLocation: LocationInfo.to,
        fromDate: moment(tripInfo.fromDate).toISOString(),
        toDate: moment(tripInfo.tillDate).toISOString(),
        tripType: !tripInfo.isSingleTrip ? "roundTrip" : "oneWay",
        totalDistanceInKm: tripInfo.distance,
        isOneWayTrip: tripInfo.isSingleTrip,
        isAcVehicle: isAcVehicle,
        returnDate: "",
        tripTotalAmt: parseInt(PriceCalculation(operatorDetails)),
        minimumPaidAmt: parseInt((operatorDetails?.bucketPrice * 10) / 100),
        fullPayAmt: 0,
      });

      console.log("check Response====> data", data);
      const response = await bookVehicle(data);
      if (response.statusCode === 200) {
        setIsLoading(false);
        navigate("/");
      } else {
        setIsLoading(false);
      }
      console.log("check Response====>", response);
    };
  };

  const displayPrice = (item) => {
    console.log("fing eror", tripType);
    if (tripType === "outStation") {
      return ((item?.bucketPrice * 10) / 100).toFixed();
    } else if (tripType === "local") {
      console.log("fing eror");

      return isAC
        ? ((item?.bucketPriceAC * 10) / 100).toFixed()
        : ((item?.bucketPrice * 10) / 100).toFixed();
    }
  };
  // console.log("fing", operatorDetails && displayPrice(operatorDetails));

  return (
    <div style={{ backgroundColor: "#1E1E1E" }}>
      {isLoading && <AppLoader />}
      <Header />

      <div className="vehicleDetailsMain">
        <div className="card-main">
          <div className="card-body p-0">
            <div className="rowQuat ">
              <div className="first-section">
                <div className="leftModel">
                  <img
                    src={operatorDetails.data[0].selectVehicle}
                    alt=""
                    className="vehicleImage"
                  />
                </div>
              </div>
              <div className="second-section">
                <div className="second-main">
                  <div className="second-left">
                    <p className="vehile-names">{`${operatorDetails.data[0]?.vehicleModel}`}</p>
                    <div className="kilomodal">
                      {operatorDetails.bucketPriceAC ? (
                        <p className="kolimeters">
                          {operatorDetails.localPriceList.hoursAc}{" "}
                        </p>
                      ) : (
                        <p className="kolimeters">
                          {`₹ ${operatorDetails?.perKmPrice} `}
                          <b
                            style={{
                              color: "#FFFFFF",
                              fontSize: "20px",
                              fontWeight: "lighter",
                            }}
                          >
                            /Km -
                          </b>{" "}
                          {operatorDetails?.passengerLimit}{" "}
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
                          {(operatorDetails?.type).toUpperCase()}{" "}
                        </p>
                      )}

                      {/* <h4 className="vehicle-model" >{`${operatorDetails?.passengerLimit} Seater -  ${operatorDetails?.type}`}</h4> */}
                    </div>
                    {operatorDetails.bucketPriceAC ? (
                      <div className="localText">
                        <p>
                          {" "}
                          Extra KM-₹{operatorDetails.localPriceList.extraKm} -
                          Extra Hours-₹
                          {operatorDetails.localPriceList.extraHours}
                        </p>
                      </div>
                    ) : (
                      <div></div>
                    )}
                  </div>
                  {operatorDetails.bucketPriceAC ? (
                    <div>
                      {isAC ? (
                        <p
                          className="trip-price"
                          style={{ fontSize: "14px", textAlign: "end" }}
                        >
                          Ac-{" "}
                          <b style={{ fontSize: "23px" }}>
                            ₹{operatorDetails.bucketPriceAC}
                          </b>
                        </p>
                      ) : (
                        <p
                          className="trip-price"
                          style={{ fontSize: "14px", textAlign: "end" }}
                        >
                          NonAc-{" "}
                          <b style={{ fontSize: "23px" }}>
                            ₹{operatorDetails.bucketPrice}
                          </b>
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="trip-price">₹{operatorDetails.bucketPrice}</p>
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
                      {operatorDetails && displayPrice(operatorDetails)}.{" "}
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
              onClick={handlePayment}
            >
              BOOK NOW
            </motion.button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default SearchOperatorVehicleDetails;
