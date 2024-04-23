import React, { useEffect, useState } from "react";
import axiosInstance from "../../baseurl";
import { Link, useNavigate, useParams } from "react-router-dom";

function Valuations() {
  const { id } = useParams(); // course id
  const [exam, setexam] = useState([]);
  const [assignments, setassignments] = useState([]);

  const Navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("trainerlogid") == null) {
      Navigate("/home");
    }
  }, []);

  useEffect(() => {
    console.log("course id", id);
    axiosInstance
      .post(`/viewPendingExam/${id}`)
      .then((res) => {
        console.log(res, " view pending exams");
        if (res.data.data != undefined) {
          setexam(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    axiosInstance
      .post(`/viewPendingAssignment/${id}`)
      .then((res) => {
        console.log(res, " view pending assignments");
        if (res.data.data != undefined) {
          setassignments(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div style={{ padding: "80px", minHeight: "400px" }}>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              Assignments
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse "
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              {assignments.length ? (
                assignments.map((a) => {
                  return (
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">
                          Assignment :{a.assign_id.description}
                        </h5>
                        <h6 class="card-title">
                          Student Name :{a.studentid.name}
                        </h6>

                        <Link
                          to={`/Trainer/Valuation/Valuateassignment/${a.assign_id._id}/${id}/${a.studentid._id}`}
                          class="btn btn-primary"
                        >
                          Valuate Assignment
                        </Link>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">No Assignment to valuate</h5>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Exams
            </button>
          </h2>
          <div
            id="collapseTwo"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              {exam.length ? (
                exam.map((a) => {
                  return (
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">Exam :{a.examid.description}</h5>
                        <h6 class="card-title">
                          Student Name :{a.studentid.name}
                        </h6>

                        <Link
                          to={`/Trainer/Valuation/Valuateexam/${a.examid._id}/${id}`}
                          class="btn btn-primary"
                        >
                          Valuate Exam
                        </Link>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">No Exams to valuate</h5>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Valuations;
