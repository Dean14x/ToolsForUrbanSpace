import React from "react";
import NetworkMap from "./NetworkMap";
import './infopage_style.css';
import Homepage from "./Homepage";
import Login from "./Login";
import Overview from "./Overview";
import ResourceChecker from "./ResourceChecker";

// Homepage component
// This is the homepage of the website
// It is the first page that the user sees
class NetworkAnalysis extends React.Component {
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
            case "networkmap":
                page = <NetworkMap app={this} />;
                break;
            case "manage":
                page = <ManageNetwork app={this} />;
                break;
        }
        return (
            <div>
                <div className={"info_text"}>
                    <h2>Info Text - Network Analysis</h2>
                    <p>
                        This is a website for the Tools For Urban Space project.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam id nunc vitae magna aliquam aliquet. Donec euismod
                        This is a website for the Tools For Urban Space project.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nullam id nunc vitae magna aliquam aliquet. Donec euismod
                    </p>
                </div>
                <div className="infopage-container">
                    <div className="infopage-manage-left" onClick={() => this.setPage("manage")}>
                        <h2>Manage Network</h2>
                        <p>
                        A function that displays a list of available devices and their 
                        key information such as description, cost and available quantity. 
                        Users can search, filter and select devices to check their availability and cost.
                        </p>
                    </div>
                    <div className="infopage-manage-right">
                        <h2>Show Network</h2>
                            <p>
                            A function that displays a list of available devices and their 
                        key information such as description, cost and available quantity. 
                        Users can search, filter and select devices to check their availability and cost.
                            </p>
                    </div>
                    {/* <table>
                        <tr>
                            <th>Manage Network</th>
                            <th>Show Network</th>
                        </tr>

                        <tr>
                            <td>
                                A function that displays a list of available devices and their key
                                information such as description, cost and available quantity. Users
                                can search, filter and select devices to check their availability and cost.
                            </td>

                            <td>
                                A function that displays a list of resources to be purchased and their
                                key information such as description, cost and quantity required. Users
                                can insert, remove, move resources to the "existing equipment" list and
                                mark when these devices should be procured.
                            </td>
                        </tr>
                    </table> */}

                </div>
                <div>
                    <div>

                        <button onClick={() => this.setPage("networkmap")}>Network Map</button>

                    </div>
                    {page}
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

