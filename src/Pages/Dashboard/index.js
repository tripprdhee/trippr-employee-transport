import React, { useEffect, useState } from 'react'
import "../styles.css"
import Loader from "../../Loader";
import { getDashboardBucket, getEmployeeList } from '../../Api/employee';

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
    fetchBucket(selectedDate)
  }, [selectedDate]);

  const fetchBucket = async (date) => {
    setLoading(true)
    const res = await getDashboardBucket({ date: date })
    if (res.totalEmployees) {
      setBucket(res)
    }
    const arr = []
    res.details.forEach((e) => {
      arr.push(...e.totalEmployees)
    })
setTotalEmployee([...arr])
    setLoading(false)
  }
  const handleClick = () => {
    setShowMore(!showMore);
  };
  
  return (
    <div className='dashboard_container'>
    <div className="dateContainer my-4">
          <input
            type="date"
            id="dateInput"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>
      {
        loading && <Loader />
      }
      <div className='details_mainContainer'>
        <div className='upper_container'>
          <div className='upper_contents'>
            <p>Total Employees</p>
            <p id='content_number'>{bucket?.totalEmployees}</p>
          </div>
          <div className='upper_contents'>
            <p>No. of Shifts</p>
            <p id='content_number'>{bucket?.noOfShifts}</p>
          </div>
          <div className='upper_contents'>
            <p>Route List</p>
            <p id='content_number'>{bucket?.routeList}</p>
          </div>
        </div>
        <div className='lower_container'>
          <div className='lower_contents'>
            <p>Pick Up Schedules</p>
            <p id='content_number'>{bucket?.routeList}</p>
            <p id='content_gender'>Men {bucket?.men}</p>
            <p id='content_gender'>Woman {bucket?.women}</p>
          </div>
          <div className='lower_contents'>
            <p>Drop Schedules</p>
            <p id='content_number'>{bucket?.routeList}</p>
            <p id='content_gender'>Men {bucket?.men}</p>
            <p id='content_gender'>Woman {bucket?.women}</p>
          </div>
        </div>
      </div>


      <div className='routes_container'>
        <div className='login_routes'>
          <div className='routes_header'>
            Route List - Login Shift
          </div>
          <div className='routes_content'>
            {
              renderedList?.map((item, index) => {
                return (
                  <div className="content_para" key={index}>

                    <div className="upper">
                      <div className="editableDiv">
                      <div className="editableContent">
                            <label>Employee</label>
                            {item.employee.name.toUpperCase()}
                          </div>
                        <div className="editableContent">
                          <label>Pick Up Address</label>
                          <p>{item.pickUpAddress}</p>
                        </div>
                        <div className="editableContent">
                          <label>Pick Up Time</label>
                          <p>{ new Date(item.pickupTime).toLocaleTimeString([], { timeStyle: 'short' })}</p>
                        </div>

                      </div>
                      <div className="editableDiv">
                        <div className="editableContent">
                            <label>Mobile Number</label>
                            {item.employee.mobileNumber}
                          </div>
                        <div className="editableContent">
                            <label>Email</label>
                            {item.employee.email}
                          </div>
                        <div className="editableContent">
                            <label>Recidential Area</label>
                            {item.employee.address.area}
                          </div>
                        </div>
                    </div>
                  </div>
                )

              })
            }
          </div>
          <div className='seeMore' >
            {/* <p className='see_all'>See All</p> */}
            {totalEmployee.length > 2 && (
              <button onClick={handleClick}>
                {showMore ? 'See Less' : 'See More'}
              </button>
            )}
          </div>
        </div>
        <div className='logout_container'>
          <div className='routes_header'>
            Route List - LogOut Shift
          </div>
          <div className='routes_content'>
          {
              renderedList?.map((item, index) => {
                return (
                  <div className="content_para" key={index}>

                    <div className="upper">
                      <div className="editableDiv">
                      <div className="editableContent">
                            <label>Employee</label>
                            {item.employee.name.toUpperCase()}
                          </div>
                        <div className="editableContent">
                          <label>Drop Address</label>
                          <p>{item.dropAddress}</p>
                        </div>
                        <div className="editableContent">
                          <label>Drop Time</label>
                          <p>{ new Date(item.dropTime).toLocaleTimeString([], { timeStyle: 'short' })}</p>
                        </div>

                      </div>
                      <div className="editableDiv">
                        <div className="editableContent">
                            <label>Mobile Number</label>
                            {item.employee.mobileNumber}
                          </div>
                        <div className="editableContent">
                            <label>Email</label>
                            {item.employee.email}
                          </div>
                        <div className="editableContent">
                            <label>Recidential Area</label>
                            {item.employee.address.area}
                          </div>
                        </div>
                    </div>
                  </div>
                )

              })
            }
          </div>
          <div className='seeMore' >
            {/* <p className='see_all'>See All</p> */}
            {totalEmployee.length > 2 && (
              <button onClick={handleClick}>
                {showMore ? 'See Less' : 'See More'}
              </button>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard
