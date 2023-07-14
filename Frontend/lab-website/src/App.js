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
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Impressum from "./Impressum";
import Datenschutz from "./Datenschutz";
import DILABoration from "./DILABoration";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      session: "",
      count: 0,
      redirect: null,
    };
  }

  getAPIAddress() {
    return "https://toolsforurbanspace.onrender.com/";
  }

  async apiRequest(method, endpoint, body, token=null) {
    if(endpoint.startsWith("/")) endpoint = endpoint.substring(1, endpoint.length);
    let url = this.getAPIAddress() + endpoint;
    let options = {
      redirect: "follow",
      method: method,
      // CORS Access-Control-Allow-Origin
      /*
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'

      }*/
    };
    if(token) {
      options.headers = {
        'Authorization': 'Bearer ' + token
      };
    }

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

  _storeUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  }

  _loadUser() {
    let user = localStorage.getItem("user");
    if (user) {
      user = JSON.parse(user);
      this.setUser(user);
    }
  }

  async login(username, password) {
    let response = await this.apiRequest("POST", "auth/login", {
      username: username,
      password: password,
    });

    if (response.status !== 200) {
      return {
        success: false,
        message: "Falscher Benutzername oder Passwort",
        status: response.status
      };
    }

    let token = await response.text();
    //console.log(text);

    

    // get user
    response = await this.apiRequest("GET", "/auth/getUser", null, token);
    let user = await response.json();
    console.log(user);

    user.token = token;
    
    this.setUser(user);

    return {
      success: response.status === 200,
      message: "Login erfolgreich",
      status: response.status
    };
  }

  async register(username, password, email) {
    let response = await this.apiRequest("POST", "auth/regis", {
      name: username,
      password: password,
      email: email,
      budget: 10000
    });

    if (response.status !== 200) {
      return {
        success: false,
        message: "Fehler beim Registrieren",
        status: response.status
      };
    }

    // automatic login
    return await this.login(username, password);
  }

  async logout() {
    this.setUser(null);
    this.redirect("/");
  }

  redirect(path) {
    this.setState({ redirect: path });
  }


  getUser() {
    return this.state.user;
  }

  setUser(user) {
    this.setState({ user: user });
    this._storeUser(user);
  }

  render() {
    let redirect = this.state.redirect;
    if (redirect) {
      this.setState({ redirect: null });
    }
    return (
      <div className="appRoot">
        <BrowserRouter>
        {redirect ? <Navigate to={redirect} /> : null}
          <Navbar app={this} user={this.state.user} />

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
