/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useState, useEffect } from 'react';

import {
  ScrollView,
  StyleSheet,
  ToastAndroid,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';

import { TextInput, Image } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import syncStorage from 'react-native-sync-storage';
import pwdIMage from  '../../assets/images/background.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RadioButton } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import DocumentScanner from 'react-native-document-scanner-plugin';
import Loader from '../Components/Loader';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';

const Marriage = ({ navigation }) => {
  const [errorValidate, setErrorValidate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sourceofincome, setSourceofincome] = useState('');
  const [bridename, setBridename] = useState('');
  const [bridecnic, setBridecnic] = useState('');
  const [brideage, setBrideage] = useState('');
  const [groomname, setGroomname] = useState('');
  const [groomfathername, setGroomfathername] = useState('');
  const [groomcnic, setGroomcnic] = useState('');
  const [groomaddress, setGroomaddress] = useState('');
  const [income, setIncome] = useState('');
  const [margdate, setMargdate] = useState('');
  const [married, setMarried] = useState('');
  const [adate, setAdate] = useState('');
  const [regname, setRegname] = useState('');
  const [regaddress, setRegaddress] = useState('');

  const Incomedata = [
    { label: '0-20k', value: 'Yes' },
    { label: '20k-40k', value: '20k-40k' },
    { label: '40k-60k', value: '40k-60k' },
    { label: '60k and above', value: '60k and above' },
  ];


  // step2  bride cnic front     
  const [bcnicfImage, setBcnicfImage] = useState('');
  const [uribcnicf, setURIBcnicf] = useState('');
  const [bcnicfName, setBcnicfName] = useState('');
  const [bcnicfType, setBcnicfType] = useState('');

  // step2 bride cnic back       
  const [bcnicbImage, setBcnicbImage] = useState('');
  const [uribcnicb, setURIBcnicb] = useState('');
  const [bcnicbName, setBcnicbName] = useState('');
  const [bcnicbType, setBcnicbType] = useState('');

  // step2  groom CNIC front       
  const [gcnicfImage, setGcnicfImage] = useState('');
  const [urigcnicf, setURIGcnicf] = useState('');
  const [gcnicfName, setGcnicfName] = useState('');
  const [gcnicfType, setGcnicfType] = useState('');
  // step2  groom CNIC Back       
  const [gcnicbImage, setGcnicbImage] = useState('');
  const [urigcnicb, setURIGcnicb] = useState('');
  const [gcnicbName, setGcnicbName] = useState('');
  const [gcnicbType, setGcnicbType] = useState('');


  // step3 bride cnic front
  const bridecnicfront = async () => {
    DocumentPicker.pick({
      allowMultiSelection: false,
      type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
    })
      .then((response) => {
        // console.log('response',JSON.stringify(response[0], null, 2))
        setBcnicfImage(response[0].uri)
        setURIBcnicf(response[0].uri)
        setBcnicfName(response[0].name)
        setBcnicfType(response[0].type)
      })
  }
  // step3 bride cnic back
  const bridecnicback = async () => {
    DocumentPicker.pick({
      allowMultiSelection: false,
      type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
    })
      .then((response) => {
        // console.log('response',JSON.stringify(response[0], null, 2))
        setBcnicbImage(response[0].uri)
        setURIBcnicb(response[0].uri)
        setBcnicbName(response[0].name)
        setBcnicbType(response[0].type)
      })
  }


  // step3groom cnic front
  const groomcnicfront = async () => {
    DocumentPicker.pick({
      allowMultiSelection: false,
      type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
    })
      .then((response) => {
        // console.log('response',JSON.stringify(response[0], null, 2))
        setGcnicfImage(response[0].uri)
        setURIGcnicf(response[0].uri)
        setGcnicfName(response[0].name)
        setGcnicfType(response[0].type)
      })
  }

  // step3 groom cnic back
  const groomcnicback = async () => {
    DocumentPicker.pick({
      allowMultiSelection: false,
      type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
    })
      .then((response) => {
        // console.log('response',JSON.stringify(response[0], null, 2))
        setGcnicbImage(response[0].uri)
        setURIGcnicb(response[0].uri)
        setGcnicbName(response[0].name)
        setGcnicbType(response[0].type)
      })
  }
  const [NameArray, setNameArray] = useState([]);
  const [AgeArray, setAgeArray] = useState([]);
  const [OccupyArray, setOccupArray] = useState([]);
  const [IncomeArray, setIncomeArray] = useState([]);
  const [EducationArray, setEducationArray] = useState([]);
  const [regId, setRegID] = useState([]);
  const [RelationArray, setRelationArray] = useState([]);
 
  const familyData = syncStorage.get('BMfamily_details');
   // const nameData = [];
   // var count = Object.keys(familyData).length;
   // for (var i = 0; i < count; i++) {
   //   nameData.push(familyData[i].rname);
   // }
   // setNameArray(nameData);
 
 useEffect(() =>{
   console.log('familyData is : ', familyData);
   console.log('bmUserId is in marriage : ', syncStorage.get('bmUser'));
 }, []);

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      </View>
    );
  };

  const MarriageStep = () => {
    setErrorValidate(true)
    if(!sourceofincome){
    ToastAndroid.show('Enter your Source of income', ToastAndroid.LONG);
    return;
  } else if(!bridename){
    ToastAndroid.show('Please enter Bride Name', ToastAndroid.LONG);
    return;
  }else if(!bridecnic){
    ToastAndroid.show('Enter Bride CNIC', ToastAndroid.LONG);
    return;
  }else if(!brideage){
    ToastAndroid.show('Enter Bride Age', ToastAndroid.LONG);
    return;
  }else if(!groomname){
    ToastAndroid.show('Enter Groom Name ', ToastAndroid.LONG);
    return;
  }else if(!groomfathername){
    ToastAndroid.show('Enter Groom Father Name', ToastAndroid.LONG);
    return;
  }else if(!groomcnic){
    ToastAndroid.show('Enter Groom CNIC', ToastAndroid.LONG);
    return;
  }else if(!groomaddress){
    ToastAndroid.show('Enter Groom Address', ToastAndroid.LONG);
    return;
  }else if(!income){
    ToastAndroid.show('Enter your Income', ToastAndroid.LONG);
    return;
  }else if(!married){
    ToastAndroid.show('Select an Option', ToastAndroid.LONG);
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
  else if(!uribcnicf){
    ToastAndroid.show('Upload Bride CNIC Front Image', ToastAndroid.LONG);
    return;
  }else if(!uribcnicb){
    ToastAndroid.show('Upload Bride CNIC Back Image', ToastAndroid.LONG);
    return;
  }else if(!urigcnicf){
    ToastAndroid.show('Upload Groom CNIC Front Image', ToastAndroid.LONG);
    return;
  }else if(!urigcnicb){
    ToastAndroid.show('Upload Bride CNIC Back Image', ToastAndroid.LONG);
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
      `https://bm.punjab.gov.pk/api/regformmarriallpost`,
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
          sourceofincome:`${sourceofincome}`,bridename:`${bridename}`,bridecnic:`${bridecnic}`,brideage:`${brideage}`,groomname:`${groomname}`,groomfathername:`${groomfathername}`,groomcnic:`${groomcnic}`,
          groomaddress:`${groomaddress}`,income:`${income}`,margdate:`${margdate}`,married:`${married}`,adate:`${adate}`,regname:`${regname}`,regaddress:`${regaddress}`,
          groomcnicfront:`${gcnicfImage}`,groomcnicback:`${gcnicbImage}`,bridecnicfront:`${bcnicfImage}`,bridecnicback:`${bcnicbImage}`
          
        })
      }
    ).then(resp => resp.json()).then(response => {
      // console.log('asdfghjk', JSON.stringify(response));
      console.log('response BM', response);

      if (response.success != '') {
        const regformID = response['BM Register']['id'];
        const regform = response['BM Register'];
        regformID != ''
          ?
          syncStorage.set('regform_id', regformID)
          : null

        navigation.navigate('Dashboard', {
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

      <ImageBackground source={pwdIMage} style={{ width: '100%', height: '100%', opacity: 0.9 }}>
      <Loader loading={loading} />
        <View style={{ padding: 0, flex: 1, justifyContent: 'center' }}>
          <View style={{ width: '100%', backgroundColor: '#fff', height: '100%', padding: 30, borderRadius: 0 }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}>
              <View style={[styles.loginFormView, {}]}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                {/* <TouchableOpacity onPress={() => navigation.navigate('SelectCategory')}>
                  <Icon
                    name="arrow-left"
                    size={20}
                    style={{ alignItems: 'center', top: 5, color: '#002D62', marginRight: 20 }}
                  />
                </TouchableOpacity> */}
                <Text style={[styles.mainheading, { paddingTop: -1, textAlign: 'center', color: '#002D62', fontWeight: "bold", fontSize: 19 }]}>
                  شادی کے لیے عطیہ
                </Text>
              </View>

                {/* <View style={{}}>
                  <Text style={[styles.logoText, { paddingTop: -1, textAlign: 'center', color: '#002D62', fontWeight: "bold", fontSize: 20 }]}>MARRIAGE GRANT</Text>
                </View> */}

                {/*Marriage Form */}

                <Text style={{ marginTop: 15, fontWeight: "bold", color: "#000000" }}>آپ کا ذریعہ آمدن:</Text>
                <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 40 }}>
                  <TextInput placeholderColor="#c4c3cb" 
                    placeholderTextColor='grey'
                    onChangeText={(sourceofincome) => setSourceofincome(sourceofincome)}
                    value={sourceofincome}
                    placeholder="آمدنی کا ذریعہ درج کریں"
                    style={[styles.Step1FormTextInput
                      , { borderColor: !sourceofincome && errorValidate ? 'red' : '#fff' }
                    ]}
                  />
                </View>
                <View style={styles.center}>
                <Text style={{ marginTop: 10, fontWeight: "bold", color: "#002D62", }}>دُلہن کے کوائف</Text>
                </View>
                <Text style={{ marginTop: 15, fontWeight: "bold", color: "#000000" }}>نام:</Text>
                <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 40 }}>
                  <TextInput placeholderColor="#c4c3cb" 
                    placeholderTextColor='grey'
                    onChangeText={(bridename) => setBridename(bridename)}
                    value={bridename}
                    placeholder="نام درج کریں"
                    style={[styles.Step1FormTextInput
                      , { borderColor: !bridename && errorValidate ? 'red' : '#fff' }
                    ]}
                  />
                </View>
                <Text style={{ marginTop: 15, fontWeight: "bold", color: "#000000" }}>شناختی کارڈ نمبر:</Text>
                <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 40 }}>
                  <TextInput placeholderColor="#c4c3cb" 
                    placeholderTextColor='grey'
                    onChangeText={(bridecnic) => setBridecnic(bridecnic)}
                    value={bridecnic}
                    keyboardType='numeric'
                    maxLength={13}
                    placeholder="شناختی کارڈ نمبر"
                    style={[styles.Step1FormTextInput
                      , { borderColor: !bridecnic && errorValidate ? 'red' : '#fff' }
                    ]}
                  />
                </View>

                <Text style={{ marginTop: 15, fontWeight: "bold", color: "#000000" }}>عمر:</Text>
                <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 40 }}>
                  <TextInput placeholderColor="#c4c3cb" 
                    placeholderTextColor='grey'
                    onChangeText={(brideage) => setBrideage(brideage)}
                    value={brideage}
                    placeholder="عمر درج کریں"
                    keyboardType='numeric'
                    maxLength={3}
                    style={[styles.Step1FormTextInput
                      , { borderColor: !brideage && errorValidate ? 'red' : '#fff' }
                    ]}
                  />
                </View>
                <View style={styles.center}>
                <Text style={{ marginTop: 10, fontWeight: "bold", color: "#002D62" }}>دُلہا کے کوائف</Text>
                </View>
                <Text style={{ marginTop: 15, fontWeight: "bold", color: "#000000" }}>نام:</Text>
                <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 40 }}>
                  <TextInput placeholderColor="#c4c3cb" 
                    placeholderTextColor='grey'
                    onChangeText={(groomname) => setGroomname(groomname)}
                    value={groomname}
                    placeholder="نام درج کریں"
                    style={[styles.Step1FormTextInput
                      , { borderColor: !groomname && errorValidate ? 'red' : '#fff' }
                    ]}
                  />
                </View>


                <Text style={{ marginTop: 15, fontWeight: "bold", color: "#000000" }}>والد کا نام:</Text>
                <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 40 }}>
                  <TextInput placeholderColor="#c4c3cb" 
                    placeholderTextColor='grey'
                    onChangeText={(groomfathername) => setGroomfathername(groomfathername)}
                    value={groomfathername}
                    placeholder="والد کا نام درج کریں"
                    style={[styles.Step1FormTextInput
                      , { borderColor: !groomfathername && errorValidate ? 'red' : '#fff' }
                    ]}
                  />
                </View>
                <Text style={{ marginTop: 15, fontWeight: "bold", color: "#000000" }}>شناختی کارڈ نمبر:</Text>
                <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 40 }}>
                  <TextInput placeholderColor="#c4c3cb" 
                    placeholderTextColor='grey'
                    onChangeText={(groomcnic) => setGroomcnic(groomcnic)}
                    value={groomcnic}
                    keyboardType='numeric'
                    maxLength={13}
                    placeholder="شناختی کارڈ نمبر"
                    style={[styles.Step1FormTextInput
                      , { borderColor: !groomcnic && errorValidate ? 'red' : '#fff' }
                    ]}
                  />
                </View>

                <Text style={{ marginTop: 15, fontWeight: "bold", color: "#000000" }}>پتہ:</Text>
                <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 40 }}>
                  <TextInput placeholderColor="#c4c3cb" 
                    placeholderTextColor='grey'
                    onChangeText={(groomaddress) => setGroomaddress(groomaddress)}
                    value={groomaddress}
                    placeholder="پتہ درج کریں"
                    style={[styles.Step1FormTextInput
                      , { borderColor: !groomaddress && errorValidate ? 'red' : '#fff' }
                    ]}
                  />
                </View>


                <Text style={{ marginTop: 15, fontWeight: "bold", color: "#000000" }}>ماہانہ آمدنی:</Text>
                <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 40 }}>
                  <View style={styles.container}>

                    <Dropdown
                      style={[styles.dropdown, { borderColor: !income && errorValidate ? 'red' : '#fff'}]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      itemTextStyle={styles.itemTextStyle}
                      data={Incomedata}
                      // search
                      labelField="label"
                      valueField="value"
                      placeholder={'آمدنی کا انتخاب کریں'}
                      searchPlaceholder="Search..."
                      value={income}

                      onChange={item => {
                        setIncome(item.value);
                      }}
                    />
                  </View>
                </View>

                <Text style={{ marginTop: 15, fontWeight: "bold", color: "#000000" }}>شادی کی تاریخ:</Text>
                <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 40 }}>

                  <DatePickerInput
                    locale="en"
                    label=""
                    value={margdate}
                    onChange={(margdate) => setMargdate(margdate)}
                    mode={'flat'}
                    style={{ height: 50, backgroundColor: '#D3D3D3' }}
                  />
                </TouchableOpacity>



                {/* Experience */}
                <Text style={{ marginTop: 15, fontWeight: "bold", color: "#000000", marginTop:25 }}>نکاح ہو چکا ہے:</Text>
                <RadioButton.Group onValueChange={married => setMarried(married)} value={married} style={{ marginTop: 10 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 5 }}>
                <View style={{ flexDirection: "row", alignItems: 'center', marginRight: 10 }}>
                  <RadioButton value="Yes" />
                  <Text style={{ fontWeight: 'bold', marginTop: '5%', color: 'black' }}>ہاں</Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: 'center' }}>
                  <RadioButton value="No" />
                  <Text style={{ fontWeight: 'bold', marginTop: '5%', color: 'black' }}>نہیں</Text>
                </View>
              </View>

                </RadioButton.Group>
                {married == 'Yes' ?
                  <View>
                    <Text style={{ marginTop: 15, fontWeight: "bold", color: "#000000" }}>اگر ہاں تو نکاح کی تاریخ:</Text>
                    <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 40 }}>

                      <DatePickerInput
                        locale="en"
                        label=""
                        value={adate}
                        onChange={(adate) => setAdate(adate)}
                        mode={'flat'}
                        style={{ height: 50, backgroundColor: '#D3D3D3' }}
                      />
                    </TouchableOpacity>

                    <Text style={{ marginTop: 20, fontWeight: "bold", color: "#000000" }}>شادی رجسٹرار کا نام:</Text>
                    <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 40 }}>
                      <TextInput placeholderColor="#c4c3cb" 
                        placeholderTextColor='grey'
                        onChangeText={(regname) => setRegname(regname)}
                        value={regname}
                        placeholder="نام درج کریں"
                        style={[styles.Step1FormTextInput
                        ]}
                      />
                    </View>

                    <Text style={{ marginTop: 15, fontWeight: "bold", color: "#000000" }}>شادی رجسٹرار کا پتہ:</Text>
                    <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 40 }}>
                      <TextInput placeholderColor="#c4c3cb" style={styles.Step1FormTextInput}
                        placeholderTextColor='grey'
                        onChangeText={(regaddress) => setRegaddress(regaddress)}
                        value={regaddress}
                        placeholder="شادی رجسٹرار کا پتہ"
                      />
                    </View>

                  </View>

                  : null}

                {/* FILES */}
                <Text style={{ marginTop: 15, fontWeight: "bold", color: "#000000" }} >دُلہن کے شناختی کارڈ کی تصویر (سامنے سے)
</Text>

                <View style={{ marginTop: 5, backgroundColor: '#D3D3D3', borderRadius: 5, height: 40 }}>
                  <TouchableOpacity onPress={bridecnicfront} style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 60 }}>
                    {uribcnicf != '' ?
                      <Text style={{ color: "#000000", padding: 5 }}>{bcnicfName}</Text>
                      : null}
                  </TouchableOpacity>
                </View>


                <Text style={{ marginTop: 40, fontWeight: "bold", color: "#000000" }} >دُلہن کے شناختی کارڈ کی تصویر (پچھلی جانب سے)</Text>

                <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 40 }}>
                  <TouchableOpacity onPress={bridecnicback} style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 60 }}>
                    {uribcnicb != '' ?
                      <Text style={{ color: "#000000", padding: 5 }}>{bcnicfName}</Text>
                      : null}
                  </TouchableOpacity>
                </View>


                <Text style={{ marginTop: 40, fontWeight: "bold", color: "#000000" }} >دُلہا کے شناختی کارڈ کی تصویر (سامنے سے)</Text>
                <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 40 }}>
                  <TouchableOpacity onPress={groomcnicfront} style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 60 }}>
                    {urigcnicf != '' ?
                      <Text style={{ color: "#000000", padding: 5 }}>{gcnicfName}</Text>
                      : null}
                  </TouchableOpacity>
                </View>

                <Text style={{ marginTop: 40, fontWeight: "bold", color: "#000000" }} >دُلہا کے شناختی کارڈ کی تصویر (پچھلی جانب سے)</Text>

                <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 40 }}>
                  <TouchableOpacity onPress={groomcnicback} style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 60 }}>
                    {urigcnicb != '' ?
                      <Text style={{ color: "#000000", padding: 5 }}>{gcnicbName}</Text>
                      : null}
                  </TouchableOpacity>
                </View>

                {/* File End */}

                <View style={[styles.row, { justifyContent: 'space-between', alignSelf: 'flex-end', marginTop: 35 }]}>

                  <TouchableOpacity
                    onPress={MarriageStep}
                    // onPress={() => navigation.navigate('DRTCstep3')}
                    style={styles.ButtonStyle}
                    activeOpacity={0.5}>

                    <Text style={[styles.text, { textAlign: 'center' }]}>Submit</Text>

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
export default Marriage;
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
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    backgroundColor: '#D3D3D3',
    margin: 0,
  },
  center:{ 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  ButtonStyle: {
    justifyContent: 'center',
    width: '35%',
    padding: 10,
    borderRadius: 14,
    backgroundColor: '#002D62',
    marginTop: 10,
    marginLeft: '70%',

  },
  text: {
    color: 'white',
    fontSize: 15,
    fontFamily: "sans-serif",

  },
  row: {
    flex: 1,
    flexDirection: 'row'
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

