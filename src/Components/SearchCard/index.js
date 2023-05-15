import React, { useState } from "react";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import { GOOGLE_MAPS_APIKEY } from "../../Config";
// import { SVG } from "../../Helpers/svgFiles";
import CustomDatePicker from "../DatePicker";
import "./styles.css";
// import user from "../../Assets/icon/users.png";
import user from "../../Assets/icon/user.png";
import calender from "../../Assets/icon/calender.png";

const SearchCard = (props) => {
  const [fromLocation, setFromLocation] = useState("Enter a Location");
  const [selectedValue, setSelectedValue] = useState();
  console.log("seachcard props ====> ", props);
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

    setFromLocation(selectedToCityName);
    props.setPickUpLocation(selectedToCityName);
    if (props.tripType === "local") {
      props.setDestinationLocation(selectedToCityName);
    }
  };

  const selectDestination = (data) => {
    const temp = data.address_components;
    let selectedToCityName = temp.filter((item, index) => {
      return item.types[0] === "administrative_level_3"
        ? "administrative_level_3"
        : "administrative_level_2"
        ? "administrative_level_2"
        : "administrative_level_1";
    });
    // setToLocation(selectedToCityName[0].long_name)

    props.setDestinationLocation(selectedToCityName[0].long_name);
  };
  function handleSelect(event) {
    setSelectedValue(event.target.value);
    props.setNoOfHours(parseInt(event.target.value));
  }
  return (
    <div className="container d-flex ">
      <div className="search-card-container">
        <div className="trip-type-container">
          <div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={
              props.tripType === "outStation" ? "trip-type-active" : "trip-type"
            }
            onClick={() => props.setTripType("outStation")}
          >
            <h5 className="trip-type-title">Outstation Cab,TT & Bus Rental</h5>
          </div>
          <div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={
              props.tripType === "local" ? "trip-type-active" : "trip-type"
            }
            onClick={() => props.setTripType("local")}
          >
            <h5 className="trip-type-title">Local Car,TT & Bus Rental</h5>
          </div>
          <div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={
              props.tripType === "airport" ? "trip-type-active" : "trip-type"
            }
            onClick={() => props.setTripType("airport")}
          >
            <h5 className="trip-type-title">Airport Cab,TT & Bus Rental</h5>
          </div>
        </div>
        <div className="input-container">
          <div className="left-input ">
            <div className="calender-container mx-3">
              <h5 className="location-title">PickUp Location</h5>
              <ReactGoogleAutocomplete
                apiKey={GOOGLE_MAPS_APIKEY}
                onPlaceSelected={(place) => {
                  selectFromLocation(place);
                }}
                options={{
                  types: ["(regions)"],
                  componentRestrictions: { country: "in" },
                }}
                className="google-auto-complete"
              />
            </div>
            <div className="calender-container">
              <h5 className="location-title">Destination</h5>

              {props.tripType === "local" ? (
                <h5 id="destinationHead">{`${fromLocation}`}</h5>
              ) : (
                <ReactGoogleAutocomplete
                  apiKey={GOOGLE_MAPS_APIKEY}
                  onPlaceSelected={(place) => {
                    selectDestination(place);
                  }}
                  options={{
                    types: ["(regions)"],
                    componentRestrictions: { country: "in" },
                  }}
                  className="google-auto-complete"
                />
              )}
            </div>
          </div>

          <div className="right-input">
            <div className="calender">
              <div>
                <img style={{ width: "25px" }} src={user} alt="" />
              </div>
              <div className="fillDiv">
                {/* <h5 className="location-title">Enter No of Passengers</h5> */}
                <input
                  value={props.noOfSeat}
                  onChange={(text) => props.setNoOfSeat(text.target.value)}
                  placeholder="Enter No of Passengers"
                  className="seats-input"
                  required
                />
              </div>
            </div>

            <div className="containers d-flex flex-row align-items-center datediv">
              <div>
                <img
                  style={{ width: "20px", height: "20px" }}
                  src={calender}
                  className="calender-icon"
                  alt="calendardays"
                />
              </div>
              <div className="date-input">
                <div className="calender-container">
                  {/* <h6 className="placeholder-text">Start Date & Time</h6> */}
                  <div className="calender-item">
                    <CustomDatePicker
                      selected={props.startDate}
                      placeholderText={"Enter Start Date & Time"}
                      onChange={(date) => props.setStartDate(date)}
                      required
                    />
                  </div>
                </div>

                <div className="calender-container">
                  {/* <h6 className="placeholder-text">End Date & Time</h6> */}
                  <div className="calender-item">
                    {props.tripType === "local" ? (
                      <select
                        id="my-dropdown"
                        value={selectedValue}
                        onChange={handleSelect}
                      >
                        <option value="4">4 hours 40 km</option>
                        <option value="8">8 hours 80 km</option>
                        <option value="12">12 hours 120 km</option>
                      </select>
                    ) : (
                      <CustomDatePicker
                        selected={props.endDate}
                        placeholderText={"Enter End Date & Time"}
                        onChange={(date) => props.setEndDate(date)}
                        required
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="explore-btn trip-type-active"
            onClick={props.OnSubmit}
          >
            <h5 className="trip-type-title">BOOK NOW</h5>
          </div>
        </div>
        {/* <div className="disDiv">
            <h1 style={{color:"#FFC107"}}>GET <b style={{color:"white" ,fontFamily:"Montserrat"}}>₹1500</b> OFF BOOK YOUR NEXT  TRIP NOW*</h1>
        </div> */}
      </div>
    </div>
  );
};
export default SearchCard;
