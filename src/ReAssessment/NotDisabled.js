
import React, { useEffect, useState } from 'react';
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
  Dimensions,
} from 'react-native';
import { DataTable } from 'react-native-paper';
import syncStorage from 'react-native-sync-storage';
import Loader from '../Components/Loader';
import { KeyboardAvoidingView, TextInput } from "react-native";

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
// datatable start
const NotDisabled = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [districtofd, setdistrit] = useState('');
  const [fullname, setFullName] = useState('');
  const [father_spouse_name, setfather_spouse_name] = useState('');
  const [fathername, setFatherName] = useState('');
  const [board, setboard] = useState('');
  const [relationship, setrelationship] = useState('');
  const [cnic, setCnic] = useState('');

  const [docdate, setDocDate] = useState('');
  const [docId, setDocId] = useState('');
  const [docBoardId, setBoardId] = useState('');
  const [docBoardName, setBoardName] = useState('');

  const logo = require('../../assets/images/swo_logo.jpg');
  const govt = require('../../assets/images/govt.jpg');
  const pwdInfoID = syncStorage.get('pwdinfo_id');

  useEffect(() => {
    getpwdinfoDetail();
    getpwddocDetail();
  }, []);


  const getpwdinfoDetail = () => {
    setLoading(true)
    fetch(`https://dpmis.punjab.gov.pk/api/pwdapp/pwdregshow/${pwdInfoID}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'secret': 'pwdreg'
      },
    })
      .then(pwdinfoDetail => pwdinfoDetail.json())
      .then(resppwdinfoDetail => {

        // console.log('response  detail', resppwdinfoDetail['PWD basic info'][0])
        const district = resppwdinfoDetail['PWD basic info'][0].district;
        const board = resppwdinfoDetail['PWD basic info'][0].board;
        const fullName = resppwdinfoDetail['PWD basic info'][0].firstname + ' ' + resppwdinfoDetail['PWD basic info'][0].lastname;
        const relationship = resppwdinfoDetail['PWD basic info'][0].relationship;
        const father_spouse_name = resppwdinfoDetail['PWD basic info'][0].father_spouse_name;
        const cnic = resppwdinfoDetail['PWD basic info'][0].cnic;

        setboard(board);
        setFullName(fullName);
        setrelationship(relationship);
        setfather_spouse_name(father_spouse_name);
        setCnic(cnic);
        getdistrictofdData(district)
      }).finally(() => {
        setLoading(false);
      });

  }
  const getpwddocDetail = () => {
    setLoading(true)
    fetch(`https://dpmis.punjab.gov.pk/api/pwdapp/docformbypwd/${pwdInfoID}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'secret': 'pwdreg'
      },
    })
      .then(resppwddocDetail => resppwddocDetail.json())
      .then(resppwddocDetail => {
        // console.log('response  doc detail PWD',resppwddocDetail['docform_pwd'])
        const docdate = resppwddocDetail['docform_pwd'][0].docdate;
        setDocDate(docdate);
        const docId = resppwddocDetail['docform_pwd'][0].id;
        setDocId(docId);
        const docBoardId = resppwddocDetail['docform_pwd'][0].board_id;
        setBoardId(docBoardId);
      }).finally(() => {
        setLoading(false);
      });
  }

  const getdistrictofdData = (districtofdid) => {

    fetch(`https://dpmis.punjab.gov.pk/api/pwdapp/Districtofd`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'secret': 'pwdreg'
      },
    })
      .then(respdistrictofd => respdistrictofd.json())
      .then(respdistrictofdName => {

        const districtofdReponse = respdistrictofdName['PWD district'];
        districtofdReponse.map((item, i) => {
          if (item.id == districtofdid) {
            setdistrit(item.name)
            getaboard(item.id);
          }
        });
      });
  }
  const getaboard = (districtofdid) =>{
    fetch(`https://dpmis.punjab.gov.pk/api/app/getboards/${districtofdid}`, {
      method: 'GET',
      headers:{

        'Accept': 'application/json',
        'Content-Type':'application/json',
        'secret':'pwdreg'
      },
    })
    .then(respBoard => respBoard.json())
    .then(responseBoard => {
     
      const boardofdReponse = responseBoard["boards"];
      boardofdReponse.map((item, i) => {
        if(item.id == docBoardId){
          setBoardName(item.name)
      console.log('board data', boardofdReponse)

        }
      });
     
    });
  }
  return (

    <View style={{ borderWidth: 0, padding: 2 }}>
      <Loader loading={loading} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <DataTable style={styles.screen}>
          <DataTable.Header style={styles.Header}>

            <DataTable.Title style={{ alignItems: 'center' }}>
              <View>
                <Image source={logo}
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                />
              </View>
            </DataTable.Title>
            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center', marginTop: 5 }}>
              <Text style={{ color: 'black', fontSize: 10, textAlign: 'center', marginRight: 10 }}>GOVERNMENT OF THE PUNJAB</Text>
              <Text style={{ color: 'black', fontSize: 8, textAlign: 'center' }}>SOCIAL WELFARE AND BAIT-UL-MAAL DEPARTMENT
                PROVINCIAL COUNCIL FOR THE REHABILITATION OF DISABLE PERSONS (PCRDP)</Text>
            </View>
            <DataTable.Title style={{ alignItems: 'center' }}>
              <View>
                <Image source={govt}
                  style={{ width: 50, height: 45, borderRadius: 25 }}
                />
              </View>
            </DataTable.Title>
          </DataTable.Header>
          <View style={[styles.row, { flexDirection: 'row', alignItems: 'center' }]}>
            <View style={[{ flex: 1, flexDirection: 'row', width: '50%' }]}>
              <Text style={{ fontWeight: 'bold', color: 'black', marginLeft: '7%', }}>No.</Text><Text> {docId}</Text>
            </View>
            <View style={[{ flex: 1, flexDirection: 'row', width: '50%' }]}>
              <Text style={{ fontWeight: 'bold', color: 'black', marginRight: '7%' }}>Dated.</Text><Text> {docdate}</Text>
            </View>
          </View>
          <View
            style={styles.row}>
            <Text style={{ color: 'black', fontSize: 16, textAlign: 'center', textDecorationLine: 'underline', fontWeight: 'bold', marginTop: '12%' }}>INTIMATION LETTER</Text>
          </View>

          <View style={[styles.row, { paddingTop: '20%' }]}>
            <Text style={{ color: 'black', fontSize: 12, marginLeft: '7%', marginRight: '7%' }}>
              <Text>{'                   '}</Text>
              Mr. / Miss. / Mst. <Text style={{ fontWeight: 'bold' }}> {fullname}</Text> S/O / D/O / W/O <Text style={{ fontWeight: 'bold' }}> {father_spouse_name}</Text> having CNIC / B-Form No. <Text style={{ fontWeight: 'bold' }}> {cnic}</Text> appeared before the District Assessment Board (DAB), District <Text style={{ fontWeight: 'bold' }}> {districtofd}</Text> on <Text style={{ fontWeight: 'bold' }}> {docdate}</Text>. After assessment, under Section 12(2) of the Disabled Persons (Employment & Rehabilitation) Ordinance, 1981, the board has declared him/her as <Text style={{ fontWeight: 'bold' }}> “Not-Disabled”</Text> person. He/she is not entitled to any benefit meant for Persons with Disabilities (PWDs), envisioned under any law being operative in the field.
            </Text>
          </View>


          <View style={[styles.Row1, { flexDirection: 'column', marginTop: 'auto', backgroundColor: 'white' }]}>
            <Text style={[styles.TextStyle, { alignSelf: 'flex-end' }]}>
              ...................................{'\n'}
              Deputy Director / SECRETARY (DAB){'\n'}
              District Assessment Board (DAB){'\n'}
              {districtofd}
            </Text>
          </View>
          <View style={[styles.row]}>
            <Text style={[styles.TextStyle, { fontWeight: 'normal', textAlign: 'center', marginBottom: 50, marginTop: 60 }]}>
              This Not Disability Letter has been Generated by MIS, therefore no signature is required & this certificate can be verified at (dpmis.punjab.gov.pk)
            </Text>
          </View>
        </DataTable>

      </ScrollView>
    </View>

  );

}
const styles = StyleSheet.create({
  screen: {
    height: screenHeight,
    backgroundColor: 'white',
  },
  logoImage: {
    width: '100%',
    height: '120%',
    resizeMode: 'contain',
    marginTop: '10%'

  },
  Header: {
    height: 90,
    backgroundColor: 'white',
    borderBottomWidth: 0
  },
  row: {
    backgroundColor: 'white',
    borderBottomWidth: 0,

  },
  Row: {
    backgroundColor: 'white',
    borderBottomWidth: 0,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  Row1: {
    backgroundColor: 'white',
    borderBottomWidth: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop:10
  },
  TextStyle: {
    color: 'black',
    fontSize: 12,
    textAlign: 'left',
    fontWeight: 'bold',
    marginTop: 10
  },
  InnerText: {
    color: 'black',
    fontWeight: 'normal',
    textDecorationLine: 'underline'
  }
});
export default NotDisabled;
