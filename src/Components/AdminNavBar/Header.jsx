import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import "./adminnavbar.css";
import Avatar from "@mui/material/Avatar";
import {
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useSupportHook } from "../Support/useSupportHook";
import { useProfileOrdersHook } from "../Orders/ordersHook";
import { useProfileSpecialOrdersHook } from "../Orders/specialOrdersHook";

const Header = React.memo(function (props) {
  const navigate = useNavigate();
  //importing user login and data with logut function
  const { currentUser, dataUser, logout } = useAuth();
  //shows profile toolbar
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  //handle progile toolbar if he is login
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const [, docLen] = useSupportHook();
  const [, orderLen] = useProfileOrdersHook();
  const [, specialOrderLen] = useProfileSpecialOrdersHook();
  return (
    <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
      <div className="container-fluid">
        <button
          id="sidebarToggleTop"
          className="btn btn-link d-md-none rounded-circle me-3"
          type="button"
        >
          <i className="fas fa-bars"></i>
        </button>
        <form className="d-none d-sm-inline-block me-auto ms-md-3 my-2 my-md-0 mw-100 navbar-search text-dark mb-0">
          {props.title}
        </form>
        <ul className="navbar-nav flex-nowrap ms-auto">
          <li className="nav-item dropdown no-arrow mx-1">
            <div className="nav-item dropdown no-arrow sh">
              <a
                className="dropdown-toggle nav-link"
                aria-expanded="false"
                data-bs-toggle="dropdown"
                onClick={() => navigate("/orders")}
              >
                <span className="badge bg-danger badge-counter">
                  {orderLen + specialOrderLen}
                </span>
                <span className="tooltiptext">الطلبات</span>
                <i className="fas fa-bell fa-fw"></i>
              </a>
            </div>
          </li>
          {dataUser?.isAdmin ? (
            <li className="nav-item dropdown no-arrow mx-1">
              <div className="nav-item dropdown no-arrow">
                <a
                  className="dropdown-toggle nav-link"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                  onClick={() => navigate("/support")}
                >
                  <span className="badge bg-danger badge-counter">
                    {docLen > 9 ? "9+" : docLen}
                  </span>
                  <span className="tooltiptext">الدعم الفني</span>
                  <i className="fas fa-envelope fa-fw"></i>
                </a>
              </div>
            </li>
          ) : (
            ""
          )}

          <li className="nav-item dropdown no-arrow">
            <Tooltip title="إدارة الحساب">
              <IconButton onClick={handleClick} size="big" sx={{ ml: 2 }}>
                <Avatar
                  sx={{ bgcolor: "#ffffff" }}
                  src={dataUser?.personalImage}
                >
                  {dataUser?.firstName?.charAt(0)?.toUpperCase() ||
                    dataUser?.email?.charAt(0)?.toUpperCase()}
                </Avatar>
                <div
                  style={{
                    color: "rgb(0, 0, 0)",
                    fontSize: "15px",
                    padding: "5px",
                    paddingTop: "10px",
                  }}
                >
                  {!dataUser?.lastName && !dataUser?.firstName
                    ? dataUser?.role
                    : dataUser?.firstName + " " + dataUser?.lastName}{" "}
                </div>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={() => setAnchorEl(null)}
              onClick={() => setAnchorEl(null)}
              PaperProps={{
                elevation: 0,
                sx: {
                  background: "rgb(255, 255, 255)",
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={() => navigate("/profile")}>
                <Avatar
                  sx={{ bgcolor: "#ffffff" }}
                  src={dataUser?.personalImage}
                >
                  {currentUser?.email?.charAt(0)?.toUpperCase()}
                </Avatar>{" "}
                إدارة الحساب
              </MenuItem>
              <Divider />
              <MenuItem onClick={() => logout()}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                خروج
              </MenuItem>
            </Menu>
          </li>
        </ul>
      </div>
    </nav>
  );
});
export default Header;
