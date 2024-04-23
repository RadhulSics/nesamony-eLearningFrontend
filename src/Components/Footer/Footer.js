import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <footer class="footer-07">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-12 text-center">
            
              <p class="menu">
                <Link to="/home">Home</Link>
                <Link to="/About">About</Link>
              </p>
             
            </div>
          </div>
          <div class="row mt-5">
            <div class="col-md-12 text-center">
              <p class="copyright">
                Copyright &copy; All
                rights reserved |
                <a href="#" target="_blank">
                 E-Learning
                </a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
