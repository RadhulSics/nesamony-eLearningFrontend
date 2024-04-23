import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
import axiosInstance from "../../baseurl";

function TrainerLog() {
  const mainnavigate = useNavigate();
  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };
  useEffect(() => {
    if (localStorage.getItem("trainerlogid") != null) {
      mainnavigate("/home");
    }
  });
  const submitfn = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/logintrainer", data)
      .then((res) => {
        if (res.data.status == 500) {
          alert(e.data.msg);
          alert("Couldn't log in. Please try again");
        } else {
          console.log("Submitted", res);
          localStorage.setItem("trainerlogid", res.data.user._id);
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log("Error", err);
        alert("Couldn't log in. Please try again");
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
            <h2>Login - Trainer</h2>
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
              Forgot Password? <Link to="/Trainer/ForgotPassword">Click Here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TrainerLog;
