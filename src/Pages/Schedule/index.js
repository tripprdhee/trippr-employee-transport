import React, { useState, useEffect } from "react";
import "./style.css";
import { ToastContainer, toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import downArrow from "../../Assets/png/downArrow.png";
import { addEditScheduleBucket, deleteScheduleBucket, getEmployeeList, getScheduleBucket } from "../../Api/employee";
import Loader from "../../Loader";

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
    const filteredDataArr = dataArr.filter(e => e.employee._id !== item.employee._id);
    setDataArr(filteredDataArr)
    routeList.totalEmployees.push(item)


    setFormData(routeList.totalEmployees)

  };

  const removeFromRoute = (item) => {
    const filteredDataArr = routeList?.totalEmployees?.filter((e) => e.employee.email !== item.employee.email)
    setFormData(filteredDataArr)
    setRouteList((e) => ({
      ...e,
      totalEmployees: filteredDataArr
    }))
    setDataArr([...dataArr, item])

  };

  useEffect(() => {
    setLoading(true)
    getSheduleAndEmployeeData()
  }, [clickShift]);

  const getSheduleAndEmployeeData = async () => {
    const res = await getEmployeeList();
    const response = await getScheduleBucket();
    const shiftAllowtedList = []
    response.data.forEach((item) => {
      shiftAllowtedList.push(...item.totalEmployees)
    })

    const data = response.data.filter(e => e.slot === `${clickShift}`)
    if (data.length === 0) {
      const obj = {
        slot: null,
        loginTime: null,
        logOutTime: null,
        noOfPickup: null,
        pickupPoint: null,
        date: null,
        totalEmployees: []
      }
      setRouteList(obj)
      setLoading(false)
      return
    }

    setRouteList(data[0])
    setFormData([...data[0]?.totalEmployees])


    const idsToRemove = shiftAllowtedList?.map(item => item.employee._id);

    // Filter out the dataArr with matching IDs
    const filteredDataArr = res.data.filter(item => !idsToRemove.includes(item._id));
    const arr = filteredDataArr.map((e) => {
      return {
        pickUpAddress: null,
        dropAddress: null,
        pickupTime: null,
        employee: e
      }
    });

    setDataArr(arr)


    setLoading(false)
  };
  // console.log("routeList ==========> ", formData)

  const handleShiifts = (e) => {
    e.preventDefault()
    setClickShift(e.target.value)
    setShift(e.target.value)
  }
  const handleEdit = () => {

  }

  const handleChange = (time) => {
    setRouteList((prevRouteList) => ({
      ...prevRouteList,
      loginTime: time,
    }));

  }
  const handleLogOutChange = (time) => {
    setRouteList((prevRouteList) => ({
      ...prevRouteList,
      logOutTime: time,
    }));

  }
  const handlePickupAddressChange = (id, value) => {
    const updatedEmployees = [...formData];
    updatedEmployees.forEach((item) => {
      if (item.employee._id === id) {
        item.pickUpAddress = value
      }
    })
    setRouteList((e) => ({
      ...e,
      totalEmployees: updatedEmployees
    }))
  };
  const handlePickupTimeChange = (id, value) => {
    const updatedEmployees = [...formData];
    updatedEmployees.forEach((item) => {
      if (item.employee._id === id) {
        item.pickupTime = value
      }
    })
    setRouteList((e) => ({
      ...e,
      totalEmployees: updatedEmployees
    }))
  };
  const handleDropTimeChange = (id, value) => {
    const updatedEmployees = [...formData];
    updatedEmployees.forEach((item) => {
      if (item.employee._id === id) {
        item.dropTime = value
      }
    })
    setRouteList((e) => ({
      ...e,
      totalEmployees: updatedEmployees
    }))
  };
  const handleDropAddressChange = (id, value) => {
    const updatedEmployees = [...formData];
    updatedEmployees.forEach((item) => {
      if (item.employee._id === id) {
        item.dropAddress = value
        return
      }
    })
    setRouteList((e) => ({
      ...e,
      totalEmployees: updatedEmployees
    }))
  };


  const handleSubmit = async (e) => {
    e.preventDefault()
    const obj = {
      loginTime: routeList.loginTime,
      logOutTime: routeList.logOutTime,
      date: selectedDate,
      slot: shift,
      noOfPickup: routeList.noOfPickup,
      pickupPoint: routeList.pickupPoint,
      totalEmployees: routeList.totalEmployees
    }
    if (!obj.loginTime) {
      toast.error("missing login time,try again")
      return
    }
    if (!obj.noOfPickup) {
      toast.error("missing no Of Pickup,try again")
      return
    }
    if (!obj.logOutTime) {
      toast.error("missing logOut Time,try again")
      return
    }
    if (!obj.date) {
      toast.error("missing date,try again")
      return
    }
    if (!obj.slot) {
      toast.error("missing slot,try again")
      return
    }
    if (!obj.pickupPoint) {
      toast.error("missing pickup Point,try again")
      return
    }
    if (obj.totalEmployees.length === 0) {
      toast.error("Add Employees")
      return
    } else {
      let valid = true
      obj.totalEmployees.map((e) => {
        if (!e.pickupTime) {
          toast.error("missing pickup Time,try again")
          valid = false
          return
        }
        if (!e.dropTime) {
          toast.error("missing drop Time,try again")
          valid = false
          return
        }
        if (!e.pickUpAddress) {
          toast.error("missing pick Up Address,try again")
          valid = false
          return
        }
        if (!e.dropAddress) {
          toast.error("missing drop Addresst,try again")
          valid = false
          return
        }
      })
      if(!valid) return
    }
    console.log(obj)

    const resp = await addEditScheduleBucket(obj)
    if (resp.success !== true) {
      toast.error("Try Again")
    } else {
      toast.success("SuccessFull")
    }

  }

  const handleDelete = async (e) => {
    e.preventDefault()
    setLoading(true)
    if(!routeList._id){
      toast.error("Nothing to Delete")
    setLoading(false)

    }
    const response = await deleteScheduleBucket(routeList?._id)
    if (response.success === true) {
      setLoading(false)
      const obj = {
        slot: null,
        loginTime: null,
        logOutTime: null,
        noOfPickup: null,
        pickupPoint: null,
        date: null,
        totalEmployees: []
      }
      setRouteList(obj)
      toast.success(response.message)
    } else {
      setLoading(false)
      toast.error("Something went wrong , Try again")
    }
  }
  return (
    <>
      {
        loading && <Loader />
      }
      <div className="dashboard_container">
        <ToastContainer />
        <div className="dateContainer">
          <input
            type="date"
            id="dateInput"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
        <div className="shiftsAdd">
          <h2>Add Shift</h2>
          <div className="btn_div">
            <button onClick={handleSubmit} id="submit_btn">SUBMIT</button>
            <button onClick={handleDelete} style={{ fontSize: "20px" }} className='far' id="delte_btn">&#xf2ed;</button>
          </div>
        </div>
        <div className="slots">
          <select name="shift" id="shift" onChange={handleShiifts}>
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
        <div className="details_mainContainer">
          <div className="upper_container">
            <div className="upper_contents">
              <p className="first-line">Login Time</p>

              <DatePicker
                placeholderText={new Date(routeList.loginTime).toLocaleTimeString([], { timeStyle: 'short' })}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={5}
                timeCaption="Time"
                dateFormat="h:mm aa"
                id="content_number" onChange={handleChange} />
            </div>
            <div className="upper_contents">
              <p className="firstline">No. of Pickup</p>
              <input type="number" id="content_number" value={routeList?.noOfPickup} onChange={(e) => {
                setRouteList((prev) => ({
                  ...prev,
                  noOfPickup: e.target.value
                }))
              }} />
            </div>
            <div className="upper_contents">
              <p className="firstline">LogOut Time</p>
              <DatePicker
                id="content_number"
                placeholderText={new Date(routeList.logOutTime).toLocaleTimeString([], { timeStyle: 'short' })}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={5}
                timeCaption="Time"
                dateFormat="h:mm aa"
                onChange={handleLogOutChange} />
            </div>
          </div>
          <div className="lower_container">
            <div className="lower_contents">
              <p className="firstline">Employee List</p>
              <div className="clickhere">

                <div className="dropdown">
                  <button onClick={handleshow} className="dropbtn">Employee list &#9660;</button>
                  <div className="dropdown-content" style={{ display: showEmploye ? 'block' : 'none' }}>

                    {dataArr?.map((item, index) => {
                      return (
                        <div className="employedetails" key={index}>
                          <div className="right">
                            <p>Name : {item.employee.name}<br />
                              Email : {item.employee.email}</p>
                          </div>
                          <div className="left">
                            <span onClick={() => addToRoute(item)}>+</span>
                          </div>
                        </div>

                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
            <div className="lower_contents">
              <p className="firstline">Pickup Point</p>
              <input type="number" id="content_number" value={routeList?.pickupPoint} onChange={(e) => {
                setRouteList((prev) => ({
                  ...prev,
                  pickupPoint: e.target.value
                }))
              }} />
            </div>
          </div>
        </div>

        <div className="routes_container">
          <div className="login_routes">
            <div className="routes_header">
              Route List - Login Shift
            </div>
            <div className="routes_content">

              {
                routeList?.totalEmployees?.map((item, index) => {
                  return (
                    <div className="content_para" key={index}>

                      <div className="upper">
                        <div className="editableDiv">
                          {item.employee.name.toUpperCase()} --
                          <div className="editableContent">
                            <label>Pick Up Address</label>
                            <input value={item.pickUpAddress} onChange={(e) => handlePickupAddressChange(item.employee._id, e.target.value)} />
                          </div>
                          <div className="editableContent">
                            <label>Pick Up Time</label>
                            <DatePicker
                              placeholderText={new Date(item.pickupTime).toLocaleTimeString([], { timeStyle: 'short' })}
                              showTimeSelect
                              showTimeSelectOnly
                              timeIntervals={5}
                              timeCaption="Time"
                              dateFormat="h:mm aa"
                              onChange={(e) => handlePickupTimeChange(item.employee._id, e)}
                            />
                          </div>

                        </div>
                        <p id="content_people">
                          {item.employee.mobileNumber} ---- {item.employee.email} ---- {item.employee.address.area}{" "}
                        </p>
                      </div>
                      <div className="lower">
                        <button onClick={() => removeFromRoute(item)} id="minusBtn" className='far'>&#8722;</button>
                        <button onClick={() => handleEdit(item)} style={{ fontSize: "20px", width: "fit-content" }} className='far'>&#xf044;</button>
                      </div>

                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="routes_container">
          <div className="login_routes">
            <div className="routes_header">
              Route List - LogOut Shift
            </div>
            <div className="routes_content">

              {
                routeList?.totalEmployees?.map((item, index) => {
                  return (
                    <div className="content_para" key={index}>

                      <div className="upper">
                        <div className="editableDiv">
                          {item.employee.name.toUpperCase()} --
                          <div className="editableContent">
                            <label>Drop Address</label>
                            <input value={item.dropAddress} name="dropAddress" onChange={(e) => handleDropAddressChange(item.employee._id, e.target.value)} />
                          </div>
                          <div className="editableContent">
                            <label>Drop Time</label>
                            <DatePicker placeholderText={new Date(item.dropTime).toLocaleTimeString([], { timeStyle: 'short' })}
                              showTimeSelect
                              showTimeSelectOnly
                              timeIntervals={5}
                              timeCaption="Time"
                              dateFormat="h:mm aa"
                              onChange={(e) => handleDropTimeChange(item.employee._id, e)}

                            />
                          </div>

                        </div>
                        <p id="content_people">
                          {item.employee.mobileNumber} ---- {item.employee.email} ---- {item.employee.address.area}{" "}
                        </p>
                      </div>
                      <div className="lower">
                        <button onClick={() => removeFromRoute(item)} id="minusBtn" className='far'>&#8722;</button>
                        <button onClick={() => handleEdit(item)} style={{ fontSize: "20px", width: "fit-content" }} className='far'>&#xf044;</button>
                      </div>

                    </div>
                  );
                })}
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