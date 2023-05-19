import React from "react";
import Homepage from "./Homepage";
import Login from "./Login";
import NetworkAnalysis from "./NetworkAnalysis";
import Overview from "./Overview";
import ResourceChecker from "./ResourceChecker";
import RatingNetworkAnalysis from "./RatingNetworkAnalysis";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "React",
      username: "",
      session: "",
      page: "login"
    };

    this.setPage("login");
  }

  getUsername() {
    return this.state.username;
  }

  setPage(page) {
    // switch page to new page given by string, e.g. "login"
    if (page !== this.state.page)
      this.setState({ page: page });
  }

  render() {
    let page;
    switch (this.state.page) {
      case "homepage":
        page = <Homepage app={this} />;
        break;
      case "login":
        page = <Login app={this} />;
        break;
      case "networkanalysis":
        page = <NetworkAnalysis app={this} />;
        break;
      case "overview":
        page = <Overview app={this} />;
        break;
      case "resourcechecker":
        page = <ResourceChecker app={this} />;
        break;
      
      default:
        page = <Homepage app={this} />;
        break;
    }
    return (
      <div>
        <div>
          <button onClick={() => this.setPage("homepage")}>Homepage</button>
          <button onClick={() => this.setPage("overview")}>Overview</button>
          <button onClick={() => this.setPage("login")}>Login</button>
          <button onClick={() => this.setPage("networkanalysis")}>Network Analysis</button>
          <button onClick={() => this.setPage("resourcechecker")}>Resource Checker</button>
        </div>
        {page}
      </div>

    );
  }
}

export default App;
