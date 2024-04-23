import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../baseurl';


function StudentForgotPass() {

  const mainnavigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("logstudentid") != null) {
      mainnavigate("/home");
    }
  },[])


  const [data, setdata] = useState({
    email: "",
    password: "",
  });
  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };
  const submitfn = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/forgotPwdStd", data)
      .then((res) => {
        console.log(res); 
        if(res.data.status==200){
          alert("Password Changed Successfully")  
          mainnavigate('/Login/StudentLog')
        }
        else{
          alert("Something went Wrong")
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };
  useEffect(() => {
    console.log(data);
  });
  return (
    <div className="main">
      <div className="main">
        <form onSubmit={submitfn}>
          <div class="form">
            <h2>Forgot Password - Student</h2>
            <div class="input">
              <div class="inputBox">
                <label for="">Email</label>
                <input type="Email" name="email" onChange={changefn} />
              </div>

              <div class="inputBox">
                <label for="">Password</label>
                <input type="password" name="password" onChange={changefn} />
              </div>

              <div class="inputBox">
                <input
                  type="submit"
                  className="btn btn-light"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <p class="forgot">
              {/* Forgot Password? <a href="#">Click Here</a> */}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}


export default StudentForgotPass