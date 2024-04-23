import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../baseurl";

function AddCourse() {
  const Navigate= useNavigate()

  useEffect(()=>{
    if (localStorage.getItem("trainerlogid") == null) {
      Navigate('/home')
    }
  },[])

  
  const [courses, setcourses] = useState([]);

  const [AddCourse, setAddCourse] = useState({
    title: "",
    category: "",
    description: "",
    cost:""
  });

  useEffect(() => {
    axiosInstance
      .post(`/viewCourseByTrainerId/${localStorage.getItem(`trainerlogid`)}`)
      .then((res) => {
        console.log(res);
        if (res.data.data != null) {
          setcourses(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const changefn = (e) => {
    setAddCourse({ ...AddCourse, [e.target.name]: e.target.value });
  };
  const submitfn = (e) => {
    e.preventDefault();
    console.log(AddCourse);
    axiosInstance
      .post(`/addCourse/${localStorage.getItem("trainerlogid")}`, AddCourse)
      .then((res) => {
        console.log(res);

        if (res.data.status == 200) {
          alert("Added new course");
        } else {
          alert("Couldn't add the course. Please try again");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong. Please try again");
      });
  };
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
              Add a Course
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse "
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <div className="main">
                <form onSubmit={submitfn}>
                  <div class="form">
                    <h2>Add a Course</h2>
                    <div class="input">
                      <div class="inputBox">
                        <label for="">Title</label>
                        <input
                          type="text"
                          onChange={changefn}
                          name="title"
                          required
                        />
                      </div>
                      <div class="inputBox">
                        <label for="">Cost</label>
                        <input
                          type="number"
                          min='1'
                          onChange={changefn}
                          name="cost"
                          required
                        />
                      </div>
                      <div class="inputBox">
                        <label for="">Category</label>
                        <select
                          class="form-select"
                          aria-label="Default select example"
                          onChange={changefn}
                          name="category"
                          required
                        >
                          <option value=""> Select Course Category</option>
                          <option> Science</option>
                          <option> Commerce</option>
                          <option> Humanities</option>
                          <option> IT Field</option>
                          <option> English </option>
                          <option> Music</option>
                          <option> Others </option>
                         
                        </select>
                      </div>

                      <div class="mb-3">
                        <label
                          for="exampleFormControlTextarea1"
                          class="form-label"
                        >
                          Description
                        </label>
                        <textarea
                          class="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          name="description"
                          onChange={changefn}
                        ></textarea>
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
              View Courses
            </button>
          </h2>
          <div
            id="collapseThree"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <div className="container text-center">
                <div className="row">
                  {courses.length ? (
                    courses.map((a) => {
                      return (
                        <div className="col">
                          <div class="card">
                            {/* <img src="..." class="card-img-top" alt="..."/> */}
                            <div class="card-body">
                              <h5 class="card-title">{a.title}</h5>
                              <p class="card-text">{a.category}</p>
                              <hr />
                              <p className="card-text"> {a.description}</p>
                              <Link
                                className="btn btn-primary"
                                to={`/Trainer/Course/ViewCourse/${a._id}`}
                                style={{ margin: "10px" }}
                              >
                                View this Course
                              </Link>
                              <Link
                                className="btn btn-primary"
                                style={{ margin: "10px" }}
                                to={`/Trainer/Course/EditCourse/${a._id}`}
                              >
                                Edit this Course
                              </Link>
                              <Link
                                className="btn btn-primary"
                                style={{ margin: "10px" }}
                                to={`/Trainer/Valuation/${a._id}`}
                              >
                                Valuation
                              </Link>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="col">
                    <div class="card">
                      {/* <img src="..." class="card-img-top" alt="..."/> */}
                      <div class="card-body">
                        <h5 class="card-title">No courses to display</h5>
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

export default AddCourse;
