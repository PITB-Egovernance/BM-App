/**
 * Sample React Native App Step 1
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useState, useEffect } from 'react';
import {

  ScrollView,
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  ToastAndroid,
  KeyboardAvoidingView, 
  TextInput,
  Image

} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import pwdIMage from '../../../assets/images/background.png';
import syncStorage from 'react-native-sync-storage';
import { RadioButton, Text } from 'react-native-paper';
import DocumentPicker, { types } from 'react-native-document-picker';
import { DatePickerInput } from 'react-native-paper-dates';

const Step1 = ({ navigation }) => {
  const user_detail = syncStorage.get('userDetail');
  const user_cnic = user_detail.cnic;
  const [errorValidate, setErrorValidate] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [relation, setRelation] = useState('Father_Name');
  const [gender, setGender] = useState('');
  const [cnic, setCnic] = useState(user_cnic);
  const [age, setAge] = useState('');
  const [marital, setMarital] = useState('');
  const [valueRelation, setValueRelation] = useState();
  const [dob, setDob] = useState('');
  const [regDate, setRegDate] = useState('');
  const [profileImage, setProfileImage] = useState('');

  const [uriImage, setURIImage] = useState('');
  const [imageName, setImageName] = useState('');
  const [imageType, setImageType] = useState('');

  const [cameraImage, setCameraImage]     = useState();
  const [image, setImage]             = useState('');

  useEffect(() =>{
  }, []);
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
    { label: '75-100', value: '75-100' },
    { label: '100-120', value: '100-120' },
  ];
  const profileimage = async () => {
    DocumentPicker.pick({
      allowMultiSelection: false,
      type: [DocumentPicker.types.images],
      // type: [DocumentPicker.types.images,DocumentPicker.types.pdf],
    })
      .then((response) => {
        console.log('response', JSON.stringify(response[0], null, 2))
        setProfileImage(response[0].uri)
        setURIImage(response[0].uri)
        setImageName(response[0].name)
        setImageType(response[0].type)
        setImage(response[0].name)
      })
  }

  const NextStep = () => {

     setErrorValidate(true)
     if(!uriImage){
      ToastAndroid.show('Please Upload your Profile Image', ToastAndroid.LONG);
      return;
    }else if(!firstName){
       ToastAndroid.show('Please enter your First Name', ToastAndroid.LONG);
       return;
     }else if(!lastName){
       ToastAndroid.show('Please enter your Last Name', ToastAndroid.LONG);
       return;
     }else if(!relation){
      ToastAndroid.show('Select your Relation', ToastAndroid.LONG);
      return;
    }else if(!valueRelation){
      ToastAndroid.show('Enter your Relative Name', ToastAndroid.LONG);
      return;
    }else if(!gender){
      ToastAndroid.show('Select your Gender', ToastAndroid.LONG);
      return;
    }else if(!cnic){
      ToastAndroid.show('Please enter your CNIC', ToastAndroid.LONG);
      return;
    }else if(!age){
      ToastAndroid.show('Select your Age Group', ToastAndroid.LONG);
      return;
    }else if(!dob){
      ToastAndroid.show('Select your Date of Birth', ToastAndroid.LONG);
      return;
    }else if(!regDate){
      ToastAndroid.show('Select your Date of Registration', ToastAndroid.LONG);
      return;
    }else if(!marital){
      ToastAndroid.show('Select your Marital Status', ToastAndroid.LONG);
      return;
    }else{
    console.log('profileImage', profileImage);
    console.log('firstName', firstName);
    console.log('lastName', lastName);
    console.log('relation', relation);
    console.log('valueRelation', valueRelation);
    console.log('gender', gender);
    console.log('cnic', cnic);
    console.log('age', age);
    console.log('dob', dob);
    console.log('regDate', regDate);
    console.log('marital', marital);

    syncStorage.set('ProfileImage', profileImage)
    syncStorage.set('FirstName', firstName)
    syncStorage.set('LastName', lastName)
    syncStorage.set('Relation', relation)
    syncStorage.set('Gender', gender)
    syncStorage.set('CNIC', cnic)
    syncStorage.set('Age', age)
    syncStorage.set('DOB', dob)
    syncStorage.set('RegDate', regDate)
    syncStorage.set('MaritalStatus', marital)
    syncStorage.set('valueRelation', valueRelation)
    syncStorage.set('profileURI', uriImage)
    syncStorage.set('profileType', imageType)
    syncStorage.set('profileName', imageName)

    syncStorage.set('cameraImg', cameraImage)

  
    navigation.navigate('Step2')
    }

  }

  return (
    <View>

      <ImageBackground source={pwdIMage} style={{ width: '100%', height: '100%', opacity: 0.9 }}>
        {/* <ScrollView> */}
        <View style={{ padding: 30, flex: 1, justifyContent: 'center' }}>
          <View style={{ width: '100%', backgroundColor: '#fff', height: 500, padding: 30, borderRadius: 30 }}>
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
                    <Text style={[styles.logoText, { textAlign: 'center', color: '#002D62', fontWeight: "bold", fontSize: 20 }]}>PWD Registerion Form</Text>
                  </View>
                  <Text style={{ marginTop: 10, fontWeight: "bold", color: "#000000" }}>Profile Image: (تصویر) 
                  <Text style={{color:'red'}}> *</Text>
                  </Text>
                  <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:80,width:'100%'}}>
                    <TouchableOpacity onPress={profileimage} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:10, height:150 }}>
                      {profileImage != '' ? <Image source={{uri:profileImage}} style={{width: '50%',alignSelf:'center', height: 140,}} /> :null}
                    </TouchableOpacity>
                  </View>
                  <Text style={{ marginTop: 85, fontWeight: "bold", color: "#000000" }}>First Name: (پہلا نام )<Text style={{color:'red'}}> *</Text></Text>
                  <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 3, height: 40 }}>
                    <TextInput
                      placeholderStyle={styles.placeholderStyle}
                      placeholderTextColor='grey'
                      selectedTextStyle={styles.selectedTextStyle}
                      placeholderColor="#c4c3cb"
                      placeholder='Enter Your First Name'
                      style={[styles.Step1FormTextInput
                        , { borderColor: !firstName && errorValidate ? 'red' : '#fff' }
                      ]}
                      onChangeText={(firstName) => setFirstName(firstName)}
                      value={firstName}
                    />
                  </View>
                  <Text style={{ marginTop: 15, fontWeight: "bold", color: "#000000" }}>Last Name: (آخری نام )<Text style={{color:'red'}}> *</Text></Text>
                  <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 3, height: 40 }}>
                    <TextInput
                      placeholderColor="#c4c3cb"
                      placeholderTextColor='grey'
                      selectedTextStyle={styles.selectedTextStyle}
                      placeholder='Enter Your Last Name'
                      style={[styles.Step1FormTextInput
                        , { borderColor: !lastName && errorValidate ? 'red' : '#fff' }
                      ]}
                      onChangeText={(lastName) => setLastName(lastName)}
                      value={lastName}
                    />
                  </View>
                  <Text style={{ marginTop: 15, fontWeight: "bold", color: "#000000" }}>Relationship: (رشتہ)<Text style={{color:'red'}}> *</Text></Text>
                  <RadioButton.Group onValueChange={(relation) => setRelation(relation)}
                    value={relation} style={{ marginTop: 10 }}>
                    <View style={{ flexDirection: 'row', marginTop: 5 }}>
                      <View style={{ flexDirection: "row" }}>
                        <RadioButton value="Father_Name" color={'#002D62'} />
                        <Text style={{ fontWeight: 'bold', marginTop: '5%' }}>Father Name</Text>
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <RadioButton value="Spouse_Name" color={'#002D62'}/>
                        <Text style={{ fontWeight: 'bold', marginTop: '7%' }}>Spouse</Text>
                      </View>
                    </View>
                  </RadioButton.Group>

                  <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 3, height: 40 }}>
                    <TextInput
                      placeholderTextColor='grey'
                      placeholderColor="#c4c3cb"
                      selectedTextStyle={styles.selectedTextStyle}
                      placeholder='Enter Name'
                      style={[styles.Step1FormTextInput
                        , { borderColor: !relation && errorValidate ? 'red' : '#fff' }
                      ]}
                      onChangeText={valueRelation => setValueRelation(valueRelation)} value={valueRelation}
                    />
                  </View>
                  <Text style={{ marginTop: 15, fontWeight: "bold", color: "#000000" }}>CNIC: (قومی شناختی کارڈ نمبر)<Text style={{color:'red'}}> *</Text></Text>
                  <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 40 }}>
                    <TextInput placeholderColor="#c4c3cb"
                      placeholderTextColor='grey'
                      selectedTextStyle={styles.selectedTextStyle}
                      placeholder='Enter Your CNIC'
                      keyboardType='numeric'
                      maxLength={13}
                      style={[styles.Step1FormTextInput
                        , { borderColor: !cnic && errorValidate ? 'red' : '#fff' }
                      ]}
                      onChangeText={(cnic) => setCnic(cnic)}
                      value={cnic}
                    />
                  </View>
                  <Text style={{ marginTop: 15, fontWeight: "bold", color: "#000000" }}>Gender: (جنس )<Text style={{color:'red'}}> *</Text></Text>
                  <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 40 }}>
                    <View style={styles.container}>

                      <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        itemTextStyle={styles.itemTextStyle}
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

                  <Text style={{ marginTop: 15, fontWeight: "bold", color: "#000000" }}>Age Group: (عمرکی حد)<Text style={{color:'red'}}> *</Text></Text>
                  <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 40 }}>
                    <View style={styles.container}>

                      <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        itemTextStyle={styles.itemTextStyle}
                        data={agegroup}
                        // search
                        labelField="label"
                        valueField="value"
                        placeholder={'Please Select any option'}
                        searchPlaceholder="Search..."
                        value={age}
                        onChange={item => {
                          setAge(item.value);
                        }}
                      />
                    </View>
                  </View>
                  <Text style={{ marginTop: 15, fontWeight: "bold", color: "#000000" }}>Date of Birth: (تاریخ پیدائش - شناختی کارڈ کے مطابق )<Text style={{color:'red'}}> *</Text></Text>
                  <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 40 }}>

                    <DatePickerInput
                      locale="en"
                      label=""
                      value={dob}
                      onChange={(dob) => setDob(dob)}
                      mode={'flat'}
                      style={{ height: 50, backgroundColor: '#D3D3D3',color:'#002D62' }}
                    />
                  </TouchableOpacity>
                  <Text style={{ marginTop: 20, fontWeight: "bold", color: "#000000" }}>Registration Date: (تاریخ اندراج )<Text style={{color:'red'}}> *</Text></Text>
                  <TouchableOpacity style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 40 }}>

                    <DatePickerInput
                      locale="en"
                      label=""
                      value={regDate}
                      onChange={(regDate) => setRegDate(regDate)}
                      mode={'flat'}
                      style={{ height: 50, backgroundColor: '#D3D3D3' }}
                    />
                  </TouchableOpacity>
                  <Text style={{ marginTop: 25, fontWeight: "bold", color: "#000000" }}>Marital Status:(ازدواجی حیثیت)<Text style={{color:'red'}}> *</Text></Text>
                  <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 40 }}>
                    {/* <TextInput  placeholderColor="#c4c3cb"
                 style={[styles.Step1FormTextInput
                  ,{borderColor: !marital && errorValidate ? 'red':'#fff'}
                ]}   
                 onChangeText={(marital) => setMarital(marital)}
                 value={marital} 
                /> */}
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
                        value={marital}

                        onChange={item => {
                          setMarital(item.value);
                        }}
                      />
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={NextStep}
                    style={styles.ButtonStyle}
                    activeOpacity={0.5}>

                    <Text style={[styles.text, { textAlign: 'center' }]}>Next</Text>

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
    margin: 0
  },
  ButtonStyle: {
    justifyContent: 'center',
    width: '30%',
    padding: 10,
    borderRadius: 14,
    elevation: 3,
    backgroundColor: '#002D62',
    marginTop: 10,
    marginLeft: '70%',
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontFamily: "sans-serif",

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
  }
});

export default Step1;