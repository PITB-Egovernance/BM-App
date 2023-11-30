
import React, { useEffect,useState }  from 'react';
import pwdIMage from '../../assets/images/background.png'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  map,
  ImageBackground,
  Dimensions,
  title,
  TouchableOpacity,
  ToastAndroid,
  loading,

} from 'react-native';
const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

// import datatable  start
// import * as React from 'react';

// import datatable end

import syncStorage from 'react-native-sync-storage';
import { KeyboardAvoidingView,  TextInput  } from "react-native";

// datatable start
const optionsPerPage = [2, , 4];


const BMshow = ({navigation}) => {
  const [disablecheck, setDisablecheck] = useState('');
  const [Marriagecheck, setmarriagecheck] = useState('');
  const [Educationcheck, setaducationcheck] = useState('');
  const [Mediaclcheck, setmediaclcheck] = useState('');


  const [bmuserid, setBmUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorValidate, setErrorValidate] =  useState(false);
 
  const [otherservice, setGovernmentData] = useState('');
  
  const [reg_date, setreg_date] = useState('');
  const [yourincome, setYourincome] = useState('');
  const [parentincome, setParentincome] = useState('');
  const [affidavite, setAffidavite] = useState('');
   // step2 Affidavite BM       
   const [affidavitImage, setAffidavitImage] = useState('');
   const [uriaffidavit, setURIAffidavit] = useState('');
   const [affidavitName, setAffidavitName] = useState('');
   const [affidavitType, setAffidavitType] = useState(''); 

   const [service, setService] = useState('');


//Relative Detail-------------------------------

const [rname,  setRname] = useState([]);
const [rrelation,  setRrelation]  = useState([]);
const [rincome, setRincome]  = useState([]);
const [rage, setRage]                     = useState([]);
const [reducation, setReducation]  = useState([]);
const [roccupation, setRoccupation]      = useState([]);
const [familyData, setFamilyData]       = useState([]);
const regform_id                      = null;
// -------Medical------------------------------------------------
    const [expensedetail,setExpensedetail] = useState('');
    const [residence,setResidence] = useState('');
    const [houserent,setHouserent] = useState('');
    const [disease,setDisease] = useState('');
    const [treatmentfrom,setTreatmentfrom] = useState('');
    const [treatmentexpense,setTreatmentexpense] = useState('');
    const [name,setName] = useState('');
    const [fname,setFname] = useState('');
    const [cnic,setCnic] = useState('');
    const [address,setAddress] = useState('');
    const [paddress,setPaddress] = useState('');
    const [relation,setRelation] = useState('');
    const [fcnic,setFcnic] = useState('');
    const [fcnicback,setFcnicback] = useState('');

 // step2 own/father cnic front     
 const [fcnicImage, setFcnicImage]   = useState('');
 const [urifcnic, setURIFcnic]  = useState('');
 const [fcnicName, setFcnicName] = useState('');
 const [fcnicType, setFcnicType] = useState('');

//  step2 own/father cnic back       
 const [fcnicbackImage, setFcnicbackImage]   = useState('');
 const [urifcnicback, setURIFcnicback]  = useState('');
 const [fcnicbackName, setFcnicbackName] = useState('');
 const [fcnicbackType, setFcnicbackType] = useState('');

//Disable---------------------------------------------------

// const [loading, setLoading] = useState(false);
const [residencemed,setResidencemed] = useState('');
const [houserentmed,setHouserentmed] = useState('');
const [expensedetaildis,setExpensedetaildis] = useState('');
const [skill,setSkill] = useState('');
const [need,setNeed] = useState('');
const [purpose,setPurpose] = useState('');
const [property,setProperty] = useState('');

// step2  Death Certuficate      
const [dImage, setDImage]        = useState('');
const [urid, setURID]            = useState('');
const [dName, setDName]          = useState('');
const [dType, setDType]          = useState('');

// step2  Disability Certuficate      
const [disImage, setDisImage]        = useState('');
const [uridis, setURIDis]            = useState('');
const [disName, setDisName]          = useState('');
const [disType, setDisType]          = useState('');

// step2  CNIC front       
const [cnicfImage, setCnicfImage]        = useState('');
const [uricnicf, setURICnicf]            = useState('');
const [cnicfName, setCnicfName]          = useState('');
const [cnicfType, setCnicfType]          = useState('');

// step2  CNIC Back     
const [backcnicImage, setBackcnicImage]  = useState('');
const [uribackcnic, setURIBackcnic]  = useState('');
const [backcnicName, setBackcnicName] = useState('');
const [backcnicType, setBackcnicType] = useState('');
// -----------------------Education------------------------------------------------------------------------
const [Studentname, setStudentname] = useState('');
  const [studentcnic, setStudentcnic] = useState('');
  const [erelation, seteRelation] = useState('');
  const [rollnumber, setRollnumber] = useState('');
  const [schoolname, setSchoolname] = useState('');
  const [grade, setGrade] = useState('');
  const [tmarks, setTmarks] = useState('');
  const [obmarks, setObmarks] = useState('');
  const [efcnic, setefcnic] = useState('');
  

// step2 1 father cnic front     
// const [scnicImage, setScnicImage]   = useState('');
// const [uriscnic, setURIScnic]  = useState('');
// const [scnicName, setScnicName] = useState('');
// const [scnicType, setScnicType] = useState('');

// step2 1 father cnic back       
// const [scnicbackImage, setScnicbackImage]   = useState('');
// const [uriscnicback, setURIScnicback]  = useState('');
// const [scnicbackName, setScnicbackName] = useState('');
// const [scnicbackType, setScnicbackType] = useState('');


//  step2 2 
// const [fcnicImage, setFcnicImage]   = useState('');
// const [urifcnic, setURIFcnic]  = useState('');
// const [fcnicName, setFcnicName] = useState('');
// const [fcnicType, setFcnicType] = useState('');

// step2 2    
// const [fcnicbackImage, setFcnicbackImage]   = useState('');
// const [urifcnicback, setURIFcnicback]  = useState('');
// const [fcnicbackName, setFcnicbackName] = useState('');
// const [fcnicbackType, setFcnicbackType] = useState('');


// slip   
// const [slipImage, setSlipImage]   = useState('');
// const [urislip, setURISlip]  = useState('');
// const [slipName, setSlipName] = useState('');
// const [slipType, setSlipType] = useState('');

// death certi  
// const [deathcertiImage, setDeathcertiImage]   = useState('');
// const [urideathcerti, setURIDeathcerti]  = useState('');
// const [deathcertiName, setDeathcertiName] = useState('');
// const [deathcertiType, setDeathcertiType] = useState('');

// disable certi  
// const [disablecertiImage, setDisablecertiImage]   = useState('');
// const [uridisablecerti, setURIDisablecerti]  = useState('');
// const [disablecertiName, setDisablecertiName] = useState('');
// const [disablecertiType, setDisablecertiType] = useState('');

// hostelcerti certi  
// const [hostelcertiImage, setHostelcertiImage]   = useState('');
// const [urihostelcerti, setURIHostelcerti]  = useState('');
// const [hostelcertiName, setHostelcertiName] = useState('');
// const [hostelcertiType, setHostelcertiType] = useState('');

// nohostelcerti certi  
// const [nohostelcertiImage, setNohostelcertiImage]   = useState('');
// const [urinohostelcerti, setURINohostelcerti]  = useState('');
// const [nohostelcertiName, setNohostelcertiName] = useState('');
// const [nohostelcertiType, setNohostelcertiType] = useState('');


//adm certi  
// const [admcertiImage, setAdmcertiImage]   = useState('');
// const [uriadmcerti, setURIAdmcerti]  = useState('');
// const [admcertiName, setAdmcertiName] = useState('');
// const [admcertiType, setAdmcertiType] = useState('');


//resultcard 
// const [resultcardImage, setResultcardImage]   = useState('');
// const [uriresultcard, setURIResultcard]  = useState('');
// const [resultcardName, setResultcardName] = useState('');
// const [resultcardType, setResultcardType] = useState('');


//scholcerti
// const [scholcertiImage, setScholcertiImage]   = useState('');
// const [urischolcerti, setURIScholcerti]  = useState('');
// const [scholcertiName, setScholcertiName] = useState('');
// const [scholcertiType, setScholcertiType] = useState('');


// Marriage------------------------------------------------

// const [sourceofincome,setSourceofincome] = useState('');
//     const [bridename,setBridename] = useState('');
//     const [bridecnic,setBridecnic] = useState('');
//     const [brideage,setBrideage] = useState('');
//     const [groomname,setGroomname] = useState('');
//     const [groomfathername,setGroomfathername] = useState('');
//     const [groomcnic,setGroomcnic] = useState('');
//     const [groomaddress,setGroomaddress] = useState('');
//     const [income,setIncome] = useState('');
//     const [margdate, setMargdate] = useState('');
//     const [married, setMarried] = useState('');
//     const [adate, setAdate] = useState('');
//     const [regname, setRegname] = useState('');
//     const [regaddress, setRegaddress] = useState('');


// step2  bride cnic front     
// const [bcnicfImage, setBcnicfImage]   = useState('');
// const [uribcnicf, setURIBcnicf]  = useState('');
// const [bcnicfName, setBcnicfName] = useState('');
// const [bcnicfType, setBcnicfType] = useState('');

// step2 bride cnic back       
// const [bcnicbImage, setBcnicbImage] = useState('');
// const [uribcnicb, setURIBcnicb] = useState('');
// const [bcnicbsName, setBcnicbName] = useState('');
// const [bcnicbType, setBcnicbType] = useState('');

// step2  groom CNIC front       
// const [gcnicfImage, setGcnicfImage]        = useState('');
// const [urigcnicf, setURIGcnicf]            = useState('');
// const [gcnicfName, setGcnicfName]          = useState('');
// const [gcnicfType, setGcnicfType]          = useState('');

// step2  groom CNIC Back       
//  const [gcnicbImage, setGcnicbImage]        = useState('');
//  const [urigcnicb, setURIGcnicb]            = useState('');
//  const [gcnicbName, setGcnicbName]          = useState('');
//  const [gcnicbType, setGcnicbType]          = useState('');


  const [aid, setaid]        = useState('');
  // const [name, setname]        = useState('');
  const [tehsil_id, settehsil]      = useState('');
  const [dname, setdname]      = useState('');
  const [dfile, setdfile]  = useState('');
  const [afile, setafile]  = useState('');
  const [dincome, setdincome]  = useState('');
  // const [residence, setresidence]  = useState('');
  const [gc, setgc]              = useState('');
  const [gcp, setgcp]              = useState('');
  const [ accountn, setaccountn]                = useState('');
  const [accounthn, setaccounthn]    = useState('');
  const [accountr, setaccountr]            = useState('');
  const [appdate, setappdate]            = useState('');
  const [tehsilname, settehsilname]            = useState('');

  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
   // const pwdInfoID = syncStorage.get('pwdinfo_id');



  useEffect(() =>{
    console.log('bmUserId is showshow: ',syncStorage.get('bmuser_id'));
    checkpwdDetail();
  
  }, []);

  const UserBmId = syncStorage.get('bmuser_id');



  const checkpwdDetail = () => {
  // console.log('BM User ID==u=', UserBmId)
    fetch(`https://bm.punjab.gov.pk/api/apiformbmallshow/${UserBmId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'secret': 'secret key',
      },
    })
  
      .then(respBM => respBM.json())
      .then(resppwd => {

        console.log('Assessment Detail ----', resppwd)/* 247 */
        console.log('Assessment Detail Bm register', resppwd['BM Register'])/* 247 */
        console.log('Assessment Detail BM eductaion', resppwd['BM  Education'])/* 247 */

        // const disablecheck = resppwd['BM Disable'][0];
        // setDisablecheck(disablecheck);
        // const mediaclcheck = resppwd['BM Medical'][0];
        // setmediaclcheck(mediaclcheck);
        // const marriagecheck = resppwd['BM Marriage'][0];
        // console.log('marriage', marriagecheck)
        // setmarriagecheck(marriagecheck);
        // const educationcheck = resppwd['BM  Education'][0];
        // console.log('efeefe', educationcheck)
        // setaducationcheck(educationcheck);


        if (resppwd['BM Register'][0]['id'] != '') {

          setBmUserId(resppwd['BM Register'][0]['id'])
          // setDdVerify(resppwd['BM Register'][0]['ddverify'])
          // setDeoVerify(resppwd['BM Register'][0]['deoverify'])
          // setAmount(resppwd['BM Register'][0]['amount'])
          // setCheckcopy(resppwd['BM Register'][0]['checkcopy'])
   
          const reg_date  = resppwd['BM Register'][0].reg_date;
          setreg_date(reg_date);
          const yourincome  = resppwd['BM Register'][0].yourincome;
          setYourincome(yourincome);
          const parentincome  = resppwd['BM Register'][0].parentincome;
          setParentincome(parentincome);
          const affidavite  = resppwd['BM Register'][0].affidavite;
          setAffidavite(affidavite);
          const service  = resppwd['BM Register'][0].service;
          setService(service);
          const otherservice  = resppwd['BM Register'][0].otherservice;
          setGovernmentData(otherservice);

          //Family Detail
          // const rname  = resppwd['BM Relative'][0].rname;
          // setRname(rname);
//Education
// const expensedetail  = resppwd['BM Medical'][0].expensedetail;
// console.log('expensedetail',expensedetail)
const studentname  = resppwd['BM  Education'][0].studentname;
setStudentname(studentname);
const studentcnic  = resppwd['BM  Education'][0].studentcnic;
setStudentcnic(studentcnic);
const  erelation = resppwd['BM  Education'][0].relation;
// console.log(erelation, 'e relation')
seteRelation(erelation);
const  rollnumber  = resppwd['BM  Education'][0].rollnumber;
setRollnumber(rollnumber);
const  schoolname = resppwd['BM  Education'][0].schoolname;
setSchoolname(schoolname);
const  grade  = resppwd['BM  Education'][0].grade;
setGrade(grade);
const  tmarks = resppwd['BM  Education'][0].tmarks;
setTmarks(tmarks);
const obmarks  = resppwd['BM  Education'][0].obmarks;
setObmarks(obmarks);

//medical
const expensedetail  = resppwd['BM Medical'][0].expensedetail;
setExpensedetail(expensedetail);
const residence  = resppwd['BM Medical'][0].residence;
setResidence(residence);
const houserent  = resppwd['BM Medical'][0].houserent;
setHouserent(houserent);
const  disease = resppwd['BM Medical'][0].disease;
setDisease(disease);
const  treatmentfrom  = resppwd['BM Medical'][0].treatmentfrom;
setTreatmentfrom(treatmentfrom);
const  treatmentexpense = resppwd['BM Medical'][0].treatmentexpense;
setTreatmentexpense(treatmentexpense);
const  name  = resppwd['BM Medical'][0].name;
setName(name);
const  fname = resppwd['BM Medical'][0].fname;
setFname(fname);
const cnic  = resppwd['BM Medical'][0].cnic;
setCnic(cnic);
const address  = resppwd['BM Medical'][0].address;
setAddress(address);
const paddress  = resppwd['BM Medical'][0].paddress;
setPaddress(paddress);
const relation  = resppwd['BM Medical'][0].relation;
setRelation(relation);
const fcnic = resppwd['BM Medical'][0].fcnic;
setFcnic(fcnic);
const fcnicback = resppwd['BM Medical'][0].fcnicback;
setFcnicback(fcnicback);


//response condition





//Disable
const expensedetaildis  = resppwd['BM Disable'][0].expensedetail;
// const expensedetailmed  = resppwd['BM Medical'][0].expensedetailmed;
// // console.log('expensedetail',expensedetail)
// const residencemed  = resppwd['BM Medical'][0].residence;
// const houserentmed  = resppwd['BM Medical'][0].houserentmed;
setExpensedetaildis(expensedetaildis);    
//Education Set
        
setStudentname(studentname);
setStudentcnic(studentcnic);
seteRelation(erelation);
setRollnumber(rollnumber);
setSchoolname(schoolname);
setGrade(grade);
setTmarks(tmarks);
setObmarks(obmarks);  
//medical set
          setExpensedetail(expensedetail);
          setResidence(residence);
          setHouserent(houserent);
          setDisease(disease);
          setTreatmentfrom(treatmentfrom);
          setTreatmentexpense(treatmentexpense);
          setName(name);
          setFname(fname);
          setCnic(cnic);
          setAddress(address);
          setPaddress(paddress);
          setRelation(relation);
          setFcnic(fcnic);
          setFcnicback(fcnicback);

        }
      })
  }
 
  // const getbmdetail = (bmdetail) =>{

  //   //  console.log('Board id',pwdInfoID )
  //   fetch(`https://bm.punjab.gov.pk/api/apiformbmshow/${pwdInfoID }`, {
  //     method: 'GET',
  //     headers:{
  //       'Accept': 'application/json',
  //       'Content-Type':'application/json',
  //       'secret':'secret key'
  //     },
  //   })
   

//   const getdrtcdetail = (drtcdetail) =>{

//      console.log('Board id',pwdInfoID )
//     fetch(`https://dpmis.punjab.gov.pk/api/app/formdrtc/${pwdInfoID }`, {
//       method: 'GET',
//       headers:{
//         'Accept': 'application/json',
//         'Content-Type':'application/json',
//         'secret':'f08md117'
//       },
//     })
//     .then(drtcdetail => drtcdetail.json())
//     .then(respdrtcdetail => {

//       console.log('response  detail',respdrtcdetail['formdrtc basic info'][0])
//       const aid   = respdrtcdetail['formdrtc basic info'][0]. aid;
//         console.log('aid', aid)
//         const name   = respdrtcdetail['formdrtc basic info'][0].name;
//         console.log('name', name)
//       const tehsil_id   = respdrtcdetail['formdrtc basic info'][0].tehsil_id;
//         console.log('tehsil', tehsil_id)



//         const dname   = respdrtcdetail['formdrtc basic info'][0].dname;
//         console.log('dname', dname)
//         const dfile    = respdrtcdetail['formdrtc basic info'][0].dfile;
//         console.log('dfile', dfile)
//         const afile    = respdrtcdetail['formdrtc basic info'][0].afile;
//         console.log('afile', afile)
//         const dincome   = respdrtcdetail['formdrtc basic info'][0].dincome;
//         console.log('dincome', dincome)
//         const residence   = respdrtcdetail['formdrtc basic info'][0].residence;
//         console.log('residence', residence)
//         const gc   = respdrtcdetail['formdrtc basic info'][0].gc;
//         console.log('gc', gc)
//         const gcp   = respdrtcdetail['formdrtc basic info'][0].gcp;
//         console.log('gcp', gcp)
//         const accountn   = respdrtcdetail['formdrtc basic info'][0].accountn;
//         console.log('accountn', accountn)
//         const accounthn  = respdrtcdetail['formdrtc basic info'][0].accounthn;
//         console.log('accounthn', accounthn)
//         const accountr   = respdrtcdetail['formdrtc basic info'][0].accountr;
//         console.log('accountr', accountr)
//         const appdate   = respdrtcdetail['formdrtc basic info'][0].appdate;
//         console.log('appdate', appdate)
//         const renderItem = (item: any) => {
//             return (
//               <View style={styles.item}>
//                 <Text style={styles.selectedTextStyle}>{item.label}</Text>
//                 <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
//               </View>
//             );
//           };
//           setdincome(dincome);

//           setresidence(residence);
//           settehsil(tehsil_id);

//           setaid(aid);
//           setname(name);
//           setdname(dname);
//           setdfile(dfile);
//           setafile(afile);
//           setgc(gc);
//           setgcp(gcp)
//           setaccountn(accountn)
//           setaccounthn(accounthn)
//           setaccountr (accountr )
//         setappdate(appdate)
//      settehsilname(tehsilname);
//         getdrtctehsilData(tehsil_id)
//     });

//   }
//   const getdrtctehsilData = (tehsil_id) =>{

//     console.log('tehsil functino', tehsil_id)
//     // console.log('Board id', BoardID)
//     fetch(`https://dpmis.punjab.gov.pk/api/app/tehsilid/${tehsil_id}`,{
//       method: 'GET',
//       headers:{
//         'Accept': 'application/json',
//           'Content-Type':'application/json',
//           'secret':'f08md117'
//       },
//     })
//     .then(resptehsil_id => resptehsil_id.json())
//     .then(resptehsil_idName => {
//         console.log('tehsil1', resptehsil_idName.tehsilid)

//       const tehsil_idReponse = resptehsil_idName.tehsilid;
//       console.log('sdasdasdsadas', tehsil_idReponse[0])
//       const tehsilname   = tehsil_idReponse[0].tname;
//       console.log('sdas', tehsilname )
//       settehsilname(tehsilname);
//     });
  // }


  return (
    <View>
      <ImageBackground
        source={pwdIMage}
        style={{width: '100%', height: '100%', opacity: 0.9}}>
    <View style={{padding:0, flex:1, justifyContent:'center'}}>
    <View style={{
              width: '100%',
              backgroundColor: '#fff',
              height: '100%',
              padding: 30,
              // borderRadius: 0,
            }}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentInsetAdjustmentBehavior="always"
      keyboardDismissMode="on-drag"
      >
      <KeyboardAvoidingView enabled>

    <View>



    <View
    style={styles.row}>
    <Text style={{color:'black',fontSize:16,textAlign: 'center',textDecorationLine: 'underline',fontWeight:'bold' }}>BM Application Details</Text>
    </View>
    {/* ------------------------------------------otherinfo filled ------------------------------------------------------------*/}
    <Text style={{marginTop:10,fontWeight:"bold",color:"#000000"}}>Application/Registration Date:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={reg_date}
                  editable={false}
                  style={[styles.BMshowFormTextInput
                  ]}
                   value={reg_date}
                />
                </View>


    <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>If Employed your Income:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={yourincome}
                  editable={false}
                  style={[styles.BMshowFormTextInput
                  ]}
                   value={yourincome}

                />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Parent Income:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                   placeholder={parentincome}
                  editable={false}
                  style={[styles.BMshowFormTextInput
                  ]}

                   value={parentincome}

                />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Availing Any Government Service:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={service}
                  editable={false}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}
                   value={service}

                />
                </View>
                <Text style={{marginTop:10,fontWeight:"bold",color:"#000000"}}>Government Services:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={otherservice}
                  editable={false}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={otherservice}

                />
                </View>

                {/* <Text style={{marginTop:10,fontWeight:"bold",color:"#000000"}}>Affidavit:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={affidavite}
                  editable={false}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}
                   value={affidavite}
                />
                </View> */}
{/*-------------------------------------------- Family data ----------------------------------------------------------------------*/}
{/* <View
    style={styles.row}>
    <Text style={{color:'black',fontSize:16,textAlign: 'center',textDecorationLine: 'underline',fontWeight:'bold' }}>Family Details</Text>
    </View> */}
    {/* <Text style={{marginTop:10,fontWeight:"bold",color:"#000000"}}>Relative Name:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={rname}
                  style={[styles.BMshowFormTextInput
                  ]}
                   value={rname}
                />
                </View> */}


{/*-------------------------------------------- Medical starts ----------------------------------------------------------------------*/}
{/* {Mediaclcheck != 'undefined' || Mediaclcheck != undefined ?  */}
    <View>
      <View
        style={styles.row}>
        <Text style={{color:'black',fontSize:16,textAlign: 'center',textDecorationLine: 'underline',fontWeight:'bold' }}>MEDICAL TREATMENT</Text>
      </View>

      <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>If You Are UnEmployed, Your Expense Detail</Text>
      <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
      <TextInput
        placeholderColor="#c4c3cb"
        placeholder={expensedetail}
        style={[styles.BMshowFormTextInput
          // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
        ]}

          value={expensedetail}

      />
      </View>

      <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Residence</Text>
      <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
      <TextInput
        placeholderColor="#c4c3cb"
        placeholder={residence}
        style={[styles.BMshowFormTextInput
          // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
        ]}

          value={residence}

      />
      </View>

      <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>If rent, how much you pay?</Text>
      <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
      <TextInput
        placeholderColor="#c4c3cb"
        placeholder={houserent}
        style={[styles.BMshowFormTextInput
          // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
        ]}

          value={houserent}

      />
      </View>

      <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Your Disease Type</Text>
      <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
      <TextInput
        placeholderColor="#c4c3cb"
        placeholder={disease}
        style={[styles.BMshowFormTextInput
          // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
        ]}

          value={disease}

      />
      </View>

      <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>You Are Getting Treatment From?</Text>
      <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
      <TextInput
        placeholderColor="#c4c3cb"
        placeholder={treatmentfrom}
        style={[styles.BMshowFormTextInput
          // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
        ]}

          value={treatmentfrom}

      />
      </View>

      <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Your treatment expense(in Rs)?</Text>
      <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
      <TextInput
        placeholderColor="#c4c3cb"
        placeholder={treatmentexpense}
        style={[styles.BMshowFormTextInput
          // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
        ]}

          value={treatmentexpense}

      />
      </View>
      <Text style={{marginTop:10,fontWeight:"bold",color:"#002D62"}}>INFORMATION FORM (FILLED BY):</Text>
      <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Incase Patient Is Orphan Or UnConscious:</Text>
      <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Name</Text>
      <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
      <TextInput
        placeholderColor="#c4c3cb"
        placeholder={name}
        style={[styles.BMshowFormTextInput
          // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
        ]}

          value={name}

      />
      </View>

    
      <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Father Name</Text>
      <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
      <TextInput
        placeholderColor="#c4c3cb"
        placeholder={fname}
        style={[styles.BMshowFormTextInput
          // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
        ]}

          value={fname}

      />
      </View>

      <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>CNIC</Text>
      <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
      <TextInput
        placeholderColor="#c4c3cb"
        placeholder={cnic}
        style={[styles.BMshowFormTextInput
          // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
        ]}

          value={cnic}

      />
      </View>

      <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Present Address</Text>
      <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
      <TextInput
        placeholderColor="#c4c3cb"
        placeholder={address}
        style={[styles.BMshowFormTextInput
          // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
        ]}

          value={address}

      />
      </View>

      
      <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Permanent Address:</Text>
      <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
      <TextInput
        placeholderColor="#c4c3cb"
        placeholder={paddress}
        style={[styles.BMshowFormTextInput
          // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
        ]}

          value={paddress}

      />
      </View>

      <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Relation with Patient:</Text>
      <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
      <TextInput
        placeholderColor="#c4c3cb"
        placeholder={relation}
        style={[styles.BMshowFormTextInput
          // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
        ]}

          value={relation}

      />
      </View>

      <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Own/Parent/Gaurdian Cnic Front:</Text>
      <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
      <TextInput
        placeholderColor="#c4c3cb"
        placeholder={fcnic}
        style={[styles.BMshowFormTextInput
          // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
        ]}

          value={fcnic}

      />
      </View>

      <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}> Own/Parent/Gaurdian Cnic Back:</Text>
      <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
      <TextInput
        placeholderColor="#c4c3cb"
        placeholder={fcnicback}
        style={[styles.BMshowFormTextInput
          // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
        ]}

          value={fcnicback}

      />
      </View>
      </View>
  
{/*-------------------------------------------- Disable starts ----------------------------------------------------------------------*/}
{/* {disablecheck != 'undefined' ?  */}
<View>
<View
    style={styles.row}>
    <Text style={{color:'black',fontSize:16,textAlign: 'center',textDecorationLine: 'underline',fontWeight:'bold' }}>Financial Assistance for Needy/Disabled Persons</Text>
 </View>

    <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>If You Are UnEmployed, Your Expense Details</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={expensedetaildis}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={expensedetaildis}

                />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Residence</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={residence}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={residence}

                />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>If rent, how much you pay?</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={houserent}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={houserent}

                />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Does the Applicant know any additional skills?</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={dname}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={dname}

                />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Why You Need Financial Assisstance?</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={dfile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={dfile}

                />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Purpose Of Financial Assisstance?</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Applicants/Family Member's Personal Property</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>If Widow, Death Certificate Of Husband</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>If Disable upload Disability Certificate</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Applicant cnic front</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Applicant cnic back</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>
</View>
                {/* :null} */}
   {/*-------------------------------------------- Disable ends ----------------------------------------------------------------------*/}  

   {/*-------------------------------------------- Marriage start ----------------------------------------------------------------------*/}  
{Marriagecheck !='undefined' || Marriagecheck !=undefined ?
<View>
   <View
    style={styles.row}>
    <Text style={{color:'black',fontSize:16,textAlign: 'center',textDecorationLine: 'underline',fontWeight:'bold' }}>MARRIAGE GRANT</Text>
    </View>

    <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Your Source of Income:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>

                <Text style={{marginTop:10,fontWeight:"bold",color:"#002D62"}}>BRIDE'S INFORMATION:</Text>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Name</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>CNIC:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>

                
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Age:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>

                <Text style={{marginTop:10,fontWeight:"bold",color:"#002D62"}}>GROOM'S INFORMATION:</Text>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Groom's Name</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Father Name</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>CNIC</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Address</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Monthly Income</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Date Of Marriage</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Already Nikkah Done</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>If Yes,Nikkah Date</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Marriage Registrar Name</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>

                
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Marriage Registrar Address</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Groom cnic front</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Groom cnic Back</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Bride cnic Front</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Bride cnic Back</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>
                </View>
                :null}
{/*-------------------------------------------- Marriage ends here ----------------------------------------------------------------------*/}

{/*-------------------------------------------- Education data ----------------------------------------------------------------------*/}
          {Educationcheck != 'undefined' || Educationcheck != undefined ?
            <View>
              <View
                style={styles.row}>
                <Text style={{color:'black',fontSize:16,textAlign: 'center',textDecorationLine: 'underline',fontWeight:'bold' }}>EDUCATION STIPEND</Text>
                </View>
                      
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Student Name</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  editable={false}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}
                  // onChange={(Studentname) => setStudentname(Studentname)}
                  value={Studentname}

                />
                </View>  
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Student cnic/bform</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  editable={false}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}
                   value={studentcnic}

                />
                </View>  
 
               {/* <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Relation with Student</Text> */}
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Form Filled by</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  editable={false}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}
                   value={erelation}
                />
                </View>  
 
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Class Roll Number</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  editable={false}
                  // placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={rollnumber}

                />
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Current Institution Name</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  editable={false}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={schoolname}

                />
                </View>

                <Text style={{marginTop:10,fontWeight:"bold",color:"#002D62"}}>Last Year Exam Details:</Text>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Class:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  // placeholder={afile}
                  editable={false}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}
                   value={grade}

                />
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Total Marks:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  // placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}
                  editable={false}
                   value={tmarks}

                />
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Obtained Marks:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  // placeholder={afile}
                  editable={false}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={obmarks}

                />
                </View>

                {/* <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Father/Guardian CNIC Front:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Father/Guardian CNIC Back:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Student CNIC Front</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Student CNIC Back</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Father/Guardian Salary Slip</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Death Certificate Of Father(If Orphan)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>


                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Disability Certificate (If Disable)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Admission Certificate Of Institute</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Result Card Of Previous Final Exam</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Scholarship Certificate</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Hostel Residence Certificate</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>If Educational Institute Do Not Offer Hostel Residence, Attach Certificate</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.BMshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View> */}
                </View>
                :null}

                </View>

                </KeyboardAvoidingView>
            </ScrollView>
            </View>
            </View>
            </ImageBackground>
            </View>
  );

}


const styles = StyleSheet.create({
  BMshowFormTextInput:{
    flex: 1,
    color: 'black',
   
    borderWidth: 1,
    backgroundColor:'#D3D3D3',
    borderRadius:5, 
    height:40,
    borderColor: '#dadae8',
  },

  logoImage:{
    width: '100%',
    height: '120%',
    resizeMode: 'contain',
    marginTop:'10%'

  },
  Header:{
   height:90,
   backgroundColor: 'white',
   borderBottomWidth: 0
  },
  row:{
    // backgroundColor: 'white',
    // borderBottomWidth: 0,

  },
  Row:{
    backgroundColor: 'white',
    borderBottomWidth: 0,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  Row1:{
    backgroundColor: 'white',
    borderBottomWidth: 0,
    flexDirection:'row',
    justifyContent:'space-between',
    // marginTop:10
  },
  TextStyle:{
    color:'black',
    fontSize:12,
    textAlign: 'left',
    fontWeight:'bold',
    marginTop:10
  },
  InnerText:{
    color:'black',
    fontWeight:'normal',
    textDecorationLine: 'underline'
  },
  img: {
    height: screenHeight,
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.9
  },

});
export default BMshow;
