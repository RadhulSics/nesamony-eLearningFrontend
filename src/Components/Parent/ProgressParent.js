import React, { useEffect, useState } from "react";
import axiosInstance from "../../baseurl";
import { useNavigate, useParams } from "react-router-dom";

function ProgressParent() {
  const Navigate = useNavigate();

  const {id} = useParams()
  const [assignments, setassignments] = useState([]);
  const [exams, setexams] = useState([]);


  useEffect(()=>{
    if (localStorage.getItem("parentlogid") == null) {
      Navigate('/home')
    }
  },[])

  useEffect(() => {
    console.log(id);
    axiosInstance
      .post(`/viewValuedAssignmentForStudentsForProgress/${id}`)
      .then((res) => {
        console.log(res, " valuated assignments");
        if (res.data.data != undefined) {
          setassignments(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    axiosInstance
      .post(`/viewValuedExamForStudentsForProgress/${id}`)
      .then((res) => {
        console.log(res, " valuated exams");
        if (res.data.data != undefined) {
          setexams(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="main" style={{border:"2px solid black", margin:"40px"}}>
      <h1 style={{ textAlign: "center" }}> Progress Card</h1>
      <div className="container">
        <div className="row">
          {assignments.map((a) => {
            return (
              <div className="col-6">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">
                      <span class="badge bg-secondary">
                        Course : {a.cid.title}
                      </span>
                    </h5>
                    <p class="card-text">
                      Assignment : {a.assign_id.description} <hr /> Total mark : {parseInt((a.totalscore / 50) * 100)} / 100
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="container">
        <div className="row">
          {exams.map((a) => {
            return (
                <div className="col-6">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">
                      <span class="badge bg-secondary">
                        Course : {a.cid.title}
                      </span>
                    </h5>
                    <p class="card-text">
                      Exam : {a.examid.description} <hr /> Total mark : {parseInt((a.totalscore / 150) * 100)} / 100
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProgressParent;
