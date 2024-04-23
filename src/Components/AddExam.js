import React from 'react'
import { useState, useEffect} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from 'axios';
import axiosInstance from '../baseurl';
function AddExam() {
  
    const [data, setdata] = useState({
      name: "",
      age: "",
      email: "",
      city: "",
      pincode: "",
      contact: "",
      district: "",
      password: "",
    });
    const changefn = (e) => {
      setdata({ ...data, [e.target.name]: e.target.value });
      console.log(data);
    };
    const submitfn = (e)=>{
      e.preventDefault()
      axiosInstance.post("/addexam",data)
  
      
      .then((e)=>{
        if(e.data.status==500){
          alert(e.data.msg)
        } 
      else{
        console.log("Submitted",e);
        alert(e.data.msg)
      }})
      .catch((e)=>{console.log("Error",e);})
    }
    useEffect(()=>{
      console.log(data);
    })
    return (
      <div className="main">
         <div className="main">
        <div class="form">
            <h2>Add Exam</h2>
            <div class="input">
              <div class="inputBox">
                <label for="">Name</label>
                <input type="text" />
              </div>
              <div class="inputBox">
                <label for="">Age</label>
                <input type="number" />
              </div>
              <div class="inputBox">
                <label for="">Email</label>
                <input type="Email" />
              </div>
              <div class="inputBox">
                <label for="">City</label>
                <input type="text" />
              </div>
              <div class="inputBox">
                <label for="">Pincode</label>
                <input type="text" />
              </div>
              <div class="inputBox">
                <label for="">Contact</label>
                <input type="text" />
              </div>
              <div class="inputBox">
                <label for="">District</label>
                <input type="text" />
              </div>
              <div class="inputBox">
                <label for="">Password</label>
                <input type="password" />
              </div>
              <div class="inputBox">
                <input type="submit" name="" />
              </div>
            </div>
            
          
          </div>
      </div>
      </div>
    );
  }
  
  export default AddExam