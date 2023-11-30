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
import pwdIMage from '../../assets/images/background.png';
import syncStorage from 'react-native-sync-storage';
import { RadioButton, Text } from 'react-native-paper';
import DocumentPicker, { types } from 'react-native-document-picker';
import { DatePickerInput } from 'react-native-paper-dates';
import Loader from '../Components/Loader';

const RequestReassessment = ({ navigation }) => {
  const user_detail = syncStorage.get('userDetail');
  const user_cnic = user_detail.cnic;
  const [loading, setLoading]             = useState(false);
  const [errorValidate, setErrorValidate] = useState(false);
  const [remarksReassessment, setremarksReassessment] = useState('');
  const [fileReassessment, setfileReassessment] = useState('');
  const [uriFile, setURIFile] = useState('');
  const [FileName, setFileName] = useState('');
  const [FileType, setFileType] = useState('');

  useEffect(() =>{

  }, []);
  const fileReassessmentIS = async () => {
    DocumentPicker.pick({
      allowMultiSelection: false,
      type: [DocumentPicker.types.pdf],
      // type: [DocumentPicker.types.images,DocumentPicker.types.pdf],
    })
      .then((response) => {
        console.log('response', JSON.stringify(response[0], null, 2))
        setfileReassessment(response[0].uri)
        setURIFile(response[0].uri)
        setFileName(response[0].name)
        setFileType(response[0].type)
      })
  }

  const SubmitFunction = () => {

     setErrorValidate(true)
    if(!remarksReassessment){
       ToastAndroid.show('Please enter your remarks for Re-assessment', ToastAndroid.LONG);
       return;
     }else if(!fileReassessment){
       ToastAndroid.show('Please Upload your File for Re-assessment', ToastAndroid.LONG);
       return;
     }else{
        // call API
      const user_id                   = syncStorage.get('user_id');
      const pwdpinfos_id              = syncStorage.get('pwdinfo_id');
      // reassessreason reassessremarks reassessfile pwdpinfos_id user_id
      formData = new FormData();
      formData.append('user_id', user_id);
      formData.append('pwdpinfos_id', pwdpinfos_id);
      formData.append('reassessreason', '2');
      formData.append('reassessremarks', remarksReassessment);
      formData.append('reassessfile', {
        uri:Platform.OS === 'android' ?  uriFile: uriFile.replace('file://', ''),
        type:FileType,
        name:FileName
      });
      // console.log('data is ', formData);
      setLoading(true)
      fetch(
        `https://dpmis.punjab.gov.pk/api/requestass`,
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
          console.log('response PWD reassessment: ', JSON.stringify(response));
          if(response.status = 200){
            const requestDataReassesmentID = response['requestReassessment']['id'];
            const requestDataReassesment = [response['requestReassessment']];
            requestDataReassesmentID !='' 
            ?
            syncStorage.set('requestDataReassesmentID', requestDataReassesmentID)
            :null
            syncStorage.set('requestDataReassesment', requestDataReassesment)
            navigation.navigate('Tracking',{
              requestDataReassesmentID: syncStorage.get('requestDataReassesmentID'),
              requestDataReassesment: syncStorage.get('requestDataReassesment'),
            });
          }
      }
      ).finally(() =>{
        setLoading(false);
      });

    }
  }

  return (
    <View>
      <ImageBackground source={pwdIMage} style={{ width: '100%', height: '100%', opacity: 0.9 }}>
        <Loader loading={loading}/>
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
                    <Text style={[styles.logoText, { textAlign: 'center', color: '#002D62', fontWeight: "bold", fontSize: 20 }]}>Re-Assessment</Text>
                  </View>
                  
                  <Text style={{ marginTop: 45, fontWeight: "bold", color: "#000000" }}>Remarks for Re-Assessment:
                  <Text style={{color:'red'}}> *</Text></Text>
                  <Text style={{ fontWeight: "bold", color: "#000000", marginLeft: 'auto' }}> ( دوبارہ تشخیص کے لیے ریمارکس )</Text>
                  <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 3, height: 100 }}>
                    <TextInput
                        editable
                        multiline
                        numberOfLines={2}
                      placeholderStyle={styles.placeholderStyle}
                      placeholderTextColor='grey'
                      selectedTextStyle={styles.selectedTextStyle}
                      placeholderColor="#c4c3cb"
                      placeholder='Enter Your Remarks for Reassessment'
                      style={[styles.RequestReassessmentFormTextInput
                        , { borderColor: !remarksReassessment && errorValidate ? 'red' : '#fff' }
                      ]}
                      onChangeText={(remarksReassessment) => setremarksReassessment(remarksReassessment)}
                      value={remarksReassessment}
                    />
                  </View>

                  <Text style={{ marginTop: 10, fontWeight: "bold", color: "#000000" }}>Re-Assessment File: 
                  <Text style={{color:'red'}}> *</Text>
                  </Text>
                  <Text style={{ fontWeight: "bold", color: "#000000", marginLeft: 'auto' }}> (دوبارہ تشخیص کی فائل)</Text>

                  <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:70,width:'100%'}}>
                    <TouchableOpacity onPress={fileReassessmentIS} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:10, height:70 }}>
                      {fileReassessment != '' ? <Text style={{width: '50%',marginLeft: 30, height: 140,}} >{FileName}</Text>:null}
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={SubmitFunction}
                    style={styles.ButtonStyle}
                    activeOpacity={0.5}>
                    <Text style={[styles.text, { textAlign: 'center' }]}>Submit</Text>
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
  RequestReassessmentFormTextInput: {
    flex: 1,
    color: 'black',
    borderWidth: 1,
    backgroundColor: '#D3D3D3',
    borderRadius: 5,
    height: 40,
    borderColor: '#dadae8',
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
    marginTop: 30,
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
  }
});

export default RequestReassessment;