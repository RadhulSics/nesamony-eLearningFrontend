import React, { useEffect, useState } from "react";
import axiosInstance from "../../baseurl";
import { Link, useNavigate } from "react-router-dom";

function ParentCourseMain() {
  const [parentdata, setparentdata] = useState([]);

  
  const Navigate= useNavigate()

  useEffect(()=>{
    if (localStorage.getItem("parentlogid") == null) {
      Navigate('/home')
    }
  },[])

  useEffect(() => {
    axiosInstance
      .post(`/viewParentById/${localStorage.getItem("parentlogid")}`)
      .then((res) => {
        console.log(res, " parent data");
        if (res.data.data != undefined) {
          setparentdata(res.data.data.stid);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="main" style={{ margin: "40px" }}>
   <div className="container text-center">
   <div className="row">
        {parentdata.length
          ? parentdata.map((a) => {
              return (
                <div className="col-4">
                  <div class="card">
                    {/* <img src="..." class="card-img-top" alt="..." /> */}
                    <div class="card-body">
                      <h5 class="card-title">{a.name}</h5>
                      <p class="card-text">
                        {a.course}
                      </p>
                      <Link to={`/Parent/Courses/Mycourses/${a._id}`} class="btn btn-primary">
                        See Courses
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
   </div>
    </div>
  );
}

export default ParentCourseMain;
