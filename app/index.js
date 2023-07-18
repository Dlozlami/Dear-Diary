import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";

export default function Page() {
  return ( 
    <ImageBackground
          source={{ uri: "../assets/hardcover.jpg" }}
          style={styles.backgroundImage}
        >
        <View style={styles.container}>
          <View style={styles.outer}>
          
              <View style={styles.main}>
                <Text style={styles.title}>My Journal</Text>
                <Text style={styles.subtitle}>Pages of Reflection.</Text>
              </View>
            
          </View>
        </View>
    </ImageBackground>
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
    borderWidth: 3,
    borderColor: "black",
    padding: 10,
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 24,
    color: "#38434D",
  },
  outer: {
    backgroundColor: "white",
    padding: 5,
    margin: 20,
    marginTop: "20%",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
});
