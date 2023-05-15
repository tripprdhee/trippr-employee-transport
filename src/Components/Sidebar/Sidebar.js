import React, { useState } from 'react';
import "./styles.css"
import { Container, Row, Col, Nav } from 'react-bootstrap';
import Dashboard from '../../Pages/Dashboard';
import Schedule from '../../Pages/Schedule';
import Employee from '../../Pages/Employee';
import Department from '../../Pages/Department';
import tripprLogo from "../../Assets/png/Trippr-White-Logo.png"
import calendar from "../../Assets/png/calendar.png"
import dashboard from "../../Assets/png/dashboard.png"
import department from "../../Assets/png/department.png"
import employee from "../../Assets/png/employee.png"
import settings from "../../Assets/png/settings.png"
import support from "../../Assets/png/support.png"
import Header from '../Header';


const SideBar = () => {
    const [currentPage, setCurrentPage] = useState('dashboard');

    const handleNavClick = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className='sideBarContainer'>
            <div className='sideBar'>
                <Container fluid className='h-100'>
                    <Row className='h-100'>
                        <Col sm={3} className='colSidebar'>
                            <div className='sidebar_mainHeader'>
                                <img src={tripprLogo} alt="Trippr.co.in" />
                            </div>
                            <Nav defaultActiveKey="dashboard" className="flex-column">
                                <p>MAIN MENU</p>
                                <Nav.Link eventKey="dashboard" onClick={() => handleNavClick('dashboard')}>
                                    <img src={dashboard} alt="" /> Dashboard
                                </Nav.Link>
                                <Nav.Link eventKey="about" onClick={() => handleNavClick('Schedule')}>
                                    <img src={calendar} alt="" /> Schedule
                                </Nav.Link>
                                <Nav.Link eventKey="contact" onClick={() => handleNavClick('Employee')}>
                                    <img src={employee} alt="" />Employee
                                </Nav.Link>
                                <Nav.Link eventKey="contact" onClick={() => handleNavClick('Department')}>
                                    <img src={department} alt="" /> Department
                                </Nav.Link>

                            </Nav>
                            <Nav className="flex-column">
                                <p>OTHERS</p>
                                <Nav.Link eventKey="dashboard" onClick={() => handleNavClick('dashboard')}>
                                    <img src={support} alt="" /> Support
                                </Nav.Link>
                                <Nav.Link eventKey="about" onClick={() => handleNavClick('Schedule')}>
                                    <img src={settings} alt="" /> Settings
                                </Nav.Link>
                            </Nav>
                        </Col>
                        <Col sm={9} className='colRightBar'>
                        <div>
                            <Header/>
                        </div>

                            {currentPage === 'dashboard' && <Dashboard />}
                            {currentPage === 'Schedule' && <Schedule />}
                            {currentPage === 'Employee' && <Employee />}
                            {currentPage === 'Department' && <Department />}
                        </Col>
                    </Row>
                </Container>


            </div>
        </div>
    )
}

export default SideBar
