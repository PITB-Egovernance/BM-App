/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import react from "react";
import { BlurView } from 'expo-blur';

import React, { useEffect, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
// import  from 'react';

import SplashScreen from 'react-native-splash-screen'
import {
  StyleSheet,
  onPress,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  ScrollView,
  Modal,
  Dimensions,
  Button

} from 'react-native';


import { Image } from "react-native";
// import pwdIMage from  '../pwd-app/assets/images/background.png';
import pwdIMage from '../../assets/images/background.png'
import regIMage from '../../assets/images/PWDREG-01.png';
import regIMage1 from '../../assets/images/DRTC-02.png';
import regIMage2 from '../../assets/images/TOAPP-03.png';
import regIMage3 from '../../assets/images/DRTC-03.png';
import regIMage4 from '../../assets/images/DRTC-05.png';
import regIMage5 from '../../assets/images/DRTC-04.png';
import sms from '../../assets/images/sms.png';
import regIMage9 from '../../assets/images/PWDfooter.png';
import regIMage10 from '../../assets/images/pitb.png';
import syncStorage from 'react-native-sync-storage';
import Tts from 'react-native-tts';
 import Icon from 'react-native-vector-icons/FontAwesome';

 import Footer from '../Components/Footer';



const FundApplication = ({ route, navigation }) => {
  const { width, height } = Dimensions.get('window');
  const [modalVisible, setModalVisible] = useState(false);
  const [id, setId] = useState('');
  // const [pwdpinfos_id, setpwdpinfos_id] = useState('');
  const [swonamev, setSwonamev] = useState('');
  const [status, setStatus] = useState('');
  const [status1, setStatus1] = useState('');
  const [min, setMin] = useState('');
  const [chk, setChk] = useState('');
  // const pwdpinfos_id = syncStorage.get('pwdinfo_id');
  const pwdInfoID = route.params.pwdInfoID == undefined && syncStorage.get('pwdinfo_id') == undefined ? syncStorage.get('pwdinfo_id') :
  route.params.pwdInfoID == undefined && syncStorage.get('pwdinfo_id') != undefined ? syncStorage.get('pwdinfo_id') :
    syncStorage.get('pwdinfo_id');
    
   console.log(pwdInfoID)
  useEffect(() => {
    checkStatusDetail();
    console.log('route.params.pwdInfoID', pwdInfoID);
    SplashScreen.hide();
    Tts.setDefaultLanguage('en-US');
    Tts.setDefaultRate(0.5);
    Tts.setDefaultPitch(1);
    handleSpeech = () => {
      Tts.speak('آپ کی درخواست جمع ہو چکی ہے جس کو آپ اس لِنک پر ٹریک کر سکتے ہیںyour Application has been submitted');
    }
    handleStopSpeech = () => {
      Tts.stop();
    }
  }, []);
  const checkStatusDetail = () => {
    fetch(`https://dpmis.punjab.gov.pk/api/app/formdrtc/${pwdInfoID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',

        'secret': 'f08md117'
      },
    })
      .then(respStatus => respStatus.json())
      .then(respStatus => {

        console.log('formdrtc', respStatus['formdrtc basic info'])
        if(respStatus['formdrtc basic info'] !=''){
        const id = respStatus['formdrtc basic info'][0].id;
        const swonamev = respStatus['formdrtc basic info'][0].swonamev;
        const status = respStatus['formdrtc basic info'][0].status;
        const status1 = respStatus['formdrtc basic info'][0].status1;
        const min = respStatus['formdrtc basic info'][0].min;
        const chk = respStatus['formdrtc basic info'][0].chk;

        console.log(respStatus['formdrtc basic info'][0])

        setId(id);
        setSwonamev(swonamev);
        setStatus(status);
        setStatus1(status1);
        setMin(min);
        setChk(chk);
        }
      })
  console.log('id is',id)
  }
  return (

    <View>

      <ImageBackground source={pwdIMage} style={{ width: '100%', height: '100%', opacity: 1 }}>

        <View>
          <Text style={[styles.buttonText, { fontWeight: "bold", fontSize: 22, paddingLeft: 70, paddingTop: 40, color: '#fff' }]}>DRTC Fund Application</Text>
        </View>

        <View style={{ padding: 1, flex: 1, justifyContent: 'center', paddingTop: '30%' }}>

          <View style={{ width: '100%', backgroundColor: '#fff', height: '90%', padding: 30, borderTopLeftRadius: 15, borderTopRightRadius: 15, opacity: 0.8, marginTop: '10%'  }}>

              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>
                {id != null && id != ''?
                  <View style={styles.row}>

                    <View style={{backgroundColor: 'green', height: 55, width: '82%', borderRadius: 10,justifyContent:'center', marginLeft: 25 }}>
                      <TouchableOpacity
                        //  onPress={RegFamily}
                        // onPress={() => navigation.navigate('DRTCstep1')}
                        style={[styles.button, { flexDirection: 'row',justifyContent:'center' }]}>
                        <Image source={regIMage} style={{ width: '18%', height: 40,marginLeft:'-19%'}} />
                        <View>
                          <Text style={[styles.buttonText,{marginTop:'8%',marginLeft:'4%'}]}>
                            Request For DRTC
                          </Text>
                        </View>
                      </TouchableOpacity>

                    </View>
                  </View>
                  :
                  <View style={styles.row}>

                    <View style={{ backgroundColor: '#003060', height: 55, width: '82%', borderRadius: 10,justifyContent:'center', marginLeft: 25 }}>

                      {/* onPress={() => navigation.navigate('FamilyDetails')}  */}
                      <TouchableOpacity
                        //  onPress={RegFamily}
                        onPress={() => navigation.navigate('DRTCstep1')}
                        style={[styles.button, { flexDirection: 'row',justifyContent:'center' }]}>
                        <Image source={regIMage} style={{ width: '18%', height: 40,marginLeft:'-19%' }} />
                        <View>
                          <Text style={[styles.buttonText, { marginLeft:'4%',marginTop:'8%' }]}>
                             Request For DRTC
                          </Text>
                        </View>
                      </TouchableOpacity>

                    </View>
                  </View>}
                {swonamev != ''& swonamev != null ?
                  <View style={{ backgroundColor: 'green', height: 55, width: '82%', borderRadius: 10, marginTop: 10, marginLeft: 25 }}>
                    <TouchableOpacity 
                    onPress={() => navigation.navigate('DRTCshow')}
                    >

                      <Image source={regIMage1} style={{ width: '45%', height: 50, marginTop: 5, marginLeft: -28 }} />
                      <View style={{ marginLeft: '22%', marginTop: '-20%' }}>
                        <Text style={[styles.buttonText,{ color: '#fff', fontSize: 16, fontFamily: 'sans-serif',marginTop:'3%',marginLeft:'4%' }]}>
                          Forwarding To SWO
                        </Text>
                      </View>
                    </TouchableOpacity>
                    {/* <TouchableOpacity>
                      <Image source={sms} style={styles.smsimage} />
                    </TouchableOpacity> */}
                  <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <View style={{marginTop:-45}}>
                      <Image source={sms} style={styles.smsimage}/>
                      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                      <Modal
                              //  transparent
                              animationType="fade"
                              transparent
                              visible={modalVisible}
                              onRequestClose={() => setModalVisible(false)}
                                // style={styles.modal}
            >
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'rgba(0,0,0,0.5)'}}>
              <View style={{ backgroundColor: 'white', padding: 20,borderRadius:20 }}>
              <TouchableOpacity
                    onPress={() => setModalVisible(false)}>
                    <Icon
                        style={styles.closeIcon}
                        name={'close'}
                        size={20}
                        color="#002D62"
                      />
             </TouchableOpacity>


                <Text style={{color:'black',textAlign:"center",fontSize:15,marginTop:20}}>' آپ کی درخواست جمع ہو چکی ہے جس کو آپ اس لِنک https://dpmis.punjab.gov.pk/statusپر ٹریک کر سکتے ہیں۔'</Text>
                <View style={{flexDirection:'row'}}>

<TouchableOpacity
     onPress={this.handleSpeech}
    style={styles.SpeakButton}
   activeOpacity={0.5}>
   <Text style={[styles.text,{textAlign:'center',color:'#002D62'}]}>Speak 🔊</Text>
   </TouchableOpacity>
   <TouchableOpacity
     onPress={this.handleStopSpeech}
    style={styles.SpeakButton}
   activeOpacity={0.5}>
   <Text style={[styles.text,{textAlign:'center',color:'#002D62'}]}>Stop  🔇</Text>
   </TouchableOpacity>
</View>
              </View>
              </View>

              {/* <View style={{marginBottom:10}}>
              <Button title="Skip" onPress={() => setIsModalVisible(false)} />
              </View> */}
            </Modal>

            </View>
                    </View>
                    </TouchableOpacity>
                  </View>
                  :
                  <View style={{ backgroundColor: '#003060', height: 55, width: '82%', borderRadius: 10, marginTop: 10, marginLeft: 25 }}>
                    <TouchableOpacity 
                    // onPress={() => navigation.navigate('DRTCshow')}
                    >

                      <Image source={regIMage1} style={{ width: '45%', height: 50, marginTop: 5, marginLeft: -28 }} />
                      <View style={{ marginLeft: '22%', marginTop: '-20%' }}>
                        <Text style={[styles.buttonText,{ color: '#fff', fontSize: 16, fontFamily: 'sans-serif',marginTop:'3%',marginLeft:'4%' }]}>
                        Forwarding To SWO
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image source={sms} style={styles.smsimage} />
                    </TouchableOpacity>

                  </View>}
                {status != '' & status != null ?
                  <View style={{ backgroundColor: 'green', height: 55, width: '82%', borderRadius: 10, marginTop: 10, marginLeft: 25 }}>
                    <TouchableOpacity onPress={onPress}>
                      <Image source={regIMage2} style={{ width: '30%', height: 40, marginTop: 10, marginLeft: -10 }} />
                      <View style={{ marginLeft: '22%', marginTop: '-15%' }}>
                        <Text style={[styles.buttonText,{ color: '#fff', fontSize: 16, fontFamily: 'sans-serif',marginTop:'3%',marginLeft:'4%' }]}>
                          SWO Verify Application
                        </Text>
                      </View>

                    </TouchableOpacity>
                  </View>
                  :
                  <View style={{ backgroundColor: '#003060', height: 55, width: '82%', borderRadius: 10, marginTop: 10, marginLeft: 25 }}>
                    <TouchableOpacity onPress={onPress}>
                      <Image source={regIMage2} style={{ width: '30%', height: 40, marginTop: 10, marginLeft: -10 }} />
                      <View style={{ marginLeft: '22%', marginTop: '-15%' }}>
                        <Text style={[styles.buttonText,{ color: '#fff', fontSize: 16, fontFamily: 'sans-serif',marginTop:'3%',marginLeft:'4%' }]}>
                          SWO Verify Application
                        </Text>
                      </View>

                    </TouchableOpacity>
                  </View>}
                {/* MSO Verification */}
                {status1 != '' & status1 != null ?
                  <View style={{ backgroundColor: 'green', height: 55, width: '82%', borderRadius: 10, marginTop: 10, marginLeft: 25 }}>
                    <TouchableOpacity onPress={onPress} style={styles.button}>
                      <Image source={regIMage3} style={{ width: '50%', height: 50, marginLeft: -30, marginTop: 5 }} />
                      <View style={{ marginLeft: '21%', marginTop: '-20%' }}>
                        <Text style={[styles.buttonText,{ color: '#fff', fontSize: 16, fontFamily: 'sans-serif',marginTop:'3%',marginLeft:'4%' }]}>
                          Shortlisting By  Committee
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View> :
                  <View style={{ backgroundColor: '#003060', height: 55, width: '82%', borderRadius: 10, marginTop: 10, marginLeft: 25 }}>
                    <TouchableOpacity onPress={onPress} style={styles.button}>
                      <Image source={regIMage3} style={{ width: '50%', height: 50, marginLeft: -30, marginTop: 5 }} />
                      <View style={{ marginLeft: '21%', marginTop: '-20%' }}>
                        <Text style={[styles.buttonText,{ color: '#fff', fontSize: 16, fontFamily: 'sans-serif',marginTop:'3%',marginLeft:'4%' }]}>
                        Shortlisting By  Committee
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>}

                {min != '' & min != null ?
                  <View style={{ backgroundColor: 'green', height: 55, width: '82%', borderRadius: 10, marginTop: 10, marginLeft: 25 }}>
                    <TouchableOpacity onPress={onPress} style={styles.button}>
                      <Image source={regIMage4} style={{ width: '32%', height: 40, marginTop: 5,marginLeft:'-3%' }} />
                      <View style={{ marginLeft: '22%', marginTop: '-15%' }}>
                        <Text style={[styles.buttonText,{ color: '#fff', fontSize: 16, fontFamily: 'sans-serif',marginTop:'7%',marginLeft:'4%' }]}>
                          Verification By DC
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View> :
                  <View style={{ backgroundColor: '#003060', height: 55, width: '82%', borderRadius: 10, marginTop: 10, marginLeft: 25 }}>
                    <TouchableOpacity onPress={onPress} style={styles.button}>
                      <Image source={regIMage4} style={{ width: '32%', height: 40, marginTop: 5,marginLeft:'-3%' }} />
                      <View style={{ marginLeft: '30%', marginTop: '-15%' }}>
                        <Text style={[styles.buttonText,{ color: '#fff', fontSize: 16, fontFamily: 'sans-serif',marginTop:'7%',marginLeft:'-5%' }]}>
                          Verification By DC
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>}
                {chk != '' & chk !=null ?
                  <View style={{ backgroundColor: 'green', height:55, width: '82%', borderRadius: 10, marginTop: 10, marginLeft: 25 }}>
                    <TouchableOpacity onPress={onPress} style={styles.button}>
                      <Image source={regIMage5} style={{ width: '25%', height: 40, marginTop: 5 }} />
                      <View style={{ marginLeft: '20%', marginTop: '-18%' }}>
                        <Text style={[styles.buttonText,{ color: '#fff', fontSize: 16, fontFamily: 'sans-serif',marginTop:'9%',marginLeft:'7%' }]}>
                          Cheque Issued
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View> :
                  <View style={{ backgroundColor: '#003060', height: 55, width: '82%', borderRadius: 10, marginTop: 10, marginLeft: 25 }}>
                    <TouchableOpacity onPress={onPress} style={styles.button}>
                      <Image source={regIMage5} style={{ width: '25%', height: 40, marginTop: 5 }} />
                      <View style={{ marginLeft: '20%', marginTop: '-18%' }}>
                        <Text style={[styles.buttonText,{ color: '#fff', fontSize: 16, fontFamily: 'sans-serif',marginTop:'9%',marginLeft:'7%' }]}>
                          Cheque Issued
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>}
              </ScrollView>

          </View>
            <Footer />

          {/* <View style={{width:'130%',backgroundColor:'#0C2D48', height:'25%',marginLeft:-5}}>
            <View style={{}}>
          <Image source={regIMage9} style={{height:'70%',width:'40%',marginLeft:-50}}/>
          </View>
            </View> */}

          {/* <View style={{ backgroundColor: '#0C2D48', height: 110, width: '130%', paddingTop: 5, marginLeft: -40 }}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Image source={regIMage9} style={{ height: '45%', width: '35%' }} />
              <Image source={regIMage10} style={{ height: '45%', width: '10%', marginLeft: '35%' }} />
            </View>
          </View> */}

        </View>


      </ImageBackground>

    </View>


  );
};

const styles = StyleSheet.create({
  buttonText: {

    color: '#fff',
    fontSize: 16,
    fontFamily: 'sans-serif',
    fontWeight: "bold"

  },
  tiles: {
    backgroundColor: '#003060',
    height: 60,
    width: '80%',
    borderRadius: 10,
    marginLeft: 25,
    flexDirection: 'row',
    marginTop: 10,
  },
  smsimage: {
    width: '30%',
    height: '100%',
    marginLeft: '90%',
    // marginTop:0


  },

  ButtonStyle:{
    justifyContent: 'center',
    width:'30%',
    padding:10,
    marginLeft:'35%',
    // paddingVertical: 10,
    borderRadius: 14,
    // paddingHorizontal: 15,
    backgroundColor: '#002D62',
  },
    SpeakButton:{
    justifyContent: 'center',
    width:'25%',
    padding:10,
    marginTop:15,
    marginLeft:'15%',
    borderRadius: 15,
    backgroundColor: 'skyblue',
  },
  closeIcon:{
      marginLeft:'90%'
  }



});

export default FundApplication;
