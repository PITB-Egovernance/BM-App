/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React,{useEffect,useCallback, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  TouchableOpacity,
  ImageBackground,
  onLoginPress,
  onPressLearnMore,
  Button,
  Image
} from 'react-native';
  
import { Alert, Keyboard, KeyboardAvoidingView,  TextInput, TouchableWithoutFeedback,  } from "react-native";
import DocumentPicker,{types} from 'react-native-document-picker';
import pwdIMage from '../../../assets/images/background.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dropdown } from 'react-native-element-dropdown';
import { RadioButton } from 'react-native-paper';
import syncStorage from 'react-native-sync-storage';
import Loader from '../../Components/Loader';

const EditMediaclInfo = ({navigation}) => {
  const [Focus, setFocus]                         = useState(false);
  const [loading, setLoading]                     = useState(false);
  const [value, setValue]                         = useState(null);
  const [fittowork, setFittowork]                 = useState('');
  const [isFocus, setIsFocus]                     = useState(false);
  const [typeofd, setTypeofd]                     = useState([]);
  const [typeofd_id, setTypeofdId]                = useState('');
  const [causeofd, setCauseofd]                   = useState([]);
  const [causeofd_id, setCauseofdId]              = useState('');
  const [natureofd, setNatureofd]                 = useState([]);
  const [natureofd_id, setNatureofdId]            = useState('');
  const [pcrdp_no, setPcrdpNo]                    = useState('');
  const pwdInfoID                                 = syncStorage.get('pwdinfo_id');
  // old values
  const [oldtype, setoldtype]     = useState('');
  const [oldcause, setoldcause]   = useState('');
  const [oldnature, setoldnature] = useState('');
  const [oldfit, setoldfit]       = useState('');
  const [oldpcrdp, setoldpcrdp]   = useState('');
   // certifile PWD       
   const [certiImage, setCertiImage]        = useState('');
   const [uriCerti, setURICerti]            = useState('');
   const [certiName, setCertiName]          = useState('');
   const [certiType, setCertiType]          = useState('');

  useEffect(() =>{
    getTypeofd();
    getcauseofd();
    getnatureofd();
    GetAssesmentreportPWD();
    GetDocFormPWD();
  }, []);

  const getTypeofd = () => {
    fetch('https://dpmis.punjab.gov.pk/api/pwdapp/doctypes', {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type':'application/json',
          'secret':'pwdreg'
      },
    })
    .then(response => response.json())
    .then(response => {

      var count = Object.keys(response["PWD type"]).length;
      if(count > 0){
        let dropDownData = [];
        for (var i = 0; i < count; i++) {
          dropDownData.push({
            value: response["PWD type"][i].id,
            label: response["PWD type"][i].name,
          });
        }
        setTypeofd(dropDownData);
      }
    });
  }
  const getcauseofd = () => {
    const typID = typeofd_id;
    console.log('typID', typID);
    fetch(`https://dpmis.punjab.gov.pk/api/pwdapp/getdocformcauses/${typID}`, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type':'application/json',
          'secret':'pwdreg'
      },
    })
    .then(response => response.json())
    .then(response => {
      const responseCause = response['causes'];
      // console.log('responseCause', responseCause);
      var count = Object.keys(responseCause).length;
      // console.log('cause resp', count);
      if(count > 0){
        let dropDownData = [];
        for (var i = 0; i < count; i++) {
          dropDownData.push({label: responseCause[i].name,value: responseCause[i].id});
        }
        setCauseofd(dropDownData);
      }
    });
  }
  const getnatureofd = () => {
    const typID = typeofd_id;
    console.log('nature typID', typID);
    fetch(`https://dpmis.punjab.gov.pk/api/pwdapp/getdocformnatures/${typID}`, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Content-Type':'application/json',
          'secret':'pwdreg'
      },
    })
    .then(response => response.json())
    .then(response => {
      const responseNature = response["natures"];
      // console.log('responseNature', responseNature);
      var count = Object.keys(responseNature).length;
      // console.log('cause resp', count);
      if(count > 0){
        let dropDownData = [];
        for (var i = 0; i < count; i++) {
          dropDownData.push({label: responseNature[i].name,value: responseNature[i].id});
        }
        setNatureofd(dropDownData);
      }
    });
  }
// 
const PWDCertificate = async () => {
  DocumentPicker.pick({
    allowMultiSelection: false,
    type: [DocumentPicker.types.images,DocumentPicker.types.pdf],
  })
    .then((response) =>
 {   
    // console.log('response',JSON.stringify(response[0], null, 2))
    setCertiImage(response[0].uri)
    setURICerti(response[0].uri)
    setCertiName(response[0].name)
    setCertiType(response[0].type)
 })
} 

const GetAssesmentreportPWD = () => {
  fetch(`https://dpmis.punjab.gov.pk/api/pwdapp/apiassessment/${pwdInfoID}`, {
      method: 'GET',
      headers:{
        'Accept': 'application/json',
        'Content-Type':'application/json',
        'secret':'pwdreg'
      },
    })
    .then(response => response.json())
    .then(resppwdinfo => {
      // console.log('response PWD : ', JSON.stringify(resppwdinfo));
      // PWD assessment
      // const getregn = resppwdinfo['PWD assessment'][0].regn;
      const getoldfittowork = resppwdinfo['PWD assessment'][0].fittowork;
      setFittowork(getoldfittowork);
      const getoldregnum    = resppwdinfo['PWD assessment'][0].regnum;
      setPcrdpNo(getoldregnum);
      console.log(fittowork, pcrdp_no);
    });
}
const GetDocFormPWD = () => {
  fetch(`https://dpmis.punjab.gov.pk/api/pwdapp/docformbypwd/${pwdInfoID}`, {
      method: 'GET',
      headers:{
      'Accept': 'application/json',
        'Content-Type':'application/json',
        'secret':'pwdreg'
      },
    })
    .then(response => response.json())
    .then(respDocformpwdinfo => {
      // console.log('response Doc PWD : ', JSON.stringify(respDocformpwdinfo));
      const typ   = respDocformpwdinfo['docform_pwd'][0].typeofd;
      setoldtype(typ);
      setTypeofdId(JSON.parse(typ));
      const caus  = respDocformpwdinfo['docform_pwd'][0].causeofd;
      setoldtype(caus);
      setCauseofdId(JSON.parse(caus));
      const natur = respDocformpwdinfo['docform_pwd'][0].natureofd;
      setoldnature(natur);
      setNatureofdId(JSON.parse(natur));
      console.log('type', typeofd_id, typ, 'cause', causeofd_id,'nature ', natureofd_id, natur);
    });
}
const UpdateMedical = () => {

  if (oldcause != causeofd_id || oldnature != natureofd_id || oldtype != typeofd_id || oldpcrdp != pcrdp_no || oldfit != fittowork) {
    if (uriCerti != '') {
      UpdateAPImedical();
    } else {
      ToastAndroid.show('Must upload your Medical Certificate for Updation.', ToastAndroid.LONG);
      return;
    }
  }
}
const UpdateAPImedical = () => {
  // console.log('ty', typeofd_id, 'ca', causeofd_id, 'na', natureofd_id, 'pc:', pcrdp_no, 'fit:', fittowork, 'certi:', uriCerti);
  const user_id              = syncStorage.get('user_id');
  formData = new FormData();
  formData.append('user_id', user_id);
  formData.append('typeofd', typeofd_id);
  formData.append('causeofd', causeofd_id);
  formData.append('natureofd', natureofd_id);
  formData.append('regnum', pcrdp_no);
  formData.append('fittowork', fittowork);
  if (uriCerti == '') {
  } else {
    formData.append('med_attach', {
      uri:Platform.OS === 'android' ?  uriCerti: uriCerti.replace('file://', ''),
      type:certiType,
      name:certiName
    });
  }
  setLoading(true)
      fetch(
        `https://dpmis.punjab.gov.pk/api/pwdapp/updateMed`,
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
          console.log('response Medical PWD : ', JSON.stringify(response));
          if(response.success!=''){
            navigation.navigate('UpdateInformation');
          }
        }
      ).finally(() =>{
        setLoading(false);
      });
}

  return (
    <View>
      <ImageBackground source={pwdIMage} style={{width:'100%',height:'100%',opacity:0.9}}>
      <Loader loading={loading}/>
          <View style={{padding:30, flex:1, justifyContent:'center'}}>
            <View style={{width:'100%',backgroundColor:'#fff', height:500,padding:30, borderRadius:30}}>
            <ScrollView
             showsVerticalScrollIndicator={false}
             showsHorizontalScrollIndicator={false}>
              <View style={[styles.loginFormView,{}]}>
              <View style={{flex:1,flexDirection:'row',}}>
                
                <Text style={[styles.logoText,{paddingTop:-1,textAlign: 'center',color: '#002D62', fontWeight: "bold",fontSize: 15}]}>
                If you want to Edit your Information Select the Field below.</Text>
                </View>
               
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Type of Disability: (معزوری کی اقسام)</Text>

                    <Dropdown
                      style={[styles.dropdown, isFocus && { borderColor: 'black',backgroundColor:'#D3D3D3', }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      itemTextStyle={styles.itemTextStyle}
                      data={typeofd}
                      search
                      labelField="label"
                      valueField="value"
                      placeholder={'Select Disability Type'}
                      searchPlaceholder="Search..."
                      value={typeofd_id}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                          setTypeofdId(item.value);
                          getcauseofd(item.value);
                          getnatureofd(item.value);
                          setFocus(false);
                      }}
                    />
          <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Cause of Disability: (معذوری کی وجہ)</Text>

          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'black',backgroundColor:'#D3D3D3', }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={styles.itemTextStyle}
            data={causeofd}
            search
            labelField="label"
            valueField="value"
            placeholder={'Select Disability Cause'}
            searchPlaceholder="Search..."
            value={causeofd_id}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
                setCauseofdId(item.value);
                setFocus(false);
            }}
          />
          <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Nature of Disability: (فطرت
 معذوری کی)</Text>

          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: 'black',backgroundColor:'#D3D3D3', }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            itemTextStyle={styles.itemTextStyle}
            data={natureofd}
            search
            labelField="label"
            valueField="value"
            placeholder={'Select Disability Nature'}
            searchPlaceholder="Search..."
            value={natureofd_id}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setNatureofdId(item.value);
              setFocus(false);
            }}
          />
          <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>PCRDP NO:</Text>
          <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
          <TextInput 
                  placeholderColor="#c4c3cb" style={styles.loginFormTextInput} 
                  onChangeText={name => setPcrdpNo(name)}
                  value={pcrdp_no}       
                  />
          </View>
          <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Fit to Work: </Text>
            <RadioButton.Group  onValueChange={(fittowork) => setFittowork(fittowork)}
                  value={fittowork}  style={{marginTop:10}}>
                <View style={{ flexDirection: 'column',marginTop:5}}>
                    <View style={{flexDirection: "row"}}>
                      <RadioButton value="Yes"/>
                      <Text style={{fontWeight: 'bold',marginTop:'3%',color:'black'}}>Yes</Text>
                      <RadioButton value="No" />
                      <Text style={{fontWeight: 'bold',marginTop:'4%',color:'black'}}>No</Text>
                    </View>
                </View>
              </RadioButton.Group>
          <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Upload your Medical Certificate: </Text>
          <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>(میڈیکل سرٹیفکیٹ اپ لوڈ کریں)</Text>

              <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TouchableOpacity onPress={PWDCertificate} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:100 }}>
                    {uriCerti != '' ?
                      <Text  style={{color:"#000000", padding:5}}>{certiName}</Text>
                    :null}
                  </TouchableOpacity>
                </View>
                  <Text style={{color:'red', marginTop: 80}}>
                  <Text style={{fontWeight: 'bold',color:'red'}}> NOTE:  </Text>
                  To Update your Medical Info must Upload Medical Certificate</Text>
              <View style={{flexDirection:'row',justifyContent:'space-between',flex:1}}>
                    <TouchableOpacity  
                      // onPress={() => navigation.navigate('UpdateInformation')}
                      style={[styles.ButtonStyle,{marginLeft:'30%'}]}
                      activeOpacity={0.5}>
                      <Text style={[styles.text,{textAlign:'center'}]}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={UpdateMedical}
                      style={styles.ButtonStyle}
                      activeOpacity={0.5}>
                      <Text style={[styles.text,{textAlign:'center'}]}>Update</Text>  
                    </TouchableOpacity>
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
  Step2FormTextInput:{
    flex: 1,
    color: 'black',
   
    borderWidth: 1,
    backgroundColor:'#D3D3D3',
    borderRadius:5, 
    height:40,
    borderColor: '#dadae8',
  },
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
  ButtonStyle:{
    justifyContent: 'center',
    width:'30%',
    padding:10,
    borderRadius: 14,
    elevation: 3,
    backgroundColor: '#002D62',
    marginTop:'10%',
    // marginLeft:'70%',
  },
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    backgroundColor:'#D3D3D3',
    marginTop: 10
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
  text:{
    color:'white',
    fontSize:15,
    fontFamily: "sans-serif",
  
  },
row:{
 flex:1,
 flexDirection:'row'
},
selectedTextStyle: {
  fontSize: 15,
  color:'black'
},
itemTextStyle:{
  color:'black'
},
loginFormTextInput:{
  color:'black'
},

placeholderStyle:{
  color:'black'
},
inputSearchStyle : {
  color:'black'
}
});

export default EditMediaclInfo;