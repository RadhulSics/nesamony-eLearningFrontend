import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../baseurl";

function ViewValuedAssignment() {
  const { assignid, stdid } = useParams();
  const [assignmentdata, setassignmentdata] = useState({});
  const [wait, setwait] = useState("");


  const Navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("logstudentid") == null) {
      Navigate("/home");
    }
  },[]);


  useEffect(() => {
    axiosInstance
      .post(`/viewValuedAssignmentForStudentsByID/${assignid}`, {
        studentid: stdid,
      })
      .then((res) => {
        console.log(res, " view valued assignment");
        if (res.data.data != undefined) {
          setassignmentdata(res.data.data);
          setwait("hi");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">
            {wait.length ? (
              <span> {assignmentdata.assign_id.description} </span>
            ) : null}
          </h5>
          {wait.length ? (
            <div class="alert alert-primary" role="alert">
              <p class="card-text">
                <span>Marks obtained : {assignmentdata.totalscore} </span>/ 50
              </p>
              <h4> Feedback : {assignmentdata.comments}</h4>
            </div>
          ) : null}
          
        </div>
      </div>
      <div style={{ padding: "80px", minHeight: "400px" }}>
        <div className="container text-center">
          <div className="row">
            <div className="col">
              {wait.length ? (
                <table class="table table-dark table-striped">
                  <tbody>
                    <tr>
                      <th> Questions</th>
                      <th> Answers</th>
                      <th> Marks</th>
                    </tr>
                    <tr>
                      <td> {assignmentdata.assign_id.qn1}</td>
                      <td>{assignmentdata.ans1}</td>
                      <td> {assignmentdata.score1}</td>
                    </tr>
                    <tr>
                      <td> {assignmentdata.assign_id.qn2}</td>
                      <td>{assignmentdata.ans2}</td>
                      <td> {assignmentdata.score2}</td>
                    </tr>
                    <tr>
                      <td>{assignmentdata.assign_id.qn3}</td>
                      <td>{assignmentdata.ans3}</td>
                      <td> {assignmentdata.score3}</td>
                    </tr>
                    <tr>
                      <td> {assignmentdata.assign_id.qn4}</td>
                      <td>{assignmentdata.ans4}</td>
                      <td> {assignmentdata.score4}</td>
                    </tr>
                    <tr>
                      <td>{assignmentdata.assign_id.qn5}</td>
                      <td> {assignmentdata.ans5}</td>
                      <td> {assignmentdata.score5}</td>
                    </tr>
                  </tbody>
                </table>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewValuedAssignment;
