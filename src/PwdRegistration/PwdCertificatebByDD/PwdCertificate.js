
import React, { useEffect,useState }  from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  title,
  TouchableOpacity,
  ToastAndroid,
  loading,
  
} from 'react-native';
// import logo from '../../uploads/profileimg/';
// import logo from '../../assets/images/logo.png';
// import datatable  start
// import * as React from 'react';
import { DataTable } from 'react-native-paper';
// import datatable end 
import QRCode from 'react-native-qrcode-svg';
import syncStorage from 'react-native-sync-storage';
import pwdIMage from  '../../../assets/images/background.png';
import { KeyboardAvoidingView,  TextInput  } from "react-native";
import { dateToUnix } from 'react-native-paper-dates/lib/typescript/Date/dateUtils';
// datatable start
const optionsPerPage = [2, , 4];
const PwdCertificate = ({navigation}) => {
  const [districtofd, setdistrit]        = useState('');
  // const [board, setboard]        = useState('');
  const [imageProfile, setimage]      = useState('');
  const [fullname, setFullName]      = useState('');
  const [fathername, setFatherName]  = useState('');
  const [relationship, setrelationship]  = useState('');
  const [ father_spouse_name, setfather_spouse_name]  = useState('');
  const [cnic, setCnic]              = useState('');
  const [maritalstatus, setmaritalstatus]              = useState('');
  const [dob, setDob]                = useState('');
  const [qualification, setQualification]    = useState('');
  // const [typeofd, setType]            = useState('');
  // const [causeofd, setCause]            = useState('');
  const [paddress, setPaddress]        = useState('');
  const [ppaddress, setPpaddress]        = useState('');
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
  const logo = require('../../../assets/images/swo_logo.jpg');
  const govt = require('../../../assets/images/govt.jpg');
  // const imagep = require(`../../../uploads/profileimg/${image}`);

  // Assessment API data
   const [adistrict, setadistrict]        = useState('');
   const [aboard, setaboard]              = useState('');
   const [adate, setadate]                = useState('');
   const [regnum, setregnum]              = useState('');
   const [regdep, setregdep]              = useState('');
   const [fittowork, setfittowork]        = useState('');
   const [fitjob, setfitjob]              = useState('');
   const [dtraining, setdtraining]        = useState('');
  //  const [pwdpinfo_id, setpwdpinfo_id]        = useState('');
  //  const pwdInfoID                = syncStorage.get('pwdinfo_id');
  // const pwdinfoID                         = syncStorage.get('s');
//  console.log('Pwd info ID', pwdInfoID)


   // Start Doctor form data from API required
   const [natureofd, setnatureofd]        = useState('');
   const [causeofd, setcauseofd]        = useState('');
   const [typeofd, settypeofd]        = useState('');
   const [prosthisis, setprosthisis]        = useState('');
   const [mequip, setmequip]        = useState('');
   const [mtreat, setmtreat]        = useState('');
   const pwdInfoID       = syncStorage.get('pwdinfo_id');

//End Doctor form data from API required

 
  useEffect(() =>{
    getpwdinfoDetail();
    getpwdassessDetail();
    getpwddocDetail();
  },[]);

  const getpwdinfoDetail = (pwdinfoDetail) =>{
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

      console.log('response  detail',resppwdinfoDetail['PWD basic info'][0])
      const image   = resppwdinfoDetail['PWD basic info'][0].image;
        // console.log('image', image)
      

        const fullName    = resppwdinfoDetail['PWD basic info'][0].firstname+' '+resppwdinfoDetail['PWD basic info'][0].lastname;
        // console.log('FullName', fullName)
        const relationship    = resppwdinfoDetail['PWD basic info'][0].relationship;
        // console.log('relationship', relationship)
        const father_spouse_name    = resppwdinfoDetail['PWD basic info'][0].father_spouse_name;
        // console.log('father_spouse_name', father_spouse_name)
        const cnic   = resppwdinfoDetail['PWD basic info'][0].cnic;
        // console.log('cnic', cnic)
        const dob   = resppwdinfoDetail['PWD basic info'][0].dob;
        // console.log('dob', dob)
        const maritalstatus   = resppwdinfoDetail['PWD basic info'][0].maritalstatus;
        // console.log('maritalstatus', maritalstatus)
        const qualification   = resppwdinfoDetail['PWD basic info'][0].qualification;
        // console.log('qualification', qualification)
        // const typeofd   = resppwdinfoDetail['PWD basic info'][0].typeofd;
        // console.log('typeofd', typeofd)
        // const causeofd   = resppwdinfoDetail['PWD basic info'][0].causeofd;
        // console.log('causeofd', causeofd)
        const paddress   = resppwdinfoDetail['PWD basic info'][0].paddress;
        // console.log('paddress', paddress)
        const ppaddress   = resppwdinfoDetail['PWD basic info'][0].ppaddress;
        // console.log('ppaddress', ppaddress)

          // setboard(board);
          setimage(image);
          setFullName(fullName);
          setrelationship(relationship);
          setfather_spouse_name(father_spouse_name);
          setCnic(cnic);
          setmaritalstatus(maritalstatus);
          setDob(dob);
          setQualification(qualification);
          // setType(typeofd)
          // setCause(causeofd)
          setPaddress(paddress)
          setPpaddress(ppaddress)
        // getTypeofdData(typeofd)
        // getCauseofdData([typeofd,causeofd])
        // getdistrictofdData(district)
        
    });

  }

// Assessment table API use effect
  const getpwdassessDetail = () =>{
    fetch(`https://dpmis.punjab.gov.pk/api/pwdapp/apiassessment/${pwdInfoID}`, {
      method: 'GET',
      headers:{
        'Accept': 'application/json',
        'Content-Type':'application/json',
        'secret':'pwdreg'
      },
    })
    .then(resppwdassessDetail => resppwdassessDetail.json())
    .then(resppwdassessDetail => {
      
        // console.log('response  assess detail PWD',resppwdassessDetail['PWD assessment'])
        const adistrict   = resppwdassessDetail['PWD assessment'][0].adistrict;
        console.log('adistrict', adistrict)
        const aboard   = resppwdassessDetail['PWD assessment'][0].aboard;
        console.log('aboard', aboard)
        const adate    = resppwdassessDetail['PWD assessment'][0].adate;
        console.log('adate', adate)
        const regnum    = resppwdassessDetail['PWD assessment'][0].regnum ;
        console.log('regnum', regnum )
        const regdep   = resppwdassessDetail['PWD assessment'][0].regdep;
        console.log('regdep', regdep)
        const fittowork   = resppwdassessDetail['PWD assessment'][0].fittowork;
        console.log('fittowork', fittowork)
        const fitjob   = resppwdassessDetail['PWD assessment'][0].fitjob;
        console.log('fitjob', fitjob)
        const dtraining   = resppwdassessDetail['PWD assessment'][0].dtraining;
        console.log('dtraining', dtraining)
        

          setadistrict(adistrict);
          setaboard (aboard);
          setadate(adate);
          setregnum(regnum);
          setregdep(regdep);
          setfittowork(fittowork);
          setfitjob(fitjob);
          setdtraining(dtraining);
        getadistrict(adistrict)
        getaboard(aboard)
    });

  }

// Assessment table API use effect
const getpwddocDetail = () =>{

  fetch(`https://dpmis.punjab.gov.pk/api/pwdapp/docformbypwd/${pwdInfoID}`, {
    method: 'GET',
    headers:{
      'Accept': 'application/json',
      'Content-Type':'application/json',
      'secret':'pwdreg'
    },
  })
  .then(resppwddocDetail => resppwddocDetail.json())
  .then(resppwddocDetail => {
    
      console.log('response  doc detail PWD',resppwddocDetail['docform_pwd'])
      const natureofd   = resppwddocDetail['docform_pwd'][0].natureofd;
      console.log('natureofd', natureofd)
      const causeofd   = resppwddocDetail['docform_pwd'][0].causeofd;
      console.log('causeofd', causeofd)
      const typeofd   = resppwddocDetail['docform_pwd'][0].typeofd;
      console.log('typeofd', typeofd)
      const prosthisis   = resppwddocDetail['docform_pwd'][0].prosthisis;
      console.log('prosthisis', prosthisis)
      const mequip   = resppwddocDetail['docform_pwd'][0].mequip;
      console.log('mequip', mequip)
      const mtreat   = resppwddocDetail['docform_pwd'][0].mtreat;
      console.log('mtreat', mtreat)

      
        setnatureofd (natureofd);
        setcauseofd(causeofd);
        settypeofd(typeofd);
        setprosthisis(prosthisis);
        setmequip(mequip);
        setmtreat(mtreat);
        getTypeofdData(typeofd)
        getCauseofdData([typeofd,causeofd])
        getNatureofdData([typeofd,natureofd])
        getprosthisis(prosthisis);
        getmequipment(mequip);
     
  });
}
//end doc from API

  const getadistrict = (districtofdid) =>{

    console.log('adistrict functino', districtofdid)
    // console.log('Board id', BoardID)
    fetch(`https://dpmis.punjab.gov.pk/api/pwdapp/Districtofd`,{
      method: 'GET',
      headers:{
        'Accept': 'application/json',
          'Content-Type':'application/json',
          'secret':'pwdreg'
      },
    })
    .then(respdistrictofd => respdistrictofd.json())
    .then(respdistrictofdName => {

      console.log('adistrict', respdistrictofdName)
      const districtofdReponse = respdistrictofdName["PWD district"];
      console.log('sdasdasdsadas', districtofdReponse)
      districtofdReponse.map((item, i) => {
        if(item.id == districtofdid){
          setdistrit(item.name)
        }
      });
     
    });
  }
  const getaboard = (districtId) =>{
    console.log('boards', districtId)
    fetch(`https://dpmis.punjab.gov.pk/api/app/getboards/${districtId}`, {
      method: 'GET',
      headers:{

        'Accept': 'application/json',
        'Content-Type':'application/json',
        'secret':'pwdreg'
      },
    })
    .then(respBoard => respBoard.json())
    .then(responseBoard => {

      console.log('aboard', responseBoard)
     
      const boardofdReponse = responseBoard["boards"];
      console.log('board data', boardofdReponse)
      boardofdReponse.map((item, i) => {
        if(item.id == districtId){
          setaboard(item.name)
        }
      });
     
    });
  }
  const getTypeofdData = (typeofdid) =>{
    fetch(`https://dpmis.punjab.gov.pk/api/pwdapp/doctypes`, {
      method: 'GET',
      headers:{
        'Accept': 'application/json',
          'Content-Type':'application/json',
          'secret':'pwdreg'  
      },
    })
    .then(respdistrictofdofd => respdistrictofdofd.json())
    .then(respdistrictofdofdName => {
console.log('response', respdistrictofdofdName)
      const districtofdofdReponse = respdistrictofdofdName['PWD type'];
      console.log('districtofdofds Typeofd', districtofdofdReponse)
      districtofdofdReponse.map((item, i) => {
        if(item.id == typeofdid){
          settypeofd(item.name)
        }
      });
     
    });
  }
  const getCauseofdData = ([typeofd,causeofd]) =>{
    fetch(`https://dpmis.punjab.gov.pk/api/app/causeofd/${typeofd}`, {
      method: 'GET',
      headers:{
        'Accept': 'application/json',
          'Content-Type':'application/json'
      },
    })
    .then(respCause => respCause.json())
    .then(respCauseName => {

      console.log('Cause Name', respCauseName)
      const causeData = respCauseName.causeofd;
      causeData.map((item, i) => {
        if(item.id == causeofd){
          setcauseofd(item.name)
        }
      });
     
    });
  }
  const getNatureofdData = ([typeofd,natureofd]) =>{
    fetch(`https://dpmis.punjab.gov.pk/api/pwdapp/docnatures/${typeofd}`, {
      method: 'GET',
      headers:{
        'Accept': 'application/json',
          'Content-Type':'application/json',
          'secret':'pwdreg'
      },
    })
    .then(respNature => respNature.json())
    .then(respNatureName => {

      console.log('Nature Name', respNatureName["PWD nature "][0])
      const natureData = respNatureName["PWD nature "][0];
      // natureData.map((item, i) => {
        if(natureData.id == natureofd){
          setnatureofd(natureData.name)
        }
      // });
     
    });
  }

  const getprosthisis = (prosthisisid) =>{
    fetch(`https://dpmis.punjab.gov.pk/api/app/prothisis`, {
      method: 'GET',
      headers:{
        'Accept': 'application/json',
          'Content-Type':'application/json',
          'secret':'pwdreg'
      },
    })
    .then(respprosthisis => respprosthisis.json())
    .then(respprosthisisName => {
      console.log('prothisis', respprosthisisName)
      const resprosthisisidd = respprosthisisName["prothisis"];
      resprosthisisidd.map((item, i) => {
        if(item.id == prosthisisid){
          setprosthisis(item.name)
        }
      });
     
    });
  }

  const getmequipment = (mequipmentid) =>{
    fetch(`https://dpmis.punjab.gov.pk/api/app/mequipments`, {
      method: 'GET',
      headers:{
        'Accept': 'application/json',
          'Content-Type':'application/json',
          'secret':'pwdreg'
      },
    })
    .then(respmequipment => respmequipment.json())
    .then(respmequipmentName => {
      console.log('mequipments', respmequipmentName)
      const resmequipmentid = respmequipmentName["mequipments"];
      resmequipmentid.map((item, i) => {
        if(item.id == mequipmentid){
          setmequip(item.name)
        }
      });
     
    });
  }
 
  return (   
    
    <View style={{borderWidth:  0,padding:2,}}>
<ScrollView>
    <DataTable>
      <DataTable.Header style={styles.Header}>
        
        <DataTable.Title style={{ alignItems: 'center' }}>
          <View>
            <Image source={logo} 
            style={{ width: 50, height: 50, borderRadius: 25, }}
            />
          </View>
        </DataTable.Title>
        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center',marginTop:5}}>
        <Text style={{color:'black',fontSize:10,textAlign: 'center',marginRight:10}}>GOVERNMENT OF THE PUNJAB</Text>
        <Text style={{color:'black',fontSize:8,textAlign: 'center'}}>SOCIAL WELFARE AND BAIT-UL-MAAL DEPARTMENT
          (PROVINCIAL COUNCIL FOR THE REHABILITATION OF DISABLE PERSONS)</Text>
        </View>
        <DataTable.Title style={{ alignItems: 'center' }}>
        <View>
          <Image source={govt} 
          style={{width: 50, height: 45, borderRadius: 25 }}
          />
        </View>
        </DataTable.Title>
      </DataTable.Header>
    
      
      <View style={{backgroundColor:'white',alignItems:'center', }}>
       
        <QRCode
          style={{flex:1,justifyContent:'center',backgroundColor:'white'}}
          value={`https://dpmis.punjab.gov.pk/${regnum}`}
          logo={regnum}
          logoSize={30}
          size={70}
          backgroundColor='transparent'
        />
      </View>
    <View
    style={styles.row}>
    <Text style={{color:'black',fontSize:16,textAlign: 'center',fontWeight:'bold',marginTop:10}}>DISABILITY CERTIFICATE</Text>
    </View>
    <View style={styles.row}>
      <Text style={{color:'black',fontSize:12,textAlign:'center'}}>Assessment Board for the Person With Disabilities district {districtofd}</Text>
    </View>
    <View style={styles.Row}>
    {/* <Text style={{color:'black',fontSize:12,textAlign: 'right'}}>Qrcode</Text> */}
      <Image source={{uri:`https://dpmis.punjab.gov.pk/uploads/profileimg/${imageProfile}`}} style={{ width: 55, height: 55, borderRadius: 20,marginLeft:'5%' }}/>
      <View style={styles.row}>
        <Text style={[styles.TextStyle,{marginRight:'8%'}]}>Reg No:{regnum} <Text style={[styles.InnerText]}></Text></Text>
        <Text style={[styles.TextStyle,{marginRight:'8%'}]}>Dated:{adate} <Text style={[styles.InnerText]}></Text></Text>
      </View>
    </View>
    <View style={[styles.Row1]}>
    <Text style={[styles.TextStyle,{textAlign: 'left',marginLeft:'7%', marginLeft:'7%'}]}>1-Name:<Text style={[styles.InnerText]}> {fullname}</Text></Text>
    </View>
    <View style={[styles.Row1]}>
    <Text style={[styles.TextStyle,{textAlign: 'left',marginLeft:'7%'}]}>2-Father's/Spouse's Name:<Text style={[styles.InnerText]}> {relationship}: {father_spouse_name}</Text></Text>
    </View>
    <View style={[styles.Row1]}>
    <Text style={[styles.TextStyle,{textAlign: 'left',marginLeft:'7%'}]}>3-Marital Status:<Text style={[styles.InnerText]}> { maritalstatus}</Text></Text>
    </View>
    <View style={[styles.Row1]}>
    <Text style={[styles.TextStyle,{textAlign: 'left',marginLeft:'7%'}]}>4-NIC/CNIC/B-Form/NICOP NO:<Text style={[styles.InnerText]}> {cnic}</Text></Text>
    </View>
    <View style={[styles.Row1]}>
    <Text style={[styles.TextStyle,{textAlign: 'left',marginLeft:'7%'}]}>5-Date of Birth:<Text style={[styles.InnerText]}> {dob}</Text></Text>
    </View>
    <View style={[styles.Row1]}>
    <Text style={[styles.TextStyle,{textAlign: 'left',marginLeft:'7%'}]}>6-Type of Disability:<Text style={[styles.InnerText]}> {typeofd}</Text></Text>
    </View>
    <View style={[styles.Row1]}>
    <Text style={[styles.TextStyle,{textAlign: 'left',marginLeft:'7%'}]}>7-Qualification:<Text style={[styles.InnerText]}> {qualification}</Text></Text>
    </View>
    <View style={[styles.Row1]}>
    <Text style={[styles.TextStyle,{textAlign: 'left',marginLeft:'7%'}]}>8-Nature of Disability: </Text>
    </View>
    <View style={[styles.row]}>
    <Text style={[styles.TextStyle,{textAlign: 'left',marginLeft:'7%'}]}>9-Cause of Disability:<Text style={[styles.InnerText]}> {causeofd}</Text></Text>
    </View>
    <View style={styles.row}>
    <Text style={[styles.TextStyle,{textAlign: 'left',marginLeft:'7%'}]}>10-Permanent Address:<Text style={[styles.InnerText]}> {paddress}</Text></Text>
    </View>
    <View style={styles.row}>
    <Text style={[styles.TextStyle,{textAlign: 'left',marginLeft:'7%'}]}>11-Present Address:<Text style={[styles.InnerText]}> {ppaddress}</Text> </Text>
    </View>
    <View style={[styles.Row1]}>
    <Text style={[styles.TextStyle,{textAlign: 'left',marginLeft:'7%'}]}>12-Recommendation of the Board:</Text>
    </View>
    <View style={[styles.Row1]}>
   
      <Text style={[styles.TextStyle,{textAlign:'left',marginLeft:'7%'}]}>(|)-Fit To Work : <Text style={[styles.InnerText]}>{fittowork} </Text></Text>
    </View>
    <View style={[styles.row]}>
    <Text style={[styles.TextStyle,{textAlign: 'left',marginLeft:'7%'}]}>13-If Fit to Work:Specify:</Text>
    <Text style={[styles.TextStyle,{textAlign: 'left',marginLeft:'8%'}]}>(|) Job :<Text style={[styles.InnerText]}>{fitjob}</Text></Text>
    <Text style={[styles.TextStyle,{textAlign: 'left',marginLeft:'8%'}]}>(||) Training :<Text style={[styles.InnerText]}>{dtraining}</Text></Text>
    </View>
    <View style={[styles.row]}>
    <Text style={[styles.TextStyle,{textAlign: 'left',marginLeft:'8%'}]}>14-Other Recommendations:</Text>
    <Text style={[styles.TextStyle,{textAlign: 'left',marginLeft:'8%'}]}>(|) Prosthesis :<Text style={[styles.InnerText]}>{prosthisis}</Text></Text>
    <Text style={[styles.TextStyle,{textAlign: 'left',marginLeft:'8%'}]}>(||) Protective Equipment :<Text style={[styles.InnerText]}>{mequip}</Text></Text>
    <Text style={[styles.TextStyle,{textAlign: 'left',marginLeft:'8%'}]}>(|||) Medical Treatment :<Text style={[styles.InnerText]}>{mtreat}</Text></Text>
    </View>

      {/* <DataTable.Row
      style={styles.row}>
      <DataTable.Cell> Deputy Director Social Welfare/
            Secretary Disability Assessment Board
            `${adistrict}`</DataTable.Cell>
        <DataTable.Cell numeric></DataTable.Cell>
        <DataTable.Cell numeric></DataTable.Cell>
        <DataTable.Cell numeric>Medical Superintendent
        Chairman Disability Assessment Board 
        {aboard} {adistrict}`</DataTable.Cell>
      </DataTable.Row> */}

      
      <View style={[styles.Row1, {flexDirection:'column',}]}>
        <Text style={[styles.TextStyle,{marginTop:20,alignSelf:'center'}]}>
        ...................................{'\n'}
        Deputy Director Social Welfare/{'\n'}
        Secretary Disability Assessment{'\n'}Board
        {' '}{adistrict}
        </Text>
    
        <Text style={[styles.TextStyle,{marginTop:20,alignSelf:'center'}]}>
          ...................................{'\n'}
        Medical Superintendent
        Chairman {'\n'}Disability Assessment{'\n'}Board 
        {aboard}{' '}{adistrict}
        </Text>
      </View>
      <View style={[styles.row]}>
      <Text style={[styles.TextStyle,{fontWeight:'normal',textAlign:'center',marginBottom:20}]}>
      This Certificate has been Generated by MIS, therefore no signature is required & this certificate can be
      verified at (dpmis.punjab.gov.pk)
      </Text>
    </View>

    </DataTable>
     
    </ScrollView>
    
    </View>
    
  );

}
export default PwdCertificate;
const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
},

input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 5,
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
   borderBottomWidth: 0,
  },
  row:{
    backgroundColor: 'white',
    borderBottomWidth: 0,
    textAlign: 'center',
    // margin:5\
    // marginRight:10,
  },
  Row:{
    backgroundColor: 'white',
    borderBottomWidth: 0,
    flexDirection:'row',
    justifyContent:'space-between',
    flex:1
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
  }
});


