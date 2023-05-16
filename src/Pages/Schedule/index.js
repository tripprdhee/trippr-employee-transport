import React, { useState } from 'react'
import "../styles.css"
import CustomDatePicker from "../../Components/DatePicker";
import downArrow from "../../Assets/png/downArrow.png"

const Schedule = () => {
  const [date, setDate] = useState()

  const dataArr = [
    {employeeName:"Sagar", from: "KR Puram",  people: { men: 8, woman: 4 }, pickupTime: "9am" , emailId:"sagar@trippr.co.in",phoneNumber:"7891235463",coordinates:"btm"},
    {employeeName:"Sunny", from: "Banashankari", people: { men: 6, woman: 6 }, pickupTime: "9.30am" , emailId:"sunny@trippr.co.in",phoneNumber:"7891235463",coordinates:"hsr"},
    { employeeName:"Tasneem",from: "Yellahanka", people: { men: 5, woman: 6 }, pickupTime: "10am" , emailId:"tasneem@trippr.co.in",phoneNumber:"7891235463",coordinates:"mico"}
  ]

  return (
    <div className='dashboard_container'>
      <div className='details_mainContainer'>
        <div className='upper_container'>
          <div className='upper_contents'>
            <p>Login Time</p>
            <p id='content_number'>9 AM</p>
          </div>
          <div className='upper_contents'>
            <p>No. of Pick-Up</p>
            <p id='content_number'>12</p>
            <p id='content_shift'>Shift Time Slots</p>
          </div>
          <div className='upper_contents'>
            <p>First Pick-Up Time</p>
            <p id='content_number'>6:30 AM</p>
          </div>
        </div>
        <div className='lower_container'>
          <div className='lower_contents'>
            <p>Pick Up Schedules</p>
            <p id='content_number'>12</p>
            <p id='content_gender'>10 Men</p>
            <p id='content_gender'>2 Women</p>
          </div>
          <div className='lower_contents'>
            <p>Pick-Up Point</p>
            <p id='content_number'>3</p>
            <p id='content_gender'>Select Locations</p>
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
                    <p>{item.employeeName} - {item.from} - {item.pickupTime}</p>
                    <p id='content_people'>{item.phoneNumber} ---- {item.emailId} ---- {item.coordinates} </p>
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
                    <p>{item.from} to {item.to} {item.pickupTime}</p>
                    <p id='content_people'>{item.people.men}-Men {item.people.woman}-Woman</p>
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
