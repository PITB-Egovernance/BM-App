/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React,{useEffect,useCallback} from 'react';
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
  
} from 'react-native';
import { CheckBox } from 'react-native-elements';
import {
  Dropdown }
  from 'react-native-material-dropdown';
  
import { Alert, Keyboard, KeyboardAvoidingView,  TextInput, TouchableWithoutFeedback,  } from "react-native";
import pwdIMage from  '../../assets/images/background.png';

import { Colors } from "react-native/Libraries/NewAppScreen";


const PwdRegistration = () => {

  return (
    <View>
        
      <ImageBackground source={pwdIMage} style={{width:'100%',height:'100%',opacity:0.9}}>
  
          <View style={{padding:30, flex:1, justifyContent:'center'}}>
            <View style={{width:'100%',backgroundColor:'#fff', height:500,padding:30, borderRadius:30}}>
            <ScrollView>
              <View style={[styles.loginFormView,{}]}>
                <View style={{}}>
                <Text style={[styles.logoText,{paddingTop:-1,textAlign: 'center',color: '#002D62', fontWeight: "bold",fontSize: 20}]}>Registerion Form</Text>
                </View>
                <Text style={{marginTop:10,fontWeight:"bold",color:"#000000"}}>First Name: (پہلا نام )</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput placeholderColor="#c4c3cb" style={styles.loginFormTextInput } />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Last Name: (آخری نام )</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput placeholderColor="#c4c3cb" style={styles.loginFormTextInput } />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Relationship: (رشتہ)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput placeholderColor="#c4c3cb" style={styles.loginFormTextInput } />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Gender: (جنس )</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                <TextInput placeholder="Enter your active phone no" placeholderColor="#c4c3cb" style={styles.loginFormTextInput } />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>CNIC: (قومی شناختی کارڈ نمبر)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                <TextInput placeholder="Select Province first" placeholderColor="#c4c3cb" style={styles.loginFormTextInput } />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Age Group: (عمرکی حد)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput } />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Date of Birth: (تاریخ پیدائش - شناختی کارڈ کے مطابق )</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput } />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Qualification: (تعلیمی قابلیت )</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput } />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Marital Status:(ازدواجی حیثیت)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>No. of dependent family: (انحصار کنندہ)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Religion: (مزہب)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Type of Disability: (معزوری کی اقسام)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Cause of Disability: (معزوری کی وجہ)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Permanent Address: (مستقل پتہ)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Present Address: (موجودہ پتہ)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Nationality: (قومیت)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>District of Domicile: (ڈومیسائل کے مطابق ضلع)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Phone Number: (موبائل نمبر)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Registration Date: (رجسٹریشن کی تاریح)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                </View>

{/* Education detail  */}
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Degrees(ڈگری)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Name of Board/Institute (بورڈ)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Subject (مضامین)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Grade (گریڈ)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Year (سال)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                </View>

{/* Experience */}
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Name of Institute (ادارہ)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Job Type (نوکری قسم)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Designation (عہدہ)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Post Held From:  (تاریح)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Post Held To:  (تاریح)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                </View>

{/* Files */}

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Choose CNIC front side</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Choose CNIC back side</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Please Upload All Degrees/ Diploma/ Educational Certificates</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Please Upload B-Form</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Please Upload All Experience letter / Certificates</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput  placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry={true} />
                </View>
                <View style={{paddingTop:30,width:'70%',paddingLeft:70}} >
                <Button buttonStyle={styles.loginButton} onPress={() => onLoginPress()} title="Register" />
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
 
  
});

export default PwdRegistration;