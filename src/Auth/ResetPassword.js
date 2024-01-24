import React, { useState } from 'react';
import Loader from '../Components/Loader';
import { View, TextInput, Text, StyleSheet, TouchableOpacity,ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ResetPassword = () => {

  const [errorValidate, setErrorValidate] = useState(false);
  const [cnic, setcnic] = useState('');
  const [contact, setcontact] = useState('');
  const [loading, setloading] = useState(false);

  const navigation = useNavigation();

  const handleSubmitPress = () => {
    if (!cnic) {
      ToastAndroid.show('Please enter your CNIC', ToastAndroid.LONG);
      return;
    } else if (!contact) {
      ToastAndroid.show('Please enter your Contact', ToastAndroid.LONG);
      return;
    } else {
      // setloading(true);
      const requestData = { cnic, contact };

      setloading(true)
      fetch('https://bm.punjab.gov.pk/api/sendotpforresetpass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          // setloading(false);
          if (data.error) {
            // Show error message if the API response contains an error
            ToastAndroid.show(data.error, ToastAndroid.LONG);
          } else {
            console.log('Response:', data);
            navigation.navigate('OTPForResetPass', { userId: data.id });
          }
        })
        .catch((error) => {
          // setloading(false);
          console.error('Error sending OTP:', error);
          ToastAndroid.show('Error sending OTP. Please try again later.', ToastAndroid.LONG);
        });
    }
  }
  

  return (
    <View style={styles.container}>
         <Loader loading={loading} />
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Enter Details</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldHeading}>شناختی کارڈ:</Text>
        <TextInput
          style={[
            styles.inputField,
            {
              borderColor: !cnic && errorValidate ? 'red' : '#002D62', // Adjusted borderColor
            },
          ]}
          maxLength={13}
          keyboardType="numeric"
          placeholder="Enter CNIC"
          value={cnic}
          onChangeText={setcnic}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldHeading}> رابطہ نمبر:</Text>
        <TextInput
          style={[
            styles.inputField,
            {
              borderColor: !contact && errorValidate ? 'red' : '#002D62', // Adjusted borderColor
            },
          ]}
          keyboardType="numeric"
          maxLength={11}
          placeholder="Enter Contact Number"
          value={contact}
          onChangeText={setcontact}
        />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleSubmitPress}>
        <Text style={styles.loginButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  headingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#002D62',
  },
  fieldContainer: {
    width: '80%',
    marginBottom: 20,
  },
  fieldHeading: {
    // fontSize: 16,
    color: 'black',
    marginBottom: 5,
    fontWeight: "bold"
  },
  inputField: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#002D62', // Adjusted borderColor
    fontSize: 16,
    color: '#3f51b5',
    width: '100%',
    height: 45,
    paddingLeft: 10,
  },
  loginButton: {
    backgroundColor: '#002D62',
    padding: 10,
    borderRadius: 10,
    width: '50%',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ResetPassword;
