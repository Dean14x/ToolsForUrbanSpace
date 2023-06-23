import React, { NetworkMap, Networktable } from "react";
import "./infopage_style.css";
import "./NetworkAnalysisDesign.css";

import { Link } from "react-router-dom";

// Homepage component
// This is the homepage of the website
// It is the first page that the user sees
class NetworkAnalysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "React",
      username: "",
      session: "",
    };
  }
  render() {
    let page;
    switch (this.state.page) {
      case "networkmap":
        page = <NetworkMap app={this} />;
        break;
      case "manage":
        page = <ManageNetwork app={this} />;
        break;
      }
    return (
      <div>
        <div className="ManageNetwork">
          <div className="rect">
            <div className="text1">
              <h1>Manage Network</h1>
            </div>
            <div>
              <table id="table1">
                <td>
                  <p>- some text</p>
                  <p>- more text</p>
                  <p>- less text</p>
                </td>
              </table>
            </div>
      
            <button className={"manageB"}>
              <Link to="/networkTable">Start</Link>
            </button>

          </div>
        </div>


        <div className="linie"></div>

        <div className="ShowNetwork">
          <div className="rect2">
            <div className="text1">
              <h1>Show Network</h1>
            </div>

            <div>
              <table id="table1">
                <td>
                  <p>- some text</p>
                  <p>- more text</p>
                  <p>- less text</p>
                </td>
              </table>
                    </div>
                    {page}
                </div>
            </div>
          </div>

          <button className={"showB"}>
            <Link to="/networkMap">Start</Link>
          </button>
        </div>
        <div className="infopage-bg">
          <img src="/static/images/Vector5.png" alt="network-vec5"></img>
        </div>
      </div>
    );
  }
}

class ManageNetwork extends React.Component {
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
       return (
        <div>
            <h1>Test</h1>
        </div>
        );
    }
}


export default NetworkAnalysis;
