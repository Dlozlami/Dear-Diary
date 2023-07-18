import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Pressable, Modal } from 'react-native';
import axios from 'axios';

export default function Signup() {
  const postEndpoint = 'http://192.168.0.232:8080/api/users';

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const handleSignup = async () => {
    try {
      // Disable the button
      setButtonDisabled(true);

      const response = await axios.post(postEndpoint, {
        name,
        surname,
        email,
        password,
      });

      // Handle successful signup response here
      console.log(response.data);

      // Reset form fields
      setName('');
      setSurname('');
      setEmail('');
      setPassword('');

      // Show success modal
      setSignupSuccess(true);
      setModalVisible(true);
    } catch (error) {
      // Handle error during signup here
      console.error(error);

      // Show error modal
      setSignupSuccess(false);
      setModalVisible(true);
    } finally {
      // Enable the button
      setButtonDisabled(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

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
              <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={text => setName(text)}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Surname</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your surname"
                value={surname}
                onChangeText={text => setSurname(text)}
              />
            </View>
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
              onPress={handleSignup}
              disabled={isButtonDisabled}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {signupSuccess ? 'Signup Successful!' : 'Signup Failed! Please try again.'}
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
});
