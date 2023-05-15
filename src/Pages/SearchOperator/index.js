import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { getLocalOperatorList, getOperatorList } from "../../Api/operators";
import Header from "../../Components/Header";
import "./styles.css";
import AppLoader from "../../Components/Loader";
import { ToastContainer, toast } from "react-toastify";
import Footer from "../../Components/Footer";
import { motion } from "framer-motion";
import callCenter from "../../Assets/icon/social-icons/callCenter.png";
import CustomDatePicker from "../../Components/DatePicker";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "../../Config";

const SearchOperator = (props) => {
  let location = useLocation();

  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [passengers, setPassengers] = useState();
  const [destinationLocation, setDestinationLocation] = useState();
  const [pickUpLocation, setPickUpLocation] = useState();
  const [tripType, setTripType] = useState();
  const [diffInHours, setDiffInHours] = useState(location.state.hours);

  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const fromDate = location.state.startDate;
  const tillDate = location.state.endDate;
  const totalDays = Math.round(Math.abs((fromDate - tillDate) / oneDay));
  const EdittotalDays = Math.round(Math.abs((startDate - endDate) / oneDay));
  const [operatorList, setOperatorList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editText, setEditText] = useState(false);
  const [drop, setDrop] = useState("AC");
  const [showAcPrice, setShowAcPrice] = useState(true);
  // ============ calculate total hours ================== //

  useEffect(() => {
    setIsLoading(true);
    setStartDate(location.state.startDate);
    setEndDate(location.state.endDate);
    setPassengers(location.state.noOfSeat);
    setPickUpLocation(location.state.from);
    setDestinationLocation(location.state.to);
    if (location.state.tripType === "outStation") {
      setTripType("outStation");
      onLoadGetOperator();
    } else if (location.state.tripType === "local") {
      setTripType("local");
      getLocalOperatorLists();
    }
    // eslint-disable-next-line
  }, []);

  var body = {
    from: location.state.from,
    to: location.state.to,
    fromDate: moment(location.state.startDate).toISOString(),
    toDate: moment(location.state.endDate).toISOString(),
    isAcVehicle: true,
    passengerLimit: location.state.noOfSeat,
    totalDistanceInKm: 350,
    totalDays: totalDays,
    tripType: "roundTrip",
  };

  var LocalBody = {
    from: location.state.from,
    to: location.state.to,
    fromDate: moment(location.state.startDate).toISOString(),
    toDate: moment(location.state.endDate).toISOString(),
    passengerLimit: location.state.noOfSeat,
    totalDistanceInKm: 350,
    totalDays: totalDays,
    totalHours: diffInHours,
  };
  // ============================================= Edit funtionality use only ================================================================================= //
  var EditBodyData = {
    from: pickUpLocation,
    to: destinationLocation ?? pickUpLocation,
    fromDate: moment(startDate).toISOString(),
    toDate: moment(endDate).toISOString() ?? moment(startDate).toISOString(),
    isAcVehicle: true,
    passengerLimit: passengers,
    totalDistanceInKm: 350,
    totalDays: EdittotalDays,
    tripType: "roundTrip",
  };

  var EditLocalBodyData = {
    from: pickUpLocation,
    to: destinationLocation ?? pickUpLocation,
    fromDate: moment(startDate).toISOString(),
    toDate: moment(endDate).toISOString() ?? moment(startDate).toISOString(),
    passengerLimit: passengers,
    totalDistanceInKm: 350,
    totalDays: EdittotalDays,
    totalHours: diffInHours,
  };
  // ============================================================================================================================== //

  const onLoadGetOperator = async () => {
    const resp = await getOperatorList(body);
    if (resp.statusCode === 200) {
      setOperatorList(resp.data);
      setIsLoading(false);
    } else {
      toast.error(`${resp.data.message}`);

      setIsLoading(false);
    }
  };

  const getLocalOperatorLists = async () => {
    setIsLoading(true);
    const resp = await getLocalOperatorList(LocalBody);

    if (resp.statusCode === 200) {
      setOperatorList(resp.data);
      setIsLoading(false);
    } else {
      toast.error(`${resp.data.message}`);

      setIsLoading(false);
    }
  };

  let navigate = useNavigate();
  const onPressSelectOperator = (data) => {
    console.log(data);
    const LocationInfo = { from: location.state.from, to: location.state.to };
    navigate("/SearchVehicleDetails", {
      state: {
        data: data,
        isAC: showAcPrice,
        totalDays: totalDays,
        tripType: tripType,
        operatorDetails: data,
        LocationInfo: LocationInfo,
      },
    });
  };

  //======= searhcard funtionality =================//
  const cityName = (address) => {
    const adminAreaTypes = [
      "administrative_area_level_3",
      "administrative_area_level_2",
      "administrative_area_level_1",
    ];
    let adminAreaLongName = "";

    for (let i = 0; i < address.length; i++) {
      if (adminAreaTypes.includes(address[i].types[0])) {
        adminAreaLongName = address[i].long_name;
        break;
      }
    }
    return adminAreaLongName;
  };

  const selectFromLocation = (data) => {
    const temp = data.address_components;
    let selectedToCityName = cityName(temp);
    setPickUpLocation(selectedToCityName);
  };

  const selectToDestination = (data) => {
    const temp = data.address_components;
    let selectedToCityName = cityName(temp);
    setDestinationLocation(selectedToCityName);
  };
  // ========================================================================= //
  const handleClick = async (e) => {
    e.preventDefault();

    if (!EditBodyData.from) {
      toast.error("fill data pickup");
      return;
    }

    if (!EditBodyData.passengerLimit) {
      toast.error("Add passenger");
      return;
    }
    if (!EditBodyData.fromDate) {
      toast.error("Add start date");
      return;
    }
    if (tripType === "local") {
      setIsLoading(true);
      const resp = await getLocalOperatorList(EditLocalBodyData);

      if (resp.statusCode === 200) {
        setOperatorList(resp.data);
        setIsLoading(false);
      } else {
        toast.error(`${resp.data.message}`);

        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
      const resp = await getOperatorList(EditBodyData);

      if (resp.statusCode === 200) {
        setOperatorList(resp.data);
        setIsLoading(false);
      } else {
        toast.error(`${resp.data.message}`);

        setIsLoading(false);
      }
    }
    setEditText(!editText);
  };
  function handleSelect(event) {
    setDiffInHours(parseInt(event.target.value));
  }

  const showEdit = () => {
    setEditText(!editText);
  };

  const showAcCarPrice = () => {
    setShowAcPrice(true);
  };
  const showNonAcCarPrice = () => {
    setShowAcPrice(false);
  };

  const acServiceCall = async () => {
    const resp = await getOperatorList(body);
    if (resp.statusCode === 200) {
      setOperatorList(resp.data);
      setIsLoading(false);
    } else {
      toast.error(`${resp.data.message}`);

      setIsLoading(false);
    }
    setDrop("AC");
  };
  const nonAcServiceCall = async () => {
    const resp = await getOperatorList({ ...body, isAcVehicle: false });
    if (resp.statusCode === 200) {
      setOperatorList(resp.data);
      setIsLoading(false);
    } else {
      toast.error(`${resp.data.message}`);

      setIsLoading(false);
    }
    setDrop("Non-AC");
  };

  const displayPrice = (item) => {
    if (tripType === "outStation") {
      return ((item?.bucketPrice * 10) / 100).toFixed();
    } else if (tripType === "local") {
      return showAcPrice
        ? ((item?.bucketPriceAC * 10) / 100).toFixed()
        : ((item?.bucketPrice * 10) / 100).toFixed();
    }
  };

  return (
    <div className="SEARCHCARD">
      <div className="QuatCard_main">
        <ToastContainer />

        {isLoading ? (
          <AppLoader />
        ) : (
          <div className="noData_page">
            <Header />
            <div className=" main-Searchdiv">
              {operatorList.length === 0 ? (
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
                  <div className="d-flex justify-content-end">
                    {!editText ? (
                      <button onClick={showEdit} className="searchCard_button">
                        Edit
                      </button>
                    ) : (
                      <button
                        onClick={handleClick}
                        className="searchCard_button"
                      >
                        Search
                      </button>
                    )}
                  </div>

                  {!editText ? (
                    <div className="static-details">
                      <div className="detail-places">
                        <p>
                          {pickUpLocation} to {destinationLocation}
                        </p>
                      </div>
                      <div className="detail-timings">
                        <div className="details">
                          <div className="numbers">
                            {startDate.toDateString()} to{" "}
                            {endDate.toDateString()}{" "}
                          </div>
                        </div>

                        <div className="details">
                          <div className="numbers">{passengers}</div> Passengers
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="searchDetails"
                      style={{ color: "#FFC107", fontFamily: "Montserrate" }}
                    >
                      {/* <h1 >{location.state.from} to {location.state.to} </h1> */}
                      {location.state.tripType === "local" ? (
                        <div className="searchCard_place">
                          <h1>
                            <ReactGoogleAutocomplete
                              apiKey={GOOGLE_MAPS_APIKEY}
                              placeholder={`${pickUpLocation}`}
                              onPlaceSelected={(place) => {
                                selectFromLocation(place);
                              }}
                              options={{
                                types: ["(regions)"],
                                componentRestrictions: { country: "in" },
                              }}
                              className="google-auto-complete"
                            />{" "}
                          </h1>
                        </div>
                      ) : (
                        <div className="searchCard_place">
                          <h1>
                            <ReactGoogleAutocomplete
                              apiKey={GOOGLE_MAPS_APIKEY}
                              placeholder={`${pickUpLocation}`}
                              onPlaceSelected={(place) => {
                                selectFromLocation(place);
                              }}
                              options={{
                                types: ["(regions)"],
                                componentRestrictions: { country: "in" },
                              }}
                              className="google-auto-complete"
                            />{" "}
                            to{" "}
                            <ReactGoogleAutocomplete
                              apiKey={GOOGLE_MAPS_APIKEY}
                              placeholder={`${destinationLocation}`}
                              onPlaceSelected={(place) => {
                                selectToDestination(place);
                              }}
                              options={{
                                types: ["(regions)"],
                                componentRestrictions: { country: "in" },
                              }}
                              className="google-auto-complete"
                            />
                          </h1>
                        </div>
                      )}

                      {/* <h4>{startFrom.toDateString()} - {endDate.toDateString()} , {location.state.noOfSeat} Passengers</h4> */}
                      <h4 className="searchCard_cal">
                        <div className="SC_Date">
                          <CustomDatePicker
                            selected={startDate}
                            placeholderText={`${startDate.toDateString()}`}
                            onChange={(date) => setStartDate(date)}
                            required
                          />
                        </div>{" "}
                        -
                        {location.state.tripType === "local" ? (
                          <select
                            id="my-dropdown"
                            value={diffInHours}
                            onChange={handleSelect}
                          >
                            <option value="4">4 hours 40 km</option>
                            <option value="8">8 hours 80 km</option>
                            <option value="12">12 hours 120 km</option>
                          </select>
                        ) : (
                          <div className="SC_Date">
                            <CustomDatePicker
                              selected={endDate}
                              placeholderText={`${endDate.toDateString()}`}
                              onChange={(date) => setEndDate(date)}
                              required
                            />
                          </div>
                        )}
                        <div className="searchCard_input">
                          <input
                            value={passengers}
                            onChange={(text) =>
                              setPassengers(text.target.value)
                            }
                            placeholder={`${passengers}`}
                            className="seats-input"
                            required
                          />
                          Passengers
                        </div>
                      </h4>
                      {operatorList[0].bucketPriceAC ? (
                        <h4> for {diffInHours} Hours</h4>
                      ) : (
                        <></>
                      )}
                    </div>
                  )}
                  {tripType === "outStation" && (
                    <div class="dropdown">
                      <button class="dropbtn">{drop} &#8595;</button>
                      <div class="dropdown-content">
                        <p onClick={acServiceCall}>AC</p>
                        <p onClick={nonAcServiceCall}>Non-AC</p>
                      </div>
                    </div>
                  )}

                  <div className="mainQuat">
                    {operatorList.map((item, index) => {
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
                                        <p className="toggleAc">
                                          <div
                                            className="ac-price"
                                            onClick={showAcCarPrice}
                                            style={
                                              showAcPrice
                                                ? { color: "#ffc107" }
                                                : { color: "grey" }
                                            }
                                          >
                                            <p>12-Seater - AC</p>
                                            <p className="numbers">
                                              ₹{item.bucketPriceAC}
                                            </p>
                                          </div>
                                          <div
                                            className="non-ac-price"
                                            onClick={showNonAcCarPrice}
                                            style={
                                              showAcPrice
                                                ? { color: "grey" }
                                                : { color: "#ffc107" }
                                            }
                                          >
                                            <p>12-Seater - Non-AC</p>
                                            <p className="numbers">
                                              ₹{item.bucketPrice}
                                            </p>
                                          </div>
                                        </p>
                                      ) : (
                                        <p className="kolimeters">
                                          {`₹${item?.perKmPrice} `}
                                          <b
                                            style={{
                                              color: "#FFFFFF",
                                              fontSize: "20px",
                                              fontWeight: "lighter",
                                            }}
                                          >
                                            /km -
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
                                            Seater{" "}
                                          </b>{" "}
                                        </p>
                                      )}

                                      {/* <h4 className="vehicle-model" >{`${item?.passengerLimit} Seater -  ${item?.type}`}</h4> */}
                                    </div>
                                  </div>
                                  {item.bucketPriceAC ? (
                                    <div></div>
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
                                      {item && displayPrice(item)}{" "}
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
          </div>
        )}
      </div>
      <div className="searchCard_footer">
        <Footer />
      </div>
    </div>
  );
};
export default SearchOperator;
