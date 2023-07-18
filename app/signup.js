import { StyleSheet, Text, View, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';

export default function Signup() {
  return (
    <ImageBackground
      source={{ uri: '../assets/bg.jpg' }}
      style={styles.backgroundImage}
    >
    <View style={styles.centerForm}>
      <View style={styles.container}>
        <Text style={styles.heading}>Welcome to My Journal!</Text>
        <Text style={styles.subHeading}>Unleash Your Thoughts. Sign Up for My Journal Today!</Text>
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} placeholder="Enter your name" />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Surname</Text>
            <TextInput style={styles.input} placeholder="Enter your surname" />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} placeholder="Enter your email" />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} placeholder="Enter your password" secureTextEntry={true} />
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    margin: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#f3572a',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  centerForm:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});