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
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
  isInProgress,
  types,
} from 'react-native-document-picker';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  card,
  useColorScheme,
  View,
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
// import syncStorage from 'react-native-sync-storage';



const nashemanPress = () =>{
  Alert.alert('Coming Soon !');
}


const SelectCategory = ({navigation}) => {

  const [genderCheck,setGender] = useState('');
  useEffect(() => {

    const gender = syncStorage.get('gender');
    setGender(gender);
  },[])
// Get Api Call infos end
  return (
    <View>
        
      <ImageBackground source={pwdIMage} style={{width:'100%',height:'100%',opacity:0.9}}>
  
          <View style={{padding:30, flex:1, justifyContent:'center'}}>
            <View style={{width:'100%',backgroundColor:'#fff', height:450,padding:30, borderRadius:30}}>
            <ScrollView>
              <View style={[styles.loginFormView,{}]}>
                <View style={{}}>
                <Text style={[styles.logoText,{paddingTop:-1,textAlign: 'center',color: '#002D62', fontWeight: "bold",fontSize: 20}]}>کوئی ایک قسم منتخب کریں</Text>
                <View style={styles.horizontalLine} />
                </View>


                {/* <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Select your Category</Text> */}
        <View style={{justifyContent: "space-between",alignItems: "center"}}>
          <TouchableOpacity  
                style={styles.button}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Disable')}
                >          
              <Text style={[styles.text,{textAlign:'center'}]}>معذور/ضرورت مند افراد </Text>
              {/* <Text style={[styles.text,{textAlign:'center'}]}>Persons</Text> */}
          </TouchableOpacity>
        </View> 

        
        
              
        <View style={{justifyContent: "space-between",alignItems: "center"}}>
        {genderCheck == 'Female'? 
          <TouchableOpacity  
                style={styles.button}
                activeOpacity={0.5}
                onPress={() =>navigation.navigate('Marriage')}
                >          
              <Text style={[styles.text,{textAlign:'center'}]}>شادی کے لیے عطیہ</Text>
              {/* <Text style={[styles.text,{textAlign:'center'}]}>Persons</Text> */}
          </TouchableOpacity>

          : <TouchableOpacity  
          style={styles.button}
          activeOpacity={0.5}
          onPress={() =>  Alert.alert('Only females can apply for marriage grant')}
          >          
        <Text style={[styles.text,{textAlign:'center'}]}>شادی کے لیے عطیہ</Text>
        {/* <Text style={[styles.text,{textAlign:'center'}]}>Persons</Text> */}
    </TouchableOpacity>} 
        </View>
        <View style={{justifyContent: "space-between",alignItems: "center"}}>
          <TouchableOpacity  
                style={styles.button}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Medical')}
                >          
              <Text style={[styles.text,{textAlign:'center'}]}>طبی علاج معالجہ</Text>
              {/* <Text style={[styles.text,{textAlign:'center'}]}>Persons</Text> */}
          </TouchableOpacity>
        </View>
        <View style={{justifyContent: "space-between",alignItems: "center"}}>
         <TouchableOpacity  
                style={styles.button}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Education')}
                > 
              <Text style={[styles.text,{textAlign:'center'}]}>تعلیمی وظائف</Text>
              {/* <Text style={[styles.text,{textAlign:'center'}]}>Stipend</Text> */}
         </TouchableOpacity>
        </View>
        <View style={{justifyContent: "space-between",alignItems: "center"}}>
         <TouchableOpacity  
                style={styles.button}
                activeOpacity={0.5}
               onPress={() => Alert.alert('Coming Soon!')}
                > 
              <Text style={[styles.text,{textAlign:'center'}]}>این جی او</Text>
              {/* <Text style={[styles.text,{textAlign:'center'}]}>Stipend</Text> */}
         </TouchableOpacity>
        </View>
        
        {/* <View>
        <TouchableOpacity  
                style={styles.button}
                activeOpacity={0.5}
            
                > 
              <Text style={[styles.text,{textAlign:'center'}]}>NGOs</Text>
        </TouchableOpacity>
        </View> */}

{/* 
        <View>
        <TouchableOpacity  
                style={styles.button}
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Otherinformation')}
                > 
              <Text style={[styles.text,{textAlign:'center'}]}>NEXT</Text>
        </TouchableOpacity>
        </View> */}

        
              </View>
            </ScrollView>
            </View>
        </View>
        </ImageBackground>
      </View>
  
  );
};

const styles = StyleSheet.create({
  horizontalLine:{
    borderBottomWidth: 1,
    borderBottomColor: '#002D62',
    marginVertical: 10
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
    height:50,
    width:200,
    // paddingHorizontal: 20,
    borderRadius: 14,
    backgroundColor: '#002D62',
    // marginLeft:'2%',
    marginTop:15
  },
  text:{
    color:'white',
    fontSize:14,
    fontFamily: "sans-serif",
  
  },
row:{
 flex:1,
 flexDirection:'row'
}
});

export default SelectCategory;
