import React, { useState, useEffect } from "react";
import "./style.css";
import DatePicker from "react-datepicker";
import downArrow from "../../Assets/png/downArrow.png";
import CustomDatePicker from "../../Components/DatePicker";
import { getEmployeeList } from "../../Api/employee";

const Schedule = () => {
  const [datalist, setDataList] = useState([]);
  const [date, setDate] = useState();
  const currentDate = new Date().toISOString().slice(0, 10); // Get the current date in "yyyy-mm-dd" format

  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [showEmploye, setShowEmploye] = useState(false);
  const [removedItems, setRemovedItems] = useState([]);
  const [dataArr, setDataArr] = useState([
    {
      name: "Sagar",
      address: {area:'kormangala', city: 'bengaluru', pincode:'1111' ,state:'karnataka'},
      createdAt: "2023-05-29T10:04:58.667Z",
      gender: 'male',
      
      pickupTime: "9am",
      email: "sagar@trippr.co.in",
      mobileNumber: "7891235463",
      
    },
    {
      name: "Sunny",
      address: {area:'whitefield', city: 'bengaluru', pincode:'1111' ,state:'karnataka'},
      createdAt: "2023-05-29T10:04:58.667Z",
      gender: 'male',
      
      pickupTime: "9.30am",
      email: "sunny@trippr.co.in",
      mobileNumber: "7891235463",
      
    },
    {
      name: "Tasneem",
      address: {area:'jayanagar', city: 'bengaluru', pincode:'1111' ,state:'karnataka'},
      createdAt: "2023-05-29T10:04:58.667Z",
      gender: 'male',
      
      pickupTime: "10am",
      email: "tasneem@trippr.co.in",
      mobileNumber: "7891235463",
      
    },
  ]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleshow = () => {
    setShowEmploye(!showEmploye);
    console.log("kk");
  };

  console.log(datalist);

  const [shift, setShift] = useState([1]);

  const add = () => {
    const temp = shift[shift.length - 1] + 1;
    setShift([...shift, temp]);
    console.log(shift);
  };

  const deleteFromDatalist = (itemname) => {
    setDataList(datalist.filter((item) => item !== itemname));
    const removedItem = datalist.find((item) => item === itemname);

    setDataArr([...dataArr, removedItem]);
  };
  console.log(datalist);

  const deleteFromDataArr = (itemname) => {
    setDataArr(dataArr.filter((item) => item !== itemname));
    setDataList([...datalist, itemname]);
  };

  // const dataArr = [
  //   { employeeName: "Sagar", from: "KR Puram", people: { men: 8, woman: 4 }, pickupTime: "9am", emailId: "sagar@trippr.co.in", phoneNumber: "7891235463", coordinates: "btm" },
  //   { employeeName: "Sunny", from: "Banashankari", people: { men: 6, woman: 6 }, pickupTime: "9.30am", emailId: "sunny@trippr.co.in", phoneNumber: "7891235463", coordinates: "hsr" },
  //   { employeeName: "Tasneem", from: "Yellahanka", people: { men: 5, woman: 6 }, pickupTime: "10am", emailId: "tasneem@trippr.co.in", phoneNumber: "7891235463", coordinates: "mico" }
  // ]
  useEffect(() => {
    getEmployeeData();
  }, []);

  const getEmployeeData = async () => {
    const res = await getEmployeeList();
    console.log(res);
    setDataList([...res.data]);
  };

  console.log(dataArr);

  const [dataArrItem, setDataArrItem] = useState([])


  const handleedit = () => {

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
            {/* <select name='employee' id='employee'>
            {
            // datalist.map((item,index) => {
            //   return(
            //     <option key={index}>

            //     <p>{item.name}<span>Add</span></p>
                
            //      </option>
            //   )
            // })
          }
            </select> */}
            <div className="clickhere">
            {/* <button className="employeelist" onClick={handleshow}>
              Select employe name for the shift
            </button>
            </div>
            <div className="main">
            {showEmploye &&
              datalist.map((item, index) => {
                return (
                  <div className="employezone">
                    <div className="employedata">
                    <p key={index}>
                      
                      Name : {item.name}<br/>
                      Email : {item.email}
                    </p>
                    </div>


                    <button onClick={() => deleteFromDatalist(item)}>
                      +
                    </button>
                  </div>
                );
              })} */}
              <div className="dropdown">
    <button onClick={() => setShowEmploye(!showEmploye)} className="dropbtn">Employee list &#8595;</button>
    <div className="dropdown-content" style={{display: showEmploye? 'block':'none'}}>
    {datalist.map((item,index) => {
    return (
      <div className="employedetails">
        <div className="right">
      <p>Name : {item.name}<br/>
      Email : {item.email}</p><br/>
      </div>
      <div className="left">
      <span onClick={() => deleteFromDatalist(item)}>+</span>
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
            
            {dataArr?.map((item, index) => {
              return (
                <div className="content_para" key={index}>
                  
                    <div className="upper">
                    <p>
                      {item.address.area} - {item.from} - {item.pickupTime}
                    </p>
                    <p id="content_people">
                      {item.mobile} ---- {item.email} ---- {item.coordinates}{" "}
                    </p>
                    </div>
                    <div className="lower">
                    <button
                      classname="minus"
                      onClick={() => deleteFromDataArr(item)}
                    >
                      -
                    </button>
                    <button >E</button>
                    </div>
                  
                </div>
              );
            })}
          </div>

          <div>
            <p className="see_all">See All</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
