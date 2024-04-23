import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import axiosInstance from "../../baseurl";

function Adminpage() {
  if (localStorage.getItem("adminlog") == 1) {
    return (
      <div className="productdiv1" style={{ minHeight: "400px" }}>
        <div className="main" style={{ padding: "10px" }}>
          <h2 style={{ textAlign: "center" }}>
            Hi there, Welcome to the Admin Panel
          </h2>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <img src="https://i.pinimg.com/originals/05/7b/17/057b17c4dfe16fc61956aeecbcac312b.gif" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ minHeight: "400px" }}>
        <h1 style={{ textAlign: "center", position: "relative", top: "150px" }}>
          Please{" "}
          <Link style={{ fontSize: "50px" }} to="/Admin">
            log in{" "}
          </Link>
          to see admin panel{" "}
        </h1>
      </div>
    );
  }
}

export default Adminpage;
