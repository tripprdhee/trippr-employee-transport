import React, { useEffect, useState } from "react";
import "../styles.css";
import Loader from "../../Loader";
import { getDashboardBucket, getEmployeeList } from "../../Api/employee";
import { toast } from "react-toastify";
import EmployeeIcon from "../../Assets/png/employees-icon.svg";
import TimeIcon from "../../Assets/png/time-icon.svg";
import RoutesIcon from "../../Assets/png/routes-icon.svg";
import CarIcon from "../../Assets/png/car-icon.png";

const Dashboard = () => {
  const [showMore, setShowMore] = useState(false);
  const currentDate = new Date().toISOString().slice(0, 10); // Get the current date in "yyyy-mm-dd" format
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [bucket, setBucket] = useState();
  const [totalEmployee, setTotalEmployee] = useState([]);
  const renderedList = showMore ? totalEmployee : totalEmployee.slice(0, 2);
  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  useEffect(() => {
    fetchBucket(selectedDate);
  }, [selectedDate]);

  const fetchBucket = async (date) => {
    setLoading(true);
    const res = await getDashboardBucket({ date: date }).catch((e) => {
      setLoading(false);
    });

    if (res.totalEmployees) {
      setBucket(res);
    }
    const arr = [];
    res.details.forEach((e) => {
      arr.push(...e.totalEmployees);
    });
    setTotalEmployee([...arr]);
    setLoading(false);
  };
  const handleClick = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="dashboard_container" style={{ paddingBottom: "250px" }}>
      <div className="dateContainer my-4">
        <input
          type="date"
          id="dateInput"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      {loading && <Loader />}
      <div className="details_mainContainer">
        <div className="dashboard_upper_container">
          <div className="upper_contents">
            <img src={EmployeeIcon} alt="" />
            <div className="create_schedule_block">
              <p
                id="content_number"
                style={{ fontWeight: "700", fontSize: "16px" }}
              >
                {bucket?.totalEmployees}
              </p>
              <p style={{ fontWeight: "500" }}>Total Employees</p>
            </div>
          </div>
          <div className="upper_contents">
            <img src={TimeIcon} alt="" />
            <div className="create_schedule_block">
              <p
                id="content_number"
                style={{ fontWeight: "700", fontSize: "16px" }}
              >
                {bucket?.noOfShifts}
              </p>
              <p style={{ fontWeight: "500" }}>No. of Shifts</p>
            </div>
          </div>
          <div className="upper_contents">
            <img src={RoutesIcon} alt="" />
            <div className="create_schedule_block">
              <p
                id="content_number"
                style={{ fontWeight: "700", fontSize: "16px" }}
              >
                {bucket?.routeList}
              </p>
              <p style={{ fontWeight: "500" }}>Route List</p>
            </div>
          </div>
          <div className="upper_contents">
            <img src={CarIcon} alt="" />
            <div className="create_schedule_block">
              <div className="dashboard_info_block">
                <p
                  id="content_number"
                  style={{ fontWeight: "700", fontSize: "16px" }}
                >
                  {bucket?.routeList}
                </p>
              </div>
              <p style={{ fontWeight: "500" }}>Pick Up Schedules</p>
              <div className="box_wrapper">
                <div className="box">
                  <p>Men {bucket?.men}</p>
                  <p>Woman {bucket?.women}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="upper_contents">
            <img src={CarIcon} alt="" />
            <div className="create_schedule_block">
              <div className="dashboard_info_block">
                <p
                  id="content_number"
                  style={{ fontWeight: "700", fontSize: "16px" }}
                >
                  {bucket?.routeList}
                </p>
              </div>
              <p style={{ fontWeight: "500" }}>Drop Schedules</p>
              <div className="box_wrapper">
                <div className="box">
                  <p>Men {bucket?.men}</p>
                  <p>Woman {bucket?.women}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="routes_container">
        <div className="login_routes">
          <div className="routes_header">Route List - Login Shift</div>
          <div className="routes_content">
            {renderedList?.map((item, index) => {
              return (
                <div className="content_para" key={index}>
                  <div className="upper">
                    <div className="editableDiv">
                      <div className="editableContent" style={{ width: "12%" }}>
                        <p className="user-info">{item.employee.name[0]}</p>
                        <span>{item.employee.name.split(" ")[0]}</span>
                      </div>
                      <div className="editableContent">
                        <p>{item.pickUpAddress.slice(0, 20)}...</p>
                      </div>
                      <div className="editableContent">
                        <p>
                          {new Date(item.pickupTime).toLocaleTimeString([], {
                            timeStyle: "short",
                          })}
                        </p>
                      </div>
                      <div className="editableContent">
                        {item.employee.mobileNumber}
                      </div>
                      <div className="editableContent">
                        {item.employee.email}
                      </div>
                      <div className="editableContent">
                        {item.employee.address.area.slice(0, 20)}...
                      </div>
                    </div>
                  </div>
                  <div className="box_wrapper" style={{ width: "40%" }}>
                    <div className="box">
                      <p>Name : {item.employee.name}</p>,
                      <p>Contact Number : {item.employee.mobileNumber}</p>,
                      <p>Email : {item.employee.email}</p>,
                      <p>Pickup Address : {item.pickUpAddress}</p>,
                      <p>Residential Address : {item.employee.address.area}</p>,
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="seeMore">
            {/* <p className='see_all'>See All</p> */}
            {totalEmployee.length > 2 && (
              <button onClick={handleClick}>
                {showMore ? "See Less" : "See More"}
              </button>
            )}
          </div>
        </div>
        <div className="login_routes">
          <div className="routes_header">Route List - LogOut Shift</div>
          <div className="routes_content">
            {renderedList?.map((item, index) => {
              return (
                <div className="content_para" key={index}>
                  <div className="upper">
                    <div className="editableDiv">
                      <div className="editableContent" style={{ width: "12%" }}>
                        <p className="user-info">{item.employee.name[0]}</p>
                        <span>{item.employee.name.split(" ")[0]}</span>
                      </div>
                      <div className="editableContent" style={{ width: "20%" }}>
                        <p>{item.dropAddress.slice(0, 20)}...</p>
                      </div>
                      <div className="editableContent">
                        <p>
                          {new Date(item.dropTime).toLocaleTimeString([], {
                            timeStyle: "short",
                          })}
                        </p>
                      </div>
                      <div className="editableContent">
                        {item.employee.mobileNumber}
                      </div>
                      <div className="editableContent">
                        {item.employee.email}
                      </div>
                      <div className="editableContent">
                        {item.employee.address.area.slice(0, 20)}...
                      </div>
                    </div>
                  </div>
                  <div className="box_wrapper" style={{ width: "40%" }}>
                    <div className="box">
                      <p>Name : {item.employee.name}</p>,
                      <p>Contact Number : {item.employee.mobileNumber}</p>,
                      <p>Email : {item.employee.email}</p>,
                      <p>Drop Address : {item.dropAddress}</p>
                      <p>Residential Address : {item.employee.address.area}</p>,
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="seeMore">
            {/* <p className='see_all'>See All</p> */}
            {totalEmployee.length > 2 && (
              <button onClick={handleClick}>
                {showMore ? "See Less" : "See More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
