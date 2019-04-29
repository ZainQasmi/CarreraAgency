import React, { Component } from "react";
import { Text } from "react-native";
import { Button, Card, CardSection, Input, Spinner } from "./common";
import axios from "axios";

class LoginForm extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    loading: false,
    styleColor: ""
  };

  onLoginSuccess = response => {
    this.setState({
      error: "Authentication Success",
      loading: false,
      styleColor: styles.passTextStyle
    });
    this.props.logIn(response);
  };

  onLoginFail = () => {
    this.setState({
      error: "Authentication Failed",
      loading: false,
      styleColor: styles.errorTextStyle
    });
  };

  onLoginButtonPress = () => {
    const { email, password } = this.state;
    
    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailRegex.test(email) === false) {
      this.setState({
        error: "Invalid Email",
        loading: false,
        styleColor: styles.errorTextStyle
      });
    } else {
      this.setState({ error: "", loading: true });
      axios
        .post("http://192.168.45.28:4000/users/authenticate", {
          username: email,
          password: password
        })
        .then(response => {
          if (response.status === 200) {
            console.log(response);
            this.onLoginSuccess(response);
          }
        })
        .catch(error => {
          console.log(error.response.data.message);
          if (error.response.status === 400) {
            this.onLoginFail();
          }
        });
    }
  };

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }
    return [
      <Button key={1} onPress={this.onLoginButtonPress}>
        Login
      </Button>,
      <Button key={2} onPress={this.props.registerMe}>
        Register
      </Button>
    ];
  }

  render() {
    return (
      <React.Fragment>
        <Card>
          <CardSection>
            <Input
              placeholder="xyz@gmail.com"
              label="Email"
              value={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
          </CardSection>

          <CardSection>
            <Input
              secureTextEntry={true}
              placeholder="password"
              label="Password"
              value={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
          </CardSection>

          <CardSection>{this.renderButton()}</CardSection>
        </Card>

        <Text style={this.state.styleColor}>{this.state.error}</Text>
      </React.Fragment>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "red"
  },
  passTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "green"
  },
  okTextStyle: {
    fontSize: 20,
    alignSelf: "center",
    color: "orange"
  }
};

export default LoginForm;
