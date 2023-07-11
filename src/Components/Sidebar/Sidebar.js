import React, { useState } from "react";
import "./styles.css";
import { Container, Row, Col, Nav } from "react-bootstrap";
import Dashboard from "../../Pages/Dashboard";
import Schedule from "../../Pages/Schedule";
import Employee from "../../Pages/Employee";
import Department from "../../Pages/Department";
import tripprLogo from "../../Assets/png/new-logo.svg";
import calendar from "../../Assets/png/calendar.png";
import dashboard from "../../Assets/png/dashboard.png";
import department from "../../Assets/png/department.png";
import employee from "../../Assets/png/employee.png";
import settings from "../../Assets/png/settings.png";
import support from "../../Assets/png/support.png";
import Header from "../Header";

const SideBar = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const handleNavClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="sideBarContainer">
      <div className="sideBar">
        <Container fluid style={{ backgroundColor: "#fafafb" }}>
          <Row className="h-100" id="main_row">
            <Col id="colSidebar" sm={2} className="colSidebar">
              <div className="sidebar_mainHeader">
                <img
                  src={tripprLogo}
                  alt="Trippr.co.in"
                  style={{ width: "150px" }}
                />
              </div>
              <Nav defaultActiveKey="dashboard" className="flex-column">
                <Nav.Link
                  eventKey="dashboard"
                  onClick={() => handleNavClick("dashboard")}
                >
                  <img src={dashboard} alt="" /> Dashboard
                </Nav.Link>
                <Nav.Link
                  eventKey="about"
                  onClick={() => handleNavClick("Schedule")}
                >
                  <img src={calendar} alt="" /> Schedule
                </Nav.Link>
                <Nav.Link
                  eventKey="contact"
                  onClick={() => handleNavClick("Employee")}
                >
                  <img src={employee} alt="" />
                  Employee
                </Nav.Link>
                <Nav.Link
                  eventKey="contact"
                  onClick={() => handleNavClick("Department")}
                >
                  <img src={department} alt="" /> Department
                </Nav.Link>
                <Nav.Link
                  eventKey="dashboard"
                  onClick={() => handleNavClick("dashboard")}
                >
                  <img src={support} alt="" /> Support
                </Nav.Link>
                <Nav.Link
                  eventKey="about"
                  onClick={() => handleNavClick("Schedule")}
                >
                  <img src={settings} alt="" /> Settings
                </Nav.Link>
              </Nav>
              <div>
                <Header />
              </div>
            </Col>
            <Col id="colRightBar" sm={10} className="colRightBar">
              {currentPage === "dashboard" && <Dashboard />}
              {currentPage === "Schedule" && <Schedule />}
              {currentPage === "Employee" && <Employee />}
              {currentPage === "Department" && <Department />}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default SideBar;
