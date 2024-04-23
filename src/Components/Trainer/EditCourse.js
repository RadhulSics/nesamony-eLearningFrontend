import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../baseurl";

function EditCourse() {
  const { id } = useParams();

  const Navigate= useNavigate()

  useEffect(()=>{
    if (localStorage.getItem("trainerlogid") == null) {
      Navigate('/home')
    }
  },[])

  const [lecturevideo, setlecture] = useState({
    title: "",
    content: "",
    tid: localStorage.getItem("trainerlogid"),
    cid: id,    
    lecture: null,
    type: "video",
  });

  const [lecturenote, setlecturenote] = useState({
    title: "",
    content: "",
    tid: localStorage.getItem("trainerlogid"),
    cid: id,    
    lecture: null,
    type: "note",
  });
  const [lectureAssignment, setlectureAssignment] = useState({
    description:"",
    trainerid:localStorage.getItem("trainerlogid"),
    cid: id,  
    qn1:"",
    qn2:"",
    qn3:"",
    qn4:"",
    qn5:"",
    endDate:""
  });
  const [lectureExam, setlectureExam] = useState({
    description:"",
    trainerid:localStorage.getItem("trainerlogid"),
    cid: id,  
    qn1:"",
    qn2:"",
    qn3:"",
    qn4:"",
    qn5:"",
    qn6:"",
    qn7:"",
    qn8:"",
    qn9:"",
    qn10:"",
    qn11:"",
    qn12:"",
    qn13:"",
    qn14:"",
    qn15:"",
  });
  const changefn1 = (e) => {
    if(e.target.name=="lecture"){
      setlecture({...lecturevideo,lecture:e.target.files[0]})
    }
    else{
      setlecture({...lecturevideo, [e.target.name]:e.target.value})
    }
  };

  const changefn2 = (e) => {
    if(e.target.name=="lecture"){
      setlecturenote({...lecturenote,lecture:e.target.files[0]})
    }
    else{
      setlecturenote({...lecturenote, [e.target.name]:e.target.value})
    }
  };  

 const changefn3 = (e)=>{
    setlectureAssignment({...lectureAssignment, [e.target.name]:e.target.value})
  }

  const changefn4 = (e)=>{
    setlectureExam({...lectureExam, [e.target.name]:e.target.value})
  }
  const submitfn1 = (e) => {
    e.preventDefault();
    console.log(lecturevideo);
    axiosInstance
      .post("/addLecture", lecturevideo, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          alert("Lecture added");
          window.location.reload(false)

        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const submitfn2 = (e) => {
    e.preventDefault();
    console.log(lecturenote);
    axiosInstance
      .post("/addLecture", lecturenote, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          alert("Lecture Note added");
          window.location.reload(false)

        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitfn3 = (e)=>{
    e.preventDefault();
    console.log(lectureAssignment);
    axiosInstance
      .post("/addAssignment", lectureAssignment)
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          alert("Lecture assignment added");
          window.location.reload(false)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitfn4 = (e)=>{
    e.preventDefault();
    console.log(lecturenote);
    axiosInstance
      .post("/addExam", lectureExam)
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          alert("Lecture Exam added");
          window.location.reload(false)

        }
      })
      .catch((err) => {
        console.log(err);
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
              Add Lectures
            </button>
          </h2>
          <div
            id="collapseOne"
            class="accordion-collapse collapse "
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
              <div className="main">
                <form onSubmit={submitfn1}>
                  <div class="form">
                    <h2>Add a lecture</h2>
                    <div class="input">
                      <div class="inputBox">
                        <label for="">Title</label>
                        <input
                          type="text"
                          onChange={changefn1}
                          name="title"
                          required
                        />
                      </div>
                      <div class="mb-3">
                        <label
                          for="exampleFormControlTextarea1"
                          class="form-label"
                        >
                          Content
                        </label>
                        <textarea
                          class="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          name="content"
                          onChange={changefn1}
                        ></textarea>
                      </div>
                      <div class="mb-3">
                        <label for="formFile" class="form-label">
                          Upload the lecture video
                        </label>
                        <input
                          class="form-control"
                          name="lecture"
                          onChange={changefn1}
                          type="file"
                          id="formFile"
                        />
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
              data-bs-target="#collapseTwo"
              aria-expanded="false"
              aria-controls="collapseTwo"
            >
              Add Notes
            </button>
          </h2>
          <div
            id="collapseTwo"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
             <div class="accordion-body">
              <div className="main">
                <form onSubmit={submitfn2}>
                  <div class="form">
                    <h2>Add a Note</h2>
                    <div class="input">
                      <div class="inputBox">
                        <label for="">Title</label>
                        <input
                          type="text"
                          onChange={changefn2}
                          name="title"
                          required
                        />
                      </div>
                      <div class="mb-3">
                        <label
                          for="exampleFormControlTextarea1"
                          class="form-label"
                        >
                          Content
                        </label>
                        <textarea
                          class="form-control"
                          id="exampleFormControlTextarea1"
                          rows="3"
                          name="content"
                          onChange={changefn2}
                        ></textarea>
                      </div>
                      <div class="mb-3">
                        <label for="formFile" class="form-label">
                          Upload the Note
                        </label>
                        <input
                          class="form-control"
                          name="lecture"
                          onChange={changefn2}
                          type="file"
                          id="formFile"
                        />
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
              Add Assignment
            </button>
          </h2>
          <div
            id="collapseThree"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
            <div className="main">
                <form onSubmit={submitfn3}>
                  <div class="form">
                    <h2>Add an Assignment</h2>
                    <div class="input">
                      <div class="inputBox">
                        <label for="">Description</label>
                        <input
                          type="text"
                          onChange={changefn3}
                          name="description"
                          required
                        />
                      </div>
                      <div class="inputBox">
                        <label for="">End Date</label>
                        <input
                          type="date"
                          onChange={changefn3}
                          name="endDate"
                          min={new Date().toISOString().split('T')[0]}
                          required
                        />
                      </div>
                      <div class="inputBox">
                        <label for="">Question 1</label>
                        <input
                          type="text"
                          onChange={changefn3}
                          name="qn1"
                          required
                        />
                      </div>
                      <div class="inputBox">
                        <label for="">Question 2</label>
                        <input
                          type="text"
                          onChange={changefn3}
                          name="qn2"
                          required
                        />
                      </div>
                      <div class="inputBox">
                        <label for="">Question 3</label>
                        <input
                          type="text"
                          onChange={changefn3}
                          name="qn3"
                          required
                        />
                      </div>
                      <div class="inputBox">
                        <label for="">Question 4</label>
                        <input
                          type="text"
                          onChange={changefn3}
                          name="qn4"
                          required
                        />
                      </div>
                      <div class="inputBox">
                        <label for="">Question 5</label>
                        <input
                          type="text"
                          onChange={changefn3}
                          name="qn5"
                          required
                        />
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
              data-bs-target="#collapseFour"
              aria-expanded="false"
              aria-controls="collapseFour"
            >
              Add Exam
            </button>
          </h2>
          <div
            id="collapseFour"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div class="accordion-body">
            <div className="main">
                <form onSubmit={submitfn4}>
                  <div class="form">
                    <h2>Add an Exam</h2>
                    <div class="input">
                      <div class="inputBox">
                        <label for="">Description</label>
                        <input
                          type="text"
                          onChange={changefn4}
                          name="description"
                          required
                        />
                      </div>
                      <div class="inputBox">
                        <label for="">Question 1</label>
                        <input
                          type="text"
                          onChange={changefn4}
                          name="qn1"
                          required
                        />
                      </div>
                      <div class="inputBox">
                        <label for="">Question 2</label>
                        <input
                          type="text"
                          onChange={changefn4}
                          name="qn2"
                          required
                        />
                      </div>
                      <div class="inputBox">
                        <label for="">Question 3</label>
                        <input
                          type="text"
                          onChange={changefn4}
                          name="qn3"
                          required
                        />
                      </div>
                      <div class="inputBox">
                        <label for="">Question 4</label>
                        <input
                          type="text"
                          onChange={changefn4}
                          name="qn4"
                          required
                        />
                      </div>
                      <div class="inputBox">
                        <label for="">Question 5</label>
                        <input
                          type="text"
                          onChange={changefn4}
                          name="qn5"
                          required
                        />
                      </div>
                      <div class="inputBox">
                        <label for="">Question 6 </label>
                        <input
                          type="text"
                          onChange={changefn4}
                          name="qn6"
                          required
                        />
                      </div>
                      <div class="inputBox">
                        <label for="">Question 7</label>
                        <input
                          type="text"
                          onChange={changefn4}
                          name="qn7"
                          required
                        />
                      </div>
                      <div class="inputBox">
                        <label for="">Question 8</label>
                        <input
                          type="text"
                          onChange={changefn4}
                          name="qn8"
                          required
                        />
                      </div>
                      <div class="inputBox">
                        <label for="">Question 9</label>
                        <input
                          type="text"
                          onChange={changefn4}
                          name="qn9"
                          required
                        />
                      </div>
                      <div class="inputBox">
                        <label for="">Question 10</label>
                        <input
                          type="text"
                          onChange={changefn4}
                          name="qn10"
                          required
                        />
                      </div>
                      <div class="inputBox">
                        <label for="">Question 11</label>
                        <input
                          type="text"
                          onChange={changefn4}
                          name="qn1`"
                          required
                        />
                      </div>
                      <div class="inputBox">
                        <label for="">Question 12</label>
                        <input
                          type="text"
                          onChange={changefn4}
                          name="qn12"
                          required
                        />
                      </div>
                      <div class="inputBox">
                        <label for="">Question 13</label>
                        <input
                          type="text"
                          onChange={changefn4}
                          name="qn13"
                          required
                        />
                      </div>
                      <div class="inputBox">
                        <label for="">Question 14</label>
                        <input
                          type="text"
                          onChange={changefn4}
                          name="qn14"
                          required
                        />
                      </div>
                      <div class="inputBox">
                        <label for="">Question 15</label>
                        <input
                          type="text"
                          onChange={changefn4}
                          name="qn15"
                          required
                        />
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
      </div>
    </div>
  );
}

export default EditCourse;
