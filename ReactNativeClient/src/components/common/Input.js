import React from "react";
import { View, TextInput, Text } from "react-native";

const Input = props => {
  return (
    <View style={styles.viewContainerStyle}>
      <Text style={styles.labelStyle}>{props.label}</Text>
      <TextInput
        secureTextEntry={props.secureTextEntry}
        placeholder={props.placeholder}
        autoCorrect={false}
        style={styles.inputStyle}
        value={props.value}
        onChangeText={props.onChangeText}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: "#000",
    paddingRight: 10,
    paddingLeft: 10,
    fontSize: 18,
    lineHeight: 23,
    flex: 4
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 2
  },
  viewContainerStyle: {
    height: 40,
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  }
};

export { Input };
