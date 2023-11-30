/**
 * Sample React Native App Step 4
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
  ToastAndroid
  
} from 'react-native';
  
import { TextInput,Image } from "react-native";
import pwdIMage from '../../../assets/images/background.png';
import syncStorage from 'react-native-sync-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DatePickerInput } from 'react-native-paper-dates';
import DocumentScanner from 'react-native-document-scanner-plugin';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import { 
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import Loader from '../../Components/Loader';

const Step4 = ({navigation}) => {
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
  // cnicf
  const [cnicFImage, setCnicFImage]        = useState('');
  const [uriCNICF,setURICNICF]             = useState('');
  const [cnicFName,setCNICFName]           = useState('');
  const [cnicFType,setcnicFType]           = useState('');
  // cnicb
  const [cnicbImage, setCnicBImage] = useState('');
  const [uriCNICB, setURICNICB]     = useState('');
  const [cnicbName, setCnicBName]   = useState('');
  const [cnicbType, setCnicBType]   = useState('');
  // degreefile
  const [degreefileImage, setdegreefileImage] = useState('');
  const [uriDegreefile, setURIdegreefile]     = useState('');
  const [degreefileName, setDegreefileName]   = useState('');
  const [degreefileType, setDegreefileType]   = useState('');
  
  // certifile - bform
  const [certiImage, setCertiImage] = useState('');
  const [uriCerti, setURICerti]     = useState('');
  const [certiName, setCertiName]   = useState('');
  const [certiType, setCertiType]   = useState('');
  // expfile
  const [expImage, setExpImage] = useState('');
  const [uriExp, setURIExp]     = useState('');
  const [expName, setExpName]   = useState('');
  const [expType, setExpType]   = useState('');
  useEffect(() =>{
  }, []);
  const cnicFront = async () => {
    DocumentPicker.pick({
      allowMultiSelection: false,
      type: [DocumentPicker.types.images],
    })
      .then((response) =>
   {   
      console.log('response',JSON.stringify(response[0], null, 2))
      setCnicFImage(response[0].uri)
      setURICNICF(response[0].uri)
      setCNICFName(response[0].name)
      setcnicFType(response[0].type)
      console.log(cnicFName, uriCNICF, cnicFImage, cnicFType);
   })
  }
  const cnicBack = async () => {
    DocumentPicker.pick({
      allowMultiSelection: false,
      type: [DocumentPicker.types.images],
    })
      .then((response) =>
   {   
      console.log('response',JSON.stringify(response[0], null, 2))
      setCnicBImage(response[0].uri)
      setURICNICB(response[0].uri)
      setCnicBName(response[0].name)
      setCnicBType(response[0].type)
   })
  }
  const allDegrees = async () => {
       DocumentPicker.pick({
      allowMultiSelection: false,
      type: [DocumentPicker.types.pdf],
    })
      .then((response) =>
   {   
      console.log('response',JSON.stringify(response[0], null, 2))
      setdegreefileImage(response[0].uri)
      setURIdegreefile(response[0].uri)
      setDegreefileName(response[0].name)
      setDegreefileType(response[0].type)
   })
  }
  const bForm = async () => {
    DocumentPicker.pick({
      allowMultiSelection: false,
      type: [DocumentPicker.types.images],
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
  const allExpCertificate = async () => {
    DocumentPicker.pick({
      allowMultiSelection: false,
      type: [DocumentPicker.types.pdf],
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

  const handlePWDForm = () => {
    // console.log(expInstitute,jobType,designation,postFrom,postTo,totalexpYears,achivements,jobFit,cnicFrontPic,cnicBackPic,certificateDegree,bform,experienceLetter)
    setErrorValidate(true);
      if (!uriCerti && (!uriCNICF || !uriCNICB)) {
        ToastAndroid.show('Upload your B-Form or CNIC', ToastAndroid.LONG);
        return;
      }
      else if (uriCerti != '') {
        poststep4();
      }
      else if (uriCNICF != '' || uriCNICB != '') {
        poststep4();
      }
  
    
  }; 
  const poststep4 = () => {
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
      const profileImage       = syncStorage.get('ProfileImage')
      const profileURI         = syncStorage.get('profileURI')
      const profileType        = syncStorage.get('profileType')
      const profileName        = syncStorage.get('profileName')

      const CameraIMG          = syncStorage.get('cameraImg')
      

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
      const province           = syncStorage.get('province')
      const tehsil             = syncStorage.get('tehsil')
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
    
    /* End User Id */
    console.log('userId', user_id, 'profileImage', profileImage)
    // profile Image set
        const formData = new FormData();
        formData.append('user_id', user_id);
        formData.append('cnic',cnic);
        formData.append('firstname', firstName);
        formData.append('lastname', lastName);
        formData.append('relationship', relation);
        formData.append('father_spouse_name', valueRelation);
        formData.append('gender', gender);
        formData.append('agegroup', age);
        formData.append('maritalstatus', maritalStatus);
        // 
        formData.append('dob', JSON.stringify(dob));
        formData.append('typeofd', disability);
        formData.append('causeofd', cause);
        formData.append('depfamily', dependents);
        formData.append('religion', religion);
        formData.append('ppaddress', presentAddress);
        formData.append('paddress', permanentAddress);
        formData.append('nationality', nationality);
        formData.append('tehsil', tehsil);
        formData.append('district', domicileDistrict);
        formData.append('province',province);
        formData.append('phone', phone);
        formData.append('regdate', JSON.stringify(regDate));

        formData.append('qualification', qualification);
         
        formData.append('uniname', JSON.stringify(institute));
        formData.append('degreename', JSON.stringify(degree));
        formData.append('majorsub', JSON.stringify(subject));
        formData.append('grade', JSON.stringify(grade));
        formData.append('passingyear', JSON.stringify(year));

        formData.append('companyname', JSON.stringify(expInstitute).slice(1,-1));
        formData.append('jobtype', JSON.stringify(jobType).slice(1,-1));
        formData.append('designation', JSON.stringify(designation).slice(1,-1));
        formData.append('jobfrom', JSON.stringify(postFrom).slice(1,-1));
        formData.append('jobto', JSON.stringify(postTo).slice(1,-1));

        formData.append('experience', JSON.stringify(totalexpYears).slice(1,-1));
        formData.append('achivements', JSON.stringify(achivements).slice(1,-1));
        formData.append('suitablejob', JSON.stringify(jobFit).slice(1,-1));

        formData.append('image', {
          uri:Platform.OS === 'android' ?  profileURI: profileURI.replace('file://', ''),
          type:profileType,
          name:profileName
        });
        
        if (uriCNICF === undefined || uriCNICF === 'undefined' || uriCNICF === null || uriCNICF === '') {
          formData.append('imagecnicf', '');
        } else {
          formData.append('imagecnicf', {
          uri:Platform.OS === 'android' ?  uriCNICF: uriCNICF.replace('file://', ''),
          type:cnicFType,
          name:cnicFName
          });
        }

        if (uriCNICB === undefined || uriCNICB === 'undefined' || uriCNICB === null || uriCNICB === '') {
          formData.append('imagecnicb', '');
        }
        else{
          formData.append('imagecnicb', {
            uri:Platform.OS === 'android' ?  uriCNICB: uriCNICB.replace('file://', ''),
            type:cnicbType,
            name:cnicbName
          });
        }

        if (uriDegreefile === undefined || uriDegreefile === 'undefined' || uriDegreefile === null || uriDegreefile === '') {
          formData.append('degreefile', '');
        }
        else{
          formData.append('degreefile', {
            uri:Platform.OS === 'android' ?  uriDegreefile: uriDegreefile.replace('file://', ''),
            type:degreefileType,
            name:degreefileName
          });
        }

        if (uriExp === undefined || uriExp === 'undefined' || uriExp === null || uriExp === '') {
          formData.append('expfile', '');
        }
        else{
          formData.append('expfile', {
            uri:Platform.OS === 'android' ?  uriExp: uriExp.replace('file://', ''),
            type:expType,
            name:expName
          });
        }

        if (uriCerti === undefined || uriCerti === 'undefined' || uriCerti === null || uriCerti === '') {
          formData.append('certifile', '');
        }
        else{
          formData.append('certifile', {
            uri:Platform.OS === 'android' ?  uriCerti: uriCerti.replace('file://', ''),
            type:certiType,
            name:certiName
          });
        }
        
        console.log('formData is : ', formData);
    setLoading(true)
      fetch(
        `https://dpmis.punjab.gov.pk/api/pwdapp/pwdreg`,
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
          console.log('response PWD', JSON.stringify(response));
          if(response.success!=''){
            const pwdinfosID = response['PWD Register']['id'];
            const pwdinfo = response['PWD Register'];
            pwdinfosID !='' 
            ?
            syncStorage.set('pwdinfo_id', pwdinfosID)
            :null
            // navigation.navigate('Dashboard',{
            //   pwdinfosid:pwdinfosID,
            //   pwdinfo:pwdinfo,
            // });
            navigation.navigate('Tracking',{
              pwdInfoID: syncStorage.get('pwdinfo_id'),
            });
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
                  <TouchableOpacity onPress={() => navigation.navigate('Step3')}>
                    <Icon 
                      name="arrow-left"
                      size={20}
                      style={{alignItems:'center', top:5, color:'#002D62', marginRight:20}}
                    />
                  </TouchableOpacity>
                <Text style={[styles.logoText,{paddingTop:-1,textAlign: 'center',color: '#002D62', fontWeight: "bold",fontSize: 19}]}>
                  PWD Registration Form</Text>
                </View>

                {/* Experience */}
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Name of Institute: (ادارہ)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TextInput
                   placeholderTextColor='grey'
                  selectedTextStyle={styles.selectedTextStyle}
                  itemTextStyle={styles.itemTextStyle}
                  placeholderColor="#c4c3cb" 
                  style={styles.step4TextInput} 
                  onChangeText={(expInstitute) => setExpInstitute(expInstitute)}
                  value={expInstitute}
                  placeholder="Enter Job Institute Name"
                  />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Job Type: (نوکری قسم)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TextInput
                   placeholderTextColor='grey'
                   selectedTextStyle={styles.selectedTextStyle}
                   itemTextStyle={styles.itemTextStyle}
                  placeholderColor="#c4c3cb" style={styles.step4TextInput}
                  onChangeText={(jobType) => setJobType(jobType)}
                  value={jobType}
                  placeholder="Type of Job"
                  />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Designation: (عہدہ)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TextInput
                   placeholderTextColor='grey'
                   selectedTextStyle={styles.selectedTextStyle}
                   itemTextStyle={styles.itemTextStyle}
                  placeholderColor="#c4c3cb" style={styles.step4TextInput} 
                  onChangeText={(designation) => setDesignation(designation)}
                  value={designation}
                  placeholder="Designation"
                  />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Post Held From:  (تاریح)</Text>
                <TouchableOpacity style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <DatePickerInput
                    locale="en"
                    label=""
                    value={postFrom}
                    onChange={(postFrom) => setPostFrom(postFrom)}
                    mode={'flat'}
                    style={{height:50,backgroundColor:'#D3D3D3'}}
                  />
                </TouchableOpacity>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Post Held To:  (تاریح)</Text>
                <TouchableOpacity style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <DatePickerInput
                    locale="en"
                    label=""
                    value={postTo}
                    onChange={(postTo) => setPostTo(postTo)}
                    mode={'flat'}
                    style={{height:50,backgroundColor:'#D3D3D3'}}
                  />
                
                </TouchableOpacity>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Experience(Number of Years): (تجربہ)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TextInput
                   placeholderTextColor='grey'
                   selectedTextStyle={styles.selectedTextStyle}
                   itemTextStyle={styles.itemTextStyle}
                  placeholderColor="#c4c3cb" style={styles.step4TextInput} 
                  onChangeText={(totalexpYears) => setTotalexpYears(totalexpYears)}
                  value={totalexpYears}
                keyboardType='numeric'

                  placeholder="Total Number of Years"
                  
                  />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Achivements:(کامیابیاں)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TextInput
                   placeholderTextColor='grey'
                   selectedTextStyle={styles.selectedTextStyle}
                   itemTextStyle={styles.itemTextStyle}
                  placeholderColor="#c4c3cb" style={styles.step4TextInput} 
                  onChangeText={(achivements) => setAchivements(achivements)}
                  value={achivements}
                  placeholder="Choose your Achivements"
                  
                  />
                </View>
                
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Job for which you consider yourself fit:(موزوں)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TextInput 
                   selectedTextStyle={styles.selectedTextStyle}
                   itemTextStyle={styles.itemTextStyle}
                  placeholderColor="#c4c3cb" style={styles.step4TextInput} 
                  onChangeText={(jobFit) => setJobFit(jobFit)}
                  value={jobFit}
                  placeholder=""
                  
                  />
                </View>
                {/* Files */}

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Choose CNIC front side<Text style={{color:'red'}}> *</Text></Text>
                  <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:80,width:'100%'}}>
                    <TouchableOpacity onPress={cnicFront} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:10, height:150 }}>
                      {uriCNICF != '' ? <Image source={{uri:uriCNICF}} style={{width: '50%',alignSelf:'center', height: 140,}} /> :null}
                    </TouchableOpacity>
                  </View>
                {/* <TouchableOpacity onPress={cnicFront} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:100 }}>
                  {uriCNICF != '' ? <Image source={{uri:uriCNICF}} style={{width: '100%', height: 90,resizeMode : 'contain' }} /> :null}
                </TouchableOpacity> */}
                
                <Text style={{marginTop:90,fontWeight:"bold",color:"#000000"}}>Choose CNIC back side<Text style={{color:'red'}}> *</Text></Text>
                  <View style={{marginTop:12,backgroundColor:'#D3D3D3',borderRadius:3, height:80,width:'100%'}}>
                    <TouchableOpacity onPress={cnicBack} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:10, height:150 }}>
                      {uriCNICB != '' ? <Image source={{uri:uriCNICB}} style={{width: '50%',alignSelf:'center', height: 140,}} /> :null}
                    </TouchableOpacity>
                  </View>
                {/* <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TouchableOpacity onPress={cnicBack} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:100 }}>
                    {uriCNICB != '' ? <Image source={{uri:uriCNICB}} style={{width: '100%', height: 90,resizeMode : 'contain' }} /> :null}
                  </TouchableOpacity>
                </View> */}

                <Text style={{marginTop:90,fontWeight:"bold",color:"#000000"}}>Please Upload B-Form<Text style={{color:'red'}}> *</Text></Text>
                  <View style={{marginTop:12,backgroundColor:'#D3D3D3',borderRadius:3, height:80,width:'100%'}}>
                    <TouchableOpacity onPress={bForm} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:10, height:150 }}>
                      {uriCerti != '' ? <Image source={{uri:uriCerti}} style={{width: '50%',alignSelf:'center', height: 140,}} /> :null}
                    </TouchableOpacity>
                  </View>
                {/* <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                   <TouchableOpacity onPress={bForm} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:100 }}>
                    {uriCerti != '' ? <Image source={{uri:uriCerti}} style={{width: '100%', height: 90,resizeMode : 'contain' }} /> :null}
                  </TouchableOpacity>
                </View> */}

                <Text style={{marginTop:90,fontWeight:"bold",color:"#000000"}}>Please Upload Latest Degrees/ Diploma/ Educational Certificate:</Text>
                <View style={{marginTop:12,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                
                  <TouchableOpacity onPress={allDegrees} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:60, }}>
                  <View style={{flex:1,flexDirection:'row'}}>
                    <View style={{flex:1,flexDirection:'row'}}>
                      {uriDegreefile !='' ? <Text style={{padding:20}}>{degreefileName}</Text>: null}
                    </View>
                  </View>
                  </TouchableOpacity>
                </View>
                <Text style={{marginTop:55,fontWeight:"bold",color:"#000000"}}>Please Upload Latest Experience letter / Certificate:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                 
                  <TouchableOpacity onPress={allExpCertificate} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:60, }}>
                    <View style={{flex:1,flexDirection:'row'}}>
                      <View style={{flex:1,flexDirection:'row'}}>
                        {uriExp !='' ? <Text style={{padding:20}}>{expName}</Text>: null}
                      </View>
                      
                    </View>
                  </TouchableOpacity>
                </View>

                <View style={[styles.row,{justifyContent:'space-between', alignSelf:'flex-end', marginTop:55}]}>
                
               <TouchableOpacity  
                  onPress={handlePWDForm}
                  style={styles.ButtonStyle}
                  activeOpacity={0.5}>                     
                  <Text style={[styles.text,{textAlign:'center'}]}>Submit</Text>         
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
export default Step4;
const styles = StyleSheet.create({

  ButtonStyle:{
    justifyContent: 'center',
    width:'30%',
    padding:10,
    borderRadius: 14,
    backgroundColor: '#002D62',
    marginTop:10,
    marginLeft:'70%',
    
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
  fontSize: 16,
  color:'black'
},
itemTextStyle:{
  color:'black'
},
step4TextInput:{
  flex: 1,
  color: 'black',
  borderWidth: 1,
  backgroundColor:'#D3D3D3',
  borderRadius:5, 
  height:40,
  borderColor: '#dadae8',
},
});

