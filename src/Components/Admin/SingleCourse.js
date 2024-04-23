import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../baseurl";

function SingleCourse() {
  const { id } = useParams(); // course id

  const Navigate = useNavigate();


  

  const [Lecturevideo, setlecturevideo] = useState([]);
  const [Assignments, setAssignments] = useState([]);
  const [Exams, setExams] = useState([]);
  const [valuedExams, setValuedExams] = useState([]);
  const [valuedAssignments, setValuedAssignments] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`/viewLectureByCourse/${id}`)
      .then((res) => {
        console.log(res, "view all lecture by course id");
        if (res.data.data != undefined) {
          setlecturevideo(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .post(`/viewExams/${id}`)
      .then((res) => {
        console.log(res, "view exams for students");
        if (res.data.data != undefined) {
          setExams(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });

    axiosInstance
      .post(`/viewAssignments/${id}`)
      .then((res) => {
        console.log(res, "view Assignments for students");
        if (res.data.data != undefined) {
          setAssignments(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });

    axiosInstance
      .post(`/viewValuedAssignmentForStudents`, {
        cid: id,
        studentid: localStorage.getItem(`logstudentid`),
      })

      .then((res) => {
        console.log(res, "view valued assignment for students");
        if (res.data.data != undefined) {
          setValuedAssignments(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });

    axiosInstance
      .post(`/viewValuedExamForStudents`, {
        cid: id,
        studentid: localStorage.getItem(`logstudentid`),
      })

      .then((res) => {
        console.log(res, "view valued exam for students");
        if (res.data.data != undefined) {
          setValuedExams(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err, "error");
      });
  }, []);
  return (
    <div style={{ padding: "  80px", minHeight: "400px" }}>
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
                          <div className="col-12" key={a._id}>
                            <div class="card">
                              <video
                                src={`http://localhost:4018/${a.lecture.filename}`}
                                height={500}
                                class="card-img-top"
                                alt="..."
                                controls
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
                          <h5 class="card-title">No Lectures to display</h5>
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
                      <div className="col-12" key={a._id}>
                        <div class="card">
                          <embed
                            src={`http://localhost:4018/${a.lecture.filename}`}
                            width="100%"
                            height="550px"
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
                      <h5 class="card-title">No Notes to display</h5>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* <div class="accordion-item">
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
                  {Assignments.length ? (
                    Assignments.map((a) => {
                      return (
                        <div className="col-6" key={a._id}>
                          <div class="card">
                            <div class="card-body">
                              <h5 class="card-title">{a.description}</h5>
                              <Link
                                className="btn btn-primary"
                                to={`/Student/Courses/Assignment/${a._id}/${id}`}
                              >
                                {" "}
                                View Assignment
                              </Link>
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
        </div> */}
        {/* <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSix"
              aria-expanded="false"
              aria-controls="collapseSix"
            >
              View Valued Assigments
            </button>
          </h2>
          <div
            id="collapseSix"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <div className="container">
                <div className="row">
                  {valuedAssignments.length ? (
                    valuedAssignments.map((a) => {
                      return (
                        <div className="col-6" key={a._id}>
                          <div class="card">
                            <div class="card-body">
                              <h5 class="card-title">{a.description}</h5>
                              <Link
                                className="btn btn-primary"
                                to={`/Student/Courses/ViewValuedAssignment/${a.assign_id._id}/${a.studentid._id}`}
                              >
                                {a.assign_id.description}
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="col" >
                      <div class="card">
                        <div class="card-body">
                          <h5 class="card-title">No Assignment to display</h5>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div> */}
        {/* <div class="accordion-item">
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
                  {Exams.length ? (
                    Exams.map((a) => {
                      return (
                        <div className="col-6" key={a._id}>
                          <div class="card">
                            <div class="card-body">
                              <h5 class="card-title">{a.description}</h5>
                              <Link
                                className="btn btn-primary"
                                to={`/Student/Courses/Exam/${a._id}/${id}`}
                              >
                                View Exam
                              </Link>
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
        </div> */}
        {/* <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseFive"
              aria-expanded="false"
              aria-controls="collapseFive"
            >
              View Valued Exams
            </button>
          </h2>
          <div
            id="collapseFive"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <div className="container">
                <div className="row">
                  {valuedExams.length ? (
                    valuedExams.map((a) => {
                      return (
                        <div className="col-6" key={a._id}>
                          <div class="card">
                            <div class="card-body">
                             
                              <Link
                                className="btn btn-primary"
                                to={`/Student/Courses/ViewValuedExam/${a.examid._id}/${localStorage.getItem('logstudentid')}`}
                              >
                                {a.examid.description}
                              </Link>
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
        </div> */}
      </div>
    </div>
  );
}

export default SingleCourse;
