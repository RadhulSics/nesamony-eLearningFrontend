import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../baseurl";

function ViewCourseDetails() {
  const { id } = useParams();
  const Navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("trainerlogid") == null) {
      Navigate("/home");
    }
  }, []);

  const [Lecturevideo, setlecturevideo] = useState([]);
  const [assignments, setassignments] = useState([]);
  const [exams, setexams] = useState([]);
  const [test,settest] = useState(false)

  useEffect(() => {
    console.log(id);
    axiosInstance
      .post(`/viewLectureByCourse/${id}`)
      .then((res) => {
        console.log(res, "view all lecture by course id");
        if (res.data.data != undefined) {
          setlecturevideo(res.data.data);
          settest(!test)
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .post(`/viewExams/${id}`)
      .then((res) => {
        console.log(res, "view exams by id");
        if (res.data.data != undefined) {
          setexams(res.data.data);
          settest(true)
        }
      })
      .catch((err) => {
        console.log(err, "view error");
      });

    axiosInstance
      .post(`/viewAssignments/${id}`)
      .then((res) => {
        console.log(res, "view assignments by id");
        if (res.data.data != undefined) {
          setassignments(res.data.data);
          settest(!test)
        }
      })
      .catch((err) => {
        console.log(err, "view error");
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
              View Lectures
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse "
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <div className="container">
                <div className="row">
                  {Lecturevideo.length ? (
                    Lecturevideo.map((a) => {
                      if (a.type == "video") {
                        return (
                          <div className="col-4">
                            <div class="card">
                             {test? <video
                                src={`http://localhost:4018/${a.lecture.filename}`}
                                height={300}
                                class="card-img-top"
                                alt="..."
                                controls
                              />:null}
                              <div class="card-body">
                                <h5 class="card-title">{a.title}</h5>
                                <p class="card-text">{a.content}</p>
                              </div>
                            </div>
                          </div>
                        );
                      }
                    })
                  ) : (
                    <div className="col">
                      <div class="card">
                        <div class="card-body">
                          <h5
                            class="card-title"
                            style={{ textAlign: "center" }}
                          >
                            No Lectures to display
                          </h5>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
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
              View Notes
            </button>
          </h2>
          <div
            id="collapseTwo"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              {Lecturevideo.length ? (
                Lecturevideo.map((a) => {
                  if (a.type == "note") {
                    return (
                      <div className="col-4">
                        <div class="card">
                          <embed
                            src={`http://localhost:4018/${a.lecture.filename}`}
                            width="100%"
                            height="250px"
                          />
                          <div class="card-body">
                            <h5 class="card-title">{a.title}</h5>
                            <p class="card-text">{a.content}</p>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })
              ) : (
                <div className="col">
                  <div class="card">
                    <div class="card-body">
                      <h5 class="card-title" style={{ textAlign: "center" }}>
                        No Notes to display
                      </h5>
                    </div>
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
              data-bs-target="#collapseThree"
              aria-expanded="false"
              aria-controls="collapseThree"
            >
              View Assignments
            </button>
          </h2>
          <div
            id="collapseThree"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <div className="container">
                <div className="row">
                  {assignments.length ? (
                    assignments.map((a, index) => {
                      return (
                        <div className="col-4">
                          <div class="card">
                            <div class="card-body">
                              <h1> Assignment {index + 1}</h1>
                              <h5 class="card-title">{a.description}</h5>
                              <ol>
                                <li> {a.qn1}</li>
                                <li> {a.qn2}</li>
                                <li> {a.qn3}</li>
                                <li> {a.qn4}</li>
                                <li> {a.qn5}</li>
                              </ol>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="col">
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title">No Assignments to display</h5>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              View Exams
            </button>
          </h2>
          <div
            id="collapseFour"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <div className="container">
                <div className="row">
                  {exams.length ? (
                    exams.map((a) => {
                      return (
                        <div className="col-4">
                          <div class="card">
                            <div class="card-body">
                              <h5 class="card-title">{a.description}</h5>
                              <ol>
                                <li> {a.qn1}</li>
                                <li> {a.qn2}</li>
                                <li> {a.qn3}</li>
                                ...
                              </ol>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="col">
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title">No Exams to display</h5>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCourseDetails;
