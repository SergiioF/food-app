import React, { useState, useEffect } from "react";
import {
  View,
  AsyncStorage,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

import * as Facebook from "expo-facebook";

import logo from "../../../assets/bag.png";

export default function Login({ navigation }) {

  async function facebookLogIn() {
    await Facebook.initializeAsync("611020086168371");
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: [
          "public_profile",
          "email",
          "user_age_range",
          "user_gender",
          "user_location",
          "user_birthday",
        ],
      });
      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,birthday,age_range,gender,location,picture.height(500)`
        )
          .then((response) => response.json())
          .then((data) => {
            AsyncStorage.setItem("name", JSON.stringify(data));
            navigation.navigate("Home");
          })
          .catch((e) => console.log(e));
      } else {
        // type === 'cancel'
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  }

  return (
    <KeyboardAvoidingView
      enabled={Platform.OS === "ios"}
      behavior="padding"
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" backgroundColor="#eff1f2" />
      <Image source={logo} style={styles.image} />
     
      <TouchableOpacity style={styles.loginBtn} onPress={facebookLogIn}>
        <Text style={{ color: "#fff" }}>Login with Facebook</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginTop: 30,
  },
  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8,
  },
  image: {
    width: 64,
    height: 64,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    height: 44,
    marginBottom: 20,
    borderRadius: 2,
  },
  button: {
    height: 42,
    backgroundColor: "#009ec6",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
    marginVertical: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginBtn: {
    backgroundColor: "#4267b2",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    top: 20,
    marginVertical: 5,
  },
  logoutBtn: {
    backgroundColor: "grey",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    position: "absolute",
    bottom: 0,
  },
});
