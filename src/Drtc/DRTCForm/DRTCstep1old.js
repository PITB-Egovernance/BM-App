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
  Image,
  map,
} from 'react-native';
// import logo from '../../uploads/profileimg/';
// import logo from '../../../assets/images/logo.jpg';
// import govt from '../../../assets/images/govt.jpg';
import { Dropdown } from 'react-native-element-dropdown';
import { MultiSelect } from 'react-native-element-dropdown';
import { Alert, Keyboard, KeyboardAvoidingView,  TextInput, TouchableWithoutFeedback,  } from "react-native";
import pwdIMage from '../../../assets/images/background.png';
import syncStorage from 'react-native-sync-storage';
import { RadioButton, Text } from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { DataTable } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';


//Drtcstep1 create Form
const optionsPerPage = [2, , 4];
const DRTCstep1 = ({navigation}) => {
  const [Focus, setFocus]                         = useState(false);
  const [districtofd, setdistrit]        = useState('');
  const [tehsil, setTehsil]        = useState([]);
  const [board, setboard]        = useState('');
  const [imageProfile, setimage]      = useState('');
  const [fullname, setFullName]      = useState('');
  const [fathername, setFatherName]  = useState('');
  const [relationship, setrelationship]  = useState('');
  const [ father_spouse_name, setfather_spouse_name]  = useState('');
  const [cnic, setCnic]              = useState('');
  const [maritalstatus, setmaritalstatus]              = useState('');
  const [dob, setDob]                = useState('');
  const [qualification, setQualification]    = useState('');
  const [typeofd, setType]            = useState('');
  const [causeofd, setCause]            = useState('');
  const [paddress, setPaddress]        = useState('');
  const [ppaddress, setPpaddress]        = useState('');
  const [tehsil_id, setTehsilid] = useState('');
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
  const logo = require('../../../assets/images/swo_logo.jpg');
  const govt = require('../../../assets/images/govt.jpg');
  // const imagep = require(`../../../uploads/profileimg/${image}`);
  //formdrtc table
const [errorValidate, setErrorValidate] =  useState(false);
//  const [aid, setAid] = useState('');

 const [name, setName]   = useState('');
const [district, setDistrict]       = useState('');
const [gc, setGovernmentData]       = useState('');
const [gcp, setgcp]       = useState('');
const [accountn, setAccountn]           = useState('');
 const [accounthn, setAccounthn]             = useState('');
  const [accountr, setAccountr]     = useState('');
   const [dincome, setDincome]         = useState('');
   const [residence, setResidence]         = useState('');
   const [appdate, setAppdate]         = useState('');
   const [pwdpinfos_id, setPwdpinfos_id]         = useState('');


  const RelationshipData = [
    { label: 'Mother', value: 'Mother' },
    { label: 'Father', value: 'Father' },
    { label: 'Brother', value: 'Brother' },
    { label: 'Sister', value: 'Sister' },
    { label: 'Son', value: 'Son' },
    { label: 'Daughter', value: 'Daughter' },
    { label: 'Husband', value: 'Husband' },
    { label: 'Wife', value: 'Wife' },
    { label: 'Grandparents', value: 'Grandparents' },
  ];
  const GovernmentData = [
    { label: 'Health Card', value: 'Health Card' },
    { label: 'Khidmat Card', value: 'Khidmat Card' },
    { label: 'Government Job', value: 'Government Job' },
    { label: 'Ihsas_Program', value: 'Ihsas_Program' },
    { label: 'BISP', value: 'BISP' },
    { label: 'Bait-ul-Maal', value: 'Bait-ul-Maal' },
  ];


    const renderItem = (item: any) => {
      return (
        <View style={styles.item}>
          <Text style={styles.selectedTextStyle}>{item.label}</Text>
          <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        </View>
      );
    };
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


  const NextStep = () => {

    //  setErrorValidate(true)
    //  if(!firstName){
    //    ToastAndroid.show('Please enter your First Name', ToastAndroid.LONG);
    //    return;
    //  }else if(!lastName){
    //    ToastAndroid.show('Please enter your Last Name', ToastAndroid.LONG);
    //    return;
    //  }else if(!relation){
    //   ToastAndroid.show('Select your Relation', ToastAndroid.LONG);
    //   return;
    // }else if(!gender){
    //   ToastAndroid.show('Select your Gender', ToastAndroid.LONG);
    //   return;
    // }else if(!cnic){
    //   ToastAndroid.show('Please enter your CNIC', ToastAndroid.LONG);
    //   return;
    // }else if(!age){
    //   ToastAndroid.show('Please enter your Age', ToastAndroid.LONG);
    //   return;
    // }else if(!dob){
    //   ToastAndroid.show('Select your Date of Birth', ToastAndroid.LONG);
    //   return;
    // }else if(!marital){
    //   ToastAndroid.show('Select your Status', ToastAndroid.LONG);
    //   return;
    // }else{


    // }


    //  console.log(aid,name,district,gc,gender,accountn,accounthn,accountr,gcp,dincome,residence, appdate)

    syncStorage.set('Name', name)
    syncStorage.set('District', district)
    syncStorage.set('GovernmentData', gc)
    syncStorage.set('Accountn',accountn)
    syncStorage.set('Accounthn', accounthn)
    syncStorage.set('Accountr', accountr)
    syncStorage.set('gcp', gcp)
    syncStorage.set('Dincome', dincome)
    syncStorage.set('Residence', residence)
    syncStorage.set('Appdate', appdate)
    syncStorage.set('Tehsil_id', tehsil_id)
    // syncStorage.set('Pwdpinfos_id', pwdpinfos_id)
console.log('District',districtofd)
    navigation.navigate('DRTCstep2')
  }
// datatable start
useEffect(() =>{
  getpwdinfoDetail();
  getdistrictofdData();
  //  getTehsil();

}, []);


const getpwdinfoDetail = (pwdinfoDetail) =>{

  // console.log('pwdinfoDetail', pwdinfoDetailid)
  // console.log('Board id', BoardID)
  fetch(`https://dpmis.punjab.gov.pk/api/pwdapp/pwdregshow/615`, {
    method: 'GET',
    headers:{
      'Accept': 'application/json',
      'Content-Type':'application/json',
      'secret':'pwdreg'
    },
  })
  .then(pwdinfoDetail => pwdinfoDetail.json())
  .then(resppwdinfoDetail => {

    // console.log('response  detail',resppwdinfoDetail['PWD basic info'][0])
    const district   = resppwdinfoDetail['PWD basic info'][0].district;
      console.log('districtofd', district)
      const board   = resppwdinfoDetail['PWD basic info'][0].board;
        // console.log('board', board)
    const image   = resppwdinfoDetail['PWD basic info'][0].image;
      // console.log('image', image)


      const fullName    = resppwdinfoDetail['PWD basic info'][0].firstname+' '+resppwdinfoDetail['PWD basic info'][0].lastname;
      // console.log('FullName', fullName)
      const relationship    = resppwdinfoDetail['PWD basic info'][0].relationship;
      // console.log('relationship', relationship)
      const father_spouse_name    = resppwdinfoDetail['PWD basic info'][0].father_spouse_name;
      // console.log('father_spouse_name', father_spouse_name)
      const cnic   = resppwdinfoDetail['PWD basic info'][0].cnic;
      // console.log('cnic', cnic)
      const dob   = resppwdinfoDetail['PWD basic info'][0].dob;
      // console.log('dob', dob)
      const maritalstatus   = resppwdinfoDetail['PWD basic info'][0].maritalstatus;
      // console.log('maritalstatus', maritalstatus)
      const qualification   = resppwdinfoDetail['PWD basic info'][0].qualification;
      // console.log('qualification', qualification)
      const typeofd   = resppwdinfoDetail['PWD basic info'][0].typeofd;
      // console.log('typeofd', typeofd)
      const causeofd   = resppwdinfoDetail['PWD basic info'][0].causeofd;
      // console.log('causeofd', causeofd)
      const paddress   = resppwdinfoDetail['PWD basic info'][0].paddress;
      // console.log('paddress', paddress)
      const ppaddress   = resppwdinfoDetail['PWD basic info'][0].ppaddress;
      // console.log('ppaddress', ppaddress)

        setboard(board);
        setimage(image);
        setFullName(fullName);
        setrelationship(relationship);
        setfather_spouse_name(father_spouse_name);
        setCnic(cnic);
        setmaritalstatus(maritalstatus);
        setDob(dob);
        setQualification(qualification);
        setType(typeofd)
        setCause(causeofd)
        setTehsil(tehsil)
        setPaddress(paddress)
        setPpaddress(ppaddress)
      getTypeofdData(typeofd)
      getCauseofdData([typeofd,causeofd])
      getdistrictofdData(district)

      getTehsil([district,tehsil])
  });

}
const getdistrictofdData = (districtofdid) =>{

  console.log('districtofd functino', districtofdid)
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

    // console.log('district', respdistrictofdName['PWD district'])
    const districtofdReponse = respdistrictofdName['PWD district'];
    // console.log('sdasdasdsadas', districtofdReponse)
    districtofdReponse.map((item, i) => {
      if(item.id == districtofdid){
        setdistrit(item.name)
      }
    });

  });
}
  console.log('district',district)
const getTehsil = ([district,tehsil]) =>{
   console.log('tehsil',tehsil)
  fetch(`https://dpmis.punjab.gov.pk/api/app/tehsil/${district}`, {
    method: 'GET',
    headers:{
      'Accept': 'application/json',
      'Content-Type':'application/json',
      'secret':'f08md117'
    },
  })
  .then(respTehsil => respTehsil.json())
  .then(responseTehsil => {

    console.log('tehsil', responseTehsil)

    var count = Object.keys(responseTehsil.tehsil).length;
    let tehsilData = [tehsil];
    for (var i = 0; i < count; i++) {
      tehsilData.push({ value: responseTehsil.tehsil[i].id, label: responseTehsil.tehsil[i].tname });
    }
    // console.log(JSON.stringify(tehsilData))
    setTehsil(tehsilData);
  });
}


const getTypeofdData = (typeofdid) =>{

  // console.log('fsdffssfdds', typeofdid)
  // console.log('Board id', BoardID)
  fetch(`https://dpmis.punjab.gov.pk/api/app/typeofd`, {
    method: 'GET',
    headers:{
      'Accept': 'application/json',
        'Content-Type':'application/json'
    },
  })
  .then(respdistrictofdofd => respdistrictofdofd.json())
  .then(respdistrictofdofdName => {

    const districtofdofdReponse = respdistrictofdofdName.typeofd;
    // console.log('districtofdofds Typeofd', districtofdofdReponse)
    districtofdofdReponse.map((item, i) => {
      if(item.id == typeofdid){
        setType(item.name)
      }
    });

  });
}
const getCauseofdData = ([typeofd,causeofd]) =>{

  // console.log('TYpeofD', typeofd)
  // console.log('Cause of d id', causeofd)
  // console.log('Board id', BoardID)
  fetch(`https://dpmis.punjab.gov.pk/api/app/causeofd/${typeofd}`, {
    method: 'GET',
    headers:{
      'Accept': 'application/json',
        'Content-Type':'application/json'
    },
  })
  .then(respCause => respCause.json())
  .then(respCauseName => {

    // console.log('Cause Name', respCauseName)
    const causeData = respCauseName.causeofd;
    causeData.map((item, i) => {
      if(item.id == causeofd){
        setCause(item.name)
      }
    });

  });
}






  return (


    <View>

      <ImageBackground source={pwdIMage} style={{width:'100%',height:'100%',opacity:0.9}}>
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
              <DataTable>
      {/* <DataTable.Header style={styles.Header}> */}

        {/* <DataTable.Title style={{ alignItems: 'center' }}> */}
        {/* <View>
          <Image source={logo}
          style={{ width: 50, height: 50, borderRadius: 25 }}
          />
        </View> */}
        {/* </DataTable.Title> */}
        {/* <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center',marginTop:5}}>
        <Text style={{color:'black',fontSize:10,textAlign: 'center',marginRight:10}}>GOVERNMENT OF THE PUNJAB</Text>
        <Text style={{color:'black',fontSize:8,textAlign: 'center'}}>SOCIAL WELFARE AND BAIT-UL-MAAL DEPARTMENT{'\n'}
          (PROVINCIAL COUNCIL FOR THE REHABILITATION OF DISABLE PERSONS)</Text>
        </View> */}
        {/* <DataTable.Title style={{ alignItems: 'center' }}> */}
        {/* <View>
          <Image source={govt}
          style={{width: 50, height: 45, borderRadius: 25 }}
          />
        </View> */}
        {/* </DataTable.Title> */}
      {/* </DataTable.Header> */}

    <View
    style={styles.row}>
    <Text style={{color:'black',fontSize:16,textAlign: 'center',textDecorationLine: 'underline',fontWeight:'bold' }}>Basic Information</Text>
    </View>
    <View style={styles.row}>
      <Text style={{color:'black',fontSize:12,textAlign:'center'}}>Assessment Board for the Person With Disabilities district {districtofd}</Text>
    </View>
    <View style={styles.Row}>
    {/* <Text style={{color:'black',fontSize:12,textAlign: 'right'}}>Qrcode</Text> */}
    <Image source={{uri:`https://dpmis.punjab.gov.pk/uploads/profileimg/${imageProfile}`}} style={{ width: 50, height: 50, borderRadius: 25, }}/>
    </View>
    <View style={styles.row}>
      <Text style={[styles.TextStyle,{marginLeft:'60%'}]}>Reg No: <Text style={[styles.InnerText]}></Text></Text>
      <Text style={[styles.TextStyle,{marginLeft:'60%'}]}>Dated: <Text style={[styles.InnerText]}></Text></Text>
    </View>
    <View style={[styles.Row1]}>
    <Text style={[styles.TextStyle,{textAlign: 'left'}]}>1-Name:<Text style={[styles.InnerText]}> {fullname}</Text></Text>
    </View>
    <View style={[styles.Row1]}>
    <Text style={[styles.TextStyle,{textAlign: 'left'}]}>2-Father's/Spouse's Name:<Text style={[styles.InnerText]}> {relationship}: {father_spouse_name}</Text></Text>
    </View>
    <View style={[styles.Row1]}>
    <Text style={[styles.TextStyle,{textAlign: 'left'}]}>3-Marital Status:<Text style={[styles.InnerText]}> { maritalstatus}</Text></Text>
    </View>
    <View style={[styles.Row1]}>
    <Text style={[styles.TextStyle,{textAlign: 'left'}]}>4-NIC/CNIC/B-Form/NICOP NO:<Text style={[styles.InnerText]}> {cnic}</Text></Text>
    </View>
    <View style={[styles.Row1]}>
    <Text style={[styles.TextStyle,{textAlign: 'left'}]}>5-Date of Birth:<Text style={[styles.InnerText]}> {dob}</Text></Text>
      <Text style={[styles.TextStyle,{textAlign: 'left'}]}>6-Type of Disability:<Text style={[styles.InnerText]}> {typeofd}</Text></Text>
    </View>
    <View style={[styles.Row1]}>
    <Text style={[styles.TextStyle,{textAlign: 'left'}]}>7-Qualification:<Text style={[styles.InnerText]}> {qualification}</Text></Text>
      <Text style={[styles.TextStyle,{textAlign: 'right'}]}>8-Nature of Disability: </Text>
    </View>
    <View style={[styles.row]}>
    <Text style={[styles.TextStyle,{textAlign: 'left'}]}>9-Cause of Disability:<Text style={[styles.InnerText]}> {causeofd}</Text></Text>
    </View>
    <View style={styles.row}>
    <Text style={[styles.TextStyle,{textAlign: 'left'}]}>10-Permanent Address:<Text style={[styles.InnerText]}> {paddress}</Text></Text>
    </View>
    <View style={styles.row}>
    <Text style={[styles.TextStyle,{textAlign: 'left'}]}>11-Present Address:<Text style={[styles.InnerText]}> {ppaddress}</Text> </Text>
    </View>
    <View style={[styles.Row1]}>
    <Text style={[styles.TextStyle,{textAlign: 'left'}]}>12-Recommendation of the Board:</Text>
      <Text style={[styles.TextStyle,{}]}>(|)-Fit To Work :     </Text>
    </View>
    <View style={[styles.row]}>
    <Text style={[styles.TextStyle,{textAlign: 'left'}]}>13-If Fit to Work:Specify:</Text>
      <Text style={[styles.TextStyle]}>(|) Job :</Text>
      <Text style={[styles.TextStyle]}>(||) Training :</Text>
    </View>
    <View style={[styles.row]}>
    <Text style={[styles.TextStyle,{textAlign: 'left'}]}>14-Other Recommendations:</Text>
      <Text style={[styles.TextStyle]}>(|) Prosthesis :</Text>
      <Text style={[styles.TextStyle]}>(||) Protective Equipment :</Text>
      <Text style={[styles.TextStyle]}>(|||) Medical Treatment :</Text>
    </View>




      {/* <DataTable.Row
      style={styles.row}>
      <DataTable.Cell>This Certificate has been Generated by MIS, therefore no signature is required & this certificate can be
    verified at (dpmis.punjab.gov.pk)</DataTable.Cell>
        <DataTable.Cell numeric></DataTable.Cell>
        <DataTable.Cell numeric></DataTable.Cell>
        <DataTable.Cell numeric>
        </DataTable.Cell>
      </DataTable.Row> */}

    </DataTable>
            <View>

                <View>
                <Text style={[styles.logoText,{textAlign: 'center',color: '#002D62', fontWeight: "bold",fontSize: 20}]}>DRTC Application Form</Text>
                </View>
                <Text style={{marginTop:10,fontWeight:"bold",color:"#000000"}}>Monthly Income(In Rs.): (ماہانہ آمدنی روپے میں)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder='Enter Your Monthly Income (only digits)'
                  style={[styles.DRTCstep1FormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}
                   onChangeText={(dincome) => setDincome(dincome)}
                   value={dincome}

                />
                </View>


               <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Residence: (رہائش گاہ)</Text>
              <RadioButton.Group onValueChange={residence => setResidence(residence)} value={residence} style={{marginTop:10}}>
                <View style={{ flexDirection: 'row',marginTop:5}}>
                    <View style={{flexDirection: "row"}}>
                      <RadioButton value="Personal"/>
                      <Text style={{fontWeight: 'bold',marginTop:'5%'}}>Personal</Text>
                    </View>
                    <View  style={{flexDirection: "row"}}>
                      <RadioButton value="Rented" />
                      <Text style={{fontWeight: 'bold',marginTop:'7%'}}>Rented</Text>
                    </View>
                </View>
              </RadioButton.Group>


                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Select Tehsil: (تحصیل منتخب کریں۔)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                  <View style={styles.container}>

                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                       data={tehsil}
                      // search
                      labelField="label"
                      valueField="value"
                      value={tehsil_id}
                      placeholder={'Select Tehsil'}
                      searchPlaceholder="Search..."


                      onChange={item => {
                        setTehsilid(item.value);
                        setFocus(false);
                      }}
                    />
                  </View>
                </View>


                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Application Date: (تاریخ درخواست)</Text>
                <TouchableOpacity style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>

                  <DatePickerInput
                    // locale="en"
                    label=""
                     value={appdate}
                    onChange={(appdate) => setAppdate(appdate)}
                     mode={'flat'}
                    style={{height:50,backgroundColor:'#D3D3D3'}}
                  />
                </TouchableOpacity>


                <Text style={{marginTop:10,fontWeight:"bold",color:"#000000"}}>Account No: (اکاؤنٹ کا نمبر)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder='Enter Your Account No'
                  style={[styles.DRTCstep1FormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}
                  onChangeText={(accountn) => setAccountn(accountn)}
                   value={accountn}

                />
                </View>
                {typeofd=='4'?
                <View>


                 <View>
                <Text style={[styles.logoText,{textAlign: 'center',color: '#002D62', fontWeight: "bold",fontSize: 20}]}>Account Holder Information</Text>
                </View>

                <Text style={{marginTop:10,fontWeight:"bold",color:"#000000"}}>Account Holder Name: (کھاتہ دار کا نام)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder='Enter The Name Of Account Holder'
                  style={[styles.DRTCstep1FormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}
                   onChangeText={(accounthn) => setAccounthn(accounthn)}
                   value={accounthn}

                />
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Relationship with Account Holder: (اکاؤنٹ ہولڈر کے ساتھ رشتہ)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                  <View style={styles.container}>

                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      data={RelationshipData}
                      // search
                      labelField="label"
                      valueField="value"
                      placeholder={'Select Relationship'}
                      searchPlaceholder="Search..."
                       value={accountr}

                      onChange={item => {
                          setAccountr(item.value);
                      }}
                    />
                  </View>
                </View>
</View>:null
}

                <View>
                <Text style={[styles.logoText,{textAlign: 'center',color: '#002D62', fontWeight: "bold",fontSize: 14}]}>Note:Preference will be given to those applicant who are not geting any Other facility from government:</Text>
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Avail Any Government Service: (کوئی بھی سرکاری سروس حاصل کریں۔)</Text>
              <RadioButton.Group onValueChange={gcp => setgcp(gcp)} value={gcp} style={{marginTop:10}}>
                <View style={{ flexDirection: 'row',marginTop:5}}>
                    <View style={{flexDirection: "row"}}>
                      <RadioButton  id="Yes" value="Yes"/>
                      <Text style={{fontWeight: 'bold',marginTop:'5%'}}>Yes</Text>
                    </View>
                    <View  style={{flexDirection: "row"}}>
                      <RadioButton  id="No" value="No" />
                      <Text style={{fontWeight: 'bold',marginTop:'7%'}}>No</Text>
                    </View>
                </View>
              </RadioButton.Group>


              {gcp =='Yes'?
              <View style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>
 <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Government Services: (سرکاری خدمات)</Text>



                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>

                  <View style={styles.container}>

                    <MultiSelect
                      style={styles.Dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      data={GovernmentData}
                      // search
                      labelField="label"
                      valueField="value"
                      placeholder={'Select Service you Avail'}
                      searchPlaceholder="Search..."
                      value={gc}

                      onChange={item => {
                          setGovernmentData(item);
                      }}
                      renderLeftIcon={() => (
                        <AntDesign
                          style={styles.icon}
                          color="black"
                          name="Safety"
                          size={20}
                        />
                      )}
                      renderItem={renderItem}
                      renderSelectedItem={(item, unSelect) => (
                        <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
                          <View style={styles.selectedStyle}>
                            <Text style={styles.textSelectedStyle}>{item.label}</Text>
                            <AntDesign color="black" name="delete" size={17} />
                          </View>
                        </TouchableOpacity>
                      )}

                    />
 </View>
                  </View>

                </View>:null
}


                <TouchableOpacity
                   onPress={NextStep}
                //onPress={() => navigation.navigate('DRTCstep2')}
                  style={styles.ButtonStyle}
                  activeOpacity={0.5}>

                  <Text style={[styles.text,{textAlign:'center'}]}>Next</Text>

                </TouchableOpacity>


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
  DRTCstep1FormTextInput:{
    flex: 1,
    color: 'black',
    borderWidth: 1,
    backgroundColor:'#D3D3D3',
    borderRadius:5,
    height:40,
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
  Dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
  },
    shadowOffset: {
      width: 0,
      height: 1,
    },
  ButtonStyle:{
    justifyContent: 'center',
    width:'30%',
    padding:10,
    borderRadius: 14,
    elevation: 3,
    backgroundColor: '#002D62',
    marginTop:10,
    marginLeft:'70%',
  },
  text:{
    color:'white',
    fontSize:15,
    fontFamily: "sans-serif",

  },
  InnerText:{
    color:'black',
    fontWeight:'normal',
    textDecorationLine: 'underline'
  },

  placeholderStyle: {
    fontSize: 14,
    margin:2
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  TextStyle:{
    color:'black',
    fontSize:12,
    textAlign: 'left',
    fontWeight:'bold',
    marginTop:10
  },
  logoImage:{
    width: '100%',
    height: '120%',
    resizeMode: 'contain',
    marginTop:'10%'

  },
});

export default DRTCstep1;