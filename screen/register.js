import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller, handleSubmit } from "react-hook-form";
import { register } from "../Action";

const RegisterScreen = () => {
  const {
    control,
    handleSubmit,
    // formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.email = parseInt(data.email);
    data.usertypeid = parseInt(data.usertypeid);
    try {
      const response = await register(data);
      console.log("Registration successful:", response.data);
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Бүртгүүлэх</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Хэрэглэгчийн нэр"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="firstname"
          defaultValue=""
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="username"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="username"
          defaultValue=""
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, number } }) => (
            <TextInput
              style={styles.input}
              placeholder="phonenumber"
              onBlur={onBlur}
              onChangeText={onChange}
              value={number}
              keyboardType="numeric"
            />
          )}
          name="phonenumber"
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              textContentType="password"
              secureTextEntry
            />
          )}
          name="password"
        />
        <Button title="Бүртгүүлэх" onPress={handleSubmit(onSubmit)} />
      </form>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
export default RegisterScreen;