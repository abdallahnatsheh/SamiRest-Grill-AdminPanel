import React, { useState } from "react";
import { Container, Nav, NavItem } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./adminnavbar.css";
import BtnToTop from "./BtnToTop";
import Fab from "@mui/material/Fab";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { useAuth } from "../../context/AuthContext";

/*basic navbar htmlFor admin panel  */
const LogoStyle = {
  fontFamily: "Bangers, serif",
  fontSize: "32px",
};
const AdminNavBar = (props) => {
  //this state used  to show or hide a dropdown list in the panel
  const [collapsed, setcollapsed] = useState(false);
  const navigate = useNavigate();
  const { logout, dataUser } = useAuth();
  return (
    <div id="wrapper">
      <Nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
        <Container className="container-fluid d-flex flex-column p-0">
          <a
            id="back-to-top-anchor"
            className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
            href="/"
          >
            <div className="sidebar-brand-text mx-3" font="Bangers">
              <span style={LogoStyle}>SAMI GRILL</span>
            </div>
          </a>
          <hr className="sidebar-divider my-0" />
          <ul className="navbar-nav text-light" id="accordionSidebar">
            <NavItem className="nav-item">
              <a className="nav-link active" onClick={() => navigate("/")}>
                <i className="fas fa-tachometer-alt" />
                <span>الصفحة الرئيسية</span>
              </a>
            </NavItem>
            <NavItem className="nav-item">
              <a className="nav-link" onClick={() => navigate("/orders")}>
                <i className="fa fa-cutlery" />
                <span>الطلبات</span>
              </a>
            </NavItem>
            {dataUser.isAdmin ? (
              <NavItem className="nav-item">
                <a className="nav-link" onClick={() => navigate("/support")}>
                  <i className="fa fa-envelope" />
                  <span>دعم فني</span>
                </a>
              </NavItem>
            ) : (
              ""
            )}

            <NavItem className="nav-item">
              <a className="nav-link" onClick={() => navigate("/profile")}>
                <i className="fas fa-user" />
                <span>الحساب</span>
              </a>
            </NavItem>
            {dataUser.isAdmin ? (
              <NavItem className="nav-item">
                <div>
                  <a
                    className="btn btn-link nav-link"
                    data-bs-toggle="collapse"
                    aria-expanded="true"
                    aria-controls="collapse-4"
                    role="button"
                    onClick={() => setcollapsed(!collapsed)}
                  >
                    <i className="fas fa-cog" />
                    &nbsp;<span>التعديل</span>
                  </a>
                  {collapsed ? (
                    <div className="collapse show" id="collapse-4">
                      <div className="bg-white border rounded py-2 collapse-inner">
                        <h6 className="collapse-header">Main Page</h6>
                        <a
                          className="collapse-item"
                          onClick={() => navigate("/swipper-edit")}
                        >
                          لوحة الاعلانات
                        </a>
                        <a
                          className="collapse-item"
                          onClick={() => navigate("/lmcards-edit")}
                        >
                          اجدد الوجبات
                        </a>
                        <a
                          className="collapse-item"
                          onClick={() => navigate("/main-gallery-edit")}
                        >
                          المعرض
                        </a>
                      </div>
                      <div className="bg-white border rounded py-2 collapse-inner">
                        <h6 className="collapse-header">Menu</h6>
                        <a
                          className="collapse-item"
                          onClick={() => navigate("/Menu-edit")}
                        >
                          قائمةالوجبات
                        </a>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </NavItem>
            ) : (
              ""
            )}
            {dataUser.isAdmin ? (
              <NavItem className="nav-item">
                <a className="nav-link" onClick={() => navigate("/team-table")}>
                  <i className="fas fa-table" />
                  <span>جدول</span>&nbsp;الموظفين
                </a>
              </NavItem>
            ) : (
              ""
            )}
            {dataUser.isAdmin ? (
              <NavItem className="nav-item">
                <a
                  className="nav-link"
                  onClick={() => navigate("/register-employee")}
                >
                  <i className="fas fa-user-circle" />
                  <span>إضافة الموظفين</span>
                </a>
              </NavItem>
            ) : (
              ""
            )}

            <NavItem className="nav-item">
              <a className="nav-link" onClick={() => logout()}>
                <i className="far fa-user-circle" />
                <span>تسجيل الخروج</span>
              </a>
            </NavItem>
          </ul>
          <BtnToTop {...props}>
            <Fab color="primary" size="small" aria-label="scroll back to top">
              <BsFillArrowUpCircleFill />
            </Fab>
          </BtnToTop>
        </Container>
      </Nav>
    </div>
  );
};
export default AdminNavBar;
