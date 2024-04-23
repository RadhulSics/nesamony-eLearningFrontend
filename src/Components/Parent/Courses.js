import React, { useEffect, useState } from "react";
import { useParams , Link, useNavigate} from "react-router-dom";
import axiosInstance from "../../baseurl";

function Courses() {
  const {id} = useParams() // std id
  const [Courses, setCourses] = useState([]);


  const Navigate= useNavigate()

  useEffect(()=>{
    if (localStorage.getItem("parentlogid") == null) {
      Navigate('/home')
    }
  },[])


  useEffect(() => {
    axiosInstance
      .post(`/viewSubscriptionsByCId/${id}`)
      .then((res) => {
        console.log(res);
        if (res.data.data != undefined) {
          setCourses(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="productdiv" style={{ minHeight: "400px" }}>
      <div class="container text-center">
        <div class="row">
            <h1> My Subscriptions</h1>
            <hr/>
          {Courses.length
            ? Courses.map((a) => {
                return (
                  <div class="col-4">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">{a.cid.title}</h5>
                        <hr />
                        <h6 className="card-title"> {a.cid.category}</h6>
                        <hr />
                        <p class="card-text">{a.cid.description}</p>
                        <Link to={`/Parent/Chat/${a.cid.trainerid}/${localStorage.getItem('parentlogid')}`}  class="btn btn-primary">
                          Chat with Trainer
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

export default Courses;
