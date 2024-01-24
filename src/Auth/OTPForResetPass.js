import React, {useState, useRef} from 'react';
import Loader from '../Components/Loader';
import {
  View,
  TextInput,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Dimensions,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import backimage from '../../assets/images/bait-ul-mall.png';

const OTPForResetPass = () => {
  const screenWidth = Dimensions.get('window').width;
  //height and width of logo adjusting from here//
  const imageWidth = screenWidth * 0.5;
  const imageHeight = imageWidth; 
  const [loading, setLoading] = useState(false);
  const [otp, setOTP] = useState('');
  const inputsRef = [useRef(), useRef(), useRef(), useRef(), useRef()];

  const navigation = useNavigation();
  const route = useRoute();

  const handleOTPVerification = () => {
    // Check if otp is empty
    if (!otp) {
      ToastAndroid.show('Kindly fill in the OTP field', ToastAndroid.LONG);
      return;
    }else{


  
    const requestData = {
      id: route.params.userId,
      code: otp,
    };
  
    setLoading(true);
    fetch('https://bm.punjab.gov.pk/api/passverifyOtp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(requestData),
    })
      .then(response => response.json())
      .then(data => {
        console.log('API Response:', data);
        if (data.check) {
          ToastAndroid.show('OTP verified successfully', ToastAndroid.LONG);
  
          navigation.navigate('ChangePassword', { userId: route.params.userId });
        } else {
          // Show error message if OTP verification fails
          ToastAndroid.show('Kindly provide correct OTP', ToastAndroid.LONG);
        }
      })
      .catch(error => {
        // setLoading(false);
        console.error('Error verifying OTP:', error);
        ToastAndroid.show(
          'Error verifying OTP. Please try again later.',
          ToastAndroid.LONG,
        );
      }).finally(() => {
  
        setLoading(false);
      }
      );
    }
  };
  
  const handleInputChange = (index, value) => {
    setOTP(prevOTP => {
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
      <Loader loading={loading} />
      <View style={styles.section1}>
        <Image
          source={backimage}
          style={{
            width: imageWidth,
            height: imageHeight,
            resizeMode: 'cover',
            
          }}
        />
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
              style={[
                styles.otpInputField,
                otp.length === index ? styles.otpInputActive : null,
              ]}
              value={otp[index] || ''}
              maxLength={1}
              onChangeText={text => handleInputChange(index, text)}
              keyboardType="numeric"
            />
          ))}
      </View>
      <TouchableOpacity
        style={styles.verifyButton}
        onPress={handleOTPVerification}>
        <Text style={styles.verifyButtonText}>Verify OTP</Text>
      </TouchableOpacity>
      <View style={styles.bottomTextContainer}>
        <Text style={styles.bottomText}>OTP will be sent to your device</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
    fontStyle: 'CenturyGothic',
    color: '#002D62',
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
    marginTop: '10%',
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

export default OTPForResetPass;
