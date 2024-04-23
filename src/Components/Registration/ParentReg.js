import React from "react";
import { useState, useEffect } from "react";
import axiosInstance from "../../baseurl";
import { useNavigate } from "react-router-dom";
function ParentReg() {
  const [student, setStudent] = useState([]);
  const [newLanguage, setNewLanguage] = useState("");
  const navigate=useNavigate()

  const addLanguage = () => {
    if (newLanguage != "") {
      setStudent([...student, newLanguage]);
      setdata({ ...data, studmail: [...data.studmail, newLanguage] });
      setNewLanguage("");
    }
  };

  const delone = (item) => {
    const x = student;
    console.log(x);
    if (x.includes(item)) {
      x.splice(x.indexOf(item), 1);
      // console.log(x);
      // setStudent(x);
      setdata({ ...data, studmail: x });
    }
  };

  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
    studmail: [],
  });

  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
    // console.log(data);
  };

  const submitfn = (e) => {
    e.preventDefault();
    console.log(data);
    axiosInstance
      .post("/registerParent", data)
      .then((res) => {
        if(res.data.status==200){
          alert('Registration Successful')
          navigate('/Login/ParentLog')
        }else{
          alert('Registration Failed')

        }
        console.log(res, "registered parent");
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    console.log(data);
    console.log(student);
  });

  return (
    <div className="main">
      <div className="main">
        <div class="form">
          <h2>Register - Parent</h2>
          <form onSubmit={submitfn}>
            <div class="input">
              <div class="inputBox">
                <label for="">Name</label>
                <input type="text" name="name" onChange={changefn} />
              </div>

              <div class="inputBox">
                <label for="">Email</label>
                <input type="Email" name="email" onChange={changefn} />
              </div>

              <div class="inputBox">
                <label for="">Password</label>
                <input type="password" name="password" onChange={changefn} />
              </div>
              <hr />
              {/* <div class="inputBox">
                <label for="">Student Email</label>
                <input type="Email" name="studEmail" onChange={changefn} />
              </div> */}
              <div>
                <hr />
                <div class="inputBox">
                  <div className="row">
                    <div className="col-7">
                      <input
                        placeholder="Student Email"
                        value={newLanguage}
                        style={{ padding: "2px 5px", borderRadius: "10px" }}
                        onChange={(e) => setNewLanguage(e.target.value)}
                      />
                    </div>
                    <div className="col-5">
                      <button
                        className="btn btn-light"
                        // style={{ margin: "15px 5px " }}
                        type="button"
                        onClick={addLanguage}
                      >
                        Add your Student's Email 
                      </button>
                    </div>
                  </div>
                </div>
                <br />
                {student.map((languages, index) => {
                  return (
                    <span
                      onClick={() => {
                        delone(languages);
                      }}
                      style={{ margin: "5px", padding:"5px 10px", fontSize:'20px' }}
                      class="badge bg-secondary"
                    >
                      {languages}
                    </span>
                  );
                })}
              </div>
              <div class="inputBox">
                <input type="submit" />
              </div>
            </div>
          </form>
          {/* <p class="forgot">
              Forgot Password? <a href="#">Click Here</a>
            </p>
             */}
        </div>
      </div>
    </div>
  );
}

export default ParentReg;
