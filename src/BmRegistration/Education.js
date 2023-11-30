
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React,{useEffect,useCallback,useState} from 'react';
import DocumentPicker, {
} from 'react-native-document-picker';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  card,
  useColorScheme,
  View,
  ToastAndroid,
  Button,
  ImageBackground,
  onLoginPress,
  onPressLearnMore,
  Image,
  TouchableOpacity,
  
} from 'react-native';
import Loader from '../Components/Loader';
import { Dropdown } from 'react-native-element-dropdown'; 
import { Alert, Keyboard, KeyboardAvoidingView,  TextInput, TouchableWithoutFeedback,  } from "react-native";
import pwdIMage from  '../../assets/images/background.png';
import syncStorage from 'react-native-sync-storage';
import AntDesign from 'react-native-vector-icons/AntDesign';


const Education = ({navigation}) => {
  const [errorValidate, setErrorValidate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [studentname, setStudentname] = useState('');
  const [studentcnic, setStudentcnic] = useState('');
  const [relation, setRelation] = useState('');
  const [rollnumber, setRollnumber] = useState('');
  const [schoolname, setSchoolname] = useState('');
  const [grade, setGrade] = useState('');
  const [tmarks, setTmarks] = useState('');
  const [obmarks, setObmarks] = useState('');


  const Gradedata = [
    { label: 'Grade 1', value: 'Grade 1' },
    { label: 'Grade 2', value: 'Grade 2' },
    { label: 'Grade 3', value: 'Grade 3' },
    { label: 'Grade 4', value: 'Grade 4' },
    { label: 'Grade 5', value: 'Grade 5' },
    { label: 'Grade 6', value: 'Grade 6' },
    { label: 'Grade 7', value: 'Grade 7' },
    { label: 'Grade 8', value: 'Grade 8' },
    { label: 'Grade 9', value: 'Grade 9' },
    { label: 'Grade 10', value: 'Grade 10' },
    { label: 'First year', value: 'First year' },
    { label: 'Second year', value: 'Second year' },
    { label: 'Third Year', value: 'Third Year'},
    { label: 'Fourth year', value: 'Fourth year'},
    { label: 'Masters', value: 'Masters'},
  ];


// step2 1 father cnic front     
const [scnicImage, setScnicImage]   = useState('');
const [uriscnic, setURIScnic]  = useState('');
const [scnicName, setScnicName] = useState('');
const [scnicType, setScnicType] = useState('');

// step2 1 father cnic back       
const [scnicbackImage, setScnicbackImage]   = useState('');
const [uriscnicback, setURIScnicback]  = useState('');
const [scnicbackName, setScnicbackName] = useState('');
const [scnicbackType, setScnicbackType] = useState('');


//  step2 2 
const [fcnicImage, setFcnicImage]   = useState('');
const [urifcnic, setURIFcnic]  = useState('');
const [fcnicName, setFcnicName] = useState('');
const [fcnicType, setFcnicType] = useState('');

// step2 2    
const [fcnicbackImage, setFcnicbackImage]   = useState('');
const [urifcnicback, setURIFcnicback]  = useState('');
const [fcnicbackName, setFcnicbackName] = useState('');
const [fcnicbackType, setFcnicbackType] = useState('');


// slip   
const [slipImage, setSlipImage]   = useState('');
const [urislip, setURISlip]  = useState('');
const [slipName, setSlipName] = useState('');
const [slipType, setSlipType] = useState('');

// death certi  
const [deathcertiImage, setDeathcertiImage]   = useState('');
const [urideathcerti, setURIDeathcerti]  = useState('');
const [deathcertiName, setDeathcertiName] = useState('');
const [deathcertiType, setDeathcertiType] = useState('');

// disable certi  
const [disablecertiImage, setDisablecertiImage]   = useState('');
const [uridisablecerti, setURIDisablecerti]  = useState('');
const [disablecertiName, setDisablecertiName] = useState('');
const [disablecertiType, setDisablecertiType] = useState('');

// hostelcerti certi  
const [hostelcertiImage, setHostelcertiImage]   = useState('');
const [urihostelcerti, setURIHostelcerti]  = useState('');
const [hostelcertiName, setHostelcertiName] = useState('');
const [hostelcertiType, setHostelcertiType] = useState('');

// nohostelcerti certi  
const [nohostelcertiImage, setNohostelcertiImage]   = useState('');
const [urinohostelcerti, setURINohostelcerti]  = useState('');
const [nohostelcertiName, setNohostelcertiName] = useState('');
const [nohostelcertiType, setNohostelcertiType] = useState('');


//adm certi  
const [admcertiImage, setAdmcertiImage]   = useState('');
const [uriadmcerti, setURIAdmcerti]  = useState('');
const [admcertiName, setAdmcertiName] = useState('');
const [admcertiType, setAdmcertiType] = useState('');


//resultcard 
const [resultcardImage, setResultcardImage]   = useState('');
const [uriresultcard, setURIResultcard]  = useState('');
const [resultcardName, setResultcardName] = useState('');
const [resultcardType, setResultcardType] = useState('');


//scholcerti
const [scholcertiImage, setScholcertiImage]   = useState('');
const [urischolcerti, setURIScholcerti]  = useState('');
const [scholcertiName, setScholcertiName] = useState('');
const [scholcertiType, setScholcertiType] = useState('');



  // step2 1 father cnic front 
const fcnic = async () => {
  DocumentPicker.pick({
    allowMultiSelection: false,
    type: [DocumentPicker.types.images,DocumentPicker.types.pdf],
  })
    .then((response) =>
 {   
    // console.log('response',JSON.stringify(response[0], null, 2))
    setFcnicImage(response[0].uri)
    setURIFcnic(response[0].uri)
    setFcnicName(response[0].name)
    setFcnicType(response[0].type)
 })
} 

 
// step2 1 father cnic back  
const fcnicback = async () => {
  DocumentPicker.pick({
    allowMultiSelection: false,
    type: [DocumentPicker.types.images,DocumentPicker.types.pdf],
  })
    .then((response) =>
 {   
    // console.log('response',JSON.stringify(response[0], null, 2))
    setFcnicbackImage(response[0].uri)
    setURIFcnicback(response[0].uri)
    setFcnicbackName(response[0].name)
    setFcnicbackType(response[0].type)
 })
} 

 // step2 1 father cnic front 
 const scnic = async () => {
  DocumentPicker.pick({
    allowMultiSelection: false,
    type: [DocumentPicker.types.images,DocumentPicker.types.pdf],
  })
    .then((response) =>
 {   
    // console.log('response',JSON.stringify(response[0], null, 2))
    setScnicImage(response[0].uri)
    setURIScnic(response[0].uri)
    setScnicName(response[0].name)
    setScnicType(response[0].type)
 })
} 

 
// step2 1 father cnic back  
const scnicback = async () => {
  DocumentPicker.pick({
    allowMultiSelection: false,
    type: [DocumentPicker.types.images,DocumentPicker.types.pdf],
  })
    .then((response) =>
 {   
    // console.log('response',JSON.stringify(response[0], null, 2))
    setScnicbackImage(response[0].uri)
    setURIScnicback(response[0].uri)
    setScnicbackName(response[0].name)
    setScnicbackType(response[0].type)
 })
} 

 // 3 slip
const slip = async () => {
  DocumentPicker.pick({
    allowMultiSelection: false,
    type: [DocumentPicker.types.images,DocumentPicker.types.pdf],
  })
    .then((response) =>
 {   
    // console.log('response',JSON.stringify(response[0], null, 2))
    setSlipImage(response[0].uri)
    setURISlip(response[0].uri)
    setSlipName(response[0].name)
    setSlipType(response[0].type)
 })
} 

 // 3 death certi
 const deathcerti = async () => {
  DocumentPicker.pick({
    allowMultiSelection: false,
    type: [DocumentPicker.types.images,DocumentPicker.types.pdf],
  })
    .then((response) =>
 {   
    // console.log('response',JSON.stringify(response[0], null, 2))
    setDeathcertiImage(response[0].uri)
    setURIDeathcerti(response[0].uri)
    setDeathcertiName(response[0].name)
    setDeathcertiType(response[0].type)
 })
} 
// 3 disable certi
const disablecerti = async () => {
  DocumentPicker.pick({
    allowMultiSelection: false,
    type: [DocumentPicker.types.images,DocumentPicker.types.pdf],
  })
    .then((response) =>
 {   
    // console.log('response',JSON.stringify(response[0], null, 2))
    setDisablecertiImage(response[0].uri)
    setURIDisablecerti(response[0].uri)
    setDisablecertiName(response[0].name)
    setDisablecertiType(response[0].type)
 })
} 
// 3 adm certi
const admcerti = async () => {
  DocumentPicker.pick({
    allowMultiSelection: false,
    type: [DocumentPicker.types.images,DocumentPicker.types.pdf],
  })
    .then((response) =>
 {   
    // console.log('response',JSON.stringify(response[0], null, 2))
    setAdmcertiImage(response[0].uri)
    setURIAdmcerti(response[0].uri)
    setAdmcertiName(response[0].name)
    setAdmcertiType(response[0].type)
 })
} 

// 3 scholcerti
const scholcerti = async () => {
  DocumentPicker.pick({
    allowMultiSelection: false,
    type: [DocumentPicker.types.images,DocumentPicker.types.pdf],
  })
    .then((response) =>
 {   
    // console.log('response',JSON.stringify(response[0], null, 2))
    setScholcertiImage(response[0].uri)
    setURIScholcerti(response[0].uri)
    setScholcertiName(response[0].name)
    setScholcertiType(response[0].type)
 })
} 


// 3 hostel
const hostelcerti = async () => {
  DocumentPicker.pick({
    allowMultiSelection: false,
    type: [DocumentPicker.types.images,DocumentPicker.types.pdf],
  })
    .then((response) =>
 {   
    // console.log('response',JSON.stringify(response[0], null, 2))
    setHostelcertiImage(response[0].uri)
    setURIHostelcerti(response[0].uri)
    setHostelcertiName(response[0].name)
    setHostelcertiType(response[0].type)
 })
} 

// 3 nohostel
const nohostelcerti = async () => {
  DocumentPicker.pick({
    allowMultiSelection: false,
    type: [DocumentPicker.types.images,DocumentPicker.types.pdf],
  })
    .then((response) =>
 {   
    // console.log('response',JSON.stringify(response[0], null, 2))
    setNohostelcertiImage(response[0].uri)
    setURINohostelcerti(response[0].uri)
    setNohostelcertiName(response[0].name)
    setNohostelcertiType(response[0].type)
 })
} 

// 3 resultcard
const resultcard = async () => {
  DocumentPicker.pick({
    allowMultiSelection: false,
    type: [DocumentPicker.types.images,DocumentPicker.types.pdf],
  })
    .then((response) =>
 {   
    // console.log('response',JSON.stringify(response[0], null, 2))
    setResultcardImage(response[0].uri)
    setURIResultcard(response[0].uri)
    setResultcardName(response[0].name)
    setResultcardType(response[0].type)
 })
} 
//Relative Props
const [NameArray, setNameArray] = useState([]);
const [AgeArray, setAgeArray] = useState([]);
const [OccupyArray, setOccupArray] = useState([]);
const [IncomeArray, setIncomeArray] = useState([]);
const [EducationArray, setEducationArray] = useState([]);
const [regId, setRegID] = useState([]);
// const [FormIdArray, setFormIDArray] = useState([]);
const [RelationArray, setRelationArray] = useState([]);

const familyData = syncStorage.get('BMfamily_details');
// const nameData = [];
// var count = Object.keys(familyData).length;
// for (var i = 0; i < count; i++) {
//   nameData.push(familyData[i].rname);
// }
// setNameArray(nameData);

useEffect(() => {
  console.log('familyData relative is bm: ', familyData);

  // console.log('bmUserId is in disable : ', syncStorage.get('bmUser'));
  console.log('bmUserId is in disable : ',syncStorage.get('bmuser_id'));

}, []);
 
      const renderItem = () => {
        return (
          <View style={styles.item}>
            <Text style={styles.selectedTextStyle}>{item.label}</Text>
            <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
          </View>
        );
      };

 const EducationStep = () => {
 /* Step 1 fields Get Bmregt*/
 setErrorValidate(true)
 if(!studentname){
 ToastAndroid.show('Enter your Name', ToastAndroid.LONG);
 return;
} else if(!studentcnic){
 ToastAndroid.show('Enter your CNIC', ToastAndroid.LONG);
 return;
}else if(!relation){
 ToastAndroid.show('Enter your Relation', ToastAndroid.LONG);
 return;
}else if(!rollnumber){
 ToastAndroid.show('Enter Roll No', ToastAndroid.LONG);
 return;
}else if(!schoolname){
 ToastAndroid.show('Enter School Name ', ToastAndroid.LONG);
 return;
}else if(!grade){
 ToastAndroid.show('Select your Grades', ToastAndroid.LONG);
 return;
}else if(!tmarks){
 ToastAndroid.show('Enter Groom CNIC', ToastAndroid.LONG);
 return;
}else if(!obmarks){
 ToastAndroid.show('Enter Groom Address', ToastAndroid.LONG);
 return;
}else if(!fcnicImage){
 ToastAndroid.show('Upload Father CNIC Front Image ', ToastAndroid.LONG);
 return;
}else if(!fcnicbackImage){
 ToastAndroid.show('Upload Father CNIC Back Image', ToastAndroid.LONG);
 return;
}
// else if(!adate){
//   ToastAndroid.show('Select Date ', ToastAndroid.LONG);
//   return;
// }
// else if(!regname){
//   ToastAndroid.show('Select an option', ToastAndroid.LONG);
//   return;
// }
// else if(!regaddress){
//   ToastAndroid.show('Select an option', ToastAndroid.LONG);
//   return;
// }
else if(!scnicImage){
 ToastAndroid.show('Upload Student CNIC Front Image', ToastAndroid.LONG);
 return;
}else if(!scnicbackImage){
 ToastAndroid.show('Upload Student CNIC Back Image', ToastAndroid.LONG);
 return;
}
else if(!slipImage){
 ToastAndroid.show('Upload Father/Guardian PaySlip', ToastAndroid.LONG);
 return;
}
// else if(!deathcertiImage){
//  ToastAndroid.show('Upload Death Certificate', ToastAndroid.LONG);
//  return;
// }
// else if(!disablecertiImage){
//   ToastAndroid.show('Upload Disable Certificate', ToastAndroid.LONG);
//   return;
//  }
else{
/* Step 1 fields Get Bmregt*/
const bmuser_id = syncStorage.get('bmuser_id')
const district = syncStorage.get('district')
// console.log('district',district);
const Tehsil = syncStorage.get('tehsil')
console.log('Tehsil', Tehsil)
const imageProfile = syncStorage.get('image')
const fullname = syncStorage.get('applicantname')
const fathername = syncStorage.get('fathername')
// const pcrdp = syncStorage.get('Pcrdp')
const cnic = syncStorage.get('cnic')
const phone = syncStorage.get('contact')
const dob = syncStorage.get('dob')
const agegroup = syncStorage.get('age')
const gender = syncStorage.get('gender')
const paddress = syncStorage.get('postaladress')
const ppaddress = syncStorage.get('permanentAddress')


/* Step 2 Fields Get otherinfo*/
const reg_date = syncStorage.get('reg_date')
// const reg_date = dd.slice(0, 9);
console.log('reg===', reg_date);
const yourincome = syncStorage.get('yourincome')
const parentincome = syncStorage.get('parentincome')
const service = syncStorage.get('Service')
const otherservice = syncStorage.get('GovernmentData')
const uriaffidavit = syncStorage.get('uriaffidavit');
const affidavitImage = syncStorage.get('affidavitImage');
const affidavitType = syncStorage.get('affidavitType');
/* Step 4 Fields Get Relative Detail*/
console.log('asda', yourincome,parentincome,service,otherservice)
console.log('Family Data', familyData)
if (familyData != '') {
const regID = [];
const rnameData = [];
const rageData = [];
const rincomeData = [];
const roccupationData = [];
const rrelationData = [];
const reducationData = [];
var count = Object.keys(familyData).length;
console.log('Keys family dr', count);
for (var i = 0; i < count; i++) {
  // regformIDData.push(familyData[i].regform_id);
  rnameData.push(familyData[i].rname);
  rageData.push(familyData[i].rage);
  rincomeData.push(familyData[i].rincome);
  roccupationData.push(familyData[i].roccupation);
  rrelationData.push(familyData[i].rrelation);
  reducationData.push(familyData[i].reducation);
  regID.push(familyData[i].regform_id)

 //  console.log('Family_dir_inner Name', rnameData)
 //  console.log('Family_dir_inner relation', rageData)
 //  console.log('Family_dir_inner Age', rincomeData)
 //  console.log('Family_dir_inner education', reducationData)
 //  console.log('Family_dir_inner icome', rrelationData)
 //  console.log('Family_dir_inner Occ', roccupationData)
 

}

setNameArray(rnameData)
setAgeArray(rageData)
setOccupArray(roccupationData)
setIncomeArray(rincomeData)
setEducationArray(reducationData)
setRelationArray(rrelationData)
setRegID(regID)

}
/* Step 4 Fields Get Select Category*/

/* User ID */

//  const pwdpinfos_id = syncStorage.get('pwdinfo_id');

//  const formData = new FormData();


console.log(JSON.stringify(NameArray),AgeArray,EducationArray)
//  if (uriaffidavit == '') {
//  }
//  else {
//    formData.append('affidavite', {
//      uri: Platform.OS === 'android' ? uriaffidavit : uriaffidavit.replace('file://', ''),
//      type: affidavitType,
//      name: affidavitImage
//    });
//  }

//relativedetail info 
//  formData.append('rname[]', JSON.stringify(NameArray))
//  formData.append('rrelation[]', JSON.stringify(RelationArray))
//  formData.append('roccupation[]', JSON.stringify(OccupyArray))
//  formData.append('rage[]', JSON.stringify(AgeArray))
//  formData.append('reducation[]', JSON.stringify(EducationArray))
//  formData.append('rincome[]', JSON.stringify(IncomeArray))


 //Marriage fields starts from here

 //    console.log('Sourceofincome', sourceofincome)
 //    console.log('Bridename', bridename)
 //    console.log('Bridecnic', bridecnic)
 //    console.log('Brideage', brideage)
 //    console.log('Groomname', groomname)
 //    console.log('Groomfathername', groomfathername)
 //    console.log('Groomcnic', groomcnic)
 //    console.log('Groomaddress', groomaddress)
 //    console.log('Income',income)
 //    console.log('Margdate', margdate)
 //    console.log('Adate', adate)
 //    console.log('Married', married)
 //    console.log('Regname',regname)
 //    console.log('Regaddress',regaddress)

 // formData.append('sourceofincome', sourceofincome)
 // formData.append('bridename', bridename)
 // formData.append('bridecnic', bridecnic)
 // formData.append('brideage', brideage)
 // formData.append('groomname', groomname)
 // formData.append('groomfathername', groomfathername)
 // formData.append('groomcnic', groomcnic)
 // formData.append('groomaddress', groomaddress)
 // formData.append('income', income)
 // formData.append('margdate', JSON.stringify(margdate));
 // // formData.append('margdate',margdate)
 // formData.append('married', married)
 // // formData.append('adate',adate)
 // formData.append('adate', JSON.stringify(adate));
 // formData.append('regname', regname)
 // formData.append('regaddress', regaddress)


 // if (uribcnicf == '') {
 // } else {
 //   formData.append('bridecnicfront', {
 //     uri: Platform.OS === 'android' ? uribcnicf : uribcnicf.replace('file://', ''),
 //     type: bcnicfType,
 //     name: bcnicfName
 //   });
 // }

 // if (uribcnicb == '') {
 // } else {
 //   formData.append('bridecnicback', {
 //     uri: Platform.OS === 'android' ? uribcnicb : uribcnicb.replace('file://', ''),
 //     type: bcnicbType,
 //     name: bcnicbName
 //   });
 // }

 // if (urigcnicf == '') {
 // } else {
 //   formData.append('groomcnicfront', {
 //     uri: Platform.OS === 'android' ? urigcnicf : urigcnicf.replace('file://', ''),
 //     type: gcnicfType,
 //     name: gcnicfName
 //   });
 // }

 // if (urigcnicb == '') {
 // } else {
 //   formData.append('groomcnicback', {
 //     uri: Platform.OS === 'android' ? urigcnicb : urigcnicb.replace('file://', ''),
 //     type: gcnicbType,
 //     name: gcnicbName
 //   });
 // }
 console.log('formData Arrays', NameArray);
    
  setLoading(true)
  fetch(
    `https://bm.punjab.gov.pk/api/regformeduallpost`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ user_id: `${bmuser_id}`, district: `${district}`,tehsil: `${Tehsil}`,image: `${imageProfile}`,applicantname: `${fullname}`,
        cnic: `${cnic}`,contact: `${phone}`,fathername:`${fathername}`,dob: `${dob}`,agegroup: `${agegroup}`,gender: `${gender}`,address: `${paddress}`,paddress: `${ppaddress}`,
        reg_date: `${reg_date}`,yourincome: `${yourincome}`,parentincome:`${parentincome}`,service:`${service}`,GovernmentData:`${otherservice}`,
        uriaffidavit: `${uriaffidavit}`,affidavitImage: `${affidavitImage}`,affidavitType: `${affidavitType}`,rname:`${NameArray}`,rage:`${AgeArray}`,
        roccupation:`${OccupyArray}`,rincome:`${IncomeArray}`,reducation:`${EducationArray}`,rrelation:`${RelationArray}`,
        studentname:`${studentname}`,studentcnic:`${studentcnic}`,relation:`${relation}`,rollnumber:`${rollnumber}`,schoolname:`${schoolname}`,grade:`${grade}`,
        tmarks:`${tmarks}`,obmarks:`${obmarks}`,fcnic:`${fcnicImage}`,fcnicback:`${fcnicbackImage}`,scnicback:`${scnicImage}`,scnic:`${scnicbackImage}`,slip:`${slipImage}`,
        deathcerti:`${deathcertiImage}`,disablecerti:`${disablecertiImage}`,admcerti:`${admcertiImage}`,resultcard:`${resultcardImage}`,scholcerti:`${scholcertiImage}`,
        hostelcerti:`${hostelcertiImage}`,nohostelcerti:`${nohostelcertiImage}`
        
      })
    }
  ).then(resp => resp.json()).then(response => {
    //  console.log('educationtest', JSON.stringify(response));
    console.log('response BM', JSON.stringify(response['BM Register']['id']));

    if(response.success!=''){
            const regformID = response['BM Register']['id'];
            const regform = response['BM Register'];
            regformID !='' 
            ?
            syncStorage.set('regform_id', regformID)
            :null
           
            navigation.navigate('Dashboard',{
              regformID: syncStorage.get('regform_id'),
            });
          }

  }
 
  ).finally(() => {
    setLoading(false);
  });

}
 };


return (
    <View>
        
      <ImageBackground source={pwdIMage} style={{width:'100%',height:'100%',opacity:0.9}}>
      <Loader loading={loading} />
          <View style={{padding:0, flex:1, justifyContent:'center'}}>
            <View style={{width:'100%',backgroundColor:'#fff', height:'100%',padding:30, borderRadius:0}}>
            <ScrollView
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
              <View style={[styles.loginFormView,{}]}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                  {/* <TouchableOpacity onPress={() => navigation.navigate('SelectCategory')}>
                    <Icon
                      name="arrow-left"
                      size={20}
                      style={{ alignItems: 'center', top: 5, color: '#002D62', marginRight: 20 }}
                    />
                  </TouchableOpacity> */}
                  <Text style={[styles.logoText, { paddingTop: -1, textAlign: 'center', color: '#002D62', fontWeight: "bold", fontSize: 19 }]}>
                    تعلیمی وظائف
                  </Text>
               </View>

                {/* <View style={{}}>
                 <Text style={[styles.logoText,{paddingTop:-1,textAlign: 'center',color: '#002D62', fontWeight: "bold",fontSize: 20}]}>EDUCATION STIPEND</Text>
                </View> */}
                {/* form filling info */}

               
                <Text style={{marginTop:10,fontWeight:"bold",color:"#002D62"}}>معلوماتی فارم (بذریعہ)</Text>

                <Text style={{marginTop:10,fontWeight:"bold",color:"#000000"}}>طالبعلم ک کانام:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TextInput  placeholderColor="#c4c3cb" 
                  placeholderTextColor='grey'
                  onChangeText={(studentname) => setStudentname(studentname)}
                  value={studentname}
                  placeholder="طالب علم کا نام درج کریں"
                  style={[styles.Step1FormTextInput
                    , { borderColor: !studentname && errorValidate ? 'red' : '#fff' }
                  ]}
                  />
                </View>    

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>طالبعلم کاشناختی کارڈ/بے فارم:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TextInput  placeholderColor="#c4c3cb" 
                  placeholderTextColor='grey'
                  onChangeText={(studentcnic) => setStudentcnic(studentcnic)}
                  value={studentcnic}
                  keyboardType='numeric'
                  maxLength={13}
                  placeholder=" طالبعلم کاشناختی کارڈ/بے فارم "
                  style={[styles.Step1FormTextInput
                    , { borderColor: !studentcnic && errorValidate ? 'red' : '#fff' }
                  ]}
                  />
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#002D62"}}>رشتہ
                    فارم بھرنے والے کے کوائف
                    </Text>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>فارم بھرنے والے کے کوائف:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TextInput  placeholderColor="#c4c3cb" 
                  placeholderTextColor='grey'
                  onChangeText={(relation) => setRelation(relation)}
                  value={relation}
                  placeholder="طالب علم کے ساتھ تعلق"
                  style={[styles.Step1FormTextInput
                    , { borderColor: !relation && errorValidate ? 'red' : '#fff' }
                  ]}
                  />
                </View>  
            


        <Text style={{marginTop:10,fontWeight:"bold",color:"#000000"}}>کلاس رول نمبر:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TextInput  placeholderColor="#c4c3cb" 
                  placeholderTextColor='grey'
                  onChangeText={(rollnumber) => setRollnumber(rollnumber)}
                  value={rollnumber}
                  placeholder="رول نمبر درج کریں"
                  style={[styles.Step1FormTextInput
                    , { borderColor: !rollnumber && errorValidate ? 'red' : '#fff' }
                  ]}
                  />
                </View>       

                <Text style={{marginTop:10,fontWeight:"bold",color:"#000000"}}>موجودہ ادارے کا نام:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TextInput  placeholderColor="#c4c3cb" 
                  placeholderTextColor='grey'
                  onChangeText={(schoolname) => setSchoolname(schoolname)}
                  value={schoolname}
                  placeholder="موجودہ ادارے کا نام درج کریں"
                  style={[styles.Step1FormTextInput
                    , { borderColor: !schoolname && errorValidate ? 'red' : '#fff' }
                  ]}
                  />
                </View>    

                <Text style={{marginTop:10,fontWeight:"bold",color:"#002D62"}}>پچھلے سال کے امتحان کی تفصیلات:</Text>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>جماعت:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                  <View style={styles.container}>

                    <Dropdown
                     style={[styles.dropdown, { borderColor: !grade && errorValidate ? 'red' : '#fff'}]}
                     placeholderStyle={styles.placeholderStyle}
                     selectedTextStyle={styles.selectedTextStyle}
                     itemTextStyle={styles.itemTextStyle}
                     inputSearchStyle={styles.inputSearchStyle}
                      data={Gradedata}
                      // search
                      labelField="label"
                      valueField="value"
                      placeholder={'گریڈ منتخب کریں'}
                      searchPlaceholder="Search..."
                       value={grade}

                      onChange={item => {
                          setGrade(item.value);
                      }}
                    />
                  </View>
          </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>کُل نمبر:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TextInput  placeholderColor="#c4c3cb" 
                    placeholderTextColor='grey'
                  onChangeText={(tmarks) => setTmarks(tmarks)}
                  value={tmarks}
                  keyboardType='numeric'
                  maxLength={4}
                  placeholder="کل نمبر درج کریں۔"
                  style={[styles.Step1FormTextInput
                    , { borderColor: !tmarks && errorValidate ? 'red' : '#fff' }
                  ]}
                  />
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>حاصل کردہ نمبر:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TextInput  placeholderColor="#c4c3cb" 
                  placeholderTextColor='grey'
                  onChangeText={(obmarks) => setObmarks(obmarks)}
                  value={obmarks}
                  keyboardType='numeric'
                  maxLength={3}
                  placeholder="درج کریں نمبر حاصل کریں"
                  style={[styles.Step1FormTextInput
                    , { borderColor: !obmarks && errorValidate ? 'red' : '#fff' }
                  ]}
                  />
                </View>

       {/*Student Documents */}
      <Text style={{marginTop:10,fontWeight:"bold",color:"#002D62"}}>دستاویزات/سرٹیفکیٹ اپ لوڈ کریں</Text>

  {/* FILES */}
  <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}} >والد/سرپرست کے شناختی کارڈ کی سامنے سے تصویر:</Text>
            
            <View style={{marginTop:5,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TouchableOpacity onPress={fcnic} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:70 }}>
                    {fcnicImage != '' ? <Image source={{uri:fcnicImage}} style={{width: '100%', height: 60,resizeMode : 'contain' }} /> :null}
                  </TouchableOpacity>
             </View>



          <Text style={{marginTop:70,fontWeight:"bold",color:"#000000"}} >والد/سرپرست کے شناختی کارڈ کی پچھلی جانب سے تصویر:</Text>
            
          <View style={{marginTop:5,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TouchableOpacity onPress={fcnicback} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:70 }}>
                    {fcnicbackImage != '' ? <Image source={{uri:fcnicbackImage}} style={{width: '100%', height: 60,resizeMode : 'contain' }} /> :null}
                  </TouchableOpacity>
             </View>
             <Text style={{marginTop:50,fontWeight:"bold",color:"#000000"}} >طالبعلم کے شناختی کارڈ کی سامنے سے تصویر:</Text>
            
            <View style={{marginTop:5,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TouchableOpacity onPress={scnic} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:70 }}>
                    {scnicImage != '' ? <Image source={{uri:scnicImage}} style={{width: '100%', height: 60,resizeMode : 'contain' }} /> :null}
                  </TouchableOpacity>
             </View>



          <Text style={{marginTop:70,fontWeight:"bold",color:"#000000"}} >طالبعلم کے شناختی کارڈ کی پچھلی جانب سے تصویر:</Text>
            
          <View style={{marginTop:5,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TouchableOpacity onPress={scnicback} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:70 }}>
                    {scnicbackImage != '' ? <Image source={{uri:scnicbackImage}} style={{width: '100%', height: 60,resizeMode : 'contain' }} /> :null}
                  </TouchableOpacity>
             </View>

             <Text style={{marginTop:70,fontWeight:"bold",color:"#000000"}} >والد/سرپرست کی تنخواہ کی رسید:</Text>
            
            <View style={{marginTop:5,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                    <TouchableOpacity onPress={slip} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:70 }}>
                      {slipImage != '' ? <Image source={{uri:slipImage}} style={{width: '100%', height: 60,resizeMode : 'contain' }} /> :null}
                    </TouchableOpacity>
               </View>


               <Text style={{marginTop:70,fontWeight:"bold",color:"#000000"}} >والد کی وفات کا سرٹیفیکیٹ:</Text>
            
            <View style={{marginTop:5,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                    <TouchableOpacity onPress={deathcerti} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:70 }}>
                      {deathcertiImage != '' ? <Image source={{uri:deathcertiImage}} style={{width: '100%', height: 60,resizeMode : 'contain' }} /> :null}
                    </TouchableOpacity>
               </View>

               <Text style={{marginTop:70,fontWeight:"bold",color:"#000000"}} >معذور ہونے کی صورت میں معذوری کا سرٹیفیکیٹ:</Text>
            
                <View style={{marginTop:5,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                    <TouchableOpacity onPress={disablecerti} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:70 }}>
                      {disablecertiImage != '' ? <Image source={{uri:disablecertiImage}} style={{width: '100%', height: 60,resizeMode : 'contain' }} /> :null}
                    </TouchableOpacity>
               </View>


               <Text style={{marginTop:70,fontWeight:"bold",color:"#000000"}} >ادارے کا داخلہ سرٹیفیکیٹ:</Text>
            
            <View style={{marginTop:5,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TouchableOpacity onPress={admcerti} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:70 }}>
                  {admcertiImage != '' ? <Image source={{uri:admcertiImage}} style={{width: '100%', height: 60,resizeMode : 'contain' }} /> :null}
                </TouchableOpacity>
           </View>
           <Text style={{marginTop:70,fontWeight:"bold",color:"#000000"}} >سابقہ سالانہ امتحان کارزلٹ کارڈ:</Text>
            
            <View style={{marginTop:5,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TouchableOpacity onPress={resultcard} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:70 }}>
                  {resultcardImage != '' ? <Image source={{uri:resultcardImage}} style={{width: '100%', height: 60,resizeMode : 'contain' }} /> :null}
                </TouchableOpacity>
           </View>

           <Text style={{marginTop:70,fontWeight:"bold",color:"#000000"}} >وظیفے کا سرٹیفکیٹ:</Text>
            
            <View style={{marginTop:5,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TouchableOpacity onPress={scholcerti} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:70 }}>
                  {scholcertiImage != '' ? <Image source={{uri:scholcertiImage}} style={{width: '100%', height: 60,resizeMode : 'contain' }} /> :null}
                </TouchableOpacity>
           </View>
           <Text style={{marginTop:70,fontWeight:"bold",color:"#000000"}} >ہاسٹل کی رہائش کا سرٹیفیکیٹ:</Text>
            
            <View style={{marginTop:5,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TouchableOpacity onPress={hostelcerti} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:70 }}>
                  {hostelcertiImage != '' ? <Image source={{uri:hostelcertiImage}} style={{width: '100%', height: 60,resizeMode : 'contain' }} /> :null}
                </TouchableOpacity>
           </View>

           <Text style={{marginTop:70,fontWeight:"bold",color:"#000000"}} >اگر تعلیمی ادارہ ہاسٹل میں رہائش کی پیشکش نہیں کرتا تو سرٹیفکیٹ منسلک کریں:</Text>
            
            <View style={{marginTop:5,backgroundColor:'#D3D3D3',borderRadius:5, height:70 }}>
                <TouchableOpacity onPress={nohostelcerti} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:70 }}>
                  {nohostelcertiImage != '' ? <Image source={{uri:nohostelcertiImage}} style={{width: '100%', height: 60,resizeMode : 'contain' }} /> :null}
                </TouchableOpacity>
           </View>

            {/* File End */}
            <View style={[styles.row,{justifyContent:'space-between', alignSelf:'flex-end', marginTop:35}]}>

                  <TouchableOpacity
                     onPress={EducationStep}
                    // onPress={() => navigation.navigate('DRTCstep3')}
                    style={styles.ButtonStyle}
                    activeOpacity={0.5}>
                    <Text style={[styles.text,{textAlign:'center'}]}>Submit</Text>
                  </TouchableOpacity>
              </View>

  
              
                
              </View>


              {/* </KeyboardAvoidingView> */}
            </ScrollView>


            <View style={{padding:10,alignItems:'center'}}>
                    
           
                  </View> 
            </View>


             

        </View>
        </ImageBackground>
      </View>

    
              





    
  );
};

const styles = StyleSheet.create({
  Step1FormTextInput: {
    flex: 1,
    color: 'black',
    borderWidth: 1,
    backgroundColor: '#D3D3D3',
    borderRadius: 5,
    height: 40,
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
      width:'40%',
      padding:10,
      borderRadius: 14,
      backgroundColor: '#002D62',
    //   marginTop:10,
      marginLeft:'70%',
      
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
  dropdown:{
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    backgroundColor:'#D3D3D3',
    margin: 0
  },
  placeholderStyle: {
    color: 'grey',
    fontSize: 14,
    margin: 2
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
  },
  itemTextStyle: {
    color: 'black'
  },
  inputSearchStyle : {
    color:'black'
  }
  });
  
  

export default Education;
