import React from "react";
import Homepage from "./Homepage";
import Login from "./Login";

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
      default:
        page = <Homepage app={this} />;
        break;
    }
    return (
      <div>
        {page}
      </div>

    );
  }
}

export default App;
