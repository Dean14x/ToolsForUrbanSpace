import React from "react";

// Homepage component
// This is the homepage of the website
// It is the first page that the user sees
class ResourceChecker extends React.Component {
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
                <h1>Info Text</h1>
                <div>
                    <table>
                        <tr>
                            <th>available resources</th>
                            <th>planned resources</th>
                        </tr>

                        <tr>
                            <td>
                                A function that displays a list of available devices and their key
                                information such as description, cost and available quantity. Users
                                can search, filter and select devices to check their availability
                                and cost.

                                A function where users can calculate the running costs of equipment
                                and projects. Here you can insert fields for entering costs and a
                                button for calculating the total costs.
                            </td>

                            <td>
                                A function that displays a list of resources to be purchased and
                                their key information such as description, cost and quantity required.
                                Users can insert, remove, move resources to the "existing equipment"
                                list and mark when these devices should be procured.

                                A function that allows users to calculate the planned costs of
                                equipment and projects. Fields for entering acquisition costs and
                                running costs are to be shown here. The total cost of the planned
                                costs should be added together and displayed. In addition, the total
                                price should be shown how this relates to the real running costs.
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
}

export default ResourceChecker;

