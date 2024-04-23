import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../baseurl";

function TrainerChatStd() {

  const [updatestate, setupstate] = useState(false);

  let tid = localStorage.getItem("trainerlogid");
  const [stdid, setstdid] = useState("");

  const [msg, setmsg] = useState("");
  const [chat, setchat] = useState([]);

  const [Students, setstudents] = useState([]);
  const [allStudents, setallstudents] = useState([]);

  const Navigate= useNavigate()

  useEffect(()=>{
    if (localStorage.getItem("trainerlogid") == null) {
      Navigate('/home')
    }
  },[])
  useEffect(() => {
    axiosInstance
      .post(`/viewStudentsforTr/${localStorage.getItem("trainerlogid")}`)
      .then((res) => {
        setstudents(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .post(`/viewStudents`)
      .then((res) => {
        setallstudents(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });

    axiosInstance
      .post(`/viewChatForTrwithStudent`, {
        stdid: stdid,
        trid: tid,
      })
      .then((res) => {
        if (res.data.data != undefined) {
          setchat(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [updatestate, stdid]);

  const submitfn = (e) => {
    setupstate((prevState) => !prevState);
    e.preventDefault();
    if (stdid.length) {
      axiosInstance
        .post(`/createChat`, {
          stid: stdid,
          trid: tid,
          pid:null,
          msg: msg,
          from: "Trainer",
        })
        .then((res) => {
          console.log(res, "create chat");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Select a trainer");
    }

    setmsg("");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-2">
          {Students.length ? (
            Students.map((a) => {
              console.log(Students);
              console.log(allStudents);

              let x;
              for (let i of allStudents) {
                if(i._id==a){
                  x = i.name
                }
               
              }
              if(a!=null){
                return (
                  <div class="card">
                    <div class="card-body">
                      {/* <h5 class="card-title">{x} </h5> */}
                      <button
                      className="btn btn-primary"
                      style={{width:"100%"}}
                        onClick={() => {
                          setstdid(a);
                        }}
                      >
                        Chat {x}
                      </button>
                    </div>
                  </div>
                );
              }
           
            })
          ) : (
            <div class="card">
              <div class="card-body">
                <h5 class="card-title"> No Parents available</h5>
              </div>
            </div>
          )}
        </div>
        <div
          className="col-10"
          style={{
            minHeight: "400px",
          }}
        >
          {/* <Link className="btn btn-primary" to={`/cusprofile/createChat`}> Back</Link> */}

          <div
            style={{
              border: "2px solid black",
              borderRadius: "10px",
              minHeight: "300px",
              padding: "50px",
              margin: "10px",
            }}
          >
            {chat.length ? (
              chat.map((a) => {
                let x;
                if (a.from == "Trainer") {
                  x = a.trid.name;
                } else {
                  x = a.stid.name;
                }
                return (
                  <div>
                    <p style={{ textAlign: "left" }}>
                      <b> {x}: </b> {a.msg}
                    </p>
                  </div>
                );
              })
            ) : (
              <p>Trainer: Hi. How can i help you?</p>
            )}
          </div>
          <form onSubmit={submitfn}>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                aria-describedby="basic-addon2"
                value={msg}
                onChange={(e) => {
                  setmsg(e.target.value);
                }}
              />
              <button className="btn btn-primary"> Send</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TrainerChatStd;
