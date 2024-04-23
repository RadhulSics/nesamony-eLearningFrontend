import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../baseurl";
function ParentLog() {

  const mainnavigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("parentlogid") != null) {
      mainnavigate("/home");
    }
  });
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const submitfn = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/loginParent", data)
      .then((res) => {
        console.log(res);
        if(res.status==200){
          localStorage.setItem("parentlogid", res.data.user._id);
          localStorage.setItem("parentlogstdid", res.data.user.stid);
          alert("Logged in successfully");
          window.location.reload(false);
        }
        
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  useEffect(() => {
    console.log(data);
  });
  return (
    <div className="main">
      <div className="main">
        <form onSubmit={submitfn}>
          <div class="form">
            <h2>Login - Parent</h2>
            <div class="input">
              <div class="inputBox">
                <label for="">Email</label>
                <input type="Email" name="email" onChange={changefn} />
              </div>

              <div class="inputBox">
                <label for="">Password</label>
                <input type="password" name="password" onChange={changefn} />
              </div>

              <div class="inputBox">
                <input
                  type="submit"
                  className="btn btn-light"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <p class="forgot">
              Forgot Password? <Link to="/Parent/ForgotPassword">Click Here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ParentLog;
