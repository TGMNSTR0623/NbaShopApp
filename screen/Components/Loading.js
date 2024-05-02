import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

const IsLoadingComponent = ({ isLoading }) => {
  return (
    <View style={styles.container}>
      {isLoading === true ? <ActivityIndicator size="large" /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default IsLoadingComponent;
