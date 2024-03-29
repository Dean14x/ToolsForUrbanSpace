import React from "react";
import { Link } from "react-router-dom";
import "./general.css";
import "./footer.css";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }
  render() {
    return (
      <div className="footer">
        <div className="footer-item">
          <Link className="footer-link" to="/impressum">
            Impressum
          </Link>
          <Link className="footer-link" to="/datenschutz">
            Datenschutz
          </Link>
          <Link className="footer-link" to="/DILABoration">
            Über DILABoration
          </Link>
          <div id="logos">
            <a id="links" className="logoTxt">
              gefördert durch
            </a>
            <a
              className="m2c"
              id="links"
              href="https://m2c-bremen.de"
              target="_blank"
            >
              <img src="./static/images/logo_m2c.jpg"></img>
            </a>
            <a
              className="bmbf"
              id="links"
              href="https://www.bmbf.de/bmbf/de/home/home_node.html"
              target="_blank"
            >
              <img src="./static/images/347px-BMBF_Logo.svg_.png"></img>
            </a>
            <a
              className="lab"
              id="links"
              href="https://impact-lab.eu/"
              target="_blank"
            >
              <img src="./static/images/DIL_logo_6cm.jpg"></img>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
