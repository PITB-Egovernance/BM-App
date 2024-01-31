
import React, { useEffect,useState }  from 'react';
import pwdIMage from '../../assets/images/background.png'
import ImageView from 'react-native-image-viewing';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  map,
  ImageBackground,
  Dimensions,
  Image,
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
import baseUrl from '../Components/Url';
import UserDetails from '../Auth/UserDetails';

// datatable start
const optionsPerPage = [2, , 4];


const BMshow = ({navigation,route}) => {
  const [bmuserid, setBmUserId] = useState('') 
  const [otherservice, setGovernmentData] = useState('');
  
  const [reg_date, setreg_date] = useState('');
  const [yourincome, setYourincome] = useState('');
  const [parentincome, setParentincome] = useState('');


   const [service, setService] = useState('');


//Relative Detail----------------------------
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


//Disable---------------------------------------------------

// const [loading, setLoading] = useState(false);
const [residencemed,setResidencemed] = useState('');
const [houserentmed,setHouserentmed] = useState('');
const [expensedetaildis,setExpensedetaildis] = useState('');
const [houserentdis,setHouserentdis] = useState('');
const [skilldis,setSkilldis] = useState('');
const [fneed,setFinNeed] = useState('');
const [pdis,setPurposeDdis] = useState('');
const [propertydis,setPropertdis] = useState('');
const [deathcerti,setDeathCerti] = useState('');
const [discert,setDiscert] = useState('');
const [cnicdis,setCnicdis] = useState('');
const [cnicbdis,setCnicbdis] = useState('');

// -----------------------Education------------------------------------------------------------------------
  const [Studentname, setStudentname] = useState('');
  const [studentcnic, setStudentcnic] = useState('');
  const [erelation, seteRelation] = useState('');
  const [rollnumber, setRollnumber] = useState('');
  const [schoolname, setSchoolname] = useState('');
  const [grade, setGrade] = useState('');
  const [tmarks, setTmarks] = useState('');
  const [obmarksedu, setObmarks] = useState('');
  const [addCert, setAddmissionCertedu] = useState('');
  const [deathedu, setDeathEdu] = useState('');
  const [disedu, setDisEdu] = useState('');
  const [fatehrcnicf, setFathercnicf] = useState('');
  const [fatehrcnicb, setFathercnicb] = useState('');
  const [hosteledu, setHosteledu] = useState('');
  const [nonhosteledu, setNonHosteledu] = useState('');
  const [schooledu, setSchooledu] = useState('');
  const [resultedu, setResultedu] = useState('');
  const [scniceduf, setscniceduf] = useState('');
  const [scnicedub, setscnicedub] = useState('');
  const [slipedu, setslipedu] = useState('');
  

  const [dname, setdname]      = useState('');
  const [dfile, setdfile]  = useState('');
  const [afile, setafile]  = useState('');

  const [medicalCheck, setMedicalCheck] = useState('');
  const [educationCheck, setEducationCheck] = useState('');
  const [marriageCheck, setMarraigeCheck] = useState('');
  const [disableCheck, setDisableCheck] = useState('');
  // const [residence, setresidence]  = useState('');

  
    const [sourceofincome,setSourceofincome] = useState('');
    const [bridename,setBridename] = useState('');
    const [bridecnic,setBridecnic] = useState('');
    const [brideage,setBrideage] = useState('');
    const [groomname,setGroomname] = useState('');
    const [groomfathername,setGroomfathername] = useState('');
    const [groomcnic,setGroomcnic] = useState('');
    const [groomaddress,setGroomaddress] = useState('');
    const [income,setIncome] = useState('');
    const [margdate, setMargdate] = useState('');
    const [married, setMarried] = useState('');
    const [adate, setAdate] = useState('');
    const [regname, setRegname] = useState('');
    const [regaddress, setRegaddress] = useState('');


  // step2  bride cnic front     
  const [bcnicfImage, setBcnicfImage]   = useState('');
  const [uribcnicf, setURIBcnicf]  = useState('');
  const [bcnicfName, setBcnicfName] = useState('');
  const [bcnicfType, setBcnicfType] = useState('');

  // step2 bride cnic back       
  const [bcnicbImage, setBcnicbImage] = useState('');
  const [uribcnicb, setURIBcnicb] = useState('');
  const [bcnicbsName, setBcnicbName] = useState('');
  const [bcnicbType, setBcnicbType] = useState('');

  // step2  groom CNIC front       
  const [gcnicfImage, setGcnicfImage]        = useState('');
  const [urigcnicf, setURIGcnicf]            = useState('');
  const [gcnicfName, setGcnicfName]          = useState('');
  const [gcnicfType, setGcnicfType]          = useState('');

  // step2  groom CNIC Back       
  const [gcnicbImage, setGcnicbImage]        = useState('');
  const [urigcnicb, setURIGcnicb]            = useState('');
  const [gcnicbName, setGcnicbName]          = useState('');
  const [gcnicbType, setGcnicbType]          = useState('');


  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
   // const pwdInfoID = syncStorage.get('pwdinfo_id');



  useEffect(() =>{
    console.log('bmUserId is showshow: ',syncStorage.get('bmuser_id'));
    if(route.params.key=='chairman'){

      const useDetails = route.params.UserDetails;
      console.log('CECK', useDetails.id)
      const UserBmId = useDetails.id;
 
      checkpwdDetail(UserBmId)
   }else{
 
 
     const UserBmId = syncStorage.get('bmuser_id');
     checkpwdDetail(UserBmId)
   }
  
  }, []);

 //to view Applicant cnic front in image viewer
 const [isApplicantImageViewVisible, setIsApplicantImageViewVisible] = useState(false);
 const [imageIndex, setImageIndex] = useState(0); 
 const applicantImages = [{ uri: `https://bm.punjab.gov.pk/uploads/cnic/${cnicdis}` }];

 const openApplicantImageViewer = (index) => {
   setImageIndex(index);
   console.log('Opening Image Viewer');
   setIsApplicantImageViewVisible(true);
 };

 const closeApplicantImageViewer = () => {
   console.log('closing');
   setIsApplicantImageViewVisible(false);
 };
//to view Applicant cnic back in image viewer
 const [isApplicantCnicBackVisible, setIsApplicantCnicBackVisible] = useState(false);
 const [applicantCnicBackIndex, setApplicantCnicBackIndex] = useState(0);
 const applicantCnicBackImages = [{ uri: `https://bm.punjab.gov.pk/uploads/cnic/${cnicbdis}` }];

 const openApplicantCnicBackViewer = (index) => {
   setApplicantCnicBackIndex(index);
   setIsApplicantCnicBackVisible(true);
 };

 const closeApplicantCnicBackViewer = () => {
   setIsApplicantCnicBackVisible(false);
 };
// For Father/Guardian CNIC Front
const [isFatehrcnicfVisible, setIsFatehrcnicfVisible] = useState(false);
const [fatehrcnicfIndex, setFatehrcnicfIndex] = useState(0);
const fatehrcnicfImages = [{ uri: `https://bm.punjab.gov.pk/uploads/fathercnic/${fatehrcnicf}` }];

const openFatehrcnicfViewer = (index) => {
 setFatehrcnicfIndex(index);
 setIsFatehrcnicfVisible(true);
};

const closeFatehrcnicfViewer = () => {
 setIsFatehrcnicfVisible(false);
};
// For Father/Guardian CNIC Back
const [isFatehrcnicbVisible, setIsFatehrcnicbVisible] = useState(false);
const [fatehrcnicbIndex, setFatehrcnicbIndex] = useState(0);
const fatehrcnicbImages = [{ uri: `https://bm.punjab.gov.pk/uploads/fathercnic/${fatehrcnicb}` }];

const openFatehrcnicbViewer = (index) => {
  setFatehrcnicbIndex(index);
  setIsFatehrcnicbVisible(true);
};

const closeFatehrcnicbViewer = () => {
 // console.log('heellohj');
  setIsFatehrcnicbVisible(false);
};
//for student cnic front
const [isScnicedufVisible, setIsScnicedufVisible] = useState(false);
 const [scnicedufIndex, setScnicedufIndex] = useState(0);
 const scnicedufImages = [{ uri: `https://bm.punjab.gov.pk/uploads/studentcnic/${scniceduf}` }];

 const openScnicedufViewer = (index) => {
   setScnicedufIndex(index);
   setIsScnicedufVisible(true);
 };

 const closeScnicedufViewer = () => {
   setIsScnicedufVisible(false);
 };
//for student cnic back
 const [isScnicedubVisible, setIsScnicedubVisible] = useState(false);
 const [scnicedubIndex, setScnicedubIndex] = useState(0);
 const scnicedubImages = [{ uri: `https://bm.punjab.gov.pk/uploads/studentcnic/${scnicedub}` }];

 const openScnicedubViewer = (index) => {
   setScnicedubIndex(index);
   setIsScnicedubVisible(true);
 };

 const closeScnicedubViewer = () => {
   setIsScnicedubVisible(false);
 };
  // viewer for Father/Guardian Salary Slip
  const [isSlipeduVisible, setIsSlipeduVisible] = useState(false);
  const [slipeduIndex, setSlipeduIndex] = useState(0);
  const slipEduImages = [{ uri: `https://bm.punjab.gov.pk/uploads/salaryslip/${slipedu}` }];

  const openSlipeduViewer = (index) => {
    setSlipeduIndex(index);
    setIsSlipeduVisible(true);
  };

  const closeSlipeduViewer = () => {
    setIsSlipeduVisible(false);
  };

  // viewer for Death Certificate Of Father (If Orphan)
  const [isDeatheduVisible, setIsDeatheduVisible] = useState(false);
  const [deatheduIndex, setDeatheduIndex] = useState(0);
  const deathEduImages = [{ uri: `https://bm.punjab.gov.pk/uploads/death/${deathedu}` }];

  const openDeatheduViewer = (index) => {
    setDeatheduIndex(index);
    setIsDeatheduVisible(true);
  };

  const closeDeatheduViewer = () => {
    setIsDeatheduVisible(false);
  };

  // viewer for Disability Certificate (If Disable)
  const [isDiseduVisible, setIsDiseduVisible] = useState(false);
  const [diseduIndex, setDiseduIndex] = useState(0);
  const disEduImages = [{ uri: `https://bm.punjab.gov.pk/uploads/disability/${disedu}` }];

  const openDiseduViewer = (index) => {
    setDiseduIndex(index);
    setIsDiseduVisible(true);
  };

  const closeDiseduViewer = () => {
    setIsDiseduVisible(false);
  };
    // State and functions for Admission Certificate Of Institute
 const [isAddCertVisible, setIsAddCertVisible] = useState(false);
 const [addCertIndex, setAddCertIndex] = useState(0);
 const addCertImages = [{ uri: `https://bm.punjab.gov.pk/uploads/admission/${addCert}` }];

 const openAddCertViewer = (index) => {
   setAddCertIndex(index);
   setIsAddCertVisible(true);
 };

 const closeAddCertViewer = () => {
   setIsAddCertVisible(false);
 };

 // State and functions for Result Card Of Previous Final Exam
 const [isResulteduVisible, setIsResulteduVisible] = useState(false);
 const [resulteduIndex, setResulteduIndex] = useState(0);
 const resultEduImages = [{ uri: `https://bm.punjab.gov.pk/uploads/resultcard/${resultedu}` }];

 const openResulteduViewer = (index) => {
   setResulteduIndex(index);
   setIsResulteduVisible(true);
 };

 const closeResulteduViewer = () => {
   setIsResulteduVisible(false);
 };

 // State and functions for Scholarship Certificate
 const [isSchooleduVisible, setIsSchooleduVisible] = useState(false);
 const [schooleduIndex, setSchooleduIndex] = useState(0);
 const schoolEduImages = [{ uri: `https://bm.punjab.gov.pk/uploads/scholarship/${schooledu}` }];

 const openSchooleduViewer = (index) => {
   setSchooleduIndex(index);
   setIsSchooleduVisible(true);
 };

 const closeSchooleduViewer = () => {
   setIsSchooleduVisible(false);
 };
 // State and functions for Hostel Residence Certificate
 const [isHosteleduVisible, setIsHosteleduVisible] = useState(false);
 const [hosteleduIndex, setHosteleduIndex] = useState(0);
 const hosteleduImages = [{ uri: `https://bm.punjab.gov.pk/uploads/hostel/${hosteledu}` }];

 const openHosteleduViewer = (index) => {
   setHosteleduIndex(index);
   setIsHosteleduVisible(true);
 };

 const closeHosteleduViewer = () => {
   setIsHosteleduVisible(false);
 };

 //viewer for If Educational Institute Does Not Offer Hostel Residence Certificate
 const [isNonHosteleduVisible, setIsNonHosteleduVisible] = useState(false);
 const [nonHosteleduIndex, setNonHosteleduIndex] = useState(0);
 const nonHosteleduImages = [{ uri: `https://bm.punjab.gov.pk/uploads/nohostel/${nonhosteledu}` }];

 const openNonHosteleduViewer = (index) => {
   setNonHosteleduIndex(index);
   setIsNonHosteleduVisible(true);
 };

 const closeNonHosteleduViewer = () => {
   setIsNonHosteleduVisible(false);
 };
  // viewer for "If Widow, Death Certificate Of Husband"
  const [isDeathCertiVisible, setIsDeathCertiVisible] = useState(false);
  const [deathCertiIndex, setDeathCertiIndex] = useState(0);
  const deathCertiImages = [{ uri: `https://bm.punjab.gov.pk/uploads/death/${deathcerti}` }];

  const openDeathCertiViewer = (index) => {
    setDeathCertiIndex(index);
    setIsDeathCertiVisible(true);
  };

  const closeDeathCertiViewer = () => {
    setIsDeathCertiVisible(false);
  };

  //viewer for "If Disable upload Disability Certificate"
  const [isDiscertVisible, setIsDiscertVisible] = useState(false);
  const [discertIndex, setDiscertIndex] = useState(0);
  const discertImages = [{ uri: `https://bm.punjab.gov.pk/uploads/death/${discert}` }];

  const openDiscertViewer = (index) => {
    setDiscertIndex(index);
    setIsDiscertVisible(true);
  };

  const closeDiscertViewer = () => {
    setIsDiscertVisible(false);
  };
  // State and functions for Own/Parent/Guardian CNIC Front
  const [isCnicFrontVisible, setIsCnicFrontVisible] = useState(false);
  const [cnicFrontIndex, setCnicFrontIndex] = useState(0);
  const cnicFrontImages = [{ uri: `https://bm.punjab.gov.pk/uploads/fathercnic/${fcnic}` }];

  const openCnicFrontViewer = (index) => {
    setCnicFrontIndex(index);
    setIsCnicFrontVisible(true);
  };

  const closeCnicFrontViewer = () => {
    setIsCnicFrontVisible(false);
  };

  // State and functions for Own/Parent/Guardian CNIC Back
  const [isCnicBackVisible, setIsCnicBackVisible] = useState(false);
  const [cnicBackIndex, setCnicBackIndex] = useState(0);
  const cnicBackImages = [{ uri: `https://bm.punjab.gov.pk/uploads/fathercnic/${fcnicback}` }];

  const openCnicBackViewer = (index) => {
    setCnicBackIndex(index);
    setIsCnicBackVisible(true);
  };

  const closeCnicBackViewer = () => {
    setIsCnicBackVisible(false);
  };
  // State and functions for Groom CNIC Front
const [isGroomCnicFrontVisible, setIsGroomCnicFrontVisible] = useState(false);
const [groomCnicFrontIndex, setGroomCnicFrontIndex] = useState(0);
const groomCnicFrontImages = [{ uri: `https://bm.punjab.gov.pk/uploads/groomcnic/${gcnicfImage}` }];

const openGroomCnicFrontViewer = (index) => {
  setGroomCnicFrontIndex(index);
  setIsGroomCnicFrontVisible(true);
};

const closeGroomCnicFrontViewer = () => {
  setIsGroomCnicFrontVisible(false);
};

// State and functions for Groom CNIC Back
const [isGroomCnicBackVisible, setIsGroomCnicBackVisible] = useState(false);
const [groomCnicBackIndex, setGroomCnicBackIndex] = useState(0);
const groomCnicBackImages = [{ uri: `https://bm.punjab.gov.pk/uploads/groomcnic/${gcnicbImage}` }];

const openGroomCnicBackViewer = (index) => {
  setGroomCnicBackIndex(index);
  setIsGroomCnicBackVisible(true);
};

const closeGroomCnicBackViewer = () => {
  setIsGroomCnicBackVisible(false);
};

// State and functions for Bride CNIC Front
const [isBrideCnicFrontVisible, setIsBrideCnicFrontVisible] = useState(false);
const [brideCnicFrontIndex, setBrideCnicFrontIndex] = useState(0);
const brideCnicFrontImages = [{ uri: `https://bm.punjab.gov.pk/uploads/bridecnic/${bcnicfImage}` }];

const openBrideCnicFrontViewer = (index) => {
  setBrideCnicFrontIndex(index);
  setIsBrideCnicFrontVisible(true);
};

const closeBrideCnicFrontViewer = () => {
  setIsBrideCnicFrontVisible(false);
};

// State and functions for Bride CNIC Back
const [isBrideCnicBackVisible, setIsBrideCnicBackVisible] = useState(false);
const [brideCnicBackIndex, setBrideCnicBackIndex] = useState(0);
const brideCnicBackImages = [{ uri: `https://bm.punjab.gov.pk/uploads/bridecnic/${bcnicbImage}` }];

const openBrideCnicBackViewer = (index) => {
  setBrideCnicBackIndex(index);
  setIsBrideCnicBackVisible(true);
};

const closeBrideCnicBackViewer = () => {
  setIsBrideCnicBackVisible(false);
};

 //----------------------------------//




  const checkpwdDetail = (UserBmId) => {
   console.log('BM User ID==u=', `${baseUrl[0]}/apiformbmallshow/${UserBmId}`)
    fetch(`${baseUrl[0]}/apiformbmallshow/${UserBmId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'secret': 'secret key',
      },
    })
  
      .then(respBM => respBM.json())
      .then(resppwd => {


        console.log('Assessment Detail Check User', resppwd)/* 247 */
        console.log('Assessment Detail Check Education', resppwd['BM  Education'])/* 247 */
        console.log('Assessment Detail Check Medical', resppwd['BM Medical'])/* 247 */
        console.log('Assessment Detail Check Marriage', resppwd['BM Marriage'])/* 247 */
        console.log('Assessment Detail Check Disable', resppwd['BM Disable'])/* 247 */
        // console.log('Assessment Detail Check Register', resppwd['BM Register'][0]['id'])/* 247 */

      //  resppwd["BM Medical"] != undefined || resppwd["BM Medical"] != [] || resppwd["BM Medical"] != null ? setMedicalCheck(!medicalCheck):false;
      //  resppwd["BM  Education"] != undefined || resppwd["BM  Education"]!=[] || resppwd["BM  Education"] != null  ? setEducationCheck(!educationCheck):false;
      //  resppwd["BM Marriage"] != undefined ||  resppwd["BM Marriage"] != [] || resppwd["BM Marriage"] != null ? setMarraigeCheck(!marriageCheck):false;
      //  resppwd["BM Disable"] != undefined || resppwd["BM Disable"] !=[] || resppwd["BM Disable"] != null ? setDisableCheck(!disableCheck):false;
      
        if (resppwd['BM Register'][0]['id'] != '') {

          // console.log('Assessment Detail Check Register Inner', resppwd['BM Register'][0]['id'])/* 247 */
          const BMRegister      = resppwd['BM Register'][0];
          const marraigeDetails = resppwd['BM Marriage'][0];
          const disable         = resppwd['BM Disable'][0];
          const medical         = resppwd['BM Medical'][0];
          const education       = resppwd['BM  Education'][0];

        
          console.log('Regsiter data', BMRegister)
          console.log('Education data', education)
          console.log('Marriage Details', marraigeDetails)
          console.log('Medical data', medical)
          console.log('Disable data', disable)

          setMarraigeCheck(marraigeDetails)
          setMedicalCheck(medical)
          setEducationCheck(education)
          setDisableCheck(disable)

          const reg_date  = resppwd['BM Register'][0].reg_date;
          setreg_date(reg_date);
          const yourincome  = resppwd['BM Register'][0].yourincome;
          setYourincome(yourincome);
          const parentincome  = resppwd['BM Register'][0].parentincome;
          setParentincome(parentincome);
          // const affidavite  = resppwd['BM Register'][0].affidavite;
          // setAffidavite(affidavite);
          const service  = resppwd['BM Register'][0].service;
          setService(service);
          const otherservice  = resppwd['BM Register'][0].otherservice;
          setGovernmentData(otherservice);


          if(education!=undefined){


            const studentname  = resppwd['BM  Education'][0].studentname;
            console.log('student name', studentname)
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
            
            const admcerti  = resppwd['BM  Education'][0].admcerti;
            setAddmissionCertedu(admcerti);
            const deathcerti  = resppwd['BM  Education'][0].deathcerti;
            setDeathEdu(deathcerti);
            const disablecerti  = resppwd['BM  Education'][0].disablecerti;
            setDisEdu(disablecerti);

            const fcnic  = resppwd['BM  Education'][0].fcnic;
            setFathercnicf(fcnic);
            const fcnicback  = resppwd['BM  Education'][0].fcnicback;
            setFathercnicb(fcnicback);
            const hostelcerti  = resppwd['BM  Education'][0].hostelcerti;
            setHosteledu(hostelcerti);
            const nohostelcerti  = resppwd['BM  Education'][0].nohostelcerti;
            setNonHosteledu(nohostelcerti);

            const resultcard  = resppwd['BM  Education'][0].resultcard;
            setResultedu(resultcard);
            const scholcerti  = resppwd['BM  Education'][0].scholcerti;
            setSchooledu(scholcerti);
            const scnic  = resppwd['BM  Education'][0].scnic;
            setscniceduf(scnic);
            const scnicback  = resppwd['BM  Education'][0].scnicback;
            setscnicedub(scnicback);
            const slip  = resppwd['BM  Education'][0].slip;
            setslipedu(slip);

          }else if(medical!=undefined){


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
          }else if(disable!=undefined){


            const expense = disable.expensedetail;
            setExpensedetaildis(expense)
            const residencedis = disable.residence;
            setResidence(residencedis)
            const rent = disable.houserent;
            setHouserentdis(rent)
            const skill = disable.skill;
            setSkilldis(skill)
            const need = disable.need;
            setFinNeed(need)
            const purpose = disable.purpose;
            setPurposeDdis(purpose)
            const property = disable.property;
            setPropertdis(property)
            const deathcerti = disable.deathcerti;
            // console.log('death certticate',`http://192.168.10.11:80/uploads/death/${deathcerti}`)
            setDeathCerti(deathcerti)
            const disablecerti = disable.disablecerti;
            setDiscert(disablecerti)
            const cnicfront = disable.cnicfront;
            setCnicdis(cnicfront)
            const backcnic = disable.backcnic;
            setCnicbdis(backcnic)
          }else if(marraigeDetails!=undefined){


            const sourceofincome  = resppwd['BM Marriage'][0].sourceofincome;
            setSourceofincome(sourceofincome);
            const bridename  = resppwd['BM Marriage'][0].bridename;
            setBridename(bridename);
            const bridecnic  = resppwd['BM Marriage'][0].bridecnic;
            setBridecnic(bridecnic);
            const brideage  = resppwd['BM Marriage'][0].brideage;
            setBrideage(brideage);
            const groomname  = resppwd['BM Marriage'][0].groomname;
            setGroomname(groomname);
            const groomfathername  = resppwd['BM Marriage'][0].groomfathername;
            setGroomfathername(groomfathername);
            const groomcnic  = resppwd['BM Marriage'][0].groomcnic;
            setGroomcnic(groomcnic);
            const groomaddress  = resppwd['BM Marriage'][0].groomaddress;
            setGroomaddress(groomaddress);
            const income  = resppwd['BM Marriage'][0].income;
            setIncome(income);
            const margdate  = resppwd['BM Marriage'][0].margdate;
            setMargdate(margdate);
            const married  = resppwd['BM Marriage'][0].married;
            setMarried(married);
            const adate  = resppwd['BM Marriage'][0].adate;
            setAdate(adate);
            const regname  = resppwd['BM Marriage'][0].regname;
            setRegname(regname);
            const regaddress  = resppwd['BM Marriage'][0].regaddress;
            setRegaddress(regaddress);
            const groomcnicfront  = resppwd['BM Marriage'][0].groomcnicfront;
            setGcnicfImage(groomcnicfront);
            const groomcnicback  = resppwd['BM Marriage'][0].groomcnicback;
            setGcnicbImage(groomcnicback);
            const bridecnicfront  = resppwd['BM Marriage'][0].bridecnicfront;
            setBcnicfImage(bridecnicfront);
            const bridecnicback  = resppwd['BM Marriage'][0].bridecnicback;
            setBcnicbImage(bridecnicback);
          }






          // const bridename  = resppwd['BM Marriage'][0].bridename;
          // setBridename(bridename);
          // const bridename  = resppwd['BM Marriage'][0].bridename;
          // setBridename(bridename);

          setBmUserId(resppwd['BM Register'][0]['id'])
          // setDdVerify(resppwd['BM Register'][0]['ddverify'])
          // setDeoVerify(resppwd['BM Register'][0]['deoverify'])
          // setAmount(resppwd['BM Register'][0]['amount'])
          // setCheckcopy(resppwd['BM Register'][0]['checkcopy'])
   
         

          //Family Detail
          // const rname  = resppwd['BM Relative'][0].rname;
          // setRname(rname);
          //Education
          // const expensedetail  = resppwd['BM Medical'][0].expensedetail;
          // console.log('expensedetail',expensedetail)
          
          //medical
         

          //response condition
            //Disable
           
            const expensedetaildis  = resppwd['BM Disable'][0].expensedetail;
            // const expensedetailmed  = resppwd['BM Medical'][0].expensedetailmed;
            // // console.log('expensedetail',expensedetail)
            // const residencemed  = resppwd['BM Medical'][0].residence;
            // const houserentmed  = resppwd['BM Medical'][0].houserentmed;
            setExpensedetaildis(expensedetaildis);    
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
 
// console.log(medicalCheck,marriageCheck,educationCheck,disableCheck)
  
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
                      <View style={styles.row}>
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
                        {/* <Text style={{marginTop:10,fontWeight:"bold",color:"#000000"}}>Government Services:</Text>
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
                        </View> */}

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
                    {medicalCheck!=undefined ?
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

                      <View>
      {/* ... (existing code) */}

      {/* Own/Parent/Guardian CNIC Front */}
      <TouchableOpacity onPress={() => openCnicFrontViewer(0)}>
        <Text style={{ marginTop: 15, fontWeight: 'bold', color: '#000000' }}>Own/Parent/Guardian CNIC Front:</Text>
        <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 3, height: 70 }}>
          {fcnic !== '' ? (
            <Image source={{ uri: `https://bm.punjab.gov.pk/uploads/fathercnic/${fcnic}` }} style={{ width: '100%', height: 60, resizeMode: 'contain', top: 3 }} />
          ) : (
            ''
          )}
        </View>
      </TouchableOpacity>

      {/* Image Viewer for Own/Parent/Guardian CNIC Front */}
      <ImageView
        images={cnicFrontImages}
        imageIndex={cnicFrontIndex}
        visible={isCnicFrontVisible}
        onRequestClose={closeCnicFrontViewer}
        presentationStyle="overFullScreen"
        backgroundColor="black"
      />

      {/* Own/Parent/Guardian CNIC Back */}
      <TouchableOpacity onPress={() => openCnicBackViewer(0)}>
        <Text style={{ marginTop: 15, fontWeight: 'bold', color: '#000000' }}>Own/Parent/Guardian CNIC Back:</Text>
        <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 3, height: 70 }}>
          {fcnicback !== '' ? (
            <Image source={{ uri: `https://bm.punjab.gov.pk/uploads/fathercnic/${fcnicback}` }} style={{ width: '100%', height: 60, resizeMode: 'contain', top: 3 }} />
          ) : (
            ''
          )}
        </View>
      </TouchableOpacity>

      {/* Image Viewer for Own/Parent/Guardian CNIC Back */}
      <ImageView
        images={cnicBackImages}
        imageIndex={cnicBackIndex}
        visible={isCnicBackVisible}
        onRequestClose={closeCnicBackViewer}
        presentationStyle="overFullScreen"
        backgroundColor="black"
      />
    </View>
                    </View>
                    :<View>
                      <Text style={{padding:20,color:'#444',fontStyle:'normal', fontWeight:'700'}}>No Record Found of Medical Treatment</Text>
                      </View>}
                    {/*-------------------------------------------- Disable starts ----------------------------------------------------------------------*/}
                 
                    {disableCheck!=undefined ?
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
                            placeholder={houserentdis}
                            style={[styles.BMshowFormTextInput
                              // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                            ]}

                            value={houserentdis}

                          />
                        </View>
                        <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Does the Applicant know any additional skills?</Text>
                        <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                          <TextInput
                            placeholderColor="#c4c3cb"
                            placeholder={skilldis}
                            style={[styles.BMshowFormTextInput
                              // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                            ]}

                            value={skilldis}

                          />
                        </View>
                        <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Why You Need Financial Assisstance?</Text>
                        <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                          <TextInput
                            placeholderColor="#c4c3cb"
                            placeholder={fneed}
                            style={[styles.BMshowFormTextInput
                              // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                            ]}

                            value={fneed}

                          />
                        </View>
                        <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Purpose Of Financial Assisstance?</Text>
                        <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                          <TextInput
                            placeholderColor="#c4c3cb"
                            placeholder={pdis}
                            style={[styles.BMshowFormTextInput
                              // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                            ]}

                            value={pdis}

                          />
                        </View>
                        <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Applicants/Family Member's Personal Property</Text>
                        <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                          <TextInput
                            placeholderColor="#c4c3cb"
                            placeholder={propertydis}
                            style={[styles.BMshowFormTextInput
                              // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                            ]}

                            value={propertydis}

                          />
                        </View>
 <View>
      {/* If Widow, Death Certificate Of Husband */}
      <TouchableOpacity onPress={() => openDeathCertiViewer(0)}>
        <Text style={{ marginTop: 15, fontWeight: 'bold', color: '#000000' }}>
          If Widow, Death Certificate Of Husband
        </Text>
        <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 3, height: 70 }}>
          {deathcerti !== '' ? (
            <Image source={{ uri: `https://bm.punjab.gov.pk/uploads/death/${deathcerti}` }} style={{ width: '100%', height: 60, resizeMode: 'contain', top: 3 }} />
          ) : (
            ''
          )}
        </View>
      </TouchableOpacity>

      {/* Image Viewer for If Widow, Death Certificate Of Husband */}
      <ImageView
        images={deathCertiImages}
        imageIndex={deathCertiIndex}
        visible={isDeathCertiVisible}
        onRequestClose={closeDeathCertiViewer}
        presentationStyle="overFullScreen"
        backgroundColor="black"
      />

      {/* If Disable upload Disability Certificate */}
      <TouchableOpacity onPress={() => openDiscertViewer(0)}>
        <Text style={{ marginTop: 15, fontWeight: 'bold', color: '#000000' }}>If Disable upload Disability Certificate</Text>
        <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 3, height: 70 }}>
          {discert !== '' ? (
            <Image source={{ uri: `https://bm.punjab.gov.pk/uploads/death/${discert}` }} style={{ width: '100%', height: 60, resizeMode: 'contain', top: 3 }} />
          ) : (
            ''
          )}
        </View>
      </TouchableOpacity>

      {/* Image Viewer for If Disable upload Disability Certificate */}
      <ImageView
        images={discertImages}
        imageIndex={discertIndex}
        visible={isDiscertVisible}
        onRequestClose={closeDiscertViewer}
        presentationStyle="overFullScreen"
        backgroundColor="black"
      />
    </View>
                        <View>
                        {/* Applicant cnic front */}
                        <TouchableOpacity onPress={() => openApplicantImageViewer(0)}>
                          <Text style={{ marginTop: 15, fontWeight: 'bold', color: '#000000' }}>Applicant cnic front</Text>
                          <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 3, height: 70 }}>
                            {cnicdis !== '' ? (
                              <Image source={{ uri: `https://bm.punjab.gov.pk/uploads/cnic/${cnicdis}` }} style={{ width: '100%', height: 60, resizeMode: 'contain', top: 3 }} />
                            ) : (
                              ''
                            )}
                          </View>
                        </TouchableOpacity>

                        <ImageView
                          images={applicantImages}
                          imageIndex={imageIndex}
                          visible={isApplicantImageViewVisible}
                          onRequestClose={closeApplicantImageViewer}
                          presentationStyle="overFullScreen" // Center the image
                          backgroundColor="black" // Set the background color
                        />
                        </View>
                        <View>
                        {/* Applicant cnic back */}
                        <TouchableOpacity onPress={() => openApplicantCnicBackViewer(0)}>
                          <Text style={{ marginTop: 15, fontWeight: 'bold', color: '#000000' }}>Applicant cnic back</Text>
                          <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 3, height: 70 }}>
                            {cnicbdis !== '' ? (
                              <Image source={{ uri: `https://bm.punjab.gov.pk/uploads/cnic/${cnicbdis}` }} style={{ width: '100%', height: 60, resizeMode: 'contain', top: 3 }} />
                            ) : (
                              ''
                            )}
                          </View>
                        </TouchableOpacity>

                        <ImageView
                          images={applicantCnicBackImages}
                          imageIndex={applicantCnicBackIndex}
                          visible={isApplicantCnicBackVisible}
                          onRequestClose={closeApplicantCnicBackViewer}
                          presentationStyle="overFullScreen"
                          backgroundColor="black"
                        />
                      </View>
                    </View>
                    :<View>
                    <Text style={{padding:20,color:'#444',fontStyle:'normal', fontWeight:'700'}}>No Record Found of Disability</Text>
                    </View>}
                    {/*-------------------------------------------- Disable ends ----------------------------------------------------------------------*/}  

                    {/*-------------------------------------------- Marriage start ----------------------------------------------------------------------*/}  
                    {marriageCheck!=undefined ?
                    <View>
                      <View
                        style={styles.row}>
                        <Text style={{color:'black',fontSize:16,textAlign: 'center',textDecorationLine: 'underline',fontWeight:'bold' }}>MARRIAGE GRANT</Text>
                      </View>

                        <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Your Source of Income:</Text>
                        <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                          <TextInput
                            placeholderColor="#c4c3cb"
                            placeholder={sourceofincome}
                            style={[styles.BMshowFormTextInput
                              // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                            ]}

                            value={sourceofincome}

                          />
                        </View>

                        <Text style={{marginTop:10,fontWeight:"bold",color:"#002D62"}}>BRIDE'S INFORMATION:</Text>
                        <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Name</Text>
                        <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                          <TextInput
                            placeholderColor="#c4c3cb"
                            placeholder={bridename}
                            style={[styles.BMshowFormTextInput
                              // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                            ]}

                            value={bridename}

                          />
                        </View>

                        <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>CNIC:</Text>
                        <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                          <TextInput
                            placeholderColor="#c4c3cb"
                            placeholder={bridecnic}
                            style={[styles.BMshowFormTextInput
                              // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                            ]}

                            value={bridecnic}

                          />
                        </View>

                        
                        <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Age:</Text>
                        <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                          <TextInput
                            placeholderColor="#c4c3cb"
                            placeholder={brideage}
                            style={[styles.BMshowFormTextInput
                              // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                            ]}

                            value={brideage}

                          />
                        </View>

                        <Text style={{marginTop:10,fontWeight:"bold",color:"#002D62"}}>GROOM'S INFORMATION:</Text>
                        <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Groom's Name</Text>
                        <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                          <TextInput
                            placeholderColor="#c4c3cb"
                            placeholder={groomname}
                            style={[styles.BMshowFormTextInput
                              // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                            ]}

                            value={groomname}

                          />
                        </View>

                        <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Father Name</Text>
                        <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                          <TextInput
                            placeholderColor="#c4c3cb"
                            placeholder={groomfathername}
                            style={[styles.BMshowFormTextInput
                              // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                            ]}

                            value={groomfathername}

                          />
                        </View>

                        <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>CNIC</Text>
                        <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                          <TextInput
                            placeholderColor="#c4c3cb"
                            placeholder={groomcnic}
                            style={[styles.BMshowFormTextInput
                              // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                            ]}

                            value={groomcnic}

                          />
                        </View>

                        <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Address</Text>
                        <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                          <TextInput
                            placeholderColor="#c4c3cb"
                            placeholder={groomaddress}
                            style={[styles.BMshowFormTextInput
                              // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                            ]}

                            value={groomaddress}

                          />
                        </View>

                        <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Monthly Income</Text>
                        <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                          <TextInput
                            placeholderColor="#c4c3cb"
                            placeholder={income}
                            style={[styles.BMshowFormTextInput
                              // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                            ]}

                            value={income}

                          />
                        </View>

                        <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Date Of Marriage</Text>
                        <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                          <TextInput
                            placeholderColor="#c4c3cb"
                            placeholder={margdate}
                            style={[styles.BMshowFormTextInput
                              // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                            ]}

                            value={margdate}

                          />
                        </View>

                        <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Already Nikkah Done</Text>
                        <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                          <TextInput
                            placeholderColor="#c4c3cb"
                            placeholder={married}
                            style={[styles.BMshowFormTextInput
                              // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                            ]}

                            value={married}

                          />
                        </View>

                        <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>If Yes,Nikkah Date</Text>
                        <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                          <TextInput
                            placeholderColor="#c4c3cb"
                            placeholder={adate}
                            style={[styles.BMshowFormTextInput
                              // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                            ]}

                            value={adate}

                          />
                        </View>

                        <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Marriage Registrar Name</Text>
                        <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                          <TextInput
                            placeholderColor="#c4c3cb"
                            placeholder={regname}
                            style={[styles.BMshowFormTextInput
                              // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                            ]}

                            value={regname}

                          />
                        </View>

                        
                        <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Marriage Registrar Address</Text>
                        <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                        <TextInput
                          placeholderColor="#c4c3cb"
                          placeholder={regaddress}
                          style={[styles.BMshowFormTextInput
                            // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                          ]}

                          value={regaddress}

                        />
                        </View>

                        <View>
    {/* ... (existing code) */}

    {/* Groom CNIC Front */}
    <TouchableOpacity onPress={() => openGroomCnicFrontViewer(0)}>
      <Text style={{ marginTop: 15, fontWeight: 'bold', color: '#000000' }}>Groom CNIC Front:</Text>
      <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 3, height: 70 }}>
        {gcnicfImage !== '' ? (
          <Image source={{ uri: `https://bm.punjab.gov.pk/uploads/groomcnic/${gcnicfImage}` }} style={{ width: '100%', height: 60, resizeMode: 'contain', top: 3 }} />
        ) : (
          ''
        )}
      </View>
    </TouchableOpacity>

    {/* Image Viewer for Groom CNIC Front */}
    <ImageView
      images={groomCnicFrontImages}
      imageIndex={groomCnicFrontIndex}
      visible={isGroomCnicFrontVisible}
      onRequestClose={closeGroomCnicFrontViewer}
      presentationStyle="overFullScreen"
      backgroundColor="black"
    />

    {/* Groom CNIC Back */}
    <TouchableOpacity onPress={() => openGroomCnicBackViewer(0)}>
      <Text style={{ marginTop: 15, fontWeight: 'bold', color: '#000000' }}>Groom CNIC Back:</Text>
      <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 3, height: 70 }}>
        {gcnicbImage !== '' ? (
          <Image source={{ uri: `https://bm.punjab.gov.pk/uploads/groomcnic/${gcnicbImage}` }} style={{ width: '100%', height: 60, resizeMode: 'contain', top: 3 }} />
        ) : (
          ''
        )}
      </View>
    </TouchableOpacity>

    {/* Image Viewer for Groom CNIC Back */}
    <ImageView
      images={groomCnicBackImages}
      imageIndex={groomCnicBackIndex}
      visible={isGroomCnicBackVisible}
      onRequestClose={closeGroomCnicBackViewer}
      presentationStyle="overFullScreen"
      backgroundColor="black"
    />

    {/* Bride CNIC Front */}
    <TouchableOpacity onPress={() => openBrideCnicFrontViewer(0)}>
      <Text style={{ marginTop: 15, fontWeight: 'bold', color: '#000000' }}>Bride CNIC Front:</Text>
      <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 3, height: 70 }}>
        {bcnicfImage !== '' ? (
          <Image source={{ uri: `https://bm.punjab.gov.pk/uploads/bridecnic/${bcnicfImage}` }} style={{ width: '100%', height: 60, resizeMode: 'contain', top: 3 }} />
        ) : (
          ''
        )}
      </View>
    </TouchableOpacity>

    {/* Image Viewer for Bride CNIC Front */}
    <ImageView
      images={brideCnicFrontImages}
      imageIndex={brideCnicFrontIndex}
      visible={isBrideCnicFrontVisible}
      onRequestClose={closeBrideCnicFrontViewer}
      presentationStyle="overFullScreen"
      backgroundColor="black"
    />

    {/* Bride CNIC Back */}
    <TouchableOpacity onPress={() => openBrideCnicBackViewer(0)}>
      <Text style={{ marginTop: 15, fontWeight: 'bold', color: '#000000' }}>Bride CNIC Back:</Text>
      <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 3, height: 70 }}>
        {bcnicbImage !== '' ? (
          <Image source={{ uri: `https://bm.punjab.gov.pk/uploads/bridecnic/${bcnicbImage}` }} style={{ width: '100%', height: 60, resizeMode: 'contain', top: 3 }} />
        ) : (
          ''
        )}
      </View>
    </TouchableOpacity>

    {/* Image Viewer for Bride CNIC Back */}
    <ImageView
      images={brideCnicBackImages}
      imageIndex={brideCnicBackIndex}
      visible={isBrideCnicBackVisible}
      onRequestClose={closeBrideCnicBackViewer}
      presentationStyle="overFullScreen"
      backgroundColor="black"
    />
  </View>
                    </View>
                      :<View>
                      <Text style={{padding:20,color:'#444',fontStyle:'normal', fontWeight:'700'}}>No Record Found of Marriage Grant</Text>
                      </View>}
                  {/*-------------------------------------------- Marriage ends here ----------------------------------------------------------------------*/}

                  {/*-------------------------------------------- Education data ----------------------------------------------------------------------*/}
                  {educationCheck!=undefined ?
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
                          placeholder={obmarksedu}
                          editable={false}
                          style={[styles.BMshowFormTextInput
                            // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                          ]}

                          value={obmarksedu}

                        />
                        </View>
                        <View>
                              {/* Father/Guardian CNIC Front */}
                              <TouchableOpacity onPress={() => openFatehrcnicfViewer(0)}>
                                <Text style={{ marginTop: 15, fontWeight: 'bold', color: '#000000' }}>Father/Guardian CNIC Front</Text>
                                <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 3, height: 70 }}>
                                  {fatehrcnicf !== '' ? (
                                    <Image source={{ uri: `https://bm.punjab.gov.pk/uploads/fathercnic/${fatehrcnicf}` }} style={{ width: '100%', height: 60, resizeMode: 'contain', top: 3 }} />
                                  ) : (
                                    ''
                                  )}
                                </View>
                              </TouchableOpacity>

                              {/* Image Viewer for Father/Guardian CNIC Front */}
                              <ImageView
                                images={fatehrcnicfImages}
                                imageIndex={fatehrcnicfIndex}
                                visible={isFatehrcnicfVisible}
                                onRequestClose={closeFatehrcnicfViewer}
                                presentationStyle="overFullScreen"
                                backgroundColor="black"
                              />
                        </View>
                      {/* Father/Guardian CNIC Back */}
                      <View>
                      <TouchableOpacity onPress={() => openFatehrcnicbViewer(0)}>
                        <Text style={{ marginTop: 15, fontWeight: 'bold', color: '#000000' }}>Father/Guardian CNIC Back</Text>
                        <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 3, height: 70 }}>
                          {fatehrcnicb !== '' ? (
                            <Image source={{ uri: `https://bm.punjab.gov.pk/uploads/fathercnic/${fatehrcnicb}` }} style={{ width: '100%', height: 60, resizeMode: 'contain', top: 3 }} />
                          ) : (
                            ''
                          )}
                        </View>
                      </TouchableOpacity>

                      {/* Image Viewer for Father/Guardian CNIC Back */}
                      <ImageView
                        images={fatehrcnicbImages}
                        imageIndex={fatehrcnicbIndex}
                        visible={isFatehrcnicbVisible}
                        onRequestClose={closeFatehrcnicbViewer}
                        presentationStyle="overFullScreen"
                        backgroundColor="black"
                      />

                      {/* ... (existing code for other sections) */}
                    </View>

                        <View>
      {/* Student CNIC Front */}
      <TouchableOpacity onPress={() => openScnicedufViewer(0)}>
        <Text style={{ marginTop: 15, fontWeight: 'bold', color: '#000000' }}>Student CNIC Front</Text>
        <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 3, height: 70 }}>
          {scniceduf !== '' ? (
            <Image source={{ uri: `https://bm.punjab.gov.pk/uploads/studentcnic/${scniceduf}` }} style={{ width: '100%', height: 60, resizeMode: 'contain', top: 3 }} />
          ) : (
            ''
          )}
        </View>
      </TouchableOpacity>

      {/* Image Viewer for Student CNIC Front */}
      <ImageView
        images={scnicedufImages}
        imageIndex={scnicedufIndex}
        visible={isScnicedufVisible}
        onRequestClose={closeScnicedufViewer}
        presentationStyle="overFullScreen"
        backgroundColor="black"
      />

      {/* Student CNIC Back */}
      <TouchableOpacity onPress={() => openScnicedubViewer(0)}>
        <Text style={{ marginTop: 15, fontWeight: 'bold', color: '#000000' }}>Student CNIC Back</Text>
        <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 3, height: 70 }}>
          {scnicedub !== '' ? (
            <Image source={{ uri: `https://bm.punjab.gov.pk/uploads/studentcnic/${scnicedub}` }} style={{ width: '100%', height: 60, resizeMode: 'contain', top: 3 }} />
          ) : (
            ''
          )}
        </View>
      </TouchableOpacity>

      {/* Image Viewer for Student CNIC Back */}
      <ImageView
        images={scnicedubImages}
        imageIndex={scnicedubIndex}
        visible={isScnicedubVisible}
        onRequestClose={closeScnicedubViewer}
        presentationStyle="overFullScreen"
        backgroundColor="black"
      />
    </View>

                        <View>
      {/* Father/Guardian Salary Slip */}
      <TouchableOpacity onPress={() => openSlipeduViewer(0)}>
        <Text style={{ marginTop: 15, fontWeight: 'bold', color: '#000000' }}>Father/Guardian Salary Slip</Text>
        <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 3, height: 70 }}>
          {slipedu !== '' ? (
            <Image source={{ uri: `https://bm.punjab.gov.pk/uploads/salaryslip/${slipedu}` }} style={{ width: '100%', height: 60, resizeMode: 'contain', top: 3 }} />
          ) : (
            ''
          )}
        </View>
      </TouchableOpacity>

      {/* Image Viewer for Father/Guardian Salary Slip */}
      <ImageView
        images={slipEduImages}
        imageIndex={slipeduIndex}
        visible={isSlipeduVisible}
        onRequestClose={closeSlipeduViewer}
        presentationStyle="overFullScreen"
        backgroundColor="black"
      />

      {/* Death Certificate Of Father (If Orphan) */}
      <TouchableOpacity onPress={() => openDeatheduViewer(0)}>
        <Text style={{ marginTop: 15, fontWeight: 'bold', color: '#000000' }}>Death Certificate Of Father (If Orphan)</Text>
        <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 3, height: 70 }}>
          {deathedu !== '' ? (
            <Image source={{ uri: `https://bm.punjab.gov.pk/uploads/death/${deathedu}` }} style={{ width: '100%', height: 60, resizeMode: 'contain', top: 3 }} />
          ) : (
            ''
          )}
        </View>
      </TouchableOpacity>

      {/* Image Viewer for Death Certificate Of Father (If Orphan) */}
      <ImageView
        images={deathEduImages}
        imageIndex={deatheduIndex}
        visible={isDeatheduVisible}
        onRequestClose={closeDeatheduViewer}
        presentationStyle="overFullScreen"
        backgroundColor="black"
      />

      {/* Disability Certificate (If Disable) */}
      <TouchableOpacity onPress={() => openDiseduViewer(0)}>
        <Text style={{ marginTop: 15, fontWeight: 'bold', color: '#000000' }}>Disability Certificate (If Disable)</Text>
        <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 3, height: 70 }}>
          {disedu !== '' ? (
            <Image source={{ uri: `https://bm.punjab.gov.pk/uploads/disability/${disedu}` }} style={{ width: '100%', height: 60, resizeMode: 'contain', top: 3 }} />
          ) : (
            ''
          )}
        </View>
      </TouchableOpacity>

      {/* Image Viewer for Disability Certificate (If Disable) */}
      <ImageView
        images={disEduImages}
        imageIndex={diseduIndex}
        visible={isDiseduVisible}
        onRequestClose={closeDiseduViewer}
        presentationStyle="overFullScreen"
        backgroundColor="black"
      />
    </View>
                       <View>
      {/* Admission Certificate Of Institute */}
      <TouchableOpacity onPress={() => openAddCertViewer(0)}>
        <Text style={{ marginTop: 15, fontWeight: 'bold', color: '#000000' }}>Admission Certificate Of Institute</Text>
        <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 3, height: 70 }}>
          {addCert !== '' ? (
            <Image source={{ uri: `https://bm.punjab.gov.pk/uploads/admission/${addCert}` }} style={{ width: '100%', height: 60, resizeMode: 'contain', top: 3 }} />
          ) : (
            ''
          )}
        </View>
      </TouchableOpacity>

      {/* Image Viewer for Admission Certificate Of Institute */}
      <ImageView
        images={addCertImages}
        imageIndex={addCertIndex}
        visible={isAddCertVisible}
        onRequestClose={closeAddCertViewer}
        presentationStyle="overFullScreen"
        backgroundColor="black"
      />

      {/* Result Card Of Previous Final Exam */}
      <TouchableOpacity onPress={() => openResulteduViewer(0)}>
        <Text style={{ marginTop: 15, fontWeight: 'bold', color: '#000000' }}>Result Card Of Previous Final Exam</Text>
        <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 3, height: 70 }}>
          {resultedu !== '' ? (
            <Image source={{ uri: `https://bm.punjab.gov.pk/uploads/resultcard/${resultedu}` }} style={{ width: '100%', height: 60, resizeMode: 'contain', top: 3 }} />
          ) : (
            ''
          )}
        </View>
      </TouchableOpacity>

      {/* Image Viewer for Result Card Of Previous Final Exam */}
      <ImageView
        images={resultEduImages}
        imageIndex={resulteduIndex}
        visible={isResulteduVisible}
        onRequestClose={closeResulteduViewer}
        presentationStyle="overFullScreen"
        backgroundColor="black"
      />

      {/* Scholarship Certificate */}
      <TouchableOpacity onPress={() => openSchooleduViewer(0)}>
        <Text style={{ marginTop: 15, fontWeight: 'bold', color: '#000000' }}>Scholarship Certificate</Text>
        <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 3, height: 70 }}>
          {schooledu !== '' ? (
            <Image source={{ uri: `https://bm.punjab.gov.pk/uploads/scholarship/${schooledu}` }} style={{ width: '100%', height: 60, resizeMode: 'contain', top: 3 }} />
          ) : (
            ''
          )}
        </View>
      </TouchableOpacity>

      {/* Image Viewer for Scholarship Certificate */}
      <ImageView
        images={schoolEduImages}
        imageIndex={schooleduIndex}
        visible={isSchooleduVisible}
        onRequestClose={closeSchooleduViewer}
        presentationStyle="overFullScreen"
        backgroundColor="black"
      />
    </View>

      <View>
      {/* Hostel Residence Certificate */}
      <TouchableOpacity onPress={() => openHosteleduViewer(0)}>
        <Text style={{ marginTop: 15, fontWeight: 'bold', color: '#000000' }}>Hostel Residence Certificate</Text>
        <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 3, height: 70 }}>
          {hosteledu !== '' ? (
            <Image source={{ uri: `https://bm.punjab.gov.pk/uploads/hostel/${hosteledu}` }} style={{ width: '100%', height: 60, resizeMode: 'contain', top: 3 }} />
          ) : (
            ''
          )}
        </View>
      </TouchableOpacity>

      {/* Image Viewer for Hostel Residence Certificate */}
      <ImageView
        images={hosteleduImages}
        imageIndex={hosteleduIndex}
        visible={isHosteleduVisible}
        onRequestClose={closeHosteleduViewer}
        presentationStyle="overFullScreen"
        backgroundColor="black"
      />

      {/* If Educational Institute Does Not Offer Hostel Residence Certificate */}
      <TouchableOpacity onPress={() => openNonHosteleduViewer(0)}>
        <Text style={{ marginTop: 15, fontWeight: 'bold', color: '#000000' }}>
          If Educational Institute Does Not Offer Hostel Residence, Attach Certificate
        </Text>
        <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 3, height: 70 }}>
          {nonhosteledu !== '' ? (
            <Image
              source={{ uri: `https://bm.punjab.gov.pk/uploads/nohostel/${nonhosteledu}` }}
              style={{ width: '100%', height: 60, resizeMode: 'contain', top: 3 }}
            />
          ) : (
            ''
          )}
        </View>
      </TouchableOpacity>

      {/* Image Viewer for If Educational Institute Does Not Offer Hostel Residence Certificate */}
      <ImageView
        images={nonHosteleduImages}
        imageIndex={nonHosteleduIndex}
        visible={isNonHosteleduVisible}
        onRequestClose={closeNonHosteleduViewer}
        presentationStyle="overFullScreen"
        backgroundColor="black"
      />
    </View>
                    </View>
                        :<View>
                        <Text style={{padding:20,color:'#444',fontStyle:'normal', fontWeight:'700'}}>No Record Found of Education Stipend</Text>
                        </View>}

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
