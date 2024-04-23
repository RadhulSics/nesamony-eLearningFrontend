import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../baseurl";

function ValuateAssignment() {
  const { id,cid,stid } = useParams();  // id = assign id, cid course id, stid
  const Navigate = useNavigate()

 

  useEffect(()=>{
    if (localStorage.getItem("trainerlogid") == null) {
      Navigate('/home')
    }
  },[])
  

  const [question, setquestion] = useState({});
  const [answer, setanswer] = useState({});
  const [marks, setmarks] = useState({
    score1: "",
    score2: "",
    score3: "",
    score4: "",
    score5: "",
    comments: "",
  });

  useEffect(() => {
    axiosInstance
      .post(`/viewAssignmentById/${id}`)
      .then((res) => {
        console.log(res, "assignment questions");
        if (res.data.data != undefined) {
          setquestion(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    axiosInstance
      .post(`/viewAssignAnswersbyId/${id}/${stid}`)
      .then((res) => {
        console.log(res, "assignment answers");
        if (res.data.data != undefined) {
          setanswer(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const changefn = (e) => {
    setmarks({ ...marks, [e.target.name]: e.target.value });
  };

  const subfn = (e) => {
    
    e.preventDefault();
    console.log(marks);
    axiosInstance
      .post(`/valuateAssignmentById/${answer._id}`, marks)
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          alert("Valuated.")
         Navigate(`/Trainer/valuation/${cid}`)

        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div style={{ padding: "80px", minHeight: "400px" }}>
        <div className="container text-center">
          <div className="row">
            <div className="col">
              <form onSubmit={subfn}>
                <table class="table table-dark table-striped">
                  <tbody>
                    <tr>
                      <th> Questions</th>
                      <th> Answers</th>
                      <th> Marks</th>
                    </tr>
                    <tr>
                      <td> {question.qn1}</td>
                      <td>{answer.ans1}</td>
                      <td>
                        <input
                          class="form-control"
                          name="score1"
                          onChange={changefn}
                          required
                          type="number"
                          min="0"
                          max="10"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td> {question.qn2}</td>
                      <td>{answer.ans2}</td>
                      <td>
                        <input
                          class="form-control"
                          name="score2"
                          onChange={changefn}
                          required
                          type="number"
                          min="0"
                          max="10"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>{question.qn3}</td>
                      <td>{answer.ans3}</td>
                      <td>
                        <input
                          class="form-control"
                          name="score3"
                          onChange={changefn}
                          required
                          type="number"
                          min="0"
                          max="10"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td> {question.qn4}</td>
                      <td>{answer.ans4}</td>
                      <td>
                        <input
                          class="form-control"
                          name="score4"
                          onChange={changefn}
                          required
                          type="number"
                          min="0"
                          max="10"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>{question.qn5}</td>
                      <td> {answer.ans5}</td>
                      <td>
                        <input
                          class="form-control"
                          name="score5"
                          onChange={changefn}
                          required
                          type="number"
                          min="0"
                          max="10"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="3">
                        <div class="mb-3">
                          <label
                            for="exampleFormControlTextarea1"
                            class="form-label"
                          >
                            Comments
                          </label>
                          <textarea
                            class="form-control"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            name="comments"
                            onChange={changefn}
                          ></textarea>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ValuateAssignment;
