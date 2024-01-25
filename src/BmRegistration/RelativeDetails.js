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


const RelativeDetails = ({navigation}) => {
  const [errorValidate, setErrorValidate] = useState(false);
  const [rname,  setRname] = useState([]);
  const [rrelation,  setRrelation]  = useState([]);
  const [rincome, setRincome]  = useState([]);
  const [rage, setRage]                     = useState([]);
  const [reducation, setReducation]  = useState([]);
  const [roccupation, setRoccupation]      = useState([]);
  const [familyData, setFamilyData]       = useState([]);
  const regform_id                      = null;
  // const regform_id = '321';
  const rdata = [
    { label: 'Mother', value: 'Mother' },
    { label: 'Father', value: 'Father' },
    { label: 'Husband', value: 'Husband' },
    { label: 'Wife', value: 'Wife' },
    { label: 'Son', value: 'Son' },
    { label: 'Daughter', value: 'Daughter' },
    { label: 'Sister', value: 'Sister'},
    { label: 'Brother', value: 'Brother'},
  ];
 
  const monthlyIncome = [
    { label: '0', value: '0' },
    { label: '1-20k', value: '1-20k' },
    { label: '21k-40k', value: '21k-40k' },
    { label: '41k-60k', value: '41k-60k' },
    { label: '61k and above', value: '61k and above' },
   
  ];

  const agegroup = [
    { label: '0-5',   value: '0-5' },
    { label: '6-10',  value: '6-10' },
    { label: '11-15', value: '11-15' },
    { label: '16-20', value: '16-20' },
    { label: '21-25', value: '21-25' },
    { label: '26-30', value: '26-30' },
    { label: '31-35', value: '31-35' },
    { label: '36-40', value: '36-40' },
    { label: '41-45', value: '41-45' },
    { label: '46-50', value: '46-50' },
    { label: '51-55', value: '51-55' },
    { label: '56-60', value: '56-60' },
    { label: '61-65', value: '61-65' },
    { label: '66-70', value: '66-70' },
    { label: '71-75', value: '71-75' },
    { label: '76-100', value: '76-100' },
    { label: '101-120', value:'101-120' },
  ];

  const classYears = [
    { label: 'None',   value: 'None' },
    { label: 'Nursery',  value: 'Nursery' },
    { label: 'Prep', value: 'Prep' },
    { label: '1 Years', value: '1' },
    { label: '2 Years', value: '2' },
    { label: '3 Years', value: '3' },
    { label: '4 Years', value: '4' },
    { label: '5 Years', value: '5' },
    { label: '6 Years', value: '6' },
    { label: '7 Years', value: '7' },
    { label: '8 Years', value: '8' },
    { label: '9 Years', value: '9' },
    { label: '10 Years', value: '10' },
    { label: '11 Years', value: '11' },
    { label: '12 Years', value: '12' },
    { label: '13 Years', value: '13' },
    { label: '14 Years', value: '14' },
    { label: '15 Years', value: '15' },
    { label: '16 Years', value: '16' },
  
  ];
  const [warning, setWarning] = React.useState('');
  const handleInputChange = (input, fieldName) => {
    // Check if the input contains non-English characters
    const containsNonEnglish = /[^a-zA-Z ]/.test(input);
  
    // Set the warning based on the presence of non-English characters
    if (containsNonEnglish) {
      setWarning('Please enter text in English only.');
    } else {
      setWarning('');
    }
  
    // Filter out non-English characters
    const filteredInput = input.replace(/[^a-zA-Z ]/g, '');
  
    // Update the state based on the fieldName
    switch (fieldName) {
      case 'rname':
        setRname(filteredInput);
        break;
      case 'roccupation':
        setRoccupation(filteredInput);
        break;
      default:
        break;
    }
  };
  
  const NextStep1 = () => {
   

    // if(!familyData){
    //   setErrorValidate(true)
    //   ToastAndroid.show('Please fill all teh fields', ToastAndroid.LONG);
    //   return;

    // }else if(familyData){

   
    //   setErrorValidate(true)
    //   if(!rname){
    //     ToastAndroid.show('Please Enter your Name', ToastAndroid.LONG);
    //     return;
    //   }
    //     else if(!rrelation){
    //       ToastAndroid.show('Please Enter your Relation', ToastAndroid.LONG);
    //       return;
    //   }

    //   else if(!rincome){
    //     ToastAndroid.show('Please enter your Income', ToastAndroid.LONG);
    //     return;
    //   }

    //   else if(!reducation){
    //     ToastAndroid.show('Please enter your Education', ToastAndroid.LONG);
    //     return;
    //   }
    //   else if(!roccupation){
    //     ToastAndroid.show('Please enter your Occupation', ToastAndroid.LONG);
    //     return;
    //   }
    //   else if(!rage){
    //     ToastAndroid.show('Select Your Age', ToastAndroid.LONG);
    //     return;
    //   }else{
    //     navigation.navigate('SelectCategory')
    //   }
    // }else{

      navigation.navigate('SelectCategory')
    // }
  }

  // const family_bm = syncStorage.get('family_details');
  // console.log('In bm Family: ', family_bm);

  const saveFamilyData = () => {

    console.log(regform_id, rname, rincome, rage, rrelation, reducation, roccupation);


    //   setErrorValidate(true)
    // if(!rname){
    //   ToastAndroid.show('Please Enter your Name', ToastAndroid.LONG);
    //   return;
    // }
    //   else if(!rrelation){
    //     ToastAndroid.show('Please Enter your Relation', ToastAndroid.LONG);
    //     return;
    // }

    // else if(!rincome){
    //   ToastAndroid.show('Please enter your Income', ToastAndroid.LONG);
    //   return;
    // }

    // else if(!reducation){
    //   ToastAndroid.show('Please enter your Education', ToastAndroid.LONG);
    //   return;
    // }
    // else if(!roccupation){
    //   ToastAndroid.show('Please enter your Occupation', ToastAndroid.LONG);
    //   return;
    // }
    // else if(!rage){
    //   ToastAndroid.show('Select Your Age', ToastAndroid.LONG);
    //   return;
    // }else{
    //    navigation.navigate('FamilyDetails')
    //     if(rname != '' && rincome != ''  && rage != '' && rrelation != '' && reducation != '' && roccupation != '')
    //     {
      
        let fmData= familyData;
          fmData.push({ 
            regform_id : regform_id,
            rname         : rname,
            rrelation : rrelation,  
            rincome  : rincome,
            rage    : rage,
            reducation  : reducation,
            roccupation : roccupation,
          });

        setFamilyData(fmData);
        syncStorage.set('BMfamily_details', familyData);
        setRname('');
        setRrelation('');
        setRincome('');
        setRage('');
        setReducation('');
        setRoccupation('');
        console.log(familyData);
        ToastAndroid.show('Your Family Record is Added to the List', ToastAndroid.LONG);
    //   }
    // };
    
    
  }
  const familylist = () => {
    return familyData.map(element => {
      return (
        <View style={{backgroundColor:"grey"}}>
                      <DataTable.Row>
                        <DataTable.Cell textStyle={styles.cell}>{element.rname}</DataTable.Cell>
                        <DataTable.Cell>{element.rrelation}</DataTable.Cell>
                        <DataTable.Cell>{element.rage}</DataTable.Cell>
                        <DataTable.Cell>{element.reducation}</DataTable.Cell>
                        <DataTable.Cell>{element.roccupation}</DataTable.Cell>
                        <DataTable.Cell>{element.rincome}</DataTable.Cell>               
                      </DataTable.Row>
        </View> 
      );
    });
  };

  useEffect(()=> {
  })
  return (
  <View>

    <ImageBackground source={pwdIMage} style={{width:'100%',height:'100%',opacity:0.9}}>
    {/* <ScrollView> */}
          <View style={{padding:0, flex:1, justifyContent:'center'}}>
            <View style={{width:'100%',backgroundColor:'#fff', height:'100%',padding:30, borderRadius:0}}>
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
                خاندان کی تفصیلات
                </Text>
                </View>
              {/* <Text numberOfLines={1} style={{color:'black'}}>               
               _______________________
              </Text> */}
            

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>رشتہ دار کا نام:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                  <TextInput 
                    placeholderTextColor='grey' 
                    placeholderColor='black' 
                    placeholder='رشتہ دار کا نام درج کریں'
                    style={[styles.FamilyTextInput
                      ,{borderColor: !rname && errorValidate ? 'red':'#fff'}
                    ]} 
                    onChangeText={input => {
                      handleInputChange(input, 'rname');
                    }} 
                    value={rname}  
                  />
                </View>
                {warning !== '' && (
                  <Text style={{color: 'red', fontsize: '12'}}>{warning}</Text>
                )}

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>درخواست گزار کے ساتھ رشتہ:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                  
                   <View style={styles.container}>

                    <Dropdown
                    style={[styles.dropdown, { borderColor: !rrelation && errorValidate ? 'red' : '#fff'}]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    itemTextStyle={styles.itemTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                      data={rdata}
                      // search
                      labelField="label"
                      valueField="value"
                      placeholder={'اپنا رشتہ درج کریں'}
                      searchPlaceholder="Search..."
                      value={rrelation} 

                      onChange={item => {
                        setRrelation(item.value);
                      }}
                    />
                    </View>
                </View>

  
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>عمر:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                 
                   <View style={styles.container}>

                    <Dropdown
                    style={[styles.dropdown, { borderColor: !rage && errorValidate ? 'red' : '#fff'}]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    itemTextStyle={styles.itemTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                      data={agegroup}
                      // search
                      labelField="label"
                      valueField="value"
                      placeholder={'عمر درج کریں'}
                      searchPlaceholder="Search..."
                      value={rage} 

                      onChange={item => {
                        setRage(item.value);
                      }}
                    />
                    </View>
                </View>
            
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>تعلیم:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                  
                  <View style={styles.container}>

                    <Dropdown
                    style={[styles.dropdown, { borderColor: !reducation && errorValidate ? 'red' : '#fff'}]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    itemTextStyle={styles.itemTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                      data={classYears}
                      // search
                      labelField="label"
                      valueField="value"
                      placeholder={'تعلیم درج کریں'}
                      searchPlaceholder="Search..."
                      value={reducation} 

                      onChange={item => {
                        setReducation(item.value);
                      }}
                    />
                  </View>
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>رشتہ دار کا پیشہ:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                  <TextInput 

                    placeholderTextColor='grey'
                    placeholderColor='black' 
                    placeholder='پیشہ درج کریں'
                    style={[styles.FamilyTextInput
                      ,{borderColor: !roccupation && errorValidate ? 'red':'#fff'}
                    ]} 
                    onChangeText={input => {
                      handleInputChange(input, 'roccupation');
                    }}
                    value={roccupation}  
                  />
                </View>
                {warning !== '' && (
                  <Text style={{color: 'red', fontsize: '12'}}>{warning}</Text>
                )}
            
                
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>ماہانہ آمدنی:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                  {/* <TextInput  placeholderColor="#c4c3cb"
                  placeholderTextColor='grey'
                  placeholder='اپنی آمدنی درج کریں۔'
                  keyboardType='numeric'
                  maxLength={13}
                  style={[styles.FamilyTextInput
                    ,{borderColor: !rincome && errorValidate ? 'red':'#fff'}
                  ]}   
                  onChangeText={(rincome) => setRincome(rincome)}
                  value={rincome} 
                  /> */}
                  <View style={styles.container}>

                    <Dropdown
                    style={[styles.dropdown, { borderColor: !rincome && errorValidate ? 'red' : '#fff'}]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    itemTextStyle={styles.itemTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                      data={monthlyIncome}
                      // search
                      labelField="label"
                      valueField="value"
                      placeholder={'اپنی آمدنی درج کریں'}
                      searchPlaceholder="Search..."
                      value={rincome} 

                      onChange={item => {
                        setRincome(item.value);
                      }}
                    />
                  </View>
                </View>
            
              
           
                <View style={[styles.row,{justifyContent:'space-between',alignSelf:'flex-end', flexDirection: 'row',flex:1}]}>
                     <TouchableOpacity 
                        style={[styles.ButtonStyle, {marginRight:10}]}
                        activeOpacity={0.5}
                        onPress={() => saveFamilyData(regform_id, rname ,rincome,rage, rrelation,reducation,roccupation)} 
                        >
                      <Text style={[styles.text,{textAlign:'center'}]}>Save</Text>         
                    </TouchableOpacity>
                    {/* <TouchableOpacity  
                        onPress={NextStep}
                        style={styles.ButtonStyle}
                        activeOpacity={0.5}>
                      <Text style={[styles.text,{textAlign:'center'}]}>Next</Text>         
                    </TouchableOpacity> */}
  
        <TouchableOpacity  
                 onPress={NextStep1}
                 style={styles.ButtonStyle}
                 activeOpacity={0.5}
                 >
               <Text style={[styles.text,{textAlign:'center'}]}>Next</Text>   
        </TouchableOpacity>
      



                </View>
              </View>
            </KeyboardAvoidingView>
              <View style={styles.table}>
                <DataTable>
                  <DataTable.Header style={{ backgroundColor: '#002D62' }}>
                    <DataTable.Title textStyle={styles.textTable}>
                      <Text>Name</Text>
                    </DataTable.Title>
                    <DataTable.Title textStyle={styles.textTable}>
                      <Text>Relation</Text>
                    </DataTable.Title>
                    <DataTable.Title textStyle={styles.textTable}>
                      <Text>Age</Text>
                    </DataTable.Title>
                    <DataTable.Title textStyle={styles.textTable}>
                      <Text>Education</Text>
                    </DataTable.Title>
                    <DataTable.Title textStyle={styles.textTable}>
                      <Text>Occupation</Text>
                    </DataTable.Title>
                    <DataTable.Title textStyle={styles.textTable}>
                      <Text>Income</Text>
                    </DataTable.Title>
                  </DataTable.Header>
                  {familylist()}
                </DataTable>
              </View>
            </ScrollView>
            </View>

            
        </View>
        {/* </ScrollView> */}
      </ImageBackground>
  </View>
  );
};

const styles = StyleSheet.create({
  table: {
    // Customize the DataTable container style here
    backgroundColor: 'white', // Example background color
    borderRadius: 8, // Example border radius
    padding: 0, // Example padding
    marginTop:10
  },
  textTable: {
    // Customize the DataTable header text style here
    color: '#fff', // Example text color
    fontWeight: 'bold', // Example font weight
  },
  FamilyTextInput:{
      color:'black'
  },
  itemTextStyle:{
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
    height:40,
    width:'30%',
    padding:10,
    borderRadius: 10,
    // elevation: 3,
    backgroundColor: '#002D62',
    marginTop:10,
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

export default RelativeDetails;