import React from "react";
// import css
import "./Login.css";

// Login and Signup components


// Renders an input field with optional feedback
class FeedbackField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            feedback: ""
        };
    }

    render() {
        let type = "text";
        if (this.props.type)
            type = this.props.type;
        let placeholder = "";
        if (this.props.placeholder)
            placeholder = this.props.placeholder;

        let feedback = <div>
            {this.state.feedback}
        </div>;

        return (
            <div className="feedbackField">
                <input type={type} placeholder={placeholder} />
                { ((this.state.feedback) && this.state.feedback!=="") ? feedback : null}

            </div>
        );
    }
}

class LoginPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    login() {
        return;
    }

    render() {
        return (
            <div>
                <FeedbackField type="text" placeholder="Username" />
                <FeedbackField type="password" placeholder="Password" />
                <button onClick={() => this.props.app.setPage("homepage")}>
                    Login
                </button>
            </div>
        );
    }
}

class SignupPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    signUp() {
        return;
    }

    render() {
        return (
            <div>
                <FeedbackField type="text" placeholder="Username" />
                <FeedbackField type="text" placeholder="Email" />
                <FeedbackField type="password" placeholder="Password" />
                <FeedbackField type="password" placeholder="Confirm Password" />
                <button onClick={() => this.props.app.setPage("homepage")}>
                    Sign up
                </button>

            </div>
        );
    }
}

// this is the main component
// it can contain the login or signup component
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: 0
        };
    }

    render() {

        let panel;
        switch (this.state.display) {
            case 0:
                panel = <LoginPanel login={this} app={this.props.app}/>;
                break;
            case 1:
                panel = <SignupPanel login={this} app={this.props.app}/>;
                break;
            default:
                panel = <LoginPanel login={this} app={this.props.app}/>;
                break;
        }

        return (
            <div>
                <div>
                    <button onClick={() => this.setState({display: 0})}>
                        Login
                    </button>
                    <button onClick={() => this.setState({display: 1})}>
                        Sign up
                    </button>
                </div>
                {panel}
                
            </div>
        );
    }
}

export default Login;

