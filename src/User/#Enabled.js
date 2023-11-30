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
import regIMage9 from '../../assets/images/PWDfooter.png';
import regIMage10 from '../../assets/images/pitb.png';
import medicalinfo from '../../assets/images/medicalinfo.png';
import Files from '../../assets/images/Files.png';
import PersonalInfo from '../../assets/images/PersonalInfo.png';
import educationinfo from '../../assets/images/educationinfo.png';
import jobs from '../../assets/images/jobs.png';
import Footer from '../Components/Footer';

const Enabled = ({ navigation }) => {

  // useEffect(() => {
  //   SplashScreen.hide();
  // },[]);


  return (

    <View>

      <ImageBackground source={pwdIMage} style={{ width: '100%', height: '100%' }}>

        <View>
          <Text style={[styles.buttonText, { fontWeight: "bold", fontSize: 22, paddingTop: 40, color: '#fff', textAlign: 'center' }]}># Enabled</Text>
        </View>

        <View style={{ padding: 1, flex: 1, justifyContent: 'center', paddingTop: '30%' }}>

          <View style={{ width: '100%', backgroundColor: '#fff', height: '90%', paddingLeft: 50, paddingTop: 10, borderTopLeftRadius: 15, borderTopRightRadius: 15, opacity: 0.8, marginTop: '10%'  }}>


          
              <ScrollView
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}>

                <TouchableOpacity onPress={() => navigation.navigate('')}>
                  <View style={[styles.tiles,{marginTop:30}]}>

                    <View style={{ width: '20%' }}>
                      <Image source={PersonalInfo} style={[styles.imagetiles]} />
                    </View>
                    <View style={[styles.textview]}>
                      <Text style={[styles.buttonText]}>
                        PWD Request (For #Enabled) 
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('')}>
                  <View style={[styles.tiles]}>

                    <View style={{ width: '20%' }}>
                      <Image source={educationinfo} style={[styles.imagetiles]} />
                    </View>
                    <View style={[styles.textview]}>
                      <Text style={[styles.buttonText]}>
                     SWO Approval
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('')}>
                  <View style={[styles.tiles]}>

                    <View style={{ width: '20%' }}>
                    <Image source={educationinfo} style={[styles.imagetiles]} />
                    </View>
                    <View style={[styles.textview]}>
                      <Text style={[styles.buttonText]}>
                      DD Approval
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('')}>
                  <View style={[styles.tiles]}>

                    <View style={{ width: '20%' }}>
                      <Image source={jobs} style={[styles.imagetiles]} />
                    </View>
                    <View style={[styles.textview]}>
                      <Text style={[styles.buttonText]}>
                        Donor Selection
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('')}>
                  <View style={[styles.tiles]}>

                    <View style={{ width: '20%' }}>
                      <Image source={Files} style={[styles.imagetiles]} />
                    </View>
                    <View style={[styles.textview]}>
                      <Text style={[styles.buttonText]}>
                        Payments & Shipments
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>


              </ScrollView>
           

          </View>

          {/* <View style={{ backgroundColor: '#0C2D48', height: 110, width: '130%', paddingTop: 5, marginLeft: -40 }}>
            <View style={{ flexDirection: 'row', flex: 1 }}>
              <Image source={regIMage9} style={{ height: '45%', width: '35%' }} />
              <Image source={regIMage10} style={{ height: '45%', width: '10%', marginLeft: '35%' }} />
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
    fontWeight: 'normal',
    color: '#fff',
    fontSize: 16,
    fontFamily: 'sans-serif',
    // textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',

    fontWeight: "bold"

  },
  tiles: {
    backgroundColor: '#003060',
    height: 55,
    width: '82%',
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row', width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  imagetiles: {
    width: '70%',
    height: '70%',
    resizeMode: 'contain',
  },
  textview: {
    textAlign: 'center',
    width: '65%'
  },
  image: {
    width: '40%', height: 40,
    marginLeft: '-10%',
    resizeMode: 'contain',
    // marginRight:10
    // marginTop:10,
  }




});

export default Enabled;
