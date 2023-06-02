import React, { useState, useEffect } from "react";
import "./style.css";
import DatePicker from "react-datepicker";
import downArrow from "../../Assets/png/downArrow.png";
import CustomDatePicker from "../../Components/DatePicker";
import { getEmployeeList, getScheduleBucket } from "../../Api/employee";

const Schedule = () => {
  const [routeList, setRouteList] = useState([]);
  const [scheduleBucket, setScheduleBucket] = useState();
  const [date, setDate] = useState();
  const currentDate = new Date().toISOString().slice(0, 10); // Get the current date in "yyyy-mm-dd" format

  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showEmploye, setShowEmploye] = useState(false);
  const [removedItems, setRemovedItems] = useState([]);
  const [dataArr, setDataArr] = useState([]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleshow = () => {
    setShowEmploye(!showEmploye);
  };


  const [shift, setShift] = useState([1]);

  const add = () => {
    const temp = shift[shift.length - 1] + 1;
    setShift([...shift, temp]);
    // console.log(shift);
  };

  const addToRoute = (item) => {

    const filteredDataArr = dataArr.filter(e => e._id !== item._id);
    setDataArr(filteredDataArr)
    const obj = {
      pickUpAddress: item?.employee?.pickUpAddress,
      pickupTime: item?.employee?.pickupTime,
      employee: item
    }
    setRouteList([...routeList, obj])

  };

  const removeFromRoute = (item) => {
    const filteredDataArr = routeList.filter((e) => e.employee.email !== item.employee.email)
    setRouteList(filteredDataArr)
    setDataArr([...dataArr, item])

  };

  useEffect(() => {
    getSheduleAndEmployeeData()
  }, []);

  const getSheduleAndEmployeeData = async () => {
    const res = await getEmployeeList();
    const resonse = await getScheduleBucket();
    const { data } = await resonse
    setRouteList(data.totalEmployees)
    const idsToRemove = data?.totalEmployees?.map(item => item.employee._id);

    // Filter out the dataArr with matching IDs
    const filteredDataArr = res.data.filter(item => !idsToRemove.includes(item._id));

    setDataArr(filteredDataArr);
  };





  const handleEdit = () => {

  }
  return (
    <div className="dashboard_container">
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
      </div>
      <div className="slots">
        <select name="shift" id="shift">
          {shift.map((item, index) => {
            return <option key={index}>shift {item}</option>;
          })}
        </select>
        <button onClick={add}>+</button>
      </div>
      <div className="details_mainContainer">
        <div className="upper_container">
          <div className="upper_contents">
            <p class="first-line">Login Time</p>
            <p id="content_number">9:00 am</p>
          </div>
          <div className="upper_contents">
            <p className="firstline">No. of Pickup</p>
            <p id="content_number">12</p>
            <p id="content_shift">Shift Time Slots</p>
          </div>
          <div className="upper_contents">
            <p className="firstline">LogOut Time</p>
            <p id="content_number">6:00 pm</p>
          </div>
        </div>
        <div className="lower_container">
          <div className="lower_contents">
            <p className="firstline">Employee List</p>
            <div className="clickhere">

              <div className="dropdown">
                <button onClick={handleshow} className="dropbtn">Employee list &#8595;</button>
                <div className="dropdown-content" style={{ display: showEmploye ? 'block' : 'none' }}>
                  {dataArr.map((item, index) => {
                    return (
                      <div className="employedetails" key={index}>
                        <div className="right">
                          <p>Name : {item.name ? item.name : item.employee.name }<br />
                            Email : {item.email ? item.email : item.employee.email}</p>
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
            <div className="routes_cal">
              <CustomDatePicker
                selected={Date.now()}
                placeholderText={date}
                onChange={(date) => setDate(date)}
                required
              />
              <img src={downArrow} alt="" />
            </div>
          </div>
          <div className="routes_content">

            {
              routeList?.map((item, index) => {
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
    </div>
  );
};

export default Schedule;
