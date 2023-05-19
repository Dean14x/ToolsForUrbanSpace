import React from "react";
import './infopage_style.css';

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

    render() {
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
                    <table>
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
                    </table>

                </div>

            </div>
        );
    }
}

export default NetworkAnalysis;

