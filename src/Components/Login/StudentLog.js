import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../baseurl";

function StudentLog() {

  const [data, setdata] = useState({
    email: "",
    password: "",
  });

  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const mainnavigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("logstudentid") != null) {
      mainnavigate("/home");
    }
  });
  const submitfn = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/loginStudent", data)
      .then((res) => {
        console.log(res);
        
        if (res.status == 200) {
          localStorage.setItem("logstudentid", res.data.user._id);
          alert("Logged in successfully");
          window.location.reload(false);
        } else {
          alert("Error. Please try again");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong. Please try again")
      });
  };

  return (
    <div className="main">
      <div className="main">
        <form onSubmit={submitfn}>
          <div class="form">
            <h2>Login - Student</h2>
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
                <input type="submit" className='btn btn-light' style={{width:"100%"}}/>
              </div>
            </div>
            <p class="forgot">
              Forgot Password? <Link to="/Student/ForgotPassword">Click Here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentLog;
