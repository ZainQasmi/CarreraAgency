import React, { Component } from "react";
import { View, ActivityIndicator } from "react-native";

const Spinner = props => {
  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator size={props.size || "small"} />
    </View>
  );
};

const styles = {
  // make sure spinner is at center of screen
  spinnerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
};

export { Spinner };
