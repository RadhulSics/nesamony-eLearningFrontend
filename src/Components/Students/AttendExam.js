import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../baseurl";
function AttendExam() {
  const Navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("logstudentid") == null) {
      Navigate("/home");
    }
  },[]);
  
  const { examid } = useParams();
  const { cid } = useParams();
  const [Exams, setExams] = useState({});
  const [answers, setanswers] = useState({
    examid: examid,
    studentid: localStorage.getItem("logstudentid"),
    cid: cid,
    ans1: "",
    ans2: "",
    ans3: "",
    ans4: "",
    ans5: "",
    ans6: "",
    ans7: "",
    ans8: "",
    ans9: "",
    ans10: "",
    ans11: "",
    ans12: "",
    ans13: "",
    ans14: "",
    ans15: "",
  });

  useEffect(() => {
    axiosInstance
      .post(`/viewExamById/${examid}`)
      .then((res) => {
        console.log(res, "view exams for students");
        if (res.data.data != undefined) {
          setExams(res.data.data);
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
      .post(`/addAnswers`, answers)
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          alert("Attended exam successfully");
          Navigate(`/Student/Courses/Mycourses/${cid}`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ padding: "  80px", minHeight: "400px" }}>
      <form onSubmit={submitfn}>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Q1) {Exams.qn1}
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
            Q2) {Exams.qn2}
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
            Q3) {Exams.qn3}
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
            Q4) {Exams.qn4}
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
            Q5) {Exams.qn5}
          </label>
          <input
            type="text"
            name="ans5"
            class="form-control"
            id="exampleFormControlInput1"
            onChange={changefn}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Q6) {Exams.qn6}
          </label>
          <input
            type="text"
            name="ans6"
            class="form-control"
            id="exampleFormControlInput1"
            onChange={changefn}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Q7) {Exams.qn7}
          </label>
          <input
            type="text"
            name="ans7"
            class="form-control"
            id="exampleFormControlInput1"
            onChange={changefn}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Q8) {Exams.qn8}
          </label>
          <input
            type="text"
            name="ans8"
            class="form-control"
            id="exampleFormControlInput1"
            onChange={changefn}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Q9) {Exams.qn9}
          </label>
          <input
            type="text"
            name="ans9"
            class="form-control"
            id="exampleFormControlInput1"
            onChange={changefn}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Q10) {Exams.qn10}
          </label>
          <input
            type="text"
            name="ans10"
            class="form-control"
            id="exampleFormControlInput1"
            onChange={changefn}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Q11) {Exams.qn11}
          </label>
          <input
            type="text"
            name="ans11"
            class="form-control"
            id="exampleFormControlInput1"
            onChange={changefn}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Q12) {Exams.qn12}
          </label>
          <input
            type="text"
            name="ans12"
            class="form-control"
            id="exampleFormControlInput1"
            onChange={changefn}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Q13) {Exams.qn13}
          </label>
          <input
            type="text"
            name="ans13"
            class="form-control"
            id="exampleFormControlInput1"
            onChange={changefn}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Q14) {Exams.qn14}
          </label>
          <input
            type="text"
            name="ans14"
            class="form-control"
            id="exampleFormControlInput1"
            onChange={changefn}
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">
            Q15) {Exams.qn15}
          </label>
          <input
            type="text"
            name="ans15"
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
    </div>
  );
}

export default AttendExam;
