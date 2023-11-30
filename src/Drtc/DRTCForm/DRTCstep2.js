/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useState, useEffect, useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,

  ToastAndroid,
  PermissionsAndroid,

} from 'react-native';

import { TextInput, Image } from "react-native";
import pwdIMage from '../../../assets/images/background.png';
import syncStorage from 'react-native-sync-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RadioButton } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import DocumentScanner from 'react-native-document-scanner-plugin';
import Loader from "../../Components/Loader";
import { Button } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';


const DRTCstep2 = ({ navigation }) => {
  // const [errorValidate, setErrorValidate] =  useState(false);
  // const [expInstitute, setExpInstitute]   = useState('');
  const [loading, setLoading] = useState(false);
  const { cameraPhoto, setCameraPhoto } = useState('');
  const { galleryPhoto, setGalleryPhoto } = useState('');

  const [dname, setDname] = useState('');
  const [aid, setAid] = useState('Assistive_Device');


  // dfile
  const [dfile, setdfile] = useState('');
  const [URIdfile, setURIdfile] = useState('');
  const [NameDfile, setNameDfile] = useState('');
  const [dfileType, setdfileType] = useState('');


  const dfileimg = async () => {

    DocumentPicker.pick({
      allowMultiSelection: false,
      type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
    })
      .then((response) => {
        setdfile(response[0].uri)
        setURIdfile(response[0].uri)
        setNameDfile(response[0].name)

        setdfileType(response[0].type)
        console.log(dfile, URIdfile, NameDfile, dfileType);
      })


  }


  const RegFamily = () => {
    navigation.navigate('FamilyDetails')
    syncStorage.set('family_details', []);
  }







  const NextStep = () => {
   

    if(aid == 'Assistive_Device'){
      
      if(!dname){
        ToastAndroid.show('Please Enter Your Device Name', ToastAndroid.LONG);
        return;
      }else if(!URIdfile){
        ToastAndroid.show('Attach image of recommendation by specialist', ToastAndroid.LONG);
        return;
      }else{

        syncStorage.set('Aid', aid)
        syncStorage.set('Dname', dname)
        syncStorage.set('dfile', dfile)
        syncStorage.set('URIdfile', URIdfile)
        syncStorage.set('NameDfile', NameDfile)
        syncStorage.set('dfileType', dfileType)
        const districtofdId = syncStorage.get('district_id')
        const family_dr = syncStorage.get('family_details');
        console.log('Track drtc Family: ', family_dr);
        console.log('Aid', aid)
        console.log('dfile', dfile)
        console.log('Dname', dname)
        console.log('district_id', districtofdId)
      
        if(family_dr == '' || family_dr == undefined || family_dr == 'undefined' || family_dr == null ){

          ToastAndroid.show('Please add your family details', ToastAndroid.LONG);
          return;
        }else{
           navigation.navigate('DRTCstep3')
        }
      }
    }else if (aid =='Financial_Assistance'){

      
      const districtofdId = syncStorage.get('district_id')
      const family_dr = syncStorage.get('family_details');
      console.log('Track drtc Family: ', family_dr);
      console.log('Aid', aid)
      console.log('dfile', dfile)
      console.log('Dname', dname)
      console.log('district_id', districtofdId)

      if(family_dr == '' || family_dr == undefined || family_dr == 'undefined' || family_dr == null ){

        ToastAndroid.show('Please add your family details', ToastAndroid.LONG);
        return;
      }else{
         navigation.navigate('DRTCstep3')
      }
    }
  }


  return (
    <View>

      <ImageBackground source={pwdIMage} style={{ width: '100%', height: '100%', opacity: 0.9 }}>

        <View style={{ padding: 30, flex: 1, justifyContent: 'center' }}>
          <View style={{ width: '100%', backgroundColor: '#fff', height: 500, padding: 30, borderRadius: 30 }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}>
              <View style={[styles.loginFormView, {}]}>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                  <TouchableOpacity onPress={() => navigation.navigate('DRTCstep1')}>
                    <Icon
                      name="arrow-left"
                      size={20}
                      style={{ alignItems: 'center', top: 5, color: '#002D62', marginRight: 20 }}
                    />
                  </TouchableOpacity>
                  <Text style={[styles.logoText, { paddingTop: -1, textAlign: 'center', color: '#002D62', fontWeight: "bold", fontSize: 19 }]}>
                    DRTC Application Form</Text>
                </View>

                {/* Experience */}
                <Text style={{ marginTop: 15, fontWeight: "bold", color: "#000000" }}>Requested Application For (درخواست کس کے لیے مانگی گئی۔)</Text>
                <RadioButton.Group onValueChange={aid => setAid(aid)} value={aid} style={{ marginTop: 10 }}>
                  <View style={{ flexDirection: 'column', marginTop: 5 }}>
                    <View style={{ flexDirection: "row" }}>
                      <RadioButton value="Assistive_Device" color='#002D62' />
                      <Text style={{ fontWeight: 'bold', marginTop: '4%' }}>Assistive Device</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                      <RadioButton value="Financial_Assistance" color='#002D62' />
                      <Text style={{ fontWeight: 'bold', marginTop: '4%' }}>Financial Assistance</Text>
                    </View>
                  </View>
                </RadioButton.Group>
                {aid == 'Assistive_Device' ?
                  <View>
                    <Text style={{ marginTop: 15, fontWeight: "bold", color: "#000000" }}>Device Name (ڈیوائس کا نام)<Text style={{color:'red'}}> *</Text></Text>
                    <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 40 }}>
                      <TextInput placeholderColor="#c4c3cb" style={styles.loginFormTextInput}
                        onChangeText={(dname) => setDname(dname)}
                        value={dname}
                        placeholder="Type of Device"
                      />
                    </View>
                    
                    {/* Files */}
                    <Text style={{ marginTop: 15, fontWeight: "bold", color: "#000000" }}>(In case of Assistive device attach assessment by specialist of respective disability if needed)<Text style={{color:'red'}}> *</Text></Text>
                    <View>
                      <TouchableOpacity onPress={dfileimg} style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 100 }}>
                        {URIdfile != '' ? <Image source={{ uri: URIdfile }} style={{ width: '100%', height: 90, resizeMode: 'contain' }} /> : null}
                      </TouchableOpacity>

                    </View>
                  </View>
                  : null}



                <View style={[styles.row, { justifyContent: 'space-between', alignSelf: 'flex-end', marginTop: 20, }]}>

                  <TouchableOpacity
                    onPress={RegFamily}
                    // onPress={() => navigation.navigate('DRTCstep3')}
                    style={[styles.ButtonStyle]}
                    activeOpacity={0.5}>

                    <Text style={[styles.text, { textAlign: 'center' }]}>Family Detail</Text>

                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={NextStep}
                    style={[styles.ButtonStyle, { marginLeft: 5 }]}
                    activeOpacity={0.5}>
                    <Text style={[styles.text, { textAlign: 'center' }]}>Next</Text>
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
export default DRTCstep2;
const styles = StyleSheet.create({

  ButtonStyle: {
    justifyContent: 'center',
    width: '50%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#002D62',
    marginTop: 10,

  },
  text: {
    color: 'white',
    fontSize: 15,
    fontFamily: "sans-serif",

  },
  row: {
    flex: 1,
    flexDirection: 'row'
  }
});

