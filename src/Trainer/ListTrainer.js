import { Checkbox } from 'react-native-paper';
import React, { useEffect,useState, useRef } from 'react';
import Loader from '../Components/Loader';
import { DataTable } from 'react-native-paper';

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  title,
  TouchableOpacity,
  ToastAndroid,
  Dimensions,
  loading,

} from 'react-native';

import { KeyboardAvoidingView, TextInput } from "react-native";
import pwdIMage from '../../assets/images/background.png';
import syncStorage from 'react-native-sync-storage';

const ListTrainer = ({ navigation }) => {
  const pwdDistrictAll     = syncStorage.get('sortDistrict_id');
  const [pwds, setPwds]   = useState([]);
  const [pwds_id, setPwdsId] = useState('');

  const pwdList = () => {

    fetch(`https://dpmis.punjab.gov.pk/api/pwdapp/getpwdbydistrict/${pwdDistrictAll}`, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
      },
    })
    .then(response => response.json())
    .then(response => {
      var count = Object.keys(response.pwdusers).length;
      console.log('count pwds: ',count);
    });


    // return familyData.map(element => {
    //   return (
    //     <View style={{backgroundColor:"grey"}}>
    //                   <DataTable.Row>
    //                     <DataTable.Cell textStyle={styles.cell}>{element.Picture}</DataTable.Cell>
    //                     <DataTable.Cell>{element.cnic}</DataTable.Cell>
    //                     <DataTable.Cell>{element.name}</DataTable.Cell>
    //                     <DataTable.Cell>{element.typeofd}</DataTable.Cell>
    //                     <DataTable.Cell>{element.action}</DataTable.Cell>
    //                   </DataTable.Row>
    //     </View> 
    //   );
    // });
  };
  

  useEffect(()=> {
      pwdList();
  },[]);
  return (
    <View>
      <ImageBackground source={pwdIMage} style={{ width: '100%', height: '100%', opacity: 0.9, alignSelf: 'center' }}>
        <ScrollView horizontal >
           <DataTable>
                    <DataTable.Header style={{backgroundColor:"#002D62"}}>
                       <DataTable.Title textStyle={styles.textTable}>
                        <Text style={{ color: "#fff" }}> 
                          Picture
                        </Text>
                       </DataTable.Title>
                       <DataTable.Title textStyle={styles.textTable}> <Text style={{ color: "#fff" }}> 
                          CNIC
                        </Text></DataTable.Title>
                       <DataTable.Title textStyle={styles.textTable}> <Text style={{ color: "#fff" }}> 
                          Name
                        </Text></DataTable.Title>
                       <DataTable.Title textStyle={[styles.textTable]}><Text style={{ color: "#fff" }}> 
                         Type, cause, nature of Disability
                        </Text></DataTable.Title>
                       <DataTable.Title textStyle={styles.textTable}><Text style={{ color: "#fff" }}> 
                          Action
                        </Text></DataTable.Title>
                     </DataTable.Header>
                          {pwdList()}
            </DataTable> 
          <DataTable>
            <DataTable.Pagination
              page={1}
              numberOfPages={3}
              onPageChange={page => {
                console.log(page);
              }}
              label="1-2 of 6"
            />
          </DataTable>
        </ScrollView>
      </ImageBackground>
    </View>
  );

}
const styles = StyleSheet.create({
  loginFormTextInput: {
    // marginTop:10,
    // backgroundColor:'#D3D3D3',

    flex: 1,
    color: 'black',

    borderWidth: 1,
    backgroundColor: '#D3D3D3',
    borderRadius: 5,
    height: 40,
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
  buttonStyle: {
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 14,
    backgroundColor: '#002D62',
  },
  text: {
    color: 'white',
    fontSize: 15,
    fontFamily: "sans-serif",

  },
  ButtonStyle: {
    justifyContent: 'center',
    width: '70%',
    padding: 10,
    // paddingVertical: 10,
    borderRadius: 14,
    // paddingHorizontal: 15,
    backgroundColor: '#002D62',
  },
  Text: {
    color: '#002D62',
    textAlign: 'right',
    fontSize: 14,
    marginTop: 8,
    // marginTop:5
  },
  Boxtext: {
    color: '#002D62',
    textAlign: 'left',
    // marginLeft:-8,
    fontSize: 15,
  },
  Checkbox: {
    marginTop: 8,
  },
});
export default ListTrainer;
