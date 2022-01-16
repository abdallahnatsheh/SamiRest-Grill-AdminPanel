import React, { useState } from "react";
import { Button, Container, Nav, NavItem } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./adminnavbar.css";

/*basic navbar for admin panel  */
const LogoStyle = {
  fontFamily: "Bangers, serif",
  fontSize: "32px",
};
const AdminNavBar = () => {
  //this state used  to show or hide a dropdown list in the panel
  const [collapsed, setcollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <div id="wrapper">
      <Nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
        <Container className="container-fluid d-flex flex-column p-0">
          <a
            className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
            href="/admin"
          >
            <div className="sidebar-brand-text mx-3" font="Bangers">
              <span style={LogoStyle}>SAMI GRILL</span>
            </div>
          </a>
          <hr className="sidebar-divider my-0" />
          <ul className="navbar-nav text-light" id="accordionSidebar">
            <NavItem className="nav-item">
              <a className="nav-link active" href="/">
                <i className="fas fa-tachometer-alt" />
                <span>Dashboard</span>
              </a>
            </NavItem>
            <NavItem className="nav-item">
              <a className="nav-link" href="orders.html">
                <i className="fa fa-cutlery" />
                <span>Orders</span>
              </a>
            </NavItem>
            <NavItem className="nav-item">
              <a className="nav-link" href="profile.html">
                <i className="fas fa-user" />
                <span>Profile</span>
              </a>
            </NavItem>
            <NavItem className="nav-item">
              <div>
                <a
                  className="btn btn-link nav-link"
                  data-bs-toggle="collapse"
                  aria-expanded="true"
                  aria-controls="collapse-4"
                  href="#collapse-4"
                  role="button"
                  onClick={() => setcollapsed(!collapsed)}
                >
                  <i className="fas fa-cog" />
                  &nbsp;<span>Editor</span>
                </a>
                {collapsed ? (
                  <div className="collapse show" id="collapse-4">
                    <div className="bg-white border rounded py-2 collapse-inner">
                      <h6 className="collapse-header">Main Page</h6>
                      <a
                        className="collapse-item"
                        onClick={() => navigate("/swipper-edit")}
                      >
                        Swipper
                      </a>
                      <a className="collapse-item" href="cards.html">
                        Cards
                      </a>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </NavItem>
            <NavItem className="nav-item">
              <a className="nav-link" href="table.html">
                <i className="fas fa-table" />
                <span>Table</span>&nbsp;employees
              </a>
            </NavItem>
            <NavItem className="nav-item">
              <a className="nav-link" href="login.html">
                <i className="far fa-user-circle" />
                <span>Login</span>
              </a>
            </NavItem>
            <NavItem className="nav-item">
              <a className="nav-link" href="register.html">
                <i className="fas fa-user-circle" />
                <span>Register emplyee</span>
              </a>
            </NavItem>
          </ul>
          <div className="text-center d-none d-md-inline">
            <Button
              className="btn rounded-circle border-0"
              id="sidebarToggle"
              type="button"
            />
          </div>
        </Container>
      </Nav>
      .
    </div>
  );
};
export default AdminNavBar;
