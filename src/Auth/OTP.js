import React, { useState, useRef } from 'react';
import {Image, View,ToastAndroid, TextInput, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Loader from '../Components/Loader';
import IconSecond from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import backimage from '../../assets/images/bait-ul-mall.png';
import baseUrl from '../Components/Url';

const OTPScreen = ({route}) => {
  const screenWidth = Dimensions.get('window').width;
  //height and width of logo adjusting from here//
  const imageWidth = screenWidth * 0.5;
  const imageHeight = imageWidth; 
 
  const [otp, setOTP] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const inputsRef = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ]; // References for 5 OTP input fields

  const navigation = useNavigation();


  const handleOTPVerification = () => {
    if (!otp.trim()) {
      setErrorMessage('Please enter the OTP'); // Set the error message
      return;
    }

    
    // Clear the error message
    setErrorMessage('');
    // setLoading(true);
    console.log(
     'CNic', route.params.cnic,
     'otp', otp,
     'otpfromnaviagte',route.params.code
    )
    if(route.params.code != otp){
      ToastAndroid.show('Incorrect OTP', ToastAndroid.LONG);
       return;
    }else{

      setLoading(true)
      fetch(`${baseUrl[0]}/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ cnic:`${route.params.cnic}`,code: `${otp}` }),
      })
        .then((resp) => resp.json())
        .then((response) => {
          console.log('otp check ', response);
          ToastAndroid.show('Otp verified successfully!', ToastAndroid.LONG);
          navigation.navigate('Login');
        })
        .catch((error) => {
   
          console.error('Error verifying OTP:', error);
        }).finally(() => {
  
          setLoading(false);
        }
        );
    }
     
  };
  

  const handleInputChange = (index, value) => {
    setOTP((prevOTP) => {
      const newOTP = prevOTP.split('');
      newOTP[index] = value;
      return newOTP.join('');
    });

    if (value && index < 4) {
      inputsRef[index + 1].current.focus();
    } else if (!value && index > 0) {
      inputsRef[index - 1].current.focus();
    }
  };

  return (
    <View style={styles.container}>
          <Loader loading={loading} />
        {/* <View style={styles.section1}>
          <View style={styles.subView}>
            <View style={styles.subViewText}>
              <Text adjustsFontSizeToFit style={styles.eCatalogText}>
                OTP
              </Text>
            </View>
            <View style={styles.subViewIcon}>

            </View>
          </View>
        </View> */}
         <View style={styles.section1}>
        {/* <Image
          source={backimage}
          style={{
            width: imageWidth,
            height: imageHeight,
            resizeMode: 'cover',
            color:'#588739'
            
          }}
        /> */}
      </View>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Code Verification</Text>
      </View>
      <View style={styles.otpInputContainer}>
        {Array(5)
          .fill()
          .map((_, index) => (
            <TextInput
              key={index}
              ref={inputsRef[index]}
              style={[styles.otpInputField, otp.length === index ? styles.otpInputActive : null]}
              value={otp[index] || ''}
              maxLength={1}
              onChangeText={(text) => handleInputChange(index, text)}
              keyboardType="numeric"
            />
          ))}
      </View>
      <Text style={styles.errorText}>{errorMessage}</Text>
      <TouchableOpacity style={styles.verifyButton} onPress={handleOTPVerification}>
        <Text style={styles.verifyButtonText}>Verify OTP</Text>
      </TouchableOpacity>
      <View style={styles.bottomTextContainer}>
        <Text style={styles.bottomText}>OTP will be sent to your device</Text>
      </View>
      {/* <TouchableOpacity style={styles.resendButton}>
        <Text style={styles.resendButtonText}>Resend OTP</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  bottomTextContainer: {
    position: 'absolute', // Position the text at the bottom
    bottom: 40, // Adjust the bottom value as needed for proper positioning
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 16,
    color: '#002D62',
    fontStyle: 'CenturyGothic',
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    marginBottom: 30,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle:'CenturyGothic',
    color: '#588739',
  },
  otpInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  otpInputField: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#002D62',
    fontSize: 24,
    color: '#3f51b5',
    width: 40,
    height: 50,
    textAlign: 'center',
  },
  otpInputActive: {
    borderColor: '#ff9800', // Change border color for the active input
  },
  verifyButton: {
    backgroundColor: '#002D62',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resendButton: {
    marginTop: 10,
  },
  resendButtonText: {
    color: '#002D62',
    textDecorationLine: 'underline',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
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
});

export default OTPScreen;
