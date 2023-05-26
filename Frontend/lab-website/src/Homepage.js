import React from "react";

// Homepage component
// This is the homepage of the website
// It is the first page that the user sees
class Homepage extends React.Component {
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
                <h1>Tools For Urban Spaces</h1>
                <p>
                    This is a website is for the Tools For Urban Space project.
                    You can use the tools provided to plan and organize your lab for your commune.
                </p>
            </div>

        );
    }
}

export default Homepage;

