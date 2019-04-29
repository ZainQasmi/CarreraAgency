import React, { Component } from "react";
import { View } from "react-native";
import { Header, Button, Spinner, CardSection } from "./components/common";
import LoginForm from "./components/LoginForm";
import AlbumList from "./components/AlbumList";
import RegistrationForm from "./components/RegistrationForm";

class App extends Component {
  state = { loggedIn: "LoginPage", currentUser: "" };

  homePage = response => {
    const currUser = response.data.firstName + " " + response.data.lastName;
    this.setState({ loggedIn: "Home", currentUser: currUser });
  };

  loginPage = () => {
    this.setState({ loggedIn: "LoginPage" });
  };

  loginPageAfterRegistration = () => {
    this.setState({
      loggedIn: "LoginPage"
    });
  };

  registrationPage = () => {
    this.setState({ loggedIn: "RegisterPage" });
  };

  renderContent() {
    switch (this.state.loggedIn) {
      case "Home":
        return (
          <React.Fragment>
            <Header>Welcome {this.state.currentUser}!</Header>
            <CardSection>
              <Button onPress={this.loginPage}>Log Out</Button>
            </CardSection>
            <AlbumList />
          </React.Fragment>
        );
      case "LoginPage":
        return [
          <Header key={1}>Authentication</Header>,
          <LoginForm
            key={2}
            logIn={this.homePage}
            registerMe={this.registrationPage}
          />
        ];
      case "RegisterPage":
        return [
          <Header key={1}>Register</Header>,
          <RegistrationForm
            key={2}
            onRegister={this.loginPageAfterRegistration}
            onCancel={this.loginPage}
          />
        ];
    }
  }

  render() {
    return <View style={{ flex: 1 }}>{this.renderContent()}</View>;
  }
}

export default App;
