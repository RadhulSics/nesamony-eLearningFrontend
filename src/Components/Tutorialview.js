import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Tutorialview() {
    const {videoid} = useParams()
    const [videoUrl, setproduct] = useState({});

    useEffect(() => {
      axios
        .get(
          "https://gist.githubusercontent.com/poudyalanil/ca84582cbeb4fc123a13290a586da925/raw/14a27bd0bcd0cd323b35ad79cf3b493dddf6216b/videos.json"
        )
        .then((res) => {
          console.log(res, "result");
          setproduct(res.data[videoid]);
        })
        .catch((err) => {
          console.log(err);
        });
    },[]);
  return (
    <div className="videodiv">
      <Link to="/tutorials" className="btn btn-primary"> Back to tutorials</Link>
      <h1> {videoUrl.title}</h1>
      <p> Trainer : {videoUrl.author}</p>
    <video  src={videoUrl.videoUrl} width="100%" height="550px" controls>
</video>
  </div>
  );
}

export default Tutorialview;
