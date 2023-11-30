/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React,{useEffect,useCallback,useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  ToastAndroid,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Alert, Keyboard, KeyboardAvoidingView,  TextInput, } from "react-native";
import pwdIMage from '../../../assets/images/background.png';
import syncStorage from 'react-native-sync-storage';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/FontAwesome';

const Step3 = ({route,navigation}) => {

    const [errorValidate, setErrorValidate] =  useState(false);
    // const [qualification, setqualification] =  useState([]);
    const [uninames, setUninames] = useState([]);
    const [degreenames, setDegreenames] = useState([]);
    const [subjectnames, setSubjectnames] = useState([]);
    const [grade, setgrade] = useState([]);
    const [year, setyear] = useState('');
  
    const [visible, setVisible] = useState(false);

 

    const [qualification_id, setqualification_id]   = useState('');
    const [uninames_id, setUninames_id]             = useState('');
    const [degreenames_id, setDegreenames_id]       = useState('');
    const [subjectnames_id, setSubjectnames_id]     = useState('');
    const [grade_id, setGrade_id]                   = useState('');

    const [Focus, setFocus]         = useState(false);
    const [value, setValue]         = useState(null);
    const [isFocus, setIsFocus]     = useState(false);


    useEffect(() =>{
      getUninames();
      getDegreename();
      getSubjectnames();
      getGrades();
      getqualifications();

  }, []);
  
  const getUninames = () => {
    fetch('https://dpmis.punjab.gov.pk/api/pwdapp/uninames', {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'secret':'pwdreg',
          'Content-Type':'application/json'
        },
      })
      .then(response => response.json())
      .then(response => {
      const responseUni = response['PWD unis']
      var count = Object.keys(responseUni).length; 
      if(count > 0){
        let dropDownData = [];
        for (var i = 0; i < count; i++) {
          dropDownData.push({value: responseUni[i].id,label: responseUni[i].name});
        }
        setUninames(dropDownData);
      }
    });
  }
  
  const getDegreename= () => {
    fetch('https://dpmis.punjab.gov.pk/api/pwdapp/degreename', {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'secret':'pwdreg',
          'Content-Type':'application/json'
      },
    })
    .then(response => response.json())
    .then(response => {
      const responseDegree = response['PWD degree']
      var count = Object.keys(responseDegree).length; 
      if(count > 0){
        let dropDownData = [];
        for (var i = 0; i < count; i++) {
          dropDownData.push({value: responseDegree[i].id,label: responseDegree[i].name});
        }
        setDegreenames(dropDownData);
      }
    });
  }

  const getSubjectnames = () => {
    fetch('https://dpmis.punjab.gov.pk/api/pwdapp/majorsub', {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'secret':'pwdreg',
          'Content-Type':'application/json'
      },
    })
    .then(response => response.json())
    .then(response => {
      const responseSubjectnames = response['PWD major subjects']
      var count = Object.keys(responseSubjectnames).length;
      if(count > 0){
        let dropDownData = [];
        for (var i = 0; i < count; i++) {
          dropDownData.push({value: responseSubjectnames[i].id,label: responseSubjectnames[i].name});
        }
        setSubjectnames(dropDownData);
      }
    });
  }
  const qualification = [
    { label: '18 years', value: '18 years' },
    { label: '16 years', value: '16 years' },
    { label: '14 years', value: '14 years' },
    { label: '12 years', value: '12 years' },
    { label: '10 years', value: '10 years' },
    { label: '8 years', value: '8 years' },
    { label: '5 years', value: '5 years' },
    { label: '4 years', value: '4 years' },
    { label: '3 years', value: '3 years' },
    { label: '2 years', value: '2 years' },
    { label: '1 years', value: '1 years' },
    { label: 'Perp', value: 'Perp' },
    { label: 'Nursery', value: 'Nursery' },
  ];
  const getqualifications = () => {
    fetch('https://dpmis.punjab.gov.pk/api/pwdapp/qualification', {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'secret':'pwdreg',
          'Content-Type':'application/json'
      },
    })
    .then(response => response.json())
    .then(response => {
      const responsequalifications = response['qualifications']
      var count = Object.keys(responsequalifications).length;
      if(count > 0){
        let dropDownData = [];
        for (var i = 0; i < count; i++) {
          dropDownData.push({value: responsequalifications[i].id,label: responsequalifications[i].name});
        }
        setqualification(dropDownData);
      }
    });
  }
  
  const getGrades = () => {
    fetch('https://dpmis.punjab.gov.pk/api/pwdapp/grades', {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'secret':'pwdreg',
          'Content-Type':'application/json'
      },
    })
    .then(response => response.json())
    .then(response => {
      const responseGrades = response['PWD grades']
      var count = Object.keys(responseGrades).length; 
      if(count > 0){
        let dropDownData = [];
        for (var i = 0; i < count; i++) {
          dropDownData.push({value: responseGrades[i].id,label: responseGrades[i].name});
        }
        setgrade(dropDownData);
      }
    });
  }
  const NextStepFour = () => {

    setErrorValidate(true)
    if(!qualification_id){
      ToastAndroid.show('Select Your Qualification', ToastAndroid.LONG);
      return;
    }else if(!degreenames_id){
      ToastAndroid.show('Select Your Degree', ToastAndroid.LONG);
      return;
    }else if(!uninames_id){
      ToastAndroid.show('Select Your Institute', ToastAndroid.LONG);
      return;
    }else if(!subjectnames_id){
      ToastAndroid.show('Select Your Subject', ToastAndroid.LONG);
      return;
    }else if(!grade_id){
      ToastAndroid.show('Select Your Grade', ToastAndroid.LONG);
      return;
    }else{
      console.log('qualification_id',qualification_id,'degreenames_id',degreenames_id,'uninames_id',uninames_id,'subjectnames_id',subjectnames_id,'year',year,'grade_id',grade_id);
      syncStorage.set('qualification',qualification_id)
      syncStorage.set('degree',degreenames_id)
      syncStorage.set('institute',uninames_id)
      syncStorage.set('subject',subjectnames_id)
      syncStorage.set('grade',grade_id)
      if (!year) {
       syncStorage.set('year','0000-00-00')
      } else {
       syncStorage.set('year',year)
      }
      navigation.navigate('Step4')
    }   
  }

  return (
    <View>
        
      <ImageBackground source={pwdIMage} style={{width:'100%',height:'100%',opacity:0.9}}>
          
          <View style={{padding:30, flex:1, justifyContent:'center'}}>
            <View style={{width:'100%',backgroundColor:'#fff', height:500,padding:30, borderRadius:30}}>
              <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}>
                   <View style={{flex:1,flexDirection:'row',}}>
                  <TouchableOpacity onPress={() => navigation.navigate('Step2')}>
                    <Icon 
                      name="arrow-left"
                      size={20}
                      style={{alignItems:'center', top:5, color:'#002D62', marginRight:20}}
                    />
                  </TouchableOpacity>
                <Text style={[styles.logoText,{paddingTop:-1,textAlign: 'center',color: '#002D62', fontWeight: "bold",fontSize: 19}]}>
                  PWD Registerion Form</Text>
                </View>
                
                <View>           
                  {/* Education detail  */}
                  <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Qualification: (تعلیمی قابلیت)<Text style={{color:'red'}}> *</Text></Text>
                  <View style={styles.container}>
                      <Dropdown
                        style={styles.dropdown}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        itemTextStyle={styles.itemTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={qualification}
                        search
                        labelField="label"
                        valueField="label"
                        placeholder={'Select your Qualification'}
                        searchPlaceholder="Search..."
                        value={qualification_id}
                        onChange={item => {
                          setqualification_id(item.label);
                        }}
                      />
                  </View>

                  
                  <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Degrees: (ڈگری)<Text style={{color:'red'}}> *</Text></Text>
                <View>
                  <View style={styles.container}>
                    <Dropdown
                      style={[styles.dropdown2, isFocus && { borderColor: 'black',backgroundColor:'#D3D3D3', }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      itemTextStyle={styles.itemTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      data={degreenames}
                      search
                      labelField="label"
                      valueField="value"
                      placeholder={'Select Your Degree'}
                      searchPlaceholder="Search..."
                      value={degreenames_id}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setDegreenames_id(item.value);
                          // getDivision(item.value)
                          setFocus(false);
                          
                      }}
                      
                      
                    />
                  </View>
                </View>
                   <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Name of Board/Institute: (بورڈ)<Text style={{color:'red'}}> *</Text></Text>
                <View>
                  <View style={styles.container}>
                    <Dropdown
                      style={[styles.dropdown2, isFocus && { borderColor: 'black',backgroundColor:'#D3D3D3', }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      itemTextStyle={styles.itemTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      data={uninames}
                      search
                      labelField="label"
                      valueField="value"
                      placeholder={'Select Your Institute'}
                      searchPlaceholder="Search..."
                      value={uninames_id}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                          setUninames_id(item.value);
                          // getDivision(item.value)
                          setFocus(false);
                          
                      }}
                      
                      
                    />
                  </View>
                </View>
                  
                  <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Subject: (مضامین)<Text style={{color:'red'}}> *</Text></Text>
                <View>
                  <View style={styles.container}>
                    <Dropdown
                      style={[styles.dropdown2, isFocus && { borderColor: 'black',backgroundColor:'#D3D3D3', }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      itemTextStyle={styles.itemTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      data={subjectnames}
                      search
                      labelField="label"
                      valueField="value"
                      placeholder={'Select Your Subject'}
                      searchPlaceholder="Search..."
                      value={subjectnames_id}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setSubjectnames_id(item.value);
                          // getDivision(item.value)
                          setFocus(false);
                          
                      }}
                      
                      
                    />
                  </View>
                </View>

            <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Grade: (گریڈ)<Text style={{color:'red'}}> *</Text></Text>
                <View>
                  <View style={styles.container}>
                    <Dropdown
                      style={[styles.dropdown2, isFocus && { borderColor: 'black',backgroundColor:'#D3D3D3', }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      itemTextStyle={styles.itemTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      data={grade}
                      // search
                      labelField="label"
                      valueField="value"
                      placeholder={'Select Your Garde'}
                      // searchPlaceholder="Search..."
                      value={grade_id}
                      onFocus={() => setIsFocus(true)}
                      onBlur={() => setIsFocus(false)}
                      onChange={item => {
                        setGrade_id(item.value);
                          // getDivision(item.value)
                          setFocus(false);
                          
                      }}
                      
                      
                    />
                  </View>
                </View>
                  <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Passing Year: (سال)</Text>
                  <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                  <TextInput  placeholderColor="#c4c3cb" 
                  placeholderTextColor='grey'
                  selectedTextStyle={styles.selectedTextStyle}
                  itemTextStyle={styles.itemTextStyle}
                  style={[styles.Step3FormTextInput]}
                  keyboardType='numeric'
                  onChangeText={(year) => setyear(year)}
                  value={year} />
                  </View>
                  
                <Text style={{color:'red', marginTop: 15}}>
                   <Text style={{fontWeight:'bold',color:'red'}}>NOTE: </Text>
                    Please Select your Latest Education Information</Text>
                  <View style={[styles.row,{justifyContent:'space-between',alignSelf:'flex-end'}]}>
                    <TouchableOpacity  
                        onPress={NextStepFour}
                        style={styles.ButtonStyle}
                        activeOpacity={0.5}>
                    
                      <Text style={[styles.text,{textAlign:'center'}]}>Next</Text>         
                    </TouchableOpacity>
                </View>
              
                </View>
              </ScrollView>
            </View>
        </View>
        </ImageBackground>
      </View>

    
    
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop:20,
    height: 'auto',
    // padding: 16,
    borderRadius:30,
    backgroundColor: '#fff',
  },
  textTable:{
    color:'#fff', 
    fontSize:13,
    fontFamily: "sans-serif",
  },
  Step3FormTextInput:{
    flex: 1,
    color: 'black',
   
    borderWidth: 1,
    backgroundColor:'#D3D3D3',
    borderRadius:5, 
    height:40,
    borderColor: '#dadae8',
  },
  ButtonStyle:{
    justifyContent: 'center',
    width:'30%',
    padding:10,
    borderRadius: 14,
    backgroundColor: '#002D62',
    marginTop:10,
    // marginLeft:'70%',
    
  },
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    backgroundColor:'#D3D3D3',
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
dropdown2:{
  height: 40,
  borderColor: 'gray',
  borderWidth: 0.5,
  borderRadius: 5,
  paddingHorizontal: 8,
  backgroundColor:'#D3D3D3',
},
selectedTextStyle: {
  fontSize: 16,
  color:'black'
},
itemTextStyle:{
  color:'black'
},
placeholderStyle:{
  color:'grey'
},
inputSearchStyle : {
  color:'black'
}
  
});

export default Step3;