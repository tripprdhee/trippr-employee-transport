import React, { useState, useEffect } from "react";
import "./style.css";
import { ToastContainer, toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import downArrow from "../../Assets/png/downArrow.png";
import { deleteScheduleBucket, getEmployeeList, getScheduleBucket } from "../../Api/employee";
import Loader from "../../Loader";

const Schedule = () => {
  const currentDate = new Date().toISOString().slice(0, 10); // Get the current date in "yyyy-mm-dd" format
  const [routeList, setRouteList] = useState([]);
  const [date, setDate] = useState();
  const [loading, setLoading] = useState(true);
  const [clickShift, setClickShift] = useState(1);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showEmploye, setShowEmploye] = useState(false);
  const [dataArr, setDataArr] = useState([]);
  const [bucket,setBucket] = useState({})

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
  //   // console.log(shift);
  // };

  const addToRoute = (item) => {
    // console.log("dataArr ======> ",dataArr)
    const filteredDataArr = dataArr.filter(e => e.employee._id !== item.employee._id);
    setDataArr(filteredDataArr)

    routeList.totalEmployees.push(item)
    // console.log("object =============> ",routeList)
  };

  const removeFromRoute = (item) => {
    const filteredDataArr = routeList?.totalEmployees?.filter((e) => e.employee.email !== item.employee.email)

    routeList.totalEmployees = filteredDataArr
    console.log("filteredDataArr ====> ", routeList)
    // setRouteList(filteredDataArr)
    setDataArr([...dataArr, item])

  };

  // useEffect(() => {
  //   totalSiftPresent()
  // }, [])
  // const totalSiftPresent = async () => {
  //   const response = await getScheduleBucket();
  //   console.log(response.data.length)
  //    response.data.map(e =>{console.log("object")})
  // }
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
    // console.log("filteredDataArr ===> ",shiftAllowtedList)

    const data = response.data.filter(e => e.slot === `${clickShift}`)
    if (data.length === 0) {
      setRouteList({})
      setLoading(false)
      return
    }

    setRouteList(data[0])
    const idsToRemove = shiftAllowtedList?.map(item => item.employee._id);

    // Filter out the dataArr with matching IDs
    const filteredDataArr = res.data.filter(item => !idsToRemove.includes(item._id));
    console.log("filteredDataArr ===> ", filteredDataArr)
    const arr = filteredDataArr.map((e) => {
      return {
        pickUpAddress: "",
        pickupTime: "",
        employee: e
      }
    });

    setDataArr(arr)


    setLoading(false)
  };





  const handleShiifts = (e) => {
    e.preventDefault()
    setClickShift(e.target.value)

  }
  const handleEdit = (e) => {
    e.preventDefault()
  }
  const handleDelete = async (e) => {
    e.preventDefault()
    setLoading(true)
    const response = await deleteScheduleBucket(routeList?._id)
    console.log(response)
    if (response.success === true) {
      setLoading(false)
      setRouteList({})
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
            <button onClick={handleEdit} id="submit_btn">SUBMIT</button>
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

              <input id="content_number" value={routeList?.loginTime} name="loginTime"/>
            </div>
            <div className="upper_contents">
              <p className="firstline">No. of Pickup</p>
              <p id="content_number">12</p>
            </div>
            <div className="upper_contents">
              <p className="firstline">LogOut Time</p>
              <p id="content_number">{routeList?.logOutTime}</p>
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
              <p id="content_number">12</p>
              <p id="content_gender">Select Loctions</p>
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
                            <input value={item.pickUpAddress} />
                          </div>
                          <div className="editableContent">
                            <label>Pick Up Time</label>
                            <input value={item.pickupTime} />
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
                            <input value={item.pickUpAddress} />
                          </div>
                          <div className="editableContent">
                            <label>Drop Time</label>
                            <input value={item.pickupTime} />
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
