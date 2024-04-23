import React, { useEffect, useState } from "react";
import axiosInstance from "../../baseurl";
import { useNavigate } from "react-router-dom";

function AdminTrainers() {
  const Navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("adminlog") == null) {
      Navigate("/home");
    }
  },[])

  const [trainerdata, settdata] = useState([
    { name: "test1", email: "testmail1", empid: 1, gender: "male" },
    { name: "test2", email: "testmail2", empid: 2, gender: "female" },
  ]);

  const [courseReq, setCourseReq] = useState([]);
  const [LectureReq, setLectureReq] = useState([]);

  useEffect(() => {
    axiosInstance
      .post(`/viewTrainers`)
      .then((res) => {
        console.log(res, "trainer");
        settdata(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .post(`/viewCourseRequests`)
      .then((res) => {
        console.log(res, "view all Course reqs");
        if (res.data.data != undefined) {
          setCourseReq(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    axiosInstance
      .post(`/viewLectureReqs`)
      .then((res) => {
        console.log(res, "view all lecture reqs");
        if (res.data.data != undefined) {
          setLectureReq(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const approveCourse = (id) => {
    axiosInstance
      .post(`/ApproveCourse/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          alert("Approved");
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const approveLecture = (id) => {
    axiosInstance
      .post(`/approveLecture/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          alert("Approved");
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  
  const RejectCourse = (id) => {
    axiosInstance
      .post(`/removeCourseById/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          alert("Removed");
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const RejectLecture = (id) => {
    axiosInstance
      .post(`/DeleteLecture/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          alert("Rejected");
          window.location.reload(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="main" style={{ padding: "50px" }}>
      <div class="accordion" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              View all Trainers
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <div className="container">
                <div className="row">
                  {trainerdata.length ? (
                    trainerdata.map((a) => {
                      return (
                        <div className="col">
                          <div class="card card-body">
                            <div class="card" style={{ width: "18rem;" }}>
                              <div class="card-body">
                                <h5 class="card-title">
                                  Trainer name : {a.name}
                                </h5>
                                <p class="card-text">Email ID : {a.email}</p>
                                <p class="card-text">
                                  Experience : {a.experience} years
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="col">
                      <div class="card card-body">
                        <div class="card" style={{ width: "18rem;" }}>
                          <div class="card-body">
                            <h5 class="card-title">
                              No Trainer data Available
                            </h5>
                          </div>
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
              aria-expanded="true"
              aria-controls="collapseTwo"
            >
              View all Course Requests
            </button>
          </h2>
          <div
            id="collapseTwo"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <div className="container">
                <div className="row">
                  {courseReq.length ? (
                    courseReq.map((a) => {
                      return (
                        <div className="col">
                          <div class="card card-body">
                            <div class="card" style={{ width: "18rem;" }}>
                              <div class="card-body">
                                <h5 class="card-title">{a.title}</h5>
                                <hr />
                                <p class="card-text">{a.category}</p>
                                <hr />
                                <p class="card-text ">{a.description}</p>
                                <hr />
                                <button
                                  className="btn btn-primary"
                                  onClick={() => {
                                    approveCourse(a._id);
                                  }}
                                >
                                  Approve Course
                                </button>
                                <button
                                  className="btn btn-primary"
                                  style={{margin:"5px"}}
                                  onClick={() => {
                                    RejectCourse(a._id);
                                  }}
                                >
                                  Reject Course
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="col">
                      <div class="card card-body">
                        <div class="card" style={{ width: "18rem;" }}>
                          <div class="card-body">
                            <h5 class="card-title">No Course to Approve</h5>
                          </div>
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
              data-bs-target="#collapseThree"
              aria-expanded="true"
              aria-controls="collapseThree"
            >
              View all Lecture Requests
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
                  {LectureReq.length ? (
                    LectureReq.map((a) => {
                      let x;
                      if (a.lecture.mimetype == "video/mp4") {
                        x = (
                          <video controls height={300} width={300}>
                            {" "}
                            <source
                              src={`http://localhost:4018/${a.lecture.filename}`}
                            />
                          </video>
                        );
                      } else {
                        x = (
                          <embed
                            src={`http://localhost:4018/${a.lecture.filename}`}
                            width="100%"
                            height="300px"
                          />
                        );
                      }
                      return (
                        <div className="col-6">
                          <div class="card card-body">
                            <div class="card" style={{ width: "18rem;" }}>
                              <div class="card-body">
                                <h5 class="card-title">{a.title}</h5>
                                <hr />
                                <p class="card-text ">{a.content}</p>
                                <p> Lecture type : {a.type}</p>
                                <hr />
                                {x}
                                <hr />
                                <button
                                  className="btn btn-primary"
                                  onClick={() => {
                                    approveLecture(a._id);
                                  }}
                                >
                                  Approve Lecture
                                </button>

                                <button
                                  className="btn btn-primary"
                                  style={{ margin: "5px" }}
                                  onClick={() => {
                                    RejectLecture(a._id);
                                  }}
                                >
                                  Reject Lecture
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="col">
                      <div class="card card-body">
                        <div class="card" style={{ width: "18rem;" }}>
                          <div class="card-body">
                            <h5 class="card-title">No Course to Approve</h5>
                          </div>
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

export default AdminTrainers;
