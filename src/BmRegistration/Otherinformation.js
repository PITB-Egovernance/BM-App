/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React,{useEffect,useCallback,useState} from 'react';
import { RadioButton} from 'react-native-paper';
import DocumentScanner from 'react-native-document-scanner-plugin';
// import DocumentPicker, {
//   DirectoryPickerResponse,
//   DocumentPickerResponse,
//   isInProgress,
//   types,
// } from 'react-native-document-picker';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  card,
  useColorScheme,
  View,
  ToastAndroid,
  Button,
  ImageBackground,
  onLoginPress,
  onPressLearnMore,
  Image,
  TouchableOpacity,
  
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown'; 
import { Alert, Keyboard, KeyboardAvoidingView,  TextInput, TouchableWithoutFeedback,  } from "react-native";
import pwdIMage from  '../../assets/images/background.png';
import back from '../../assets/images/back.png';
import { Colors } from "react-native/Libraries/NewAppScreen";
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import syncStorage from 'react-native-sync-storage';
import { DatePickerInput } from 'react-native-paper-dates';

// step1
import DocumentPicker,{types} from 'react-native-document-picker';

const Otherinformation = ({navigation}) => {

const [errorValidate, setErrorValidate] =  useState(false);
const [service, setService] = useState('');
const [otherservice, setGovernmentData] = useState('');

const [reg_date, setReg_date] = useState('');

const [yourincome, setYourincome] = useState('');
const [parentincome, setParentincome] = useState('');
 // step2 Affidavite BM       
 const [affidavitImage, setAffidavitImage] = useState('');
 const [uriaffidavit, setURIAffidavit] = useState('');
 const [affidavitName, setAffidavitName] = useState('');
 const [affidavitType, setAffidavitType] = useState('');

 const GovernmentData = [
  { label: 'Sehat Card', value: 'Sehat Card' },
  { label: 'Khidmat Card', value: 'Khidmat Card' },
  { label: 'Government Job', value: 'Government Job' },
  { label: 'Ehsas Program', value: 'Ehsas Program' },
  { label: 'Benazir Income Support Program', value: 'Benazir Incmome Support Program' },
  { label: 'Bait ul Mal', value: 'Bait ul Mal' },
];
useEffect(() =>{
  const bmuser_id = syncStorage.get('bmuser_id');
  console.log('aaaaasss bmUserId is : ',bmuser_id);
}, []);

const NextStep = () => {
  setErrorValidate(true);
  if (!service) {
    ToastAndroid.show('Availing any service', ToastAndroid.LONG);
    return;
  } 
  //  else if (!affidavitName) {
  //   ToastAndroid.show('Fill The Required Information', ToastAndroid.LONG);
  //   return;
  // } 
  else {
    console.log('Service ', service, 'GovernmentData', otherservice, affidavitImage, uriaffidavit, 'Yourincome', yourincome, 'Parentincome', parentincome);
    syncStorage.set('Service', service);
    syncStorage.set('GovernmentData', otherservice);
    syncStorage.set('affidavitImage', affidavitImage);
    syncStorage.set('uriaffidavit', uriaffidavit);
    syncStorage.set('affidavitName', affidavitName);
    syncStorage.set('affidavitType', affidavitType);
    syncStorage.set('Yourincome', yourincome);
    syncStorage.set('Parentincome', parentincome);
    syncStorage.set('Reg_date', reg_date);
    navigation.navigate('RelativeDetails');
  }
}



  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
        <Text style={styles.selectedTextStyle}>{item.label}</Text>
      </View>
    );
  };

// step3
  const affidavit = async () => {
    DocumentPicker.pick({
      allowMultiSelection: false,
      type: [DocumentPicker.types.images,DocumentPicker.types.pdf],
    })
      .then((response) =>
   {   
      // console.log('response',JSON.stringify(response[0], null, 2))
      setAffidavitImage(response[0].uri)
      setURIAffidavit(response[0].uri)
      setAffidavitName(response[0].name)
      setAffidavitType(response[0].type)
   })

   
  }
  
 
// Get Api Call infos end
  return (
    <View>
        
  <ImageBackground source={pwdIMage} style={{width:'100%',height:'100%',opacity:0.9}}>
  
     <View style={{padding:0, flex:1, justifyContent:'center'}}>
        <View style={{width:'100%',backgroundColor:'#fff', height:'100%',padding:30, borderRadius:0}}>
           <ScrollView>
              <View style={[styles.loginFormView,{}]}>
                <View style={{}}>
                <Text style={[styles.logoText,{paddingTop:-1,textAlign: 'center',color: '#002D62', fontWeight: "bold",fontSize: 20}]}>دی گئی معلومات پُر کریں</Text>
                </View>


                {/* Dublicate Info */}   
                {/* <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Personal Data(Multiple Table)</Text> */}
          

                <View>
                <Text style={[styles.logoText,{textAlign: 'center',color: '#002D62', fontWeight: "bold",fontSize: 12}]}>{"\n"}نوٹ: ان درخواست گزار کو ترجیح دی جائے گی جنہیں حکومت کی طرف سے کوئی اور سہولت میسر نہیں </Text>
                </View>


                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>کوئی سرکاری خدمات حاصل ہیں:</Text>
                <RadioButton.Group  onValueChange={service => setService(service)} value={service} style={{}}>
                <View style={{ flexDirection: 'row',marginTop:15, justifyContent:'center'}}>
                    <View style={{flexDirection: "row"}}>
                      <RadioButton value="Yes"/>
                      <Text style={{fontWeight: 'bold',marginTop:'10%',color:'black'}}>ہاں</Text>
                    </View>
                    <View  style={{flexDirection: "row"}}>
                      <RadioButton value="No" />
                      <Text style={{fontWeight: 'bold',marginTop:'10%',color:'black'}}>نہیں</Text>
                    </View>
                </View>
              </RadioButton.Group>
              {service =='Yes'?
              <View>

              <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}} >سرکاری خدمات:</Text>

              <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>

<View style={styles.container}>

        <MultiSelect
          style={styles.Dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={GovernmentData}
          // search
          labelField="label"
          valueField="value"
          placeholder={'خدمت منتخب کریں'}
          // searchPlaceholder="Search..."
          value={otherservice}

          onChange={item => {
              setGovernmentData(item);
          }}
          renderLeftIcon={() => (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )}
          renderItem={renderItem}
          renderSelectedItem={(item, unSelect) => (
            <TouchableOpacity style={{color:'black'}} onPress={() => unSelect && unSelect(item)}>
             <View style={{ ...styles.selectedTextStyle, marginTop: 10}}>
                <AntDesign color="black" name="delete" size={15} />
                <Text style={styles.textSelectedStyle}>{item.label}</Text>
              </View>
            </TouchableOpacity>
          )}

        />
</View>

</View>
 </View>:null

    }

          <Text style={{marginTop:70,fontWeight:"bold",color:"#000000"}}>حلف نامہ اپ لوڈ کریں(Optional):</Text>
              <View style={{marginTop:5,backgroundColor:'#D3D3D3',borderRadius:5, height:100 }}>
                <TouchableOpacity onPress={affidavit} style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:60 }}>
                  {affidavitImage != '' ? <Image source={{uri:affidavitImage}} style={{width: '100%', height: 60,resizeMode : 'contain' }} /> :null}
                </TouchableOpacity>
              </View>


        <View>
        {/* <TouchableOpacity  
        
                style={styles.button}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('RelativeDetails')}
                > 
              <Text style={[styles.text,{textAlign:'center'}]}>NEXT</Text>
        </TouchableOpacity> */}
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableOpacity
                      style={styles.button}
                      activeOpacity={0.5}
                      onPress={NextStep}
                    >
                  <Text style={[styles.text, { textAlign: 'center' }]}>
                    NEXT
                  </Text>
                </TouchableOpacity>
              </View>


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
  Step1FormTextInput:{
    flex: 1,
    color: 'black',
    borderWidth: 1,
    backgroundColor:'#D3D3D3',
    borderRadius:5, 
    height:40,
    borderColor: '#dadae8',
  },
  dropdown: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 5,
    paddingHorizontal: 8,
    backgroundColor:'#D3D3D3',
    margin: 0
  },
  
  button:{
    justifyContent: 'center',
    paddingVertical: 5,
    height:40,
    width:90,
    // paddingHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#002D62',
    marginLeft:'60%',
    marginTop:10
  },
  text:{
    color:'white',
    fontSize:14,
    fontFamily: "sans-serif",
  
  },
row:{
 flex:1,
 flexDirection:'row'
},
Dropdown:{
  height: 40,
  borderColor: 'gray',
  borderWidth: 0.5,
  borderRadius: 5,
  paddingHorizontal: 8,
  backgroundColor:'#D3D3D3',
  margin: 0
},
placeholderStyle: {
  color: 'grey',
  fontSize: 14,
  margin: 2
},
selectedTextStyle: {
  fontSize: 16,
  color: 'black',
  flexDirection:'row'
},
textSelectedStyle: {
  fontSize: 12,
  color: 'black',
  flexDirection:'row',
},
itemTextStyle: {
  color: 'black'
},
inputSearchStyle : {
  color:'black'
},
item:{
  flexDirection:'row',
  margin: 10,

}
});

export default Otherinformation;
