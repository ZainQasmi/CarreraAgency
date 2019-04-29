import React, { Component } from "react";
import { Text } from "react-native";
import { Button, Card, CardSection, Input } from "./common";
import axios from "axios";

class RegistrationForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    error: ""
  };

  registerSuccess = () => {
    this.setState({
      error: "Registration Success! Redirecting to login...",
      loading: false,
      styleColor: styles.okTextStyle
    });
    setTimeout(() => {
      this.props.onRegister();
    }, 2000);
  };

  registerFail = msg => {
    console.log(msg);
    this.setState({
      error: msg,
      loading: false,
      styleColor: styles.errorTextStyle
    });
  };

  onRegisterButtonPress = () => {
    const { firstName, lastName, email, password } = this.state;

    let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let nameRegex = /^[a-zA-Z ]{2,30}$/;
    if (
      nameRegex.test(firstName) === false ||
      nameRegex.test(lastName) === false
    ) {
      this.setState({
        error: "Invalid Name",
        loading: false,
        styleColor: styles.errorTextStyle
      });
    } else if (emailRegex.test(email) === false) {
      this.setState({
        error: "Invalid Email",
        loading: false,
        styleColor: styles.errorTextStyle
      });
    } else {
      this.setState({ error: "", loading: true });

      axios
        .post("http://192.168.45.28:4000/users/register", {
          firstName: firstName,
          lastName: lastName,
          username: email,
          password: password
        })
        .then(response => {
          if (response.status === 200) {
            this.registerSuccess();
          }
        })
        .catch(error => {
          if (error.response.status === 400) {
            this.registerFail(error.response.data.message);
          }
        });
    }
  };

  renderButton() {
    return [
      <Button key={1} onPress={this.onRegisterButtonPress}>
        Register
      </Button>,
      <Button key={2} onPress={this.props.onCancel}>
        Cancel
      </Button>
    ];
  }

  render() {
    return (
      <React.Fragment>
        <Card>
          <CardSection>
            <Input
              label="First Name"
              value={this.state.firstName}
              onChangeText={text => this.setState({ firstName: text })}
            />
          </CardSection>

          <CardSection>
            <Input
              label="Last Name"
              value={this.state.lastName}
              onChangeText={text => this.setState({ lastName: text })}
            />
          </CardSection>

          <CardSection>
            <Input
              label="Email"
              value={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
          </CardSection>

          <CardSection>
            <Input
              secureTextEntry={true}
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

export default RegistrationForm;
