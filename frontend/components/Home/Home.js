import React from "react";
import { View, StyleSheet, SafeAreaView } from "react-native";
import { Text } from "react-native-paper";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Home - Outside.js</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFF", // Set the background color here
  },
});
