import React from "react";
import { Link } from "react-router-dom";
import "./general.css";
import "./Header_Design.css";
import logo2 from "./logos/logo2.png";


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "React",
            username: "",
            session: ""
        };
    }

    render() {
        return (
            <div className="header">
                <img className={"logoShirin"} src= {logo2} alt="logo"  />

                <div className= "textM">
                    <p>Ressourcechecker</p>
                </div>



                <div className="rectangle"></div>
                <div className="design1"></div>

                <div className="rectangle2"></div>
                <div className="design3"></div>
                <div className= "textS"><p>Network analysis</p></div>
                <div className="design2"></div>


                <div className="design4"></div>






            </div>
        );
    }
}


class Header1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "React",
            username: "",
            session: ""
        };
    }
}


export default Header;


