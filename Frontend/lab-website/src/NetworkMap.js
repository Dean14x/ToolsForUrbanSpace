import React from "react";
import './searchstyle.css';

// Homepage component
// This is the homepage of the website
// It is the first page that the user sees
class NetworkMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <div >
                <form action="/" method="get">
                    <label htmlFor="header-search">
                    </label>
                    <input
                        type="text"
                        id="header-search"
                        placeholder="Search blog posts"
                        name="s"
                    />
                    <button type="submit">Search</button>
                </form>
            </div>
        );
    }
}

export default NetworkMap;