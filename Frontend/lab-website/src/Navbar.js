import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import logo2 from "./logos/logo2.png";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  render() {
    return (
      <div className="navbar">
        <Link className="navbar-item" to="/">
          <img className={"logo"} src={logo2} alt="logo" />
        </Link>
        <div>
          <Link className="navbar-item" to="/resources">
            Resource Checker
          </Link>
          <Link className="navbar-item" to="/network">
            Network Analysis
          </Link>
          {this.props.user === null ? (
            <Link className="navbar-item" to="/login">
              Login
            </Link>
          ) : (
            <div className="navbar-item"onClick={async () => {await this.props.app.logout();}}>
              Logout
            </div>
          )}
          {this.props.user !== null ? (
            <div className="navbar-item">
              {this.props.user.name}
            </div>) : null
          }

        </div>
      </div>
    );
  }
}

export default Navbar;
