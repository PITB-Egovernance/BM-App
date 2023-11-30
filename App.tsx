/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React,{useEffect} from 'react';  
import {LogBox, YellowBox} from 'react-native';
// import Loader from './components/Loader';
import Login from './src/Auth/login';
import Register from './src/Auth/Register';
import OTP from './src/Auth/OTP';
import SplashScreen from 'react-native-splash-screen';
import Dashboard from './src/Auth/Dashboard';

import BmRegistration from './src/BmRegistration/BmRegistration';
import BMshow from './src/BmRegistration/BMshow';
import ResetPassword from './src/Auth/ResetPassword';
import OTPForResetPass from './src/Auth/OTPForResetPass';
import ChangePassword from './src/Auth/ChangePassword';
import Footer from './src/Components/Footer';

// import PwdCertificate from './src/PwdRegistration/PwdCertificatebByDD/PwdCertificate';
// import Step4 from './src/PwdRegistration/PwdCertificates/DraftCertificate';
import { DrawerActions, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Education from './src/BmRegistration/Education';

import ImageTest from './src/Image/ImageTest';

// BM
import RelativeDetails from './src/BmRegistration/RelativeDetails';
import Otherinformation from './src/BmRegistration/Otherinformation';
import SelectCategory from './src/BmRegistration/SelectCategory';
import Disable from './src/BmRegistration/Disable';
import Marriage from './src/BmRegistration/Marriage';
import Medical from './src/BmRegistration/Medical';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  

  
  useEffect(() => {
    // Ignore log notification by message:
      LogBox.ignoreLogs(['Warning: ...']);

      // Ignore all log notifications:
      
      LogBox.ignoreAllLogs();
      console.disableYellowBox = true;
      YellowBox.ignoreWarnings(['Warning: ...']);
    SplashScreen.hide();
  },500);
  return (
    <NavigationContainer>
      
      <Stack.Navigator options={{headerShown: false}} >
        <Stack.Screen name="Login"      component={Login} initialRouteName="Login" options={{headerShown: false}}/>
        <Stack.Screen name="Register"   component={Register} options={{headerShown: false}}/>
        <Stack.Screen name="OTP"   component={OTP} options={{headerShown: false}}/>
        <Stack.Screen name="Dashboard"  component={Dashboard} options={{headerShown: false}}/>
        <Stack.Screen name="ResetPass"      component={ResetPassword} options={{headerShown: false}}/>
        <Stack.Screen name="OTPForResetPass"      component={OTPForResetPass} options={{headerShown: false}}/>
        <Stack.Screen name="ChangePassword"      component={ChangePassword} options={{headerShown: false}}/>

        {/* <Stack.Screen name="Baitulmal" component={} options={{headerShown: false}}/> */}
       
        <Stack.Screen name="BmRegistration" component={BmRegistration} options={{headerShown: false}}/>
        <Stack.Screen name="BMshow" component={BMshow} options={{headerShown: false}}/>
        <Stack.Screen name="Education"      component={Education} options={{headerShown: false}}/>       
        {/* <Stack.Screen name="#Enabled"      component={Enabled} options={{headerShown: false}}/>        */}

        

        {/* Just for IMage */}
        <Stack.Screen name="ImageTest" component={ImageTest} options={{headerShown: false}}/>

        {/* Bait ul maal */}
        <Stack.Screen name="RelativeDetails" component={RelativeDetails} options={{headerShown: false}}/> 
        <Stack.Screen name="Otherinformation" component={Otherinformation} options={{headerShown: false}}/> 
        <Stack.Screen name="SelectCategory" component={SelectCategory} options={{headerShown: false}}/> 
        <Stack.Screen name="Disable"  component={Disable} options={{headerShown: false}}/>
        <Stack.Screen name="Marriage"  component={Marriage} options={{headerShown: false}}/>
        <Stack.Screen name="Medical"      component={Medical} options={{headerShown: false}}/>

        {/* Reassessment */}
        
        
      </Stack.Navigator>

    </NavigationContainer>
  );
}

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

export default App;
