import React, { useState } from 'react';
import Loader from '../Components/Loader';
import { View, TextInput, Text, StyleSheet, TouchableOpacity,ToastAndroid } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useRoute from react-navigation/native


const ChangePassword = () => {
  const [loading, setloading] = useState(false);
  const [confirmpassword, setconfirmpassword] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();
  const route = useRoute();


const handleSubmitPress = () => {
  // Check if passwords match
  if (password !== confirmpassword) {
    ToastAndroid.show('Passwords do not match', ToastAndroid.LONG);
    return;
  }
  // else if(!password ){
  //   ToastAndroid.show('Please enter your Password', ToastAndroid.LONG);
  //   return;
  // }

  const requestData = {
    id: route.params.userId,
    password: password,
    password_confirmation: confirmpassword,
  };
  setloading(true);
  fetch('https://bm.punjab.gov.pk/api/newpass', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('API Response:', data); 
      if (data.message === 'Password changed') {
        ToastAndroid.show('Password changed successfully', ToastAndroid.LONG);
        // Navigate to the Login screen after successful password change
        navigation.navigate('Login');
      } else {
        ToastAndroid.show('Password change failed', ToastAndroid.LONG);
      }
    })
    .catch((error) => {
      setloading(false);
      console.error('Error changing password:', error);
      ToastAndroid.show('Error changing password. Please try again later.', ToastAndroid.LONG);
    });
};


  return (
    <View style={styles.container}>
        <Loader loading={loading} />
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Enter New Password</Text>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldHeading}> اپنا نیا پاس ورڈ درج کریں:</Text>
        <TextInput
          style={styles.inputField}
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldHeading}>  اپنے نئے پاس ورڈ کی تصدیق کریں:</Text>
        <TextInput
          style={styles.inputField}
          secureTextEntry={true}
          value={confirmpassword}
          onChangeText={setconfirmpassword}
        />
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleSubmitPress}>
        <Text style={styles.loginButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    section1: {
    flexDirection: 'row',
    // backgroundColor: '#f2f2f2',
    color: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },

    padding: 25,
    width: '100%',
    paddingStart: 20,
    paddingEnd: 20,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subView: {
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    elevation: 10,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  subViewIcon: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: '#fff',
    height: '100%',
    elevation: 10,
    // borderRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  subViewText: {
    flex: 1,
    backgroundColor: '#002D62',
    width: '100%',
    elevation: 10,
    shadowColor: '#000',
    borderTopLeftRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    flexDirection: 'row',
  },
  text1: {
    fontSize: 25,
    display: 'flex',
    justifyContent: 'center',
    color: '#fff',
  },
  eCatalogText: {
    flex: 1,
    color: '#fff',
    textAlign: 'center',
    fontSize: 30,
    textShadowColor: '#fff',
    textShadowRadius: 5,
    fontFamily: 'CenturyGothic',
  },
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
    borderColor: '#002D62',
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

export default ChangePassword;
