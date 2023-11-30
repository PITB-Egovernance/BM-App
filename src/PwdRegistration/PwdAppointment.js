import { Dropdown } from 'react-native-element-dropdown';
import React,{useEffect,useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Text,
  card,
  useColorScheme,
  View,
  Button,
  ImageBackground,
  onLoginPress,
  onPressLearnMore,
  ToastAndroid
  
} from 'react-native';

import Loader from '../Components/Loader';  
import { Alert, Keyboard, KeyboardAvoidingView,  TextInput, TouchableWithoutFeedback,  } from "react-native";
import pwdIMage from  '../../assets/images/background.png';
import { DatePickerInput } from 'react-native-paper-dates';
import syncStorage from 'react-native-sync-storage';

const PwdAppointment = ({navigation}) => {

  const [province, setProvince]   = useState([]);
  const [district, setDistrict]   = useState([]);
  const [board, setBoard]         = useState([]);
  const [adate, setADate]         = useState([]);
  const [ADate_id, setADateId]    = useState('');


  const [Focus, setFocus]         = useState(false);
  const [value, setValue]         = useState(null);
  const [isFocus, setIsFocus]     = useState(false);

  const [province_id, setProvinceId] = useState('');
  const [district_id, setDistrictId] = useState('');
  const [board_id, setBoardId]       = useState('');
  const [fullname, setFullName]      = useState('');
  const [fathername, setFatherName]  = useState('');
  const [gender, setGender]          = useState('');
  const [cnic, setCnic]              = useState('');
  const [age, setAge]                = useState('');
  const [dability, setDisability]    = useState('');
  const [typeoFID, setTypeofId]        = useState('');
  const [cause, setCause]            = useState('');
  const [mPhone, setPhone]           = useState('');
  const [RegDate, setRegdate]        = useState('');
  const [pwdInfoID, setPwdInfoId]    = useState('');
  const [loading, setLoading]        = useState(false);

  useEffect(() =>{
    getProvince();
    const pwdinfoDetail = syncStorage.get('pwdinfo');
    console.log('Pwd Info Detail', pwdinfoDetail)
    
    const pwdpinfo_id       = pwdinfoDetail.id;
    console.log('Id PWD', pwdpinfo_id);
    const fullName          = pwdinfoDetail.firstname+' '+ pwdinfoDetail.lastname;
    if(pwdinfoDetail.relationship == 'Father_Name'){
      const fatherName  = pwdinfoDetail.father_spouse_name;
      setFatherName(fatherName)
    }
    const cnic                = pwdinfoDetail.cnic;
    const gender              = pwdinfoDetail.gender;
    const age                 = pwdinfoDetail.agegroup;
    const disability          = pwdinfoDetail.typeofd;
    const CauseDisability     = pwdinfoDetail.causeofd;
    const phone               = pwdinfoDetail.phone;
    const regdate             = pwdinfoDetail.regdate  
    setPwdInfoId(pwdpinfo_id);
    setCnic(cnic);
    setGender(gender);
    setFullName(fullName);
    setAge(age);
    setPhone(phone)
    setRegdate(regdate) 
    setTypeofId(disability)
    console.log('Disability',disability)
    getTypeofdData(disability);
    getCauseofdData([disability,CauseDisability]);
  }, []);

  const getProvince = () => {
    fetch('https://dpmis.punjab.gov.pk/api/app/province', {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
      },
    })
    .then(response => response.json())
    .then(response => {

      // {response:{provinces:{{'id','name'}, object2, object3, object4}}}
      var count = Object.keys(response.provinces).length; /* 4 */
      if(count > 0){
        let dropDownData = [];
        for (var i = 0; i < count; i++) {
          dropDownData.push({
            value: response.provinces[i].id,
            label: response.provinces[i].name,
          });
        }
        setProvince(dropDownData);
      }
    });
  }

  const getDistrict = (provinceID) =>{
    console.log('provinceID', provinceID)
    fetch(`https://dpmis.punjab.gov.pk/api/app/getdistrictsbyprovince/${provinceID}`, {
      method: 'GET',
      headers:{
        'Accept': 'application/json',
      },
    })
    .then(respDistrict => respDistrict.json())
    .then(responseDistrict => {

      console.log('DIstricts', responseDistrict)
     
      var count = Object.keys(responseDistrict.districts).length;
      console.log('Districts COunt', count)
      let districtsData = [];
      for (var i = 0; i < count; i++) {
        districtsData.push({ value: responseDistrict.districts[i].id, label: responseDistrict.districts[i].name });
      }
      // console.log(JSON.stringify(Data))
      setDistrict(districtsData);
    });
  }

  const getBoard = (ditrictId) =>{

    fetch(`https://dpmis.punjab.gov.pk/api/app/getboards/${ditrictId}`, {
      method: 'GET',
      headers:{},
    })
    .then(respBoard => respBoard.json())
    .then(responseBoard => {

      console.log('BOards', responseBoard)
     
      var count = Object.keys(responseBoard.boards).length;
      let boardData = [];
      for (var i = 0; i < count; i++) {
        boardData.push({ value: responseBoard.boards[i].id, label: responseBoard.boards[i].name });
      }
      // console.log(JSON.stringify(districtData))
      setBoard(boardData);
    });
  }
  const getAdate = (BoardID) =>{

    console.log('TYpeofD Adate', typeoFID)
    console.log('Board id Adate', BoardID)
    console.log('RegDate Adate', RegDate)
   
    fetch(`https://dpmis.punjab.gov.pk/api/pwdapp/get-ddates-by-aboard?reg=${RegDate}&mboard_id=${BoardID}&typeofd=${typeoFID}`, {
      method: 'GET',
      headers:{
        'Accept': 'application/json',
          'secret':'pwdreg',
          'Content-Type':'application/json'
      },
    })
    .then(respAdate => respAdate.json())
    .then(responseAdate => {

      console.log('Reposne ADATe', responseAdate)
     
      var count = Object.keys(responseAdate.ddates).length;
      console.log('ADATE Count', count)
      let aDateData = [];
      for (var i = 0; i < count; i++) {
        aDateData.push({ value: responseAdate.ddates[i].id, label: responseAdate.ddates[i].start_datetime });
      }
      // console.log(JSON.stringify(Data))
      setADate(aDateData);
    });
  }
  const getTypeofdData = (typeofdid) =>{

    console.log('TYpeofD', typeofdid)
    // console.log('Board id', BoardID)
    fetch(`https://dpmis.punjab.gov.pk/api/app/typeofd`, {
      method: 'GET',
      headers:{
        'Accept': 'application/json',
          'Content-Type':'application/json'
      },
    })
    .then(respdistrict => respdistrict.json())
    .then(respDistrictName => {

      const districtReponse = respDistrictName.typeofd;
      districtReponse.map((item, i) => {
        if(item.id == typeofdid){
          setDisability(item.name)
        }
      });
     
    });
  }
  const getCauseofdData = ([typeofdid,casueofdid]) =>{

    console.log('TYpeofD', typeofdid)
    console.log('Cause of d id', casueofdid)
    // console.log('Board id', BoardID)
    fetch(`https://dpmis.punjab.gov.pk/api/app/causeofd/${typeofdid}`, {
      method: 'GET',
      headers:{
        'Accept': 'application/json',
          'Content-Type':'application/json'
      },
    })
    .then(respCause => respCause.json())
    .then(respCauseName => {

      console.log('Cause Name', respCauseName)
      const causeData = respCauseName.causeofd;
      causeData.map((item, i) => {
        if(item.id == casueofdid){
          setCause(item.name)
        }
      });
     
    });
  }
  const handleAppointmentForm = () =>{

    console.log('PWD ID', pwdInfoID)
    console.log('AdTAe', ADate_id)
    console.log('Province', province_id)
    console.log('District', district_id)
    console.log('Board', board_id)

    if(ADate_id == ''){

      ToastAndroid.show('No Dates For Appointment', ToastAndroid.LONG);
      return;
    }else{

    setLoading(true);
    fetch(`https://dpmis.punjab.gov.pk/api/pwdapp/appointstore`, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'secret':'pwdreg',
      },
      body:JSON.stringify({
        pwdpinfos_id:`${pwdInfoID}`,
        adate:`${ADate_id}`,
        aprovince:`${province_id}`,
        adistrict:`${district_id}`,
        aboard:`${board_id}`
      })
    })
    .then(resp => resp.json()).then(response => 
      { 
        // console.log(' Response', response.appointment.id);
        const app_array = [response.appointment];
        response.appointment !='' 
      ?
      syncStorage.set('appoint', app_array)
      :null
      navigation.navigate('Tracking',{
       appointment: app_array
      })
    }).finally(()=> setLoading(false))

  }
  }
  return (
   
    
    <View>
        
      <ImageBackground source={pwdIMage} style={{width:'100%',height:'100%',opacity:0.9}}>
  
      <View style={{padding:30, flex:1, justifyContent:'center'}}>
      <Loader loading={loading} />
            <View style={{width:'100%',backgroundColor:'#fff', height:500,padding:30, borderRadius:30}}>
            <ScrollView
             showsVerticalScrollIndicator={false}
             showsHorizontalScrollIndicator={false}>
              <View>
                <View>
                <Text style={{paddingTop:-1,textAlign: 'center',color: '#002D62', fontWeight: "bold",fontSize: 19}}> PWD's Appointment Booking</Text>
                </View>
                
                <Text style={[styles.Text]}>Full Name:</Text>
                <View style={[styles.Field]}>
                <TextInput
                style={styles.input}
                  value ={fullname}
                  editable = {false}
                  placeholderColor="#c4c3cb"  />
                  
                </View>
                <Text style={[styles.Text]}>Father Name:</Text>
                <View style={[styles.Field]}>
                <TextInput 
                style={styles.input}
                  value ={fathername}
                  editable = {false}
                  placeholderColor="#c4c3cb"  />
                </View>
                <Text style={[styles.Text]}>Gender:</Text>
                <View style={[styles.Field]}>
                <TextInput 
                style={styles.input}
                  value ={gender}
                  editable = {false}
                  placeholderColor="#c4c3cb" />
                </View>
                <Text style={[styles.Text]}>CNIC:</Text>
                <View style={[styles.Field]}>
                <TextInput 
                style={styles.input}
                  value ={cnic}
                  editable = {false}
                  placeholderColor="#c4c3cb" />
                </View>
                <Text style={[styles.Text]}>Age Group:</Text>
                <View style={[styles.Field]}>
                <TextInput 
                style={styles.input}
                  value ={age}
                  editable = {false}
                  placeholderColor="#c4c3cb" />
                </View>
                <Text style={[styles.Text]}>Type of Disability:</Text>
                <View style={[styles.Field]}>
                <TextInput 
                style={styles.input}
                  value ={dability}
                  editable = {false}
                  placeholderColor="#c4c3cb" />
                </View>
                <Text style={[styles.Text]}>Cause of Disability:</Text>
                <View style={[styles.Field]}>
                <TextInput 
                style={styles.input}
                  value ={cause}
                  editable = {false}
                  placeholderColor="#c4c3cb" />
                </View>
                <Text style={[styles.Text]}>Phone no:</Text>
                <View style={[styles.Field]}>
                <TextInput 
                style={styles.input}
                  value ={mPhone}
                  editable = {false}
                  placeholderColor="#c4c3cb" />
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Enter Province:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                  <View style={styles.container}>
                    <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: 'black',backgroundColor:'#D3D3D3', }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      itemTextStyle={styles.itemTextStyle}
                      data={province}
                      labelField="label"
                      valueField="value"
                      placeholder={'Select Province'}
                      searchPlaceholder="Search..."
                      search
                      value={province_id}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                          setProvinceId(item.value);
                          getDistrict(item.value)
                          setFocus(false);
                          
                      }}
                      
                      
                    />
                  </View>
                </View>
              
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Enter District:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                {/* <TextInput  placeholderColor="#c4c3cb" /> */}
                  <View style={styles.container}>

                    <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: 'black',backgroundColor:'#D3D3D3', }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      itemTextStyle={styles.itemTextStyle}
                      data={district}
                      labelField="label"
                      valueField="value"
                      placeholder={'Select District'}
                      searchPlaceholder="Search..."
                      search
                      value={district_id}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                          setDistrictId(item.value);
                          getBoard(item.value)
                          setFocus(false);
                      }}
                    />
                  </View>
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Enter Medical Board:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                {/* <TextInput  placeholderColor="#c4c3cb" /> */}
                <View style={styles.container}>

                  <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'black',backgroundColor:'#D3D3D3', }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    itemTextStyle={styles.itemTextStyle}
                    data={board}
                    search
                    labelField="label"
                    valueField="value"
                    placeholder={'Select Board'}
                    searchPlaceholder="Search..."
                    value={board_id}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setBoardId(item.value);
                        getAdate(item.value);
                        setFocus(false);
                    }}
                  />
                </View>
                
                </View>
                <Text style={[styles.Text]}>Appointment in:</Text>
                    
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                {/* <TextInput  placeholderColor="#c4c3cb" /> */}
                  <View style={styles.container}>

                    <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: 'black',backgroundColor:'#D3D3D3', }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      itemTextStyle={styles.itemTextStyle}
                      data={adate}
                      labelField="label"
                      valueField="value"
                      placeholder={'Select Appointment date'}
                      searchPlaceholder="Search..."
                      value={ADate_id}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                          setADateId(item.value);
                          setFocus(false);
                      }}
                    />
                  </View>
                </View>






      
                <TouchableOpacity  
                  onPress={handleAppointmentForm}
                  style={styles.ButtonStyle}
                  activeOpacity={0.5}>                     
                  <Text style={[styles.text,{textAlign:'center'}]}>Submit</Text>         
               </TouchableOpacity>
             
              </View>
            </ScrollView>
            </View>
        </View>
        </ImageBackground>
      </View>

    
    
  );
};

const styles = StyleSheet.create({

  ButtonStyle:{
    justifyContent: 'center',
    width:'30%',
    padding:10,
    borderRadius: 14,
    backgroundColor: '#002D62',
    marginTop:20,
    marginLeft:'70%',
    
  },
  placeholderStyle: {
    color:'grey',
    fontSize: 14,
    margin:2
  },
  text:{
    color:'white',
    fontSize:15,
    fontFamily: "sans-serif",
  
  },
  Field:{
    marginTop:10,
    backgroundColor:'#D3D3D3',
    borderRadius:3,
    height:40,
    // width:'50%'
  },
  Text:{
    marginTop:15,
    fontWeight:"bold",
    color:"#000000"
  },
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    backgroundColor:'#D3D3D3',
    margin: 0
  },
  input:{
    color: 'black',
  },
  selectedTextStyle: {
    fontSize: 16,
    color:'black'
  },
  itemTextStyle:{
    color:'black'
  },
  inputSearchStyle : {
    color:'black'
  }
});
export default PwdAppointment;