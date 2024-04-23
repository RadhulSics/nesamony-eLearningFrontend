import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./Assets/Styles/Navbar.css";
import "./Assets/Styles/Footer.css";
import "./Assets/Styles/Style.css";
import "./Assets/Styles/register.css";
import "./Assets/Styles/About.css";
import "./Assets/Styles/Style2.css";
import "./Assets/js/main";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import Footer from "./Components/Footer/Footer";

import AdminLog from "./Components/Admin/Admin";
import Adminpage from "./Components/Admin/Adminpage";
import AdminStudents from "./Components/Admin/AdminStudents";
import AdminTrainers from "./Components/Admin/AdminTrainers";
import AdminParents from "./Components/Admin/AdminParents";

import StudentReg from "./Components/Registration/StudentReg";
import ParentReg from "./Components/Registration/ParentReg";
import TrainerReg from "./Components/Registration/TrainerReg";

import StudentLog from "./Components/Login/StudentLog";
import ParentLog from "./Components/Login/ParentLog";
import TrainerLog from "./Components/Login/TrainerLog";

import Tutorials from "./Components/Tutorials";
import Tutorialview from "./Components/Tutorialview";
import Profile from "./Components/Profile";
import SampleVideo from "./Components/Students/SampleVideo";
import StudentForgotPass from "./Components/Login/StudentForgotPass";
import TrainerForgotPass from "./Components/Login/TrainerForgotPass";
import ParentForgotPass from "./Components/Login/ParentForgotPass";


function App() {
  const [auth, setauth] = useState(0);
  useEffect(() => {
    if (localStorage.getItem("logstudentid") != null) {
      setauth(1);
    } else if (localStorage.getItem("parentlogid") != null) {
      setauth(2);
    } else if (localStorage.getItem("trainerlogid") != null) {
      setauth(3);
    } else if (localStorage.getItem("adminlog") != null) {
      setauth(4);
    } else {
      setauth(0);
    }
  });
  return (
    <BrowserRouter basename="projects/e_learning">
      <div className="App">
        {/* <button onClick={()=>{setauth(0)}}> No Log</button>
        <button onClick={()=>{setauth(1)}}> Student</button>
        <button onClick={()=>{setauth(2)}}> Parent</button>
        <button onClick={()=>{setauth(3)}}> Trainer</button>
        <button onClick={()=>{setauth(4)}}> Admin</button> */}

        <Navbar auth={auth} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Admin" element={<AdminLog />} />
          <Route path="/Admin/Adminpage" element={<Adminpage />} />
          <Route path="/Admin/Students" element={<AdminStudents />} />
          <Route path="/Admin/Trainers" element={<AdminTrainers />} />
          <Route path="/Admin/Parents" element={<AdminParents />} />

          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/Tutorialview/:videoid" element={<Tutorialview />} />

          <Route path="/sample/:id" element={<SampleVideo />} />

          <Route path="/Profile" element={<Profile />} />

          <Route path="/Register/StudentReg" element={<StudentReg />} />
          <Route path="/Register/ParentReg" element={<ParentReg />} />
          <Route path="/Register/TrainerReg" element={<TrainerReg />} />
          <Route path="/Login/StudentLog" element={<StudentLog />} />
          <Route path="/Login/ParentLog" element={<ParentLog />} />
          <Route path="/Login/TrainerLog" element={<TrainerLog />} />

          <Route
            path="/Trainer/ForgotPassword"
            element={<TrainerForgotPass />}
          />
          <Route path="/Parent/ForgotPassword" element={<ParentForgotPass />} />
          <Route
            path="/Student/ForgotPassword"
            element={<StudentForgotPass />}
          />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
