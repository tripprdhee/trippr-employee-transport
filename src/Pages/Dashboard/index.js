import React, { useState } from 'react'
import "../styles.css"
import CustomDatePicker from "../../Components/DatePicker";
import downArrow from "../../Assets/png/downArrow.png"

const Dashboard = () => {
  const [date, setDate] = useState()

  const dataArr = [
    { from: "KR Puram", to: "office", people: { men: 8, woman: 4 }, pickupTime: "9am" },
    { from: "Banashankari", to: "office", people: { men: 6, woman: 6 }, pickupTime: "9.30am" },
    { from: "Yellahanka", to: "office", people: { men: 5, woman: 6 }, pickupTime: "10am" }
  ]

  return (
    <div className='dashboard_container'>
      <div className='details_mainContainer'>
        <div className='upper_container'>
          <div className='upper_contents'>
            <p>Total Employees</p>
            <p id='content_number'>24</p>
          </div>
          <div className='upper_contents'>
            <p>No. of Shifts</p>
            <p id='content_number'>4</p>
            <p id='content_shift'>Shift Time Slots</p>
          </div>
          <div className='upper_contents'>
            <p>Route List</p>
            <p id='content_number'>3</p>
          </div>
        </div>
        <div className='lower_container'>
          <div className='lower_contents'>
            <p>Pick Up Schedules</p>
            <p id='content_number'>3</p>
            <p id='content_gender'>20 Men</p>
            <p id='content_gender'>12 Women</p>
          </div>
          <div className='lower_contents'>
            <p>Drop Schedules</p>
            <p id='content_number'>3</p>
            <p id='content_gender'>20 Men</p>
            <p id='content_gender'>12 Women</p>
          </div>
        </div>
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
              dataArr?.map((item,index) => {
                return (
                  <div className='content_para' key={index} >
                  <div>
                    <p>{item.from} to {item.to} {item.pickupTime}</p>
                    <p id='content_people'>{item.people.men}-Men {item.people.woman}-Woman</p>
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
        <div className='logout_container'>
          <div className='routes_header'>
            Route List - LogOut Shift
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
              dataArr?.map((item,index) => {
                return (
                  <div className='content_para'  key={index}>
                  <div>
                    <p>{item.from} to {item.to} {item.pickupTime}</p>
                    <p id='content_people'>{item.people.men}-Men {item.people.woman}-Woman</p>
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

export default Dashboard
