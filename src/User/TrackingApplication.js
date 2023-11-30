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
import regIMage1 from '../../assets/images/TOAPP-02.png';
import regIMage2 from '../../assets/images/TOAPP-03.png';
import regIMage3 from '../../assets/images/TOAPP-04.png';
import regIMage4 from '../../assets/images/TOAPP-05.png';
import regIMage5 from '../../assets/images/TOAPP-06.png';
import regIMage6 from '../../assets/images/sms.png';
import regIMage9 from '../../assets/images/PWDfooter.png';
import Footer from '../Components/Footer';



const TrackingApplication = () => {

  // useEffect(() => {
  //   SplashScreen.hide();
  // },[]);


  return (

    <View>

      <ImageBackground source={pwdIMage} style={{ width: '100%', height: '100%', opacity: 1 }}>

        <View>
          <Text style={{ fontWeight: "bold", fontSize: 22, paddingTop: 40, color: '#fff', textAlign: 'center' }}># Enabled</Text>
        </View>

        <View style={{ padding: 1, flex: 1, justifyContent: 'center', paddingTop: '30%' }}>

          <View style={{ width: '100%', backgroundColor: '#fff', height: '90%', padding: 30, borderTopLeftRadius: 15, borderTopRightRadius: 15, opacity: 0.8, marginTop: '10%' }}>

            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}>
              <View style={[styles.tiles, {}]}>
                <TouchableOpacity onPress={onPress} style={[styles.button, { flexDirection: 'row', padding: 10 }]}>
                  <Image source={regIMage} style={{ width: '20%', height: 30 }} />

                  <Text style={[styles.buttonText, { marginLeft: 10 }]}>Form Submission</Text>

                </TouchableOpacity>
              </View>


              <View style={{ backgroundColor: '#003060', height: 50, width: '80%', borderRadius: 10, marginTop: 30, marginLeft: 25 }}>
                <TouchableOpacity onPress={onPress} style={styles.button}>
                  <Image source={regIMage1} style={{ width: '40%', height: 40, marginTop: 5, marginLeft: -10 }} />
                  <View style={{ marginLeft: '30%', marginTop: '-18%' }}>
                    <Text style={[styles.buttonText, {}]}>
                      {'        '}SWD{'\n'}<Text style={{ fontSize: 18 }}>(Field visit Officer)</Text>
                    </Text>
                  </View>

                </TouchableOpacity>
              </View>


              <View style={{ backgroundColor: '#003060', height: 50, width: '80%', borderRadius: 10, marginTop: 30, marginLeft: 25 }}>
                <TouchableOpacity onPress={onPress} style={styles.button}>
                  <Image source={regIMage2} style={{ width: '40%', height: 40, marginTop: 10, marginLeft: -10 }} />
                  <View style={{ marginLeft: '30%', marginTop: '-18%' }}>
                    <Text style={[styles.buttonText, { marginTop: 5 }]}>
                      DD Verification
                    </Text>
                  </View>

                </TouchableOpacity>
              </View>

              {/* MSO Verification */}
              <View style={{ backgroundColor: '#003060', height: 50, width: '80%', borderRadius: 10, marginTop: 30, marginLeft: 25 }}>
                <TouchableOpacity onPress={onPress} style={styles.button}>
                  <Image source={regIMage3} style={{ width: '40%', height: 50 }} />
                  <View style={{ marginLeft: '30%', marginTop: '-18%' }}>
                    <Text style={[styles.buttonText, { marginTop: 5, marginLeft: 5 }]}>
                      Donor Selection
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* TEVTA TRAINING */}
              <View style={{ backgroundColor: '#003060', height: 50, width: '80%', borderRadius: 10, marginTop: 30, marginLeft: 25 }}>
                <TouchableOpacity onPress={onPress} style={styles.button}>
                  <Image source={regIMage4} style={{ width: '40%', height: 40, marginTop: 5 }} />
                  <View style={{ marginLeft: '30%', marginTop: '-18%' }}>
                    <Text style={[styles.buttonText, { marginTop: 10 }]}>
                      {'    '}Payment
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              {/* Labor Job */}
              <View style={{ backgroundColor: '#003060', height: 50, width: '80%', borderRadius: 10, marginTop: 30, marginLeft: 25 }}>
                <TouchableOpacity onPress={onPress} style={styles.button}>
                  <Image source={regIMage5} style={{ width: '40%', height: 40, marginTop: 5 }} />
                  <View style={{ marginLeft: '30%', marginTop: '-18%' }}>
                    <Text style={[styles.buttonText, { marginTop: 5 }]}>
                      {'    '}Shipment
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>

          </View>

          {/* <View style={{ width: '130%', backgroundColor: '#0C2D48', height: '25%', marginLeft: -5 }}>
            <View style={{}}>
              <Image source={regIMage9} style={{ height: '70%', width: '40%', marginLeft: -50 }} />
            </View>
          </View> */}
          <Footer/>


        </View>


      </ImageBackground>

    </View>


  );
};

const styles = StyleSheet.create({
  buttonText: {

    color: '#fff',
    fontSize: 18,
    fontFamily: 'sans-serif',

  },
  tiles: {
    backgroundColor: '#003060',
    height: 50,
    width: '80%',
    borderRadius: 10,
    marginLeft: 25,
    flexDirection: 'row',
    marginTop: 10,
  }




});

export default TrackingApplication;
