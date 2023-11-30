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
  TouchableOpacity,
  View,
  ToastAndroid,
  ImageBackground,


} from 'react-native';

import { TextInput, Image } from "react-native";
import pwdIMage from '../../../assets/images/background.png';
import syncStorage from 'react-native-sync-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RadioButton } from 'react-native-paper';
import { DatePickerInput } from 'react-native-paper-dates';
import DocumentScanner from 'react-native-document-scanner-plugin';
import DocumentPicker from 'react-native-document-picker';
import Loader from '../../Components/Loader';

const DRTCstep3 = ({ navigation }) => {
  const [errorValidate, setErrorValidate] = useState(false);
  const [loading, setLoading] = useState(false);
  // afile
  const [afile, setAfile] = useState('');
  const [URIafile, setURIafile] = useState('');
  const [NameAfile, setNameAfile] = useState('');
  const [afileType, setafileType] = useState('');


  const [NameArray, setNameArray] = useState([]);
  const [MonthArray, setMonthArray] = useState([]);
  const [DisableArray, setDisbaleArray] = useState([]);
  const [AgeArray, setAgeArray] = useState([]);
  const [RelationArray, setRelationArray] = useState([]);


  const afileimg = async () => {

    DocumentPicker.pick({
      allowMultiSelection: false,
      type: [DocumentPicker.types.images, DocumentPicker.types.pdf],
    })
      .then((response) => {
        // console.log('response',response)
        setAfile(response[0].uri)
        setURIafile(response[0].uri)
        setNameAfile(response[0].name)

        setafileType(response[0].type)
        // console.log(afile, URIafile,NameAfile, afileType);
      })


  }

  useEffect(() =>{
    previousvalues();
  }, []);
  const previousvalues = () => {
   
    const family_dr = syncStorage.get('family_details');
    console.log('Family_dr', family_dr)
    // if (family_dr != '') {
    //   const nameData = [];
    //   const monthlyData = [];
    //   const disbaleData = [];
    //   const ageData = [];
    //   const relationData = [];
    //   var count = Object.keys(family_dr).length;
    //   console.log('Keys family dr', count);
    //   for (var i = 0; i < count; i++) {
    //     nameData.push(family_dr[i].name1);
    //     monthlyData.push(family_dr[i].monthly1);
    //     disbaleData.push(family_dr[i].disable1);
    //     ageData.push(family_dr[i].age1);
    //     relationData.push(family_dr[i].relation1);

    //     console.log('Family_dir_inner Namme', nameData)
    //     console.log('Family_dir_inner Month', monthlyData)
    //     console.log('Family_dir_inner disable', disbaleData)
    //     console.log('Family_dir_inner Age', ageData)
    //     console.log('Family_dir_inner Relation', relationData)
    //   }
    //   setNameArray(nameData)
    //   setMonthArray(monthlyData)
    //   setDisbaleArray(disbaleData)
    //   setAgeArray(ageData)
    //   setRelationArray(relationData)
    // }
  }
  const filesubmit = () => {
    
    console.log('Family_dir_inner Name', NameArray)
    console.log('Family_dir_inner Month', MonthArray)
    console.log('Family_dir_inner disable', DisableArray)
    console.log('Family_dir_inner Age', AgeArray)
    console.log('Family_dir_inner Relation', RelationArray)

    const gcp = syncStorage.get('gcp')
    console.log('GCP',gcp)

     if(gcp == 'No'){
      if(!URIafile){
        ToastAndroid.show('Attach image of affidavit', ToastAndroid.LONG);
        return;
      }
     }
     /* Step 1 fields Get */
     const name = syncStorage.get('Name')
     const district_id = syncStorage.get('district_id')
     const gc = syncStorage.get('GovernmentData')
     const accountn = syncStorage.get('Accountn')
     const accounthn = syncStorage.get('Accounthn')
     const accountr = syncStorage.get('Accountr')
    //  const gcp = syncStorage.get('gcp')
     const dincome = syncStorage.get('Dincome')
     const residence = syncStorage.get('Residence')
     const appdate = syncStorage.get('Appdate')
     const tehsil_id = syncStorage.get('Tehsil_id')
     //  console.log('name ',accountn);
     /* End Step 1 Fields */
     /* Step 2 Fields Get */
     const aid = syncStorage.get('Aid')
     const dname = syncStorage.get('Dname')
     const dfile = syncStorage.get('dfile')
 
     const URIdfile = syncStorage.get('URIdfile')
     const NameDfile = syncStorage.get('NameDfile')
     const dfileType = syncStorage.get('dfileType')
    
    /* User ID */
    const user_id = syncStorage.get('user_id')
    const pwdpinfos_id = syncStorage.get('pwdinfo_id');

    const formData = new FormData();
    formData.append('user_id', user_id);
    formData.append('pwdpinfos_id', pwdpinfos_id);
    formData.append('name1', JSON.stringify(NameArray))
    formData.append('monthly1', JSON.stringify(MonthArray))
    formData.append('disable1', JSON.stringify(DisableArray))
    formData.append('age1', JSON.stringify(AgeArray))
    formData.append('relation1', JSON.stringify(RelationArray))
    formData.append('name', name);
    formData.append('district', district_id);
    formData.append('gc', gc);
    formData.append('accountn', accountn);
    formData.append('accounthn', accounthn);
    formData.append('accountr', accountr);
    formData.append('gcp', gcp);
    formData.append('dincome', dincome);
    formData.append('residence', residence);
    formData.append('appdate', JSON.stringify(appdate).slice(1, -1));
    formData.append('tehsil_id', tehsil_id);
    formData.append('aid', aid);
    formData.append('dname  ', dname);
    if (URIdfile === undefined || URIdfile === 'undefined' || URIdfile === null || URIdfile === '') {
      formData.append('dfile', '');
    }
    else {
      formData.append('dfile', {
        uri: Platform.OS === 'android' ? URIdfile : URIdfile.replace('file://', ''),
        type: dfileType,
        name: NameDfile
      });
    }
    if (URIafile === undefined || URIafile === 'undefined' || URIafile === null || URIafile === '') {
      formData.append('afile', '');
    }
    else {
      formData.append('afile', {
        uri: Platform.OS === 'android' ? URIafile : URIafile.replace('file://', ''),
        type: afileType,
        name: NameAfile
      });
    }
    console.log('formData', formData);
    setLoading(true)
    fetch(
      `https://dpmis.punjab.gov.pk/api/pwdapp/drtcapplication`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'secret': 'f08md117',

        },
        body: formData
      }
    ).then(resp => resp.json()).then(response => {
      console.log('DRTC Application', JSON.stringify(response));
      const pwdinfosID = response['DRTC Application']['pwdpinfos_id'];
      pwdinfosID !='' 
            ?
            syncStorage.set('pwdinfo_id', pwdinfosID)
            :null
      if (response.success != '') {
        navigation.navigate('FundApplication', {
          user: response.user,
          pwdInfoID: syncStorage.get('pwdinfo_id'),
        });
      }
    }
    ).finally(() => {
      setLoading(false);
    });
  }

  return (
    <View>
      <ImageBackground source={pwdIMage} style={{ width: '100%', height: '100%', opacity: 0.9 }}>
        <Loader loading={loading} />
        <View style={{ padding: 30, flex: 1, justifyContent: 'center' }}>
          <View style={{ width: '100%', backgroundColor: '#fff', height: 'auto', padding: 30, borderRadius: 30 }}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}>
              <View style={[styles.loginFormView, {}]}>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                  <TouchableOpacity onPress={() => navigation.navigate('DRTCstep2')}>
                    <Icon
                      name="arrow-left"
                      size={20}
                      style={{ alignItems: 'center', top: 5, color: '#002D62', marginRight: 20 }}
                    />
                  </TouchableOpacity>
                  <Text style={[styles.logoText, { paddingTop: -1, textAlign: 'center', color: '#002D62', fontWeight: "bold", fontSize: 19 }]}>
                    DRTC Application Form</Text>
                </View>

                <Text style={{ marginTop: 15, fontWeight: "bold", color: "#000000" }}>Attach Affidavit(In case Not avail Any Service)</Text>

                <View>

                  <TouchableOpacity onPress={afileimg} style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 100 }}>
                    {URIafile != '' ? <Image source={{ uri: URIafile }} style={{ width: '100%', height: 90, resizeMode: 'contain' }} /> : null}
                  </TouchableOpacity>

                </View>
                <View style={[styles.row, { justifyContent: 'space-between', alignSelf: 'flex-end', marginTop: 20 }]}>

                  <TouchableOpacity
                    onPress={filesubmit}
                    //onPress={() => navigation.navigate('DRTCstep2')}
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
export default DRTCstep3;
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

