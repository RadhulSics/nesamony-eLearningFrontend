import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../baseurl";

function SampleVideo() {
  const { id } = useParams();
  const [sample, setsample] = useState({ cid: "" });


  
  useEffect(() => {
    axiosInstance
      .post(`/viewLectureByCourse/${id}`)
      .then((res) => {
        console.log(res, " view course");
        const a = [];
        for (let i of res.data.data) {
          if (i.lecture.mimetype == "video/mp4") {
            a.push(i);
          }
        }
        console.log(a);
        if (a.length) {
          setsample(a[0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="main">
      {sample.cid.length ? (
        <div className="container">
          <div className="row">
            <div className="col">
              <video controls width={`100%`} height={500}>
                <source
                  src={`http://localhost:4018/${sample.lecture.originalname}`}
                />
              </video>
            </div>
          </div>
        </div>
      ) : (
        <div className="main">
          <h1 style={{ textAlign: "center" }}> No Sample video available</h1>
        </div>
      )}
    </div>
  );
}

export default SampleVideo;
