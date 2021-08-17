import React, { useEffect, useState } from "react";
import RawLoadr from "../components/loader/rawLoader";
import { NavLink } from "react-router-dom";
function Sidebar(props) {
  const [Permissions, setPermission] = useState([]);
  useEffect(() => {
    setPermission(props.permission);
  }, [props.permission]);

  let menulist = null;

  const checkPerm = (e) => {
    const isAccess = Permissions.findIndex(
      (i) => i.toLowerCase() == e.toLowerCase()
    );
    if (isAccess != -1) {
      return true;
    }
  };
  if (Permissions.length > 0) {
    menulist = (
      <>
        {checkPerm("Permissions") && (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/permissions">
                <i className="ni ni-single-02 text-yellow"></i>
                <span className="nav-link-text">Permissions</span>
              </NavLink>
            </li>
          </>
        )}

        {checkPerm("Roles") && (
          <>
            <li className="nav-item">
              <NavLink className="nav-link" exact to="/roles">
                <i className="ni ni-single-02 text-yellow"></i>
                <span className="nav-link-text">Roles</span>
              </NavLink>
            </li>
          </>
        )}

        {checkPerm("users") && (
          <>
            <li className="nav-item">
            <NavLink className="nav-link" exact to="/users">
                <i className="ni ni-single-02 text-yellow"></i>
                <span className="nav-link-text">Users</span>
              </NavLink>
            </li>
          </>
        )}
         {checkPerm("students") && (
          <>
            <li className="nav-item">
            <NavLink className="nav-link" exact to="/students">
                <i className="ni ni-single-02 text-yellow"></i>
                <span className="nav-link-text">Students</span>
              </NavLink>
            </li>
          </>
        )}
      </>
    );
  }

  return (
    <nav
      className="sidenav navbar navbar-vertical  fixed-left  navbar-expand-xs navbar-light bg-white"
      id="sidenav-main"
    >
      <div className="scrollbar-inner">
        {/* <!-- Brand --> */}
        <div className="sidenav-header  align-items-center">
          <a className="navbar-brand" href="#">
            <img
              src="assets/img/brand/blue.png"
              className="navbar-brand-img"
              alt="..."
            />
          </a>
        </div>
        <div className="navbar-inner">
          {/* <!-- Collapse --> */}
          <div className="collapse navbar-collapse" id="sidenav-collapse-main">
            {/* <!-- Nav items --> */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link  " to="/">
                  <i className="ni ni-tv-2 text-primary"></i>
                  <span className="nav-link-text">Dashboard</span>
                </NavLink>
              </li>
              {Permissions.length > 0 ? menulist : <RawLoadr />}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
