import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, Pressable,TextInput, Modal } from 'react-native';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const postEndpoint = 'http://10.255.66.152:8080/api/login';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [userDetails, setUserDetails] = useState(null); // State to hold user details from JWT

  // Function to handle logout
  const handleLogout = async () => {
    await AsyncStorage.removeItem('DiaryJWT');
    setUserDetails(null);
  };

  useEffect(() => {
    // Check for the JWT in AsyncStorage when the component mounts
    const fetchJWTFromStorage = async () => {
      try {
        const jwt = await AsyncStorage.getItem('DiaryJWT');
        if (jwt) {
          // Decode the JWT to get the user details
          const decoded = jwt_decode(jwt);
          setUserDetails(decoded);
        }
      } catch (error) {
        console.error('Error fetching JWT from AsyncStorage:', error);
      }
    };

    fetchJWTFromStorage();
  }, []);

  const handleLogin = async () => {
    try {
      // Disable the button
      setButtonDisabled(true);

      const response = await axios.post(postEndpoint, {
        email,
        password,
      });

      // Handle successful login response here

      // Store JWT securely using AsyncStorage
      const { jwt } = response.data; // Assuming the response data contains the JWT
      await AsyncStorage.setItem('DiaryJWT', jwt);

      // Decode the JWT to get the user details
      const decoded = jwt_decode(jwt);
      setUserDetails(decoded);

      // Reset form fields
      setEmail('');
      setPassword('');

      // Show success modal
      setLoginSuccess(true);
      setModalVisible(true);
    } catch (error) {
      // Handle error during login here
      console.error(error);

      // Show error modal
      setLoginSuccess(false);
      setModalVisible(true);
    } finally {
      // Enable the button
      setButtonDisabled(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  if (userDetails) {
    // If userDetails is available, show the Welcome back view
    return (
      <View style={styles.centerForm}>
        <View style={styles.container}>
          <Text style={styles.heading}>Welcome back, {userDetails.name}!</Text>
          <Text style={styles.subHeading}>Let's do some more reflecting.</Text>
          <View style={styles.formContainer}>
          <Pressable style={styles.button} onPress={handleLogout}>
            <Text style={styles.buttonText}>Log out</Text>
          </Pressable>
          </View>
        </View>
      </View>
    );
  }

  return (
    <ImageBackground source={require('../assets/bgInside.svg')} style={{width: '100%', height: '100%'}}>
      <View style={styles.centerForm}>
        <View style={styles.container}>
          <Text style={styles.heading}>Log into My Journal</Text>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={text => setEmail(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
              />
            </View>
            <Pressable
              style={[styles.button, isButtonDisabled && styles.disabledButton]}
              onPress={handleLogin}
              disabled={isButtonDisabled}
            >
              <Text style={styles.buttonText}>Log in</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {loginSuccess ? 'Login Successful!' : 'Login Failed! Please try again.'}
            </Text>
            <Pressable style={styles.okButton} onPress={closeModal}>
              <Text style={styles.okButtonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
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
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  centerForm: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  okButton: {
    backgroundColor: '#f3572a',
    borderRadius: 5,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  okButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
