import React from "react";
import "./homepage.css";
// import Vektor1 from "./images/Vector1.png";
// import Vektor2 from "./images/Vector2.png";
// import Ellipse1 from "./images/Ellipse1.png";
import HomepageBackground from "./images/HomepageBackground.png";
// import logo2 from "./logos/logo2.png";
// import NetworkMap from "./NetworkMap";
// import Login from "./Login";
import { Link } from "react-router-dom";

// Homepage component
// This is the homepage of the website
// It is the first page that the user sees
class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "React",
      username: "",
      session: "",
    };
  }
  //setPage(page) {
  //  this.setState({ page: page });
  // }

  render() {
    //let page;
    //switch (this.state.page) {
    //  case "login":
    //   page = <Login app={this} />;
    //    break;
    // }
    return (
      <div>
        <div className={"homepage"}>
          <img
            className={"homepageBackground"}
            src={HomepageBackground}
            alt="vektor"
          />
          <div className={"content"}>
            <h1 className={"info_titel"}>SmartCommune</h1>
            <div className={"info"}>
              <p>Your Ressourcechecker</p>
              <p>Your Networkanalysis</p>
              <p>Your Lab Planer</p>
            </div>

            <div>
              <button className={"buttonLogin"}>
                <Link className={"buttonLink"} to="/login">
                  Create your Lab now
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;
