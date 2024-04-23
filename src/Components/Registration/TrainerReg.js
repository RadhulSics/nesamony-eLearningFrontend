import React from "react";
import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../baseurl";
function TrainerReg() {
  const navigate = useNavigate();
  const [data, setdata] = useState({
    name: "",
    gender: "",
    course: "",
    email: "",
    password: "",
    experience: "",
    qualification: "",
  });
  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };
  const submitfn = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/registerTrainer", data)
      .then((res) => {
        console.log(res);
        if (res.data.status == 500) {
          alert(res.data.msg);
        } else {
          console.log("Submitted", res);
          alert(res.data.msg);
          navigate("/Login/Trainerlog");
        }
      })
      .catch((e) => {
        console.log("Error", e);
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
            <h2>Register - Trainer</h2>
            <div class="input">
              <div class="inputBox">
                <label for="">Name</label>
                <input type="text" name="name" onChange={changefn} />
              </div>
              <div class="inputBox">
                <label for="">Gender</label>
                <select name="gender" class="form-select" onChange={changefn}>
                  <option value=""> Select your gender</option>
                  <option> Male</option>
                  <option> Female</option>
                  <option> Other</option>
                </select>
              </div>
              <div class="inputBox">
                <label for="">Course</label>
                <input type="text" name="course" onChange={changefn} />
              </div>
              <div class="inputBox">
                <label for="">Email</label>
                <input type="email" name="email" onChange={changefn} />
              </div>
              <div class="inputBox">
                <label for="">Password</label>
                <input type="password" name="password" onChange={changefn} />
              </div>
              <div class="inputBox">
                <label for="">Experience</label>
                <input type="number" min="1" name="experience" onChange={changefn} />
              </div>
              <div class="inputBox">
                <label for="">Qualification</label>
                <input type="text" name="qualification" onChange={changefn} />
              </div>
              <div class="inputBox">
                <input type="submit" onChange={changefn} />
              </div>
            </div>
            {/* <p class="forgot">
              Forgot Password? <a href="#">Click Here</a>
            </p> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default TrainerReg;
