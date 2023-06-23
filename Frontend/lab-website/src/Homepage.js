import React from "react";
import "./homepage.css";
import Vektor1 from "./images/Vector1.png";
import Vektor2 from "./images/Vector2.png";
import Ellipse1 from "./images/Ellipse1.png";
import Login from "./Login";
import {Link} from "react-router-dom";

// Homepage component
// This is the homepage of the website
// It is the first page that the user sees
class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "React",
            username: "",
            session: ""
        };
    }
    setPage(page) {
        this.setState({ page: page });
    }


    render() {
        let page;
        switch (this.state.page) {
            case "login":
                page = <Login app={this} />;
                break;
        }
        return (
            <div>
                <h1 className={"info_titel"}>SmartCommune</h1>
                <p className={"info"}>
                    Your Ressourcechecker
                    Your Networkanalysis
                    Your Lab Planer
                </p>
                <img className={"deko"} src= {Vektor1} alt="vektor"/>
                <img className={"deko2"} src= {Vektor2} alt="vektor"/>
                <img className={"deko3"} src= {Ellipse1} alt="vektor"/>
                <button >
                    <Link to="/login">Get started</Link>
                </button>
            </div>


        );
    }
}

export default Homepage;

