import React from 'react'

function AddTutorial() {
  return (
    <div>
         <div className="main">
      <div className="main">
        <form onSubmit={submitfn}>
          <div class="form">
            <h2>Register - Student</h2>
            <div class="input">
              <div class="inputBox">
                <label for="">Title</label>
                <input type="text" onChange={changefn} name="title"/>
              </div>
              <div class="inputBox">
                <label for="">Content</label>
                <input type="text" onChange={changefn} name="course" />
              </div>
              <div class="inputBox">
                <label for="">Date of Birth</label>
                <input type="date" onChange={changefn} name="dob"/>
              </div>
             
              <div class="inputBox">
              <label for="">Gender</label>
                <select class="form-select" aria-label="Default select example" onChange={changefn} name="gender">
                <option value=""> Select your gender</option>

                  <option> Male</option>
                  <option> Female</option>
                  <option> Other</option>
                </select>
              </div>
              <div class="inputBox">
                <label for="">Email</label>
                <input type="email" onChange={changefn} name="email" />
              </div>
              <div class="inputBox">
                <label for="">Password</label>
                <input type="password" onChange={changefn} name="password"/>
              </div>
              <div class="inputBox">
                <input type="submit" name="" />
              </div>
            </div>
            <p class="forgot">
              Forgot Password? <a href="#">Click Here</a>
            </p>
          </div>
        </form>
      </div>
    </div>
    </div>
  )
}

export default AddTutorial