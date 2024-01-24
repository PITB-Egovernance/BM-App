/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import react, { useState } from "react";


import React, { useEffect, useCallback } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import { AsyncStorage } from 'react-native';
import Loader from "../Components/Loader";
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


} from 'react-native';


import { Image } from "react-native";

import back from '../../assets/images/back.png';
import regIMage from '../../assets/images/PWDREG01.png';
import regIMage1 from '../../assets/images/DRTC-02.png';
import regIMage2 from '../../assets/images/TOAPP-03.png';
import regIMage3 from '../../assets/images/DRTC-03.png';
import regIMage4 from '../../assets/images/DRTC-05.png';
import regIMage5 from '../../assets/images/DRTC-04.png';



import Footer from '../Components/Footer';
import syncStorage from 'react-native-sync-storage';
import baseUrl from "../Components/Url";


const pwd = ({ route, navigation}) => {

  const [loading, setLoading] = useState(false);

  const[bmUserId,setBmUserId] = useState('');
  const[zakat,setZakatStatus] = useState('');
  const[ddverify, setDdVerify] = useState('');
  const[deoverify, setDeoVerify] = useState('');
  const[comverify, setComVerify] = useState('');
  const[amount, setAmount] = useState('');
  const[checkcopy, setCheckcopy] = useState('');




  useEffect(() => {

    checkZakatApi();
    const regformID = route.params.regformID == undefined && syncStorage.get('regform_id') == undefined ? syncStorage.get('regform_id') :
    route.params.regformID == undefined && syncStorage.get('regform_id') != undefined ? syncStorage.get('regform_id') :
    syncStorage.get('regform_id');
    checkpwdDetail();
    // console.log('route.params.regformID', regformID);
    // SplashScreen.hide();
    // Tts.setDefaultLanguage('en-US');
    // Tts.setDefaultRate(0.5);
    // Tts.setDefaultPitch(1);
    // handleSpeech = () => {
    //   Tts.speak('آپ کی درخواست جمع ہو چکی ہے جس کو آپ اس لِنک پر ٹریک کر سکتے ہیںyour Application has been submitted');
    // }
    // handleStopSpeech = () => {
    //   Tts.stop();
    // }
  }, []);
  const handleLogout = async (navigation) => {
    
    try {
      setLoading(true);
      // await EncryptedStorage.removeItem("user_session");
      // await AsyncStorage.removeItem('authToken');
      syncStorage.set('affidavitImage','');
      syncStorage.set('domicileDistrict','');
      syncStorage.set('tehsilID','');
      syncStorage.set('name','');
      syncStorage.set('contact','');
      syncStorage.set('cnic','');
      syncStorage.set('father_spouse_name','');
      syncStorage.set('dob','');
      syncStorage.set('age','');
      syncStorage.set('gender','');
      syncStorage.set('monthlyincome','');
      syncStorage.set('monthlyincomeparent','');
      syncStorage.set('postaladress','');
      syncStorage.set('permanentAddress','');
      syncStorage.set('currentdate','');
      syncStorage.set('service','');
      syncStorage.set('otherservice','');
      syncStorage.set('rname','');
      syncStorage.set('rrelation','');
      syncStorage.set('rage','');
      syncStorage.set('reducation','');
      syncStorage.set('roccupation','');
      syncStorage.set('rincome','');
      syncStorage.set('Residence','');
      syncStorage.set('Houserent','');
      syncStorage.set('Expensedetail','');
      syncStorage.set('Skill','');
      syncStorage.set('Need','');
      syncStorage.set('Purpose','');
      syncStorage.set('Property');
      syncStorage.set('sourceofincome');
      syncStorage.set('bridename','');
      syncStorage.set('bridecnic','');
      syncStorage.set('brideage', '');
      syncStorage.set('groomname', '')
      syncStorage.set('groomfathername', '') 
      syncStorage.set('groomcnic', '');
      syncStorage.set('groomaddress', '');
      syncStorage.set('income', '');
      syncStorage.set('margdate', '');
      syncStorage.set('married', '');
      syncStorage.set('adate', '');
      syncStorage.set('regname', '');
      syncStorage.set('regaddress', '');
      syncStorage.set('bcnicfName', '');
      syncStorage.set('gcnicfName', '');
      syncStorage.set('gcnicbName', '');
      syncStorage.set('expensedetail', '');
      syncStorage.set('residence', '');
      syncStorage.set('houserent', '');
      syncStorage.set('disease', '');
      syncStorage.set('treatmentfrom', '');
      syncStorage.set('treatmentexpense', '');
      syncStorage.set('name', '');
      syncStorage.set('fname', '');
      syncStorage.set('address', '');
      syncStorage.set('relation', '');
      syncStorage.set('fcnicImage', '');
      syncStorage.set('fcnicbackImage', '');
      syncStorage.set('studentname', '');
      syncStorage.set('studentcnic', '');
      syncStorage.set('relation', '');
      syncStorage.set('rollnumber', '');
      syncStorage.set('schoolname', '');
      syncStorage.set('grade', '');
      syncStorage.set('tmarks', '');
      syncStorage.set('obmarks', '');
      syncStorage.set('slipImage', '');
      syncStorage.set('deathcertiImage', '');
      syncStorage.set('disablecertiImage', '');
      syncStorage.set('admcertiImage', '');
      syncStorage.set('resultcardImage', '');
      syncStorage.set('scholcertiImage', '');
      syncStorage.set('hostelcertiImage', '');
      syncStorage.set('nohostelcertiImage', '');
      syncStorage.set('resultcardImage', '');

      
      navigation.navigate('Login')
      setLoading(false);
    } catch (e) {
      console.log('Error clearing auth token:', e);
  
    }
  
  };
  const UserBmId = syncStorage.get('bmuser_id');
  // const UserBmId = syncStorage.get('bmUser');
  
  const checkpwdDetail = () => {
    console.log('BM User ID==u=', UserBmId,'Base url BM', baseUrl[0])
    fetch(`${baseUrl[0]}/apiformbmshow/${UserBmId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'secret': 'secret key',
      },
    })
      .then(respBM => respBM.json())
      .then(resppwd => {

        console.log('Assessment Detail BM----', resppwd)/* 247 */
        // console.log('Assessment Detail', resppwd['BM Register'])/* 247 */

        if (resppwd['BM Register'][0]['id'] != '') {

          setBmUserId(resppwd['BM Register'][0]['id'])
          setDdVerify(resppwd['BM Register'][0]['ddverify'])
          setDeoVerify(resppwd['BM Register'][0]['deoverify'])
          setComVerify(resppwd['BM Register'][0]['comverify'])
          setAmount(resppwd['BM Register'][0]['amount'])
          setCheckcopy(resppwd['BM Register'][0]['checkcopy'])
   
          const ddverify = resppwd['bm basic info'][0].ddverify;
        
          console.log('bmid is  ', bmUserId);
          setRegNum(regnum);
          setDdVerify(ddverify);
          setDeoVerify(deoverify);
          setComVerify(comverify);
          setAmount(amount);     
          setDdVerify(ddverify);

        }
      })
  }

  const checkZakatApi = () =>{

    
    const cnic = route.params.Cnic;
    console.log('CNIC', cnic)
    setLoading(true)
    fetch(`${baseUrl[0]}/checkZakatCnic`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'secret': 'secret key',
      },
      body: JSON.stringify({ cnic: `${cnic}` }),
      // body: JSON.stringify({ cnic: `3730310859758` }),
    })
      .then(respBM => respBM.json())
      .then(respZakat => {

        console.log('CHeck Zakat',respZakat)
        setZakatStatus(respZakat)
        // if(respZakat.status === 1){

        //   setMessage(respZakat.message)
          
        // }else if(respZakat.status === 0){

        //   setMessage(respZakat.message)
        // }else if(respZakat.status === 'pending'){

        //   setMessage(respZakat.message)
        // }
      }).catch((error) => console.error(error))
      .finally(() => {
        setLoading(false);
      });
  }

  return (

    <View>

      <ImageBackground source={back} style={{ width: '100%', height: '100%' }}>
      <Loader loading={loading} />
      <View style={styles.headerContainer}>
           <TouchableOpacity 
              onPress={() => handleLogout(navigation)}
              style={styles.ButtonStyle}
              activeOpacity={0.5}>
              <Text style={[styles.text,{textAlign:'center'}]}>Logout</Text>
            </TouchableOpacity>
      <Text style={[styles.buttonText, { fontWeight: "bold", fontSize: 28, paddingTop: 30, color: '#fff', textAlign: 'center' }]}>بیت المال پنجاب</Text>
      </View>

        {zakat.status === 0 ?
        
        <View style={{ padding: 1, flex: 1, justifyContent: 'center', paddingTop: '30%' }}>

          <View style={{ width: '100%', backgroundColor: '#fff', height: '80%', padding: 30, borderTopLeftRadius: 15, borderTopRightRadius: 15,opacity:1,marginTop: '15%' }}>

          <View style={[styles.tiles,{width:'100%',marginLeft:0,backgroundColor: 'red',}]}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Text style={[styles.buttonText, {marginLeft:20, color: '#fff', fontSize: 16, fontFamily: 'sans-serif', }]}>
                  {zakat.message}  
              </Text>
              {/* <Image source={regIMage} style={{marginLeft:10, width: '15%', height: 40 }} /> */}
            </TouchableOpacity>
          </View>
        
          
          </View>
          <Footer />

          {/* <View style={{ backgroundColor: '#0C2D48', height: 110, width: '130%', paddingTop: 5, marginLeft: -40 }}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Image source={regIMage9} style={{ height: '45%', width: '35%' }} />
              <Image source={regIMage10} style={{ height: '45%', width: '10%', marginLeft: '35%' }} />
            </View>
          </View> */}
          
        </View>
              
        :zakat.status ===  1 ? 
      
        <View style={{ padding: 1, flex: 1, justifyContent: 'center', paddingTop: '30%' }}>

          <View style={{ width: '100%', backgroundColor: '#fff', height: '80%', padding: 30, borderTopLeftRadius: 15, borderTopRightRadius: 15,opacity:1,marginTop: '15%' }}>

          <View style={[styles.tiles,{width:'100%',marginLeft:0,backgroundColor: 'green',}]}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
              <Text style={[styles.buttonText, {marginLeft:20, color: '#fff', fontSize: 16, fontFamily: 'sans-serif', }]}>
                  {zakat.message}  
              </Text>
              {/* <Image source={regIMage} style={{marginLeft:10, width: '15%', height: 40 }} /> */}
            </TouchableOpacity>
          </View>
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}>
              {bmUserId!= '' ? 
                <View style={{...styles.tiles, backgroundColor: 'green'}}>
                  <TouchableOpacity onPress={() => navigation.navigate('BMshow')} style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <Text style={[styles.buttonText, {marginLeft:20, color: '#fff', fontSize: 16, fontFamily: 'sans-serif', }]}>
                      بیت المال کے لیے درخواست 
                    </Text>
                    <Image source={regIMage} style={{marginLeft:10, width: '15%', height: 40 }} />
                  </TouchableOpacity>
                </View>
                :
                <View style={[styles.tiles]}>
                  <TouchableOpacity onPress={() => navigation.navigate('BmRegistration')} style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <Text style={[styles.buttonText, {marginLeft:20, color: '#fff', fontSize: 16, fontFamily: 'sans-serif', }]}>
                      بیت المال کے لیے درخواست 
                    </Text>
                    <Image source={regIMage} style={{marginLeft:10, width: '15%', height: 40 }} />
                  </TouchableOpacity>
                </View>
                }
                {/* {bmUserId!= '' ?  */}
                {/* <View style={{...styles.tiles, backgroundColor: 'green',alignItems: 'center', justifyContent: 'center' }}>
                  <TouchableOpacity style={{ flexDirection: 'row-reverse', alignItems: 'center', flex: 1 }}>
                    <Image source={regIMage1} style={{ width: '30%', height: 50, marginRight: -1 }} />
                    <View style={{ flex: 1,marginLeft:'20%' }}>
                      <Text style={[styles.buttonText, { color: '#fff', marginLeft: -15, fontSize: 16, fontFamily: 'sans-serif', textAlign: 'center' }]}>
                      چیئرمین سیکرٹری بیت المال کی تصدیق
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View> */}
                {/* : */}
              <View style={{...styles.tiles, alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity style={{ flexDirection: 'row-reverse', alignItems: 'center', flex: 1 }}>
                  <Image source={regIMage1} style={{ width: '30%', height: 50, marginRight: -1 }} />
                  <View style={{ flex: 1,marginLeft:'20%' }}>
                    <Text style={[styles.buttonText, { color: '#fff', marginLeft: -10, fontSize: 16, fontFamily: 'sans-serif', textAlign: 'center' }]}>
                      چیئرمین/سیکرٹری بیت المال کی تصدیق 
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
              {/* }                 */}

              {/* Field Verification */}
              <View style={[styles.tiles]}>
                  <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.buttonText,{ color: '#fff', fontSize: 16, fontFamily: 'sans-serif', textAlign: 'center' }]}>
                    علاقائی تصدیق  
                    </Text>
                  </View>
                    <Image source={regIMage2} style={{ width: '30%', height: 40, marginLeft: -20 }} />
                  </TouchableOpacity>
              </View>




              {/* <View style={{ backgroundColor: '#003060', height: 60, width: '80%', borderRadius: 10, marginTop: 20, marginLeft: 25 }}>
                <TouchableOpacity onPress={onPress}>
                  <Image source={regIMage2} style={{ width: '40%', height: 40, marginTop: 10, marginLeft: -10 }} />
                  <View style={{ marginLeft: '30%', marginTop: '-18%' }}>
                    <Text style={{ color: '#fff', fontSize: 16, fontFamily: 'sans-serif' }}>
                      {'     '}DD Verify{'\n'}{'     '}Application
                    </Text>
                  </View>

                </TouchableOpacity>
                </View> 
              */}
                {/* <View style={[styles.tiles]}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.buttonText,{ color: '#fff', fontSize: 16, fontFamily: 'sans-serif', marginLeft: 10, textAlign: 'center' }]}>
                      ڈپٹی ڈائریکٹر کی تصدیق
                    </Text>
                  </View>
                  <Image source={regIMage2} style={{ width: '30%', height: 40, marginLeft: -10 }} />
                </TouchableOpacity>
                </View> */}


              <View style={[styles.tiles]}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.buttonText,{ color: '#fff', fontSize: 16, fontFamily: 'sans-serif', textAlign: 'center' }]}>
                      کمیٹی کی پراسیسنگ
                    </Text>
                  </View>
                  <Image source={regIMage3} style={{ width: 55, height: 40 }} />
                </TouchableOpacity>
              </View>


              <View style={[styles.tiles]}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <Text style={[styles.buttonText,{ color: '#fff', fontSize: 16, fontFamily: 'sans-serif', marginLeft: 5, flex: 1, textAlign: 'center' }]}>
                    فنڈ برائے تقسیم
                  </Text>
                  <Image source={regIMage4} style={{ width: '30%', height: 40, marginLeft: -4 }} />
                </TouchableOpacity>
              </View>

              <View style={[styles.tiles]}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  <Text style={[styles.buttonText,{ color: '#fff', fontSize: 16, fontFamily: 'sans-serif', marginLeft: 5, flex: 1, textAlign: 'center' }]}>
                    ادائیگی 
                  </Text>
                  <Image source={regIMage5} style={{ width: '30%', height: 40, marginLeft: -4 }} />
                </TouchableOpacity>
              </View>


              {/* <View style={[styles.tiles]}>
              <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                <Text style={[styles.buttonText, { color: '#fff', fontSize: 16, fontFamily: 'sans-serif', marginLeft: 5, flex: 1, textAlign: 'center' }]}>
                  جاری کردہ چیک
                </Text>
                <Image source={regIMage5} style={{ width: '25%', height: 40, marginLeft: -1 }} />
              </TouchableOpacity>
              </View> */}

            </ScrollView>
          
          </View>
          <Footer />

          {/* <View style={{ backgroundColor: '#0C2D48', height: 110, width: '130%', paddingTop: 5, marginLeft: -40 }}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Image source={regIMage9} style={{ height: '45%', width: '35%' }} />
              <Image source={regIMage10} style={{ height: '45%', width: '10%', marginLeft: '35%' }} />
            </View>
          </View> */}
          
        </View>
        :''}


      </ImageBackground>

    </View>


  );
};

const styles = StyleSheet.create({
   logoutIcon: {
    width: 20,
    height: 20,
    marginRight: 5, // Adjust this value for proper spacing
  },
  text:{
      color:'#002D62',
      fontSize:12,
      fontStyle: 'CenturyGothic',
      fontWeight:'bold'
    
    },
    ButtonStyle:{
      justifyContent: 'center',
      paddingVertical: 10,
      paddingHorizontal: 25,
      borderRadius: 10,
      backgroundColor: 'white',
      marginLeft:'3%',
      marginTop:10,
      fontFamily:'sans-serif',
    },
    headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    // backgroundColor: '#002D62',
  },
  buttonText: {
    flex: 1,
  },
  headerButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop:20
    },
  headerButtonText: {
    fontWeight: 'bold',
    color: '#002D62',
  },
  tiles:{
    flexDirection: 'row',
    backgroundColor: '#0C2D48',
    height: 55,
    width: '82%',
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 25 
  },
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
  }




});

export default pwd;
