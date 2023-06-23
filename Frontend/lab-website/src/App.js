import React from "react";
import Homepage from "./Homepage";
import Login from "./Login";
import NetworkAnalysis from "./NetworkAnalysis";
import NetworkMap from "./NetworkMap";
import Overview from "./Overview";
import ResourceChecker from "./ResourceChecker";
import RatingNetworkAnalysis from "./RatingNetworkAnalysis";
import Navbar from "./Navbar";
import Footer from "./Footer";
import logo2 from "./logos/logo2.png";
import { BrowserRouter, Routes, Route } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      session: "",
      count: 0,
    };
  }

  getUsername() {
    return this.state.username;
  }

  setUser(username, session) {
    this.setState({ username: username, session: session });
  }

  render() {
    return (
      <div className="appRoot">
        <BrowserRouter>
          <Navbar app={this} />

          <Routes>
            <Route path="/" element={<Homepage app={this} />} />
            <Route path="/overview" element={<Overview app={this} />} />
            <Route path="/network" element={<NetworkAnalysis app={this} />} />
            <Route path="/resources" element={<ResourceChecker app={this} />} />
            <Route path="/login" element={<Login app={this} />} />

            <Route path="/networkMap" element={<NetworkMap app={this} />} />
          </Routes>
          <Footer app={this} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
