import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../baseurl";
function AttendAssignment() {
  const Navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("logstudentid") == null) {
      Navigate("/home");
    }
  },[]);
  
  const { assignmentid } = useParams();
  const { cid } = useParams();

  const [Assignments, setAssignments] = useState([]);
  const [answers, setanswers] = useState({
    assign_id: assignmentid,
    studentid: localStorage.getItem("logstudentid"),
    cid: cid,
    ans1: "",
    ans2: "",
    ans3: "",
    ans4: "",
    ans5: "",
  });
  
  useEffect(() => {
    axiosInstance
      .post(`/viewAssignmentById/${assignmentid}`)
      .then((res) => {
        console.log(res, "view exams for students");
        if (res.data.data != undefined) {
          setAssignments(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, []);

  const changefn = (e) => {
    setanswers({ ...answers, [e.target.name]: e.target.value });
  };

  const submitfn = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`/addAnswersforAssignment`, answers)
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          alert("Attended Assignment successfully");
          Navigate(`/Student/Courses/Mycourses/${cid}`);
        }
        else{
          alert("Submission date is over.")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axiosInstance
      .post(`/viewAssignmentById/${assignmentid}`)
      .then((res) => {
        console.log(res, "view Assignments for students");
        if (res.data.data != undefined) {
          setAssignments(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, []);
  return (
    <div style={{ padding: "  80px", minHeight: "400px" }}>
    <form onSubmit={submitfn}>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Q1) {Assignments.qn1}
        </label>
        <input
          type="text"
          name="ans1"
          class="form-control"
          id="exampleFormControlInput1"
          onChange={changefn}
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Q2) {Assignments.qn2}
        </label>
        <input
          type="text"
          name="ans2"
          class="form-control"
          id="exampleFormControlInput1"
          onChange={changefn}
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Q3) {Assignments.qn3}
        </label>
        <input
          type="text"
          name="ans3"
          class="form-control"
          id="exampleFormControlInput1"
          onChange={changefn}
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Q4) {Assignments.qn4}
        </label>
        <input
          type="text"
          name="ans4"
          class="form-control"
          id="exampleFormControlInput1"
          onChange={changefn}
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">
          Q5) {Assignments.qn5}
        </label>
        <input
          type="text"
          name="ans5"
          class="form-control"
          id="exampleFormControlInput1"
          onChange={changefn}
        />
      </div>
      <button className="btn btn-primary" type="submit">
        {" "}
        Submit{" "}
      </button>
    </form>
  </div>  );
}

export default AttendAssignment;
