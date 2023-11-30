/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useEffect, useCallback, useState} from 'react';
import {RadioButton} from 'react-native-paper';
import DocumentScanner from 'react-native-document-scanner-plugin';
import DocumentPicker,{types} from 'react-native-document-picker';


import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  card,
  useColorScheme,
  View,
  Button,
  ImageBackground,
  onLoginPress,
  onPressLearnMore,
  Image,
  TouchableOpacity,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {Dropdown} from 'react-native-element-dropdown';
import { DatePickerInput } from 'react-native-paper-dates';
import Loader from '../Components/Loader';
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import pwdIMage from '../../assets/images/background.png';
import syncStorage from 'react-native-sync-storage';

const BmRegistration = ({navigation}) => {
  const [district, setdistrit]        = useState('');
  const [errorValidate, setErrorValidate] = useState(false);
  const [bmuserid, setBmUserId] = useState('');
  const [bmuser_name, setBmuser_name] = useState('');
   const [Focus, setFocus] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [imageProfile, setimageprofile] = useState('');
  const [fullname, setFullName] = useState('');
  const [Name, setName] = useState('');
  // const [name, getName] = useState('');
  const [contact, setcontact] = useState('');
  const [fathername, setfathername] = useState('');
  const [gender, setGender] = useState('');
  const [yourincome, setYourincome]  = useState('');
  const [parentincome, setParentincome]  = useState('');
  const [postaladress, setmonthlypostaladress]  = useState('');
  const [permanentAddress, setpermanentAddress]  = useState('');
  const [cnic, setCNIC] = useState('');
  const [age, setage] = useState('');
  const [dob, setDOB] = useState('');
  const [regdate, setregdate]= useState('');
  const [Tehsil, setTehsil]                       = useState('');
  const [TehsilID, setTehsilId]                       = useState('');
  const [tehsiluser, setTehsilUser]                       = useState('');
  const [loading, setLoading] = useState(false);
  const [Profileimg, setProfileimg] = useState('');

  const img = async () => {
    DocumentPicker.pick({
      allowMultiSelection: false,
      type: [DocumentPicker.types.images],
    })
      .then((response) =>
   {   
      // console.log('response',JSON.stringify(response[0], null, 2))
      setimageprofile(response[0].uri)
   })

   
  }


  useEffect(() =>{
    // getuserId();
    
    setLoading(true)
    const bmuser_id = syncStorage.get('bmuser_id');
    fetch(`https://bm.punjab.gov.pk/api/getUser/${bmuser_id}`, {
      method: 'GET',
      headers:{
        'Accept': 'application/json',
        'Content-Type':'application/json',
        // 'secret':''
      },
    })
    .then(userDetail => userDetail.json())
    .then(respuserDetail => {


      console.log('Resp User Detail;', respuserDetail.tehsil)
      console.log('Resp User Detail;', respuserDetail.name)
      console.log('Resp User Detail;', respuserDetail.contact)
      // console.log('Resp User Detail;', respuserDetail.district)
      console.log('Tehisl Set', respuserDetail.tehsil)
      syncStorage.set('tehsil', respuserDetail.tehsil)
      getdistrictofdData(respuserDetail.district) 
      // setTehsilUser(respuserDetail.tehsil); 
      // const image   = respuserDetail['Details'][0].image;
      // console.log('image', image)
      // setimage(image);

      // const district  = respuserDetail['Details'][0].district;
      // // console.log('district', district)  
      // setDistrictId(district);
      // setDomicileDistrict(district);

      // getDistrict([province,district]);

      // const tehsil  = respuserDetail['Details'][0].tehsil;
      // // console.log('tehsil', tehsil)
    
      // getTehsil([district, tehsil])

      // const fullName    = respuserDetail['Details'][0].firstname+' '+respuserDetail['Details'][0].lastname;
      //   // console.log('FullName', fullName)
      // setFullName(fullName);
      // getName(name);

      // const phone   = respuserDetail['Details'][0].phone;
      // // console.log('phone', phone)
      // setPhone(phone)
      // const fullName  = respuserDetail.fullName;
      // console.log('fullname',fullName);
      // setFullName(fullName);
      
      // const district  = respuserDetail.district
      // console.log('domicileDistrict',district)
      // setDistrict(district);
      const name  = respuserDetail.name
      console.log('name',name)
      setName(name);
      setFullName(name);
      const cnic   = respuserDetail.cnic;
      console.log('cnic', cnic)
      setCNIC(cnic);
      const contact   = respuserDetail.contact;
      console.log('contact', contact)
      setcontact(contact);
      // const districtofd = respuserDetail.districtofd;
      // console.log('districtofd', districtofd)
      // setdistrit(districtofd);
       
      // const father_spouse_name    = respuserDetail['Details'][0].father_spouse_name;
      //   // console.log('father_spouse_name', father_spouse_name)
      // setfather_spouse_name(father_spouse_name);

      // const dob  = respuserDetail['Details'][0].dob;
      // // console.log('dob', dob)
      // setDOB(dob);

      // const age   = respuserDetail['Details'][0].agegroup;
      // // console.log('agegroup', agegroup)
      // setage(age);

      // const gender    = respuserDetail['Details'][0].gender;
      // // console.log('gender', gender)
      // setGender(gender);

      // const monthlyincome = respuserDetail['Details'][0].monthlyincome;
      // setmonthlyincome(monthlyincome);

      // const monthlyincomeparent = respuserDetail['Details'][0].monthlyincomeparent;
      // setmonthlyincomeparent(monthlyincomeparent);

      // const postaladress = respuserDetail['Details'][0].postaladress;
      // setmonthlypostaladress(postaladress);

      // const currentdate = respuserDetail['Details'][0].currentdate;
      // setcurrentdate(currentdate);

      //API end here

    }).finally(() => {
      setLoading(false);
    });

  }, []);


  const getdistrictofdData = (districtofdid) =>{

    // console.log('districtofd functino', districtofdid)
    // console.log('Board id', BoardID)
    fetch(`https://dpmis.punjab.gov.pk/api/pwdapp/Districtofd`,{
      method: 'GET',
      headers:{
        'Accept': 'application/json',
          'Content-Type':'application/json',
          
          'secret':'pwdreg'
      },
    })
    .then(respdistrictofd => respdistrictofd.json())
    .then(respdistrictofdName => {

   console.log('pWD', respdistrictofdName)
      const districtofdReponse = respdistrictofdName['PWD district'];
      console.log('sdasdasdsadas', districtofdReponse)
      districtofdReponse.map((item, i) => {
        if(item.id == districtofdid){
          setdistrit(item.name)
          getTehsil(item.id)
        }
      });
     
    });
  }
  const getTehsil = (dist_id) => {
    const district_id  = dist_id;



    console.log('ID District', district_id)
    console.log('ID District tehgsil', "ENter")
    setLoading(true)
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
        const tehsilresponse = responseTehsil.tehsil;
        console.log('tehsil reponse', tehsilresponse)
        tehsilresponse.map((item, i) => {
          const tehsilCheck = syncStorage.get('tehsil');
          console.log('Tehsil check', tehsilCheck)
          if(item.id == tehsilCheck ){
            setTehsil(item.tname)
          }
        });
      
    }).finally(() => {
      setLoading(false);
    });
  }

  const genderData = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Transgender', value: 'Transgender' },
  ];
  const agedata = [
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
    { label: '75-100', value: '75-100' },
    { label: '100-120', value: '100-120' },
  ];
  const monthlyincomedata = [
    { label: '0', value: '0' },
    { label: '1-20k', value: '1-20k' },
    { label: '20k-40k', value: '20k-40k' },
    { label: '40k-60k', value: '40k-60k' },
    { label: '60k and above', value: '60k and above' },    
  ];
  const monthlyincomeparentdata = [
    { label: '0', value: '0' },
    { label: '1-20k', value: '1-20k' },
    { label: '20k-40k', value: '20k-40k' },
    { label: '40k-60k', value: '40k-60k' },
    { label: '60k and above', value: '60k and above' },    
  ];


 
  

  
  const NextStep = () => {
    setErrorValidate(true)
    if(!imageProfile){
    ToastAndroid.show('Please Upload your Profile Image', ToastAndroid.LONG);
    return;
  } else if(!fathername){
    ToastAndroid.show('Please enter your Father or Spouse Name', ToastAndroid.LONG);
    return;
  }else if(!age){
    ToastAndroid.show('Select your Age', ToastAndroid.LONG);
    return;
  }else if(!dob){
    ToastAndroid.show('Select your Date of Birth', ToastAndroid.LONG);
    return;
  }else if(!gender){
    ToastAndroid.show('Select your Gender', ToastAndroid.LONG);
    return;
  }else if(!yourincome){
    ToastAndroid.show('Select your monthlyincome', ToastAndroid.LONG);
    return;
  }else if(!parentincome){
    ToastAndroid.show('Select your monthlyincomeparent', ToastAndroid.LONG);
    return;
  }else if(!postaladress){
    ToastAndroid.show('Enter your Postal Address', ToastAndroid.LONG);
    return;
  }else if(!permanentAddress){
    ToastAndroid.show('Enter your Permanent Address', ToastAndroid.LONG);
    return;
  }else if(!regdate){
    ToastAndroid.show('Select Current Date', ToastAndroid.LONG);
    return;
  }else{

  console.log('---bmuserid;', bmuserid); 
  console.log('image', imageProfile);
  console.log('district', district);
  console.log('tehsil', Tehsil);
  console.log('fullname', fullname);
  console.log('contact', contact);
  console.log('cnic', cnic);
  console.log('fathername', fathername);
  console.log('age', age);
  console.log('dob', dob);
  console.log('gender', gender);
  console.log('monthlyincome', yourincome);
  console.log('monthlyincomeparent', parentincome);
  console.log('postaladress', postaladress);
  console.log('permanentAddress', permanentAddress);
  console.log('reg_date', regdate);

  syncStorage.set('bmuserid;', bmuserid);
  syncStorage.set('image', imageProfile);
  syncStorage.set('district', district);
  syncStorage.set('tehsil', Tehsil);
  syncStorage.set('applicantname', fullname);
  syncStorage.set('contact', contact);
  syncStorage.set('cnic', cnic);
  syncStorage.set('fathername', fathername);
  syncStorage.set('age', age);
  syncStorage.set('dob', dob);
  syncStorage.set('gender', gender);
  // syncStorage.set('monthlyincome', monthlyincome);
  // syncStorage.set('monthlyincomeparent', monthlyincomeparent);
  syncStorage.set('postaladress', postaladress);
  syncStorage.set('permanentAddress', permanentAddress);
  syncStorage.set('reg_date', regdate);
  syncStorage.set('yourincome', yourincome);
  syncStorage.set('parentincome', parentincome);

    navigation.navigate('Otherinformation');
  
  }  
  };

  return (
    <View>
      <ImageBackground
        source={pwdIMage}
        style={{width: '100%', height: '100%', opacity: 0.9}}>
          <Loader loading={loading} />
        <View style={{padding:0, flex: 1, justifyContent: 'center'}}>
          <View
            style={{
              width: '100%',
              backgroundColor: '#fff',
              height: '100%',
              padding: 30,
              // borderRadius: 0,
            }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            >
              <View style={[styles.loginFormView, {}]}>
                <View style={{}}>
                  <Text
                    style={[
                      styles.logoText,
                      {
                        marginTop:10,
                        // paddingTop: -1,
                        textAlign: 'center',
                        color: '#002D62',
                        fontWeight: 'bold',
                        fontSize: 20,
                      },
                    ]}>
                    درخواست فارم
                  </Text>
                </View>

              <Text style={{marginTop:50,fontWeight:"bold",color:"#000000"}} >تصویر:</Text>
              <View style={{marginTop:5,backgroundColor:'#D3D3D3',borderRadius:5, height:70 }}>
                <TouchableOpacity onPress={img} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:60 }}>
                   <Image source={{uri:imageProfile}} style={{width: '100%', height: 60,resizeMode : 'contain' }} /> 
                </TouchableOpacity>
              </View>
      
                <Text style={[styles.fieldtext]}>ضلع:<Text style={{color:'red'}}> *</Text></Text>
                {/* <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                  <View style={styles.container}>
                    <Dropdown
                      style={[styles.dropdown, { borderColor: !domicileDistrict && errorValidate ? 'red' : '#fff'}]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      itemTextStyle={styles.itemTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      data={district}
                      search
                      labelField="label"
                      valueField="value"
                      placeholder={'ضلع منتخب کریں'}
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
                </View> */}
                <View
                  style={{
                    marginTop: 10,
                    backgroundColor: '#D3D3D3',
                    borderRadius: 3,
                    height: 40,
                  }}>
                  <TextInput
                    editable={false}
                    placeholderColor="#c4c3cb"
                    placeholderTextColor='grey'
                    // placeholder="اپنا نام درج کریں"
                    style={[styles.Step1FormTextInput
                    ]}
                    // onChangeText={fullname => setFullName(fullname)}
                    value={district}
                  />
                </View>

                <Text style={[styles.fieldtext]}>تحصیل: <Text style={{color:'red'}}> *</Text></Text>
                {/* <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                  <View style={styles.container}>
                    <Dropdown
                      style={[styles.dropdown, { borderColor: !tehsilID && errorValidate ? 'red' : '#fff'}]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      itemTextStyle={styles.itemTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      search
                      data={tehsil}
                      labelField="label"
                      valueField="value"
                      placeholder={'تحصیل منتخب کریں'}
                      value={tehsilID}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setTehsilId(item.value);
                        setFocus(false);
                      }}
                    />
                  </View>
                </View> */}
                <View
                  style={{
                    marginTop: 10,
                    backgroundColor: '#D3D3D3',
                    borderRadius: 3,
                    height: 40,
                  }}>
                  <TextInput
                    editable={false}
                    placeholderColor="#c4c3cb"
                    placeholderTextColor='grey'
                    // placeholder="اپنا نام درج کریں"
                    style={[styles.Step1FormTextInput
                    ]}
                    // onChangeText={fullname => setFullName(fullname)}
                    value={Tehsil}
                  />
                </View>

                <Text
                  style={[styles.fieldtext]}>
                  نام:<Text style={{color:'red'}}> *</Text>
                </Text>
                <View
                  style={{
                    marginTop: 10,
                    backgroundColor: '#D3D3D3',
                    borderRadius: 3,
                    height: 40,
                  }}>
                  <TextInput
                    editable={false}
                    placeholderColor="#c4c3cb"
                    placeholderTextColor='grey'
                    placeholder="اپنا نام درج کریں"
                    style={[styles.Step1FormTextInput
                    ]}
                    // onChangeText={fullname => setFullName(fullname)}
                    value={Name}
                  />
                </View>

                <Text
                  style={[styles.fieldtext]}>
                  رابطہ نمبر:<Text style={{color:'red'}}> *</Text>
                </Text>
                <View
                  style={{
                    marginTop: 10,
                    backgroundColor: '#D3D3D3',
                    borderRadius: 3,
                    height: 40,
                  }}>
                  <TextInput
                    editable={false}
                    placeholderColor="#c4c3cb"
                    keyboardType='numeric'
                    placeholderTextColor='grey'
                    placeholder="اپنا موبائل نمبر درج کریں"
                    style={[styles.Step1FormTextInput
                      , { borderColor: !contact && errorValidate ? 'red' : '#fff' }
                    ]}
                    onChangeText={contact => setcontact(contact)}
                    value={contact}
                  />
                </View>
                <Text
                  style={[styles.fieldtext]}>
                  شناختی کارڈ/بے فارم:<Text style={{color:'red'}}> *</Text>
                </Text>
                <View
                  style={{
                    marginTop: 10,
                    backgroundColor: '#D3D3D3',
                    borderRadius: 3,
                    height: 40,
                  }}>
                  <TextInput
                    editable={false}
                    // placeholderColor="#c4c3cb"
                    placeholderTextColor='grey'
                    keyboardType='numeric'
                    maxLength={13}
                    placeholder="اپنا شناختی کارڈ نمبر درج کریں"
                    style={[styles.Step1FormTextInput
                      , { borderColor: !cnic && errorValidate ? 'red' : '#fff' }
                    ]}
                    onChangeText={Cnic => setCNIC(Cnic)}
                    value={cnic}
                  />
                </View>

                <Text
                  style={[styles.fieldtext]}>
                  والد/شوہر کا نام:<Text style={{color:'red'}}> *</Text>
                </Text>
                <View
                  style={{
                    marginTop: 10,
                    backgroundColor: '#D3D3D3',
                    borderRadius: 3,
                    height: 40,
                  }}>
                  <TextInput 
                    editable={true}
                    placeholderColor="#c4c3cb"
                    placeholder="والد/شوہر کا نام درج کریں"
                    placeholderTextColor='grey'
                    style={[styles.Step1FormTextInput
                      , { borderColor: !fathername && errorValidate ? 'red' : '#fff' }
                    ]}
                    onChangeText={fathername =>
                    setfathername(fathername)
                    }
                    value={fathername}
                  />
                </View>
                <Text style={{ marginTop: 15, fontWeight: "bold", color: "#000000" }}>پیدائش کی تاریخ:<Text style={{color:'red'}}> *</Text></Text>
                <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 40 }}>
                  <DatePickerInput
                    locale="en"
                    label="" // No value provided for label
                    value={dob}
                    onChange={(dob) => setDOB(dob)}
                    mode={'flat'}
                    style={{ height: 50, backgroundColor: '#D3D3D3' }}
                    // style={[styles.view, { borderColor: !dob && errorValidate ? 'red' : '#fff'}]}
                  />
                </TouchableOpacity>


                <Text style={[styles.fieldtext]}>عمر:<Text style={{color:'red'}}> *</Text></Text>
                  <View style={[styles.view]}>
                    <View style={styles.container}>

                      <Dropdown
                        style={[styles.dropdown, { borderColor: !age && errorValidate ? 'red' : '#fff'}]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        itemTextStyle={styles.itemTextStyle}
                        data={agedata}
                        // search
                        labelField="label"
                        valueField="value"
                        placeholder={'عمر منتخب کریں'}
                        searchPlaceholder="Search..."
                        value={age}

                        onChange={item => {
                          setage(item.value);
                        }}
                      />
                    </View>
                  </View>
                <Text style={[styles.fieldtext]}>جنس:<Text style={{color:'red'}}> *</Text></Text>
                  <View style={[styles.view]}>
                    <View style={styles.container}>

                      <Dropdown
                        style={[styles.dropdown, { borderColor: !gender && errorValidate ? 'red' : '#fff'}]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        itemTextStyle={styles.itemTextStyle}
                        data={genderData}
                        // search
                        labelField="label"
                        valueField="value"
                        placeholder={'جنس کا انتخاب کریں'}
                        searchPlaceholder="Search..."
                        value={gender}

                        onChange={item => {
                          setGender(item.value);
                        }}
                      />
                    </View>
                  </View>
                  <Text style={[styles.fieldtext]}>ماہانہ آمدنی:<Text style={{color:'red'}}> *</Text></Text>
                  <View style={[styles.view]}>
                    <View style={styles.container}>

                      <Dropdown
                        style={[styles.dropdown, { borderColor: !yourincome && errorValidate ? 'red' : '#fff'}]} // Apply custom style for invalid selection
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        itemTextStyle={styles.itemTextStyle}
                        data={monthlyincomedata}
                        // search
                        labelField="label"
                        valueField="value"
                        placeholder={'ماہانہ آمدنی کا انتخاب کریں'}
                        // searchPlaceholder="Search..."
                        value={yourincome}

                        onChange={item => {
                          setYourincome(item.value);
                        }}
                      />
                    </View>
                  </View>
                  <Text style={[styles.fieldtext]}>ماہانہ آمدن (والدین/سرپرست):<Text style={{color:'red'}}> *</Text></Text>
                  <View style={[styles.view]}>
                    <View style={styles.container}>

                      <Dropdown
                        style={[styles.dropdown, { borderColor: !parentincome && errorValidate ? 'red' : '#fff'}]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        itemTextStyle={styles.itemTextStyle}
                        data={monthlyincomeparentdata}
                        // search
                        labelField="label"
                        valueField="value"
                        placeholder={'ماہانہ آمدنی کا انتخاب کریں'}
                        // searchPlaceholder="Search..."
                        value={parentincome}

                        onChange={item => {
                          setParentincome(item.value);
                        }}
                      />
                    </View>
                  </View>

                <Text
                  style={[styles.fieldtext]}>
                  ڈاک کا پتا:<Text style={{color:'red'}}> *</Text>
                </Text>
                <View
                  style={{
                    marginTop: 10,
                    backgroundColor: '#D3D3D3',
                    borderRadius: 3,
                    height: 40,
                  }}>
                  <TextInput 
                    editable={true}
                    placeholderColor="#c4c3cb"
                    placeholder="ڈاک کا پتہ درج کریں"
                    placeholderTextColor='grey'
                     style={[styles.Step1FormTextInput
                      , { borderColor: !postaladress && errorValidate ? 'red' : '#fff' }
                    ]}
                    onChangeText={postaladress =>
                      setmonthlypostaladress(postaladress)
                    }
                    value={postaladress}
                  />
                </View>

                <Text
                  style={[styles.fieldtext]}>
                  مستقل پتہ:<Text style={{color:'red'}}> *</Text>
                </Text>
                <View
                  style={{
                    marginTop: 10,
                    backgroundColor: '#D3D3D3',
                    borderRadius: 3,
                    height: 40,
                  }}>
                  <TextInput 
                    editable={true}
                    placeholderColor="#c4c3cb"
                    placeholder="مستقل پتہ درج کریں"
                    placeholderTextColor='grey'
                    style={[styles.Step1FormTextInput
                      , { borderColor: !permanentAddress && errorValidate ? 'red' : '#fff' }
                    ]}
                    onChangeText={permanentAddress =>
                      setpermanentAddress(permanentAddress)
                    }
                    value={permanentAddress}
                  />
                </View>

                <Text style={{ marginTop: 15, fontWeight: "bold", color: "#000000" }}>موجودہ تاریخ:<Text style={{color:'red'}}> *</Text></Text>
                  <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 40 }}>

                    <DatePickerInput
                      locale="en"
                      label=""
                      value={regdate}
                      onChange={(regdate) => setregdate(regdate)}
                      mode={'flat'}
                      style={{ height: 50, backgroundColor: '#D3D3D3' }}
                      // style={[styles.view , { borderColor: !currentdate && errorValidate ? 'red' : '#fff'}]}
                    />
                  </TouchableOpacity>


                <View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableOpacity
                      style={styles.button}
                      activeOpacity={0.5}
                      onPress={NextStep}
                    >
                  <Text style={[styles.text, { textAlign: 'center' }]}>
                    NEXT
                  </Text>
                </TouchableOpacity>
              </View>

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
  Step1FormTextInput: {
    flex: 1,
    color: 'black',
    borderWidth: 1,
    backgroundColor: '#D3D3D3',
    borderRadius: 5,
    height: 40,
    borderColor: '#dadae8',
  },
  fieldtext:{
    marginTop: 15, 
    fontWeight: 'bold', 
    color: '#000000'
  },
  Textinput:{
    flex: 1,
    color: 'black',
    borderWidth: 1,
    backgroundColor: '#D3D3D3',
    borderRadius: 5,
    height: 40,
    borderColor: '#dadae8',
    placeholderTextColor:'grey'
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
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    backgroundColor: '#D3D3D3',
    margin: 0,
  },
  view:{
    marginTop: 10,
    backgroundColor: '#D3D3D3',
    borderRadius: 5,
    height: 40 
  },
  button: {
    justifyContent: 'center',
    paddingVertical: 5,
    height: 40,
    width: 90,
    // paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#002D62',
    marginLeft: '60%',
    marginTop: '10%',
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'sans-serif',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
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

export default BmRegistration;
