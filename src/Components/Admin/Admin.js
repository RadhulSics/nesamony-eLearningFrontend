import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLog() {
  const navigate = useNavigate();
  const [data, setdata] = useState({
    name: "",
    password: "",
  });
  useEffect(() => {
    if(localStorage.getItem("adminlog")!=null){
      navigate("/admin/adminpage")
    }
    
    if (localStorage.getItem("logstudentid") != null || localStorage.getItem("trainerlogid")!=null || localStorage.getItem("parentlogid")!=null) {
      alert(
        "Please logout from your current account and login as an admin,if you want to access admin panel"
      );
      navigate("/home");
    }
   
  });

  const changefn = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  const submitfn = (e) => {
    e.preventDefault();
    if (data.name == "admin" && data.password == "admin12345") {
      localStorage.setItem("adminlog", 1);
      alert("Logged in");
      window.location.reload(false)   
    }
  };

  return (
    <div class="productdiv1">
      <div className="main">
        <form onSubmit={submitfn}>
          <div class="form">
            <h2>Admin Login </h2>
            <div class="input">
              <div class="inputBox">
                <label for="">Name</label>
                <input type="text" name="name" onChange={changefn} />
              </div>

              <div class="inputBox">
                <label for="">Password</label>
                <input type="password" name="password" onChange={changefn} />
              </div>
              <div class="inputBox">
                <input type="submit" />
              </div>
            </div>
            <p class="forgot">
              Forgot Password? <a href="#">Click Here</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLog;
