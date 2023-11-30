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
import { Alert, Keyboard, KeyboardAvoidingView,  TextInput,Image, TouchableWithoutFeedback,  } from "react-native";
import pwdIMage from '../../assets/images/background.png';
import syncStorage from 'react-native-sync-storage';
import { RadioButton} from 'react-native-paper';
import DocumentScanner from 'react-native-document-scanner-plugin';
import { DatePickerInput } from 'react-native-paper-dates';

const HomeDrtc = ({navigation}) => {
  const [errorValidate, setErrorValidate] = useState(false);
  const [Name,  setName]                  = useState([]);
  const [Relationship,  setRelationship]  = useState([]);
  const [disabled, setDisabled]           = useState([]);
  const [Income, setIncome]               = useState([]);
  const [age, setAge]                     = useState([]);
  const [familyData, setFamilyData]       = useState([]);
  const formdrtc_id                       = '321';
  // const array = [
  //   {
  //     key: '1',
  //     title: 'example title 1',
  //     subtitle: 'example subtitle 1',
  //   },
  //   {
  //     key: '2',
  //     title: 'example title 2',
  //     subtitle: 'example subtitle 2',
  //   },
  //   {
  //     key: '3',
  //     title: 'example title 3',
  //     subtitle: 'example subtitle 3',
  //   },
  // ];
  const disabledData = [
    { label: 'Disabled', value: 'Disabled' },
    { label: 'Not-Disabled', value: 'Not Disabled' },
  ];

  const agegroup = [
    { label: '0-5',   value: '0-5' },
    { label: '5-10',  value: '5-10' },
    { label: '10-15', value: '10-15' },
    { label: '15-20', value: '15-20' },
    { label: '20-25', value: '20-25' },
    { label: '25-30', value: '25-30' },
    { label: '30-35', value: '30-35' },
    { label: '35-40', value: '35-40' },
    { label: '40-45', value: '40-45' },
    { label: '45-50', value: '45-50' },
    { label: '50-55', value: '50-55' },
    { label: '55-60', value: '55-60' },
    { label: '65-70', value: '65-70' },
    { label: '70-75', value: '70-75' },
    { label: '75-100', value:'75-100' },
    { label: '100-120', value:'100-120' },
  ];
  
  const NextStep = () => {
     setErrorValidate(true)
      navigation.navigate('FamilyDetails')
  }
  const saveFamilyData = (formdrtc_id,Name,Income,disabled,age,Relationship) => {
    setErrorValidate(true)
    if(!Name){
      ToastAndroid.show('Please enter your Name', ToastAndroid.LONG);
      return;
    }else if(!Relationship){
       ToastAndroid.show('Select your Relationship', ToastAndroid.LONG);
       return;
   }else if(!disabled){
     ToastAndroid.show('Select your Disabilty', ToastAndroid.LONG);
     return;
   }else if(!Income){
     ToastAndroid.show('Please enter your Income', ToastAndroid.LONG);
     return;
   }else if(!age){
     ToastAndroid.show('Please enter your Age', ToastAndroid.LONG);
     return;
   }else{
     syncStorage.set('Name', Name)
     syncStorage.set('Relationship', Relationship)
     syncStorage.set('disabled', disabled)
     syncStorage.set('Income', Income)
     syncStorage.set('Age', age)
     navigation.navigate('HomeDrtc')
   }
      if(Name != '' && Income != '' && disabled != '' && age != '' && Relationship != '')
      {
        let fmData= familyData;
          fmData.push({ 
            formdrtc_id  : formdrtc_id,
            Name         : Name,
            Income       : Income,
            disabled     : disabled,
            age          : age,
            Relationship : Relationship 
          });
        setFamilyData(fmData);
        setName('');
        setRelationship('');
        setDisabled('');
        setIncome('');
        setAge('');
        ToastAndroid.show('Your Family Record is Added to the List', ToastAndroid.LONG);
      }
    };
    // console.log('fmdata',familyData);
  const familylist = () => {
    return familyData.map(element => {
      return (
        <View style={styles.container}>
                      <DataTable.Row>
                        <DataTable.Cell textStyle={styles.cell}>{element.Name}</DataTable.Cell>
                        <DataTable.Cell>{element.Income}</DataTable.Cell>
                        <DataTable.Cell>{element.age}</DataTable.Cell>
                        <DataTable.Cell>{element.disabled}</DataTable.Cell>
                        <DataTable.Cell>{element.Relationship}</DataTable.Cell>
                      </DataTable.Row>
            </View> 
      );
    });
  };

  return (
  <View>
    <ImageBackground source={pwdIMage} style={{width:'100%',height:'100%',opacity:0.9}}>
          <View style={{padding:30, flex:1, justifyContent:'center'}}>
            <View style={{width:'100%',backgroundColor:'#fff', height:560,padding:30, borderRadius:30}}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              contentInsetAdjustmentBehavior="always"
              keyboardDismissMode="on-drag"
              >
              <KeyboardAvoidingView enabled>
            <View>
                <View>
                <Text style={[styles.logoText,{textAlign: 'center',color: '#002D62', fontWeight: "bold",fontSize: 20}]}>
                    Family Details
                </Text>
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Name (نام):</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                  <TextInput 
                    placeholderTextColor="#000" 
                    placeholderColor='black' 
                    placeholder='Enter Your Name'
                    style={[styles.FamilyTextInput
                      ,{borderColor: !Name && errorValidate ? 'red':'#fff'}
                    ]} 
                    onChangeText={(Name) => setName(Name)}
                    value={Name}  
                  />
                </View>
                
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Monthly Income (ماہانہ آمدنی):</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                  <TextInput  placeholderColor="#c4c3cb"
                    placeholderTextColor="#000" 
                  placeholder='Enter Your Income'
                  keyboardType='numeric'
                  maxLength={13}
                  style={[styles.FamilyTextInput
                    ,{borderColor: !Income && errorValidate ? 'red':'#fff'}
                  ]}   
                  onChangeText={(Income) => setIncome(Income)}
                  value={Income} 
                  />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Disable/Not Disabled (معذوری):</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                  <View style={styles.container}>

                    <Dropdown
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      itemTextStyle={styles.TEXTstyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      data={disabledData}
                      labelField="label"
                      valueField="value"
                      placeholder={'Select Disability'}
                      searchPlaceholder="Search..."
                      value={disabled}
                      
                      onChange={item => {
                          setDisabled(item.value);
                      }}
                    />
                  </View>
                </View>
                
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Age Group (عمرکی حد):</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                  <View style={styles.container}>

                    <Dropdown
                        
                      style={styles.dropdown}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      itemTextStyle={styles.TEXTstyle}
                      data={agegroup}
                      labelField="label"
                      valueField="value"
                      placeholder={'Please Select Age'}
                      searchPlaceholder="Search..."
                      value={age}
                      onChange={item => {
                          setAge(item.value);
                      }}
                    />
                  </View>
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Relationship_with_Applicant:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                  <TextInput 

                    placeholderTextColor="#000" 
                    placeholderColor='black' 
                    placeholder='Enter Your Relationship'
                    style={[styles.FamilyTextInput
                      ,{borderColor: !Relationship && errorValidate ? 'red':'#fff'}
                    ]} 
                    onChangeText={(Relationship) => setRelationship(Relationship)}
                    value={Relationship}  
                  />
                </View>
                <View style={[styles.row,{justifyContent:'space-between',alignSelf:'flex-end', flexDirection: 'row',flex:1}]}>
                     <TouchableOpacity 
                        style={[styles.ButtonStyle, {marginRight:10}]}
                        activeOpacity={0.5}
                        onPress={() => saveFamilyData(formdrtc_id, Name ,Income, disabled, age, Relationship)} 
                        >
                      <Text style={[styles.text,{textAlign:'center'}]}>Save</Text>         
                    </TouchableOpacity>
                    <TouchableOpacity  
                        onPress={NextStep}
                        style={styles.ButtonStyle}
                        activeOpacity={0.5}>
                      <Text style={[styles.text,{textAlign:'center'}]}>Next</Text>         
                    </TouchableOpacity>
                </View>
              </View>
            </KeyboardAvoidingView>
            </ScrollView>
            </View>

            <View style={styles.container}>
                  <DataTable>
                    <DataTable.Header style={{backgroundColor:"#002D62"}}>
                       <DataTable.Title textStyle={styles.textTable}>Name</DataTable.Title>
                       <DataTable.Title textStyle={styles.textTable}>Income</DataTable.Title>
                       <DataTable.Title textStyle={[styles.textTable]}>Disability</DataTable.Title>
                       <DataTable.Title textStyle={styles.textTable}>Age</DataTable.Title>
                       <DataTable.Title textStyle={styles.textTable}>Relationship</DataTable.Title>
                     </DataTable.Header>
                          {familylist()}
                  </DataTable> 
            </View> 
        </View>
      </ImageBackground>
    
  </View>
  );
};
const styles = StyleSheet.create({
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
ButtonStyle:{
  justifyContent: 'center',
  width:'30%',
  padding:10,
  borderRadius: 14,
  elevation: 3,
  backgroundColor: '#002D62',
  marginTop:10,
  // marginLeft:'20%',
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

export default HomeDrtc;