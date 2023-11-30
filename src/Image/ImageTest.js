// Image.JS
// ==========
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, { useEffect, useCallback, useState, useRef } from 'react';
import {

    ScrollView,
    StyleSheet,
    View,
    ImageBackground,
    TouchableOpacity,
    ToastAndroid,
    Image,
    Text,
    PermissionsAndroid,
    TextInput
} from 'react-native';
import pwdIMage from '../../assets/images/background.png';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import CameraPic from "../../assets/public/diaphragm.png";
import PdfPic from "../../assets/public/google-forms.png";
import Loader from '../Components/Loader';
import { Button } from 'react-native-paper';

import DocumentScanner from 'react-native-document-scanner-plugin';
// import { RNCamera } from 'react-native-camera';

const ImageTest = ({ navigation }) => {
    const [loading, setLoading]             = useState(false);
    const { cameraPhoto, setCameraPhoto }   = useState('');
    const { galleryPhoto, setGalleryPhoto } = useState('');
    // cnicf
    const [cnicfImage, setCnicFImage] = useState('');
    const [uriCNICF, setURICNICF]     = useState('');
    const [cnicfName, setCnicFName]   = useState('');
    const [cnicfType, setCnicFType]   = useState('');
    // cnicb
    const [cnicbImage, setCnicBImage] = useState('');
    const [uriCNICB, setURICNICB]     = useState('');
    const [cnicbName, setCnicBName]   = useState('');
    const [cnicbType, setCnicBType]   = useState('');
    // degreefile
    const [degreefileImage, setdegreefileImage] = useState('');
    const [uriDegreefile, setURIdegreefile]     = useState('');
    const [degreefileName, setDegreefileName]   = useState('');
    const [degreefileType, setDegreefileType]   = useState('');
    
    // certifile
    const [certiImage, setCertiImage] = useState('');
    const [uriCerti, setURICerti]     = useState('');
    const [certiName, setCertiName]   = useState('');
    const [certiType, setCertiType]   = useState('');
    // expfile
    const [expImage, setExpImage] = useState('');
    const [uriExp, setURIExp]     = useState('');
    const [expName, setExpName]   = useState('');
    const [ExpType, setExpType]   = useState('');
    let options = {
        mediaType: 'photo',
    }
    
    
    // cnic Front start
    const cameraFunctionCnicF = async () => {
        const result = await launchCamera(options);
        setCnicFImage(result.assets[0].uri);
        setURICNICF(result.assets[0].uri);
        setCnicFName(result.assets[0].fileName);
        setCnicFType(result.assets[0].type);
    }
    const galleryFunctionCnicF = async () => {
        const resultCnicF = await launchImageLibrary(options);
        setCnicFImage(resultCnicF.assets[0].uri);
        setURICNICF(resultCnicF.assets[0].uri);
        setCnicFName(resultCnicF.assets[0].fileName);
        setCnicFType(resultCnicF.assets[0].type);
    }
    // cnic Front end

    // cnic back start
    const cameraFunctionCnicB = async () => {
        const result = await launchCamera(options);
        setCnicBImage(result.assets[0].uri);
        setURICNICB(result.assets[0].uri);
        setCnicBName(result.assets[0].fileName);
        setCnicBType(result.assets[0].type);
    }
    const galleryFunctionCnicB = async () => {
        const result2 = await launchImageLibrary(options);
        setCnicBImage(result2.assets[0].uri);
        setURICNICB(result2.assets[0].uri);
        setCnicBName(result2.assets[0].fileName);
        setCnicBType(result2.assets[0].type);
    }
    // cnin back end
    // degree start
    const galleryFunctionDegree = async () => {
        DocumentPicker.pick({
            allowMultiSelection: false,
            type: [DocumentPicker.types.images,DocumentPicker.types.pdf],
          })
            .then((response) =>
         {   
            console.log('response',JSON.stringify(response[0], null, 2))
            setdegreefileImage(response[0].uri)
            setURIdegreefile(response[0].uri)
            setDegreefileName(response[0].name)
            setDegreefileType(response[0].type)
         })
    }
    // degree end
    // Certicate start
    const galleryFunctionCerticate = async () => {
        DocumentPicker.pick({
            allowMultiSelection: false,
            type: [DocumentPicker.types.images,DocumentPicker.types.pdf],
          })
            .then((response) =>
         {   
            console.log('response',JSON.stringify(response[0], null, 2))
            setCertiImage(response[0].uri)
            setURICerti(response[0].uri)
            setCertiName(response[0].name)
            setCertiType(response[0].type)
         })
    }
    // Certicate end
    // Exp start
    const galleryFunctionExperience = async () => {
        DocumentPicker.pick({
            allowMultiSelection: false,
            type: [DocumentPicker.types.images,DocumentPicker.types.pdf],
          })
            .then((response) =>
         {   
            console.log('response',JSON.stringify(response[0], null, 2))
            setExpImage(response[0].uri)
            setURIExp(response[0].uri)
            setExpName(response[0].name)
            setExpType(response[0].type)
         })
    }
    // Exp end
    const submit = () => {
        const formData = new FormData();
        formData.append('imagecnicf', {
            uri: Platform.OS === 'android' ? uriCNICF : uriCNICF.replace('file://', ''),
            type: cnicfType,
            name: cnicfName
        });
        formData.append('imagecnicb', {
            uri: Platform.OS === 'android' ? uriCNICB : uriCNICB.replace('file://', ''),
            type: cnicbType,
            name: cnicbName
        });
        formData.append('degreefile', {
            uri: Platform.OS === 'android' ? uriDegreefile : uriDegreefile.replace('file://', ''),
            type: degreefileType,
            name: degreefileName
        });
        formData.append('certifile', {
            uri: Platform.OS === 'android' ? uriCerti : uriCerti.replace('file://', ''),
            type: certiType,
            name: certiName
        });
        formData.append('expfile', {
            uri: Platform.OS === 'android' ? uriExp : uriExp.replace('file://', ''),
            type: ExpType,
            name: expName
        });
        // formData.append('imagecnicb', '');
        // formData.append('degreefile', '');
        // formData.append('certifile', '');
        // formData.append('expfile', '');
        console.log('formData:', formData);
        setLoading(true)
        fetch(
            `http://10.50.206.87/api/pwdapp/image`,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'secret': 'pwdreg',
                    'Content-Type': 'multipart/form-data',
                },
                body: formData
            },
        )
            .then(resp => resp.json()).then(response => {
                console.log('response Images:', response);
            }
            ).catch((error)=>console.log(error)).finally(() => {
                setLoading(false);
            });
    }
    const cameraRef = useRef(null);

    const handleScan = (data) => {
        // Handle the scanned image data
    }
    const handleScanButtonPress = () => {
        DocumentScanner.scanDoc({
          cameraRef: cameraRef,
          onScan: handleScan,
          quality: 0.5,
          detectionCountBeforeCapture: 5,
          enableTorch: false,
          useFrontCam: false,
        });
      }
    return (
        <View>
            <ImageBackground source={pwdIMage} style={{ width: '100%', height: '100%', opacity: 0.9 }}>
                <Loader loading={loading} />
                <View style={{ padding: 30, flex: 1, justifyContent: 'center' }}>
                    <View style={{ width: '100%', backgroundColor: '#fff', height: 500, padding: 30, borderRadius: 30 }}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}>

                            <View style={[styles.loginFormView, {}]}>
                            <View>
      <RNCamera
        ref={cameraRef}
        style={{ flex: 1 }}
        captureAudio={false}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
      <Button title="Scan Document" onPress={handleScanButtonPress} />
    </View>
                                <Text style={{ fontWeight: "bold", color: "#000000" }}>Please Upload  Image</Text>
                                <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 100 }}>
                                        <TouchableOpacity onPress={handleScanButtonPress}>
                                            <Image source={CameraPic} style={{ height: 40, width: 40, marginBottom: 10, marginTop: 10 }} />
                                        </TouchableOpacity>
                                </View>
                                <Text style={{ fontWeight: "bold", color: "#000000" }}>Please Upload CNIC Front</Text>
                                <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 100 }}>
                                    <View>
                                        <Image source={PdfPic} style={{ height: 80, width: 80, marginTop: 10, marginBottom: 10, alignContent: 'center', justifyContent: 'center' }} />
                                    </View>
                                    <View style={{ marginLeft: 'auto' }}>
                                        <TouchableOpacity onPress={cameraFunctionCnicF}>
                                            <Image source={CameraPic} style={{ height: 40, width: 40, marginBottom: 10, marginTop: 10 }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={galleryFunctionCnicF}>
                                            <Image source={PdfPic} style={{ height: 40, width: 40 }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                <Text style={{ marginTop: 55, fontWeight: "bold", color: "#000000" }}>Please Upload CNIC Back Side</Text>
                                <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 100 }}>
                                    <View>
                                        <Image source={PdfPic} style={{ height: 80, width: 80, marginTop: 10, marginBottom: 10, alignContent: 'center', justifyContent: 'center' }} />
                                    </View>
                                    <View style={{ marginLeft: 'auto' }}>
                                        <TouchableOpacity onPress={cameraFunctionCnicB}>
                                            <Image source={CameraPic} style={{ height: 40, width: 40, marginBottom: 10, marginTop: 10 }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={galleryFunctionCnicB}>
                                            <Image source={PdfPic} style={{ height: 40, width: 40 }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <Text style={{ marginTop: 55, fontWeight: "bold", color: "#000000" }}>Please Upload B-Form</Text>
                                <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 100 }}>
                                    <View>
                                        <Image source={PdfPic} style={{ height: 80, width: 80, marginTop: 10, marginBottom: 10, alignContent: 'center', justifyContent: 'center' }} />
                                    </View>
                                    <View style={{ marginLeft: 'auto' }}>
                                        <TouchableOpacity onPress={galleryFunctionCerticate}>
                                            <Image source={PdfPic} style={{ height: 40, width: 40 }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <Text style={{ marginTop: 55, fontWeight: "bold", color: "#000000" }}>Please Upload Latest Degrees/ Diploma/ Educational Certificate</Text>
                                <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 100 }}>
                                    <View>
                                        <Image source={PdfPic} style={{ height: 80, width: 80, marginTop: 10, marginBottom: 10, alignContent: 'center', justifyContent: 'center' }} />
                                    </View>
                                    <View style={{ marginLeft: 'auto' }}>
                                        <TouchableOpacity onPress={galleryFunctionDegree}>
                                            <Image source={PdfPic} style={{ height: 40, width: 40 }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <Text style={{ marginTop: 55, fontWeight: "bold", color: "#000000" }}>Please Upload Latest Experience letter / Certificates</Text>
                                <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 5, height: 100 }}>
                                    <View>
                                        <Image source={PdfPic} style={{ height: 80, width: 80, marginTop: 10, marginBottom: 10, alignContent: 'center', justifyContent: 'center' }} />
                                    </View>
                                    <View style={{ marginLeft: 'auto' }}>
                                        <TouchableOpacity onPress={galleryFunctionExperience}>
                                            <Image source={PdfPic} style={{ height: 40, width: 40 }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{
                                    flex: 1,
                                    alignItems: 'center', justifyContent: 'center',
                                    marginTop:100
                                }}>
                                    <Button title='Submit' onPress={submit} style={styles.ButtonStyle}></Button>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
                {/* Cnic Front start */}
                {/* <TouchableOpacity style={styles.ButtonStyle} onPress={cameraFunctionCnicF}>
                    <Image source={CameraPic} style={{width: 20, height:20}}/>
                </TouchableOpacity>     
                <Image style={styles.imageStyle} source={{uri: cameraPhoto}} />
                <TouchableOpacity style={styles.ButtonStyle} onPress={galleryFunctionCnicF}>
                    <Text style={styles.text}>
                        Open Gallery
                    </Text>
                </TouchableOpacity>  
                <Image style={styles.imageStyle} source={{uri: galleryPhoto}} />  */}
                {/* Cnic Front end */}
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    imageStyle: {
        height: 100,
        width: 100,
    },
    ButtonStyle: {
        justifyContent: 'center',
        width: '50%',
        borderRadius: 14,
        elevation: 3,
        backgroundColor: '#002D62',
        marginTop: 10,
        color: 'white',
    },
    text: {
        color: 'black',
        fontSize: 15,
        fontFamily: "sans-serif",
    },
    row: {
        flex: 1,
        flexDirection: 'row'
    },
    selectedTextStyle: {
        fontSize: 16,
        color: 'black'
    },
    inputWrap: {
        flex: 1,
        borderColor: "black",
        borderBottomWidth: 1,
        marginBottom: 10
    },
    inputdate: {
        fontSize: 14,
        marginBottom: -12,
        color: "black"
    },
    inputcvv: {
        fontSize: 14,
        marginBottom: -12,
        color: "#6a4595"
    }

});

export default ImageTest;
