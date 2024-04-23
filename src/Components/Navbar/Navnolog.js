import React from "react";
import { Link } from "react-router-dom";
import icon from "../../Assets/Images/mainicon.png";

function NavNolog() {
  return (
    <div className="navdiv">
      <nav class="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0" >
        <Link
          to="/home"
          class="navbar-brand d-flex align-items-center px-4 px-lg-5"
        >
          <h2 style={{ color: "#1eb2a6" }}>
            <img src={icon} height="100px" /> E-Learning
          </h2>
        </Link>
        <button
          type="button"
          class="navbar-toggler me-4"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse" style={{padding:'0 35px 0 0'}}>
          <div class="navbar-nav ms-auto p-4 p-lg-0">
            <Link to="/home" class="nav-item nav-link active">
              Home
            </Link>
            <Link to="/About" class="nav-item nav-link">
              About
            </Link>
            <div class="nav-item dropdown">
              <a
                href="#"
                class="nav-link dropdown-toggle"
                data-bs-toggle="dropdown" 
              >
                Login
              </a>
              <div class="dropdown-menu fade-down m-0">
                <Link to="/login/StudentLog" class="dropdown-item">
                  Student
                </Link>
                <Link to="/Login/TrainerLog" class="dropdown-item">
                  Trainer
                </Link>
                <Link to="/Login/ParentLog" class="dropdown-item">
                  Parent
                </Link>
              </div>
            </div>
            <div class="nav-item dropdown">
              <a
                href="#"
                class="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                Register
              </a>
              <div class="dropdown-menu fade-down m-0">
                <Link to="/Register/StudentReg" class="dropdown-item">
                  Student
                </Link>
                <Link to="/Register/TrainerReg" class="dropdown-item">
                  Trainer
                </Link>
                <Link to="/Register/ParentReg" class="dropdown-item">
                  Parent
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavNolog;
