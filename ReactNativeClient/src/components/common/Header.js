/* eslint-disable quotes */

// Import libraries for making a component
import React from "react";
import { Text, View } from "react-native";

const Header = props => {
  const { textStyle, viewStyle } = styles;
  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.children}</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: "#F8F8F8",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    paddingTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    elevation: 2,
    position: "relative"
  },
  textStyle: {
    fontSize: 20
    // justifyContent: "center"
  }
};

// Make the component available to otehr parst of app
export { Header };
