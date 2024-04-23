import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../baseurl";

function ParentChat() {
  const { tid, pid } = useParams();
  const [msg, setmsg] = useState("");
  const [chat, setchat] = useState([]);
  const [updatestate,setupstate] = useState(false)
  
  const Navigate= useNavigate()

  useEffect(()=>{
    if (localStorage.getItem("parentlogid") == null) {
      Navigate('/home')
    }
  },[])

  useEffect(() => {
    axiosInstance
      .post(`/viewChatForTrwithParent`, {
        pid: pid,
        trid: tid,
      })
      .then((res) => {
        console.log(res, "view chat");
        if (res.data.data != undefined) {
          setchat(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
      
  }, [updatestate]);

  const submitfn = (e) => {
    setupstate(prevState => !prevState)
    e.preventDefault();
    axiosInstance
      .post(`/createChat`, {
        pid: pid,
        trid: tid,
        stid:null,
        msg: msg,
        from: "Parent",
      })
      .then((res) => {
        console.log(res, 'create chat');
      })
      .catch((err) => {
        console.log(err);
      });
      setmsg('')
  };

  return (
    <div>
      <div
        className="chatdiv "
        style={{
          minHeight: "400px",
          padding: "100px",
          width: "70%",
          margin: "auto",
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
              if (a.from == "Parent") {
                x = a.pid.name;
              } else {
                x = a.trid.name;
              }
              return (
                <div>
                  <p> <b>  {x}: </b> {a.msg}</p>
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
            <span class="input-group-text" id="basic-addon2">
              <button> Send</button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ParentChat;
