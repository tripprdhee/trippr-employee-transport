import React, { useState, useEffect } from "react";
import "./style.css";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  addEditScheduleBucket,
  deleteScheduleBucket,
  getEmployeeList,
  getScheduleBucket,
} from "../../Api/employee";
import Loader from "../../Loader";
import moment from "moment";
import ClockYellowImage from "../../Assets/png/clock-yellow-icon.png";
import CarImage from "../../Assets/png/car-icon.png";
import ClockRedImage from "../../Assets/png/clock-red-icon.png";

const Schedule = () => {
  const currentDate = new Date().toISOString().slice(0, 10); // Get the current date in "yyyy-mm-dd" format
  const [routeList, setRouteList] = useState({});
  const [loading, setLoading] = useState(true);
  const [clickShift, setClickShift] = useState(1);
  const [shift, setShift] = useState("1");
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showEmploye, setShowEmploye] = useState(false);
  const [dataArr, setDataArr] = useState([]);
  const [formData, setFormData] = useState([]);

  const [addSchedule, setAddSchedule] = useState(false);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleshow = () => {
    setShowEmploye(!showEmploye);
  };

  // const [shift, setShift] = useState([1]);

  // const add = () => {
  //   const temp = shift[shift.length - 1] + 1;
  //   setShift([...shift, temp]);
  // };

  const addToRoute = (item) => {
    const filteredDataArr = dataArr.filter(
      (e) => e.employee._id !== item.employee._id
    );
    setDataArr(filteredDataArr);
    routeList.totalEmployees.push(item);

    setFormData(routeList.totalEmployees);
  };

  const removeFromRoute = (item) => {
    const filteredDataArr = routeList?.totalEmployees?.filter(
      (e) => e.employee.email !== item.employee.email
    );
    setFormData(filteredDataArr);
    setRouteList((e) => ({
      ...e,
      totalEmployees: filteredDataArr,
    }));
    setDataArr([...dataArr, item]);
  };

  useEffect(() => {
    setLoading(true);
    getSheduleAndEmployeeData(selectedDate);
  }, [clickShift, selectedDate]);

  const getSheduleAndEmployeeData = async (scheduleDate) => {
    const res = await getEmployeeList();
    const resp = await getScheduleBucket();

    const response = await resp.data.filter((e) => {
      const momentDate1 = moment(e.date, moment.ISO_8601, true);
      const momentDate2 = moment(scheduleDate, moment.ISO_8601, true);
      const formattedDate1 = momentDate1.format("YYYY-MM-DD");
      const formattedDate2 = momentDate2.format("YYYY-MM-DD");

      return formattedDate1 === formattedDate2;
    });
    if (response.length === 0) {
      console.log(res);
      const arr = res.data.map((e) => {
        return {
          pickUpAddress: null,
          dropAddress: null,
          pickupTime: null,
          employee: e,
        };
      });
      setDataArr(arr);
      const obj = {
        slot: null,
        loginTime: null,
        logOutTime: null,
        noOfPickup: null,
        pickupPoint: null,
        date: null,
        totalEmployees: [],
      };
      setRouteList(obj);
      setLoading(false);
      return;
    }

    const shiftAllowtedList = [];
    await response.forEach((item) => {
      shiftAllowtedList.push(...item.totalEmployees);
    });
    const data = await response.filter((e) => e.slot === `${clickShift}`);
    if (data.length === 0) {
      const obj = {
        slot: null,
        loginTime: null,
        logOutTime: null,
        noOfPickup: null,
        pickupPoint: null,
        date: null,
        totalEmployees: [],
      };
      const idsToRemove = shiftAllowtedList?.map((item) => item.employee._id);
      // console.log("idsToRemove",idsToRemove)
      const filteredDataArr = res.data.filter(
        (item) => !idsToRemove.includes(item._id)
      );
      const arr = filteredDataArr.map((e) => {
        return {
          pickUpAddress: null,
          dropAddress: null,
          pickupTime: null,
          employee: e,
        };
      });

      setDataArr(arr);
      setRouteList(obj);
      setLoading(false);
      return;
    }

    setRouteList(data[0]);
    setFormData([...data[0]?.totalEmployees]);

    const idsToRemove = shiftAllowtedList?.map((item) => item.employee._id);

    // Filter out the dataArr with matching IDs
    const filteredDataArr = res.data.filter(
      (item) => !idsToRemove.includes(item._id)
    );

    const arr = filteredDataArr.map((e) => {
      return {
        pickUpAddress: null,
        dropAddress: null,
        pickupTime: null,
        employee: e,
      };
    });

    setDataArr(arr);

    setLoading(false);
  };
  // console.log("routeList ==========> ", formData)

  const handleShiifts = (e) => {
    e.preventDefault();
    setClickShift(e.target.value);
    setShift(e.target.value);
  };
  const handleEdit = () => {};

  const handleChange = (time) => {
    setRouteList((prevRouteList) => ({
      ...prevRouteList,
      loginTime: time,
    }));
  };
  const handleLogOutChange = (time) => {
    setRouteList((prevRouteList) => ({
      ...prevRouteList,
      logOutTime: time,
    }));
  };
  const handlePickupAddressChange = (id, value) => {
    const updatedEmployees = [...formData];
    updatedEmployees.forEach((item) => {
      if (item.employee._id === id) {
        item.pickUpAddress = value;
      }
    });
    setRouteList((e) => ({
      ...e,
      totalEmployees: updatedEmployees,
    }));
  };
  const handlePickupTimeChange = (id, value) => {
    const updatedEmployees = [...formData];
    updatedEmployees.forEach((item) => {
      if (item.employee._id === id) {
        item.pickupTime = value;
      }
    });
    setRouteList((e) => ({
      ...e,
      totalEmployees: updatedEmployees,
    }));
  };
  const handleDropTimeChange = (id, value) => {
    const updatedEmployees = [...formData];
    updatedEmployees.forEach((item) => {
      if (item.employee._id === id) {
        item.dropTime = value;
      }
    });
    setRouteList((e) => ({
      ...e,
      totalEmployees: updatedEmployees,
    }));
  };
  const handleDropAddressChange = (id, value) => {
    const updatedEmployees = [...formData];
    updatedEmployees.forEach((item) => {
      if (item.employee._id === id) {
        item.dropAddress = value;
        return;
      }
    });
    setRouteList((e) => ({
      ...e,
      totalEmployees: updatedEmployees,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const obj = {
      loginTime: routeList.loginTime,
      logOutTime: routeList.logOutTime,
      date: selectedDate,
      slot: shift,
      noOfPickup: routeList.noOfPickup,
      pickupPoint: routeList.pickupPoint,
      totalEmployees: routeList.totalEmployees,
    };
    if (!obj.loginTime) {
      toast.error("missing login time,try again");
      return;
    }
    if (!obj.noOfPickup) {
      toast.error("missing no Of Pickup,try again");
      return;
    }
    if (!obj.logOutTime) {
      toast.error("missing logOut Time,try again");
      return;
    }
    if (!obj.date) {
      toast.error("missing date,try again");
      return;
    }
    if (!obj.slot) {
      toast.error("missing slot,try again");
      return;
    }
    if (!obj.pickupPoint) {
      toast.error("missing pickup Point,try again");
      return;
    }
    if (obj.totalEmployees.length === 0) {
      toast.error("Add Employees");
      return;
    } else {
      let valid = true;
      obj.totalEmployees.map((e) => {
        if (!e.pickupTime) {
          toast.error("missing pickup Time,try again");
          valid = false;
          return;
        }
        if (!e.dropTime) {
          toast.error("missing drop Time,try again");
          valid = false;
          return;
        }
        if (!e.pickUpAddress) {
          toast.error("missing pick Up Address,try again");
          valid = false;
          return;
        }
        if (!e.dropAddress) {
          toast.error("missing drop Addresst,try again");
          valid = false;
          return;
        }
      });
      if (!valid) return;
    }
    console.log(obj);

    const resp = await addEditScheduleBucket(obj);
    if (resp) {
      if (resp.success !== true) {
        toast.success("SuccessFull");
        setLoading(false);
      }
    }
    setLoading(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!routeList._id) {
      toast.error("Nothing to Delete");
      setLoading(false);
    }
    const response = await deleteScheduleBucket(routeList?._id);
    if (response.success === true) {
      setLoading(false);
      const obj = {
        slot: null,
        loginTime: null,
        logOutTime: null,
        noOfPickup: null,
        pickupPoint: null,
        date: null,
        totalEmployees: [],
      };
      setRouteList(obj);
      toast.success(response.message);
    } else {
      setLoading(false);
      toast.error("Something went wrong , Try again");
    }
    setLoading(false);
  };

  // {loading && <Loader />}

  return (
    <>
      <div className="dashboard_container" style={{ paddingBottom: "250px" }}>
        <ToastContainer />
        <h2>Schedule List</h2>
        <div className="dateContainer">
          <input
            type="date"
            id="dateInput"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
        <button
          className="create_schedule_button"
          onClick={() => setAddSchedule(!addSchedule)}
          style={addSchedule ? { backgroundColor: "#b50000c7" } : {}}
        >
          {addSchedule ? "Cancel" : "+ Create Schedule"}
        </button>
        <div className="schedule_container">
          {addSchedule && (
            <div className="create_schedule_container">
              <div className="details_mainContainer">
                <div className="upper_container">
                  <div className="upper_contents">
                    <img src={ClockRedImage} alt="" />
                    <div className="create_schedule_block">
                      <p className="first-line">Shift</p>

                      <div className="slots">
                        <select
                          name="shift"
                          id="shift"
                          onChange={handleShiifts}
                        >
                          {/* {shift.map((item, index) => {
              return <option key={index} value={item}>shift {item}</option>;
            })} */}
                          <option value="1">shift 1</option>
                          <option value="2">shift 2</option>
                          <option value="3">shift 3</option>
                          <option value="4">shift 4</option>
                          <option value="5">shift 5</option>
                          <option value="6">shift 6</option>
                        </select>
                        {/* <button onClick={add}>+</button> */}
                      </div>
                    </div>
                  </div>
                  <div className="upper_contents">
                    <img src={ClockYellowImage} alt="" />
                    <div className="create_schedule_block">
                      <p className="first-line">Login Time</p>

                      <DatePicker
                        placeholderText={new Date(
                          routeList.loginTime
                        ).toLocaleTimeString([], { timeStyle: "short" })}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={5}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        id="content_number"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="upper_contents">
                    <img src={CarImage} alt="" />
                    <div className="create_schedule_block">
                      <p className="firstline">No. of Pickup</p>
                      <input
                        type="number"
                        id="content_number"
                        placeholder="Number"
                        value={routeList?.noOfPickup}
                        onChange={(e) => {
                          setRouteList((prev) => ({
                            ...prev,
                            noOfPickup: e.target.value,
                          }));
                        }}
                      />
                    </div>
                  </div>
                  <div className="upper_contents">
                    <img src={ClockRedImage} alt="" />

                    <div className="create_schedule_block">
                      <p className="firstline">LogOut Time</p>
                      <DatePicker
                        id="content_number"
                        placeholderText={new Date(
                          routeList.logOutTime
                        ).toLocaleTimeString([], { timeStyle: "short" })}
                        showTimeSelect
                        showTimeSelectOnly
                        timeIntervals={5}
                        timeCaption="Time"
                        dateFormat="h:mm aa"
                        onChange={handleLogOutChange}
                      />
                    </div>
                  </div>
                  <div className="upper_contents">
                    <img src={CarImage} alt="" />

                    <div className="create_schedule_block">
                      <p className="firstline">Pickup Point</p>
                      <input
                        type="number"
                        id="content_number"
                        placeholder="Pickup Points"
                        value={routeList?.pickupPoint}
                        onChange={(e) => {
                          setRouteList((prev) => ({
                            ...prev,
                            pickupPoint: e.target.value,
                          }));
                        }}
                      />
                    </div>
                  </div>
                  <div className="upper_contents">
                    <img src={CarImage} alt="" />
                    <div className="create_schedule_block">
                      <p className="firstline">Employee List</p>
                      <div className="clickhere">
                        <div className="dropdown">
                          <button onClick={handleshow} className="dropbtn">
                            Employee list &#9660;
                          </button>
                          <div
                            className="dropdown-content"
                            style={{ display: showEmploye ? "block" : "none" }}
                          >
                            {dataArr?.map((item, index) => {
                              return (
                                <div className="employedetails" key={index}>
                                  <span
                                    className="user-info"
                                    style={{
                                      paddingBottom: "2px",
                                      fontWeight: "600",
                                    }}
                                  >
                                    {item.employee.name[0]}
                                  </span>
                                  <div className="right">
                                    <p>
                                      {item.employee.name}
                                      <br />
                                      {item.employee.email}
                                    </p>
                                  </div>
                                  <div className="left">
                                    <span onClick={() => addToRoute(item)}>
                                      +
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="shiftsAdd">
                <div className="btn_div">
                  <button onClick={handleSubmit} id="submit_btn">
                    SUBMIT
                  </button>
                  <button
                    onClick={handleDelete}
                    style={{ fontSize: "20px" }}
                    className="far"
                    id="delte_btn"
                  >
                    &#xf2ed;
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="schedule_routes">
            <div className="routes_container">
              <div className="login_routes">
                <div className="routes_header">
                  <p>Route List - Login Shift</p>
                </div>
                <div className="routes_content">
                  {routeList?.totalEmployees?.map((item, index) => {
                    return (
                      <div className="content_para" key={index}>
                        <div className="upper">
                          <div className="editableDiv">
                            <div
                              className="editableContent"
                              style={{ width: "12%" }}
                            >
                              {item.employee.name.split(" ")[0]}
                            </div>
                            <div
                              className="editableContent"
                              style={{ width: "20%" }}
                            >
                              <input
                                value={item.pickUpAddress}
                                placeholder="Pickup Address"
                                onChange={(e) =>
                                  handlePickupAddressChange(
                                    item.employee._id,
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div
                              className="editableContent"
                              style={{ width: "20%" }}
                            >
                              <DatePicker
                                placeholderText={new Date(
                                  item.pickupTime
                                ).toLocaleTimeString([], {
                                  timeStyle: "short",
                                })}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={5}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                onChange={(e) =>
                                  handlePickupTimeChange(item.employee._id, e)
                                }
                              />
                            </div>
                            <div className="editableContent">
                              {item.employee.mobileNumber}
                            </div>
                            {/* <div className="editableContent">
                              {item.employee.email}
                            </div> */}
                            <div className="editableContent">
                              {item.employee.address.area.slice(0, 20)}...
                            </div>
                            <button
                              onClick={() => removeFromRoute(item)}
                              id="minusBtn"
                              className="far"
                            >
                              &#xf2ed;
                            </button>
                          </div>
                        </div>
                        <div className="box_wrapper" style={{ width: "40%" }}>
                          <div className="box">
                            <p>Name : {item.employee.name}</p>,
                            <p>Contact Number : {item.employee.mobileNumber}</p>
                            ,<p>Email : {item.employee.email}</p>,
                            <p>
                              Residential Address : {item.employee.address.area}
                            </p>
                            ,
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="routes_container">
              <div className="login_routes">
                <div className="routes_header">Route List - LogOut Shift</div>
                <div className="routes_content">
                  {routeList?.totalEmployees?.map((item, index) => {
                    return (
                      <div className="content_para" key={index}>
                        <div className="upper">
                          <div className="editableDiv">
                            <div
                              className="editableContent"
                              style={{ width: "12%" }}
                            >
                              {item.employee.name.split(" ")[0]}
                            </div>
                            <div
                              className="editableContent"
                              style={{ width: "20%" }}
                            >
                              <input
                                value={item.dropAddress}
                                name="dropAddress"
                                placeholder="Drop Address"
                                onChange={(e) =>
                                  handleDropAddressChange(
                                    item.employee._id,
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div
                              className="editableContent"
                              style={{ width: "20%" }}
                            >
                              <DatePicker
                                placeholderText={new Date(
                                  item.dropTime
                                ).toLocaleTimeString([], {
                                  timeStyle: "short",
                                })}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={5}
                                timeCaption="Time"
                                dateFormat="h:mm aa"
                                onChange={(e) =>
                                  handleDropTimeChange(item.employee._id, e)
                                }
                              />
                            </div>
                            <div className="editableContent">
                              {item.employee.mobileNumber}
                            </div>

                            <div className="editableContent">
                              {item.employee.address.area.slice(0, 20)}...
                            </div>
                            <div className="lower">
                              <button
                                onClick={() => removeFromRoute(item)}
                                id="minusBtn"
                                className="far"
                              >
                                &#xf2ed;
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="box_wrapper" style={{ width: "40%" }}>
                          <div className="box">
                            <p>Name : {item.employee.name}</p>,
                            <p>Contact Number : {item.employee.mobileNumber}</p>
                            ,<p>Email : {item.employee.email}</p>,
                            <p>
                              Residential Address : {item.employee.address.area}
                            </p>
                            ,
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Schedule;
// const dateTime = new Date(routeList.loginTime);
// const timeOnly = dateTime.toLocaleTimeString([], { timeStyle: 'short' });
// console.log(timeOnly);
