import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../baseurl";

function Parent() {
  let navigate = useNavigate();
  const [stddata, setstddata] = useState({ dob: "0000000000" });
  
// Need parent login id, and then collect student details from it.
  useEffect(() => {
    axiosInstance.post(`/viewStudentById/${localStorage.getItem("logstudentid")}`)
      .then((res) => {
        console.log(res);
        setstddata(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="main">
      <h2 style={{ textAlign: "center" }}>
        {" "}
        Hi {stddata.name}'s Parent. Welcome to E-Learning. <br /> What would you like
        to do?
      </h2>
      <p style={{ textAlign: "center" }}>
        <button
          class="btn btn-primary"
          style={{ margin: "0px 20px" }}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#multiCollapseExample2"
          aria-expanded="false"
          aria-controls="multiCollapseExample2"
        >
          View Progress of {stddata.name}
        </button>
      </p>
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

export default Parent;
