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
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  ImageBackground,


} from 'react-native';
import Loader from '../Components/Loader';
import { TextInput, Image } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import pwdIMage from '../../assets/images/background.png'
import syncStorage from 'react-native-sync-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
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


const Disable = ({ navigation }) => {
  const [errorValidate, setErrorValidate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [residence, setResidence] = useState('');
  const [houserent, setHouserent] = useState('');
  const [expensedetail, setExpensedetail] = useState('');
  const [skill, setSkill] = useState('');
  const [need, setNeed] = useState('');
  const [purpose, setPurpose] = useState('');
  const [property, setProperty] = useState('');

  // step2  Death Certuficate      
  const [dImage, setDImage] = useState('');
  const [capDeath, setCapDeath] = useState('');
 
  // step2  Disability Certuficate      
  const [disImage, setDisImage] = useState('');
  const [capDisbale, setCapDisable] = useState('');

  // step2  CNIC front       
  const [cnicfImage, setCnicfImage] = useState('');
  const [capFCnic, setCapFCnic] = useState('');
  const [uricnicf, setURICnicf] = useState('');

  // step2  CNIC Back     
  const [backcnicImage, setBackcnicImage] = useState('');
  const [capCnicback, setCapCnicBack] = useState('');
  const [uribackcnic, setURIBackcnic] = useState('');
  

  const [urid, setURID] = useState('');
  const [uridis, setURIDis] = useState('');

  const SkillData = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];

  const NeedData = [
    { label: 'Incase Of Emergency', value: 'Incase Of Emergency' },
    { label: 'Widow', value: 'Widow' },
    { label: 'Divorced', value: 'Divorced' },
    { label: 'Seperated', value: 'eperated' },
    { label: 'UnSupported', value: 'UnSupported' },
    { label: 'Old', value: 'Old' },
    { label: 'Disabled', value: 'Disabled' },
    { label: 'Orphan', value: 'Orphan' },
  ];

  const PropertyData = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ];
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

    // Update the state based on the fieldName
    switch (fieldName) {
      case 'expensedetail':
        setExpensedetail(filteredInput);
        break;
      case 'purpose':
        setPurpose(filteredInput);
        break;
      default:
        break;
    }
  };


  // step3
  const deathcerti = async () => {
    
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
        setDImage(imageUri);
        setURID(imageUri)
        // console.log('Image cnic back',imageUri)
        const fileBase64        = response.assets[0].base64
        setCapDeath(fileBase64)
      }
    });
  }
  // step3
  const disablecerti = async () => {
    
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
        setDisImage(imageUri);
        setURIDis(imageUri)
        console.log('Image cnic back',imageUri)
        const fileBase64        = response.assets[0].base64
        setCapDisable(fileBase64)
      }
    });
  }


  // step3
  const cnicfront = async () => {
    
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
        setCnicfImage(imageUri);
        setURICnicf(imageUri)
        // console.log('Image cnic back',imageUri)
        const fileBase64        = response.assets[0].base64
        setCapFCnic(fileBase64)
      }
    });
  }

  // step3
  const backcnic = async () => {
    
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
        setBackcnicImage(imageUri);
        setURIBackcnic(imageUri)
        console.log('Image cnic back',imageUri)
        const fileBase64        = response.assets[0].base64
        setCapCnicBack(fileBase64)
      }
    });
  }

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


  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      </View>
    );
  };


  const DisableSubmit = () => {
    setErrorValidate(true)
    if(!expensedetail){
      ToastAndroid.show('Enter your Expense Details', ToastAndroid.LONG);
      return;
    } else if(!residence){
      ToastAndroid.show('Select Residential Status', ToastAndroid.LONG);
      return;
    }else if(!skill){
      ToastAndroid.show('Select your Skill', ToastAndroid.LONG);
      return;
    }else if(!need){
      ToastAndroid.show('Select Your Need', ToastAndroid.LONG);
      return;
    }else if(!purpose){
      ToastAndroid.show('Enter your Purpose', ToastAndroid.LONG);
      return;
    }else if(!property){
      ToastAndroid.show('Enter Groom Father Name', ToastAndroid.LONG);
      return;
    }
    else if(!uricnicf){
      ToastAndroid.show('Upload CNIC Front Image', ToastAndroid.LONG);
      return;
    }else if(!uribackcnic){
      ToastAndroid.show('Upload CNIC Back Image', ToastAndroid.LONG);
      return;
    }else{
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
      const uriaffidavit = syncStorage.get('uriaffidavit');
      const affidavitImage = syncStorage.get('affidavitImage');
      const affidavitType = syncStorage.get('affidavitType');
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


      console.log(JSON.stringify(NameArray),AgeArray,EducationArray)


      console.log('formData Arrays', NameArray);

      setLoading(true)
      fetch(
        `${baseUrl[0]}/regformdisallpost`,
        {
          method: 'POST',
          headers:{
            'Accept':'application/json',
            'Content-Type': 'multipart/application/json',
            'enctype':"multipart/form-data"
          },
          body: JSON.stringify({ user_id: `${bmuser_id}`, district: `${district}`,tehsil: `${Tehsil}`,image: `${imageProfilee}`,applicantname: `${fullname}`,
          cnic: `${cnic}`,contact: `${phone}`,fathername:`${fathername}`,dob: `${dob}`,agegroup: `${agegroup}`,gender: `${gender}`,address: `${paddress}`,paddress: `${ppaddress}`,
          reg_date: `${reg_date}`,yourincome: `${yourincome}`,parentincome:`${parentincome}`,service:`${service}`,GovernmentData:`${otherservice}`,
          affidavitImage: `${affidavitImage}`,rname:`${NameArray}`,rage:`${AgeArray}`,
          roccupation:`${OccupyArray}`,rincome:`${IncomeArray}`,reducation:`${EducationArray}`,rrelation:`${RelationArray}`,
          expensedetail:`${expensedetail}`,residence:`${residence}`,skill:`${skill}`,need:`${need}`,purpose:`${purpose}`,property:`${property}`,deathcerti:`${capDeath}`,
          disablecerti:`${capDisbale}`,cnicfront:`${capFCnic}`,backcnic:`${capCnicback}`
          
        })
        }
      )
      .then(resp => resp.json()).then(response => 
        { 
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
      ).finally(() =>{
        setLoading(false);
      });

    }
  };
 
  return (
    <View>

      <ImageBackground source={pwdIMage}  style={{width:'100%',height:'100%',opacity:0.9}}>
      <Loader loading={loading} />
          <View style={{padding:0, flex:1, justifyContent:'center'}}>
            <View style={{width:'100%',backgroundColor:'#fff', height:'100%',padding:30, borderRadius:0}}>
            <ScrollView
             showsVerticalScrollIndicator={false}
             showsHorizontalScrollIndicator={false}>
              <View style={[styles.loginFormView,{}]}>
              <View style={{ flex: 1, flexDirection: 'row', marginLeft: 5, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={[styles.mainheading]}>
                ضرورت مندافراد کے لیے مالی امداد
              </Text>
            </View>

            {/* Disabled Form */}

            <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>اگر آپ بے روزگار ہیں تو آپ کے اخراجات کی تفصیل</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TextInput  placeholderColor="#c4c3cb" 
                    placeholderTextColor='grey'
                    onChangeText={input => {
                      handleInputChange(input, 'expensedetail');
                    }}
                  value={expensedetail}
                  placeholder="آپ کے اخراجات کی تفصیل"
                  style={[styles.Step1FormTextInput
                    , { borderColor: !expensedetail && errorValidate ? 'red' : '#fff' }
                  ]}
                  />
                </View>
                {warning !== '' && (
                  <Text style={{color: 'red', fontsize: '12'}}>{warning}</Text>
                )}


                {/* Experience */}
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>رہائش گاہ</Text>
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
                  <TextInput  placeholderColor="#c4c3cb"  style={styles.Step1FormTextInput}
                    placeholderTextColor='grey'
                    keyboardType="numeric"
                  onChangeText={(houserent) => setHouserent(houserent)}
                  value={houserent}
                  placeholder="گھر کا کرایہ درج کریں"
                  />
                </View>

                </View>

  :null}

             <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>کیا درخواست دہندہ کوئی اضافی ہنر جانتا ہے؟</Text>
             <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                  <View style={styles.container}>

                    <Dropdown
                      style={[styles.dropdown, { borderColor: !skill && errorValidate ? 'red' : '#fff'}]}
                     placeholderStyle={styles.placeholderStyle}
                     selectedTextStyle={styles.selectedTextStyle}
                     itemTextStyle={styles.itemTextStyle}
                     inputSearchStyle={styles.inputSearchStyle}
                      data={SkillData}
                      // search
                      labelField="label"
                      valueField="value"
                      placeholder={'منتخب کریں'}
                      searchPlaceholder="Search..."
                       value={skill}

                      onChange={item => {
                          setSkill(item.value);
                      }}
                    />
                  </View>
             </View>


                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>آپ کو مالی امداد کی ضرورت کیوں ہے؟</Text>
             <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                  <View style={styles.container}>

                    <Dropdown
                      style={[styles.dropdown, { borderColor: !need && errorValidate ? 'red' : '#fff'}]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      itemTextStyle={styles.itemTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      data={NeedData}
                      // search
                      labelField="label"
                      valueField="value"
                      placeholder={'منتخب کریں'}
                      searchPlaceholder="Search..."
                       value={need}

                      onChange={item => {
                          setNeed(item.value);
                      }}
                    />
                  </View>
          </View>


           <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>مالی امداد کا مقصد ؟</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TextInput  placeholderColor="#c4c3cb"
                  placeholderTextColor='grey'
                  onChangeText={input => {
                    handleInputChange(input, 'purpose');
                  }}
                  value={purpose}
                  placeholder="اپنے مقصد کا ذکر کریں"
                  style={[styles.Step1FormTextInput
                    , { borderColor: !purpose && errorValidate ? 'red' : '#fff' }
                  ]}
                  />
                </View>
                {warning !== '' && (
                  <Text style={{color: 'red', fontsize: '12'}}>{warning}</Text>
                )}

           <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>درخواست گزار/ فیملی ممبر کی ذاتی جائیداد</Text>
             <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                  <View style={styles.container}>

                    <Dropdown
                    style={[styles.dropdown, { borderColor: !property && errorValidate ? 'red' : '#fff'}]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    itemTextStyle={styles.itemTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                      data={PropertyData}
                      // search
                      labelField="label"
                      valueField="value"
                      placeholder={'منتخب کریں'}
                      searchPlaceholder="Search..."
                       value={property}

                      onChange={item => {
                          setProperty(item.value);
                      }}
                    />
                  </View>
             </View>

{/* FILES */}

<Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}} >بیوہ ہونے کی صورت میں خاوند کی وفات کا سرٹیفیکیٹ</Text>
            
            <View style={{marginTop:5,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
            <TouchableOpacity onPress={deathcerti} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:60 }}>
              {dImage != '' ?
                <Image source={{uri:dImage}} style={{width: '100%', height: 60,resizeMode : 'contain' }} />
              :null}
            </TouchableOpacity>
          </View>

          <Text style={{marginTop:40,fontWeight:"bold",color:"#000000"}} >معذور ہونے کی صورت میں معذوری کا سرٹیفیکیٹ</Text>
            
            <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
            <TouchableOpacity onPress={disablecerti} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:60 }}>
              {disImage != '' ?
               <Image source={{uri:disImage}} style={{width: '100%', height: 60,resizeMode : 'contain' }} />
              :null}
               
            </TouchableOpacity>
          </View>


          <Text style={{marginTop:40,fontWeight:"bold",color:"#000000"}} >درخواست گزار کے شناختی کارڈ کی سامنے سے تصویر</Text>
            
            <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
            <TouchableOpacity onPress={cnicfront} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:60}}>
              {cnicfImage != '' ?
                <Image source={{uri:cnicfImage}} style={{width: '100%', height: 60,resizeMode : 'contain' }} />
              :null}
            </TouchableOpacity>
          </View>

          <Text style={{marginTop:40,fontWeight:"bold",color:"#000000"}} >درخواست گزار کے شناختی کارڈ کی پیچھلی طرف سے تصویر</Text>
            
            <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
            <TouchableOpacity onPress={backcnic} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:60 }}>
              {backcnicImage != '' ?
                <Image source={{uri:backcnicImage}} style={{width: '100%', height: 60,resizeMode : 'contain' }} />
              :null}
            </TouchableOpacity>
          </View>


{/* file end */}

                <View style={[styles.row,{justifyContent:'space-between', alignSelf:'flex-end', marginTop:35}]}>

                <TouchableOpacity
                    onPress={DisableSubmit}
                  // onPress={NextStep}
               // onPress={() => navigation.navigate('DRTCstep3')}
                  style={styles.ButtonStyle}
                  activeOpacity={0.5}>

                  <Text style={[styles.text,{textAlign:'center'}]}>Submit</Text>

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
export default Disable;
const styles = StyleSheet.create({

  mainheading:{
    paddingTop:1,
    textAlign: 'center',
    color: '#002D62',
    fontWeight: "bold",
    fontSize: 18,
    textDecorationLine:'underline'
  },
  ButtonStyle:{
    justifyContent: 'center',
    height: 40,
    width:'30%',
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
  Step1FormTextInput: {
    flex: 1,
    color: 'black',
    borderWidth: 1,
    backgroundColor: '#D3D3D3',
    borderRadius: 5,
    height: 40,
    borderColor: '#dadae8',
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

