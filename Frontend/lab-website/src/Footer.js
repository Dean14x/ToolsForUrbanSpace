import React from "react";
import { Link } from "react-router-dom";
import "./general.css";
import "./footer.css";

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        };

    }

    render() {
        return (
            <div className="footer">
                <div className="footer-item">
                    {/*<Link className="footer-link" to="/">Home</Link>*/}
                    Impressum
                    
                </div>
            </div>
        );
    }
}

export default Footer;