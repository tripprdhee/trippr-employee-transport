import React, { useEffect, useState } from 'react'
import "../styles.css"
import CustomDatePicker from "../../Components/DatePicker";
import downArrow from "../../Assets/png/downArrow.png"
import { ToastContainer, toast } from 'react-toastify';
import { addEmployee, getEmployeeList } from '../../Api/employee';


const Employee = () => {
  const [date, setDate] = useState()
  const [showMore, setShowMore] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [employeeName, setEmployeeName] = useState();
  const [emailId, setEmailId] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const [pickUpPoint, setPickUpPoint] = useState();
  const [gender, setGender] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [area, setArea] = useState();
  const [pincode, setPincode] = useState();
  const [editEmployeeList, setEditEmployeeList] = useState();

  useState(async () => {
    const res = await getEmployeeList()
    setDataList([...res.data])
  }, [dataList])


  const handleSubmit = async (e) => {
    e.preventDefault()
    const emplyeeData = {
      name: employeeName,
      email: emailId,
      mobileNumber: phoneNumber,
      address: {
        area: area,
        city: city,
        state: state,
        pincode: pincode,
      },
      coordinates: pickUpPoint,
      gender: gender,
    }

    if (!emplyeeData.name) {
      toast.error("fill Employee Name");
      return;
    }
    if (!emplyeeData.mobileNumber) {
      toast.error("fill mobileNumber");
      return;
    }
    if (!(/^[0-9]{10}$/).test(emplyeeData.mobileNumber)) {
      toast.error("Enter Valid Number");
      return;
    }
    if (!emplyeeData.email) {
      toast.error("fill email");
      return;
    }
    if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(emplyeeData.email)) {
      toast.error("Enter valid email");
      return;
    }

    if (!emplyeeData.address.area) {
      toast.error("fill area");
      return;
    }
    if (!emplyeeData.address.city) {
      toast.error("fill city");
      return;
    }
    if (!emplyeeData.address.state) {
      toast.error("fill state");
      return;
    }
    if (!emplyeeData.address.pincode) {
      toast.error("fill pincode");
      return;
    }
    if (!emplyeeData.coordinates) {
      toast.error("fill pickUpPoint");
      return;
    }
    if (!emplyeeData.gender) {
      toast.error("fill gender");
      return;
    }
if(editEmployeeList?.id){
  const resp = await addEmployee(editEmployeeList)
console.log(resp)
    if (resp && resp.statusCode === 200) {
      toast.success(resp.message)
    } else {
      toast.error(resp.message)
    }
}
    const resp = await addEmployee(emplyeeData)

    if (resp && resp.statusCode === 200) {
      toast.success(resp.message)
    } else {
      toast.error(resp.message)
    }

  }

  const handleEdit = (employee) =>{
    setEditEmployeeList({
      id: employee._id,
      name: employee.name,
      email: employee.email,
      mobileNumber: employee.mobileNumber,
      address: {
        area: employee.address.area,
        city: employee.address.city,
        state: employee.address.state,
        pincode: employee.address.pincode,
      },
      coordinates: employee.coordinates,
      gender: employee.gender,
    });
  }
  // console.log(editEmployeeList?.address)

  const renderedList = showMore ? dataList : dataList.slice(0, 3);

  const handleClick = () => {
    setShowMore(!showMore);
  };

  return (
    <div className='dashboard_container'>
      <ToastContainer />
      <div className='details_mainContainer'>
        <div className='upper_container'>
          <div className='upper_contents'>
            <p>Employee Name</p>
            <input
              onChange={(e) => setEmployeeName(e.target.value)}
              placeholder={editEmployeeList?.name ? `${editEmployeeList.name}` : 'Enter the Name'}
            />
          </div>
          <div className='upper_contents'>
            <p>Contact Number</p>
            <input
              onChange={(e) => setPhoneNumber(e.target.value)}
              type="tel"
              placeholder={editEmployeeList?.mobileNumber ? `${editEmployeeList.mobileNumber}` :'Enter phone number'}
            />
          </div>
          <div className='upper_contents'>
            <p>Email ID</p>
            <input
              onChange={(e) => setEmailId(e.target.value)}
              placeholder={editEmployeeList?.email ? `${editEmployeeList.email}` :'Enter the mail Id'}
            />
          </div>
        </div>
        <div className='lower_container'>
          <div className='lower_contents'>
            <p>Residential Address</p>
            <input
              onChange={(e) => setArea(e.target.value)}
              placeholder={editEmployeeList?.address?.area ? `${editEmployeeList.address.area}` :'Enter the Area'}
            />
            <input
              onChange={(e) => setCity(e.target.value)}
              placeholder={editEmployeeList?.address?.city ? `${editEmployeeList.address.city}` :'Enter the city'}
            />
            <input
              onChange={(e) => setState(e.target.value)}
              placeholder={editEmployeeList?.address?.state ? `${editEmployeeList.address.state}` :'Enter the state'}
            />
            <input
              onChange={(e) => setPincode(e.target.value)}
              type="text" pattern="[0-9]{6}"
              placeholder={editEmployeeList?.address?.pincode ? `${editEmployeeList.address.pincode}` :'Enter the pincode'}
            />
          </div>
          <div className='lower_contents'>
            <p>Pick-Up Point Address</p>
            <input
              onChange={(e) => setPickUpPoint(e.target.value)}
              placeholder={editEmployeeList?.coordinates ? `${editEmployeeList.coordinates}` :'Enter the Pickup Area'}
            />
          </div>
        </div>
        <div className='d-flex justify-content-center'>
          <div className='genderInput'>
            <p>Gender</p>
            <input
              onChange={(e) => setGender(e.target.value)}
              placeholder={editEmployeeList?.gender ? `${editEmployeeList.gender}` :'Enter Gender'}
            />
          </div>
        </div>
        <div className='submitForm'>
          <button onClick={handleSubmit}>ADD</button>
        </div>
      </div>


      <div className='routes_container'>
        <div className='login_routes'>
          <div className='routes_header'>
            Employee List
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
              renderedList?.map((item, index) => {
                return (
                  <div className='content_para' key={index} >
                    <div>
                      <p>{item.name} - {item.mobileNumber} - {item.email}</p>
                      <p id='content_people'>{item.address.area}  ---- {item.coordinates} </p>
                    </div>
                    <div>
                      <button onClick={() => handleEdit(item)}>{editEmployeeList?.id ? "Update" : "Add"}</button>
                    </div>
                  </div>
                )

              })
            }
          </div>
          <div className='seeMore' >
            {/* <p className='see_all'>See All</p> */}
            {dataList.length > 3 && (
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

export default Employee
