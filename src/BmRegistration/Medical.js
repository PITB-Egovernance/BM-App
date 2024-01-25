/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React,{useState, useEffect} from 'react';

import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  ToastAndroid


} from 'react-native';
import Loader from '../Components/Loader';
import { TextInput,Image } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import syncStorage from 'react-native-sync-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import pwdIMage from  '../../assets/images/background.png';
import { RadioButton } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import DocumentScanner from 'react-native-document-scanner-plugin';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import baseUrl from '../Components/Url';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const Medical = ({navigation}) => {
    const [errorValidate, setErrorValidate] = useState(false);
    const [expensedetail,setExpensedetail] = useState('');
    const [residence,setResidence] = useState('');
    const [houserent,setHouserent] = useState('');
    const [disease,setDisease] = useState('');
    const [treatmentfrom,setTreatmentfrom] = useState('');
    const [treatmentexpense,setTreatmentexpense] = useState('');
    const [name,setName] = useState('');
    const [fname,setFname] = useState('');
    const [cnic,setCnic] = useState('');
    const [address,setAddress] = useState('');
    const [paddress,setPaddress] = useState('');
    const [relation,setRelation] = useState('');
    const [loading, setLoading] = useState(false);


    const Relationdata = [
        { label: 'Mother', value: 'Mother' },
        { label: 'Father', value: 'Father' },
        { label: 'Friend', value: 'Friend' },
        { label: 'Gaurdian', value: 'Gaurdian' },
        { label: 'Husband/wife', value: 'Husband/wife' },
        { label: 'Son', value: 'Son' },
        { label: 'Daughter', value: 'Daughter' },
        { label: 'Sister', value: 'Sister'},
        { label: 'Brother', value: 'Brother'},
        { label: 'Close Relative', value: 'Close Relative'},
      ];

 // step2 own/father cnic front     
 const [fcnicImage, setFcnicImage]   = useState('');
 const [capfCnic, setCapFCnic]   = useState('');

 // step2 own/father cnic back       
 const [fcnicbackImage, setFcnicbackImage]   = useState('');
 const [capCnicBack, setCapCnicBack]   = useState('');


 const [NameArray, setNameArray] = useState([]);
 const [AgeArray, setAgeArray] = useState([]);
 const [OccupyArray, setOccupArray] = useState([]);
 const [IncomeArray, setIncomeArray] = useState([]);
 const [EducationArray, setEducationArray] = useState([]);
 const [regId, setRegID] = useState([]);
//  const [FormIdArray, setFormIDArray] = useState([]);
 const [RelationArray, setRelationArray] = useState([]);
 const [warning, setWarning] = React.useState('');
const handleInputChange = (input, fieldName) => {
  // Check if the input contains non-English characters
  const containsNonEnglish = /[^a-zA-Z ]/.test(input);

  // Set the warning based on the presence of non-English characters
  if (containsNonEnglish) {
    setWarning('Please enter text in English only.');
  } else {
    setWarning('');
  }

  // Filter out non-English characters
  const filteredInput = input.replace(/[^a-zA-Z ]/g, '');

  switch (fieldName) {
    case 'expensedetail':
      setExpensedetail(filteredInput);
      break;
    case 'disease':
      setDisease(filteredInput);
      break;
    case 'treatmentfrom':
      setTreatmentfrom(filteredInput);  
      break;
    case 'treatmentexpense':
      setTreatmentexpense(filteredInput); 
      break;   
    case 'name':
      setName(filteredInput); 
      break; 
    case 'fname':
      setFname(filteredInput);
      break;     
    default:
      break;
  }
};
//function to handle address input field for numeric and english only
const handleInputChangeforaddress = (input, fieldName) => {
  // Check if the input contains non-English characters
  const containsNonEnglish = /[^a-zA-Z0-9 ]/.test(input);

  // Set the warning based on the presence of non-English characters
  if (containsNonEnglish) {
    setWarning('Please enter text in English only.');
  } else {
    setWarning('');
  }

  // Filter out non-English characters
  const filteredInput = input.replace(/[^a-zA-Z0-9 ]/g, '');

  switch (fieldName) {
    case 'address':
        setAddress(filteredInput);
        break;  
      case 'paddress':
        setPaddress(filteredInput);
        break;  
    default:
      break;
  }
};

 const familyData = syncStorage.get('BMfamily_details');
  // const nameData = [];
  // var count = Object.keys(familyData).length;
  // for (var i = 0; i < count; i++) {
  //   nameData.push(familyData[i].rname);
  // }
  // setNameArray(nameData);

useEffect(() =>{
  console.log('familyData is : ', familyData);
}, []);


 // step2 own/father cnic front 
const fcnic = async () => {

  const options = {
    mediaType: 'photo',
    includeBase64: true,
    maxHeight: 2000,
    maxWidth: 2000,
  };

  launchImageLibrary(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      let imageUri = response.uri || response.assets?.[0]?.uri;
      setFcnicImage(imageUri);
  
      console.log('Image cnic back',imageUri)
      const fileBase64        = response.assets[0].base64
      setCapFCnic(fileBase64)
    }
  });
} 

 
// step2 own/father cnic back  
const fcnicback = async () => {
  
  const options = {
    mediaType: 'photo',
    includeBase64: true,
    maxHeight: 2000,
    maxWidth: 2000,
  };

  launchImageLibrary(options, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('Image picker error: ', response.error);
    } else {
      let imageUri = response.uri || response.assets?.[0]?.uri;
      setFcnicbackImage(imageUri);
  
      console.log('Image cnic back',imageUri)
      const fileBase64        = response.assets[0].base64
      setCapCnicBack(fileBase64)
    }
  });
} 

const renderItem = (item) => {
  return (
    <View style={styles.item}>
      <Text style={styles.selectedTextStyle}>{item.label}</Text>
      <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
    </View>
  );
};


 
const MedicalStep = () => {
  setErrorValidate(true)
  if(!expensedetail){
  ToastAndroid.show('Enter your Expense Details', ToastAndroid.LONG);
  return;
} else if(!residence){
  ToastAndroid.show('Select Your Resedential Status', ToastAndroid.LONG);
  return;
}else if(!disease){
  ToastAndroid.show('Enter your Disease', ToastAndroid.LONG);
  return;
}else if(!treatmentfrom){
  ToastAndroid.show('Enter Details', ToastAndroid.LONG);
  return;
}else if(!treatmentexpense){
  ToastAndroid.show('Enter Treatment Expense ', ToastAndroid.LONG);
  return;
}else if(!name){
  ToastAndroid.show('Enter Your Name', ToastAndroid.LONG);
  return;
}else if(!fname){
  ToastAndroid.show('Enter Father Nane', ToastAndroid.LONG);
  return;
}else if(!cnic){
  ToastAndroid.show('Enteryour CNIC', ToastAndroid.LONG);
  return;
}else if(!address){
  ToastAndroid.show('Enter your Address', ToastAndroid.LONG);
  return;
}else if(!paddress){
  ToastAndroid.show('Enter your Permanent Address', ToastAndroid.LONG);
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
else if(!relation){
  ToastAndroid.show('Select Your Relation', ToastAndroid.LONG);
  return;
}else if(!fcnicImage){
  ToastAndroid.show('Upload Front CNIC Image', ToastAndroid.LONG);
  return;
}else if(!fcnicbackImage){
  ToastAndroid.show('Upload Back CNIC Image', ToastAndroid.LONG);
  return;
}
else{
/* Step 1 fields Get Bmregt*/
const bmuser_id = syncStorage.get('bmuser_id')
const district = syncStorage.get('district')
// console.log('district',district);
const Tehsil = syncStorage.get('tehsil')
console.log('Tehsil', Tehsil)
const imageProfile = syncStorage.get('image')
const imageProfilee = syncStorage.get('imageCap')
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
// const uriaffidavit = syncStorage.get('uriaffidavit');
const affidavitImage = syncStorage.get('affidavitImage');
// const affidavitType = syncStorage.get('affidavitType');
/* Step 4 Fields Get Relative Detail*/
console.log('asda', yourincome,parentincome,service,otherservice)
console.log('Family Data', familyData)
if (familyData != '' && familyData!=undefined) {
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


console.log(JSON.stringify(NameArray),AgeArray,EducationArray) /* Step 4 Fields Get Select Category*/

 
    console.log('bas eurl', baseUrl[0]);
    setLoading(true)
    fetch(
      `${baseUrl[0]}/regformmedallpost`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/application/json',
          'Accept': 'application/json',
          'enctype':"multipart/form-data"
        },
        body: JSON.stringify({ user_id: `${bmuser_id}`, district: `${district}`,tehsil: `${Tehsil}`,image: `${imageProfilee}`,applicantname: `${fullname}`,
          cnic: `${cnic}`,contact: `${phone}`,fathername:`${fathername}`,dob: `${dob}`,agegroup: `${agegroup}`,gender: `${gender}`,address: `${paddress}`,paddress: `${ppaddress}`,
          reg_date: `${reg_date}`,yourincome: `${yourincome}`,parentincome:`${parentincome}`,service:`${service}`,GovernmentData:`${otherservice}`,
          affidavitImage: `${affidavitImage}`,rname:`${NameArray}`,rage:`${AgeArray}`,
          roccupation:`${OccupyArray}`,rincome:`${IncomeArray}`,reducation:`${EducationArray}`,rrelation:`${RelationArray}`,
          expensedetail:`${expensedetail}`,residence:`${residence}`,disease:`${disease}`,treatmentfrom:`${treatmentfrom}`,treatmentexpense:`${treatmentexpense}`,name:`${name}`,fname:`${fname}`,
          cocnic:`${cnic}`,address:`${address}`,paddress:`${paddress}`,relation:`${relation}`,fcnicImage:`${capfCnic}`,fcnicback:`${capCnicBack}`
          
        })
      }
    ).then(resp => resp.json()).then(response => {
      // console.log('response BM', JSON.stringify(response['BM Register']['id']));
      console.log('response BM', response);

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
// useEffect(() =>{
//   // console.log('aaaa ', aaaa);
//   // getProvince();
//   // getDistrict();
//   // getpwdinfoDetail();
//   // getTypeofdData();
//   // getCauseofdData();

//   // getProvince();

// }, []);

//     return (

    <View>

      <ImageBackground  source={pwdIMage} style={{width:'100%',height:'100%',opacity:0.9}}>
      <Loader loading={loading} />
          <View style={{padding:0, flex:1, justifyContent:'center'}}>
            <View style={{width:'100%',backgroundColor:'#fff', height:'100%',padding:30, borderRadius:0}}>
            <ScrollView
             showsVerticalScrollIndicator={false}
             showsHorizontalScrollIndicator={false}>
              <View style={[styles.loginFormView,{}]}>
                {/* <View style={{flex:1,flexDirection:'row',}}>
                  <TouchableOpacity onPress={() => navigation.navigate('')}>
                    <Icon
                      name="arrow-left"
                      size={20}
                      style={{alignItems:'center', top:5, color:'#002D62', marginRight:20}}
                    />
                  </TouchableOpacity>
                <Text style={[styles.logoText,{paddingTop:-1,textAlign: 'center',color: '#002D62', fontWeight: "bold",fontSize: 19}]}>
                  Financial Assistance for Needy/Disabled Persons</Text>
                </View> */}
                 <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                  {/* <TouchableOpacity onPress={() => navigation.navigate('SelectCategory')}>
                    <Icon
                      name="arrow-left"
                      size={20}
                      style={{ alignItems: 'center', top: 5, color: '#002D62', marginRight: 20 }}
                    />
                  </TouchableOpacity> */}
                  <Text style={[styles.logoText, { paddingTop: -1, textAlign: 'center', color: '#002D62', fontWeight: 'bold', fontSize: 19 }]}>
                    طبی علاج معالجہ
                  </Text>
                </View>


            {/*Marriage Form */}

            <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>اگر آپ بے روزگار ہیں تو آپ کے اخراجات کی تفصیل:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TextInput  placeholderColor="#c4c3cb" 
                    placeholderTextColor='grey'
                    onChangeText={input => {
                      handleInputChange(input, 'expensedetail');
                    }}
                  value={expensedetail}
                  placeholder="اپنی تفصیلات درج کریں۔"
                  style={[styles.Step1FormTextInput
                    , { borderColor: !expensedetail && errorValidate ? 'red' : '#fff' }
                  ]}
                  />
                </View>
                {warning !== '' && (
                  <Text style={{color: 'red', fontsize: '12'}}>{warning}</Text>
                )}

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>رہائش گاہ:</Text>
                <RadioButton.Group  onValueChange={residence => setResidence(residence)} value={residence} style={{marginTop:10}}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton value="rent" />
                  <Text style={{ fontWeight: 'bold', marginLeft: 5, color: 'black' }}>کرائے کا گھر</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <RadioButton value="ownhouse" />
                  <Text style={{ fontWeight: 'bold', marginLeft: 5, color: 'black' }}>اپنا گھر</Text>
                </View>
              </View>
              </RadioButton.Group>
              {residence =='rent'?
              <View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>اگر کرایہ پہ ہیں تو آپ کتنا ادا کرتے ہیں؟</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TextInput  placeholderColor="#c4c3cb" style={styles.Step1FormTextInput}
                  placeholderTextColor='grey'
                  keyboardType="numeric"
                  onChangeText={(houserent) => setHouserent(houserent)}
                  value={houserent}
                  placeholder="گھر کا کرایہ درج کریں"
                  />
                </View>

                </View>

  :null}


              <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>بیماری کی قسم:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TextInput  placeholderColor="#c4c3cb" 
                  placeholderTextColor='grey'
                  onChangeText={input => {
                    handleInputChange(input, 'disease');
                  }}
                  value={disease}
                  placeholder="آپ کی بیماری کی قسم"
                  style={[styles.Step1FormTextInput
                    , { borderColor: !disease && errorValidate ? 'red' : '#fff' }
                  ]}
                  />
                </View> 
                {warning !== '' && (
                  <Text style={{color: 'red', fontsize: '12'}}>{warning}</Text>
                )}    

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>کہاں سے علاج کروا رہے ہیں؟</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TextInput  placeholderColor="#c4c3cb" 
                  placeholderTextColor='grey'
                  onChangeText={input => {
                    handleInputChange(input, 'treatmentfrom');
                  }}
                  value={treatmentfrom}
                  placeholder="کہاں سے علاج کروا رہے ہیں"
                  style={[styles.Step1FormTextInput
                    , { borderColor: !treatmentfrom && errorValidate ? 'red' : '#fff' }
                  ]}
                  />
                </View> 
                {warning !== '' && (
                  <Text style={{color: 'red', fontsize: '12'}}>{warning}</Text>
                )}

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>آپ کے علاج کے اخراجات</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TextInput  placeholderColor="#c4c3cb" 
                  placeholderTextColor='grey'
                  onChangeText={input => {
                    handleInputChange(input, 'treatmentexpense');
                  }}
                  value={treatmentexpense}
                  placeholder="اپنے اخراجات درج کریں"
                  style={[styles.Step1FormTextInput
                    , { borderColor: !treatmentexpense && errorValidate ? 'red' : '#fff' }
                  ]}
                  />
                </View> 
                {warning !== '' && (
                  <Text style={{color: 'red', fontsize: '12'}}>{warning}</Text>
                )}
                <View style={styles.center}>   
                <Text style={{marginTop:10,fontWeight:"bold",color:"#002D62"}}>معلوماتی فارم (بذریعہ)</Text>
                </View>
                <Text style={{fontSize:12,marginTop:15,fontWeight:"bold",color:"#000000"}}>اگر مریض یتیم یا ہوش و حواس میں نہیں ہے:</Text>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>نام:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TextInput  placeholderColor="#c4c3cb" 
                  placeholderTextColor='grey'
                  onChangeText={input => {
                    handleInputChange(input, 'name');
                  }}
                  value={name}
                  placeholder="نام درج کریں"
                  style={[styles.Step1FormTextInput
                    , { borderColor: !name && errorValidate ? 'red' : '#fff' }
                  ]}
                  />
                </View>
                {warning !== '' && (
                  <Text style={{color: 'red', fontsize: '12'}}>{warning}</Text>
                )}
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>والد کا نام:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TextInput  placeholderColor="#c4c3cb" 
                  placeholderTextColor='grey'
                  onChangeText={input => {
                    handleInputChange(input, 'fname');
                  }}
                  value={fname}
                  placeholder="والد کا نام درج کریں"
                  style={[styles.Step1FormTextInput
                    , { borderColor: !fname && errorValidate ? 'red' : '#fff' }
                  ]}
                  />
                </View>
                {warning !== '' && (
                  <Text style={{color: 'red', fontsize: '12'}}>{warning}</Text>
                )}
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>شناختی کارڈ:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TextInput  placeholderColor="#c4c3cb"
                  placeholderTextColor='grey'
                  onChangeText={(cnic) => setCnic(cnic)}
                  value={cnic}
                  keyboardType='numeric'
                  maxLength={13}
                  placeholder="اپنا شناختی کارڈ داخل کریں۔"
                  style={[styles.Step1FormTextInput
                    , { borderColor: !cnic && errorValidate ? 'red' : '#fff' }
                  ]}
                  />
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>موجودہ پتہ:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TextInput  placeholderColor="#c4c3cb" 
                  placeholderTextColor='grey'
                  onChangeText={input => {
                    handleInputChangeforaddress(input, 'address');
                  }}
                  value={address}
                  placeholder="پتہ درج کریں"
                  style={[styles.Step1FormTextInput
                    , { borderColor: !address && errorValidate ? 'red' : '#fff' }
                  ]}
                  />
                </View>
                {warning !== '' && (
                  <Text style={{color: 'red', fontsize: '12'}}>{warning}</Text>
                )}

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>مستقل پتہ:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TextInput  placeholderColor="#c4c3cb"
                    placeholderTextColor='grey'
                    onChangeText={input => {
                      handleInputChangeforaddress(input, 'paddress');
                    }}
                  value={paddress}
                  placeholder="مستقل پتہ درج کریں"
                  style={[styles.Step1FormTextInput
                    , { borderColor: !paddress && errorValidate ? 'red' : '#fff' }
                  ]}
                  />
                </View>
                {warning !== '' && (
                  <Text style={{color: 'red', fontsize: '12'}}>{warning}</Text>
                )}

            <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>مریض کے ساتھ رشتہ:</Text>
             <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                  <View style={styles.container}>

                    <Dropdown
                        style={[styles.dropdown, { borderColor: !relation && errorValidate ? 'red' : '#fff'}]}
                       placeholderStyle={styles.placeholderStyle}
                       selectedTextStyle={styles.selectedTextStyle}
                       itemTextStyle={styles.itemTextStyle}
                       inputSearchStyle={styles.inputSearchStyle}
                      data={Relationdata}
                      // search
                      labelField="label"
                      valueField="value"
                      placeholder={'رشتہ منتخب کریں'}
                      searchPlaceholder="Search..."
                       value={relation}

                      onChange={item => {
                          setRelation(item.value);
                      }}
                    />
                  </View>
          </View>

     

             

            {/* FILES */}
            <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}} >اپنا /والد/سرپرست کے شناختی کارڈ کی سامنے سے تصویر:</Text>
            
            <View style={{marginTop:5,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TouchableOpacity onPress={fcnic} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:70 }}>
                    {fcnicImage != '' ? <Image source={{uri:fcnicImage}} style={{width: '100%', height: 60,resizeMode : 'contain' }} /> :null}
                  </TouchableOpacity>
             </View>



          <Text style={{marginTop:70,fontWeight:"bold",color:"#000000"}} >اپنا /والد/سرپرست کے شناختی کارڈ کی پچھلی جانب سے تصویر:</Text>
            
          <View style={{marginTop:5,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TouchableOpacity onPress={fcnicback} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:70 }}>
                    {fcnicbackImage != '' ? <Image source={{uri:fcnicbackImage}} style={{width: '100%', height: 60,resizeMode : 'contain' }} /> :null}
                  </TouchableOpacity>
             </View>

        

            {/* File End */}

                <View style={[styles.row,{justifyContent:'space-between', alignSelf:'flex-end', marginTop:55}]}>

                <TouchableOpacity
                  onPress={MedicalStep}
               // onPress={() => navigation.navigate('DRTCstep3')}
                  style={styles.ButtonStyle}
                  activeOpacity={0.5}>

                  <Text style={[styles.text,{textAlign:'center'}]}>SUBMIT</Text>

                </TouchableOpacity>
               </View>

              </View>
            </ScrollView>
            </View>
        </View>
        </ImageBackground>
      </View>

  );

}
export default Medical;
const styles = StyleSheet.create({

  ButtonStyle:{
    justifyContent: 'center',
    width:'40%',
    padding:10,
    borderRadius: 14,
    backgroundColor: '#002D62',
    marginTop:10,
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
center:{ 
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center'
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
Step1FormTextInput: {
  flex: 1,
  color: 'black',
  borderWidth: 1,
  backgroundColor: '#D3D3D3',
  borderRadius: 5,
  height: 40,
  borderColor: '#dadae8',
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

