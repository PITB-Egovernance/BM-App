/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React,{useEffect,useCallback,useState, useMemo, useRef,} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  ToastAndroid,
} from 'react-native';
import DocumentPicker,{types} from 'react-native-document-picker';

import { Dropdown } from 'react-native-element-dropdown';
import { Alert, Keyboard, KeyboardAvoidingView,  TextInput,Image, TouchableWithoutFeedback,  } from "react-native";
import Loader from '../../Components/Loader';
import pwdIMage from '../../../assets/images/background.png';
import syncStorage from 'react-native-sync-storage';

const EditEducationInfo = ({route,navigation}) => {
    const [nameExperienceLetter, setNameExperienceLetter]   = useState('');
    const [loading, setLoading]                             = useState(false);
    const [errorValidate, setErrorValidate]                 = useState(false);
    const [uninames, setUninames]           = useState([]);
    const [degreenames, setDegreenames]     = useState([]);
    const [subjectnames, setSubjectnames]   = useState([]);
    const [grade, setGrade]                 = useState([]);
    const [year, setYear]                   = useState('');
    
   // certifile Education       
    const [certiImage, setCertiImage]        = useState('');
    const [uriCerti, setURICerti]            = useState('');
    const [certiName, setCertiName]          = useState('');
    const [certiType, setCertiType]          = useState('');
    // 
    const [uninames_id, setUninames_id]          = useState('');
    const [degreenames_id, setDegreenames_id]    = useState('');
    const [subjectnames_id, setSubjectnames_id]  = useState('');
    const [grade_id, setGrade_id]                = useState('');
    const pwdInfoID                              = syncStorage.get('pwdinfo_id');

    
    const [Focus, setFocus]         = useState(false);
    const [isFocus, setIsFocus]     = useState(false);
    
    
    useEffect(() =>{
      getUninames();
      getDegreename();
      getSubjectnames();
      getGrades();
      GetPwdEducation();
    }, []);
    


  const getUninames = () => {
    fetch('https://dpmis.punjab.gov.pk/api/pwdapp/uninames', {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'secret':'pwdreg',
          'Content-Type':'application/json'
        },
      })
      .then(response => response.json())
      .then(response => {
      const responseUni = response['PWD unis']
      var count = Object.keys(responseUni).length; 
      if(count > 0){
        let dropDownData = [];
        for (var i = 0; i < count; i++) {
          dropDownData.push({label: responseUni[i].name,value: responseUni[i].id});
        }
       
        setUninames(dropDownData);
      }
    });
  }
 
  
  const getDegreename= () => {
    fetch('https://dpmis.punjab.gov.pk/api/pwdapp/degreename', {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'secret':'pwdreg',
          'Content-Type':'application/json'
      },
    })
    .then(response => response.json())
    .then(response => {
      const responseDegree = response['PWD degree']
      var count = Object.keys(responseDegree).length;
      if(count > 0){
        let dropDownData = [];
        for (var i = 0; i < count; i++) {
          dropDownData.push({value: responseDegree[i].id,label: responseDegree[i].name});
        }
        setDegreenames(dropDownData);
      }
    });
  }

  const getSubjectnames = () => {
    fetch('https://dpmis.punjab.gov.pk/api/pwdapp/majorsub', {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'secret':'pwdreg',
          'Content-Type':'application/json'
      },
    })
    .then(response => response.json())
    .then(response => {
      const responseSubjectnames = response['PWD major subjects']
      var count = Object.keys(responseSubjectnames).length;
      if(count > 0){
        let dropDownData = [];
        for (var i = 0; i < count; i++) {
          dropDownData.push({value: responseSubjectnames[i].id,label: responseSubjectnames[i].name});
        }
        setSubjectnames(dropDownData);
      }
    });
  }
  
  const getGrades = () => {
    fetch('https://dpmis.punjab.gov.pk/api/pwdapp/grades', {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'secret':'pwdreg',
          'Content-Type':'application/json'
      },
    })
    .then(response => response.json())
    .then(response => {
      const responseGrades = response['PWD grades']
      var count = Object.keys(responseGrades).length; 
      if(count > 0){
        let dropDownData = [];
        for (var i = 0; i < count; i++) {
          dropDownData.push({value: responseGrades[i].id,label: responseGrades[i].name});
        }
        setGrade(dropDownData);
      }
    });
  }

  const GetPwdEducation = () => {
    setLoading(true);
    fetch(`https://dpmis.punjab.gov.pk/api/pwdapp/pwdregshow/${pwdInfoID}`, {
      method: 'GET',
      headers:{
        'Accept': 'application/json',
        'Content-Type':'application/json',
        'secret':'pwdreg'
      },
    })
    .then(pwdinfoDetail => pwdinfoDetail.json())
    .then(resppwdinfoDetail => {
      const uni      = resppwdinfoDetail['PWD education'][0].uniname;
      const degree   = resppwdinfoDetail['PWD education'][0].degreename;
      const majsub   = resppwdinfoDetail['PWD education'][0].majorsub;
      const grad     = resppwdinfoDetail['PWD education'][0].grade;
      const pyear    = resppwdinfoDetail['PWD education'][0].passingyear;
      setUninames_id(JSON.parse(uni));
      setDegreenames_id(JSON.parse(degree));
      setSubjectnames_id(JSON.parse(majsub));
      setGrade_id(JSON.parse(grad));
      setYear(pyear);
    }).finally(() =>{
      setLoading(false);
    });
  }


  const EduCertificate = async () => {
    DocumentPicker.pick({
      allowMultiSelection: false,
      type: [DocumentPicker.types.images,DocumentPicker.types.pdf],
    })
      .then((response) =>
   {   
      console.log('response',JSON.stringify(response[0], null, 2))
      setCertiImage(response[0].uri)
      setURICerti(response[0].uri)
      setCertiName(response[0].name)
      setCertiType(response[0].type)
   })
  }

  const UpdateEducation = () => {

    const user_id              = syncStorage.get('user_id');
    const formData = new FormData();
    formData.append('user_id', user_id);
      if (uriCerti == '') {
      } else {
        formData.append('degreefile', {
          uri:Platform.OS === 'android' ?  uriCerti: uriCerti.replace('file://', ''),
          type:certiType,
          name:certiName
        });
      }
      formData.append('uniname', uninames_id);
      formData.append('degreename', degreenames_id);
      formData.append('majorsub', subjectnames_id);
      formData.append('grade', grade_id);
      formData.append('passingyear', year);
      setLoading(true)
      fetch(
        `https://dpmis.punjab.gov.pk/api/pwdapp/updateEdu`,
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
          console.log('response Education PWD : ', JSON.stringify(response));
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
                   <View style={{flex:1,flexDirection:'row',}}>
                 
                <Text style={[styles.logoText,{paddingTop:-1,textAlign: 'center',color: '#002D62', fontWeight: "bold",fontSize: 15}]}>
                If you want to Edit your Information Select the Field below.</Text>
                </View>
                
                <View>
                  <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Degrees(ڈگری):</Text>
                <View>
                  <View style={styles.container}>
                    <Dropdown
                      style={[styles.dropdown2, isFocus && { borderColor: 'black',backgroundColor:'#D3D3D3', }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      itemTextStyle={styles.itemTextStyle}
                      data={degreenames}
                      labelField="label"
                      valueField="value"
                      placeholder={'Select Your Degree'}
                      searchPlaceholder="Search..."
                      search
                      value={degreenames_id}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setDegreenames_id(item.value);
                        setFocus(false);
                      }}
                    />
                  </View>
                </View>
                   <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Name of Board/Institute (بورڈ):</Text>
                <View>
                  <View style={styles.container}>
                  <Dropdown
                      style={[styles.dropdown2, isFocus && { borderColor: 'black',backgroundColor:'#D3D3D3', }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      itemTextStyle={styles.itemTextStyle}
                      data={uninames}
                      search
                      labelField="label"
                      valueField="value"
                      placeholder={'Select Your Institute'}
                      searchPlaceholder="Search..."
                      value={uninames_id}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                          setUninames_id(item.value);
                          // getDivision(item.value)
                          setFocus(false);
                          
                      }}
                      
                      
                    />
                  </View>
                </View>
                  <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Subject (مضامین):</Text>
                <View>
                  <View style={styles.container}>
                    <Dropdown
                      style={[styles.dropdown2, isFocus && { borderColor: 'black',backgroundColor:'#D3D3D3', }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      itemTextStyle={styles.itemTextStyle}
                      data={subjectnames}
                      search
                      labelField="label"
                      valueField="value"
                      placeholder={'Select Your Subject'}
                      searchPlaceholder="Search..."
                      value={subjectnames_id}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setSubjectnames_id(item.value);
                          // getDivision(item.value)
                          setFocus(false);
                          
                      }}
                      
                      
                    />
                  </View>
                </View>

            <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Grade (گریڈ):</Text>
                <View>
                  <View style={styles.container}>
                    <Dropdown
                      style={[styles.dropdown2, isFocus && { borderColor: 'black',backgroundColor:'#D3D3D3', }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      itemTextStyle={styles.itemTextStyle}
                      data={grade}
                      search
                      labelField="label"
                      valueField="value"
                      placeholder={'Select Your Grade'}
                      searchPlaceholder="Search..."
                      value={grade_id}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setGrade_id(item.value);
                        setFocus(false);
                      }}
                      
                      
                    />
                  </View>
                </View>
                  <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Year (سال)</Text>
                  <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TextInput  placeholderColor="#c4c3cb" 
                  style={[styles.Step3FormTextInput
                    ,{borderColor: !year && errorValidate ? 'red':'#fff'}
                  ]}
                  onChangeText={(y) => setYear(y)}
                  value={year} />
                  </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Upload Degree File *</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TouchableOpacity onPress={EduCertificate} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:100 }}>
                    {uriCerti != '' ? <Image source={{uri:uriCerti}} style={{width: '100%', height: 90,resizeMode : 'contain' }} /> :null}
                  </TouchableOpacity>
                </View>
                  <Text style={{color:'red', marginTop: 80}}>
                  <Text style={{fontWeight: 'bold',color:'red'}}> NOTE:  </Text>
                  To Update your Educational Info must Upload Degree</Text>
                  <View style={{flexDirection:'row',justifyContent:'space-between',flex:1}}>
                    <TouchableOpacity  
                      onPress={() => navigation.navigate('UpdateInformation')}
                      style={[styles.ButtonStyle,{marginLeft:'30%'}]}
                      activeOpacity={0.5}>
                      <Text style={[styles.text,{textAlign:'center'}]}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={UpdateEducation}
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
  container: {
    width: '100%',
    marginTop:20,
    height: 'auto',
    // padding: 16,
    borderRadius:30,
    backgroundColor: '#fff',
  },
  textTable:{
    color:'#fff', 
    fontSize:13,
    fontFamily: "sans-serif",
  },
  Step3FormTextInput:{
    flex: 1,
    color: 'black',
    borderWidth: 1,
    backgroundColor:'#D3D3D3',
    borderRadius:5, 
    height:40,
    borderColor: '#dadae8',
  },
  ButtonStyle:{
    justifyContent: 'center',
    width:'30%',
    padding:10,
    borderRadius: 14,
    backgroundColor: '#002D62',
    marginTop:10,
    // marginLeft:'70%',
    
  },
  dropdown: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    backgroundColor:'#D3D3D3',
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
dropdown2:{
  height: 40,
  borderColor: 'gray',
  borderWidth: 0.5,
  borderRadius: 5,
  paddingHorizontal: 8,
  backgroundColor:'#D3D3D3',
  color: 'black'
},
itemTextStyle:{
  color:'black'
},
selectedTextStyle: {
  fontSize: 15,
  color:'black'
},

placeholderStyle:{
  color:'black'
},
inputSearchStyle : {
  color:'black'
}
});

export default EditEducationInfo;