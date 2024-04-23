import React from 'react'
import { Link } from "react-router-dom";
import icon from "../../Assets/Images/mainicon.png";

function NavAdmin() {
    return (
        <div className="navdiv">
          <nav class="navbar navbar-expand-lg bg-white navbar-light shadow sticky-top p-0">
            <Link
              to="/Admin/adminpage"
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
            <div class="collapse navbar-collapse" id="navbarCollapse">
              <div class="navbar-nav ms-auto p-4 p-lg-0">
                <Link to="/Admin/adminpage" class="nav-item nav-link active">
                  Home
                </Link>
                <Link to="/Admin/Students" class="nav-item nav-link">
                  Students
                </Link>
                <Link to="/Admin/Trainers" class="nav-item nav-link">
                  Trainers
                </Link>
               
                <Link to="/Admin/Parents" class="nav-item nav-link">
                  Parents
                </Link>
                
              </div>
              <button style={{margin:"10px",width:"100px"}}  class="btn btn-primary" onClick={()=>{localStorage.clear(); alert("Logged out");window.location.reload(false);}}>Logout</button> 
    
            </div>
          </nav>
        </div>
      );
}

export default NavAdmin