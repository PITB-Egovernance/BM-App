
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

import syncStorage from 'react-native-sync-storage';
import pwdIMage from  '../../../assets/images/background.png';

import { KeyboardAvoidingView,  TextInput  } from "react-native";

// datatable start
const optionsPerPage = [2, , 4];
const DraftCertificate = ({navigation}) => {
  const [districtofd, setdistrit]        = useState('');
  const [board, setboard]        = useState('');
  const [imageProfile, setimage]      = useState('');
  const [fullname, setFullName]      = useState('');
  const [fathername, setFatherName]  = useState('');
  const [relationship, setrelationship]  = useState('');
  const [ father_spouse_name, setfather_spouse_name]  = useState('');
  const [cnic, setCnic]              = useState('');
  const [maritalstatus, setmaritalstatus]              = useState('');
  const [dob, setDob]                = useState('');
  const [qualification, setQualification]    = useState('');
  const [typeofd, setType]            = useState('');
  const [causeofd, setCause]            = useState('');
  const [paddress, setPaddress]        = useState('');
  const [ppaddress, setPpaddress]        = useState('');
  
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
  const logo = require('../../../assets/images/swo_logo.jpg');
  const govt = require('../../../assets/images/govt.jpg');
  const pwdInfoID                   = syncStorage.get('pwdinfo_id');

  // const imagep = require(`../../../uploads/profileimg/${image}`);
 
  useEffect(() =>{
    getpwdinfoDetail();
   
  }, []);

    
  const getpwdinfoDetail = (pwdinfoDetail) =>{

    // console.log('pwdinfoDetail', pwdinfoDetailid)
    // console.log('Board id', BoardID)
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
      const district   = resppwdinfoDetail['PWD basic info'][0].district;
        console.log('districtofd', districtofd)
        const board   = resppwdinfoDetail['PWD basic info'][0].board;
        console.log('board', board)
      const image   = resppwdinfoDetail['PWD basic info'][0].image;
        console.log('image', image)
      

        const fullName    = resppwdinfoDetail['PWD basic info'][0].firstname+' '+resppwdinfoDetail['PWD basic info'][0].lastname;
        console.log('FullName', fullName)
        const relationship    = resppwdinfoDetail['PWD basic info'][0].relationship;
        console.log('relationship', relationship)
        const father_spouse_name    = resppwdinfoDetail['PWD basic info'][0].father_spouse_name;
        console.log('father_spouse_name', father_spouse_name)
        const cnic   = resppwdinfoDetail['PWD basic info'][0].cnic;
        console.log('cnic', cnic)
        const dob   = resppwdinfoDetail['PWD basic info'][0].dob;
        console.log('dob', dob)
        const maritalstatus   = resppwdinfoDetail['PWD basic info'][0].maritalstatus;
        console.log('maritalstatus', maritalstatus)
        const qualification   = resppwdinfoDetail['PWD basic info'][0].qualification;
        console.log('qualification', qualification)
        const typeofd   = resppwdinfoDetail['PWD basic info'][0].typeofd;
        console.log('typeofd', typeofd)
        const causeofd   = resppwdinfoDetail['PWD basic info'][0].causeofd;
        console.log('causeofd', causeofd)
        const paddress   = resppwdinfoDetail['PWD basic info'][0].paddress;
        console.log('paddress', paddress)
        const ppaddress   = resppwdinfoDetail['PWD basic info'][0].ppaddress;
        console.log('ppaddress', ppaddress)

          setboard(board);
          setimage(image);
          setFullName(fullName);
          setrelationship(relationship);
          setfather_spouse_name(father_spouse_name);
          setCnic(cnic);
          setmaritalstatus(maritalstatus);
          setDob(dob);
          setQualification(qualification);
          setType(typeofd)
          setCause(causeofd)
          setPaddress(paddress)
          setPpaddress(ppaddress)
        getTypeofdData(typeofd)
        getCauseofdData([typeofd,causeofd])
        getdistrictofdData(district)
    });

  }
  const getdistrictofdData = (districtofdid) =>{

    console.log('districtofd functino', districtofdid)
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

      console.log('district', respdistrictofdName['PWD district'])
      const districtofdReponse = respdistrictofdName['PWD district'];
      console.log('sdasdasdsadas', districtofdReponse)
      districtofdReponse.map((item, i) => {
        if(item.id == districtofdid){
          setdistrit(item.name)
        }
      });
     
    });
  }
  const getTypeofdData = (typeofdid) =>{

    console.log('fsdffssfdds', typeofdid)
    // console.log('Board id', BoardID)
    fetch(`https://dpmis.punjab.gov.pk/api/app/typeofd`, {
      method: 'GET',
      headers:{
        'Accept': 'application/json',
          'Content-Type':'application/json'
      },
    })
    .then(respdistrictofdofd => respdistrictofdofd.json())
    .then(respdistrictofdofdName => {

      const districtofdofdReponse = respdistrictofdofdName.typeofd;
      console.log('districtofdofds Typeofd', districtofdofdReponse)
      districtofdofdReponse.map((item, i) => {
        if(item.id == typeofdid){
          setType(item.name)
        }
      });
     
    });
  }
  const getCauseofdData = ([typeofd,causeofd]) =>{

    console.log('TYpeofD', typeofd)
    console.log('Cause of d id', causeofd)
    // console.log('Board id', BoardID)
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
          setCause(item.name)
        }
      });
     
    });
  }

  return (   
    
    <View style={{borderWidth:  0,padding:2}}>
      <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}>
      <DataTable>
        <DataTable.Header style={styles.Header}>
          
          <DataTable.Title style={{ alignItems: 'center' }}>
          <View>
            <Image source={logo} 
            style={{ width: 50, height: 50, borderRadius: 25 }}
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

      <View
      style={styles.row}>
      <Text style={{color:'black',fontSize:16,textAlign: 'center',textDecorationLine: 'underline',fontWeight:'bold' }}> Draft DISABILITY CERTIFICATE</Text>
      </View>
      <View style={styles.row}>
        <Text style={{color:'black',fontSize:12,textAlign:'center'}}>Assessment Board for the Person With Disabilities district {districtofd}</Text>
      </View>
      <View style={[styles.Row,]}>
        {/* <Text style={{color:'black',fontSize:12,textAlign: 'right'}}>Qrcode</Text> */}
       <Image source={{uri:`https://dpmis.punjab.gov.pk/uploads/profileimg/${imageProfile}`}} style={{ width: 55, height: 55, borderRadius: 20,marginLeft:'5%',marginTop:'2%' }}/>
        <View style={styles.row}>
          <Text style={[styles.TextStyle,{flex:1,justifyContent:'flex-start'}]}>Reg No: <Text style={[styles.InnerText]}></Text></Text>
          <Text style={[styles.TextStyle,{marginRight:'20%'}]}>Dated:<Text style={[styles.InnerText]}></Text></Text>
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
{/*    
      <View style={[styles.row]}>
      <Text style={[styles.TextStyle,{textAlign: 'left'}]}>13-If Fit to Work:Specify:</Text>
        <Text style={[styles.TextStyle]}>(|) Job :</Text>
        <Text style={[styles.TextStyle]}>(||) Training :</Text>
      </View>
      <View style={[styles.row]}>
      <Text style={[styles.TextStyle,{textAlign: 'left'}]}>14-Other Recommendations:</Text>
        <Text style={[styles.TextStyle]}>(|) Prosthesis :</Text>
        <Text style={[styles.TextStyle]}>(||) Protective Equipment :</Text>
        <Text style={[styles.TextStyle]}>(|||) Medical Treatment :</Text>
      </View> */}
      <View style={[styles.Row1]}>
   
   <Text style={[styles.TextStyle,{textAlign:'left',marginLeft:'7%'}]}>(|)-Fit To Work :</Text>
 </View>
 <View style={[styles.row]}>
 <Text style={[styles.TextStyle,{textAlign: 'left',marginLeft:'7%'}]}>13-If Fit to Work:Specify:</Text>
 <Text style={[styles.TextStyle,{textAlign: 'left',marginLeft:'8%'}]}>(|) Job :</Text>
 <Text style={[styles.TextStyle,{textAlign: 'left',marginLeft:'8%'}]}>(||) Training :</Text>
 </View>
 <View style={[styles.row]}>
 <Text style={[styles.TextStyle,{textAlign: 'left',marginLeft:'8%'}]}>14-Other Recommendations:</Text>
 <Text style={[styles.TextStyle,{textAlign: 'left',marginLeft:'8%'}]}>(|) Prosthesis :</Text>
 <Text style={[styles.TextStyle,{textAlign: 'left',marginLeft:'8%'}]}>(||) Protective Equipment :</Text>
 <Text style={[styles.TextStyle,{textAlign: 'left',marginLeft:'8%'}]}>(|||) Medical Treatment :</Text>
 </View>

        {/* <View style={[styles.Row1]}>
          <Text style={[styles.TextStyle,{marginTop:20}]}>
          ...................................{'\n'}
          Deputy Director Social Welfare/{'\n'}
        Secretary Disability Assessment Board
        {'\n'} {districtofd}
          </Text>
      
          <Text style={[styles.TextStyle]}>
            ...................................{'\n'}
          Medical Superintendent{'\n'}
          Chairman Disability Assessment Board{'\n'} 
          {board}{districtofd}
          </Text>
        </View>
      <View style={[styles.row]}>
        <Text style={[styles.TextStyle,{fontWeight:'normal',textAlign:'center'}]}>
        This Certificate has been Generated by MIS, therefore no signature is required & this certificate can be
      verified at (dpmis.punjab.gov.pk)
        </Text>
      </View> */}
        
        <View style={[styles.Row1, {flexDirection:'column',}]}>
        <Text style={[styles.TextStyle,{marginTop:20,alignSelf:'center'}]}>
        ...................................{'\n'}
        Deputy Director Social Welfare/{'\n'}
        Secretary Disability Assessment{'\n'}Board
        {' '}{districtofd}
        </Text>
    
        <Text style={[styles.TextStyle,{marginTop:20,alignSelf:'center'}]}>
          ...................................{'\n'}
        Medical Superintendent
        Chairman {'\n'}Disability Assessment{'\n'}Board 
        {board}{' '}{districtofd}
        </Text>
      </View>
      <View style={[styles.row]}>
      <Text style={[styles.TextStyle,{fontWeight:'normal',textAlign:'center',marginBottom:20}]}>
      This Certificate has been Generated by MIS, therefore no signature is required & this certificate can be
      verified at (dpmis.punjab.gov.pk)
      </Text>
    </View>
        {/* <DataTable.Row
        style={styles.row}>
        <DataTable.Cell>This Certificate has been Generated by MIS, therefore no signature is required & this certificate can be
      verified at (dpmis.punjab.gov.pk)</DataTable.Cell>
          <DataTable.Cell numeric></DataTable.Cell>
          <DataTable.Cell numeric></DataTable.Cell>
          <DataTable.Cell numeric> 
          </DataTable.Cell>
        </DataTable.Row> */}
  
      </DataTable>
      
      </ScrollView>
    </View>
    
  );

}
const styles = StyleSheet.create({
  
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
    backgroundColor: 'white',
    borderBottomWidth: 0,
    
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
  }
});
export default DraftCertificate;
