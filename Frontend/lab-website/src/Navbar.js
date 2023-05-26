import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";


class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        };

    }

    render() {
        return (
            <div className="navbar">
                <div>
                    <Link className="navbar-item" to="/">Home</Link>
                    <Link className="navbar-item" to="/overview">Overview</Link>
                    <Link className="navbar-item" to="/network">Network Analysis</Link>
                    <Link className="navbar-item" to="/resources">Resource Checker</Link>
                    <Link className="navbar-item" to="/login">Login</Link>
                </div>
            </div>
        );
    }
}

export default Navbar;