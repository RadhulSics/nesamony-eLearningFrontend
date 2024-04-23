import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Tutorials() {
  const [products, setproduct] = useState([]);

  useEffect(() => {
    axios
      .get(
        "https://gist.githubusercontent.com/poudyalanil/ca84582cbeb4fc123a13290a586da925/raw/14a27bd0bcd0cd323b35ad79cf3b493dddf6216b/videos.json"
      )
      .then((res) => {
        console.log(res);
        setproduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);
  return (
    <div>
      <div className="productdiv">
        {products.map((a,index) => {
          return (
            <div>
              <div class="container text-center">
                <div class="row">
                  <div class="col">
                    <h1> Channel: {a.author}</h1> <h3> {a.description}</h3>{" "}
                  </div>
                  <div className="col">
                    <h1> {a.author}</h1>
                    <Link to={`/Tutorialview/${a.id}`}><img src={a.thumbnailUrl} height="300px"/></Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Tutorials;
