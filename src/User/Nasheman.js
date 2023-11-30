import React, { useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  onPress,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  ScrollView,
  Array
} from 'react-native';

import { Image } from "react-native";
import pwdIMage from '../../assets/images/background.png'
import regIMage from '../../assets/images/PWDREG-01.png';
import regIMage2 from '../../assets/images/TOAPP-03.png';
import regIMage8 from '../../assets/images/PWDREG-09.png';
import regIMage6 from '../../assets/images/PWDREG-07.png';
import Footer from '../Components/Footer';
import syncStorage from 'react-native-sync-storage';

const Nasheman = ({ route, navigation }) => {

  const [errorValidate, setErrorValidate] = useState(false);
  const [Focus, setFocus] = useState(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [nashemanApproval, setApproval] = useState('');
  const [nashemanRejected, setRejected] = useState('');
  const [nashemanVerification, setVerification] = useState('');
  const [nashemanCertified, setCertified] = useState('');
  const [nashemanRegistered, setNashemanReg] = useState('');

  // const nashemanPwd = [route.params.nashemanPwd] == undefined && syncStorage.get('nashemanPwd') == undefined ? syncStorage.get('nashemanPwd') :
  //   [route.params.nashemanPwd] == undefined && syncStorage.get('nashemanPwd') != undefined ? syncStorage.get('nashemanPwd') :
  //     syncStorage.get('nashemanPwd');
      const nashemanPwd =
      // no no = get
      syncStorage.get('nashemanPwd') == null && route.params.nashemanPwd == null ? syncStorage.get('nashemanPwd') :
        //  yes no = get
        syncStorage.get('nashemanPwd') != null? syncStorage.get('nashemanPwd') :
          // no yes = route
           route.params.nashemanPwd != null ? [route.params.nashemanPwd] :
            // yes yes = get
            syncStorage.get('nashemanPwd');
      
  const pwdInfoID =  syncStorage.get('pwdinfo_id');
  useEffect(() => {
    
    console.log('nasheman pwd params', nashemanPwd);
    // console.log('nasheman p tracking', nashemanP);

    let approval = rejected = nashemanReg = verification = certified = 0;
    if (nashemanPwd != '') {
      console.log('nasheman pwd params aaaaaaa : ', nashemanPwd);
        nashemanPwd.map((item) => {
          if (item.pwdpinfo_id === pwdInfoID) {
            if (item.approval == 'Accepted') {
              approval++;
            }
            if (item.approval == 'Rejected') {
              rejected++;
            }
            if (item.statustrainee == '') {
              verification++;
            }
            if (item.statustrainee != '') {
              certified++;
            }
            nashemanReg++;
          }
          else {
            console.log('pwd not');
          }
        });
    }
    setApproval(approval);
    setRejected(rejected);
    setVerification(verification);
    setCertified(certified);
    setNashemanReg(nashemanReg);
    console.log(approval, rejected, verification, certified, nashemanReg);
  });
  return (

    <View>

      <ImageBackground source={pwdIMage} style={{ width: '100%', height: '100%', opacity: 1 }}>

        <View>
          <Text style={{ fontWeight: "bold", fontSize: 20, paddingTop: 40, color: '#fff', textAlign: 'center' }}>Nasheman</Text>
        </View>

        <View style={{ padding: 1, flex: 1, justifyContent: 'center', paddingTop: '30%' }}>

          <View style={{ width: '100%', backgroundColor: '#fff', height: '90%', padding: 30, borderTopLeftRadius: 15, borderTopRightRadius: 15, opacity: 0.8, marginTop: '10%' }}>

            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}>
              <View>
                {
                  (nashemanRegistered >= 1) ?
                    <View style={[styles.successTiles, {}]}>
                      <TouchableOpacity onPress={() => navigation.navigate('NashemanRegistration')} style={[styles.button, { flexDirection: 'row', padding: 10 }]}>
                        <Image source={regIMage} style={{ width: '18.7%', height: 30, }} />
                        <Text style={[styles.buttonText, { marginLeft: '15%', width: '65%', marginTop: 4 }]}>Registeration</Text>
                      </TouchableOpacity>
                    </View>
                    :
                    <View style={[styles.tiles, {}]}>
                      <TouchableOpacity onPress={() => navigation.navigate('NashemanRegistration')} style={[styles.button, { flexDirection: 'row', padding: 10 }]}>
                        <Image source={regIMage} style={{ width: '18.7%', height: 30, }} />
                        <Text style={[styles.buttonText, { marginLeft: '15%', width: '65%', marginTop: 4 }]}>Registration</Text>
                      </TouchableOpacity>
                    </View>
                }
              </View>

              <View>
                {
                  (nashemanApproval >= 1) ?
                    <View style={[styles.successTiles, { marginTop: 30, }]}>
                      <TouchableOpacity onPress={onPress} style={[styles.button, { flexDirection: 'row', padding: 10 }]}>
                        <Image source={regIMage6} style={{ width: '30%', height: 30 }} />
                        <Text style={[styles.buttonText, { marginLeft: '5%', marginTop: '2%', width: '50%' }]}>Approval</Text>
                      </TouchableOpacity>
                    </View>
                    :
                    <View style={[styles.tiles, { marginTop: 30, }]}>
                      <TouchableOpacity onPress={onPress} style={[styles.button, { flexDirection: 'row', padding: 10 }]}>
                        <Image source={regIMage6} style={{ width: '30%', height: 30 }} />
                        <Text style={[styles.buttonText, { marginLeft: '5%', marginTop: '2%', width: '50%' }]}>Approval</Text>
                      </TouchableOpacity>
                    </View>
                }
              </View>

              <View>
                {
                  (nashemanApproval >= 1) ?
                    <View style={[styles.successTiles, { marginTop: 30, }]}>
                      <TouchableOpacity onPress={onPress} style={[styles.button, { flexDirection: 'row' }]}>
                        <Image source={regIMage2} style={{ width: '30%', height: 40, marginTop: 5, marginLeft: '-3%' }} />
                        <Text style={[styles.buttonText, { marginLeft: '8%', marginTop: '2%', width: '60%' }]}>Nasheman Superitendent</Text>
                      </TouchableOpacity>
                    </View>
                    :
                    <View style={[styles.tiles, { marginTop: 30, }]}>
                      <TouchableOpacity onPress={onPress} style={[styles.button, { flexDirection: 'row' }]}>
                        <Image source={regIMage2} style={{ width: '30%', height: 40, marginTop: 5, marginLeft: '-3%' }} />
                        <Text style={[styles.buttonText, { marginLeft: '8%', marginTop: '2%', width: '60%' }]}>Nasheman Superitendent</Text>
                      </TouchableOpacity>
                    </View>
                }
              </View>

              <View>
                {
                  (nashemanCertified >= 1) ?
                    <View style={[styles.successTiles, { marginTop: 30 }]}>
                      <TouchableOpacity onPress={onPress} style={[styles.button, { flexDirection: 'row', padding: 10 }]}>
                        <Image source={regIMage8} style={{ width: '35%', height: 40, marginLeft: '-10%', marginTop: '-2%' }} />
                        <Text style={[styles.buttonText, { marginLeft: '8%', width: '65%', marginTop: 4 }]}>View Certificate</Text>
                      </TouchableOpacity>
                    </View>
                    :
                    <View style={[styles.tiles, { marginTop: 30 }]}>
                      <TouchableOpacity onPress={onPress} style={[styles.button, { flexDirection: 'row', padding: 10 }]}>
                        <Image source={regIMage8} style={{ width: '35%', height: 40, marginLeft: '-10%', marginTop: '-2%' }} />
                        <Text style={[styles.buttonText, { marginLeft: '8%', width: '65%', marginTop: 4 }]}>View Certificate</Text>
                      </TouchableOpacity>
                    </View>
                }
              </View>

            </ScrollView>
          </View>
          {/* footer */}
          <Footer />
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
    fontWeight: 'bold'
  },
  tiles: {
    backgroundColor: '#003060',
    height: 50,
    width: '80%',
    borderRadius: 10,
    marginLeft: 25,
  },
  successTiles: {
    backgroundColor: 'green',
    height: 50,
    width: '80%',
    borderRadius: 10,
    marginLeft: 25,
  }



});

export default Nasheman;
