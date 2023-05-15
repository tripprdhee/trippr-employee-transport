import React, { useEffect } from "react";
import Header from "../../Components/Header";
import { CardData } from "./SearchData";
import "./styles.css";
import Ott from "../../Assets/images/icon.png";
import { useLocation, useNavigate } from "react-router-dom";
import { imageURL } from "../../Api/index";
import Footer from "../../Components/Footer";

const VehicleRateing = () => {
  let location = useLocation();

  useEffect(() => {
    console.log("loclllllllllla==>", location.state.LocationInfo);
  }, []);

  const navigate = useNavigate();
  const BookVehicle = (data) => {
    navigate("/SearchVehicleDetails", {
      state: {
        tripInfo: location.state.data,
        operatorDetails: data,
        totalDays: location.state.totalDays,
        isAcVehicle: location.state.operatorDetails.isAcVehicle,
        bucketPrice: location.state.operatorDetails.bucketPrice,
        LocationInfo: location.state.LocationInfo,
      },
    });
  };

  const PriceCalculation = (data) => {
    let baseFare =
      data?.minimumKmDay *
      location.state.totalDays *
      (location.state.operatorDetails.isAcVehicle
        ? data?.acPricePerKm
        : data?.nonAcPricePerKm);

    let driverDayBata = location.state.totalDays * data?.driverBata?.day;
    let gst = (parseFloat(baseFare) * 5) / 100;
    let finalPrice = parseFloat(gst) + baseFare + driverDayBata;
    return finalPrice;
  };
  return (
    <>
      <Header />

      <div className="p-4">
        <div className="row">
          {location.state?.data?.data?.map((item, index) => {
            return (
              <div className="col-lg-3 col-md-3 col-sm-6 col-12 mt-3 d-flex justify-content-center">
                <div className="card">
                  <img
                    src={imageURL + item.vehicleImages[0].url}
                    className="card-img-top"
                    alt=""
                    onClick={() => BookVehicle(item)}
                  />
                  <div className="card-body">
                    <div className="main-titles">
                      <h5 className="card-title">{`Operator Id #${
                        index + 1
                      }`}</h5>
                      <h5>{`₹ ${PriceCalculation(item)}`}</h5>
                    </div>
                    <div className="prices">
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-4 col-12">
                          <h4>
                            {item?.vehicleModel}{" "}
                            {`${item?.passengerLimit} Seater`}
                          </h4>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-4 col-12">
                          <div className="d-flex justify-content-end">
                            <p className="text-dark">At ₹ 17/KM</p>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-8 col-md-6 col-sm-4 col-12 paid">
                          <p className="text-dark p-1">
                            Balance To Be Paid ₹ 15543
                          </p>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-4 col-12">
                          <div className="selectOpertors">
                            <a
                              href="/SearchVehicleRateDetails"
                              className="badge badge-dark"
                              onClick={() => BookVehicle(item)}
                            >
                              Confirm
                            </a>
                          </div>
                        </div>
                      </div>
                      <p>Pay the Remaining at the start of Journey</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="pickupanddrop mt-5">
        <div className="w-100 d-flex justify-content-center ">
          <div className="pick-message w-50 p-5">
            <div className="pick-title d-flex justify-content-center">
              <h4>Airport Pick Up & Drop Cabs</h4>
            </div>
            <div className="pick-des">
              <p>
                Just pick-up and drop to the airport , do check out packages for
                pick up and drop. We make sure that you are picked up and
                dropped safely with enough time to spare for you to relax at
                airpoirt/railway station. If you’re interested renting a car for
                a day then full day car rental.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {/* <Footer /> */}
    </>
  );
};
export default VehicleRateing;
