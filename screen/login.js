import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Image, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { login } from "../Action";
import { SafeAreaView } from "react-native-safe-area-context";
import logo from "../assets/logo.jpg";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    try {
      const loggedIn = await localStorage.getItem("loggedIn");
      if (loggedIn === "true") {
        navigation.navigate("Main", { screen: "Home" });
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      if (response.status === 200) {
        const userdata = response?.data?.data?.[0];
        await localStorage.setItem("userId", userdata?.userid.toString());
        await localStorage.setItem("UserData", JSON.stringify(userdata));
        await localStorage.setItem("loggedIn", "true");
        navigation.navigate("Main", { screen: "Home" });
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const register = () => {
    navigation.navigate("Register");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.title}>Нэвтрэх</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Имайл оруулах"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Pressable style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Нэвтрэх</Text>
        </Pressable>
      </View>
      <Pressable onPress={register}>
        <Text style={styles.registerLink}>Бүртгэл үүсгэх үү?</Text>
      </Pressable>
    </SafeAreaView>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#F5F5F5",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    height: 120,
    width: width * 0.8,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  inputContainer: {
    width: "100%",
    padding: 20,
    elevation: 5,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerLink: {
    marginTop: 10,
    color: "#007BFF",
    textDecorationLine: "underline",
  },
});

export default LoginScreen;
