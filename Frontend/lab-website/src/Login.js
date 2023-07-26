import React from "react";
// import css
import "./Login.css";
import "./general.css";
import { Link, Navigate } from "react-router-dom";
import { validUsername, validEmail, validPassword } from "./regex";

// Login and Signup components


// Renders an input field with optional feedback
class FeedbackField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };
    }

    getVal() {
        return this.state.value;
    }

    setVal(val) {
        this.setState({ value: val });
    }

    getFeedback() {
        // override this function to add custom feedback
        return "";
    }

    isValid() {
        return this.state.value.length !== 0 && this.getFeedback() === "";
    }



    render() {
        let type = "text";
        if (this.props.type)
            type = this.props.type;
        let placeholder = "";
        if (this.props.placeholder)
            placeholder = this.props.placeholder;
        let lgIcon = "";
        if(this.props.placeholder === "Username") {
            lgIcon = "./static/images/login/email-icon.png";
        } else if(this.props.placeholder === "Password" || this.props.placeholder === "Confirm Password") {
            lgIcon = "./static/images/login/lg-lock.png";
        } else if(this.props.placeholder === "Email") {
            lgIcon = "./static/images/login/lg-mail.png";
        }

        // set feedback for current input
        let feedbackVal = this.getFeedback();
        let feedback = <div className="feedbackValue">
            {feedbackVal}
        </div>;
        let feedbackIcon = <img className="lg-Icon" src={lgIcon}></img>

        return (
            <div className="feedbackField">
                <div className="feedback-input-container">
                    <div className="feedback-input-icon">
                        {feedbackIcon}
                    </div>
                    <input type={type} onChange={(event) => { this.setVal(event.target.value); }} placeholder={placeholder} />
                </div>
                {((feedbackVal) && feedbackVal !== "") ? feedback : null}

            </div>
        );
    }
}

// Feedback field that checks if Username meets requirements
class UsernameFeedbackField extends FeedbackField {
    constructor(props) {
        super(props);
    }


    getFeedback() {
        let val = this.getVal();
        if (val.length === 0)
            return "";
        if (val.length < 3)
            return "Username must be at least 3 characters long";
        else if (val.length > 20)
            return "Username must be at most 20 characters long";
        else if (!validUsername.test(val))
            return "Username must only contain letters and numbers";
        else
            return "";
    }
}

class EmailFeedbackField extends FeedbackField {
    constructor(props) {
        super(props);
    }


    getFeedback() {
        let val = this.getVal();
        if (val.length === 0)
            return "";
        if (!validEmail.test(val))
            return "Invalid email";
        else
            return "";
    }
}

function createGetterSetterPair() {
    let val = "";
    return {
        get: function () {
            return val;
        },
        set: function (newVal) {
            val = newVal;
        }
    };
}

// Feedback field that checks if password meets requirements
class PasswordFeedbackField extends FeedbackField {
    constructor(props) {
        super(props);
        // has props setMyVal()
        if (!this.props.setMyVal) {
            console.log("PasswordFeedbackField requires getMyVal prop");
        }

    }

    setVal(val) {
        this.props.setMyVal(val);
        super.setVal(val);

    }


    getFeedback() {
        let val = this.getVal();
        if (val.length === 0)
            return "";
        if (val.length < 6)
            return "Password must be at least 6 characters long";
        else if (val.length > 20)
            return "Password must be at most 20 characters long";
        else if (!validPassword.test(val))
            return "Password must only contain letters and numbers";
        else
            return "";
    }
}

// Feedback field that checks if the password matches another password
class PasswordMatchFeedbackField extends FeedbackField {
    constructor(props) {
        super(props);
        // has props: getOtherVal()
    }



    getFeedback() {
        let val = this.getVal();
        let passwordVal = this.props.getOtherVal();
        if (val.length === 0)
            return "";
        if (val !== passwordVal)
            return "Passwords do not match";
        else
            return "";
    }
}

// Custom feedback field
// Override getFeedback() to add custom feedback that can be set by calling setFeedback()
class CustomFeedbackField extends FeedbackField {
    constructor(props) {
        super(props);
        let feedback = "";
        if (this.props.feedback)
            feedback = this.props.feedback;
        this.state = {
            feedback: feedback,
            value: ""
        };
    }


    setFeedback(val) {
        this.setState({ feedback: val });
    }


    getFeedback() {
        return this.state.feedback;
    }
}




class LoginPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        this.usernameField = React.createRef();
        this.passwordField = React.createRef();
    }

    async login() {
        // clear feedback
        this.usernameField.current.setFeedback("");
        this.passwordField.current.setFeedback("");
        // check if all fields are valid
        if (this.usernameField.current.getVal().length === 0) {
            this.usernameField.current.setFeedback("Username cannot be empty");
            return;
        }
        if (this.passwordField.current.getVal().length === 0) {
            this.passwordField.current.setFeedback("Password cannot be empty");
            return;
        }
        // call api to sign up
        let username = this.usernameField.current.getVal();
        let password = this.passwordField.current.getVal();
        
        let response = await this.props.app.login(username, password);

        if(response.success) {
            // return to home page
            this.props.login.setState({ loggedIn: true });
        }


        
        //this.usernameField.current.setFeedback("Invalid username or password");
        this.passwordField.current.setFeedback(response.message);
        

        
    };

    render() {
        return (
            <div className="login-signup-controls-container">
                <CustomFeedbackField ref={this.usernameField} type="text" placeholder="Email" />
                <CustomFeedbackField ref={this.passwordField} type="password" placeholder="Password" />
                <div className="loginButton" onClick={() => { this.login(); }}><div>Login</div></div>
            </div>
        );
    }
}

class SignupPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            signupFeedback: ""
        };
        this.usernameField = React.createRef();
        this.emailField = React.createRef();
        this.passwordField = React.createRef();
        this.passwordMatchField = React.createRef();
        let { get, set } = createGetterSetterPair();
        this.pwGetter = get;
        this.pwSetter = set;
    }

    setFeedback(val) {
        this.setState({ signupFeedback: val });
    }

    async signUp() {
        // clear feedback
        this.setFeedback("");
        // check if all fields are valid
        if (!this.usernameField.current.isValid()) {
            this.setFeedback("Invalid username");
            return;
        }
        if (!this.emailField.current.isValid()) {
            this.setFeedback("Invalid email");
            return;
        }
        if (!this.passwordField.current.isValid()) {
            this.setFeedback("Invalid password");
            return;
        }
        if (!this.passwordMatchField.current.isValid()) {
            this.setFeedback("Passwords do not match");
            return;
        }
        // get values
        let username = this.usernameField.current.getVal();
        let email = this.emailField.current.getVal();
        let password = this.passwordField.current.getVal();
        
        let response = await this.props.app.register(username, password, email);
        if (response.success) {
            this.setFeedback("Signup successful");
            this.props.login.setState({ loggedIn: true });
            this.props.app.setUser(username, "some session");
        } else {
            this.setFeedback(response.message);
        }

        
        return;

        // on success, redirect to overview
    }

    render() {

        let get = this.pwGetter;
        let set = this.pwSetter;

        return (
            <div className="login-signup-controls-container">
                <UsernameFeedbackField ref={this.usernameField} type="text" placeholder="Username" />
                <EmailFeedbackField ref={this.emailField} type="text" placeholder="Email" />
                <PasswordFeedbackField ref={this.passwordField} setMyVal={set} type="password" placeholder="Password" />
                <PasswordMatchFeedbackField ref={this.passwordMatchField} getOtherVal={get} type="password" placeholder="Confirm Password" />
                <div className="signup-feedback">{this.state.signupFeedback}</div>
                <div className="loginButton" onClick={() => { this.signUp(); }}><div>Sign up</div></div>
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
            display: 0,
            loggedIn: false
        };
    }

    render() {

        let panel;
        switch (this.state.display) {
            case 0:
                panel = <LoginPanel login={this} app={this.props.app} />;
                break;
            case 1:
                panel = <SignupPanel login={this} app={this.props.app} />;
                break;
            default:
                panel = <LoginPanel login={this} app={this.props.app} />;
                break;
        }

        return (
            <div className="login-container">
                {this.state.loggedIn ? <Navigate to="/resources" /> : null}
                <div className="login-signup-switch-container">
                    <button className={this.state.display===0? "active" : "inactive"} onClick={() => this.setState({ display: 0 })}>
                        Login
                    </button>
                    <button className={this.state.display===1? "active" : "inactive"} onClick={() => this.setState({ display: 1 })}>
                        Sign up
                    </button>
                </div>
                <div className="login-signup-line-container">
                    <div className={this.state.display===1? "right":"left"}></div>
                </div>

                {panel}

            <div className="login-bg">
                <div>
                    <a className="login-text">SmartCommune</a>
                </div>
                <img src="/static/images/login/Vector3.png" alt="login-vec3"/>
                <img src="/static/images/login/Vector4.png" alt="login-vec4"/>
                <img src="/static/images/login/Ellipse2.png" alt="login-ellipse"/>
            </div>

            </div>
        );
    }
}

export default Login;

