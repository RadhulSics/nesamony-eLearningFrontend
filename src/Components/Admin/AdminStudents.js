import React, { useEffect, useState } from "react";
import axiosInstance from "../../baseurl";
import { useNavigate } from "react-router-dom";

function AdminStudents() {
  const Navigate = useNavigate()
  useEffect(()=>{
    if (localStorage.getItem("adminlog") == null) {
      Navigate('/home')
    }
  },[])
  
  const [stddata, setsdata] = useState([
    
  ]);
  useEffect(() => {
    axiosInstance
      .post(`/viewStudents`)
      .then((res) => {
        console.log(res, "std");
       if(res.data.data!=undefined){
        setsdata(res.data.data);
       }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="main" style={{ padding: "50px" }}>
      <div class="accordion" id="accordionExample">
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
              View all Students
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
                  {stddata.length?
                  stddata.map((a) => {
                    return (
                      <div className="col">
                        <div class="card card-body">
                          <div class="card" style={{ width: "18rem;" }}>
                            <div class="card-body">
                              <h5 class="card-title">
                                Student name : {a.name}
                              </h5>
                              <p class="card-text">Course : {a.course}</p>
                              <p class="card-text">Gender : {a.gender}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }):
                  <div className="col">
                  <div class="card card-body">
                    <div class="card" style={{ width: "18rem;" }}>
                      <div class="card-body">
                        <h5 class="card-title">
                         No Student data Available
                        </h5>
                      
                      </div>
                    </div>
                  </div>
                </div>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminStudents;
