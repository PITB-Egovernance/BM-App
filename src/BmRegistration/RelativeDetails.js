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


  const NextStep1 = () => {
    setErrorValidate(true)
     navigation.navigate('SelectCategory')

  }

  // const family_bm = syncStorage.get('family_details');
  // console.log('In bm Family: ', family_bm);

  const saveFamilyData = () => {

    console.log(regform_id, rname, rincome, rage, rrelation, reducation, roccupation);


  //   setErrorValidate(true)
  //   if(!rname){
  //     ToastAndroid.show('Please Enter your Name', ToastAndroid.LONG);
  //     return;
  //   }
  //   else if(!rrelation){
  //      ToastAndroid.show('Please Enter your Relation', ToastAndroid.LONG);
  //      return;
  //  }

  //  else if(!rincome){
  //    ToastAndroid.show('Please enter your Income', ToastAndroid.LONG);
  //    return;
  //  }

  //  else if(!reducation){
  //   ToastAndroid.show('Please enter your Education', ToastAndroid.LONG);
  //   return;
  // }
  // else if(!roccupation){
  //   ToastAndroid.show('Please enter your Occupation', ToastAndroid.LONG);
  //   return;
  // }
  //  else if(!rage){
  //    ToastAndroid.show('Select Your Age', ToastAndroid.LONG);
  //    return;
  //  }else{
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
    
     syncStorage.set('BMfamily_details', familyData);
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
                    onChangeText={(rname) => setRname(rname)}
                    value={rname}  
                  />
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>درخواست گزار کے ساتھ رشتہ:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                  <TextInput 

                    placeholderTextColor='grey'
                    placeholderColor='black' 
                    placeholder='اپنا رشتہ درج کریں'
                    style={[styles.FamilyTextInput
                      ,{borderColor: !rrelation && errorValidate ? 'red':'#fff'}
                    ]} 
                    onChangeText={(rrelation) => setRrelation(rrelation)}
                    value={rrelation}  
                  />
                </View>

  
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>عمر:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                  <TextInput 

                    placeholderTextColor='grey'
                    placeholderColor='black' 
                    placeholder='عمر درج کریں'
                    maxLength={3}
                    keyboardType='numeric'
                    style={[styles.FamilyTextInput
                      ,{borderColor: !rage && errorValidate ? 'red':'#fff'}
                    ]} 
                    onChangeText={(rage) => setRage(rage)}
                    value={rage}  
                  />
                </View>
            
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>تعلیم:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                  <TextInput 

                    placeholderTextColor='grey'
                    placeholderColor='black' 
                    placeholder='تعلیم درج کریں'
                    style={[styles.FamilyTextInput
                      ,{borderColor: !reducation && errorValidate ? 'red':'#fff'}
                    ]} 
                    onChangeText={(reducation) => setReducation(reducation)}
                    value={reducation}  
                  />
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
                    onChangeText={(roccupation) => setRoccupation(roccupation)}
                    value={roccupation}  
                  />
                </View>
            
                
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>ماہانہ آمدنی:</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                  <TextInput  placeholderColor="#c4c3cb"
                  placeholderTextColor='grey'
                  placeholder='اپنی آمدنی درج کریں۔'
                  keyboardType='numeric'
                  maxLength={13}
                  style={[styles.FamilyTextInput
                    ,{borderColor: !rincome && errorValidate ? 'red':'#fff'}
                  ]}   
                  onChangeText={(rincome) => setRincome(rincome)}
                  value={rincome} 
                  />
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