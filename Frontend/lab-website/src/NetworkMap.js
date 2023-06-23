import React from "react";
import "./NetworkAnalysisDesign.css";

// Homepage component
// This is the homepage of the website
// It is the first page that the user sees
class NetworkMap extends React.Component {
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
                <iframe src="https://www.google.com/maps/d/embed?mid=1WmSbee3PO_N043CDlwHYUcd4LOvNcS8&ehbc=2E312F" width="1500" height="480"></iframe>
            </div>
        );
    }
}

export default NetworkMap;
