import React from "react";
import "./Overview.css";

// A basic Overview widget
// Contains info about some aspect of the project
// e.g. current budget, current resources, etc.
class OverviewWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <div className="overviewWidget">
                <h2>{this.props.title}</h2>
                <p>
                    Here is an overview of some {this.props.title} data.
                </p>
            </div>
        );
    }
}

// Overview component
// This is the overview page of the users project
// It is the first page a user sees after logging in
class Overview extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "React",
            username: "",
            session: ""
        };
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Project Overview</h1>
                    <p>
                        This is the project overview page.
                        Here is a small overview of the ResourceChecker and NetworkAnalysis tools.
                    </p>
                </div>
                <div className="overviewWidgets">
                    <OverviewWidget title="ResourceChecker" />
                    <OverviewWidget title="NetworkAnalysis" />
                    <OverviewWidget title="Other Tool" />
                    <OverviewWidget title="ResourceChecker" />
                    <OverviewWidget title="NetworkAnalysis" />
                    <OverviewWidget title="Other Tool" />
                </div>
            </div>
        );
    }
}

export default Overview;

