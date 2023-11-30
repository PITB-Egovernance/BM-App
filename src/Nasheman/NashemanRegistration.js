import { Dropdown } from 'react-native-element-dropdown';
import React, { useEffect, useState } from 'react';
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
import { DataTable } from 'react-native-paper';
import Loader from '../Components/Loader';
import { Alert, Keyboard, KeyboardAvoidingView, TextInput, TouchableWithoutFeedback, } from "react-native";
import pwdIMage from '../../assets/images/background.png';
import { DatePickerInput } from 'react-native-paper-dates';
import syncStorage from 'react-native-sync-storage';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';
import { Checkbox, RadioButton } from 'react-native-paper';

const NashemanRegistration = ({ navigation }) => {

  const [errorValidate, setErrorValidate] =  useState(false);
  const [Focus, setFocus] = useState(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [district, setDistrict] = useState('');
  const [district_id, setDistrictId] = useState('');

  const [degreenames, setDegreenames] = useState([]);
  const [degreenames_id, setDegreenames_id] = useState('');

  const [centers, setCenters] = useState([]);
  const [center_id, setCenter_id] = useState('');

  const [courses, setCourses] = useState([]);
  const [course_id, setCourse_id] = useState('');

  const [durations, setDurations] = useState([]);
  const [duration_id, setDuration_id] = useState('');

  const [residence, setResidence] = useState(false);
  const [residence_id, setResidenceID] = useState('');

  const [fullname, setFullName] = useState('');
  const [fathername, setFatherName] = useState('');

  const [gender, setGender] = useState('');
  const [cnic, setCnic] = useState('');
  const [dob, setDOB] = useState('');
  const [martial, setMartial] = useState('');
  const [dability, setDisability] = useState('');
  const [typeoFID, setTypeofId] = useState('');
  const [mPhone, setPhone] = useState('');
  const [RegDate, setRegdate] = useState('');
  const [pwdInfoID, setPwdInfoId] = useState('');
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const pwdinfoDetail = syncStorage.get('pwdinfo');
    const pwdpinfo_id = pwdinfoDetail.id;
    const fullName = pwdinfoDetail.firstname + ' ' + pwdinfoDetail.lastname;
    if (pwdinfoDetail.relationship == 'Father_Name') {
      const fatherName = pwdinfoDetail.father_spouse_name;
      setFatherName(fatherName)
    }
    const cnic = pwdinfoDetail.cnic;
    const dob = pwdinfoDetail.dob;
    const gender = pwdinfoDetail.gender;
    const martial = pwdinfoDetail.maritalstatus;
    const disability = pwdinfoDetail.typeofd;
    const phone = pwdinfoDetail.phone;
    const districtuser = pwdinfoDetail.district;

    setDistrictId(districtuser);
    setDOB(dob);
    setPwdInfoId(pwdpinfo_id);
    setCnic(cnic);
    setGender(gender);
    setFullName(fullName);
    setMartial(martial);
    setPhone(phone)
    getTypeofdData(disability);
    getDistrict(district_id);
    getDegreename();
    getAllCenter();
  }, []);
  const getDistrict = (district_id) => {
    // setLoading(true)
    fetch(`https://dpmis.punjab.gov.pk/api/app/district`, {
      method: 'GET',
      headers: {},
    })
      .then(respDistrict => respDistrict.json())
      .then(responseDistrict => {
        const distData = responseDistrict.districts;
        console.log('distData', distData);
        distData.map((item, i) => {
          if (item.id == district_id) {
            setDistrict(item.name)
            // setLoading(false)
          }
        });
      });
  }
  const getTypeofdData = (typeofdid) => {
    fetch(`https://dpmis.punjab.gov.pk/api/app/typeofd`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(respdistrict => respdistrict.json())
      .then(respDistrictName => {
        const districtReponse = respDistrictName.typeofd;
        districtReponse.map((item, i) => {
          if (item.id == typeofdid) {
            setDisability(item.name)
          }
        });
      });
  }
  const getDegreename = () => {
    fetch('https://dpmis.punjab.gov.pk/api/pwdapp/degreename', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'secret': 'pwdreg',
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(response => {
        const responseDegree = response['PWD degree']
        var count = Object.keys(responseDegree).length;
        if (count > 0) {
          let dropDownData = [];
          for (var i = 0; i < count; i++) {
            dropDownData.push({ value: responseDegree[i].id, label: responseDegree[i].name });
          }
          setDegreenames(dropDownData);
        }
      });
  }
  const getAllCenter = () => {
    fetch('https://dpmis.punjab.gov.pk/api/nasheman/getallcenter', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'secret': 'pwdreg',
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(response => {
        const responseCenter = response['center']
        var count = Object.keys(responseCenter).length;
        if (count > 0) {
          let dropDownData = [];
          for (var i = 0; i < count; i++) {
            dropDownData.push({ value: responseCenter[i].id, label: responseCenter[i].name });
          }
          setCenters(dropDownData);
        }
      });
  }
  const getAllCourses = ([qualification_id, center_id]) => {
    console.log('q:', qualification_id, 'c:', center_id);
    fetch(`https://dpmis.punjab.gov.pk/api/nasheman/getcoursebycenter/${qualification_id}/${center_id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'secret': 'pwdreg',
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(response => {
        const responseCourses = response['courses'];
        var count = Object.keys(responseCourses).length;
        if (count > 0) {
          let dropDownData = [];
          for (var i = 0; i < count; i++) {
            dropDownData.push({ value: responseCourses[i].id, label: responseCourses[i].name });
          }
          setCourses(dropDownData);
        }
      });
  }
  const getCourseDuration = ([course_id]) => {
    console.log('c:', course_id);
    fetch(`https://dpmis.punjab.gov.pk/api/nasheman/getcoursedurationbycourse/${course_id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'secret': 'pwdreg',
        'Content-Type': 'application/json'
      },
    })
      .then(response => response.json())
      .then(response => {
        const responsedurations = response['duration'];
        var count = Object.keys(responsedurations).length;
        if (count > 0) {
          let dropDownData = [];
          for (var i = 0; i < count; i++) {
            dropDownData.push({ value: responsedurations[i].id, label: responsedurations[i].name });
          }
          setDurations(dropDownData);
        }
      });
  }
  const data = [
    { title: 'Trainee:', data: fullname },
    { title: 'CNIC:', data: cnic },
    { title: 'D.O.B:', data: dob },
    { title: 'Trainee Contact:', data: mPhone },
    { title: 'Gender:', data: gender },
    { title: 'Martial Status:', data: martial },
    { title: 'Disability: ', data: dability },
    // { title: 'District:', data: district },
  ];
  const handleNashemanForm = () => {
    console.log('degree', degreenames_id);
    console.log('center', center_id);
    console.log('course', course_id);
    console.log('duration', duration_id);
    console.log('residence', residence);
    if (residence == true){
      setResidenceID('Yes');
    }
    setErrorValidate(true);
      if (!degreenames_id) {
        ToastAndroid.show('Select Your Updated Qualification...!', ToastAndroid.LONG);
        return;
      }
      else if (!center_id) {
        ToastAndroid.show('Select Course Center First...!', ToastAndroid.LONG);
        return;
      }
      else if (!course_id) {
        ToastAndroid.show('Select Your Course First...!', ToastAndroid.LONG);
        return;
      }
      else if (!duration_id) {
        ToastAndroid.show('Select Course Duration ...!', ToastAndroid.LONG);
        return;
      }
      else{
        storeNasheman();
      }
  }
  const storeNasheman = () => {
    const pwdinfoID              = syncStorage.get('pwdinfo_id');
      const formData = new FormData();
      formData.append('pwdinfoID', JSON.stringify(pwdinfoID));
      formData.append('adistrict', district_id);
      formData.append('center',JSON.stringify(center_id));
      formData.append('qualification',JSON.stringify(degreenames_id));
      formData.append('courses',JSON.stringify(course_id));
      formData.append('duration',JSON.stringify(duration_id));
      if (residence_id == 'Yes') {
        formData.append('residence',residence_id);
      } else {
      }
      console.log('formData is : ', formData);
    setLoading(true)
    fetch(
      `https://dpmis.punjab.gov.pk/api/nasheman/store`,
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
        console.log('response Nasheman PWD', response);
        if(response.status == 200){
          // const nashemanPwd = [response['nasheman']];
          // nashemanPwd !='' 
          // ?
          // syncStorage.set('nashemanPwd', nashemanPwd)
          // :null
          // console.log(' nashemanPwd ', [syncStorage.get('nashemanPwd')]);

          // navigation.navigate('Nasheman',{
          //   nashemanPwd: [syncStorage.get('nashemanPwd')],
          // });
          getPwdNasheman([pwdinfoID]);
        }
    }
    ).finally(() =>{
      setLoading(false);
    });
}
const getPwdNasheman = ([pwdinfoID]) => {
  fetch(`https://dpmis.punjab.gov.pk/api/nasheman/list/${pwdinfoID}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'secret': 'pwdreg',
      'Content-Type': 'application/json'
    },
  })
    .then(response => response.json())
    .then(response => {
      if(response['status'] == 200)
      {
        const nashemanPwd = response['nashemanlist'];
          nashemanPwd !='' 
          ?
          syncStorage.set('nashemanPwd', nashemanPwd)
          :null
          // console.log(' nashemanPwd ', [syncStorage.get('nashemanPwd')]);

          navigation.navigate('Nasheman',{
            nashemanPwd: syncStorage.get('nashemanPwd'),
        });
      }
    });
}
  return (
    <View>
      <ImageBackground source={pwdIMage} style={{ width: '100%', height: '100%', opacity: 0.9 }}>
        <View style={{ padding: 30, flex: 1, justifyContent: 'center' }}>
          <Loader loading={loading} />
          <View style={{ width: '100%', backgroundColor: '#fff', height: 500, padding: 30, borderRadius: 30 }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}>
              <View>
                <View>
                  <Text style={{ paddingTop: -1, textAlign: 'center', color: '#002D62', fontWeight: "bold", fontSize: 19, marginBottom: 10 }}>
                    NASHEMAN TRAINEE FORM
                  </Text>
                </View>
                <DataTable style={styles.table}>
                  {data.map((row, index) => (
                    <DataTable.Row key={index}>
                      <DataTable.Cell style={styles.titleCell}>
                        <Text style={styles.titleText}>{row.title}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell style={styles.dataCell}>
                        <Text style={styles.dataText}>{row.data}</Text>
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))}
                </DataTable>


                <Text style={[styles.Text]}>Updated Qualification: <Text style={{ color: 'red' }}>*</Text></Text>
                <View style={styles.container}>
                  <Dropdown
                    style={[styles.dropdown2, isFocus && { borderColor: 'black', backgroundColor: '#D3D3D3', }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    itemTextStyle={styles.itemTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={degreenames}
                    search
                    labelField="label"
                    valueField="value"
                    placeholder={'Select Your Degree'}
                    searchPlaceholder="Search..."
                    value={degreenames_id}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setDegreenames_id(item.value);
                      setFocus(false);
                    }}
                  />
                </View>
                <Text style={[styles.Text]}>Select Course Center: <Text style={{ color: 'red' }}>*</Text></Text>
                <View style={styles.container}>
                  <Dropdown
                    style={[styles.dropdown2, isFocus && { borderColor: 'black', backgroundColor: '#D3D3D3', }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    itemTextStyle={styles.itemTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={centers}
                    search
                    labelField="label"
                    valueField="value"
                    placeholder={'Select Center'}
                    searchPlaceholder="Search..."
                    value={center_id}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setCenter_id(item.value);
                      getAllCourses([degreenames_id, item.value]);
                      setDuration_id();
                      setFocus(false);
                    }}
                  />
                </View>
                <Text style={[styles.Text]}>Select Course: <Text style={{ color: 'red' }}>*</Text></Text>
                <View style={styles.container}>
                  <Dropdown
                    style={[styles.dropdown2, isFocus && { borderColor: 'black', backgroundColor: '#D3D3D3', }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    itemTextStyle={styles.itemTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={courses}
                    search
                    labelField="label"
                    valueField="value"
                    placeholder={'Select Course'}
                    searchPlaceholder="Search..."
                    value={course_id}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setCourse_id(item.value);
                      getCourseDuration([item.value]);
                      setFocus(false);
                    }}
                  />
                </View>
                <Text style={[styles.Text]}>Select Course Duration: <Text style={{ color: 'red' }}>*</Text></Text>
                <View style={styles.container}>
                  <Dropdown
                    style={[styles.dropdown2, isFocus && { borderColor: 'black', backgroundColor: '#D3D3D3', }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    itemTextStyle={styles.itemTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={durations}
                    search
                    labelField="label"
                    valueField="value"
                    placeholder={'Select Course Duration'}
                    searchPlaceholder="Search..."
                    value={duration_id}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setDuration_id(item.value);
                      setFocus(false);
                    }}
                  />
                </View>
                <View>
                  {
                    (district_id == '1') ?
                      <View></View>
                      :
                      <View>
                        <Text style={[styles.Text]}>Residence: <Text style={{ color: 'red' }}>*</Text></Text>
                        <View style={{}}>
                          <View style={{ flexDirection: 'row', }}>
                            <View style={{ flexDirection: 'row' }}>
                              <Checkbox.Android
                                status={residence ? 'checked' : 'unchecked'}
                                color={'#002D62'}
                                onPress={() => setResidence(!residence)}
                              />
                              <Text style={{ fontWeight: 'bold', marginTop: '12%' }}>Yes</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                  }
                </View>


                <TouchableOpacity
                  onPress={handleNashemanForm}
                  style={styles.ButtonStyle}
                  activeOpacity={0.5}>
                  <Text style={[styles.text, { textAlign: 'center' }]}>Submit</Text>
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

  ButtonStyle: {
    justifyContent: 'center',
    width: '30%',
    padding: 10,
    borderRadius: 14,
    backgroundColor: '#002D62',
    marginTop: 20,
    marginLeft: '70%',

  },
  text: {
    color: 'white',
    fontSize: 15,
    fontFamily: "sans-serif",

  },
  Field: {
    marginTop: 10,
    backgroundColor: '#D3D3D3',
    borderRadius: 3,
    height: 40,
    // width:'50%'
  },
  Text: {
    marginTop: 15,
    fontWeight: "bold",
    color: "#000000"
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
  input: {
    color: 'black',
  },
  dropdown2: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    backgroundColor: '#D3D3D3',
    marginTop: 10
  },
  table: {
    marginVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray',
  },
  titleCell: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 0,
    paddingTop: 10
  },
  titleText: {
    fontWeight: 'bold',
  },
  dataCell: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 0,
    paddingTop: 10
  },
  dataText: {},
});
export default NashemanRegistration;