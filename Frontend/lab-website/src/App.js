import React from "react";
import Homepage from "./Homepage";
import Login from "./Login";
import NetworkAnalysis from "./NetworkAnalysis";
import Overview from "./Overview";
import ResourceChecker from "./ResourceChecker";
import RatingNetworkAnalysis from "./RatingNetworkAnalysis";
import Navbar from "./Navbar";
import logo2 from './logos/logo2.png';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "React",
      username: "",
      session: "",
      count: 0,
    };

  }

  getUsername() {
    return this.state.username;
  }

  render() {

    return (
      <div>

        <BrowserRouter>

          <Navbar app={this} />

          <Routes>
            <Route path="/" element={<Homepage app={this} />} />
            <Route path="/overview" element={<Overview app={this} />} />
            <Route path="/network" element={<NetworkAnalysis app={this} />} />
            <Route path="/resources" element={<ResourceChecker app={this} />} />
            <Route path="/login" element={<Login app={this} />} />
          </Routes>
        </BrowserRouter>
      </div>

    );
  }
}

export default App;
