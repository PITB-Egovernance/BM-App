/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React,{useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  ToastAndroid,
  
} from 'react-native';
  
import { TextInput,Image } from "react-native";
import pwdIMage from '../../../assets/images/background.png';
import syncStorage from 'react-native-sync-storage';
import DocumentPicker,{types} from 'react-native-document-picker';
import Loader from '../../Components/Loader';
import { DatePickerInput } from 'react-native-paper-dates';


const JobExperience = ({navigation}) => {
  const [errorValidate, setErrorValidate]                 =  useState(false);
  const [loading, setLoading]                             = useState(false);
  const [expInstitute, setExpInstitute]                   = useState('');
  const [companyname, setcompanyname]                     = useState('');
  const [jobtype, setJobType]                             = useState('');
  const [designation, setDesignation]                     = useState('');
  const [jobfrom, setJobFrom]                             = useState('');
  const [jobto, setJobTo]                                 = useState('');
  const [experiences, setExperience]                      = useState('');
  const [achivements, setAchivements]                     = useState('');
  const [suitablejob, setSuitablejob]                     = useState('');

  const [nameExperienceLetter, setNameExperienceLetter]   = useState('');
  const [experienceLetter, setExperienceLetter]           = useState('');

  const pwdInfoID                                         = syncStorage.get('pwdinfo_id'); 
  
  // expfile
  const [expImage, setExpImage]                           = useState('');
  const [uriExp, setURIExp]                               = useState('');
  const [expName, setExpName]                             = useState('');
  const [expType, setExpType]                             = useState('');

  // held from
  const [old_jobfrom, setOldJobFrom]                      = useState('');
  const [heldfromup, setHeldFromUp]                       = useState('');
  // to from
  const [old_jobto, setOldJobTo]                          = useState('');
  const [heldtoup, setHeldToUp]                           = useState('');
useEffect(()=> {
  detailExp();
},[]);

const allExpCertificate = async () => {
  DocumentPicker.pick({
    allowMultiSelection: false,
    type: [DocumentPicker.types.images,DocumentPicker.types.pdf],
  })
    .then((response) =>
 {   
    console.log('response',JSON.stringify(response[0], null, 2))
    setExpImage(response[0].uri)
    setURIExp(response[0].uri)
    setExpName(response[0].name)
    setExpType(response[0].type)
 })
}

const detailExp = () => {
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
    const companyname           = resppwdinfoDetail['PWD experience1'][0].companyname;
    setcompanyname(companyname); 
    const jobtype               = resppwdinfoDetail['PWD experience1'][0].jobtype;
    setJobType(jobtype); 
    const designation           = resppwdinfoDetail['PWD experience1'][0].designation;
    setDesignation(designation); 
    const jobfrom               = resppwdinfoDetail['PWD experience1'][0].jobfrom;
    setJobFrom(jobfrom);
    setOldJobFrom(jobfrom); 
    const jobto                 = resppwdinfoDetail['PWD experience1'][0].jobto;
    setJobTo(jobto); 
    setOldJobTo(jobto); 
    const experience            = resppwdinfoDetail['PWD experience2'][0].experience;
    setExperience(experience); 
    const achivements           = resppwdinfoDetail['PWD experience2'][0].achivements;
    setAchivements(achivements); 
    const suitablejob           = resppwdinfoDetail['PWD experience2'][0].suitablejob;
    setSuitablejob(suitablejob); 
  });
}
  const UpdateExpValue = () => {
    if (uriExp != '') {
      const user_id              = syncStorage.get('user_id');
    const formData = new FormData();
    formData.append('user_id', user_id);
      if (uriExp == '') {
      } else {
        formData.append('expfile', {
          uri:Platform.OS === 'android' ?  uriExp: uriExp.replace('file://', ''),
          type:expType,
          name:expName
        });
      }
      formData.append('companyname', companyname);
      formData.append('jobtype', jobtype);
      formData.append('designation', designation);

      if(heldfromup === undefined || heldfromup === 'undefined' || heldfromup === null || heldfromup === ''){
        formData.append('jobfrom', old_jobfrom);
      }else {
        const year    = heldfromup.getFullYear();
        const month   = (heldfromup.getMonth() + 1).toString().padStart(2, "0"); 
        const day     = heldfromup.getDate().toString().padStart(2, "0");
        const heldfromupdate = `${year}-${month}-${day}`;
        formData.append('jobfrom', heldfromupdate);
      }
      if(heldtoup === undefined || heldtoup === 'undefined' || heldtoup === null || heldtoup === ''){
        formData.append('jobto', old_jobto);
      }else {
        const year    = heldtoup.getFullYear();
        const month   = (heldtoup.getMonth() + 1).toString().padStart(2, "0"); 
        const day     = heldtoup.getDate().toString().padStart(2, "0");
        const heldtoupdate = `${year}-${month}-${day}`;
        formData.append('jobto', heldtoupdate);
      }
      formData.append('experience', experiences);
      formData.append('achivements', achivements);
      formData.append('suitablejob', suitablejob);
      console.log('form', formData);
      setLoading(true)
      fetch(
        `https://dpmis.punjab.gov.pk/api/pwdapp/updateJob`,
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
    } else {
      ToastAndroid.show('Must upload your Experience Certificate', ToastAndroid.LONG);
      return;
    }
    
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
              <View>
                <View style={{flex:1,flexDirection:'row',}}>
                <Text style={[styles.logoText,{paddingTop:-1,textAlign: 'center',color: '#002D62', fontWeight: "bold",fontSize: 15}]}>
                If you want to Edit your Information Select the Field below.</Text>
                </View>

                {/* Experience */}
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Name of Institute (ادارہ)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TextInput 
                  placeholderColor="#c4c3cb" style={styles.loginFormTextInput} 
                  onChangeText={name => setcompanyname(name)}
                  value={companyname}        
                  />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Job Type (نوکری قسم)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput}
                  onChangeText={(jobtype) => setJobType(jobtype)}
                  value={jobtype}
                  />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Designation: (عہدہ)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput} 
                  onChangeText={(designation) => setDesignation(designation)}
                  value={designation}
                  />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Post Held From:  (تاریح)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  {/* <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput} 
                  onChangeText={(jobfrom) => setJobFrom(jobfrom)}
                  value={jobfrom}
                  /> */}
                  <DatePickerInput
                      locale="en"
                      label=""
                      value={heldfromup}
                      onChange={(heldfromup) => setHeldFromUp(heldfromup)}
                      inputMode="start"
                      style={{ height: 50, backgroundColor: '#D3D3D3' }}
                    />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Post Held To:  (تاریح)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  {/* <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput} 
                  onChangeText={(jobto) => setJobTo(jobto)}
                  value={jobto}
                  /> */}
                  <DatePickerInput
                      locale="en"
                      label=""
                      value={heldtoup}
                      onChange={(heldtoup) => setHeldToUp(heldtoup)}
                      inputMode="start"
                      style={{ height: 50, backgroundColor: '#D3D3D3' }}
                    />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Experience(Number of Years):(تجربہ)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput} 
                  onChangeText={(exper) => setExperience(exper)}
                  value={experiences}
                  />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Achivements:(کامیابیاں)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput} 
                  onChangeText={(achivements) => setAchivements(achivements)}
                  value={achivements}
                  />
                </View>
                
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Job for which you consider yourself fit:(موزوں)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput} 
                  onChangeText={(suitjob) => setSuitablejob(suitjob)}
                  value={suitablejob}
                  />
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Please Upload All Experience letter / Certificates</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                 
                  <TouchableOpacity onPress={allExpCertificate} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:60, }}>
                    <View style={{flex:1,flexDirection:'row'}}>
                      <View style={{flex:1,flexDirection:'row'}}>
                        {uriExp !='' ? 
                          <Text  style={{color:"#000000", padding:5}}>{expName}</Text>
                          : null}
                      </View>
                      
                    </View>
                  </TouchableOpacity>
                </View>
                
                <Text style={{color:'red', marginTop: 50}}>
                <Text style={{fontWeight: 'bold',color:'red'}}> NOTE:  </Text>
                To Update your Experience Info must Upload Experience Letter</Text>
                <View style={{flexDirection:'row',justifyContent:'space-between',flex:1}}>
                <TouchableOpacity  
                  onPress={() => navigation.navigate('UpdateInformation')}
                  style={[styles.ButtonStyle,{marginLeft:'30%'}]}
                  activeOpacity={0.5}>
                  <Text style={[styles.text,{textAlign:'center'}]}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                 onPress={UpdateExpValue}
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

}
export default JobExperience;
const styles = StyleSheet.create({

  ButtonStyle:{
    justifyContent: 'center',
    width:'30%',
    padding:10,
    borderRadius: 14,
    backgroundColor: '#002D62',
    marginTop:40,
    // marginLeft:'70%',
    
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
}

});

