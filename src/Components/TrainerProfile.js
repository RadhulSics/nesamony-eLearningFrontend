import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../baseurl";

function TrainerProfile() {
  let navigate = useNavigate();

  useEffect(()=>{
    if (localStorage.getItem("trainerlogid") == null) {
      navigate('/home')
    }
  },[])

  
  const [stddata, setstddata] = useState({ dob: "0000000000" });
  const [data, setdata] = useState({
    name: "",
    email: "",
    gender: "",
    experience: "",
    qualification: "",
  });

  useEffect(() => {
    axiosInstance
      .post(`/viewTrainerById/${localStorage.getItem(
          "trainerlogid"
        )}`
      )
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
      .post(
        `/editTrainerById/${localStorage.getItem(
          "trainerlogid"
        )}`,
        data
      )
      .then((res) => {
        if (res.data.status == 500) {
          alert(res.data.msg);
        } else {
          console.log("Submitted", res);
          alert(res.data.msg);
          navigate("/home");
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
        Hi {stddata.name}. Welcome to your profile. <br /> What would you like
        to do?
      </h2>
      <p style={{ textAlign: "center" }}>
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
        <button
          class="btn btn-primary"
          style={{ margin: "0px 20px" }}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#multiCollapseExample2"
          aria-expanded="false"
          aria-controls="multiCollapseExample2"
        >
          View Profile
        </button>
      </p>
      <div class="collapse multi-collapse" id="multiCollapseExample1">
        <div class="card card-body">
          <div className="main">
            <form onSubmit={submitfn}>
              <div class="form">
                <h2>Edit Profile - Trainer</h2>
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
                    <label for="">Email</label>
                    <input
                      type="email"
                      onChange={changefn}
                      name="email"
                      value={data.email}
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
                    <label for="">Experience</label>
                    <input
                      type="text"
                      onChange={changefn}
                      name="experience"
                      value={data.experience}
                    />
                  </div>
                  <div class="inputBox">
                    <label for="">Qualification</label>
                    <input
                      type="text"
                      onChange={changefn}
                      name="qualification"
                      value={data.qualification}
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

      <div class="collapse multi-collapse" id="multiCollapseExample2">
        <div class="card card-body">
          <div className="main">
            <div class="card" style={{ width: "18rem;" }}>
              {/* <img src="..." class="card-img-top" alt="..." /> */}
              <div class="card-body">
                <h5 class="card-title">Student name : {stddata.name}</h5>
                <p class="card-text">Course : {stddata.course}</p>
                <p class="card-text">
                  Date of Birth : {stddata.dob.slice(0, 10)}
                </p>
                <p> Gender : {stddata.gender}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainerProfile;
