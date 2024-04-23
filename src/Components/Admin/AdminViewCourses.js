import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../baseurl";

function AdminViewCourses() {
  const [Courses, setCourses] = useState([]);

  const Navigate = useNavigate();
  
  useEffect(() => {
    axiosInstance
      .post(`/viewCourses`)
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
                        <h5> Trainer : {a.trainerid.name}</h5>
                        <hr />
                        <h5 class="card-title">Course : {a.title}</h5>
                        <hr />
                        <h6 className="card-title"> Category : {a.category}</h6>
                        <hr />
                        <p class="card-text">Description : {a.description}</p>
                        <Link to={`/Admin/ViewSingleCourse/${a._id}`} className="btn btn-primary" style={{fontSize:"15px"}}>View Course</Link>
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


export default AdminViewCourses