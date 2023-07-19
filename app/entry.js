import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, TextInput, Pressable, Modal,KeyboardAvoidingView } from 'react-native';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function Entry() {
  const postEndpoint = 'http://10.255.66.152:8080/api/entries';

  const [entry, setEntry] = useState('');
  const [email, setEmail] = useState('');
  const [nextEntry, setNextEntry] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [saved, setSaved] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const navigation = useNavigation();

  const handleSave = async () => {
    checkJWTAndSetEmail();
    try {
      // Disable the button
      setButtonDisabled(true);
      const today = new Date();

      const response = await axios.post(postEndpoint, {
        entry,
        today,
        email,
      });

      // Handle successful signup response here
      console.log(response.data);

      // Reset form fields
      setEntry('');
      // Show success modal
      setSaved(true);
      setModalVisible(true);
    } catch (error) {
      // Handle error during signup here
      console.error(error);

      // Show error modal
      setSaved(false);
      setModalVisible(true);
    } finally {
      // Enable the button
      setButtonDisabled(false);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const checkJWTAndSetEmail = async () => {
    try {
      const jwt = await AsyncStorage.getItem('DiaryJWT');
      console.log('its here instead')
      if (jwt) {
        // Decode the JWT to get the email address
        const decodedToken = jwt_decode(jwt);
        const emailFromToken = decodedToken.email;
        
        // Set the email state with the extracted email address
        setEmail(emailFromToken);
      } 
    } catch (error) {
      console.error('Error retrieving JWT:', error);
    }
  };


  return (
    <ImageBackground
      source={{ uri: '../assets/bgInside.svg' }}
      style={{width: '100%', height: '100%'}}
    >
      <View style={styles.centerForm}>
      <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'android' ? 'padding' : undefined}
          keyboardVerticalOffset={Platform.OS === 'android' ? 40 : 0} // Adjust the offset as needed
        >
        <ScrollView style={styles.container}>
          <Text style={styles.heading}>Journal Entry #{nextEntry}</Text>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="What are you feeling"
              placeholderTextColor="gray" // Add this to change the placeholder text color if desired
              textAlignVertical="top" // Add this to set the text alignment to top
              multiline={true} // Add this to allow multiple lines of text
              value={entry}
              onChangeText={text => setEntry(text)}
            />
            </View>
            <Pressable
              style={[styles.button, isButtonDisabled && styles.disabledButton]}
              onPress={handleSave}
              disabled={isButtonDisabled}
            >
              <Text style={styles.buttonText}>Save</Text>
            </Pressable>
          </View>
        </ScrollView>
        </KeyboardAvoidingView>
      </View>

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              {saved ? 'Entry save!' : 'Save Failed! Please try again.'}
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
    padding: 20,
    margin: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    width:320
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  formContainer: {
    width: '100%',
    flex:0.5
  },
  inputContainer: {
    marginBottom: 15,
    justifyContent: 'flex-start',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    justifyContent: 'flex-start',
    height: 500,
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
