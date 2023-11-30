// import * as React from 'react';
// import * as React from 'react';
import { Checkbox } from 'react-native-paper';
import React, { useState, useRef } from 'react';
import Loader from '../Components/Loader';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  title,
  TouchableOpacity,
  ToastAndroid,
  Dimensions,
  Modal,
  loading,
  Image
} from 'react-native';

import { KeyboardAvoidingView, TextInput } from "react-native";
import pwdIMage from '../../assets/images/background.png';
import certificate from '../../assets/images/certificate.png';
import EncryptedStorage from 'react-native-encrypted-storage';
import syncStorage from 'react-native-sync-storage';

const Login = ({ navigation }) => {
  const firstTextInput = useRef(null);
  const secondTextInput = useRef(null);

  const [modalVisibleHelp, setModalVisibleHelp] = useState(false);
  const [errorValidate, setErrorValidate] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cnic, setCnic]              = useState('');
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState(false);

  const handleSubmitFirstTextInput = () => {
    // secondTextInput.current.focus();
  };

  const handleSubmitLogin = () => {
    console.log('cnic: ',email, 'password: ',password);
    onLoginPress();
  };

  const onLoginPress = () => {

    console.log('Cnic', email)
    console.log('Password', password)


    setErrorValidate(true);
    if (!email) {
      ToastAndroid.show('Please enter your cnic', ToastAndroid.LONG);
      return;
    } else if (!password) {
      ToastAndroid.show('Please enter your password', ToastAndroid.LONG);
      return;
    }
     else {
      setLoading(true);
      // Perform the login API call here
      fetch(
        `https://bm.punjab.gov.pk/api/LoginBMApi`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ cnic: `${email}`, password: `${password}` })
        },
      )
        .then(resp => resp.json())
        .then(response => {
          if (response.status == '200') {
            // Handle successful login
          // console.log('Login Response', response.user.id);
          const user = response.user.id != '' ? response.user.id : null;
          const name = response.user.name != '' ? response.user.name:null;
          const district_id = response.user.district_id != '' ? response.user.district_id:null;
          const tehsil_id = response.user.tehsil_id != '' ? response.user.tehsil_id:null;

          syncStorage.set('bmuser_id',user);
          navigation.navigate('Dashboard',{
              userId:user,
              Username:name,
              District:district_id,
              Tehsil:tehsil_id,
          });
          } else {
            // Handle login error
            ToastAndroid.show(response.message, ToastAndroid.LONG);
          }
        })
        .catch((error) => console.error(error))
        .finally(() => {
          setLoading(false);
        });
    }
    // navigation.navigate('Dashboard');
  };

  return (
    <View>
      <ImageBackground source={pwdIMage} style={{ width: '100%', height: '100%', opacity: 0.9, alignSelf: 'center' }}>
        <Loader loading={loading} />
        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.15,}}>
            {/* <View style={{ paddingTop: 20, width: '30%', marginLeft: '60%' }} > */}
              {/* <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={styles.buttonStyle}
                activeOpacity={0.5}>
                <Text style={[styles.text, { textAlign: 'center' }]}>
                  Register
                </Text>
              </TouchableOpacity> */}
            {/* </View> */}
          </View>
          <View style={{ flex: 0.75, }}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
            >
              <View style={{ padding: 40, flex: 1, justifyContent: 'center' }}>
                <KeyboardAvoidingView enabled>
                  <View style={{ width: '100%', backgroundColor: '#fff', height: 440, padding: 0, borderRadius: 10, }}>
                    <View style={[styles.loginFormView, {}]}>
                    <View style={{ backgroundColor: '#588739', borderTopRightRadius: 10, borderTopLeftRadius:10 }}>
                    <Text style={[styles.logoText, { textAlign: 'center', color: '#fff', fontWeight: 'bold', fontSize: 30, padding:15 }]}>Login</Text>
                    </View>

                      <View style={{paddingTop:20,paddingLeft:20,paddingRight:20}}>
                      <Text style={{ marginTop: 30, fontWeight: "bold", color: "#000000" }}>شناختی کارڈ/بے فارم:</Text>

                      <View style={{ marginTop: 10, backgroundColor: '#c0c0c0', borderRadius: 5, height: 40 }}>

                        <TextInput
                          placeholderTextColor='grey'
                          ref={firstTextInput}
                          maxLength={13}
                          keyboardType="numeric"
                          onSubmitEditing={handleSubmitFirstTextInput}
                          placeholder="شناختی کارڈ/ب فارم نمبر درج کریں"
                          placeholderColor="#c4c3cb"
                          style={[styles.loginFormTextInput
                            , { borderColor: !email && errorValidate ? 'red' : '#fff' }
                          ]}
                          placeholderStyle={{ paddingHorizontal: 20 }}
                          onChangeText={(email) => setEmail(email)}
                          value={email}
                        />

                      </View>
                      </View>             
                      <View style={{padding:20}}>
                      <Text style={{fontWeight: "bold", color: "#000000" }}>پاس ورڈ:</Text>
                      <View style={{ marginTop: 10, backgroundColor: '#c0c0c0', borderRadius: 5, height: 40 }}>
                        <TextInput
                          placeholderTextColor='grey'
                          ref={secondTextInput}
                          onSubmitEditing={handleSubmitLogin}
                          placeholder="پاس ورڈ"
                          placeholderColor="#c4c3cb"
                          autoCapitalize='none'
                          secureTextEntry={true}
                          onChangeText={(password) => setPassword(password)}
                          value={password}
                          style={[styles.loginFormTextInput, { borderColor: !password && errorValidate ? 'red' : '#fff' }]}
                        />
                      </View>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('ResetPass')}>
                        <Text style={[styles.passtext, { textAlign: 'left' }]}>آپ پاس ورڈ بھول گئے؟</Text>

                      </TouchableOpacity>
                      </View>
                     
                      <View style={{ padding: 20,paddingBottom:10, alignItems: 'center' }}>
                        <TouchableOpacity
                          onPress={onLoginPress}
                          style={styles.ButtonStyle}
                          activeOpacity={0.5}>
                          <Text style={[styles.text, { textAlign: 'center' }]}>Login</Text>
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Register')}>
                        <Text style={[styles.Text]}>بطور نیا صارف اندراج کریں</Text>

                      </TouchableOpacity>
                      <TouchableOpacity style={{ opacity: 0.8, alignItems: 'center',  height:45}}
                        onPress={() => setModalVisibleHelp(true)}
                        >
                      </TouchableOpacity>
                      {/* <Modal
                          animationType="fade"
                          transparent
                          visible={modalVisibleHelp}
                          onRequestClose={() => setModalVisibleHelp(false)}
                        >
                          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 }}>
                            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 20 }}>
                              <Text style={{ color: 'black', textAlign: "center", fontSize: 15, marginTop: 10 }}>
                              اگر آپ کے پاس معذوری سرٹیفیکیٹ ہے اور PCRDP نمبر اور CNIC نمبر موجود ہےتو اپنے CNIC کے ذریعے اس سسٹم میں لاگ ان کریں اور اگر آپ کو اپنا password بھول چکا ہے تو forget password پر کلک کر کے اپنا CNIC اور معذوری سرٹیفیکیٹ نمبر درج کر کے new password سیٹ کر سکتے ہیں۔ لاگ ان کرتے وقت اگر username یا password میں کوئی مشکل پیش آئے تو اپنے District Director سے رابطہ کریں۔
                              </Text>
                              <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                  onPress={this.handleSpeechForget}
                                  style={styles.SpeakButton}
                                  activeOpacity={0.5}>
                                  <Text style={[styles.text, { textAlign: 'center', color: '#fff' }]}>Speak 🔊</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={this.handleStopSpeechForget}
                                  style={styles.SpeakButton}
                                  activeOpacity={0.5}>
                                  <Text style={[styles.text, { textAlign: 'center', color: '#fff' }]}>Stop  🔇</Text>
                                </TouchableOpacity>
                              </View>
                              <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity
                                  style={styles.SpeakButton}
                                  activeOpacity={0.5}
                                  onPress={() => setModalVisibleHelp(false)}
                                >
                                  <Text style={[styles.text, { textAlign: 'center', color: '#fff', fontSize: 16, fontFamily: 'sans-serif' }]}>Skip</Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </Modal> */}
                    </View>
                  </View>
                </KeyboardAvoidingView>
              </View>
            </ScrollView>
          </View>
        </View>
      </ImageBackground>
    </View>

  );

}
const styles = StyleSheet.create({
  SpeakButton: {
    justifyContent: 'center',
    width: '35%',
    padding: 10,
    marginTop: 15,
    // marginLeft: '15%',
    flex: 1,
    marginRight: 5,
    borderRadius: 10,
    backgroundColor: '#002D62',
    color: '#fff'
  },
  closeIcon: {
    marginLeft: '90%'
  },
  loginFormTextInput: {

    flex: 1,
    color: 'black',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    // borderColor: '',

  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  buttonStyle: {
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    backgroundColor: '#002D62',
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontFamily: "sans-serif",

  },
  ButtonStyle: {
    justifyContent: 'center',
    width: '80%',
    padding: 8,
    // paddingVertical: 10,
    borderRadius: 10,
    // paddingHorizontal: 15,
    backgroundColor: '#588739',
  },
  Text: {
    color: 'black',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 14,
    // marginTop:5
  },
  passtext: {
    color: 'black',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 12,
    marginTop: 2,
    // marginTop:5
  },
  Boxtext: {
    color: '#002D62',
    textAlign: 'left',
    // marginLeft:-8,
    fontSize: 15,
  },
  Checkbox: {
    marginTop: 8,
  },
  smsimage: {
    
  },

});
export default Login;