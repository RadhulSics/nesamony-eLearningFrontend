import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../baseurl";

function Payment() {
  const { id } = useParams();
  const { cost } = useParams();
  const { title } = useParams();

  const Navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("logstudentid") == null) {
      Navigate("/home");
    }
  },[]);
  

  const submitfn = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`/subscribePgm`, {
        stid: localStorage.getItem(`logstudentid`),
        cid: id,
      })
      .then((res) => {
        console.log(res);
        axiosInstance
          .post(`/updatePaymentBySid/${res.data.data._id}`)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        alert("Subscribed");
        Navigate(`/Student/Courses/Mycourses`)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="productdiv" style={{ minHeight: "400px" }}>
      <form onSubmit={submitfn}>
        <div class="container">
          <div class="row">
            <div class="col-12 mt-4" style={{margin:"20px"}}>
              <div class="card p-3">
                <p class="mb-0 fw-bold h4">Payment Methods</p>
              </div>
            </div>

            <div class="col-12" style={{margin:"20px auto"}}>
              <p>
                <a
                  class="btn btn-primary p-2 w-100 h-100 d-flex align-items-center justify-content-between"
                  data-bs-toggle="collapse"
                  href="#collapseExample"
                  role="button"
                  aria-expanded="true"
                  aria-controls="collapseExample"
                >
                  <span class="fw-bold">Credit Card</span>
                </a>
              </p>
              <div class="collapse" id="collapseExample">
                <div class="row">
                  <div class="col-4">
                    <p class="h4 mb-0"> Details</p>
                    <hr />
                    <h4 class="mb-0">
                      <span class="fw-bold">Product:</span>
                      <span class="c-green"> {title}</span>
                    </h4>
                    <br/>
                    <h4 class="mb-0">
                      <span class="fw-bold">Price: </span>
                      <span class="c-green"> {cost}₹</span>
                    </h4>
                  </div>
                  <div class="col-8">
                    <div class="row">
                      <div class="col-12">
                        <div class="form__div">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Card Number"
                            minLength="16"
                            maxLength="16"
                            required
                          />
                          <hr />
                        </div>
                      </div>

                      <div class="col-6">
                        <div class="form__div">
                          <input
                            type="date"
                            class="form-control"
                            placeholder="MM/YY"
                            min={new Date().toISOString().split('T')[0]}
                            required
                          />
                          <hr />
                        </div>
                      </div>

                      <div class="col-6">
                        <div class="form__div">
                          <input
                            type="password"
                            class="form-control"
                            placeholder="CVV"
                            minLength="3"
                            maxLength="3"
                            required
                          />
                          <hr />
                        </div>
                      </div>
                      <div class="col-12">
                        <div class="form__div">
                          <input
                            type="text"
                            class="form-control"
                            placeholder="Name on the Card"
                            required
                          />
                          <label for="" class="form__label"></label>
                        </div>
                      </div>
                      <div class="col-12">
                        <button class="btn btn-light">Submit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Payment;
