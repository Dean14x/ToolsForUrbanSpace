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
        }
        return (
            <div>
                <div className={"info_text"}>
                    <h2>Info Text</h2>
                <p>
                    This is a website for the Tools For Urban Space project.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam id nunc vitae magna aliquam aliquet. Donec euismod
                    This is a website for the Tools For Urban Space project.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam id nunc vitae magna aliquam aliquet. Donec euismod
                </p></div>

                <div>
                    <div>
                        <form action="/" method="get">
                            <label htmlFor="header-search">
                            </label>
                            <input
                                type="text"
                                id="header-search"
                                placeholder="Search"
                                name="s"
                            />
                            <button type="submit">Search</button>
                        </form>
                        <iframe src="https://www.google.com/maps/d/embed?mid=1WmSbee3PO_N043CDlwHYUcd4LOvNcS8&ehbc=2E312F" width="1500" height="480"></iframe>
                    </div>
                    {page}
                </div>
            </div>
        );
    }
}

export default NetworkAnalysis;

