import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../baseurl";

function Profile() {
  let navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("logstudentid") == null) {
      navigate("/home");
    }
  },[])

  
  const [stddata, setstddata] = useState({ dob: "0000000000" });
  const [data, setdata] = useState({
    name: "",
    course: "",
    dob: "",
    email: "",
    gender: "",
    password: "",
  });

  useEffect(() => {
    axiosInstance
      .post(`/viewStudentById/${localStorage.getItem("logstudentid")}`)
      .then((res) => {
        console.log(res);
        setstddata(res.data.data);
        setdata(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };
  const submitfn = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`/editStudentById/${localStorage.getItem("logstudentid")}`, data)
      .then((res) => {
        if (res.data.status == 500) {
          console.log(res);
          alert(res.data.msg);
        } else {
          console.log("Submitted", res);
          alert(res.data.msg);
          navigate("/profile");
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return (
    <div className="main">
      <h2 style={{ textAlign: "center" }}>
        {" "}
        Hi {stddata.name}. Welcome to your profile.
      </h2>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div class="card">
              {/* <img src="..." class="card-img-top" alt="..." /> */}
              <div class="card-body">
                <h5 class="card-title">Student name : {stddata.name}</h5>
                <p class="card-text">Course : {stddata.course}</p>
                <p class="card-text">
                  Date of Birth : {stddata.dob.slice(0, 10)}
                </p>
                <p> Gender : {stddata.gender}</p>
                <button
                  class="btn btn-primary"
                  style={{ margin: "0px 20px" }}
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#multiCollapseExample1"
                  aria-expanded="false"
                  aria-controls="multiCollapseExample2"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
          <div className="col">
            <div class="collapse multi-collapse" id="multiCollapseExample1">
              <div class="card card-body">
              <form onSubmit={submitfn}>
                    <div class="form">
                      <h2>Edit Profile - Student</h2>
                      <div class="input">
                        <div class="inputBox">
                          <label for="">Name</label>
                          <input
                            type="text"
                            onChange={changefn}
                            name="name"
                            value={data.name}
                          />
                        </div>
                        <div class="inputBox">
                          <label for="">Course</label>
                          <input
                            type="text"
                            onChange={changefn}
                            name="course"
                            value={data.course}
                          />
                        </div>
                        <div class="inputBox">
                          <label for="">Date of Birth</label>
                          <input
                            type="date"
                            onChange={changefn}
                            name="dob"
                            value={data.dob.slice(0,10)}
                          />
                        </div>

                        <div class="inputBox">
                          <label for="">Gender</label>
                          <select
                            class="form-select"
                            aria-label="Default select example"
                            onChange={changefn}
                            name="gender"
                            value={data.gender}
                          >
                            <option value=""> Select your gender</option>

                            <option> Male</option>
                            <option> Female</option>
                            <option> Other</option>
                          </select>
                        </div>
                        <div class="inputBox">
                          <label for="">Email</label>
                          <input
                            type="email"
                            onChange={changefn}
                            name="email"
                            value={data.email}
                          />
                        </div>
                        <div class="inputBox">
                          <label for="">Password</label>
                          <input
                            type="password"
                            onChange={changefn}
                            name="password"
                            value={data.password}
                          />
                        </div>
                        <div class="inputBox">
                          <input type="submit" name="" />
                        </div>
                      </div>
                    </div>
                  </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
