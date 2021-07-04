import React, { Component } from 'react'
import {Card, CardBody, Button, Form, FormGroup, Label, Input, FormText,
} from 'reactstrap';

import UserImg from "../../Assets/user.png"

import "./Login.css";

const passwordValidator = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password:'',
            passwordError: "",
            usernameError: "",
        };

        this.handleBlur = this.handleBlur.bind(this);
        this.handelUsername = this.handelUsername.bind(this);
        this.handelPassword = this.handelPassword.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.validateUsername = this.validateUsername.bind(this);
        this.validateField = this.validateField.bind(this);
    }

    componentDidMount(){
        
    }

    handelUsername = (text) => {
        const { name, value } = text.target;
        this.setState({
            username: text.target.value,
            [name]: value
        })
    };
      
    handelPassword = (text) => {
        const { name, value } = text.target;
        this.setState({
          password: text.target.value,
          [name]: value
        })
        console.log(text.target.value)
    };

    handleBlur(event) {
        const { name } = event.target;
    
        this.validateField(name);
        return;
    }

    validateField(name) {
        let isValid = false;
        if (name === "username") isValid = this.validateUsername();
        else if (name === "password") isValid = this.validatePassword();
        return isValid;
    }

    validateUsername() {
        let usernameError = "";
        const value = this.state.username;
        if(value.trim === "") usernameError = "Username is required";
        else if (value.length !== 6) usernameError = "Username should be 6 character"

        this.setState({
            usernameError
        });

        return usernameError === "";
    }

    validatePassword() {
        let passwordError = "";
        const value = this.state.password;
        if (value.trim === "") passwordError = "Password is required";
        else if (!passwordValidator.test(value) || value.length !== 8)
          passwordError =
            "Password should be 8 characters, including 1 number + 1 upper and 1 lowercase!";
    
        this.setState({
          passwordError
        });
        return passwordError === "";
    }


    handleSubmit = (e) => {
        e.preventDefault();
        
        let formFields = [
          "username",
          "password",
        ];
        let isValid = true;
        formFields.forEach(field => {
          isValid = this.validateField(field) && isValid;
        });
        if (isValid) {
          alert("Login Successfully")
        } else {
          alert("Login Failed")
        }
        
    };

    render(){
        return(
            <div className="main">
                <Card>
                    <CardBody>
                        <img src={UserImg} className="user-logo"></img>
                        <p className="login-text">Login Form</p>
                        <Form onSubmit={(e) => { this.handleSubmit(e) }}>
                            <FormGroup>
                                <Label for="exampleText">Username: </Label>
                                <Input type="text" name="username" id="username" placeholder="Add username" required
                                    onChange={(text) => { this.handelUsername(text) }}
                                    value={this.state.username}
                                    onBlur={this.handleBlur}
                                />
                                {this.state.usernameError && (
                                    <FormText className="errorMsg" color="danger">{this.state.usernameError}</FormText>
                                )}
                            </FormGroup>
                            
                            <FormGroup>
                                <Label for="examplePassword">Password: </Label>
                                <Input type="password" name="password" id="password" placeholder="Add password" required
                                    value={this.state.password}
                                    onChange={(text) => { this.handelPassword(text) }}
                                    onBlur={this.handleBlur}
                                />
                                {this.state.passwordError && (
                                    <FormText className="errorMsg" color="danger">{this.state.passwordError}</FormText>
                                )}
                            </FormGroup>
                            

                            <Button color="primary" size="lg" block>Log in</Button>
                        </Form>
                    </CardBody>
                </Card>
                
            </div>
        )
    }
}

export default Login;