/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import { useEffect,useState }  from 'react';
import React from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { useForm } from 'react-hook-form';
// import  from 'react';

import SplashScreen from 'react-native-splash-screen'
import {
  StyleSheet,
  onPress,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  TextInput,
  Modal,
  Button,
  ScrollView,
  onLoginPress,
  Alert,
} from 'react-native';

  
import { Image  } from "react-native";
// import pwdIMage from  '../pwd-app/assets/images/background.png';
import pwdIMage from '../../assets/images/background.png'
import pwdRegistration from  '../../assets/images/pwd-registration.png';
import DRTC from '../../assets/images/DB-03.png';
import BaitulMall from '../../assets/images/bait-ul-mall.png';
import Enabled from  '../../assets/images/DB-05.png';
import Nasheman from  '../../assets/images/DB-06.png';
import Zakat from '../../assets/images/zakat.png';
import ComplaintIMG from '../../assets/images/complaint.png';
import PMAImage from '../../assets/images/PMA1.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import syncStorage from 'react-native-sync-storage';
import Footer from '../Components/Footer';
import { AsyncStorage } from 'react-native';
import Loader from '../Components/Loader';
import Tts from 'react-native-tts';
import EncryptedStorage from 'react-native-encrypted-storage';
const RegnDashboard = ({route,navigation,visible, onClose}) => {

  // const [modalVisible, setModalVisible]      = React.useState(false);
  const [modalVisible, setModalVisible]      = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [modalVisibleFitNo, setModalVisibleFitNo]      = useState(false);
  const [loading, setLoading]     = useState(false);

  const [imageProfile, setimage]      = useState('');
  const [fullname, setFullName]      = useState('');
  const [fittowork, setFittowork]      = useState('');

  const [nashemanpwd, setNashemanpwd]      = useState('');

  const userDetail        = route.params.user;
  const pwdinfoID         = route.params.pwdinfosid !='' ? route.params.pwdinfosid:'';
  const pwdinfoDeatil     = route.params.pwdinfo !='' ? route.params.pwdinfo:'';
  const regdate           = pwdinfoDeatil.regdate;
  const appointmentDetail = route.params.appointment !='' ? route.params.appointment:'';
  const assessments         = route.params.assessments  !='' ? route.params.assessments:'';
  syncStorage.set('userDetail', userDetail);
  syncStorage.set('regdate', regdate);

  useEffect(() =>{
    if(assessments === null)
    {
      const fittowork = '';
      setFittowork(fittowork);
    }
    else if(assessments[0]['fittowork'] == 'No') {
      const fittowork = 'No';
      setFittowork(fittowork);
    }
    else if(assessments[0]['fittowork'] == 'Yes') {
      const fittowork = 'Yes';
      setFittowork(fittowork);
    }
    console.log('fit is', fittowork);
    UserData();
    RequestReassessmentData();
    speechFunction();
    getpwdNasheman([pwdinfoID]);
  }, []);
  const getpwdNasheman = ([pwdinfoID]) => {
    fetch(`https://dpmis.punjab.gov.pk/api/nasheman/list/${pwdinfoID}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'secret': 'pwdreg',
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(response => {
        if(response['status'] == 200)
        {
          const responsenashemanlist = response['nashemanlist'];
          setNashemanpwd(responsenashemanlist);
        }
      });
  }
  const  speechFunction = () => {
    Tts.setDefaultLanguage('en-US');
    Tts.setDefaultRate(0.5);
    Tts.setDefaultPitch(1);
    handleSpeechDrtc = () => {
      Tts.speak(`اس سروس کو حاصل کرنے کے اہل نہیں ہیں`);
    }
    handleStopSpeechDrtc = () => {
      Tts.stop();
    }
    handleSpeechNasheman = () => {
      Tts.speak(`آپ اس سروس سے فائدہ اٹھانے کے اہل نہیں ہیں۔`);
    }
    handleStopSpeechNasheman = () => {
      Tts.stop();
    }
  }
    const nashemanPress = () => {
    if (fittowork == 'Yes') {
      navigation.navigate('Nasheman',{
        nashemanpwd: syncStorage.get('nashemanpwd'),
        });
    }
    else  if (fittowork == 'No') {
      setModalVisibleFitNo(true);
    }
    else{
      Alert.alert('Coming Soon !');
    }
  };
  const UserData = () => {
    setLoading(true)
    fetch(`https://dpmis.punjab.gov.pk/api/pwdapp/pwdregshow/${pwdinfoID}`, {
      method: 'GET',
      headers:{
        'Accept': 'application/json',
        'Content-Type':'application/json',
        'secret':'pwdreg'
      },
    })
    .then(pwdinfoDetail => pwdinfoDetail.json())
    .then(resppwdinfoDetail => {
  
      const image   = resppwdinfoDetail['pwd basic info'][0].image;
        // console.log('image', image)
          setimage(image);
      const fullName    = resppwdinfoDetail['pwd basic info'][0].firstname+' '+resppwdinfoDetail['pwd basic info'][0].lastname;
        //  console.log('FullName', fullName) 
         setFullName(fullName);  
    }).finally(() =>{
      setLoading(false);
    });
  }

  const RequestReassessmentData = () => {
    setLoading(true)
    fetch(`https://dpmis.punjab.gov.pk/api/CheckUserAssessmentReq/${pwdinfoID}`, {
      method: 'GET',
      headers:{
        'Accept': 'application/json',
        'Content-Type':'application/json',
        'secret':'pwdreg'
      },
    })
    .then(resp => resp.json()).then(response => 
    {
      console.log('response ASS pwd', JSON.stringify(response));
      if(response.status =200){
        const requestDataReassesmentID = response['ReassessmentRequestData'][0]['id'];
        const requestDataReassesment = response['ReassessmentRequestData'];
          syncStorage.set('requestDataReassesmentID', requestDataReassesmentID)
          syncStorage.set('requestDataReassesment', requestDataReassesment)
      }
      else{
        syncStorage.set('requestDataReassesmentID', null)
        syncStorage.set('requestDataReassesment', null) 
      }
    }).finally(() =>{
      setLoading(false);
    });
  }

  const handleLogout = async (navigation) => {
  try {
    await EncryptedStorage.removeItem("user_session");
    await AsyncStorage.removeItem('authToken');
    syncStorage.set('profileImage','');
    syncStorage.set('fullName','');
    syncStorage.set('firstName','');
    syncStorage.set('lastName','');
    syncStorage.set('relation','');
    syncStorage.set('gender','');
    syncStorage.set('cnic','');
    syncStorage.set('age','');
    syncStorage.set('dob','');
    syncStorage.set('regDate','');
    syncStorage.set('marital','');
    syncStorage.set('valueRelation','');
    syncStorage.set('typeofd_id','');
    syncStorage.set('causeofd_id','');
    syncStorage.set('dependents','');
    syncStorage.set('religion','');
    syncStorage.set('permanentAddress','');
    syncStorage.set('presentAddress','');
    syncStorage.set('nationality','');
    syncStorage.set('domicileDistrict','');
    syncStorage.set('province_id','');
    syncStorage.set('phone','');
    syncStorage.set('qualification','');
    syncStorage.set('degreenames_id','');
    syncStorage.set('uninames_id','');
    syncStorage.set('subjectnames_id','');
    syncStorage.set('grade_id','');
    syncStorage.set('year','');
    syncStorage.set('pwdinfo_id');
    syncStorage.set('pwdAppointmentID');
    syncStorage.set('user_id','');
    syncStorage.set('pwdinfo_id','');
    syncStorage.set('pwdinfo', '');
    syncStorage.set('requestDataReassesmentID', '')
    syncStorage.set('requestDataReassesment', '') 
    syncStorage.set('nashemanpwd', '');
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  } catch (e) {
    // console.log('Error clearing auth token:', e);

  }

};

  // console.log('User Detail', userDetail);
  syncStorage.set('user_id', userDetail.id);
  // syncStorage.set('pwdinfo_id', pwdinfoID);
  // syncStorage.set('pwdinfo', pwdinfoDeatil);
  // syncStorage.set('appoint', appointmentDetail);
  // syncStorage.set('nashemanpwd', nashemanpwd);
  syncStorage.set('message', null);
  return (
    
    <View> 
    <View style={{}}>
      <Modal
      //  transparent
      animationType="fade"
      transparent
      visible={isModalVisible}
      onRequestClose={() => setIsModalVisible(false)}
        // style={styles.modal}
      >
           {/* <BlurView
          style={styles.blurBackground}
          blurType="dark"
          blurAmount={10}
        ></BlurView> */}
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'rgba(0,0,0,0.5)'}}>
        <View style={{ backgroundColor: 'white', padding: 15,borderRadius:30, margin:15}}>
          
          <Text style={{color:'black',fontFamily:'sans-serif', textAlign:"center",fontSize:14,marginTop:10,marginBottom:10}}>If you want to update any of your information, Press the button below.</Text>
          <View style={{flexDirection:'column', justifyContent: "center",alignItems: "center"}}>
            <TouchableOpacity  
                style={styles.button}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('EditPersonalInfo')}>          
              <Text style={[styles.text,{textAlign:'center'}]}>Personal Info</Text>
            </TouchableOpacity>
            { regdate < '2021-10-01' ?
              <TouchableOpacity  
                  style={styles.button}
                  activeOpacity={0.5}
                  onPress={() => navigation.navigate('EditMediaclInfo')}> 
                <Text style={[styles.text,{textAlign:'center'}]}>Medical info</Text>
              </TouchableOpacity>
              :null
            }

          </View>
        <View style={{flexDirection:'column', justifyContent: "center",alignItems: "center"}}>
        <TouchableOpacity  
                style={styles.button}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('EditEducationInfo')}
                >
              <Text style={[styles.text,{textAlign:'center'}]}>Education</Text>

        </TouchableOpacity>
        <TouchableOpacity  
                style={styles.button}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('EditJobExperience')}
                >
                  
              <Text style={[styles.text,{textAlign:'center'}]}>Job Experience</Text>

        </TouchableOpacity>
        {/* <TouchableOpacity  
                style={styles.button}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('EditFiles')}
                >              
              <Text style={[styles.text,{textAlign:'center'}]}>Edit Files</Text>
        </TouchableOpacity> */}
        </View>  
        <View style={{marginTop:10,alignItems:'center'}}>
        <TouchableOpacity
           style={[styles.button, {width:'30%',backgroundColor:'#fff',borderColor:'#002D62', borderWidth:1,height:40},]}
           activeOpacity={0.5}
           onPress={() => setIsModalVisible(false)}
           >
             
         <Text style={[styles.text,{textAlign:'center',color:'#002D62'}]}>Skip</Text>
          </TouchableOpacity>
        </View>        
        </View>
        </View>
    
        {/* <View style={{marginBottom:10}}>
        <Button title="Skip" onPress={() => setIsModalVisible(false)} />
        </View> */}
      </Modal>
    </View>
      <ImageBackground source={pwdIMage} style={{width:'100%',height:'100%'}}>
      <Loader loading={loading}/>
        <View style={{flexDirection:'row', marginBottom:40}}>
          <TouchableOpacity>
          {/* <Icon
            style={styles.searchIcon}
            name={'bars'}
            size={40}
            color="#fff"
          />  */}
          </TouchableOpacity>
          <Text style={{fontFamily:'sans-serif', fontSize:25, color:'#fff',paddingTop:10,padding:10,}}>Dashboard
          </Text> 
            <View style={{justifyContent:'space-between',flexDirection:'row',paddingHorizontal:30, marginLeft: 'auto'}}>
              <TouchableOpacity 
                onPress={() => navigation.navigate('UpdateInformation',{
                  messsage: syncStorage.get('message')
                })}
                style={[styles.updatebutton,]}
                activeOpacity={0.5}>
              <Text style={[styles.text,{textAlign:'center'}]}>Update Info</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                        onPress={() => handleLogout(navigation)}
                        style={styles.ButtonStyle}
                        activeOpacity={0.5}>
              <Text style={[styles.text,{textAlign:'center'}]}>Logout</Text>
              </TouchableOpacity>
          
            </View>
        </View>
       
        {imageProfile != `https://dpmis.punjab.gov.pk/uploads/profileimg/${imageProfile}` ? 
        <View  style={[styles.info]} >  
        
          {/* <Image source={regIMage5}style={{width:70, height:'70%',marginLeft:20,marginTop:5}}/> */}
         <Image source={{uri:`https://dpmis.punjab.gov.pk/uploads/profileimg/${imageProfile}`}} style={{ width: 50, height: 50, borderRadius: 25,marginLeft:40 }}/>
         <Text style={[styles.fullNametext]}>{fullname}</Text>
          {/* 
          <Icon 
             name={'user-circle'}
             size={35}
             color={'#fff'}
             style={{paddingLeft:60,paddingTop:10,alignSelf:'baseline',height:'100%'}}
          /> */}
        </View>:
        <View style={[styles.info]}>
          {/* <Image source={regIMage5}style={{width:70, height:'70%',marginLeft:20,marginTop:5}}/> */}
         {/* <Image source={{uri:`https://dpmis.punjab.gov.pk/uploads/profileimg/${imageProfile}`}} style={{ width: 50, height: 50, borderRadius: 25,marginLeft:40 }}/> */}

          <Icon 
             name={'user-circle'}
             size={35}
             color={'#fff'}
             style={{paddingLeft:60,paddingTop:10,alignSelf:'baseline',height:'100%'}}
          />
        </View>}
        
        
        <View style={{padding:1, flex:1, justifyContent:'center',paddingTop:100}}>
          <View style={{width:'100%',backgroundColor:'#fff', height:'100%',padding:20, borderTopLeftRadius:40,borderTopRightRadius:40,opacity:0.8}}> 
        
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            <View style={styles.row}>
              <TouchableOpacity style={[styles.card]} onPress={() =>  
                navigation.navigate('Tracking',{
                appointment: syncStorage.get('appoint'),
                pwdInfoID: syncStorage.get('pwdinfo_id'),
                })}>
                <View style={styles.cardImage}>
                  <Image source={pwdRegistration} style={styles.bannerImage} />
                </View>
                <View style={styles.cardTextView}>
                  <Text style={styles.cardText}>pwd Registration</Text>
                </View>
              </TouchableOpacity>

              { assessments[0]['fittowork'] == 'No' || assessments[0]['fittowork'] == 'NO'  ?
              <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('FundApplication',{
                pwdInfoID: syncStorage.get('pwdinfo_id'),
                })}>
                <View style={styles.cardImage}>
                  <Image source={DRTC} style={styles.BannerImage} />
                </View>
                <View style={styles.cardTextView}>
                  <Text style={styles.cardText}>DRTC</Text>
                </View>
              </TouchableOpacity>
                :
                <TouchableOpacity style={styles.card} onPress={() => setModalVisible(true)}>
                  <View style={styles.cardImage}>
                    <Image source={DRTC} style={styles.BannerImage} />
                  </View>
                  <View style={styles.cardTextView}>
                    <Text style={styles.cardText}>DRTC</Text>
                  </View>
                  <Modal
                          animationType="fade"
                          transparent
                          visible={modalVisible}
                          onRequestClose={() => setModalVisible(false)}
                        >
                          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 }}>
                            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 20, minWidth:200 }}>
                              <Text style={{ color: 'black', textAlign: "center", fontSize: 15, marginTop: 10 }}>
                              اس سروس کو حاصل کرنے کے اہل نہیں ہیں
                              </Text>
                              <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                  onPress={this.handleSpeechDrtc}
                                  style={styles.SpeakButton}
                                  activeOpacity={0.5}>
                                  <Text style={[styles.text, { textAlign: 'center', color: '#fff' }]}>Speak 🔊</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={this.handleStopSpeechDrtc}
                                  style={styles.SpeakButton}
                                  activeOpacity={0.5}>
                                  <Text style={[styles.text, { textAlign: 'center', color: '#fff' }]}>Stop  🔇</Text>
                                </TouchableOpacity>
                              </View>
                              <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity
                                  style={styles.SpeakButton}
                                  activeOpacity={0.5}
                                  onPress={() => setModalVisible(false)}
                                >
                                  <Text style={[styles.text, { textAlign: 'center', color: '#fff', fontSize: 16, fontFamily: 'sans-serif' }]}>Skip</Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </Modal>
                </TouchableOpacity>
                
              }
            
            </View>

            <View style={styles.row}>
              <TouchableOpacity style={styles.card} onPress={() => Alert.alert('Coming Soon!')}>
                <View style={styles.cardImage}>
                  <Image source={BaitulMall} style={styles.bannerImage} />
                </View>
                <View style={styles.cardTextView}>
                  <Text style={styles.cardText}>Bait-ul-Maal</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.card}  onPress={() => Alert.alert('Coming Soon!')}>
                <View style={styles.cardImage}>
                  <Image source={Zakat} style={styles.zakatimage} />
                </View>
                <View style={styles.cardTextView}>
                  <Text style={styles.cardText}>Zakat</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={[styles.card,]} 
              // onPress={() => navigation.navigate('Nasheman')}
               onPress={() => nashemanPress()}
               
              >
                <View style={styles.cardImage}>
                  <Image source={Nasheman} style={styles.nashemanimage} />
                </View>
                <View style={styles.cardTextView}>
                  <Text style={styles.cardText}>Nasheman</Text>
                </View>
              </TouchableOpacity>
               <Modal
                          animationType="fade"
                          transparent
                          visible={modalVisibleFitNo}
                          onRequestClose={() => setModalVisibleFitNo(false)}
                        >
                          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 }}>
                            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 20 }}>
                              <Text style={{ color: 'black', textAlign: "center", fontSize: 15, marginTop: 10 }}>
                              آپ اس سروس سے فائدہ اٹھانے کے اہل نہیں ہیں۔
                              </Text>
                              <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                  onPress={this.handleSpeechNasheman}
                                  style={styles.SpeakButton}
                                  activeOpacity={0.5}>
                                  <Text style={[styles.text, { textAlign: 'center', color: '#fff' }]}>Speak 🔊</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={this.handleStopSpeechNasheman}
                                  style={styles.SpeakButton}
                                  activeOpacity={0.5}>
                                  <Text style={[styles.text, { textAlign: 'center', color: '#fff' }]}>Stop  🔇</Text>
                                </TouchableOpacity>
                              </View>
                              <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity
                                  style={styles.SpeakButton}
                                  activeOpacity={0.5}
                                  onPress={() => setModalVisibleFitNo(false)}
                                >
                                  <Text style={[styles.text, { textAlign: 'center', color: '#fff', fontSize: 16, fontFamily: 'sans-serif' }]}>Skip</Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </Modal>
              <TouchableOpacity style={[styles.card,]} onPress={() => Alert.alert('Coming Soon!')}>
                <View style={styles.cardImage}>
                  <Image source={Enabled} style={styles.enabledimage} />
                </View>
                <View style={styles.cardTextView}>
                  <Text style={styles.cardText}># Enabled</Text>
                </View>
              </TouchableOpacity>
           
            </View>
            <View style={styles.row}>
              <TouchableOpacity style={[styles.card,]}  onPress={() => Alert.alert('Coming Soon!')}>
                <View style={styles.cardImage}>
                  <Image source={PMAImage} style={styles.enabledimage} />
                </View>
                <View style={styles.cardTextView}>
                  <Text style={styles.cardText}>PMA</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.card,]}  onPress={() => Alert.alert('Coming Soon!')}>
                <View style={styles.cardImage}>
                  <Image source={ComplaintIMG} style={styles.enabledimage} />
                </View>
                <View style={styles.cardTextView}>
                  <Text style={styles.cardText}>Complaint</Text>
                </View>
              </TouchableOpacity>
              {/* <TouchableOpacity style={[styles.invisible,]}>
              </TouchableOpacity> */}
            </View>
            </ScrollView>

          </View>
          <Footer/>
        </View>
      </ImageBackground>  
    </View>
  );
};

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
  searchIcon:{
        fontSize:30,
        padding:10,
        margin:2
    },
    closeIcon:{
      // fontSize:30,
      // padding:10,
      // marginLeft:'90%'
      // flex:1,
      // justifyContent:'flex-end' 
      justifyContent:'flex-end'
    },
  invisible: {
    flexDirection: 'column',
    flex: 1,
    width: '100%',
    height: 'auto',
    marginStart: 7,
    marginEnd: 0,
    justifyContent:'flex-end'
  },
    bannerImage: {
      width: '85%',
      height: '85%',
      resizeMode: 'contain',
    },
    BannerImage: {
      width: '85%',
      height: '85%',
      resizeMode: 'contain',
      marginTop:10,
    },
    enabledimage:{
      width: '85%',
      height: '85%',
      resizeMode: 'contain',
      marginTop:10,
    },
    zakatimage:{
      width: '85%',
      height: '85%',
      resizeMode: 'contain',
      marginTop:10,
    },
    nashemanimage:{
      width: '85%',
      height: '85%',
      resizeMode: 'contain',
      marginTop:10,
    },
    card: {
      flexDirection: 'column',
      backgroundColor: '#fff',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      borderRadius: 30,
      flex: 1,
      width: '100%',
      height: 120,
      marginStart: 7,
      marginEnd: 7,
    },
    row: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      height: 135,
    },

    cardImage: {
      flexDirection: 'row',
      justifyContent: 'center',
      width: '100%',
      alignSelf: 'center',
      height: '100%',
      flex: 2,
      alignItems: 'center',
    },
    cardTextView: {
      flex: 1,
      top: 20,
      alignItems: 'center',
    
    },
    ButtonStyle:{
      justifyContent: 'center',
      paddingVertical: 10,
      paddingHorizontal: 25,
      borderRadius: 10,
      backgroundColor: '#002D62',
      marginLeft:'3%',
      marginTop:10,
      fontFamily:'sans-serif',
    },
    updatebutton:{
      justifyContent: 'center',
      paddingVertical: 13,
      paddingHorizontal: 8,
      borderRadius: 10,
      backgroundColor: '#002D62',
      marginTop:10,
      fontFamily:'sans-serif'
      
    },
    cardText: {
      fontSize: 14.50,
      fontFamily:'sans-serif',
      bottom: 15,
      color: '#000',
      fontWeight:'600'
      
    },
    text:{
      color:'white',
      fontSize:12,
      fontFamily: "sans-serif",
    
    },
    button:{
      justifyContent: 'center',
      paddingVertical: 5,
      height:50,
      width:'55%',
      // paddingHorizontal: 20,
      borderRadius: 14,
      backgroundColor: '#002D62',
      
      // marginLeft:'2%',
      marginTop:10
    },
    skipbutton:{ 
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'center',
    paddingVertical: 5,
    height:50,
    width:100,
    // paddingHorizontal: 20,
    borderRadius: 14,
    backgroundColor: '#002D62',
    marginTop:15,
    marginLeft:'30%'
  },
  info:{
    backgroundColor:'#0047AB',
     height:50,
     width:'80%',
     opacity:0.7,
     borderTopRightRadius:10,
     borderBottomRightRadius:10,
     flexDirection:'row',
    //  justifyContent:'space-between'
  },
    dropdown: {
      height: 40,
      width:'100%',
      borderColor: 'white',
      borderWidth: 0.5,
      borderRadius: 5,
      paddingHorizontal: 4,
      backgroundColor:'#D3D3D3',
      marginTop: 10
    },
    placeholderStyle:{
      textAlign:'center',
      fontSize:15
    },
    selectedTextStyle:{
      color:'black',
    },
    TEXTstyle:{
      color:'black'
    },
    fullNametext:
    {
      color:'white',
      marginLeft:20,
      marginTop:15,
      fontSize:16
      
    },
    modal:{
      height: Dimensions.get('window').height * 1,
      
      
    }
  });

export default RegnDashboard;
