// import * as React from 'react';
// import * as React from 'react';
import {Checkbox} from 'react-native-paper';
import React, {useState, useRef, useEffect} from 'react';
import Loader from '../Components/Loader';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  title,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ToastAndroid,
  Keyboard,
  Dimensions,
  Modal,
  loading,
  Image,
} from 'react-native';

import {KeyboardAvoidingView, TextInput} from 'react-native';
import backimage from '../../assets/images/back.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import certificate from '../../assets/images/certificate.png';
import EncryptedStorage from 'react-native-encrypted-storage';
import syncStorage from 'react-native-sync-storage';
import baseUrl from '../Components/Url';

const Login = ({navigation}) => {
  const firstTextInput = useRef(null);
  const secondTextInput = useRef(null);

  const [isModalVisible, setModalVisible] = useState(false);
  const [errorValidate, setErrorValidate] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [cnic, setCnic] = useState('');
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);


  const handleSubmitFirstTextInput = () => {
    secondTextInput.current.focus();
    // secondTextInput.current.focus();
  };
  useEffect(() => {}, []);

  const handleSubmitLogin = () => {
    console.log('cnic: ', email, 'password: ', password);
    onLoginPress();
  };

  const onLoginPress = () => {
    console.log('Cnic', email);
    console.log('Password', password);
  
    setErrorValidate(true);
  
    if (!email) {
      ToastAndroid.show('Please enter your CNIC', ToastAndroid.LONG);
      return;
    } else if (!password) {
      ToastAndroid.show('Please enter your password', ToastAndroid.LONG);
      return;
    } else {
      setLoading(true);
  
      //  alert(baseUrl[0])
      // Perform the login API call here
      fetch(`${baseUrl[0]}/LoginBMApi`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ cnic: `${email}`, password: `${password}` }),
      })
        .then((resp) => resp.json())
        .then((response) => {

          console.log('Response', response)
          if (response.status == 200) {

            if(response.user.status != 1){

              const user_id  = response.user.id;
              const phone    = response.user.contact;

              console.log('Phone:',phone,'User ID:',user_id);
              fetch(`${baseUrl[0]}/resend-otp`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                },
                body: JSON.stringify({ user_id: `${user_id}`, phone: `${phone}` }),
              })
                .then((resp) => resp.json())
                .then((responseOTp) => {


                  console.log('OTP Response', responseOTp.cnic,responseOTp.otp);
                  // navigation.navigate('Login');
                  navigation.navigate('OTP',{
                    cnic:responseOTp.cnic,
                    code:responseOTp.otp
                  });
                })
               

            }else{

              
              
                const userRole = response.user.roles[0];
                console.log('Login BM APi Role', userRole)
                
                const user          = response.user.id != '' ? response.user.id : null;
                const name          = response.user.name != '' ? response.user.name : null;
                const district_id   = response.user.district != '' ? response.user.district : null;
                const tehsil_id     = response.user.tehsil != '' ? response.user.tehsil : null;
                const cnic          = response.user.cnic != '' ? response.user.cnic : null;
      
                syncStorage.set('bmuser_id', user);
      
                // role is chairman 
                if (userRole == 'Chairman') {
                  navigation.navigate('ChairmanDashboard', {
                    userId: user,
                    Username: name,
                    District: district_id,
                    Tehsil: tehsil_id,
                  });
                }
                else if (userRole == 'member') {
                  navigation.navigate('MemberDashboard', {
                    userId: user,
                    Username: name,
                    District: district_id,
                    Tehsil: tehsil_id,
                  });
                } else {
                  // Default navigation for other roles
                  navigation.navigate('Dashboard', {
                    userId: user,
                    Username: name,
                    District: district_id,
                    Tehsil: tehsil_id,
                    Cnic:cnic
                  });
                }
                setModalVisible(false);
            } 
          }else {
            // Handle login error
            ToastAndroid.show(response.message, ToastAndroid.LONG);
          } 
        })
        .catch((error) => console.error(error))
        .finally(() => {
          setLoading(false);
        });
    }
  };
  
  const handleCloseModal = () => {
    Keyboard.dismiss(); // Dismiss the keyboard and remove focus
    setModalVisible(false);
  };
  
  const resetModalState = () => {
    Keyboard.dismiss(); // Dismiss the keyboard and remove focus
    setEmail('');
    setPassword('');
    setErrorValidate(false);
  };
  

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setErrorValidate(false);
  };


  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{flex: 1}}>
        <ImageBackground
          source={backimage}
          style={styles.backgroundimage}
          resizeMode="stretch">
          <Loader loading={loading} />
          <View style={styles.buttonviewstyle}>
            <TouchableOpacity onPress={toggleModal} style={styles.button1}>
              <Text style={styles.buttontext}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Register')}
              style={styles.button2}>
              <Text style={styles.buttontext}>Applicant Register</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <Modal
          animationType="fade"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={handleCloseModal}
        >
          <View style={[styles.modalContainer, { padding: 20 }]}>
            <View style={styles.closeButtonContainer}>
              {/* <TouchableOpacity
                style={styles.closeButton}
                onPress={handleCloseModal}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity> */}
            </View>

            <View style={styles.loginboxview}>
            <View style={styles.headerContainer}>
  <View style={styles.greenview}>
    <Text style={styles.loginText}>Login</Text>
  </View>
  <View style={styles.closeButtonContainer}>
    <TouchableOpacity
      style={styles.closeButton}
      onPress={handleCloseModal}
    >
      <Text style={styles.closeButtonText}>✕</Text>
    </TouchableOpacity>
  </View>
</View>


              <View style={styles.inputfieldparentview}>
                <Text style={styles.inputfieldheadingview1}>
                  شناختی کارڈ/بے فارم:
                </Text>

                <View style={styles.textinputview}>
                  <TextInput
                    placeholderTextColor="grey"
                    ref={firstTextInput}
                    maxLength={13}
                    keyboardType="numeric"
                    onSubmitEditing={handleSubmitFirstTextInput}
                    placeholder="شناختی کارڈ/ب فارم نمبر درج کریں"
                    placeholderColor="#c4c3cb"
                    style={[
                      styles.loginFormTextInput,
                      { borderColor: !email && errorValidate ? 'red' : '#fff' },
                    ]}
                    placeholderStyle={{ paddingHorizontal: 20 }}
                    onChangeText={email => setEmail(email)}
                    value={email}
                  />
                </View>
              </View>

              <View style={{ padding: 20 }}>
                <Text style={styles.inputfieldheadingview1}>پاس ورڈ:</Text>

                <View style={styles.textinputview}>
                  <TextInput
                    placeholderTextColor="grey"
                    ref={secondTextInput}
                    onSubmitEditing={handleSubmitLogin}
                    placeholder="پاس ورڈ"
                    placeholderColor="#c4c3cb"
                    autoCapitalize="none"
                    secureTextEntry={!showPassword}
                    onChangeText={text => setPassword(text)}
                    value={password}
                    style={[
                      styles.loginFormTextInput,
                      { borderColor: !password && errorValidate ? 'red' : '#fff' },
                    ]}
                  />
                </View>

                <TouchableOpacity onPress={() => navigation.navigate('ResetPass')}>
                  <Text style={[styles.passtext, { textAlign: 'left' }]}>
                    آپ پاس ورڈ بھول گئے؟
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={{ padding: 20, paddingBottom: 10, alignItems: 'center' }}>
                <TouchableOpacity onPress={onLoginPress} style={styles.ButtonStyle} activeOpacity={0.5}>
                  <Text style={[styles.text, { textAlign: 'center' }]}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  greenview: {
    backgroundColor: '#3a4e35',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  backgroundimage: {
    width: null,
    height: null,
    flex: 1,
  },
  loginboxview: {
    width: '100%',
    backgroundColor: '#fff',
    height: 440,
    padding: 0,
    borderRadius: 10,
    opacity: 0.9,
  },
  loginheading: {},
  buttonviewstyle: {
    position: 'absolute',
    bottom: '20%',
    width: '100%',
    paddingHorizontal: '5%',
  },
  buttontext: {
    color: 'white',
    fontSize: 15,
  },
  button1: {
    borderRadius: 5,
    width: '40%',
    alignSelf: 'center',
    marginBottom: '5%',
    backgroundColor: '#3a4e35',
    padding: '2%',
    alignItems: 'center',
  },
  button2: {
    borderRadius: 5,
    width: '60%',
    alignSelf: 'center',
    marginBottom: '5%',
    backgroundColor: '#3a4e35',
    padding: '2%',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalText: {
    fontSize: 20,
    color: 'white',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  loginFormTextInput: {
    flex: 1,
    color: 'black',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    padding: 10,
    // color: '#fff',
    // borderColor: '',
  },
  eyeIcon: {
    padding: 10,
  },
  loginButton: {
    backgroundColor: '#588739',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,

  },
  closeButtonContainer: {
    position: 'absolute',
    top: '20%',
    right: 10,
    zIndex: 1,
    height:30,
    width:20
  },
  closeButton: {
    backgroundColor: '#fff',
    padding: 5,
    borderRadius: 50,
    // marginTop:'20%'
  },
  closeButtonText: {
    color: '#000',
    fontSize: 10, // Adjust the font size as needed
  },
    
  text: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'sans-serif',
  },
  loginText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    padding: 15,
  },
  inputfieldparentview: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  inputfieldheadingview1: {
    marginTop: 30,
    fontWeight: 'bold',
    color: '#000000',
  },
  textinputview: {
    marginTop: 10,
    backgroundColor: '#c0c0c0',
    borderRadius: 5,
    height: 40,
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Center items vertically
  },
  passtext: {
    color: 'black',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 12,
    marginTop: 2,
    // marginTop:5
  },
  ButtonStyle: {
    justifyContent: 'center',
    width: '70%',
    padding: 8,
    // paddingVertical: 10,
    borderRadius: 5,
    // paddingHorizontal: 15,
    backgroundColor: '#3a4e35',
  },
});
export default Login;
