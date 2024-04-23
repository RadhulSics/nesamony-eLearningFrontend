import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../baseurl";

function ViewValuedExams() {
  const { examid, stdid } = useParams();
  const [examdata, setexamdata] = useState({});
  const [wait, setwait] = useState("")

  const Navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("logstudentid") == null) {
      Navigate("/home");
    }
  },[]);



  useEffect(() => {
    axiosInstance
      .post(`/viewValuedExamForStudentsByID/${examid}`, {
        studentid: stdid,
      })
      .then((res) => {
        console.log(res, " view valued exam");
        if (res.data.data != undefined) {
          setexamdata(res.data.data);
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
              <span> {examdata.examid.description} </span>
            ) : null}
          </h5>
          {wait.length ? (
            <div class="alert alert-primary" role="alert">
              <p class="card-text">
                <span>Marks obtained : {parseInt((examdata.totalscore/150)*100)} </span>/ 100
              </p>
              <h4> Feedback : {examdata.comments}</h4>
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
                      <td> {examdata.examid.qn1}</td>
                      <td>{examdata.ans1}</td>
                      <td> {examdata.score1}</td>
                    </tr>
                    <tr>
                      <td> {examdata.examid.qn2}</td>
                      <td>{examdata.ans2}</td>
                      <td> {examdata.score2}</td>
                    </tr>
                    <tr>
                      <td>{examdata.examid.qn3}</td>
                      <td>{examdata.ans3}</td>
                      <td> {examdata.score3}</td>
                    </tr>
                    <tr>
                      <td> {examdata.examid.qn4}</td>
                      <td>{examdata.ans4}</td>
                      <td> {examdata.score4}</td>
                    </tr>
                    <tr>
                      <td>{examdata.examid.qn5}</td>
                      <td> {examdata.ans5}</td>
                      <td> {examdata.score5}</td>
                    </tr>
                    <tr>
                      <td>{examdata.examid.qn6}</td>
                      <td> {examdata.ans6}</td>
                      <td> {examdata.score6}</td>
                    </tr>
                    <tr>
                      <td>{examdata.examid.qn7}</td>
                      <td> {examdata.ans7}</td>
                      <td> {examdata.score7}</td>
                    </tr>
                    <tr>
                      <td>{examdata.examid.qn8}</td>
                      <td> {examdata.ans8}</td>
                      <td> {examdata.score8}</td>
                    </tr>
                    <tr>
                      <td>{examdata.examid.qn9}</td>
                      <td> {examdata.ans9}</td>
                      <td> {examdata.score9}</td>
                    </tr>
                    <tr>
                      <td>{examdata.examid.qn10}</td>
                      <td> {examdata.ans10}</td>
                      <td> {examdata.score10}</td>
                    </tr>
                    <tr>
                      <td>{examdata.examid.qn11}</td>
                      <td> {examdata.ans11}</td>
                      <td> {examdata.score11}</td>
                    </tr>
                    <tr>
                      <td>{examdata.examid.qn12}</td>
                      <td> {examdata.ans12}</td>
                      <td> {examdata.score12}</td>
                    </tr>
                    <tr>
                      <td>{examdata.examid.qn13}</td>
                      <td> {examdata.ans13}</td>
                      <td> {examdata.score13}</td>
                    </tr>
                    <tr>
                      <td>{examdata.examid.qn14}</td>
                      <td> {examdata.ans14}</td>
                      <td> {examdata.score14}</td>
                    </tr>
                    <tr>
                      <td>{examdata.examid.qn15}</td>
                      <td> {examdata.ans15}</td>
                      <td> {examdata.score15}</td>
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

export default ViewValuedExams;
