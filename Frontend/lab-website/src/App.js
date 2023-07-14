import React from "react";
import Homepage from "./Homepage";
import Login from "./Login";
import NetworkAnalysis from "./NetworkAnalysis";
import NetworkMap from "./NetworkMap";
import NetworkTable from "./NetworkTable";

import {
  ResourceChecker,
  OverviewView,
  InventoryView,
  PlannedView,
  CatalogView,
} from "./ResourceChecker";
import RatingNetworkAnalysis from "./RatingNetworkAnalysis";
import Navbar from "./Navbar";
import Footer from "./Footer";
import logo2 from "./logos/logo2.png";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Impressum from "./Impressum";
import Datenschutz from "./Datenschutz";
import DILABoration from "./DILABoration";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      session: "",
      count: 0,
    };
  }

  getAPIAddress() {
    return "https://toolsforurbanspace.onrender.com/";
  }

  async apiRequest(method, endpoint, body) {
    if(endpoint.startsWith("/")) endpoint = endpoint.substring(1, endpoint.length);
    let url = this.getAPIAddress() + endpoint;
    let options = {
      redirect: "follow",
      method: method,
      // CORS Access-Control-Allow-Origin
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'

      }
    };
    if (body) {
      var formData = new FormData();
      for (let key in body) {
        formData.append(key, body[key]);
      }
      options.body = formData;
    }
    let response = await fetch(url, options);
    return response;
  }

  async login(username, password) {
    let response = await this.apiRequest("POST", "auth/login", {
      username: username,
      password: password,
    });
    let json = await response.json();
    console.log(json);

    return {
      success: response.status === 200,
      message: "hello"
    };
  }

  async register(username, password, email) {
    let response = await this.apiRequest("POST", "auth/register", {
      name: username,
      password: password,
      email: email,
      budget: 10000
    });
    let json = await response.json();
    console.log(json);

    return {
      success: response.status === 200,
      message: "hello"
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

            <Route path="/network" element={<NetworkAnalysis app={this} />} />
            <Route path="/resources" element={<ResourceChecker app={this} />}>
              <Route path="/resources" element={<OverviewView app={this} />} />
              <Route
                path="/resources/inventory"
                element={<InventoryView app={this} />}
              />
              <Route
                path="/resources/planned"
                element={<PlannedView app={this} />}
              />
              <Route
                path="/resources/catalog"
                element={<CatalogView app={this} />}
              />
            </Route>
            <Route path="/login" element={<Login app={this} />} />

            <Route path="/networkTable" element={<NetworkTable app={this} />} />
            <Route path="/networkMap" element={<NetworkMap app={this} />} />
            <Route path="/impressum" element={<Impressum app={this} />} />
            <Route path="/datenschutz" element={<Datenschutz app={this} />} />
            <Route path="/DILAboration" element={<DILABoration app={this} />} />
          </Routes>
          <Footer app={this} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
