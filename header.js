import React from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';

const Header = ({ user, userType, onLogout }) => {
  const getUserTypeDisplay = (type) => {
    const types = {
      student: 'Student',
      lecturer: 'Lecturer',
      'principal-lecturer': 'Principal Lecturer',
      'program-leader': 'Program Leader'
    };
    return types[type] || 'User';
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-top">
      <Container fluid>
        <Navbar.Brand href="#">
          <strong>LUCT Reporting System</strong>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            <Dropdown align="end">
              <Dropdown.Toggle variant="outline-light" id="dropdown-basic">
                <i className="bi bi-person-circle me-2"></i>
                {user.name} ({getUserTypeDisplay(userType)})
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Header>
                  {user.email}
                </Dropdown.Header>
                <Dropdown.Divider />
                <Dropdown.Item onClick={onLogout}>
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;