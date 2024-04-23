import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../baseurl";

function ViewStdCourses() {

  const [Courses, setCourses] = useState([]);


  const Navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("logstudentid") == null) {
      Navigate("/home");
    }
  },[]);
  
  useEffect(() => {
    axiosInstance
      .post(`/viewUnSubscriptionsByCId/${localStorage.getItem("logstudentid")}`)
      .then((res) => {
        console.log(res);
        if (res.data.data != undefined) {
          setCourses(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const subscribefn = (id,cost,title) => {
    Navigate(`/Student/Courses/Payment/${id}/${cost}/${title}`);
  };
  return (
    <div className="productdiv" style={{ minHeight: "400px" }}>
      <div class="container text-center">
        <div class="row">
          <h1> All Courses</h1>
          <hr />
          {Courses.length ? (
            Courses.map((a, index) => {
              if (a.isactive) {
                return (
                  <div class="col-4">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">{a.title}</h5>
                        <hr />
                        <h6 className="card-title"> {a.category}</h6>
                        <hr />
                        <p class="card-text">{a.description}</p>
                        <button
                          onClick={() => {
                            subscribefn(a._id, a.cost, a.title);
                          }}
                          class="btn btn-primary"
                        >
                          Subscribe ₹{a.cost}
                        </button>
                        <hr/>
                        <Link className="btn btn-primary" style={{fontSize:"15px"}}to={`/sample/${a._id}`}>View Sample video</Link>
                      </div>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div class="col-4">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">{a.title}</h5>
                        <hr />
                        <h6 className="card-title"> {a.category}</h6>
                        <hr />
                        <p class="card-text">{a.description}</p>
                        <button
                         
                          class="btn btn-primary"
                        >
                          Coming soon at just ₹{a.cost}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }
            })
          ) : (
            <div class="col-12">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">No Courses to display</h5>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewStdCourses;
