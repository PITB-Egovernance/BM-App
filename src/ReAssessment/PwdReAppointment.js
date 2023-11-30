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

import Loader from '../Components/Loader';
import { Alert, Keyboard, KeyboardAvoidingView, TextInput, TouchableWithoutFeedback, } from "react-native";
import pwdIMage from '../../assets/images/background.png';
import { DatePickerInput } from 'react-native-paper-dates';
import syncStorage from 'react-native-sync-storage';

const PwdReAppointment = ({ navigation }) => {

  const [Focus, setFocus]       = useState(false);
  const [value, setValue]       = useState(null);
  const [isFocus, setIsFocus]   = useState(false);
  const [loading, setLoading]   = useState(false);

  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [board, setBoard]       = useState([]);
  const [adate, setADate]       = useState([]);
  const [ADate_id, setADateId]  = useState('');

  const [fullname, setFullName]        = useState('');
  const [fathername, setFatherName]    = useState('');
  const [gender, setGender]            = useState('');
  const [cnic, setCnic]                = useState('');
  const [age, setAge]                  = useState('');
  const [dability, setDisability]      = useState('');
  const [typeoFID, setTypeofId]        = useState('');
  const [cause, setCause]              = useState('');
  const [mPhone, setPhone]             = useState('');
  const [RegDate, setRegdate]          = useState('');
  const [pwdInfoID, setPwdInfoId]      = useState('');

  const AppointmentDetail = syncStorage.get('appoint');
  const [province_id, setProvinceId] = useState(JSON.parse(AppointmentDetail[0].aprovince));
  const [district_id, setDistrictId] = useState(JSON.parse(AppointmentDetail[0].adistrict));
  const [board_id, setBoardId]       = useState(JSON.parse(AppointmentDetail[0].aboard));

  useEffect(() => {
    const pwdinfoDetail = syncStorage.get('pwdinfo');
    const pwdpinfo_id = pwdinfoDetail.id;
    const fullName = pwdinfoDetail.firstname + ' ' + pwdinfoDetail.lastname;
    if (pwdinfoDetail.relationship == 'Father_Name') {
      const fatherName = pwdinfoDetail.father_spouse_name;
      setFatherName(fatherName)
    }
    const cnic = pwdinfoDetail.cnic;
    const gender = pwdinfoDetail.gender;
    const age = pwdinfoDetail.agegroup;
    const disability = pwdinfoDetail.typeofd;
    const CauseDisability = pwdinfoDetail.causeofd;
    const phone = pwdinfoDetail.phone;
    const regdate = pwdinfoDetail.regdate;
    setPwdInfoId(pwdpinfo_id);
    setCnic(cnic);
    setGender(gender);
    setFullName(fullName);
    setAge(age);
    setPhone(phone);
    setRegdate(regdate);
    setTypeofId(disability);
    getTypeofdData(disability);
    getCauseofdData([disability, CauseDisability]);
    getProvince();
    getDistrict(province_id);
    getBoard(district_id);
    getAdate([board_id,disability]);
  }, []);
  const getProvince = () => {
    setLoading(true);
    fetch('https://dpmis.punjab.gov.pk/api/app/province', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    })
      .then(response => response.json())
      .then(response => {

        var count = Object.keys(response.provinces).length;
        if (count > 0) {
          let dropDownData = [];
          for (var i = 0; i < count; i++) {
            dropDownData.push({
              value: response.provinces[i].id,
              label: response.provinces[i].name,
            });
          }
          setProvince(dropDownData);
        }
      }).finally(() =>{
        setLoading(false);
      });
  }

  const getDistrict = (province_id) => {
    fetch(`https://dpmis.punjab.gov.pk/api/app/getdistrictsbyprovince/${province_id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
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

  const getBoard = (district_id) => {

    fetch(`https://dpmis.punjab.gov.pk/api/app/getboards/${district_id}`, {
      method: 'GET',
      headers: {},
    })
      .then(respBoard => respBoard.json())
      .then(responseBoard => {
        var count = Object.keys(responseBoard.boards).length;
        let boardData = [];
        for (var i = 0; i < count; i++) {
          boardData.push({ value: responseBoard.boards[i].id, label: responseBoard.boards[i].name });
        }
        setBoard(boardData);
      });
  }
  
  const getAdate = ([board_id,typeoFID]) =>{
    console.log('typeoFID',typeoFID, 'appoint_board', board_id);
    fetch(`https://dpmis.punjab.gov.pk/api/reassessment/get-ddates-by-aboard?mboard_id=${board_id}&typeofd=${typeoFID}`, {
      method: 'GET',
      headers:{
        'Accept': 'application/json',
          'secret':'pwdreg',
          'Content-Type':'application/json'
      },
    })
    .then(respAdate => respAdate.json())
    .then(responseAdate => {
      var count = Object.keys(responseAdate.ddates).length;
      let aDateData = [];
      for (var i = 0; i < count; i++) {
        if (responseAdate.ddates[i].limit != responseAdate.ddates[i].limitb) {
          aDateData.push({ value: responseAdate.ddates[i].id, label: responseAdate.ddates[i].start_datetime });
        }
      }
      setADate(aDateData);
      console.log('responseAdate.aDateData : ',aDateData);
    });
  }
  const getTypeofdData = (typeofdid) => {

    // console.log('TYpeofD', typeofdid)
    // console.log('Board id', BoardID)
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
  const getCauseofdData = ([typeofdid, casueofdid]) => {

    // console.log('TYpeofD', typeofdid)
    // console.log('Cause of d id', casueofdid)
    // console.log('Board id', BoardID)
    fetch(`https://dpmis.punjab.gov.pk/api/app/causeofd/${typeofdid}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
      .then(respCause => respCause.json())
      .then(respCauseName => {

        // console.log('Cause Name', respCauseName)
        const causeData = respCauseName.causeofd;
        causeData.map((item, i) => {
          if (item.id == casueofdid) {
            setCause(item.name)
          }
        });

      });
  }
  const handleAppointmentForm = () => {

    console.log('PWD ID', pwdInfoID)
    console.log('AdTAe', ADate_id)
    console.log('Province', province_id)
    console.log('District', district_id)
    console.log('Board', board_id)

    if (ADate_id == '') {

      ToastAndroid.show('No Dates For Appointment', ToastAndroid.LONG);
      return;
    } else {

      setLoading(true);
      fetch(`https://dpmis.punjab.gov.pk/api/reassessment/appointstore`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'secret': 'pwdreg',
        },
        body: JSON.stringify({
          pwdpinfos_id: `${pwdInfoID}`,
          adate: `${ADate_id}`,
          aprovince: `${province_id}`,
          adistrict: `${district_id}`,
          aboard: `${board_id}`
        })
      })
        .then(resp => resp.json()).then(response => {
          console.log('ReAssessment Response', response.reassess);
          const app_array = [response.appointment];
          response.appointment != ''
            ?
            syncStorage.set('appoint', app_array)
            : null

          response.reassess != ''
            ?
            syncStorage.set('requestDataReassesment', response.reassess)
            : null

          navigation.navigate('Tracking', {
            appointment: app_array,
            requestDataReassesment: syncStorage.get('requestDataReassesment'),
          })
        }).finally(() => setLoading(false))

    }
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
                  <Text style={{ paddingTop: -1, textAlign: 'center', color: '#002D62', fontWeight: "bold", fontSize: 19, marginBottom: 20 }}> PWD's Re-Appointment Booking</Text>
                </View>
                <View style={styles.tablecontainer}>
                  <View style={[styles.row, {backgroundColor: '#c0c0c0', borderTopLeftRadius: 5, borderTopRightRadius: 5}]}>
                    <View style={styles.cell}>
                      <Text style={styles.headerText}>Full Name:</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text style={styles.cellText}>{fullname}</Text>
                    </View>
                  </View>
                  <View style={[styles.row, {backgroundColor: '#D3D3D3'}]}>
                    <View style={styles.cell}>
                      <Text style={styles.headerText}>Father Name/ Spouse Name:</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text style={styles.cellText}>{fathername}</Text>
                    </View>
                  </View>
                  <View style={[styles.row, {backgroundColor: '#c0c0c0'}]}>
                    <View style={styles.cell}>
                      <Text style={styles.headerText}>Gender:</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text style={styles.cellText}>{gender}</Text>
                    </View>
                  </View>
                  <View style={[styles.row, {backgroundColor: '#D3D3D3'}]}>
                    <View style={styles.cell}>
                      <Text style={styles.headerText}>CNIC:</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text style={styles.cellText}>{cnic}</Text>
                    </View>
                  </View>
                  <View style={[styles.row, {backgroundColor: '#c0c0c0'}]}>
                    <View style={styles.cell}>
                      <Text style={styles.headerText}>Age Group:</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text style={styles.cellText}>{age}</Text>
                    </View>
                  </View>
                  <View style={[styles.row, {backgroundColor: '#D3D3D3'}]}>
                    <View style={styles.cell}>
                      <Text style={styles.headerText}>Phone Number:</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text style={styles.cellText}>{mPhone}</Text>
                    </View>
                  </View>
                  <View style={[styles.row, {backgroundColor: '#c0c0c0'}]}>
                    <View style={styles.cell}>
                      <Text style={styles.headerText}>Type of Disability:</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text style={styles.cellText}>{dability}</Text>
                    </View>
                  </View>
                  <View style={[styles.row, {backgroundColor: '#D3D3D3', borderBottomLeftRadius: 5, borderBottomRightRadius: 5}]}>
                    <View style={styles.cell}>
                      <Text style={styles.headerText}>Cause of Disability:</Text>
                    </View>
                    <View style={styles.cell}>
                      <Text style={styles.cellText}>{cause}</Text>
                    </View>
                  </View>
                </View>

                <Text style={{ marginTop: 15, fontWeight: "bold", color: "#000000" }}>Province:<Text style={{ color: 'red' }}> *</Text></Text>
                <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 40 }}>
                  <View style={styles.container}>
                    <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: 'black', backgroundColor: '#D3D3D3', }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      itemTextStyle={styles.itemTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      data={province}
                      search
                      labelField="label"
                      valueField="value"
                      placeholder={`Select Province`}
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

                <Text style={{ marginTop: 15, fontWeight: "bold", color: "#000000" }}>District:<Text style={{ color: 'red' }}> *</Text></Text>
                <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 40 }}>
                  <View style={styles.container}>

                    <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: 'black', backgroundColor: '#D3D3D3', }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      itemTextStyle={styles.itemTextStyle}
                      data={district}
                      labelField="label"
                      valueField="value"
                      placeholder={'Select District'}
                      searchPlaceholder="Search..."
                      search
                      value={district_id}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setDistrictId(item.value);
                        getBoard(item.value)
                        
                        setFocus(false);
                      }}
                    />
                  </View>
                </View>
                <Text style={{ marginTop: 15, fontWeight: "bold", color: "#000000" }}>Medical Board:<Text style={{ color: 'red' }}> *</Text></Text>
                <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 40 }}>
                  <View style={styles.container}>
                    <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: 'black', backgroundColor: '#D3D3D3', }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      itemTextStyle={styles.itemTextStyle}
                      data={board}
                      search
                      labelField="label"
                      valueField="value"
                      placeholder={'Select Board'}
                      searchPlaceholder="Search..."
                      value={board_id}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setBoardId(item.value);
                        getAdate([item.value,typeoFID]);
                        setFocus(false);
                      }}
                    />
                  </View>

                </View>
                <Text style={[styles.Text]}>Appointment in:<Text style={{ color: 'red' }}> *</Text></Text>
                <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 40 }}>
                  <View style={styles.container}>

                    <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: 'black', backgroundColor: '#D3D3D3', }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      itemTextStyle={styles.itemTextStyle}
                      data={adate}
                      labelField="label"
                      valueField="value"
                      placeholder={'Select Appointment date'}
                      searchPlaceholder="Search..."
                      value={ADate_id}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setADateId(item.value);
                        setFocus(false);
                      }}
                    />
                  </View>
                </View>

                <TouchableOpacity
                  onPress={handleAppointmentForm}
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
  infoContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    marginRight: 8,
  },
  value: {
    flex: 1,
  },
  ButtonStyle: {
    justifyContent: 'center',
    width: '30%',
    padding: 10,
    borderRadius: 14,
    backgroundColor: '#002D62',
    marginTop: 20,
    marginLeft: '70%',

  },
  placeholderStyle: {
    color: '#c0c0c0',
    fontSize: 14,
    margin: 2
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
  selectedTextStyle: {
    fontSize: 16,
    color: 'black'
  },
  itemTextStyle: {
    color: 'black'
  },
  inputSearchStyle: {
    color: 'black'
  },
  tablecontainer: {
    borderWidth: 0.5,
    borderColor: 'black',
    marginBottom: 16,
    borderRadius: 5
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    borderWidth: 0,
    borderColor: 'black',
    padding: 8,
  },
  headerText: {
    fontWeight: 'bold',
    color: 'black',
  },
  cellText: {
    color: 'black',
    textAlign: 'center',
  },
});
export default PwdReAppointment;