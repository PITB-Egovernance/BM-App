/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React,{useEffect,useCallback, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  TouchableOpacity,
  ImageBackground,
  onLoginPress,
  onPressLearnMore,
  Button,
} from 'react-native';
  
import { Alert, Keyboard, KeyboardAvoidingView,  TextInput, TouchableWithoutFeedback,  } from "react-native";
import pwdIMage from '../../../assets/images/background.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-element-dropdown';
import syncStorage from 'react-native-sync-storage';

const Step2 = ({navigation}) => {
  const user_detail                               = syncStorage.get('userDetail');
  const user_phoneno                              = user_detail.phoneno;
  const [Focus, setFocus]                         = useState(false);
  const [value, setValue]                         = useState(null);
  const [isFocus, setIsFocus]                     = useState(false);
  const [typeofd, setTypeofd]                     = useState([]);
  const [typeofd_id, setTypeofdId]                = useState('');
  const [causeofd, setCauseofd]                   = useState([]);
  const [causeofd_id, setCauseofdId]              = useState('');
  const [errorValidate, setErrorValidate]         = useState(false);
  const [dependents, setDependents]               = useState('');
  const [religion, setReligion]                   = useState('');
  const [permanentAddress, setPermanentAddress]   = useState('');
  const [presentAddress, setPresentAddress]       = useState('');
  const [nationality, setNationality]             = useState('');
  const [domicileDistrict, setDomicileDistrict]   = useState('');
  const [phone, setPhone]                         = useState(user_phoneno);
  const [disability_id, setDisabilityID]          = useState('');
  const [province, setProvince]                   = useState([]);
  const [district, setDistrict]                   = useState([]);
  const [districtID,setDistrictID]                = useState('');
  const [tehsil, setTehsil]                       = useState([]);
  const [tehsilID, setTehsilId]                   = useState('');
  const [province_id, setProvinceId] = useState('');
  useEffect(() =>{
        /* Step 1 fields Get */
        const firstName          = syncStorage.get('FirstName')
        const lastName           = syncStorage.get('LastName')
        const relation           = syncStorage.get('Relation')
        const valueRelation      = syncStorage.get('valueRelation')
        const gender             = syncStorage.get('Gender')
        const cnic               = syncStorage.get('CNIC')
        const age                = syncStorage.get('Age')
        const dob                = syncStorage.get('DOB')
        const maritalStatus      = syncStorage.get('MaritalStatus')
        const regDate            = syncStorage.get('RegDate')
        const profileImage       = syncStorage.get('ProfileImage')
        const profileURI         = syncStorage.get('profileURI')
        const profileType        = syncStorage.get('profileType')
        const profileName        = syncStorage.get('profileName')

    
    console.log(profileImage,firstName,lastName,relation,valueRelation,gender,cnic,age,dob,regDate,maritalStatus)
    getTypeofd();
  }, []);

  /* Api INtegartion CAll */
    const getTypeofd = () => {
      fetch('https://dpmis.punjab.gov.pk/api/app/typeofd', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
      })
      .then(response => response.json())
      .then(response => {

        // {response:{typeofds:{{'id','name'}, object2, object3, object4}}}
        var count = Object.keys(response.typeofd).length; /* 4 */
        if(count > 0){
          let dropDownData = [];
          for (var i = 0; i < count; i++) {
            dropDownData.push({
              value: response.typeofd[i].id,
              label: response.typeofd[i].name,
            });
          }
          setTypeofd(dropDownData);
        }
      });
    }
    const getCauseofd = (provinceID) => {
      const province_id  = provinceID;
      fetch(`https://dpmis.punjab.gov.pk/api/app/causeofd/${provinceID}`, {
        method: 'GET',
        headers:{},
      })
      .then(resp => resp.json())
      .then(responseCauseofd => {

        // console.log('Causeofd', responseCauseofd.causeofd)
        var count = Object.keys(responseCauseofd.causeofd).length;
        // console.log('Cause Count', count)
        let causeofdData = [];
        for (var i = 0; i < count; i++) {
            causeofdData.push({ value: responseCauseofd.causeofd[i].id, label: responseCauseofd.causeofd[i].name });
        }
        // console.log(JSON.stringify(causeofdData))
        setCauseofd(causeofdData);
      });
    }
    
  useEffect(() =>{
    getProvince();
    getDistrict();
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
  const getDistrict = () =>{

    fetch(`https://dpmis.punjab.gov.pk/api/app/district`, {
      method: 'GET',
      headers:{},
    })
    .then(respDistrict => respDistrict.json())
    .then(responseDistrict => {

      // console.log('DIstricts', responseDistrict)
     
      var count = Object.keys(responseDistrict.districts).length;
      // console.log('Districts COunt', count)
      let districtsData = [];
      for (var i = 0; i < count; i++) {
        districtsData.push({ value: responseDistrict.districts[i].id, label: responseDistrict.districts[i].name });
      }
      // console.log(JSON.stringify(Data))
      setDistrict(districtsData);
    });
  }
  const getTehsil = (dist_id) => {
    const district_id  = dist_id;
    fetch(`https://dpmis.punjab.gov.pk/api/app/tehsil/${district_id}`, {
      method: 'GET',
      headers:{
        'Accept': 'application/json',
        'secret':'f08md117',
        'Content-Type': 'application/json',
      },
    })
    .then(resp => resp.json())
    .then(responseTehsil => {
      console.log('Tehsil : ', responseTehsil)
      var count = Object.keys(responseTehsil.tehsil).length;
      console.log('Tehsil COunt', count)
      let tehsilData = [];
      for (var i = 0; i < count; i++) {
        tehsilData.push({ value: responseTehsil.tehsil[i].id, label: responseTehsil.tehsil[i].tname });
      }
      console.log(JSON.stringify(tehsilData))
      setTehsil(tehsilData);
    });
  }




  /* End Api Integration Call */
 
  /* Dropdown Array  */
    const nationalityData = [
      { label: 'Pakistani', value: 'Pakistani' },
      { label: 'Dual(Pakistani and Other)', value: 'Dual(Pakistani and Other)' },
      { label: 'Other', value: 'Other' },
    ];
    const religionData = [
      { label: 'Muslim', value: 'Muslim' },
      { label: 'Non-Muslim', value: 'Non-Muslim' },
      { label: 'Christian', value: 'Christian' },
      { label: 'Other', value: 'Other' },
    ];
    const dependentData = [
      { label: '0', value: '0' },
      { label: '1', value: '1' },
      { label: '2', value: '2' },
      { label: '3', value: '3' },
      { label: '4', value: '4' },
      { label: '5', value: '5' },
      { label: '6', value: '6' },
      { label: '7', value: '7' },
      { label: '8', value: '8' },
      { label: '9', value: '9' },
      { label: '10',value: '10' },
    ];
  /* End Dropdown Array */
  const NextStepSecond = () => {
    // console.log('Typeofd', typeofd_id)
    // console.log('Causeofd', causeofd_id)

    
    setErrorValidate(true)
    if(!typeofd_id){
      ToastAndroid.show('Select Your Disability Type', ToastAndroid.LONG);
      return;
    }else if(!causeofd_id){
      ToastAndroid.show('Select Your Disability Cause', ToastAndroid.LONG);
      return;
    }else if(!dependents){
      ToastAndroid.show('Select Dependents', ToastAndroid.LONG);
      return;
    }else if(!religion){
      ToastAndroid.show('Select Your Religion', ToastAndroid.LONG);
      return;
    }else if(!nationality){
      ToastAndroid.show('Select Your Nationality', ToastAndroid.LONG);
      return;
    }else if(!permanentAddress){
      ToastAndroid.show('Enter Your Permanent Adress', ToastAndroid.LONG);
      return;
    }else if(!presentAddress){
      ToastAndroid.show('Enter Your Present Adress', ToastAndroid.LONG);
      return;
    }else if(!province_id){
      ToastAndroid.show('Select Your Province', ToastAndroid.LONG);
       return;
    }else if(!domicileDistrict){
      ToastAndroid.show('Select Domicile District', ToastAndroid.LONG);
       return;
    }else if(!tehsilID){
      ToastAndroid.show('Select Your Tehsil', ToastAndroid.LONG);
       return;
    }else if(!phone){
      ToastAndroid.show('Enter Your Phone Number', ToastAndroid.LONG);
       return;
    }else{
      console.log(
        'typeofd_id',typeofd_id, 'causeofd_id',causeofd_id,'dependents',dependents,'religion',religion,'permanentAddress',permanentAddress,'presentAddress',presentAddress,'nationality',nationality,'province_id',province_id,'domicileDistrict',domicileDistrict,'phone',phone);
      syncStorage.set('disability',typeofd_id)
      syncStorage.set('cause',causeofd_id)
      syncStorage.set('dependents',dependents)
      syncStorage.set('religion',religion)
      syncStorage.set('perAddress',permanentAddress)
      syncStorage.set('preAddress',presentAddress)
      syncStorage.set('Nationality',nationality)
      syncStorage.set('domicile',domicileDistrict)
      syncStorage.set('province',province_id)
      syncStorage.set('tehsil',tehsilID)
      syncStorage.set('phone',phone)
      navigation.navigate('Step3');
    }
  }
  return (
    <View>
    
      <ImageBackground source={pwdIMage} style={{width:'100%',height:'100%',opacity:0.9}}>
          <View style={{padding:30, flex:1, justifyContent:'center'}}>
            <View style={{width:'100%',backgroundColor:'#fff', height:500,padding:30, borderRadius:30}}>
            <ScrollView
             showsVerticalScrollIndicator={false}
             showsHorizontalScrollIndicator={false}>
              <View style={[styles.loginFormView,{}]}>
              <View style={{flex:1,flexDirection:'row',}}>
                  <TouchableOpacity onPress={() => navigation.navigate('Step1')}>
                    <Icon 
                      name="arrow-left"
                      size={20}
                      style={{alignItems:'center', top:5, color:'#002D62', marginRight:20}}
                    />
                  </TouchableOpacity>
                <Text style={[styles.logoText,{paddingTop:-1,textAlign: 'center',color: '#002D62', fontWeight: "bold",fontSize: 19}]}>
                  PWD Registerion Form</Text>
                </View>
                <View style={{}}>
               
                </View>
               
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Type of Disability: (معزوری کی اقسام)<Text style={{color:'red'}}> *</Text></Text>

                    <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: 'black',backgroundColor:'#D3D3D3', }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      itemTextStyle={styles.itemTextStyle}
                      data={typeofd}
                      search
                      labelField="label"
                      valueField="value"
                      placeholder={'Select Disability Type'}
                      searchPlaceholder="Search..."
                      value={typeofd_id}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                          setTypeofdId(item.value);
                          getCauseofd(item.value)
                          setFocus(false);
                      }}
                    />


                {/* <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput  placeholderColor="#c4c3cb" 
                 style={[styles.Step2FormTextInput
                  ,{borderColor: !disability && errorValidate ? 'red':'#fff'}
                ]}
                 onChangeText={(disability) => setDisability(disability)}
                 value={disability}
                />
                </View> */}
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Cause of Disability: (معزوری کی وجہ)<Text style={{color:'red'}}> *</Text></Text>

                <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: 'black',backgroundColor:'#D3D3D3', }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      itemTextStyle={styles.itemTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      data={causeofd}
                      search
                      labelField="label"
                      valueField="value"
                      placeholder={'Select Disability Cause'}
                      searchPlaceholder="Search..."
                      value={causeofd_id}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                          setCauseofdId(item.value);
                          setFocus(false);
                      }}
                    />
                {/* 
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput  placeholderColor="#c4c3cb" 
                style={[styles.Step2FormTextInput
                  ,{borderColor: !causeDisability && errorValidate ? 'red':'#fff'}
                ]}
                 onChangeText={(causeDisability) => setCauseDisability(causeDisability)}
                 value={causeDisability}
                />
                </View> */}
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>No. of dependent family: (انحصار کنندہ)<Text style={{color:'red'}}> *</Text></Text>
                <View style={styles.container}>
                      <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        itemTextStyle={styles.itemTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={dependentData}
                        // search
                        labelField="label"
                        valueField="value"
                        placeholder={'Please Select any option'}
                        // searchPlaceholder="Search..."
                        value={dependents}
                        onChange={item => {
                            setDependents(item.value);
                        }}
                      />
                  </View>
                {/* <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput  placeholderColor="#c4c3cb" 
                 style={[styles.Step2FormTextInput
                  ,{borderColor: !dependents && errorValidate ? 'red':'#fff'}
                ]}
                 onChangeText={(dependents) => setDependents(dependents)}
                 value={dependents}
                />
                </View> */}
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Religion: (مزہب)<Text style={{color:'red'}}> *</Text></Text>
                <View style={styles.container}>
                      <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        itemTextStyle={styles.itemTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={religionData}
                        // search
                        labelField="label"
                        valueField="value"
                        placeholder={'Select Religion'}
                        // searchPlaceholder="Search..."
                        value={religion}
                        onChange={item => {
                            setReligion(item.value);
                        }}
                      />
                  </View>
                  <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Nationality: (قومیت)<Text style={{color:'red'}}> *</Text></Text>
                {/* <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput  placeholderColor="#c4c3cb" 
                 style={[styles.Step2FormTextInput
                  ,{borderColor: !nationality && errorValidate ? 'red':'#fff'}
                ]}
                  onChangeText={(nationality) => setNationality(nationality)}
                  value={nationality}
                />
                </View> */}
                <View style={styles.container}>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    itemTextStyle={styles.itemTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={nationalityData}
                    // search
                    labelField="label"
                    valueField="value"
                    placeholder={'Select Nationality'}
                    // searchPlaceholder="Search..."
                    value={nationality}
                    onChange={item => {
                        setNationality(item.value);
                    }}
                  />
                </View>
                {/* <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput  placeholderColor="#c4c3cb" 
                style={[styles.Step2FormTextInput
                  ,{borderColor: !religion && errorValidate ? 'red':'#fff'}
                ]}
                onChangeText={(religion) => setReligion(religion)}
                value={religion}
                />
                </View> */}

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Permanent Address: (مستقل پتہ)<Text style={{color:'red'}}> *</Text></Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput selectedTextStyle={styles.selectedTextStyle}
                placeholderTextColor='grey'
                    itemTextStyle={styles.itemTextStyle}
                    placeholderColor="#c4c3cb" placeholder='Permanent Address'
                
                style={[styles.Step2FormTextInput
                  ,{borderColor: !permanentAddress && errorValidate ? 'red':'#fff'}
                ]}
                 onChangeText={(permanentAddress) => setPermanentAddress(permanentAddress)}
                 value={permanentAddress}
                />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Present Address: (موجودہ پتہ)<Text style={{color:'red'}}> *</Text></Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput 
                placeholderTextColor='grey'
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={styles.itemTextStyle}
                placeholderColor="#c4c3cb" placeholder='Present Address'
                 style={[styles.Step2FormTextInput
                  ,{borderColor: !presentAddress && errorValidate ? 'red':'#fff'}
                ]}
                 onChangeText={(presentAddress) => setPresentAddress(presentAddress)}
                 value={presentAddress}
                />
                </View>
                 <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Province: (صوبہ)<Text style={{color:'red'}}> *</Text></Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                  <View style={styles.container}>
                    <Dropdown
                      style={[styles.Dropdown, isFocus && { borderColor: 'black',backgroundColor:'#D3D3D3', }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      itemTextStyle={styles.itemTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      data={province}
                      search
                      labelField="label"
                      valueField="value"
                      placeholder={'Select Province'}
                      searchPlaceholder="Search..."
                      value={province_id}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                          setProvinceId(item.value);
                          // getDivision(item.value)
                          setFocus(false);
                          
                      }}
                      
                      
                    />
                  </View>
                </View>
                {/* <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>District of Domicile: (ڈومیسائل کے مطابق ضلع)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput  placeholderColor="#c4c3cb" placeholder='Domicile District'
                 style={[styles.Step2FormTextInput
                  ,{borderColor: !domicileDistrict && errorValidate ? 'red':'#fff'}
                ]}
                    onChangeText={(domicileDistrict) => setDomicileDistrict(domicileDistrict)}
                    value={domicileDistrict}
                />
                </View> */}
                
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>District of Domicile: (ضلع ڈومیسائل)<Text style={{color:'red'}}> *</Text></Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                  <View style={styles.container}>
                    <Dropdown
                      style={[styles.Dropdown, isFocus && { borderColor: 'black',backgroundColor:'#D3D3D3', }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      itemTextStyle={styles.itemTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      data={district}
                      search
                      labelField="label"
                      valueField="value"
                      placeholder={'Select District'}
                      searchPlaceholder="Search..."
                      value={domicileDistrict}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setDomicileDistrict(item.value);
                        getTehsil(item.value);
                        setFocus(false);
                      }}
                    />
                  </View>
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Tehsil:  (تحصیل)<Text style={{color:'red'}}> *</Text></Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                  <View style={styles.container}>
                    <Dropdown
                      style={[styles.Dropdown, isFocus && { borderColor: 'black',backgroundColor:'#D3D3D3', }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      itemTextStyle={styles.itemTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      search
                      data={tehsil}
                      labelField="label"
                      valueField="value"
                      placeholder={'Select Tehsil'}
                      value={tehsilID}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setTehsilId(item.value);
                        setFocus(false);
                      }}
                    />
                  </View>
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Phone Number: (موبائل نمبر)<Text style={{color:'red'}}> *</Text></Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput 
              placeholderTextColor='grey'
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={styles.itemTextStyle}
                placeholder="Enter Your Phone no" 
                onChangeText={(phone) => setPhone(phone)}
                value={phone}
                placeholderColor="#c4c3cb" 
                keyboardType='numeric'
                maxLength={11}
                style={[styles.Step2FormTextInput
                  ,{borderColor: !phone && errorValidate ? 'red':'#fff'}
                ]} />
                </View>
                <View style={[styles.row,{justifyContent:'space-between', alignSelf:'flex-end'}]}>
                {/* <TouchableOpacity  
                            onPress={() => navigation.navigate('Step1')}
                            style={styles.ButtonStyle}
                            activeOpacity={0.5}>
                        
                          <Text style={[styles.text,{textAlign:'center'}]}>Back</Text>         
               </TouchableOpacity> */}
               <TouchableOpacity  
                            onPress={NextStepSecond}
                            style={styles.ButtonStyle}
                            activeOpacity={0.5}>
                        
                          <Text style={[styles.text,{textAlign:'center'}]}>Next</Text>         
               </TouchableOpacity>
               </View>
              </View>
            </ScrollView>
            </View>
        </View>
        </ImageBackground>
      </View>

    
    
  );
};

const styles = StyleSheet.create({
  Step2FormTextInput:{
    flex: 1,
    color: 'black',
   
    borderWidth: 1,
    backgroundColor:'#D3D3D3',
    borderRadius:5, 
    height:40,
    borderColor: '#dadae8',
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
  ButtonStyle:{
    justifyContent: 'center',
    width:'30%',
    padding:10,
    borderRadius: 14,
    backgroundColor: '#002D62',
    marginTop:10,
    marginLeft:'70%',
    
  },
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    backgroundColor:'#D3D3D3',
    marginTop: 10
  },
Dropdown:{
  height: 40,
  borderColor: 'gray',
  borderWidth: 0.5,
  borderRadius: 5,
  paddingHorizontal: 8,
  backgroundColor:'#D3D3D3',
  margin: 0
},
  text:{
    color:'white',
    fontSize:15,
    fontFamily: "sans-serif",
  
  },
row:{
 flex:1,
 flexDirection:'row'
},
selectedTextStyle: {
  fontSize: 16,
  color:'black'
},
itemTextStyle:{
  color:'black'
},
placeholderStyle:{
  color:'grey'
},
inputSearchStyle : {
  color:'black'
}
});

export default Step2;