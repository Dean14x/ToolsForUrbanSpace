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
                <h1>Tools For Urban Space</h1>
                <p>
                    This is a website for the Tools For Urban Space project.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam id nunc vitae magna aliquam aliquet. Donec euismod
                </p>
            </div>
        );
    }
}

export default Homepage;

