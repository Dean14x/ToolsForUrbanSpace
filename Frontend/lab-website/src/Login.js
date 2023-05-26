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
        this.setState({value: val});
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

        // set feedback for current input
        let feedbackVal = this.getFeedback();
        let feedback = <div>
            {feedbackVal}
        </div>;

        return (
            <div className="feedbackField">
                <input type={type} onChange={ (event)=>{this.setVal(event.target.value);} } placeholder={placeholder} />
                { ((feedbackVal) && feedbackVal!=="") ? feedback : null}

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
        get: function() {
            return val;
        },
        set: function(newVal) {
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
        this.setState({feedback: val});
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

    login = () => {
        // clear feedback
        this.usernameField.current.setFeedback("");
        this.passwordField.current.setFeedback("");
        // check if all fields are valid
        if(this.usernameField.current.getVal().length === 0) {
            this.usernameField.current.setFeedback("Username cannot be empty");
            return;
        }
        if(this.passwordField.current.getVal().length === 0) {
            this.passwordField.current.setFeedback("Password cannot be empty");
            return;
        }
        // call api to sign up
        let username = this.usernameField.current.getVal();
        let password = this.passwordField.current.getVal();
        // let res = await fetch("http://localhost:5000/login", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         username: username,
        //         password: password
        //     })
        // });
        // let data = await res.json();
        // console.log(data);

        if(username === "admin" && password === "admin") {
            this.props.login.setState({loggedIn: true});
            this.props.app.setUser("admin", "some session");
            return;
        }
        if(username === "user" && password === "user") {
            this.props.login.setState({loggedIn: true});
            this.props.app.setUser("user", "some session");
            return;
        }
        //this.usernameField.current.setFeedback("Invalid username or password");
        this.passwordField.current.setFeedback("Invalid username or password");
        return;

        // on success, redirect to overview
        this.props.login.setState({loggedIn: true});
    };

    render() {
        return (
            <div>
                <CustomFeedbackField ref={this.usernameField} type="text" placeholder="Username" />
                <CustomFeedbackField ref={this.passwordField} type="password" placeholder="Password" />
                <div className="basicButton" onClick={() => {this.login();}}>Login</div>
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
    }

    setFeedback(val) {
        this.setState({signupFeedback: val});
    }

    signUp() {
        // check if all fields are valid
        if(!this.usernameField.current.isValid()) {
            this.setFeedback("Invalid username");
            return;
        }
        if(!this.emailField.current.isValid()) {
            this.setFeedback("Invalid email");
            return;
        }
        if(!this.passwordField.current.isValid()) {
            this.setFeedback("Invalid password");
            return;
        }
        if(!this.passwordMatchField.current.isValid()) {
            this.setFeedback("Passwords do not match");
            return;
        }
        // get values
        let username = this.usernameField.current.getVal();
        let email = this.emailField.current.getVal();
        let password = this.passwordField.current.getVal();
        // call api to sign up
        // let res = await fetch("http://localhost:5000/signup", {
            // ...
        // });
        
        // let data = await res.json();

        this.props.login.setState({loggedIn: true});
        this.props.app.setUser(username, "some session");
        return;

        // on success, redirect to overview
    }

    render() {

        let {get, set} = createGetterSetterPair();

        return (
            <div>
                <UsernameFeedbackField ref={this.usernameField} type="text" placeholder="Username" />
                <EmailFeedbackField ref={this.emailField} type="text" placeholder="Email" />
                <PasswordFeedbackField ref={this.passwordField} setMyVal={set} type="password" placeholder="Password" />
                <PasswordMatchFeedbackField ref={this.passwordMatchField} getOtherVal={get} type="password" placeholder="Confirm Password" />
                <div className="signup-feedback">{this.state.signupFeedback}</div>
                <div className="basicButton" onClick={() => {this.signUp();}}>Sign up</div>

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
            <div className="login-container">
                {this.state.loggedIn ? <Navigate to="/overview" /> : null}
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

