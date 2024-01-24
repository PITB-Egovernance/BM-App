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
import ChairmanDashboard from './src/Auth/ChairmanDashboard';
import MemberDashboard from './src/Auth/MemberDashboard';
import UserDetails from './src/Auth/UserDetails';
import Footer from './src/Components/Footer';
import datatable from './src/Auth/datatable'

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
import MyComponent from './src/Auth/datatable';
import { Alert,Platform, BackHandler, Linking,ToastAndroid } from 'react-native';
import VersionCheck from 'react-native-version-check';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  

  
  useEffect(() => {
    // Ignore log notifications by message:
    LogBox.ignoreLogs(['Warning: ...']);

    // Ignore all log notifications:
    LogBox.ignoreAllLogs();

    // Hide yellow box warnings:
    console.warn = () => {};

    SplashScreen.hide();
    checkAppVersion();

 
  }, []);
  const checkAppVersion = async () => {
    
      const latestVersion = Platform.OS === 'ios'? await fetch(`https://itunes.apple.com/in/lookup?bundleId= put her your bundleId like com.app`)
      .then(r => r.json())
      .then((res) => { 
        console.log('test ', res)
        return res?.results[0]?.version })
      : await VersionCheck.getLatestVersion({
          provider: 'playStore',
          packageName: 'pk.gov.pitb.baitulmaal',
          ignoreErrors: true,
      });

      
      const currentVersion  = VersionCheck.getCurrentVersion();
      const appurl          = await VersionCheck.getPlayStoreUrl();
      console.log('Latest version', latestVersion, 'Current Version',currentVersion)
   
      if (latestVersion > currentVersion) {
        Alert.alert(
          'Update Required',
          'A new version of the app is available. Please update to continue using the app.',
          [
            {
              text: 'Update Now',
              onPress: () => {
                Linking.openURL(appurl)
              },
            },
          ],
          { cancelable: false }
        );
      } else {
        
        ToastAndroid.show('Baitulmaal App is already up to date', ToastAndroid.LONG);
        return;
      }
    
  };
 
  return (
    <NavigationContainer>
      
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        <Stack.Screen name="Login"      component={Login}/>
        <Stack.Screen name="Register"   component={Register} options={{headerShown: false}}/>
        <Stack.Screen name="OTP"   component={OTP} options={{headerShown: false}}/>
        <Stack.Screen name="Dashboard"  component={Dashboard} options={{headerShown: false}}/>
        <Stack.Screen name="ResetPass"      component={ResetPassword} options={{headerShown: false}}/>
        <Stack.Screen name="OTPForResetPass"      component={OTPForResetPass} options={{headerShown: false}}/>
        <Stack.Screen name="ChangePassword"      component={ChangePassword} options={{headerShown: false}}/>
        <Stack.Screen name='ChairmanDashboard'  component={ChairmanDashboard} options={{headerShown: false,orientation:'landscape_right'}}/>
        <Stack.Screen name='MemberDashboard' component={MemberDashboard} options={{headerShown: false,orientation:'landscape_right'}}/>
        <Stack.Screen name='datatable' component={MyComponent} options={{headerShown:false}}/> 
        <Stack.Screen name ='UserDetails' component={UserDetails}  options={{headerShown: true}}/>


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
