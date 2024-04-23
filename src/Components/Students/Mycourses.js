import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../baseurl";
import ReactStars from "react-rating-stars-component";

function Mycourses() {
  const [Courses, setCourses] = useState([]);
  const [rating, setrating] = useState("");
  const [refresh, setrefresh] = useState(false);

  const Navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("logstudentid") == null) {
      Navigate("/home");
    }
  },[]);
  
  
  useEffect(() => {
    axiosInstance
      .post(`/viewSubscriptionsByCId/${localStorage.getItem("logstudentid")}`)
      .then((res) => {
        console.log(res);
        if (res.data.data != undefined) {
          setCourses(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const addRating = (id) => {
    console.log(id, "course id");

    axiosInstance
      .post(`/addRating/${id}`, { rating: rating })
      .then((res) => {
        console.log(res);
        setrefresh((prevState) => !prevState);
        if (res.data.status == 200) {
          alert("Added rating");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const unsubscribe = (id)=>{
    axiosInstance.post(`/Unsubscribe/${id}`)
    .then((res)=>{console.log(res)
    if(res.data.status==200){
      alert("UnSubscribed")
      window.location.reload()
    }})
    .catch((err)=>{console.log(err);})
  }

  return (
    <div className="productdiv" style={{ minHeight: "400px" }}>
      <div class="container text-center">
        <div class="row">
          <h1> My Subscriptions</h1>
          <hr />
          {Courses.length
            ? Courses.map((a) => {
                const rate = [];
                for (let i = 0; i < parseFloat(a.cid.rating).toFixed(0); i++) {
                  rate.push(i);
                }
                return (
                  <div class="col-4">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">{a.cid.title}</h5>
                        <hr />
                        <h6 className="card-title"> {a.cid.category}</h6>
                        <hr />
                        <p class="card-text">{a.cid.description}</p>
                        <Link
                          to={`/Student/Courses/Mycourses/${a.cid._id}`}
                          class="btn btn-primary"
                        >
                          View Course
                        </Link>
                        <br />
                        <Link
                          to={`/Student/Chat/${a.cid.trainerid}`}
                          style={{
                            margin: "20px",
                            padding: "5px 10px",
                            fontSize: "15px",
                          }}
                          className="btn btn-primary"
                        >Chat with Trainer
                        </Link>
                        <hr />
                        <div style={{ margin: "auto", width: "64%" }}>
                          <ReactStars
                            count={5}
                            onChange={(newRating) => {
                              setrating(newRating);
                            }}
                            size={40}
                            value={a.cid.rating}
                            activeColor="#ffd700"
                          />
                        </div>
                        <br />
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => {
                            addRating(a.cid._id);
                          }}
                        >
                          {" "}
                          Add Rating
                        </button>
                        <hr/>
                        <button className="btn btn-primary" onClick={()=>{unsubscribe(a._id)}}> Unsubscribe</button>
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

export default Mycourses;
