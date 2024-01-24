import React, { useState } from 'react';
import Loader from '../Components/Loader';
import { View, TextInput, Text, StyleSheet,ImageBackground,TouchableWithoutFeedback,Keyboard,TouchableOpacity,ToastAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import backimage from '../../assets/images/back2.png';

const ResetPassword = () => {

  const [errorValidate, setErrorValidate] = useState(false);
  const [cnic, setcnic] = useState('');
  const [contact, setcontact] = useState('');
  const [loading, setloading] = useState(false);

  const navigation = useNavigation();

  const handleSubmitPress = () => {
    setErrorValidate(true);
    if (!cnic) {
      ToastAndroid.show('Please enter your CNIC', ToastAndroid.LONG);
      return;
    } else if (!contact) {
      ToastAndroid.show('Please enter your Contact', ToastAndroid.LONG);
      return;
    } else {
      setloading(true);
      const requestData = { cnic, contact };

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
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
<View style={{ flex: 1 }}>
 <ImageBackground source={backimage} style={styles.backgroundimage} resizeMode="stretch">
 <Loader loading={loading} />
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <View style={{ width: '95%', backgroundColor: '#fff', padding: 0, height: 450, borderRadius: 10,opacity:0.9}}>

       <View style={[styles.greenview]}>
                    <Text style={[styles.loginText]}>Reset Password</Text>
                    </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldHeading}>شناختی کارڈ:</Text>
        <View style={[styles.textinputview]}>
        <TextInput
          maxLength={13}
          keyboardType="numeric"
          placeholder="شناختی کارڈ/ب فارم نمبر درج کریں"
          placeholderTextColor="#808080" // Add this line to set the placeholder color
          value={cnic}
          placeholderStyle={{ paddingHorizontal: 20 }}
          onChangeText={setcnic}
          style={[
            styles.inputField,
            {
              borderColor: !cnic && errorValidate ? 'red' : 'white', // Adjusted borderColor
            },
          ]}
        />
        </View>
      </View>
      <View style={styles.fieldContainer}>
        <Text style={styles.fieldHeading}> رابطہ نمبر:</Text>
        <View style={[styles.textinputview]}>
        <TextInput
            keyboardType="numeric"
            maxLength={11}
            placeholder="اپنا موبائل نمبر درج کریں"
            placeholderTextColor="#808080" // Add this line to set the placeholder color
            value={contact}
            onChangeText={setcontact}
            style={[
              styles.inputField,
              {
                borderColor: !contact && errorValidate ? 'red' : 'white',
              },
            ]}
          />
        </View>
      </View>
      <View style={{ padding: 20,paddingBottom:10, alignItems: 'center' }}>
      <TouchableOpacity style={styles.ButtonStyle} onPress={handleSubmitPress}>
        <Text style={styles.loginButtonText}>Submit</Text>
      </TouchableOpacity> 
      </View>
    </View> 
  </View>
</ImageBackground>
</View>
</TouchableWithoutFeedback>   
  );
};

const styles = StyleSheet.create({
  backgroundimage:{
    width: null,
    height: null,
    flex: 1
  },
  greenview:{
    backgroundColor: '#3a4e35',
     borderTopRightRadius: 10, 
     borderTopLeftRadius:10
  },
  loginText:{
    textAlign: 'center',
    color: '#fff', 
    fontWeight: 'bold', 
    fontSize: 30, 
    padding:15
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
  textinputview:{
    marginTop: 10, 
    backgroundColor: '#c0c0c0', 
    borderRadius: 5, 
    height: 40,
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Center items vertically
  },
  fieldContainer: {
    paddingTop:20,
    paddingLeft:20,
    paddingRight:20
  },
  fieldHeading: {
    marginTop: 30, 
    fontWeight: "bold", 
    color: "#000000"
  },
  inputField: {
    flex: 1,
    color: 'black',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    padding: 10,
  },
  ButtonStyle: {
    justifyContent: 'center',
    width: '70%',
    padding: 8,
    marginTop:'5%',
    // paddingVertical: 10,
    borderRadius: 5,
    // paddingHorizontal: 15,
    backgroundColor: '#3a4e35',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ResetPassword;
