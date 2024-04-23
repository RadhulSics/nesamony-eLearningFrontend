import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../baseurl";
function StudentReg() {
  let navigate = useNavigate();
  const [data, setdata] = useState({
    name: "",
    course: "",
    dob: "",
    email: "",
    gender: "",
    password: "",
  });
  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };
  const submitfn = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/registerStudent", data)
      .then((res) => {
        console.log(res);
        if (res.data.status == 500) {
          alert(res.data.msg);
        } else {
          console.log("Submitted", res);
          alert(res.data.msg);
          navigate("/Login/StudentLog");
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
    <>
      <div className="main">
        <form onSubmit={submitfn}>
          <div class="form">
            <h2>Register - Student</h2>
            <div class="input">
              <div class="inputBox">
                <label for="">Name</label>
                <input type="text" onChange={changefn} name="name" />
              </div>
              <div class="inputBox">
                <label for="">Course</label>
                <input type="text" onChange={changefn} name="course" />
              </div>
              <div class="inputBox">
                <label for="">Date of Birth</label>
                <input type="date" onChange={changefn} name="dob" />
              </div>

              <div class="inputBox">
                <label for="">Gender</label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onChange={changefn}
                  name="gender"
                >
                  <option value=""> Select your gender</option>

                  <option> Male</option>
                  <option> Female</option>
                  <option> Other</option>
                </select>
              </div>
              <div class="inputBox">
                <label for="">Email</label>
                <input type="email" onChange={changefn} name="email" />
              </div>
              <div class="inputBox">
                <label for="">Password</label>
                <input type="password" onChange={changefn} name="password" />
              </div>
              <div class="inputBox">
                <input type="submit" name="" />
              </div>
            </div>
            {/* <p class="forgot">
              Forgot Password? <a href="#">Click Here</a>
            </p> */}
          </div>
        </form>
      </div>
    </>
  );
}

export default StudentReg;
