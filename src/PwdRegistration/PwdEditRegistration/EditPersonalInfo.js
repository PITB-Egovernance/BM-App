/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React,{useEffect,useCallback, useState} from 'react';
import {

  ScrollView,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  ToastAndroid,
  Platform
  
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Alert, Keyboard, KeyboardAvoidingView,  TextInput,Image, TouchableWithoutFeedback,  } from "react-native";
import pwdIMage from '../../../assets/images/background.png';
import syncStorage from 'react-native-sync-storage';
import { RadioButton, Text } from 'react-native-paper';
import DocumentScanner from 'react-native-document-scanner-plugin';
import DocumentPicker,{types} from 'react-native-document-picker';
import { DatePickerInput } from 'react-native-paper-dates';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFetchBlob from 'rn-fetch-blob';
import DateTimePicker from '@react-native-community/datetimepicker';
import Loader from '../../Components/Loader';



const EditPersonalInfo = ({navigation,route}) => {

const [errorValidate, setErrorValidate]              = useState(false);
const [loading, setLoading]                          = useState(false);
const [firstName, setFirstName]                      = useState('');
const [lastname,  setLastName]                       = useState('');
const [relation, setRelation]                        = useState('');
const [father_spouse_name, setfather_spouse_name]    = useState('');
const [relationship, setRelationship]                = useState('');
const [Agegroup, setAge]                             = useState('');
const [maritalstatus, setMarital]                    = useState('');
const [maritalstatusid, setMaritalID]                = useState('');
const [gender, setGender]                            = useState('');
const [cnic, setCnic]                                = useState('');
const [cnicFrontPic, setCnciFrontPic]                = useState('');
const [cnicBackPic, setCnciBackPic]                  = useState('');
const [dob, setDob]                                  = useState('');
const [regDate, setRegDate]                          = useState('');
const [profileImage, setProfileImage]                = useState('');
const [depfamily, setdepfamily]                      = useState('');
const [nationality, setNationality]                  = useState('');
const [religion, setReligion]                        = useState('');
const [paddress, setPaddress]                        = useState('');
const [ppaddress, setPpaddress]                      = useState('');
const [phone, setPhone]                              = useState('');
const [province, setProvince]                        = useState([]);
const [district, setDistrict]                        = useState([]);
const [domicileDistrict, setDomicileDistrict]        = useState('');


const [province_id, setProvinceId]                   = useState('');
const [district_id, setDistrictId]                   = useState('');
const [tehsil, setTehsil]                            = useState([]);
const [tehsilID, setTehsilId]                        = useState('');

const [isFocus, setIsFocus]                          = useState(false);
const [Focus, setFocus]                              = useState(false);
const pwdInfoID                                      = syncStorage.get('pwdinfo_id');
  // profile
  const [image, setImage]                   = useState('');
  const [uriImage, setURIImage]             = useState('');
  const [imageName, setImageName]           = useState('');
  const [imageType, setImageType]           = useState('');
   // cnicf
   const [cnicFImage, setCnicFImage]        = useState('');
   const [uriCNICF,setURICNICF]             = useState('');
   const [cnicFName,setCNICFName]           = useState('');
   const [cnicFType,setcnicFType]           = useState('');
   // cnicb
   const [cnicbImage, setCnicBImage]        = useState('');
   const [uriCNICB, setURICNICB]            = useState('');
   const [cnicbName, setCnicBName]          = useState('');
   const [cnicbType, setCnicBType]          = useState('');
   // certifile bform       
   const [certiImage, setCertiImage]        = useState('');
   const [uriCerti, setURICerti]            = useState('');
   const [certiName, setCertiName]          = useState('');
   const [certiType, setCertiType]          = useState('');

   const [date, setDate] = useState(new Date());
   const [mode, setMode] = useState('date');
   const [show, setShow] = useState(false);
   const [dateDob,setDateDob]=useState('');
   const [dateRegistered,setDateRegistered]=useState('');
  //  for matching useState
  const [old_image, setOldImage]  = useState('');
  const [old_firstName, setOldFirstName]  = useState('');
  const [old_lastname, setOldLastName]   = useState('');
  const [old_cnic, setOldCnic] = useState('');
  const [old_gender, setOldGender] = useState('');
  const [old_ppaddress, SetOldppaddress] = useState('');
  const [old_dob, setOlddob] = useState('');
  const [old_reg, setoldRegDate] = useState('');
  const [old_father_spouse_name, setOldfatherSpouseName] = useState('');
  const [old_paddress, setOldpaddress] = useState('');
  const [old_phone, setOldPhone] = useState('');
  
  
  const genderData = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Transgender', value: 'Transgender' },
  ];
  const maritalData = [
    { label: 'Married', value: 'Married' },
    { label: 'Widowed', value: 'Widowed' },
    { label: 'Widower', value: 'Widower' },
    { label: 'Divorced', value: 'Divorced' },
    { label: 'Single', value: 'Single' },
    { label: 'Separated', value: 'Separated' },
  ];

  const agegroup = [
    { label: '0-5', value: '0-5' },
    { label: '5-10', value: '5-10' },
    { label: '10-15', value: '10-15' },
    { label: '15-20', value: '15-20' },
    { label: '20-25', value: '20-25' },
    { label: '25-30', value: '25-30' },
    { label: '30-35', value: '30-35' },
    { label: '35-40', value: '35-40' },
    { label: '40-45', value: '40-45' },
    { label: '45-50', value: '45-50' },
    { label: '50-55', value: '50-55' },
    { label: '55-60', value: '55-60' },
    { label: '65-70', value: '65-70' },
    { label: '70-75', value: '70-75' },
    { label: '75-100', value:'75-100' },
    { label: '100-120', value:'100-120' },
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

  useEffect(() =>{
    getProvince();
    getDistrict();
    PwdDtl();
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
  const gettehsil = (district_id) => {
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
      // console.log('Tehsil COunt', count)
      let tehsilData = [];
      for (var i = 0; i < count; i++) {
        tehsilData.push({ value: responseTehsil.tehsil[i].id, label: responseTehsil.tehsil[i].tname });
      }
      console.log(JSON.stringify(tehsilData))
      setTehsil(tehsilData);
    });
  }

  const getDistrict = () =>{
    fetch(`https://dpmis.punjab.gov.pk/api/app/district`, {
      method: 'GET',
      headers:{},
    })
    .then(respDistrict => respDistrict.json())
    .then(responseDistrict => {
      var count = Object.keys(responseDistrict.districts).length;
      // console.log('Districts COunt', count)
      let districtsData = [];
      for (var i = 0; i < count; i++) {
        districtsData.push({ 
          value: responseDistrict.districts[i].id, 
          label: responseDistrict.districts[i].name 
        });
      }
      setDistrict(districtsData);
    });
  }
  const profileimage = async () => {
    DocumentPicker.pick({
      allowMultiSelection: false,
      type: [DocumentPicker.types.images],
    })
      .then((response) => {
        // console.log('response', JSON.stringify(response[0], null, 2))
        setProfileImage(response[0].uri)
        setURIImage(response[0].uri)
        setImageName(response[0].name)
        setImageType(response[0].type)
        setImage(response[0].name)
      })
  }
  const cnicFront = async () => {
    DocumentPicker.pick({
      allowMultiSelection: false,
      type: [DocumentPicker.types.images],
    })
      .then((response) =>
   {   
      // console.log('response',JSON.stringify(response[0], null, 2))
      setCnicFImage(response[0].uri)
      setURICNICF(response[0].uri)
      setCNICFName(response[0].name)
      setcnicFType(response[0].type)
      // console.log(cnicFName, uriCNICF, cnicFImage, cnicFType);
   })
  }
  const cnicBack = async () => {
    DocumentPicker.pick({
      allowMultiSelection: false,
      type: [DocumentPicker.types.images],
    })
      .then((response) =>
   {   
      // console.log('response',JSON.stringify(response[0], null, 2))
      setCnicBImage(response[0].uri)
      setURICNICB(response[0].uri)
      setCnicBName(response[0].name)
      setCnicBType(response[0].type)
   })
  }
  // bform . certificate
  const bForm = async () => {
    DocumentPicker.pick({
      allowMultiSelection: false,
      type: [DocumentPicker.types.images],
    })
      .then((response) =>
   {   
      // console.log('response',JSON.stringify(response[0], null, 2))
      setCertiImage(response[0].uri)
      setURICerti(response[0].uri)
      setCertiName(response[0].name)
      setCertiType(response[0].type)
   })
  }
  // fetch old values ....
  const PwdDtl = () => {
    setLoading(true)

    fetch(`https://dpmis.punjab.gov.pk/api/pwdapp/pwdregshow/${pwdInfoID}`, {
      method: 'GET',
      headers:{
        'Accept': 'application/json',
        'Content-Type':'application/json',
        'secret':'pwdreg'
      },
    })
    .then(pwdinfoDetail => pwdinfoDetail.json())
    .then(resppwdinfoDetail => {
      // match with old value
      const old_image                              = resppwdinfoDetail['PWD basic info'][0].iamge;
      setOldImage(old_image);
      const old_firstName                          = resppwdinfoDetail['PWD basic info'][0].firstname;
      setOldFirstName(old_firstName);
      const old_lastname                           = resppwdinfoDetail['PWD basic info'][0].lastname;
      setOldLastName(old_lastname);
      const old_cnic                               = resppwdinfoDetail['PWD basic info'][0].cnic;
      setOldCnic(old_cnic);
      const old_gender                             = resppwdinfoDetail['PWD basic info'][0].gender;
      setOldGender(old_gender);
      const old_father_spouse_name                 = resppwdinfoDetail['PWD basic info'][0].father_spouse_name;
      setOldfatherSpouseName(old_father_spouse_name);
      const old_paddress                           = resppwdinfoDetail['PWD basic info'][0].paddress;
      setOldpaddress(old_paddress);
      const old_ppaddress                          = resppwdinfoDetail['PWD basic info'][0].ppaddress;
      SetOldppaddress(old_ppaddress);
      const old_dob                                = resppwdinfoDetail['PWD basic info'][0].dob;
      setOlddob(old_dob);
      const old_reg                                = resppwdinfoDetail['PWD basic info'][0].regdate;
      setoldRegDate(old_reg);
      const old_phone                            = resppwdinfoDetail['PWD basic info'][0].phone;
      setOldPhone(old_phone)
      // for view old
      const firstName                         = resppwdinfoDetail['PWD basic info'][0].firstname;
      setFirstName(firstName); 
      const lastname                          = resppwdinfoDetail['PWD basic info'][0].lastname;
      setLastName(lastname); 
      const cnic                              = resppwdinfoDetail['PWD basic info'][0].cnic;
      setCnic(cnic); 
      const gender                            = resppwdinfoDetail['PWD basic info'][0].gender;
      setGender(gender); 
      const father_spouse_name                = resppwdinfoDetail['PWD basic info'][0].father_spouse_name;
      setfather_spouse_name(father_spouse_name)
      const relationship                      = resppwdinfoDetail['PWD basic info'][0].relationship;
      setRelationship(relationship)
      const paddress                           = resppwdinfoDetail['PWD basic info'][0].paddress;
      setPaddress(paddress)
      const ppaddress                          = resppwdinfoDetail['PWD basic info'][0].ppaddress;
      setPpaddress(ppaddress)
      const maritalstatus                         = resppwdinfoDetail['PWD basic info'][0].maritalstatus;
      setMarital(maritalstatus)
      const nationality                       = resppwdinfoDetail['PWD basic info'][0].nationality;
      setNationality(nationality)
      const religion                         = resppwdinfoDetail['PWD basic info'][0].religion;
      setReligion(religion)
      const phone                            = resppwdinfoDetail['PWD basic info'][0].phone;
      setPhone(phone)
      const Agegroup                        = resppwdinfoDetail['PWD basic info'][0].agegroup;
      setAge(Agegroup)
      const depfamily                         = resppwdinfoDetail['PWD basic info'][0].depfamily;
      setdepfamily(depfamily)
      const dateob                               = resppwdinfoDetail['PWD basic info'][0].dob;
      setDob(dateob)
      const regdate                           = resppwdinfoDetail['PWD basic info'][0].regdate;
      setRegDate(regdate)
      const province_id                       = resppwdinfoDetail['PWD basic info'][0].province;
      setProvinceId(province_id);
      const district_id                       = resppwdinfoDetail['PWD basic info'][0].district;
      setDistrictId(JSON.parse(district_id));
      const tehsil_id                         = resppwdinfoDetail['PWD basic info'][0].tehsil;
      setTehsilId(tehsil_id);
    }).finally(() =>{
      setLoading(false);
    });
  }
  // console.log('DOB Date:', dateob)

  // update new values here ....
  const [monthDate, setMonth] = useState('');
  const [dayDate, setDay] = useState('');
  const UpdatePwdDtl = () =>{
      if (old_image != imageName || old_firstName != firstName || old_lastname != lastname || old_dob != dob || old_father_spouse_name != father_spouse_name || old_cnic != cnic || old_gender != gender || old_ppaddress != ppaddress || old_paddress != paddress || old_phone != phone ) {
        if ((uriCNICB != '' && uriCNICF != '') || (uriCerti != '')) {
          UpdateFormData();
        } else {
          ToastAndroid.show('Must upload your CNIC or B-Form for Updation.', ToastAndroid.LONG);
          return;
        }
      }
  }
  // formdata for update
  const UpdateFormData = () =>
  {
    const user_id              = syncStorage.get('user_id');
    const formData = new FormData();
      formData.append('user_id', user_id);
      if (uriImage == '') {
      } else {
        formData.append('image', {
          uri:Platform.OS === 'android' ?  uriImage: uriImage.replace('file://', ''),
          type:imageType,
          name:imageName
        });
      }
      formData.append('firstname', firstName);
      formData.append('lastname', lastname);
      formData.append('relationship', relationship);
      formData.append('father_spouse_name', father_spouse_name);
      formData.append('gender', gender);
      formData.append('cnic',cnic);
      formData.append('agegroup', Agegroup);

      if(dateDob === undefined || dateDob === 'undefined' || dateDob === null || dateDob === ''){
        formData.append('dob', JSON.stringify(old_dob).slice(1,-1));
      }else {
        const year    = dateDob.getFullYear();
        const month   = (dateDob.getMonth() + 1).toString().padStart(2, "0"); 
        const day     = dateDob.getDate().toString().padStart(2, "0");
        const dobdate = `${year}-${month}-${day}`;
        formData.append('dob', JSON.stringify(dobdate).slice(1,-1));
        
      }

      formData.append('maritalstatus', maritalstatus);
      formData.append('depfamily', depfamily);
      formData.append('religion', religion);
      formData.append('ppaddress', ppaddress);
      formData.append('paddress', paddress);
      formData.append('nationality', nationality);
      formData.append('phone', phone);

      if(dateRegistered === undefined || dateRegistered === 'undefined' || dateRegistered === null || dateRegistered === ''){
        formData.append('regdate', JSON.stringify(old_reg).slice(1,-1));
     
      }else {
        const year    = dateRegistered.getFullYear();
        const month   = (dateRegistered.getMonth() + 1).toString().padStart(2, "0"); 
        const day     = dateRegistered.getDate().toString().padStart(2, "0");
        const registereddate = `${year}-${month}-${day}`;
        formData.append('regdate', JSON.stringify(registereddate).slice(1,-1));
       
      }

      // formData.append('regdate', JSON.stringify(regDate).slice(1,-1));
      formData.append('province',province_id);
      formData.append('district', district_id);
      formData.append('tehsil', tehsilID);
      if (uriCNICF == '') {
      } else {
        formData.append('imagecnicf', {
          uri:Platform.OS === 'android' ?  uriCNICF: uriCNICF.replace('file://', ''),
          type:cnicFType,
          name:cnicFName
        });
      }
      if (uriCNICB == '') {
      } else {
        formData.append('imagecnicb', {
          uri:Platform.OS === 'android' ?  uriCNICB: uriCNICB.replace('file://', ''),
          type:cnicbType,
          name:cnicbName
        });
      }
      if (uriCerti == '') {
        
      } else {
        formData.append('certifile', {
          uri:Platform.OS === 'android' ?  uriCerti: uriCerti.replace('file://', ''),
          type:certiType,
          name:certiName
        });
      }
      console.log('formdtaa', formData);
      setLoading(true)
      fetch(
        `https://dpmis.punjab.gov.pk/api/pwdapp/changing`,
        {
          method: 'POST',
          headers:{
            'Accept': 'application/json',
            'secret':'pwdreg',
            'Content-Type': 'multipart/form-data',
          },
          body:formData
        },
      )
      .then(resp => resp.json()).then(response => 
        { 
          console.log('response PWD', JSON.stringify(response));
          if(response.success!=''){
            navigation.navigate('UpdateInformation',{
              successsubmit:  '200'
            });
          }
        }
      ).finally(() =>{
        setLoading(false);
      });
  }

  return (
    <View>
      <ImageBackground source={pwdIMage} style={{width:'100%',height:'100%',opacity:0.9}}>
      <Loader loading={loading}/>

          {/* <ScrollView> */}
          <View style={{padding:30, flex:1, justifyContent:'center'}}>
            <View style={{width:'100%',backgroundColor:'#fff', height:500,padding:30, borderRadius:30}}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentInsetAdjustmentBehavior="always"
              keyboardDismissMode="on-drag"
              >
              <KeyboardAvoidingView enabled>
            <View>
              
                <View>
                <Text style={[styles.logoText,{textAlign: 'center',color: '#002D62', fontWeight: "bold",fontSize:15}]}>
                If you want to Edit any your Information Select the Field below.
                </Text>
                </View>
                <Text style={{marginTop:40,fontWeight:"bold",color:"#000000"}}>Profile Image: (تصویر)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height: 100 }}>
                  <TouchableOpacity onPress={profileimage} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:100 }}>
                    {uriImage != '' ? <Image source={{uri:uriImage}} style={{width: '100%', height: 90,resizeMode : 'contain' }} /> :null}
                  </TouchableOpacity>
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>First Name: (پہلا نام )</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput 
                  placeholderColor="#c4c3cb" 
                  placeholder=''
                  style={[styles.Step1FormTextInput
                    ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}
                  onChangeText={(firstName) => setFirstName(firstName)}
                  value={firstName}
                />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Last Name: (آخری نام )</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                  <TextInput 
                    placeholderColor="#c4c3cb" 
                    placeholder=''
                    style={[styles.Step1FormTextInput
                      ,{borderColor: !lastname && errorValidate ? 'red':'#fff'}
                    ]} 
                    onChangeText={(lastname) => setLastName(lastname)}
                    value={lastname}  
                  />
                </View>
                <RadioButton.Group  onValueChange={(relationship) => setfather_spouse_name(relationship)}
                  value={relationship}  style={{marginTop:10}}>
                <View style={{ flexDirection: 'row',marginTop:5}}>
                    <View style={{flexDirection: "row"}}>
                      <RadioButton value="Father_Name"/>
                      <Text style={{fontWeight: 'bold',marginTop:'5%',color:'black'}}>Father Name</Text>
                    </View>
                    <View  style={{flexDirection: "row"}}>
                      <RadioButton value="Spouse_Name" />
                      <Text style={{fontWeight: 'bold',marginTop:'7%',color:'black'}}>Spouse</Text>
                    </View>
                </View>
              </RadioButton.Group>
        
              <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput 
                  placeholderColor="#c4c3cb" 
                  placeholder=''
                  style={[styles.Step1FormTextInput
                    ,{borderColor: !relationship && errorValidate ? 'red':'#fff'}
                  ]} 
                  onChangeText={father_spouse_name => setfather_spouse_name(father_spouse_name)} value={father_spouse_name}
                  />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>CNIC: (قومی شناختی کارڈ نمبر)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                  <TextInput  placeholderColor="#c4c3cb" 
                  placeholder=''
                  keyboardType='numeric'
                  maxLength={13}
                  style={[styles.Step1FormTextInput
                    ,{borderColor: !cnic && errorValidate ? 'red':'#fff'}
                  ]}   
                  onChangeText={(cnic) => setCnic(cnic)}
                  value={cnic} 
                  />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Gender: (جنس )</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                  <View style={styles.container}>

                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      itemTextStyle={styles.itemTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      data={genderData}
                      // search
                      labelField="label"
                      valueField="value"
                      placeholder={'Select Gender'}
                      searchPlaceholder="Search..."
                      value={gender}
                      
                      onChange={item => {
                          setGender(item.value);
                      }}
                    />
                  </View>
                </View>
                
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Age Group: (عمرکی حد)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                  <View style={styles.container}>

                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      itemTextStyle={styles.itemTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      data={agegroup}
                      // search
                      labelField="label"
                      valueField="value"
                      placeholder={'Please Select any option'}
                      searchPlaceholder="Search..."
                      value={Agegroup}
                      onChange={item => {
                          setAge(item.value);
                      }}
                    />
                  </View>
                  
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Date of Birth: (تاریخ پیدائش - شناختی کارڈ کے مطابق )</Text>                 
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
               {/*  <TouchableOpacity
                style={[styles.Step1FormTextInput
                    ,{borderColor: !dob && errorValidate ? 'red':'#fff'}
                  ]}
                   onPress={()=> setShow(true)}  
                >
                  <Text>{String(date)}</Text>
  
                 </TouchableOpacity> */}
                  <DatePickerInput
                      locale="en"
                      label=""
                      value={dateDob}
                      onChange={(dateDob) => setDateDob(dateDob)}
                      inputMode="start"
                      style={{ height: 50, backgroundColor: '#D3D3D3' }}
                    />
                {/* <TextInput  placeholderColor="#c4c3cb" 
                  placeholder=''
                  // editable = {false}
                  style={[styles.Step1FormTextInput
                    ,{borderColor: !dob && errorValidate ? 'red':'#fff'}
                  ]}   
                  onChangeText={(dob) => setDob(dob)}
                  value={dob} 
                  /> */}
                 {/*  {show && (
                    <DateTimePicker
                      testID="showAndDismissPickerButton"
                      value={date}
                      mode={mode}
                      format="YYYY-mm-dd" 
                      display='calendar'
                      onChange={onChange}
                    />
                  )} */}
                  {/* <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    // mode={mode}
                    // is24Hour={true}
                    onChange={(date)=>setDate(date)}
                  /> */}
                  </View>


                <Text style={{marginTop:20,fontWeight:"bold",color:"#000000"}}>Permanent Address: (مستقل پتہ)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                  <TextInput  placeholderColor="#c4c3cb" 
                  placeholder=''
                  style={[styles.Step1FormTextInput
                    ,{borderColor: !cnic && errorValidate ? 'red':'#fff'}
                  ]}   
                  onChangeText={(paddress) => setPaddress(paddress)}
                  value={paddress} 
                  />
                </View>
                <Text style={{marginTop:20,fontWeight:"bold",color:"#000000"}}>Present Address: (مستقل پتہ)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                  <TextInput  placeholderColor="#c4c3cb" 
                  placeholder=''
                  style={[styles.Step1FormTextInput
                    ,{borderColor: !cnic && errorValidate ? 'red':'#fff'}
                  ]}   
                  onChangeText={(ppaddress) => setPpaddress(ppaddress)}
                  value={ppaddress}  
                  />
                </View>
                <Text style={{marginTop:10,fontWeight:"bold",color:"#000000"}}>Registration Date: (تاریخ اندراج )</Text>
                 
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                {/* <TextInput  placeholderColor="#c4c3cb" 
                  placeholder=''
                  style={[styles.Step1FormTextInput
                    ,{borderColor: !cnic && errorValidate ? 'red':'#fff'}
                  ]}   
                  onChangeText={(regDate) => setRegDate(regDate)}
                  value={regDate} 
                  /> */}
                  <DatePickerInput
                      locale="en"
                      label=""
                      value={dateRegistered}
                      onChange={(dateRegistered) => setDateRegistered(dateRegistered)}
                      inputMode="start"
                      style={{ height: 50, backgroundColor: '#D3D3D3' }}
                    />
                </View>

                <Text style={{marginTop:20,fontWeight:"bold",color:"#000000"}}>No. of dependent family: (انحصار کنندہ)</Text>
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
                        value={depfamily}
                        onChange={item => {
                            setdepfamily(item.value);
                        }}
                      />
                  </View>
                <Text style={{marginTop:25,fontWeight:"bold",color:"#000000"}}>Marital Status:(ازدواجی حیثیت)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <View style={styles.container}>

                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      itemTextStyle={styles.itemTextStyle}
                      data={maritalData}
                      // search
                      labelField="label"
                      valueField="value"
                      placeholder={'Please Select any option'}
                      searchPlaceholder="Search..."
                      value={maritalstatus}
                      onChange={item => {
                          setMarital(item.value);
                          setMaritalID(item.label);
                      }}
                    />
                  </View>

                </View>
                
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Nationality: (قومیت)</Text>
                <View style={styles.container}>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    itemTextStyle={styles.itemTextStyle}
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
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Religion: (مزہب)</Text>
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
                  <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Province: (صوبہ):</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                  <View style={styles.container}>
                    <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: 'black',backgroundColor:'#D3D3D3', }]}
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
                          getDistrict(item.value);
                          setFocus(false);
                      }}
                    />
                  </View>
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>District of Domicile: (ڈومیسائل کے مطابق ضلع):</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                  <View style={styles.container}>
                    <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: 'black',backgroundColor:'#D3D3D3', }]}
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
                      value={district_id}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setDistrictId(item.value);
                        gettehsil(item.value);
                        setFocus(false);
                      }}
                    />
                  </View>
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Tehsil: (تحصیل):</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                  <View style={styles.container}>
                    <Dropdown
                      style={[styles.Dropdown, isFocus && { borderColor: 'black',backgroundColor:'#D3D3D3', }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      itemTextStyle={styles.itemTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      data={tehsil}
                      search
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
                    {/* <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: 'black',backgroundColor:'#D3D3D3', }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      itemTextStyle={styles.itemTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      data={tehsil}
                      labelField="label"
                      valueField="value"
                      placeholder={'Select Tehsil'}
                      value={tehsil_id}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                          setTehsilId(item.value);
                          // getDivision(item.value)
                          setFocus(false);
                      }}
                    /> */}
                  </View>
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Phone Number: (موبائل نمبر)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput   
                selectedTextStyle={styles.selectedTextStyle}
                itemTextStyle={styles.itemTextStyle}
                onChangeText={(phone) => setPhone(phone)}
                value={phone}
                placeholderColor="#c4c3cb" 
                keyboardType='numeric'
                maxLength={11}
                style={[styles.Step1FormTextInput
                  ,{borderColor: !phone && errorValidate ? 'red':'#fff'}
                ]} />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Choose CNIC front side</Text>
                <TouchableOpacity onPress={cnicFront} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:100 }}>
                  {uriCNICF != '' ? <Image source={{uri:uriCNICF}} style={{width: '100%', height: 90,resizeMode : 'contain' }} /> :null}
                </TouchableOpacity>
                
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Choose CNIC back side</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TouchableOpacity onPress={cnicBack} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:100 }}>
                    {uriCNICB != '' ? <Image source={{uri:uriCNICB}} style={{width: '100%', height: 90,resizeMode : 'contain' }} /> :null}
                  </TouchableOpacity>
                </View>

                <Text style={{marginTop:85,fontWeight:"bold",color:"#000000"}}>Choose Your B-Form</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TouchableOpacity onPress={bForm} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:100 }}>
                    {uriCerti != '' ? <Image source={{uri:uriCerti}} style={{width: '100%', height: 90,resizeMode : 'contain' }} /> :null}
                  </TouchableOpacity>
                </View>
                <Text style={{color:'red', marginTop: 80}}>
                <Text style={{fontWeight: 'bold',color:'red'}}> NOTE:  </Text>
                 To Update your Personal Info must Upload CNIC or BForm Image</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',flex:1}}>
                <TouchableOpacity  
                  onPress={() => navigation.navigate('UpdateInformation')}
                  style={[styles.ButtonStyle,{marginLeft:'30%'}]}
                  activeOpacity={0.5}>
                  <Text style={[styles.text,{textAlign:'center'}]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                 onPress={UpdatePwdDtl}
                 style={[styles.ButtonStyle,{marginLeft:10}]}
                 activeOpacity={0.5}>
                  <Text style={[styles.text,{textAlign:'center'}]}>Update</Text>  
                </TouchableOpacity>
                </View>

              
              </View>
            </KeyboardAvoidingView>
            </ScrollView>
            
            </View>
            
        </View>
        {/* </ScrollView> */}
        </ImageBackground>
      </View>

    
    
  );
};

const styles = StyleSheet.create({
  Step1FormTextInput:{
    flex: 1,
    color: 'black',
    borderWidth: 1,
    backgroundColor:'#D3D3D3',
    borderRadius:5, 
    height:400,
    borderColor: '#dadae8',
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
  ButtonStyle:{
    justifyContent: 'center',
    width:'30%',
    padding:10,
    borderRadius: 14,
    elevation: 3,
    backgroundColor: '#002D62',
    marginTop:10,
    // marginLeft:'70%',
  },
  text:{
    color:'white',
    fontSize:15,
    fontFamily: "sans-serif",
  
  },

  placeholderStyle: {
    fontSize: 14,
    margin:2
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
  },
});

export default EditPersonalInfo;