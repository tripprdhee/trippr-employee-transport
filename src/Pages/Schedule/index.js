import React, { useState } from 'react'
import "./style.css"
import DatePicker from "react-datepicker";
import downArrow from "../../Assets/png/downArrow.png"
import CustomDatePicker from '../../Components/DatePicker';

const Schedule = () => {
  const [date, setDate] = useState()
  const currentDate = new Date().toISOString().slice(0, 10); // Get the current date in "yyyy-mm-dd" format

  const [selectedDate, setSelectedDate] = useState(currentDate);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };


  const dataArr = [
    { employeeName: "Sagar", from: "KR Puram", people: { men: 8, woman: 4 }, pickupTime: "9am", emailId: "sagar@trippr.co.in", phoneNumber: "7891235463", coordinates: "btm" },
    { employeeName: "Sunny", from: "Banashankari", people: { men: 6, woman: 6 }, pickupTime: "9.30am", emailId: "sunny@trippr.co.in", phoneNumber: "7891235463", coordinates: "hsr" },
    { employeeName: "Tasneem", from: "Yellahanka", people: { men: 5, woman: 6 }, pickupTime: "10am", emailId: "tasneem@trippr.co.in", phoneNumber: "7891235463", coordinates: "mico" }
  ]

  return (
    <div className='dashboard_container'>
      <div className='dateContainer'>
        <input
          type="date"
          id="dateInput"
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
      <div className='shiftsAdd'>
        <h2>Add Shift</h2>
      </div>

      <div className='routes_container'>
        <div className='login_routes'>
          <div className='routes_header'>
            Route List - Login Shift
            <div className='routes_cal'>
              <CustomDatePicker
                selected={Date.now()}
                placeholderText={date}
                onChange={(date) => setDate(date)}
                required
              />
              <img src={downArrow} alt="" />
            </div>

          </div>
          <div className='routes_content'>
            {
              dataArr?.map((item, index) => {
                return (
                  <div className='content_para' key={index} >
                    <div>
                      <p>{item.employeeName} - {item.from} - {item.pickupTime}</p>
                      <p id='content_people'>{item.phoneNumber} ---- {item.emailId} ---- {item.coordinates} </p>
                    </div>
                  </div>
                )

              })
            }
          </div>
          <div>
            <p className='see_all'>See All</p>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Schedule
