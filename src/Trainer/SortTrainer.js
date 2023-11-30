import {View, Text} from 'react-native';
import React,{useEffect,useCallback, useState} from 'react';
import { DataTable } from 'react-native-paper';
import {
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ToastAndroid
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {KeyboardAvoidingView,  TextInput, } from "react-native";
import pwdIMage from '../../assets/images/background.png';
import syncStorage from 'react-native-sync-storage';

const SortTrainer = ({navigation}) => {
  const [errorValidate, setErrorValidate] = useState(false);
  const [district, setDistrict]   = useState([]);
  const [loading, setLoading]   = useState(false);
  const [district_id, setDistrictId] = useState('');

  const [Focus, setFocus]         = useState(false);
  const [value, setValue]         = useState(null);
  const [isFocus, setIsFocus]     = useState(false);


  const sortByDistrict = (district_id) => {
    setErrorValidate(true)
    if(!district_id){
    ToastAndroid.show('Please select a District', ToastAndroid.LONG);
    return;
  }else{
      syncStorage.set('sortDistrict_id', district_id);
      navigation.navigate('ListTrainer')
   }
};

  const getDistrict = () =>{

    fetch(`https://dpmis.punjab.gov.pk/api/app/district`, {
      method: 'GET',
      headers:{},
    })
    .then(respDistrict => respDistrict.json())
    .then(responseDistrict => {

      console.log('DIstricts', responseDistrict)
     
      var count = Object.keys(responseDistrict.districts).length;
      console.log('Districts COunt', count)
      let districtsData = [];
      for (var i = 0; i < count; i++) {
        districtsData.push({ value: responseDistrict.districts[i].id, label: responseDistrict.districts[i].name });
      }
      setDistrict(districtsData);
    });
  }

  useEffect(() =>{
    getDistrict();
  }, []);
  return (
  <View>

    <ImageBackground source={pwdIMage} style={{width:'100%',height:'100%',opacity:0.9}}>
          <View style={{padding:30, flex:1, justifyContent:'center'}}>
            <View style={{width:'100%',backgroundColor:'#fff', height:270,padding:30, borderRadius:30}}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentInsetAdjustmentBehavior="always"
              keyboardDismissMode="on-drag"
              >
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                keyboardVerticalOffset={100}
                behavior={"position"}
              >
            <View>
                <View>
                <Text style={[styles.logoText,{textAlign: 'center',color: '#002D62', fontWeight: "bold",fontSize: 20}]}>
                    Sort PWD's By District
                </Text>
                </View>
                <Text style={{marginTop:35,fontWeight:"bold",color:"#000000"}}>Select District of Medical Board:</Text>
                <View style={{marginTop:20,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                {/* <TextInput  placeholderColor="#c4c3cb" /> */}
                  <View style={styles.container}>

                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      itemTextStyle={styles.TEXTstyle}
                      data={district}
                      labelField="label"
                      valueField="value"
                      placeholder={'Select District'}
                      searchPlaceholder="Search..."
                      value={district_id}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                          setDistrictId(item.value);
                          setFocus(false);
                      }}
                    />
                  </View>
                </View>
                
                <View style={{padding:20,alignItems:'center'}}>
                    
                    <TouchableOpacity  
                            onPress={() => sortByDistrict(district_id)} 
                            style={styles.buttonStyle}
                            activeOpacity={0.5}>
                          <Text style={[styles.text,{textAlign:'center'}]}>Submit</Text>
                    </TouchableOpacity>
                </View> 
              </View>
            </KeyboardAvoidingView>
            </ScrollView>
            </View>
        </View>
      </ImageBackground>
  </View>
  );
};

const styles = StyleSheet.create({
    textTable:{
      color : '#000',
    },  
    table: {
      marginTop: 20,
    },
    FamilyTextInput:{
        color:'black'
    },
    dropdown: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 5,
      paddingHorizontal: 8,
      backgroundColor:'#D3D3D3',
      margin: 0,
    },
    buttonStyle:{
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 14,
    backgroundColor: '#002D62',
    width:'70%',
    },
    text:{
      color:'white',
      fontSize:15,
      fontFamily: "sans-serif",
  
    },
  
    placeholderStyle: {
      fontSize: 14,
      margin:2,
      color: 'black'
    },
    selectedTextStyle: {
      fontSize: 16,
      color: 'black'
    },
    TEXTstyle:{
      color:'black',
      textColor:'black',
      tintColor:'black'
    }
  });
export default SortTrainer;