import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";

export default function Page() {
  return (
    <View style={styles.container}>
      <View style={styles.outer}>
        <ImageBackground
          source={{ uri: "https://example.com/background-image.jpg" }}
          style={styles.backgroundImage}
        >
          <View style={styles.main}>
            <Text style={styles.title}>My Journal</Text>
            <Text style={styles.subtitle}>Pages of Reflection.</Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  outer: {
    backgroundColor: "white",
    padding: 20,
    margin: 20,
    borderWidth: 1,
    borderColor: "black",
    marginTop: "20%",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
});
