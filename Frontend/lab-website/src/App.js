import React from "react";
import Homepage from "./Homepage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "React",
      username: "",
      session: ""
    };

    this.setPage("homepage");
  }

  getUsername() {
    return this.state.username;
  }

  setPage(page) {
    this.setState({ page: page });
  }

  render() {
    let page = [];
    switch (this.state.page) {
      case "homepage":
        page = <Homepage app={this} />;
        break;
      default:
        page = <Homepage app={this} />;
        break;
    }
    return (
      <div>
<<<<<<< HEAD
        Test 1
=======
        <h1>Testest</h1>
>>>>>>> 5815c149cad573edcdad2baffff376d691310b09
        {page}
      </div>

    );
  }
}

export default App;
