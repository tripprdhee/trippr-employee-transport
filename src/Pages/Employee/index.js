import React, { useEffect, useState } from "react";
import "../styles.css";
import { ToastContainer, toast } from "react-toastify";
import {
  addEmployee,
  deleteEmployeeList,
  editEmployee,
  getEmployeeList,
} from "../../Api/employee";
import PhoneIcon from "../../Assets/png/phone-icon.svg";
import MailIcon from "../../Assets/png/mail-icon.svg";

const Employee = () => {
  const [showMore, setShowMore] = useState(false);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [EmployeeList, setEmployeeList] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    area: "",
    city: "",
    state: "",
    pincode: "",
    coordinates: "",
    gender: "",
  });

  useEffect(() => {
    getEmployeeData();
  }, []);

  const getEmployeeData = async () => {
    const res = await getEmployeeList();
    console.log(res);
    setDataList([...res.data]);
  };
  // console.log(EmployeeList)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emplyeeData = {
      id: EmployeeList?.id,
      name: EmployeeList.name,
      email: EmployeeList.email,
      mobileNumber: EmployeeList.mobileNumber,
      address: {
        area: EmployeeList.area,
        city: EmployeeList.city,
        state: EmployeeList.state,
        pincode: EmployeeList.pincode,
      },
      coordinates: EmployeeList.coordinates,
      gender: EmployeeList.gender,
    };

    if (!emplyeeData.name) {
      toast.error("fill Employee Name");
      return;
    }
    if (!emplyeeData.mobileNumber) {
      toast.error("fill mobileNumber");
      return;
    }
    if (!/^[0-9]{10}$/.test(emplyeeData.mobileNumber)) {
      toast.error("Enter Valid Number");
      return;
    }
    if (!emplyeeData.email) {
      toast.error("fill email");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emplyeeData.email)) {
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
    if (EmployeeList?.id) {
      const resp = await editEmployee(emplyeeData);
      if (resp && resp.statusCode === 200) {
        if (resp.data) {
          const res = await getEmployeeList();
          setDataList([...res.data]);
          setEmployeeList({
            name: "",
            email: "",
            mobileNumber: "",
            area: "",
            city: "",
            state: "",
            pincode: "",
            coordinates: "",
            gender: "",
          });
          toast.success(resp.message);
          setShowAddEmployee(false);
        } else {
          toast.error(resp.message);
        }
      } else {
        toast.error(resp.message);
      }
      return;
    }
    const resp = await addEmployee(emplyeeData);
    // console.log(resp)
    if (resp && resp.statusCode === 200) {
      if (resp.data) {
        const res = await getEmployeeList();
        setDataList([...res.data]);
        toast.success(resp.message);
        setShowAddEmployee(false);

        setEmployeeList({
          name: "",
          email: "",
          mobileNumber: "",
          area: "",
          city: "",
          state: "",
          pincode: "",
          coordinates: "",
          gender: "",
        });
        console.log(dataList);
      } else {
        toast.error(resp.message);
      }
    } else {
      toast.error(resp.message);
    }
  };

  const handleEdit = (employee) => {
    setShowAddEmployee(true);
    setEmployeeList({
      id: employee._id,
      name: employee.name,
      email: employee.email,
      mobileNumber: employee.mobileNumber,
      area: employee.address.area,
      city: employee.address.city,
      state: employee.address.state,
      pincode: employee.address.pincode,
      coordinates: employee.coordinates,
      gender: employee.gender,
    });
  };

  const handleDelete = async (employeeId) => {
    const response = await deleteEmployeeList(employeeId);
    if (response.message) {
      const res = await getEmployeeList();
      setDataList([...res.data]);
      toast.success(response.message);
    }
  };
  // console.log(editEmployeeList?.address)

  const renderedList = showMore ? dataList : dataList.slice(0, 5);

  const handleClick = () => {
    setShowMore(!showMore);
  };
  const onChange = (e) => {
    setEmployeeList({ ...EmployeeList, [e.target.name]: e.target.value });
  };

  console.log(dataList.length);

  return (
    <div className="dashboard_container">
      <ToastContainer />
      <div className="title_container_dashboard">
        <h2>Employee List</h2>
        <button onClick={() => setShowAddEmployee(true)}> + Add New</button>
      </div>
      {showAddEmployee && (
        <div className="details_mainContainer">
          <div className="employee_upper_container">
            <div className="employee_upper_contents">
              <p>Employee Name/ID</p>
              <input
                name="name"
                value={EmployeeList.name}
                onChange={onChange}
                placeholder="Enter the Name/ID"
              />
            </div>
            <div className="employee_upper_contents">
              <p>Gender</p>
              <input
                name="gender"
                value={EmployeeList.gender}
                onChange={onChange}
                placeholder="Enter Gender"
              />
            </div>
            <div className="employee_upper_contents">
              <p>Contact Number</p>
              <input
                type="tel"
                name="mobileNumber"
                value={EmployeeList.mobileNumber}
                onChange={onChange}
                placeholder="Enter phone number"
              />
            </div>
            <div className="employee_upper_contents">
              <p>Email ID</p>
              <input
                name="email"
                value={EmployeeList.email}
                onChange={onChange}
                placeholder="Enter the mail Id"
              />
            </div>

            <div className="employee_upper_contents">
              <p>Area</p>
              <input
                name="area"
                value={EmployeeList.area}
                onChange={onChange}
                placeholder="Enter the Area"
              />
            </div>
            <div className="employee_upper_contents">
              <p>City</p>
              <input
                name="city"
                value={EmployeeList.city}
                onChange={onChange}
                placeholder="Enter the city"
              />
            </div>
            <div className="employee_upper_contents">
              <p>State</p>
              <input
                name="state"
                value={EmployeeList.state}
                onChange={onChange}
                placeholder="Enter the state"
              />
            </div>
            <div className="employee_upper_contents">
              <p>Pincode</p>
              <input
                name="pincode"
                value={EmployeeList.pincode}
                onChange={onChange}
                type="text"
                pattern="[0-9]{6}"
                placeholder="Enter the pincode"
              />
            </div>
            <div className="employee_upper_contents">
              <p>Pick-Up Point Address</p>
              <input
                name="coordinates"
                value={EmployeeList.coordinates}
                onChange={onChange}
                placeholder="Enter the Pickup Area"
              />
            </div>
          </div>
          <div className="lower_container"></div>
          <div className="submitForm">
            <button onClick={handleSubmit}>
              {EmployeeList?.id ? "Update" : "Add"}
            </button>
            <button
              onClick={() => {
                setShowAddEmployee(false);
              }}
              style={{ marginLeft: "16px" }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="routes_container">
        <div className="login_routes">
          <div className="routes_content">
            {renderedList?.map((item, index) => {
              return (
                <div className="content_para" key={index}>
                  <div className="employee_list_item">
                    <p className="user-info">{item.name[0]}</p>
                    <p style={{ width: "10%" }}>{item.name.split(" ")[0]} </p>
                    <p>
                      <img src={PhoneIcon} alt="" /> {item.mobileNumber}
                    </p>
                    <p>
                      <img src={MailIcon} alt="" /> {item.email}
                    </p>
                    <p id="content_people">
                      {item.address.area.split("").slice(0, 20).join("")}...
                    </p>
                    <p id="content_people">
                      {item.coordinates.split("").slice(0, 20).join("")}...
                    </p>
                    <div style={{ width: "4%", display: "flex" }}>
                      <button
                        onClick={() => handleEdit(item)}
                        style={{ fontSize: "16px" }}
                        className="far"
                      >
                        &#xf044;
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        style={{ fontSize: "16px" }}
                        className="far"
                      >
                        &#xf2ed;
                      </button>
                    </div>
                  </div>
                  <div className="box_wrapper">
                    <div className="box">
                      <p>Name : {item.name}</p>,
                      <p>Contact Number : {item.mobileNumber}</p>,
                      <p>Email : {item.email}</p>,
                      <p>Residential Address : {item.address.area}</p>,
                      <p>Pick Up Address : {item.coordinates}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="seeMore">
            {/* <p className='see_all'>See All</p> */}
            {dataList.length > 5 && (
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

export default Employee;
