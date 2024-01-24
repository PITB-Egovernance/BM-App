/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useEffect, useCallback, useState } from 'react';
import {
  StyleSheet,
  Alert,
  onPress,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  ScrollView,
  Modal,
} from 'react-native';
import { Image } from "react-native";
import pwdIMage from '../../assets/images/background.png'
import regIMage from '../../assets/images/PWDREG-01.png';
import regIMage1 from '../../assets/images/PWDREG-02.png';
import regIMage2 from '../../assets/images/PWDREG-05.png';
import regIMage3 from '../../assets/images/PWDREG-03.png';
import regIMage4 from '../../assets/images/PWDREG-04.png';
import regIMage5 from '../../assets/images/PWDREG-06.png';
import regIMage6 from '../../assets/images/PWDREG-07.png';
import regIMage7 from '../../assets/images/PWDREG-08.png';
import regIMage8 from '../../assets/images/PWDREG-09.png';
import notdisabled from '../../assets/images/NotDisabled.png';
import message from '../../assets/images/message.png';
import certificate from '../../assets/images/certificate.png';
import Tts from 'react-native-tts';
import syncStorage from 'react-native-sync-storage';
import Footer from '../Components/Footer';
import baseUrl from '../Components/Url';

const Tracking = ({ route, navigation }) => {

  const [modalVisible, setModalVisible] = useState(false);
  const [regDep, setRegDep] = useState('');
  const [swdOfficial, setSwdOfficial] = useState('');
  const [techOfficial, setTechnicalOfficial] = useState('');
  const [vocationalVerified, setVocationalVerified] = useState('');
  const [cmdHqVerified, setCmhqVerified] = useState('');
  const [Regn, setRegn] = useState('');
  const [Regnum, setRegNum] = useState('');
  const [Disability, setDisability] = useState('');

  // Reassessment Modules
  const [ddarequest, setddaRequest] = useState('');
  const [resappoint, setResAppoint] = useState('');
  const [resMedicalBoardFilled, setResMedicalBoardFilled] = useState('')

  const pwdInfoID = route.params.pwdInfoID == undefined && syncStorage.get('pwdinfo_id') == undefined ? syncStorage.get('pwdinfo_id') :
    route.params.pwdInfoID == undefined && syncStorage.get('pwdinfo_id') != undefined ? syncStorage.get('pwdinfo_id') :
      syncStorage.get('pwdinfo_id');

  const pwdApppointmentID =
    // no no = get
    syncStorage.get('appoint') == null && route.params.appointment == null ? syncStorage.get('appoint') :
      //  yes no = get
      syncStorage.get('appoint') != null && route.params.appointment == null ? syncStorage.get('appoint') :
        // no yes = route
        syncStorage.get('appoint') == null && route.params.appointment != null ? route.params.appointment :
          // yes yes = get
          syncStorage.get('appoint');

  // Reassessment Request all data
  const requestDataReassesmentID =
    // getYes routeNo = Get
    (syncStorage.get('requestDataReassesmentID') != '' || syncStorage.get('requestDataReassesmentID') != null) && route.params.requestDataReassesmentID == null ? syncStorage.get('requestDataReassesmentID') :
      // getNo routeYes = route
      (syncStorage.get('requestDataReassesmentID') == '' || syncStorage.get('requestDataReassesmentID') == null) && route.params.requestDataReassesmentID != null ? route.params.requestDataReassesmentID :
        // GetNo RouteNo = Get
        (syncStorage.get('requestDataReassesmentID') == '' || syncStorage.get('requestDataReassesmentID') == null) && route.params.requestDataReassesmentID == null ? syncStorage.get('requestDataReassesmentID') :
          // GetYes routeYes = Get
          syncStorage.get('requestDataReassesmentID');
  const requestDataReassesment =
    // getYes routeNo = Get
    (syncStorage.get('requestDataReassesment') != '' || syncStorage.get('requestDataReassesment') != null) && route.params.requestDataReassesment == null ? syncStorage.get('requestDataReassesment') :
      // getNo routeYes = route
      (syncStorage.get('requestDataReassesment') == '' || syncStorage.get('requestDataReassesment') == null) && route.params.requestDataReassesment != null ? route.params.requestDataReassesment :
        // GetNo RouteNo = Get
        (syncStorage.get('requestDataReassesment') == '' || syncStorage.get('requestDataReassesment') == null) && route.params.requestDataReassesment == null ? syncStorage.get('requestDataReassesment') :
          // GetYes routeYes = Get
          syncStorage.get('requestDataReassesment');



  const [modalVisibleSecond, setModalVisibleSecond] = useState(false);

  useEffect(() => {

   
    if (requestDataReassesment == '' || requestDataReassesment == undefined || requestDataReassesment == 'undefined' || requestDataReassesment == null) {
      setddaRequest('');
      setResAppoint('');
      setResMedicalBoardFilled('');
    } else {
      setddaRequest(requestDataReassesment[0]['ddarequest']);
      setResAppoint(requestDataReassesment[0]['appoint']);
      setResMedicalBoardFilled(requestDataReassesment[0]['mdfillform']);
    }
    checkAssesmentDetail();
    appointmentsms();
  })

  const checkAssesmentDetail = () => {

    console.log('Base url dpmis', baseUrl[1])
    fetch(`${baseUrl[1]}/pwdapp/apiassessment/${pwdInfoID}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'secret': 'pwdreg',
      },
    })
      .then(respAssess => respAssess.json())
      .then(respAssesment => {

        // console.log('Assessment Detail', respAssesment['PWD assessment'])
        if (respAssesment['PWD assessment'] != '') {
          const regdep = respAssesment['PWD assessment'][0].regdep;
          const swofficerverified = respAssesment['PWD assessment'][0].swofficerverified;
          const technicalmverified = respAssesment['PWD assessment'][0].technicalmverified;
          const vocationalmverified = respAssesment['PWD assessment'][0].vocationalmverified;
          const cmdhqverified = respAssesment['PWD assessment'][0].cmdhqverified;
          const regn = respAssesment['PWD assessment'][0].regn;
          const regnum = respAssesment['PWD assessment'][0].regnum;
          const disability = respAssesment['PWD assessment'][0].regdep;

          // console.log(regdep, swofficerverified,technicalmverified, vocationalmverified,cmdhqverified, regn)
          // console.log('regn ', regn);
          setRegDep(regdep);
          setSwdOfficial(swofficerverified);
          setTechnicalOfficial(technicalmverified);
          setVocationalVerified(vocationalmverified);
          setCmhqVerified(cmdhqverified);
          setRegn(regn);
          setRegNum(regnum);
          setDisability(disability);
        }
      })
  }
  // Form Modules
  const formWithNavigationDefault = () => {
    return (
      <View style={{ backgroundColor: '#003060', height: 55, paddingVertical: 5, width: '82%', borderRadius: 10, marginTop: 10, justifyContent: 'center', marginLeft: 25 }}>

        <TouchableOpacity onPress={() => navigation.navigate('Step1')}>
          <Image source={regIMage} style={{ width: '20%', height: 40, marginLeft: '5%', resizeMode: 'contain' }} />
          <View style={{ marginTop: '-12%' }}>
            <Text style={[styles.buttonText, { color: '#fff', fontSize: 16, fontFamily: 'sans-serif', marginLeft: 20, textAlign: 'center' }]}>
              Form Submission
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  const formSubmittedGreen = () => {
    return (
      <View style={[styles.Greentile, {}]}>
        <TouchableOpacity style={{ marginTop: 20 }}>
          <Image source={regIMage} style={{ width: '20%', height: 40, marginLeft: '5%', resizeMode: 'contain' }} />
          <View style={{ marginTop: '-12%' }}>
            <Text style={[styles.buttonText, { color: '#fff', fontSize: 16, fontFamily: 'sans-serif', marginLeft: 20, textAlign: 'center' }]}>Form Submitted</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('DraftCertificate')}>
          <View style={{ marginTop: '-12%', marginLeft: '4%' }}>
            <Image source={certificate} style={styles.smsimage} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  // Appointment Module
  const appointmentsms = () => {

    Tts.setDefaultLanguage('en-US');
    Tts.setDefaultRate(0.5);
    Tts.setDefaultPitch(1);
    checkAssesmentDetail();
    checkAssesmentDetail();
    handleTrackingSpeech = () => {
      Tts.speak(`میڈیکل معائنے کے لیے آپ کی اپوائنٹمنٹ بُک ہو چکی ہے۔ آپ ${pwdApppointmentID[0].ddate.substring(0, 10)} کو قبل ازدوپہر ${pwdApppointmentID[0].ddate.substring(10, 16)} اپنے متعلقہ ہسپتال میں تشریف لائیں`);
    }
    handleStopTrackingSpeech = () => {
      Tts.stop();
    }
    handleTrackingSpeechSecond = () => {
      Tts.speak(`آپ کا سرٹیفیکیٹ آن لائن جاری کیا جا چکا ہے، آپ اپنا سر ٹیفیکیٹ دئیے گئےآن لائن لنک پر جا کر دیکھ سکتے ہیں۔`);
    }
    handleStopTrackingSpeechSecond = () => {
      Tts.stop();
    }
  }

  const AppointmentDefaultBlue = () => {
    return (
      <View style={[styles.BlueTile, {}]}>
        <TouchableOpacity style={styles.button}>
          <Image source={regIMage1} style={{ width: '20%', height: 40, marginLeft: '5%', resizeMode: 'contain' }} />
          <View style={{ marginLeft: '20%', marginTop: '-12%' }}>
            <Text style={[styles.buttonText, { color: '#fff', fontSize: 16, fontFamily: 'sans-serif', textAlign: 'center', }]}>
              Appointment Booking
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  const AppointmentBookedWithMessageGreen = () => {
    return (
      <View style={[styles.Greentile, {}]}>
        <TouchableOpacity style={{ marginTop: 20 }}>
          <Image source={regIMage1} style={{ width: '20%', height: 44, marginLeft: '5%', resizeMode: 'contain' }} />
          <View style={{ marginLeft: '20%', marginTop: '-12%' }}>
            <Text style={[styles.buttonText, { color: '#fff', fontSize: 16, fontFamily: 'sans-serif', resizeMode: 'contain', textAlign: 'center' }]}>
              Appointment Booked
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={{ marginTop: -45 }}>
            <Image source={message} style={styles.smsimage} />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Modal
                animationType="fade"
                transparent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 }}>
                  <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 20 }}>
                    <TouchableOpacity
                      onPress={() => setModalVisible(false)}>
                    </TouchableOpacity>
                    <Text style={{ color: 'black', textAlign: "center", fontSize: 15, marginTop: 10 }}>میڈیکل معائنے کے لیے آپ کی اپوائنٹمنٹ بُک ہو چکی ہے۔ آپ  {pwdApppointmentID[0].ddate.substring(0, 10)} کو قبل ازدوپہر {pwdApppointmentID[0].ddate.substring(10, 16)} بجے اپنے متعلقہ ہسپتال میں تشریف لائیں</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity
                        onPress={this.handleTrackingSpeech}
                        style={styles.SpeakButton}
                        activeOpacity={0.5}>
                        <Text style={[styles.text, { textAlign: 'center', color: '#fff' }]}>Speak 🔊</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={this.handleStopTrackingSpeech}
                        style={styles.SpeakButton}
                        activeOpacity={0.5}>
                        <Text style={[styles.text, { textAlign: 'center', color: '#fff' }]}>Stop  🔇</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        style={styles.SpeakButton}
                        activeOpacity={0.5}
                        onPress={() => setModalVisible(false)}
                      >
                        <Text style={[styles.text, { textAlign: 'center', color: '#fff', fontSize: 16, fontFamily: 'sans-serif' }]}>Skip</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  const AppointmentDefaultWithNavigationBlue = () => {
    return (
      <View style={[styles.BlueTile, {}]}>
        <TouchableOpacity onPress={() => navigation.navigate('PwdAppointment')} style={styles.button}>
          <Image source={regIMage1} style={{ width: '20%', height: 40, marginLeft: '5%', resizeMode: 'contain' }} />
          <View style={{ marginLeft: '20%', marginTop: '-12%' }}>
            <Text style={[styles.buttonText, { color: '#fff', fontSize: 16, fontFamily: 'sans-serif', textAlign: 'center', }]}>
              Appointment Booking
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  //  --- Reassessment Appointment
  const ReAppointmentBookingNavigateView = () => {
    return (
      <View style={[styles.BlueTile, {}]}>
        <TouchableOpacity onPress={() => navigation.navigate('PwdReAppointment')} style={styles.button}>
          <Image source={regIMage1} style={{ width: '20%', height: 40, marginLeft: '5%', resizeMode: 'contain' }} />
          <View style={{ marginLeft: '20%', marginTop: '-12%' }}>
            <Text style={[styles.buttonText, { color: '#fff', fontSize: 16, fontFamily: 'sans-serif', textAlign: 'center', }]}>
              Re-Appointment Booking
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };
  const ReAppointmentDefaultBlue = () => {
    return (
      <View style={[styles.BlueTile, {}]}>
        <TouchableOpacity style={styles.button}>
          <Image source={regIMage1} style={{ width: '20%', height: 40, marginLeft: '5%', resizeMode: 'contain' }} />
          <View style={{ marginLeft: '20%', marginTop: '-12%' }}>
            <Text style={[styles.buttonText, { color: '#fff', fontSize: 16, fontFamily: 'sans-serif', textAlign: 'center', }]}>
              Re-Appointment Booking
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  const ReAppointmentBookedWithMessageGreen = () => {
    return (
      <View style={[styles.Greentile, {}]}>
        <TouchableOpacity style={{ marginTop: 20 }}>
          <Image source={regIMage1} style={{ width: '20%', height: 44, marginLeft: '5%', resizeMode: 'contain' }} />
          <View style={{ marginLeft: '20%', marginTop: '-12%' }}>
            <Text style={[styles.buttonText, { color: '#fff', fontSize: 16, fontFamily: 'sans-serif', resizeMode: 'contain', textAlign: 'center' }]}>
              Re-Appointment Booked
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={{ marginTop: -45 }}>
            <Image source={message} style={styles.smsimage} />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Modal
                animationType="fade"
                transparent
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 }}>
                  <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 20 }}>
                    <TouchableOpacity
                      onPress={() => setModalVisible(false)}>
                    </TouchableOpacity>
                    <Text style={{ color: 'black', textAlign: "center", fontSize: 15, marginTop: 10 }}>میڈیکل معائنے کے لیے آپ کی اپوائنٹمنٹ بُک ہو چکی ہے۔ آپ  {pwdApppointmentID[0].ddate.substring(0, 10)} کو قبل ازدوپہر {pwdApppointmentID[0].ddate.substring(10, 16)} بجے اپنے متعلقہ ہسپتال میں تشریف لائیں</Text>
                    <View style={{ flexDirection: 'row' }}>
                      <TouchableOpacity
                        onPress={this.handleTrackingSpeech}
                        style={styles.SpeakButton}
                        activeOpacity={0.5}>
                        <Text style={[styles.text, { textAlign: 'center', color: '#fff' }]}>Speak 🔊</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={this.handleStopTrackingSpeech}
                        style={styles.SpeakButton}
                        activeOpacity={0.5}>
                        <Text style={[styles.text, { textAlign: 'center', color: '#fff' }]}>Stop  🔇</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        style={styles.SpeakButton}
                        activeOpacity={0.5}
                        onPress={() => setModalVisible(false)}
                      >
                        <Text style={[styles.text, { textAlign: 'center', color: '#fff', fontSize: 16, fontFamily: 'sans-serif' }]}>Skip</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  // Appointment Module End

  // Medical Assessment
  const MedicalAssessmentGreen = () => {
    return (
      <View style={[styles.Greentile, {}]}>
        <TouchableOpacity style={styles.button}>
          <Image source={regIMage2} style={{ width: '30%', height: 40, }} />
          <View style={{ marginLeft: '20%', marginTop: '-12%' }}>
            <Text style={[styles.buttonText, { color: '#fff', fontSize: 16, fontFamily: 'sans-serif', textAlign: 'center' }]}>
              Medical Assessment
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  const MedicalAssessmentDefault = () => {
    return (
      <View style={[styles.BlueTile, {}]}>
        <TouchableOpacity>
          <Image source={regIMage2} style={{ width: '30%', height: 40, }} />
          <View style={{ marginLeft: '20%', marginTop: '-12%' }}>
            <Text style={[styles.buttonText, { color: '#fff', fontSize: 16, fontFamily: 'sans-serif', textAlign: 'center' }]}>
              Medical Assessment
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  const MedicalAssessmentRedForNotDisabledWithSMS = () => {
    return (
      <View style={{ backgroundColor: 'red', height: 55, width: '82%', paddingVertical: 5, borderRadius: 10, marginTop: 10, justifyContent: 'center', marginLeft: 25 }}>
        <TouchableOpacity style={styles.button}>
          <Image source={regIMage2} style={{ marginTop: '8%', width: '30%', height: 40, }} />
          <View style={{ marginLeft: '20%', marginTop: '-12%' }}>
            <Text style={[styles.buttonText, { color: '#fff', fontSize: 16, fontFamily: 'sans-serif', textAlign: 'center' }]}>
              Medical Assessment
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('NotDisabled')}>
          <View style={{ marginTop: '-10%', marginLeft: '4%' }}>
            <Image source={notdisabled} style={styles.smsimage} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  // MSO Verification
  const MSOVerificationGreen = () => {
    return (
      <View style={[styles.Greentile, {}]}>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Image source={regIMage3} style={{ width: '30%', height: 40, }} />
          <View style={{ marginLeft: '10%', marginTop: '-14%' }}>
            <Text style={[styles.buttonText, { color: '#fff', fontSize: 16, fontFamily: 'sans-serif', marginTop: 5, textAlign: 'center' }]}>
              MSO Verification
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  const MSOVerificationDefault = () => {
    return (
      <View style={[styles.BlueTile, {}]}>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Image source={regIMage3} style={{ width: '30%', height: 40, }} />
          <View style={{ marginLeft: '10%', marginTop: '-14%' }}>
            <Text style={[styles.buttonText, { color: '#fff', fontSize: 16, fontFamily: 'sans-serif', marginTop: 5, textAlign: 'center' }]}>
              MSO Verification
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  // Tevta Modules
  const TevTaGreen = () => {
    return (
      <View style={[styles.Greentile, {}]}>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Image source={regIMage4} style={{ width: '30%', height: 40, }} />
          <View style={{ marginLeft: '25%', marginTop: '-14%' }}>
            <Text style={{ color: '#fff', fontSize: 16, fontFamily: 'sans-serif', }}>
              Training Recommendation By TEVTA
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  const TevTaDefault = () => {
    return (
      <View style={[styles.BlueTile, {}]}>
        <TouchableOpacity onPress={onPress} >
          <Image source={regIMage4} style={{ width: '30%', height: 40, }} />
          <View style={{ marginLeft: '25%', marginTop: '-14%' }}>
            <Text style={{ color: '#fff', fontSize: 16, fontFamily: 'sans-serif', }}>
              Training Recommendation By TEVTA
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  // Labor Modules
  const LaborGreen = () => {
    return (
      <View style={[styles.Greentile, {}]}>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Image source={regIMage5} style={{ width: '30%', height: 40, }} />
          <View style={{ marginLeft: '25%', marginTop: '-12%' }}>
            <Text style={[styles.buttonText, { color: '#fff', fontSize: 16, fontFamily: 'sans-serif' }]}>
              Job Recommendation By Labor DEP
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  const LaborDefault = () => {
    return (
      <View style={[styles.BlueTile, {}]}>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Image source={regIMage5} style={{ width: '30%', height: 40, }} />
          <View style={{ marginLeft: '25%', marginTop: '-12%' }}>
            <Text style={[styles.buttonText, { color: '#fff', fontSize: 16, fontFamily: 'sans-serif', }]}>
              Job Recommendation By Labor DEP
            </Text>
          </View>
        </TouchableOpacity>
      </View>);
  }

  // MS Approval
  const MsApprovalGreen = () => {
    return (
      <View style={[styles.Greentile, {}]}>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Image source={regIMage6} style={{ width: '20%', height: 40, marginLeft: '7%', marginTop: '-4%' }} />
          <View style={{ marginLeft: '1%', marginTop: '-10%' }}>
            <Text style={[styles.buttonText, styles.TextTile, { textAlign: 'center' }]}>
              MS Approval
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  const MsApprovalDefault = () => {
    return (
      <View style={[styles.BlueTile, {}]}>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Image source={regIMage6} style={{ width: '20%', height: 50, marginLeft: '7%', marginTop: '-4%' }} />
          <View style={{ marginLeft: '1%', marginTop: '-10%' }}>
            <Text style={[styles.buttonText, styles.TextTile, { textAlign: 'center' }]}>
              MS Approval
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  // Certificate by DD
  const CertificateByDDDefault = () => {
    return (
      <View style={{ flexDirection: 'row', flex: 1 }}>

        <View style={{ backgroundColor: '#003060', height: 55, width: '82%', borderRadius: 10, marginTop: 10, justifyContent: 'center', paddingVertical: 25, marginLeft: 25 }}>
          <TouchableOpacity onPress={onPress} style={{ justifyContent: 'center' }}>
            <Image source={regIMage7} style={{ width: '20%', height: 40, marginLeft: '7%', marginTop: '-1%' }} />
            <View style={{ marginLeft: '32%', marginTop: '-10%' }}>
              <Text style={[styles.buttonText, styles.TextTile, {}]}>
                Certificate by DD
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  const CertificateByDDGreenWithMessage = () => {
    return (
      <View style={{ flexDirection: 'row', flex: 1 }}>

        <View style={{ backgroundColor: 'green', height: 55, width: '82%', borderRadius: 10, marginTop: 10, justifyContent: 'center', paddingVertical: 25, marginLeft: 25 }}>

          <TouchableOpacity onPress={onPress} style={{ justifyContent: 'center' }}>

            <Image source={regIMage7} style={{ width: '20%', height: 40, marginLeft: '7%', marginTop: '7%' }} />

            <View style={{ marginLeft: '32%', marginTop: '-10%' }}>

              <Text style={[styles.buttonText, styles.TextTile, {}]}>

                Certificate by DD

              </Text>

            </View>

          </TouchableOpacity>


          <TouchableOpacity onPress={() => setModalVisibleSecond(true)}>

            <View style={{ marginTop: -5 }}>

              <Image source={message} style={styles.Smsimage} />

              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

                <Modal

                  animationType="fade"

                  transparent

                  visible={modalVisibleSecond}

                  onRequestClose={() => setModalVisibleSecond(false)}

                >

                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 }}>

                    <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 20 }}>

                      <TouchableOpacity

                        onPress={() => setModalVisibleSecond(false)}>

                      </TouchableOpacity>



                      <Text style={{ color: 'black', textAlign: "center", fontSize: 15, marginTop: 10 }}>

                        آپ کا سرٹیفیکیٹ آن لائن جاری کیا جا چکا ہے، آپ اپنا سر ٹیفیکیٹ دئیے گئےآن لائن لنک پر جا کر دیکھ سکتے ہیں۔

                      </Text>

                      <TouchableOpacity onPress={() => navigation.navigate('PwdCertificate')}>

                        <Text style={{ color: 'blue', textAlign: "center", fontSize: 15, marginTop: 5, textDecorationLine: 'underline' }}>

                          https://dpmis.punjab.gov.pk/{Regnum}

                        </Text>

                      </TouchableOpacity>

                      <View style={{ flexDirection: 'row' }}>

                        <TouchableOpacity

                          onPress={this.handleTrackingSpeechSecond}

                          style={styles.SpeakButton}

                          activeOpacity={0.5}>

                          <Text style={[styles.text, { textAlign: 'center', color: '#fff', fontSize: 16, fontFamily: 'sans-serif' }]}>Speak 🔊</Text>

                        </TouchableOpacity>

                        <TouchableOpacity

                          onPress={this.handleStopTrackingSpeechSecond}

                          style={styles.SpeakButton}

                          activeOpacity={0.5}>

                          <Text style={[styles.text, { textAlign: 'center', color: '#fff', fontSize: 16, fontFamily: 'sans-serif' }]}>Stop  🔇</Text>

                        </TouchableOpacity>

                      </View>
                      <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity
                          style={styles.SpeakButton}
                          activeOpacity={0.5}
                          onPress={() => setModalVisibleSecond(false)}
                        >

                          <Text style={[styles.text, { textAlign: 'center', color: '#fff', fontSize: 16, fontFamily: 'sans-serif' }]}>Skip</Text>
                        </TouchableOpacity>
                      </View>
                    </View>

                  </View>

                </Modal>



              </View>

            </View>

          </TouchableOpacity>

        </View>

      </View>
    );
  }

  // ViewCertificate
  const ViewCertificateDefault = () => {
    return (
      <View style={{ backgroundColor: '#003060', height: 55, width: '82%', borderRadius: 10, justifyContent: 'center', paddingVertical: 5, marginTop: 10, marginLeft: 25 }}>

        <TouchableOpacity >

          <Image source={regIMage8} style={{ width: '30%', height: 40, }} />

          <View style={{ marginLeft: '30%', marginTop: '-16%' }}>

            <Text style={[styles.buttonText, styles.TextTile, { marginTop: '5%' }]}>

              View Certificate

            </Text>

          </View>

        </TouchableOpacity>

      </View>
    );
  }
  const ViewCertificateGreen = () => {
    return (
      <View style={{ backgroundColor: 'green', height: 55, width: '82%', borderRadius: 10, marginTop: 10, justifyContent: 'center', paddingVertical: 5, marginLeft: 25 }}>

        <TouchableOpacity onPress={() => navigation.navigate('PwdCertificate')}>



          <Image source={regIMage8} style={{ width: '30%', height: 40, }} />

          <View style={{ marginLeft: '30%', marginTop: '-16%' }}>

            <Text style={[styles.buttonText, styles.TextTile, { marginTop: '5%' }]}>

              View Certificate

            </Text>

          </View>

        </TouchableOpacity>

      </View>
    );
  }
  return (

    <View>
      <ImageBackground source={pwdIMage} style={{ width: '100%', height: '100%', opacity: 1 }}>

        <View>
          <Text style={{ fontWeight: "bold", fontSize: 20, paddingLeft: 60, paddingTop: 30, color: '#fff' }}>PWD Registration Tracking</Text>
        </View>

        <View style={{ padding: 1, flex: 1, justifyContent: 'center', paddingTop: '30%' }}>

          <View style={{ width: '100%', backgroundColor: '#fff', height: '101%', padding: 20, borderTopLeftRadius: 10, borderTopRightRadius: 10, opacity: 0.8 }}>


            {/* Form Submission */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
            // style={{backgroundColor:'red'}}
            >

              {/* Reassessment tile start */}
            {/* || Regn != '' || Regn != 'undefined' || Regn != null  */}
              {
                (Regn != '' ||  Disability === 'Not Disabled') ?
                <View style={[{ flex: 1, flexDirection: 'row', width: '82%', paddingVertical: 5, borderRadius: 10, marginTop: 10, justifyContent: 'center', marginLeft: 25, }]}>
                  <View style={[{ width: '50%' }]}>
                    {(requestDataReassesmentID != '') ?
                      <View style={{ backgroundColor: 'green', height: 40, width: '98%', paddingVertical: 5, borderRadius: 10, justifyContent: 'center', marginRight: '2%', paddingLeft: 5, paddingRight: 5, }}>
                        <TouchableOpacity style={{}} onPress={() => navigation.navigate('RequestReassessment')}>
                          <View style={{ flexDirection: 'row' }}>
                            <Image source={regIMage1} style={{ width: '20%', height: '100%', resizeMode: 'contain', }} />
                            <Text style={[styles.buttonText, { color: '#fff', fontSize: 13, fontFamily: 'sans-serif', textAlign: 'center', marginLeft: 5 }]}>
                              Request  Reassessment
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      :
                      <View style={{ backgroundColor: '#003060', height: 40, width: '98%', paddingVertical: 5, borderRadius: 10, justifyContent: 'center', marginRight: '2%', paddingLeft: 5, paddingRight: 5, }}>
                        <TouchableOpacity style={{}} onPress={() => navigation.navigate('RequestReassessment')}>
                          <View style={{ flexDirection: 'row' }}>
                            <Image source={regIMage1} style={{ width: '20%', height: '100%', resizeMode: 'contain', }} />
                            <Text style={[styles.buttonText, { color: '#fff', fontSize: 13, fontFamily: 'sans-serif', textAlign: 'center', marginLeft: 5 }]}>
                              Request  Reassessment
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    }

                  </View>
                  <View style={[{ width: '50%' }]}>
                    {ddarequest === undefined || ddarequest === 'undefined' || ddarequest === null || ddarequest === '' ?
                      <View style={{ backgroundColor: '#003060', height: 40, width: '98%', paddingVertical: 5, borderRadius: 10, justifyContent: 'center', paddingLeft: 10, paddingRight: 10, marginLeft: '2%' }}>
                        <TouchableOpacity style={{}} >
                          <View style={{ flexDirection: 'row' }}>
                            <Image source={regIMage3} style={{ width: '50%', height: 60, resizeMode: 'contain', marginLeft: -20 }} />
                            <Text style={[styles.buttonText, { color: '#fff', fontSize: 13, fontFamily: 'sans-serif', textAlign: 'center', marginLeft: -10, marginTop: 20 }]}>
                              DD Approval
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                      :
                      <View>
                        {ddarequest == 0 || ddarequest === '0' ?
                          <View style={{ backgroundColor: 'red', height: 40, width: '98%', paddingVertical: 5, borderRadius: 10, justifyContent: 'center', paddingLeft: 10, paddingRight: 10, marginLeft: '2%' }}>
                            <TouchableOpacity style={{}} onPress={() => Alert.alert('DD reject your Request for Reassessment!')}>
                              <View style={{ flexDirection: 'row' }}>
                                <Image source={regIMage3} style={{ width: '50%', height: 60, resizeMode: 'contain', marginLeft: -20 }} />
                                <Text style={[styles.buttonText, { color: '#fff', fontSize: 13, fontFamily: 'sans-serif', textAlign: 'center', marginLeft: -10, marginTop: 20 }]}>
                                  DD Approval
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                          :
                          <View style={{ backgroundColor: 'green', height: 40, width: '98%', paddingVertical: 5, borderRadius: 10, justifyContent: 'center', paddingLeft: 10, paddingRight: 10, marginLeft: '2%' }}>
                            <TouchableOpacity style={{}} >
                              <View style={{ flexDirection: 'row' }}>
                                <Image source={regIMage3} style={{ width: '50%', height: 60, resizeMode: 'contain', marginLeft: -20 }} />
                                <Text style={[styles.buttonText, { color: '#fff', fontSize: 13, fontFamily: 'sans-serif', textAlign: 'center', marginLeft: -10, marginTop: 20 }]}>
                                  DD Approval
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                        }
                      </View>
                    }
                  </View>
                </View>
                :
                null
              }

              {/* Reassessment tile end*/}

              {/* PWD Form */}

              {
                pwdInfoID != null ?
                  formSubmittedGreen()
                  :
                  formWithNavigationDefault()
              }

              {/* Appointment case */}

              {requestDataReassesmentID === undefined || requestDataReassesmentID === 'undefined' || requestDataReassesmentID === null || requestDataReassesmentID === '' ?
                <View>
                  {pwdInfoID != undefined || pwdInfoID != '' || pwdInfoID != 'undefined' || pwdInfoID != null ?
                    <View>
                      {pwdApppointmentID != null ?
                        AppointmentBookedWithMessageGreen()
                        :
                        AppointmentDefaultWithNavigationBlue()
                      }
                    </View>
                    :
                    AppointmentDefaultBlue()
                  }
                </View>
                :
                // pwd request in reassessment
                <View>
                  {ddarequest === undefined || ddarequest === 'undefined' || ddarequest === null || ddarequest === '' ?
                    ReAppointmentDefaultBlue()
                    :
                    <View>
                      {
                        (ddarequest === '1' || ddarequest == 1) && (resappoint === '' || resappoint === null) ?
                          ReAppointmentBookingNavigateView() :
                          (ddarequest === '1' || ddarequest == 1) && (resappoint === '1' || resappoint == 1) ?
                            ReAppointmentBookedWithMessageGreen() :
                            ddarequest === '0' || ddarequest == 0 ?
                              AppointmentBookedWithMessageGreen()
                              :
                              ReAppointmentBookedWithMessageGreen()
                      }
                    </View>
                  }
                </View>
              }


              {/* Mediacl Assessment  start*/}
              {requestDataReassesmentID === undefined || requestDataReassesmentID === 'undefined' || requestDataReassesmentID === null || requestDataReassesmentID === '' ?
              <View>
                  {pwdInfoID != undefined || pwdInfoID != '' || pwdInfoID != 'undefined' || pwdInfoID != null ?
                    <View>
                      {
                        regDep == 'Disabled' ?
                          MedicalAssessmentGreen()
                          :
                          regDep == 'Not Disabled' ?
                            MedicalAssessmentRedForNotDisabledWithSMS()
                            :
                            MedicalAssessmentDefault()
                      }
                    </View>
                    :
                    MedicalAssessmentDefault()
                  }
                </View>
                :
                // pwd request in Medical Assessment
                <View>
                  {
                    (resMedicalBoardFilled === '1' || resMedicalBoardFilled == 1) ?
                      MedicalAssessmentGreen()
                      :
                      MedicalAssessmentDefault()
                  }
                </View>
              }
              {/* Mediacl Assessment End */}


              {/* MSO Verification */}
              {
                requestDataReassesmentID === undefined || requestDataReassesmentID === 'undefined' || requestDataReassesmentID === null || requestDataReassesmentID === '' ?
                  <View>
                    {pwdInfoID != undefined || pwdInfoID != '' || pwdInfoID != 'undefined' || pwdInfoID != null ?
                      <View>
                        {
                          regDep == 'Disabled' ?
                            <View>
                              {
                                swdOfficial != '' && swdOfficial == 'Yes' ?
                                  MSOVerificationGreen()
                                  :
                                  MSOVerificationDefault()
                              }
                            </View>
                            :
                            MSOVerificationDefault()
                        }
                      </View>
                      :
                      MSOVerificationDefault()
                    }
                  </View>
                  :
                  // MSO Reassessment code
                  <View>
                    {
                      (resMedicalBoardFilled === '1' || resMedicalBoardFilled == 1) ?
                        <View>
                          {
                            (swdOfficial != '' && swdOfficial == 'Yes') ?
                              MSOVerificationGreen()
                              :
                              MSOVerificationDefault()
                          }
                        </View>
                        :
                        MSOVerificationDefault()
                    }
                  </View>

              }

              {/* TEVTA TRAINING */}

              {
                requestDataReassesmentID === undefined || requestDataReassesmentID === 'undefined' || requestDataReassesmentID === null || requestDataReassesmentID === '' ?
                  <View>
                    {pwdInfoID != undefined || pwdInfoID != '' || pwdInfoID != 'undefined' || pwdInfoID != null ?
                      <View>
                        {
                          regDep == 'Disabled' ?
                            <View>
                              {
                                techOfficial != '' && techOfficial == 'Yes' ?
                                  TevTaGreen()
                                  :
                                  TevTaDefault()
                              }
                            </View>
                            :
                            TevTaDefault()
                        }
                      </View>
                      :
                      TevTaDefault()
                    }
                  </View>
                  :
                  // Tevta Reassessment code
                  <View>
                    {
                      (resMedicalBoardFilled === '1' || resMedicalBoardFilled == 1) ?
                        <View>
                          {
                            (techOfficial != '' && techOfficial == 'Yes') ?
                              TevTaGreen()
                              :
                              TevTaDefault()
                          }
                        </View>
                        :
                        TevTaDefault()
                    }
                  </View>

              }

              {/* Labor Job */}

              {
                requestDataReassesmentID === undefined || requestDataReassesmentID === 'undefined' || requestDataReassesmentID === null || requestDataReassesmentID === '' ?
                  <View>
                    {pwdInfoID != undefined || pwdInfoID != '' || pwdInfoID != 'undefined' || pwdInfoID != null ?
                      <View>
                        {
                          regDep == 'Disabled' ?
                            <View>
                              {vocationalVerified != '' && vocationalVerified == 'Yes' ?
                                LaborGreen()
                                :
                                LaborDefault()
                              }
                            </View>
                            :
                            LaborDefault()
                        }
                      </View>
                      :
                      LaborDefault()
                    }
                  </View>
                  :
                  // Labor Reassessment code
                  <View>
                    {
                      (resMedicalBoardFilled === '1' || resMedicalBoardFilled == 1) ?
                        <View>
                          {
                            (vocationalVerified != '' && vocationalVerified == 'Yes') ?
                              LaborGreen()
                              :
                              LaborDefault()
                          }
                        </View>
                        :
                        LaborDefault()
                    }
                  </View>
              }

              {/* MS Approval */}

              {
                requestDataReassesmentID === undefined || requestDataReassesmentID === 'undefined' || requestDataReassesmentID === null || requestDataReassesmentID === '' ?
                  <View>
                    {pwdInfoID != undefined || pwdInfoID != '' || pwdInfoID != 'undefined' || pwdInfoID != null ?
                      <View>
                        {
                          regDep == 'Disabled' ?
                            <View>
                              {
                                cmdHqVerified != '' && cmdHqVerified == 'Yes' ?
                                  MsApprovalGreen()
                                  :
                                  MsApprovalDefault()
                              }
                            </View>
                            :
                            MsApprovalDefault()
                        }
                      </View>
                      :
                      MsApprovalDefault()
                    }
                  </View>
                  :
                  // MS Reassessment code
                  <View>
                    {
                      (resMedicalBoardFilled === '1' || resMedicalBoardFilled == 1) ?
                        <View>
                          {
                            (cmdHqVerified != '' && cmdHqVerified == 'Yes') ?
                              MsApprovalGreen()
                              :
                              MsApprovalDefault()
                          }
                        </View>
                        :
                        MsApprovalDefault()
                    }
                  </View>
              }

              {/* Certificate by DD */}

              {
                requestDataReassesmentID === undefined || requestDataReassesmentID === 'undefined' || requestDataReassesmentID === null || requestDataReassesmentID === '' ?
                  <View>
                    {pwdInfoID != undefined || pwdInfoID != '' || pwdInfoID != 'undefined' || pwdInfoID != null ?
                      <View>
                        {
                          regDep == 'Disabled' ?
                            <View>
                              {(Regn === undefined || Regn === 'undefined' || Regn === null || Regn === '') ?
                                CertificateByDDDefault()
                                :
                                CertificateByDDGreenWithMessage()
                              }
                            </View>
                            :
                            CertificateByDDDefault()
                        }
                      </View>
                      :
                      CertificateByDDDefault()
                    }
                  </View>
                  :
                  // Certificate by DD Reassessment code
                  <View>
                    {
                      (resMedicalBoardFilled === '1' || resMedicalBoardFilled == 1) ?
                        <View>
                          {
                            (Regn === undefined || Regn === 'undefined' || Regn === null || Regn === '') ?
                              CertificateByDDDefault()
                              :
                              CertificateByDDGreenWithMessage()
                          }
                        </View>
                        :
                        CertificateByDDDefault()
                    }
                  </View>
              }

              {/* View Certificate */}

              {
                requestDataReassesmentID === undefined || requestDataReassesmentID === 'undefined' || requestDataReassesmentID === null || requestDataReassesmentID === '' ?
                  <View>
                    {pwdInfoID != undefined || pwdInfoID != '' || pwdInfoID != 'undefined' || pwdInfoID != null ?
                      <View>
                        {
                          regDep == 'Disabled' ?
                            <View>
                              {(Regn === undefined || Regn === 'undefined' || Regn === null || Regn === '') ?
                                ViewCertificateDefault()
                                :
                                ViewCertificateGreen()
                              }
                            </View>
                            :
                            ViewCertificateDefault()
                        }
                      </View>
                      :
                      ViewCertificateDefault()
                    }
                  </View>
                  :
                  // Certificate by DD Reassessment code
                  <View>
                    {
                      (resMedicalBoardFilled === '1' || resMedicalBoardFilled == 1) ?
                        <View>
                          {
                            (Regn === undefined || Regn === 'undefined' || Regn === null || Regn === '') ?
                              ViewCertificateDefault()
                              :
                              ViewCertificateGreen()
                          }
                        </View>
                        :
                        ViewCertificateDefault()
                    }
                  </View>
              }

            </ScrollView>
          </View>
          <Footer />
        </View>
      </ImageBackground>

    </View>


  );
};

const styles = StyleSheet.create({

  imageSize: {
    width: '90%',
    height: '70%',
    resizeMode: 'contain',
  },
  smsimage: {
    width: 30,
    height: '80%',
    marginLeft: '101%',
    resizeMode: 'contain',
  },
  certificateimage: {
    width: 30,
    height: '90%',
    marginTop: 5,
    resizeMode: 'contain',
  },

  Smsimage: {
    width: 30,
    height: '80%',
    marginLeft: '101%',
    // flexDirection:'row',
    resizeMode: 'contain',
    marginTop: '9%'


  },
  ButtonStyle: {
    justifyContent: 'center',
    width: '30%',
    padding: 10,
    marginLeft: '35%',
    // paddingVertical: 10,
    borderRadius: 14,
    // paddingHorizontal: 15,
    backgroundColor: '#002D62',
  },
  SpeakButton: {
    justifyContent: 'center',
    width: '35%',
    padding: 10,
    marginTop: 15,
    // marginLeft: '15%',
    flex: 1,
    marginRight: 5,
    borderRadius: 10,
    backgroundColor: '#002D62',
    color: '#fff'
  },
  closeIcon: {
    marginLeft: '90%'
  }
  ,
  Greentile: {
    backgroundColor: 'green',
    height: 55,
    width: '82%',
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'center',
    marginLeft: 25
  },
  BlueTile: {
    backgroundColor: '#003060',
    height: 55,
    width: '82%',
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 10,
    justifyContent: 'center',
    marginLeft: 25
  },
  TextTile: {
    color: '#fff', fontSize: 16, fontFamily: 'sans-serif',
  },


});

export default Tracking;
