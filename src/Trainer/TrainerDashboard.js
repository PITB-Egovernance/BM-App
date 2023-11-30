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
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  TextInput,
  Modal,
  Button,
  ScrollView,
  onLoginPress,

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
import regIMage5 from  '../../assets/images/DB-07.png';
import regIMage6 from  '../../assets/images/PWDREG-07.png';
import regIMage7 from  '../../assets/images/PWDREG-08.png';
import regIMage8 from  '../../assets/images/PWDREG-09.png';
import regIMage9 from   '../../assets/images/PWDfooter.png';
import regIMage10 from   '../../assets/images/pitb.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import syncStorage from 'react-native-sync-storage';
import { AsyncStorage } from 'react-native';
import Footer from '../Components/Footer';
const TrainerDashboard = ({route,navigation,visible, onClose}) => {

  const [modalVisible, setModalVisible]             = useState(false);
  const [imageProfile, setimage]      = useState('');

  const [info, setinfo]                   = useState('');

  const handleLogout = async (navigation) => {
  try {
    await AsyncStorage.removeItem('authToken');
    syncStorage.set('profileImage','');
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
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  } catch (e) {
    // console.log('Error clearing auth token:', e);

  }

};
  return (
    
    <View>
      <ImageBackground source={pwdIMage} style={{width:'100%',height:'100%'}}>
        <View style={{flexDirection:'row', marginBottom:40}}>
          <TouchableOpacity>
          <Icon
            style={styles.searchIcon}
            name={'bars'}
            size={40}
            color="#fff"
          /> 
          </TouchableOpacity>
          <Text style={{fontFamily:'sans-serif', fontSize:25, color:'#fff',paddingTop:10}}>Trainer Dashboard
          </Text>
          <TouchableOpacity 
                    onPress={() => handleLogout(navigation)}
                    style={styles.ButtonStyle}
                    activeOpacity={0.5}>
          <Text style={[styles.text,{textAlign:'center'}]}>Logout</Text>
          </TouchableOpacity>
      
        
        </View>
       
        
        
        
        <View style={{padding:1, flex:1, justifyContent:'center',paddingTop:100}}>
          <View style={{width:'100%',backgroundColor:'#fff', height:'100%',padding:20, borderTopLeftRadius:40,borderTopRightRadius:40,opacity:0.8}}> 
        
            <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
            <View style={styles.row}>
              <TouchableOpacity style={[styles.card]} onPress={() => navigation.navigate('SortTrainer')}>
                <View style={styles.cardImage}>
                  <Image source={pwdRegistration} style={styles.bannerImage} />
                </View>
                <View style={styles.cardTextView}>
                  <Text style={styles.cardText}>All PWD's </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('FundApplication')}>
                <View style={styles.cardImage}>
                  <Image source={DRTC} style={styles.BannerImage} />
                </View>
                <View style={styles.cardTextView}>
                  <Text style={styles.cardText}>Request By PWD's</Text>
                </View>
              </TouchableOpacity>

            
            </View>
            </ScrollView>

          </View>

          {/* <View style={{backgroundColor:'#0C2D48',height:130,width:'130%',paddingTop:5,marginLeft:-40}}>
          <View style={{flexDirection: 'row',flex:1}}>          
            <Image source={regIMage9} style={{height:'35%',width:'35%'}}/>
            <Image source={regIMage10} style={{height:'35%',width:'10%',marginLeft:'35%'}}/>  
            </View>     
          </View> */}
          <Footer/>
        </View>
      </ImageBackground>  
    </View>
  );
};

const styles = StyleSheet.create({
  searchIcon:{
        fontSize:30,
        padding:10,
        margin:2
    },
    bannerImage: {
      width: '100%',
      height: '120%',
      resizeMode: 'contain',
    },
    BannerImage: {
      width: '100%',
      height: '120%',
      resizeMode: 'contain',
      marginTop:10,
    },
    enabledimage:{
      width: '90%',
      height: '100%',
      resizeMode: 'contain',
      marginTop:10,
    },
    zakatimage:{
      width: '90%',
      height: '100%',
      resizeMode: 'contain',
      marginTop:10,
    },
    nashemanimage:{
      width: '90%',
      height: '100%',
      resizeMode: 'contain',
      marginTop:10,
    },
    card: {
      flexDirection: 'column',
      backgroundColor: '#C6CEE9',
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
  
    card2: {
      flexDirection: 'column',
      backgroundColor: '#C6CEE9',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      borderRadius: 30,
      flex: 1,
      width: '50%',
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
      borderRadius: 18,
      backgroundColor: '#002D62',
      marginLeft:'1%',
      marginTop:10
    },
    updatebutton:{
      justifyContent: 'center',
      paddingVertical: 13,
      paddingHorizontal: 8,
      borderRadius: 18,
      backgroundColor: '#002D62',
      marginLeft:'3%',
      marginTop:10
      
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
      width:100,
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
   
  });

export default TrainerDashboard;
