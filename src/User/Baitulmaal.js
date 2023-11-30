/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import react from "react";


import React, { useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
// import  from 'react';

import SplashScreen from 'react-native-splash-screen'
import {
  StyleSheet,
  onPress,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  ScrollView,


} from 'react-native';


import { Image } from "react-native";
// import pwdIMage from  '../pwd-app/assets/images/background.png';
import pwdIMage from '../../assets/images/background.png'
import regIMage from '../../assets/images/PWDREG-01.png';
import regIMage1 from '../../assets/images/DRTC-02.png';
import regIMage2 from '../../assets/images/TOAPP-03.png';
import regIMage3 from '../../assets/images/DRTC-03.png';
import regIMage4 from '../../assets/images/DRTC-05.png';
import regIMage5 from '../../assets/images/DRTC-04.png';
import regIMage6 from '../../assets/images/sms.png';
import regIMage9 from '../../assets/images/PWDfooter.png';
import regIMage10 from '../../assets/images/pitb.png';
import Footer from '../Components/Footer';



const Baitulmaal = ({ navigation }) => {

  // useEffect(() => {
  //   SplashScreen.hide();
  // },[]);


  return (

    <View>

      <ImageBackground source={pwdIMage} style={{ width: '100%', height: '100%' }}>

        <View>
          <Text style={[styles.buttonText, { fontWeight: "bold", fontSize: 22, paddingTop: 40, color: '#fff', textAlign: 'center' }]}>Bait-ul-maal</Text>
        </View>

        <View style={{ padding: 1, flex: 1, justifyContent: 'center', paddingTop: '30%' }}>

          <View style={{ width: '100%', backgroundColor: '#fff', height: '90%', padding: 30, borderTopLeftRadius: 15, borderTopRightRadius: 15, opacity: 0.8, marginTop: '10%'  }}>

              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>

                {/* <View style={styles.row}>
                  <View style={[styles.tiles, {}]}>
                    <TouchableOpacity onPress={() => navigation.navigate('BmRegistration')} style={[styles.button, { flexDirection: 'row', padding: 10 }]}>
                      <Image source={regIMage} style={{ width: '20%', height: 40 }} />
                      <View style={{ marginLeft: '10%', marginTop: '-1%' }}>
                        <Text style={[styles.buttonText, { marginLeft: 10 }]}>
                          {'   '}PWD Request{'\n'}<Text style={{ fontSize: 16, fontWeight: "normal" }}>{'      '}(For BM)</Text>
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPress}>
                      <Image source={regIMage6} style={{ height: 30 }} />
                    </TouchableOpacity>
                  </View>
                </View> */}
               
                <View style={{ backgroundColor: '#003060', height: 55, width: '82%', borderRadius: 10, marginTop: 10, marginLeft: 25 }}>
                    <TouchableOpacity  onPress={() => navigation.navigate('BmRegistration')}>
                      <Image source={regIMage} style={{ width: '15%', height: 40, marginTop: 5,marginLeft:'3%' }} />
                      <View style={{ marginLeft: '22%', marginTop: '-15%' }}>
                        <Text style={[styles.buttonText,{ color: '#fff', fontSize: 16, fontFamily: 'sans-serif',marginTop:'4%',marginLeft:'-1%' }]}>
                          Request For BM
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                {/* <View style={{ backgroundColor: '#003060', height: 60, width: '80%', borderRadius: 10, marginTop: 20, marginLeft: 25 }}>
                  <TouchableOpacity onPress={() => navigation.navigate('Education')}>

                    <Image source={regIMage1} style={{ width: '50%', height: 50, marginTop: 5, marginLeft: -30 }} />
                    <View style={{ marginLeft: '30%', marginTop: '-20%' }}>
                      <Text style={{ color: '#fff', fontSize: 16, fontFamily: 'sans-serif', }}>
                        Forwading Application{'\n'}<Text style={{ fontSize: 18, fontWeight: "bold" }}>
                          {'          '}To DD</Text>
                      </Text>
                    </View>

                  </TouchableOpacity>
                </View> */}
                 <View style={{ backgroundColor: '#003060', height: 55, width: '82%', borderRadius: 10, marginTop: 10, marginLeft: 25 }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Education')}>

                      <Image source={regIMage1} style={{ width: '45%', height: 50, marginTop: 5, marginLeft: -28 }} />
                      <View style={{ marginLeft: '22%', marginTop: '-20%' }}>
                        <Text style={[styles.buttonText,{ color: '#fff', fontSize: 16, fontFamily: 'sans-serif',marginTop:'6%',marginLeft:'-1%' }]}>
                          Forwarding To DD
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>



                {/* <View style={{ backgroundColor: '#003060', height: 60, width: '80%', borderRadius: 10, marginTop: 20, marginLeft: 25 }}>
                  <TouchableOpacity onPress={onPress}>
                    <Image source={regIMage2} style={{ width: '40%', height: 40, marginTop: 10, marginLeft: -10 }} />
                    <View style={{ marginLeft: '30%', marginTop: '-18%' }}>
                      <Text style={{ color: '#fff', fontSize: 16, fontFamily: 'sans-serif' }}>
                        {'     '}DD Verify{'\n'}{'     '}Application
                      </Text>
                    </View>

                  </TouchableOpacity>
                </View> */}
                  <View style={{ backgroundColor: '#003060', height: 55, width: '82%', borderRadius: 10, marginTop: 10, marginLeft: 25 }}>
                    <TouchableOpacity onPress={onPress}>
                      <Image source={regIMage2} style={{ width: '30%', height: 40, marginTop: 10, marginLeft: -10 }} />
                      <View style={{ marginLeft: '22%', marginTop: '-15%' }}>
                        <Text style={[styles.buttonText,{ color: '#fff', fontSize: 16, fontFamily: 'sans-serif',marginTop:'3%',marginLeft:'-1%' }]}>
                          DD Verification
                        </Text>
                      </View>

                    </TouchableOpacity>
                  </View>

                 <View style={{ backgroundColor: '#003060', height: 55, width: '82%', borderRadius: 10, marginTop: 10, marginLeft: 25 }}>
                    <TouchableOpacity onPress={onPress} style={styles.button}>
                      <Image source={regIMage3} style={{ width: '50%', height: 50, marginLeft: -30, marginTop: 5,marginLeft:'-13%' }} />
                      <View style={{ marginLeft: '21%', marginTop: '-15%' }}>
                        <Text style={[styles.buttonText,{ color: '#fff', fontSize: 16, fontFamily: 'sans-serif',marginTop:'-1%',marginLeft:'1%' }]}>
                          Committee Processing
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View style={{ backgroundColor: '#003060', height: 55, width: '82%', borderRadius: 10, marginTop: 10, marginLeft: 25 }}>
                    <TouchableOpacity onPress={onPress} style={styles.button}>
                      <Image source={regIMage4} style={{ width: '30%', height: 40, marginTop: 5,marginLeft:'-4%' }} />
                      <View style={{ marginLeft: '22%', marginTop: '-15%' }}>
                        <Text style={[styles.buttonText,{ color: '#fff', fontSize: 16, fontFamily: 'sans-serif',marginTop:'7%',marginLeft:'0.5%' }]}>
                        Fund Disbersement
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View style={{ backgroundColor: '#003060', height:55, width: '82%', borderRadius: 10, marginTop: 10, marginLeft: 25 }}>
                    <TouchableOpacity onPress={onPress} style={styles.button}>
                      <Image source={regIMage5} style={{ width: '25%', height: 40, marginTop: 5,marginLeft:'-1%' }} />
                      <View style={{ marginLeft: '20%', marginTop: '-18%' }}>
                        <Text style={[styles.buttonText,{ color: '#fff', fontSize: 16, fontFamily: 'sans-serif',marginTop:'9%',marginLeft:'2%' }]}>
                          Cheque Issued
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
              </ScrollView>
          
          </View>
          <Footer />

          {/* <View style={{ backgroundColor: '#0C2D48', height: 110, width: '130%', paddingTop: 5, marginLeft: -40 }}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Image source={regIMage9} style={{ height: '45%', width: '35%' }} />
              <Image source={regIMage10} style={{ height: '45%', width: '10%', marginLeft: '35%' }} />
            </View>
          </View> */}
          
        </View>


      </ImageBackground>

    </View>


  );
};

const styles = StyleSheet.create({
  buttonText: {

    color: '#fff',
    fontSize: 16,
    fontFamily: 'sans-serif',
    fontWeight: "bold"

  },
  tiles: {
    backgroundColor: '#003060',
    height: 60,
    width: '80%',
    borderRadius: 10,
    marginLeft: 25,
    flexDirection: 'row',
    marginTop: 10,
  }




});

export default Baitulmaal;
