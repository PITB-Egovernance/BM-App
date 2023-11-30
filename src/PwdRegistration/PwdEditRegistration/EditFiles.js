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

  
} from 'react-native';
  
import { TextInput,Image } from "react-native";
import pwdIMage from '../../../assets/images/background.png';
import syncStorage from 'react-native-sync-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DatePickerInput } from 'react-native-paper-dates';
import DocumentScanner from 'react-native-document-scanner-plugin';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import Loader from '../../Components/Loader';

const EditFiles = ({navigation}) => {
  const [errorValidate, setErrorValidate] =  useState(false);
  const [loading, setLoading]             = useState(false);
  const [expInstitute, setExpInstitute]   = useState('');
  const [jobType, setJobType]             = useState('');
  const [designation, setDesignation]     = useState('');
  const [postFrom, setPostFrom]           = useState('');
  const [postTo, setPostTo]               = useState('');
  const [totalexpYears, setTotalexpYears] = useState('');
  const [achivements, setAchivements]     = useState('');
  const [jobFit, setJobFit]               = useState('');
  const [cnicFrontPic, setCnciFrontPic]   = useState('');
  const [cnicBackPic, setCnciBackPic]     = useState('');
  const [certificateDegree, setCertificateDegree]     = useState('');
  const [bform, setBForm]                 = useState('');
  const [nameDegree, setNameDegree]       = useState('');
  const [nameExperienceLetter, setNameExperienceLetter]   = useState('');
  const [experienceLetter, setExperienceLetter]           = useState('');
 

  const cnicFront = async () => {
    // start the document scanner
    const cnicFront  = await DocumentScanner.scanDocument()
  
    // get back an array with scanned image file paths
    console.log('CNIC Front PIC', cnicFront['scannedImages'])
    const cnicFrontImage = cnicFront['scannedImages']
    setCnciFrontPic(cnicFrontImage[0])
   
  }
  const cnicBack = async () => {
    // start the document scanner
    const cnicBack  = await DocumentScanner.scanDocument({
      
    });
    
    // get back an array with scanned image file paths
    console.log('CNIC Back PIC', cnicBack['scannedImages'])
    const cnicBackImage = cnicBack['scannedImages']
    setCnciBackPic(cnicBackImage[0])
   
  }
  const allDegrees = async () => {
    // start the document scanner
    // const degrees  = await DocumentScanner.scanDocument({
      
    // });
    
    // // get back an array with scanned image file paths
    // console.log('Degrees', degrees['scannedImages'])
    // const AllDegrees = degrees['scannedImages']
    // setCertificate(AllDegrees)
    DocumentPicker.pick({
      allowMultiSelection: false,
      type: [types.pdf,],
    })
    .then((response) => {
      setNameDegree(response[0].name)
      setCertificateDegree(response[0].uri)})
    .catch((error) => console.log(error))

  }
  const bForm = async () => {
    // start the document scanner
    const bform  = await DocumentScanner.scanDocument({
      
    });
    
    // get back an array with scanned image file paths
    console.log('Bforms', bform['scannedImages'])
    const BForm = bform['scannedImages']
    setBForm(BForm[0])
   
  }
  const allExpCertificate = async () => {
    // start the document scanner
    // const ExpCertificate  = await DocumentScanner.scanDocument({
      
    // });
    
    // // get back an array with scanned image file paths
    // console.log('Experience Certificate', ExpCertificate['scannedImages'])
    // const Expcertificate = ExpCertificate['scannedImages']
    // setExperienceLetter(Expcertificate)
    DocumentPicker.pick({
      allowMultiSelection: false,
      type: [types.pdf,],
    })
    .then((response) => {
      setNameExperienceLetter(response[0].name)
      setExperienceLetter(response[0].uri)})
    .catch((error) => console.log(error))
   
  }
  console.log('degree pdf', JSON.stringify(certificateDegree))
  const handlePWDForm = () => {

    console.log(expInstitute,jobType,designation,postFrom,postTo,totalexpYears,achivements,jobFit,cnicFrontPic,cnicBackPic,certificateDegree,bform,experienceLetter)
    setErrorValidate(true)
    if(!expInstitute){
      ToastAndroid.show('Enter Your Last Company Name', ToastAndroid.LONG);
      return;
    }else if(!jobType){
      ToastAndroid.show('Enter your type of Job', ToastAndroid.LONG);
      return;
    }else if(!designation){
      ToastAndroid.show('Enter Your Designation', ToastAndroid.LONG);
      return;
    }else if(!postFrom){
      ToastAndroid.show('Select From Date', ToastAndroid.LONG);
      return;
    }else if(!postTo){
      ToastAndroid.show('Select End Date', ToastAndroid.LONG);
      return;
    }else if(!cnicFrontPic){
      ToastAndroid.show('Upload Front Side of CNIC', ToastAndroid.LONG);
      return;
    }else if(!cnicBackPic){
      ToastAndroid.show('Upload Back Side of CNIC', ToastAndroid.LONG);
      return;
    }else if(!certificateDegree){
      ToastAndroid.show('Upload Your Degrees', ToastAndroid.LONG);
      return;
    }else if(!experienceLetter){
      ToastAndroid.show('Upload Experience Letter', ToastAndroid.LONG);
      return;
    }else{
    /* Step 1 fields Get */
      const firstName          = syncStorage.get('FirstName')
      const lastName           = syncStorage.get('LastName')
      const relation           = syncStorage.get('Relation')
      const valueRelation      = syncStorage.get('valueRelation')
      const gender             = syncStorage.get('Gender')
      const cnic               = syncStorage.get('CNIC')
      const age                = syncStorage.get('Age')
      const dob                = syncStorage.get('DOB')
      const maritalStatus      = syncStorage.get('MaritalStatus')
      const regDate            = syncStorage.get('RegDate')
      const image              = syncStorage.get('ProfileImage')
    /* End Step 1 Fields */
    /* Step 2 Fields Get */
      const disability         = syncStorage.get('disability')
      const cause              = syncStorage.get('cause')
      const dependents         = syncStorage.get('dependents')
      const religion           = syncStorage.get('religion')
      const permanentAddress   = syncStorage.get('perAddress')
      const presentAddress     = syncStorage.get('preAddress')
      const nationality        = syncStorage.get('Nationality')
      const domicileDistrict   = syncStorage.get('domicile')
      const phone              = syncStorage.get('phone'); 
    /* End Step 2 Fields
    /* Step 3 Fields Get */
    const qualification        = syncStorage.get('qualification')
    const degree               = syncStorage.get('degree')
    const institute            = syncStorage.get('institute')
    const subject              = syncStorage.get('subject')
    const grade                = syncStorage.get('grade')
    const year                 = syncStorage.get('year') 
    /* End Step 3 Fields */
    /* User ID */
    const user_id              = syncStorage.get('user_id');
    console.log(user_id)
    /* End User Id */
  
    console.log(expInstitute,jobType,designation,postFrom,postTo,totalexpYears,achivements,jobFit,cnicFrontPic,cnicBackPic,certificateDegree,bform,experienceLetter) 
    setLoading(true)
      fetch(
        `https://dpmis.punjab.gov.pk/api/pwdapp/pwdreg`,
        {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'secret':'pwdreg',
            // value:'pwdreg'

          },
          body:JSON.stringify({
            user_id:`${user_id}`,
            image:`${image}`,
            cnic:`${cnic}`,
            firstname:`${firstName}`,
            lastname:`${lastName}`,
            relationship:`${relation}`,
            father_spouse_name:`${valueRelation}`,
            gender:`${gender}`,
            agegroup:`${age}`,
            maritalstatus:`${maritalStatus}`,
            dob:`${dob}`,
            typeofd:`${disability}`,
            causeofd:`${cause}`,
            depfamily:`${dependents}`,
            religion:`${religion}`,
            ppaddress:`${presentAddress}`,
            paddress:`${permanentAddress}`,
            nationality:`${nationality}`,
            district:`${domicileDistrict}`,
            phone:`${phone}`,
            qualification:`${qualification}`,
            uniname:`${institute}`,
            degreename:`${degree}`,
            majorsub:`${subject}`,
            grade:`${grade}`,
            regdate:`${regDate}`,
            passingyear:`${year}`,            
            companyname:`${expInstitute}`,
            jobtype:`${jobType}`,
            designation:`${designation}`,
            jobfrom:`${postFrom}`,
            jobto:`${postTo}`,
            imagecnicf:`${cnicFrontPic}`,
            imagecnicb:`${cnicBackPic}`,
            degreefile:`${certificateDegree}`,
            certifile:`${bform}`,
            expfile:`${experienceLetter}`,

          })
        },
      )
      .then(resp => resp.json()).then(response => 
        { 
          console.log('response PWD', response);
          if(response.success!=''){
            navigation.navigate('Dashboard',{
                
              user:response.user
            });
          }
          // else{

          //   ToastAndroid.show(response.message, ToastAndroid.LONG);
          //   return;
          // }
      }
        
      ).finally(() =>{
        setLoading(false);
      });
    

    }

    
  }; 
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

                {/* Experience */}
               
                {/* Files */}

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Choose CNIC front side</Text>
                <TouchableOpacity onPress={cnicFront} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:100 }}>
                  {cnicFrontPic != '' ? <Image source={{uri:cnicFrontPic}} style={{width: '100%', height: 90,resizeMode : 'contain' }} /> :null}
                  
                </TouchableOpacity>
                
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Choose CNIC back side</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                {/* <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput}
                  onChangeText={(cnicBackPic) => setCnciBackPic(cnicBackPic)}
                  value={cnicBackPic}
                /> */}
                  <TouchableOpacity onPress={cnicBack} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:100 }}>
                    {cnicBackPic != '' ? <Image source={{uri:cnicBackPic}} style={{width: '100%', height: 90,resizeMode : 'contain' }} /> :null}
                  </TouchableOpacity>
                </View>
                
                <Text style={{marginTop:85,fontWeight:"bold",color:"#000000"}}>Please Upload B-Form</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  {/* <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput}
                  onChangeText={(bform) => setBForm(bform)}
                  value={bform}
                  /> */}
                   <TouchableOpacity onPress={bForm} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:100 }}>
                    {bform != '' ? <Image source={{uri:bform}} style={{width: '100%', height: 90,resizeMode : 'contain' }} /> :null}
                  </TouchableOpacity>
                </View>

                <Text style={{marginTop:85,fontWeight:"bold",color:"#000000"}}>Please Upload All Degrees/ Diploma/ Educational Certificates</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                
                  <TouchableOpacity onPress={allDegrees} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:60, }}>
                  <View style={{flex:1,flexDirection:'row'}}>
                    <View style={{flex:1,flexDirection:'row'}}>
                      {/* {certificateDegree != '' ? <Text>{certificateDegree}</Text>  :null} */}
                      {nameDegree !='' ? <Text style={{padding:20}}>{nameDegree}</Text>: null}
                    </View>
                    
                  </View>
                  </TouchableOpacity>
                </View>
                <Text style={{marginTop:55,fontWeight:"bold",color:"#000000"}}>Please Upload All Experience letter / Certificates</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                 
                  <TouchableOpacity onPress={allExpCertificate} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:60, }}>
                    <View style={{flex:1,flexDirection:'row'}}>
                      <View style={{flex:1,flexDirection:'row'}}>
                        {/* {certificateDegree != '' ? <Text>{certificateDegree}</Text>  :null} */}
                        {nameExperienceLetter !='' ? <Text style={{padding:20}}>{nameExperienceLetter}</Text>: null}
                      </View>
                      
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',flex:1}}>
                <TouchableOpacity  
                  // onPress={NextStep}
                  style={[styles.ButtonStyle,{marginLeft:'35%'}]}
                  activeOpacity={0.5}>
                  <Text style={[styles.text,{textAlign:'center'}]}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                //  onPress={NextStep}
                 style={styles.ButtonStyle}
                 activeOpacity={0.5}>
                  <Text style={[styles.text,{textAlign:'center'}]}>Save</Text>  
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
export default EditFiles;
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

});

