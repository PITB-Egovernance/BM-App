import React, {useState, useEffect,useRef} from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { Text,
  View,TextInput, ImageBackground,ScrollView,
  KeyboardAvoidingView,
	StyleSheet,
  Dimensions,
  TouchableOpacity,
  ToastAndroid } from 'react-native';
  import pwdIMage from '../../assets/images/back2.png'
import Loader from '../Components/Loader';
import Footer from '../Components/Footer'; 
import baseUrl from '../Components/Url';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const Register = ({navigation}) => {

  const firstTextInput  = useRef(null);
  const secondTextInput = useRef(null);
  const thirdTextInput  = useRef(null);
  const forthTextInput  = useRef(null);


  const handleSubmitFirstTextInput = () => {
    secondTextInput.current.focus();
  };
  const handleSubmitSecondTextInput = () => {
    thirdTextInput.current.focus();
  };
  const handleSubmitThirdTextInput = () => {
    forthTextInput.current.focus();
  };
/* States For display array in dropdown */
  const [province, setProvince]   = useState([]);
  const [division, setDivision]   = useState([]);
  const [district, setDistrict]   = useState([]);
  const [tehsil, setTehsil]         = useState([]);
  const [loading, setLoading]   = useState(false);
/* End for displaying array in dropdown */
  
  const [Focus, setFocus]         = useState(false);
  const [value, setValue]         = useState(null);
  const [isFocus, setIsFocus]     = useState(false);

  /* */ 
   const [name, setName]              = useState('');
   const [email, setEmail]            = useState('');
   const [cnic, setCnic]              = useState('');
   const [contact, setContact]            = useState('');
   const [province_id, setProvinceId] = useState('');
   const [division_id, setDivisionId] = useState('');
   const [district_id, setDistrictId] = useState('');
   const [tehsil_id, setTehsilId]       = useState('');
   const [password, setPassword]      = useState('');
   const [errorValidate, setErrorValidate] =  useState(false);
   const [warning, setWarning] = React.useState('');
  const handleInputChange = (input) => {
    // Check if the input contains non-English characters
    const containsNonEnglish = /[^a-zA-Z ]/.test(input);

    // Set the warning based on the presence of non-English characters
    if (containsNonEnglish) {
      setWarning('Please enter text in English only.');
    } else {
      setWarning('');
    }

    // Filter out non-English characters
    const filteredInput = input.replace(/[^a-zA-Z ]/g, '');

    setName(filteredInput);
  };
  /* */
  
  const onRegisterPress = () =>{
    
  }

  useEffect(() =>{
    getProvince();

  }, []);

  const getProvince = () => {


    fetch(`${baseUrl[0]}/bmprovince`, {
      method: 'GET',
      headers: {
          'Accept': 'application/json',
      },
    })
    .then(response => response.json())
    .then(response => {

      // console.log('Province', response[0].id)
      // {response:{provinces:{{'id','name'}, object2, object3, object4}}}
      var count = Object.keys(response).length; /* 4 */
      if(count > 0){
        let dropDownData = [];
        // for (var i = 0; i < count; i++) {

          dropDownData.push({
            value: response[0].id,
            label:response[0].pname,
          });
        // }
        setProvince(dropDownData);
      }
    });
  }

  const getDivision = (provinceID) => {
    console.log('ID P', provinceID)
    const province_id  = provinceID;
    fetch(`${baseUrl[0]}/bmdivision/${provinceID}`, {
      method: 'GET',
      headers:{},
    })
    .then(resp => resp.json())
    .then(responseDivision => {

      console.log('Division', responseDivision.divisions)
      var count = Object.keys(responseDivision.divisions).length;
      // console.log('Divison COunt', count)
      let divisionData = [];
      for (var i = 0; i < count; i++) {
          divisionData.push({ value: responseDivision.divisions[i].id, label: responseDivision.divisions[i].divname });
      }
      // console.log(JSON.stringify(divisionData))
      setDivision(divisionData);
    });

  
  }

  const getDistrict = (divisonId) =>{

    fetch(`${baseUrl[0]}/bmdistrict/${divisonId}`, {
      method: 'GET',
      headers:{},
    })
    .then(respDistrict => respDistrict.json())
    .then(responseDistrict => {

      console.log('DIstricts', responseDistrict)
     
      var count = Object.keys(responseDistrict.districts).length;
      console.log('Districts COunt', count)
      let districtsData = [];
      for (var i = 0; i < count; i++) {
        districtsData.push({ value: responseDistrict.districts[i].id, label: responseDistrict.districts[i].dname });
      }
      // console.log(JSON.stringify(Data))
      setDistrict(districtsData);
    });
  }

  const getTehsil = (dist_id) => {
    const district_id  = dist_id;
    fetch(`${baseUrl[0]}/bmtehsil/${district_id}`, {
      method: 'GET',
      headers:{
        'Accept': 'application/json',
        'secret':'f08md117',
        'Content-Type': 'application/json',
      },
    })
    .then(resp => resp.json())
    .then(responseTehsil => {
      console.log('Tehsil : ', responseTehsil)
      var count = Object.keys(responseTehsil.tehsils).length;
      console.log('Tehsil COunt', count)
      let tehsilData = [];
      for (var i = 0; i < count; i++) {
        tehsilData.push({ value: responseTehsil.tehsils[i].id, label: responseTehsil.tehsils[i].tname });
      }
      console.log(JSON.stringify(tehsilData))
      setTehsil(tehsilData);
    });
  }

  // const getBoard = (ditrictId) =>{

  //   fetch(`${baseUrl[1]}/app/getboards/${ditrictId}`, {
  //     method: 'GET',
  //     headers:{},
  //   })
  //   .then(respBoard => respBoard.json())
  //   .then(responseBoard => {

  //     console.log('BOards', responseBoard)
     
  //     var count = Object.keys(responseBoard.boards).length;
  //     let boardData = [];
  //     for (var i = 0; i < count; i++) {
  //       boardData.push({ value: responseBoard.boards[i].id, label: responseBoard.boards[i].name });
  //     }
  //     // console.log(JSON.stringify(districtData))
  //     setBoard(boardData);
  //   });
  // }

  const handleRegisterUser = () => {

    console.log('Name', name)
    console.log('Email', email)
    console.log('Cnic', cnic)
    console.log('Contact', contact)
    console.log('Province', province_id)
    console.log('Division', division_id)
    console.log('District', district_id)
    console.log('tehsil', tehsil_id)
    console.log('Password', password)
    console.log('Loader', Loader);
    setErrorValidate(true)
    if(!name){
      ToastAndroid.show('Please enter your Name', ToastAndroid.LONG);
      return;
    }else if(!cnic){
      ToastAndroid.show('Please enter your Cnic', ToastAndroid.LONG);
      return;
    }else if(!contact){
      ToastAndroid.show('Plese enter your Phone no', ToastAndroid.LONG); 
      return;
    }else if(!province_id){
      ToastAndroid.show('Please select a Province', ToastAndroid.LONG);
      return;
    }else if(!division_id){
      ToastAndroid.show('Please select a Division', ToastAndroid.LONG);
      return;
    }else if(!district_id){
      ToastAndroid.show('Please select a District', ToastAndroid.LONG);
      return;
    }else if(!tehsil_id){
      ToastAndroid.show('Please select a Board', ToastAndroid.LONG);
      return;
    }else if(!password){
      ToastAndroid.show('Please enter your Password', ToastAndroid.LONG);
      return;
    }else{
      setLoading(true)
      fetch(
        `${baseUrl[0]}/registerBMApi`,
        {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body:JSON.stringify({name:`${name}`,email:`${email}`,cnic:`${cnic}`,contact:`${contact}`,
          province:`${province_id}`,division:`${division_id}`,district:`${district_id}`, tehsil:`${tehsil_id}`,
          password:`${password}`,roles:'user'})
        },
      )
      .then(resp => resp.json()).then(response => 
        { 
          console.log('Register Response', response);
          // navigation.navigate('Login');
          navigation.navigate('OTP',{
            cnic:response.userDetail.cnic,
            code:response.userDetail.code
          });
      }).catch((error) => alert(error))
      .finally(() =>{
        setLoading(false);
      });
    }
    
  }

return (
	<View>
    
	<ImageBackground
		source={pwdIMage}
		resizeMode="stretch"
		style={styles.img}>
    
    <Loader loading={loading} />
       
      <View style={{padding:10, flex:1, justifyContent:'center'}}>
        <View style={{width:'100%',backgroundColor:'#fff', height:630,padding:30, borderRadius:30}}>
          <ScrollView 
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <View>
              <View>
              <Text style={[{textAlign: 'center',color: '#588739', fontWeight: "bold",fontSize: 30}]}>اندراج</Text>
              </View>
              
              <Text style={{marginTop:10,fontWeight:"bold",color:"#000000"}}>نام:</Text>
              <View style={{ marginTop: 10, backgroundColor: '#D3D3D3', borderRadius: 3, height: 40 }}>
              <TextInput
                ref={firstTextInput}
                onSubmitEditing={handleSubmitFirstTextInput}
                placeholderColor="#c4c3cb"
                placeholderTextColor='grey'
                placeholder="اپنا نام درج کریں"
                value={name}
                onChangeText={(input) => handleInputChange(input)}
                style={[styles.registerFormTextInput, { borderColor: !name && errorValidate ? 'red' : '#fff' }]}
              />
            </View>
            {warning !== '' && <Text style={{ color: 'red', fontSize: 12 }}>{warning}</Text>}
              
              <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>شناختی کارڈ نمبر:</Text>
              <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput 
                  ref={thirdTextInput} 
                  onSubmitEditing={handleSubmitThirdTextInput}
                  placeholderColor="#c4c3cb"
                  placeholderTextColor='grey'
                  placeholder="اپنا شناختی کارڈ نمبر درج کریں"
                  keyboardType='numeric'
                  maxLength={13}
                  value={cnic}
                  onChangeText={(cnic)=> setCnic(cnic)}
                  style={[styles.registerFormTextInput
                    ,{borderColor: !cnic && errorValidate ? 'red':'#fff'}
                  ]}
                />
              </View>

              <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>ای میل(Optional):</Text>
              <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  ref={secondTextInput} 
                  onSubmitEditing={handleSubmitSecondTextInput}
                  placeholderColor="#c4c3cb"
                  placeholderTextColor='grey'
                  placeholder="اپنا ای میل درج کریں"
                  value={email}
                  onChangeText={(email)=> setEmail(email)}
                  style={[styles.registerFormTextInput
                    // ,{borderColor: !email && errorValidate ? 'red':'#fff'}
                  ]}
                />
              </View>

              <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>موبائل نمبر:</Text>
              <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                <TextInput 
                ref={forthTextInput}
                placeholder="اپنا موبائل نمبر درج کریں" 
                placeholderTextColor='grey'
                keyboardType='numeric'
                maxLength={11}
                value={contact}
                onChangeText={(contact)=> setContact(contact)}
                placeholderColor="#c4c3cb"
                style={[styles.registerFormTextInput
                  ,{borderColor: !contact && errorValidate ? 'red':'#fff'}
                ]} />
              </View>

              <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>صوبہ:</Text>
              <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                <View style={styles.container}>
                  <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'black',backgroundColor:'#D3D3D3', }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    itemTextStyle={styles.itemTextStyle}
                    data={province}
                    search
                    labelField="label"
                    valueField="value"
                    placeholder={'صوبہ منتخب کریں'}
                    searchPlaceholder="Search..."
                    value={province_id}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setProvinceId(item.value);
                        getDivision(item.value)
                        setFocus(false);
                    }}
                  />
                </View>
              </View>

              <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>ڈویژن:</Text>
              <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                {/* <TextInput  placeholderColor="#c4c3cb" /> */}
                <View style={styles.container}>

                  <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'black',backgroundColor:'#D3D3D3', }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    itemTextStyle={styles.itemTextStyle}
                    data={division}
                    search
                    labelField="label"
                    valueField="value"
                    placeholder={'ڈویژن منتخب کریں'}
                    searchPlaceholder="Search..."
                    value={division_id}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setDivisionId(item.value);
                        getDistrict(item.value)
                        setFocus(false);
                    }}
                  />
                </View>
              </View>
              
              <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>ضلع:</Text>
              <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                {/* <TextInput  placeholderColor="#c4c3cb" /> */}
                <View style={styles.container}>

                  <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'black',backgroundColor:'#D3D3D3', }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    itemTextStyle={styles.itemTextStyle}
                    data={district}
                    search
                    labelField="label"
                    valueField="value"
                    placeholder={'ضلع منتخب کریں'}
                    searchPlaceholder="Search..."
                    value={district_id}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setDistrictId(item.value);
                        getTehsil(item.value)
                        setFocus(false);
                    }}
                  />
                </View>
              </View>

              <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>تحصیل:</Text>
              <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40}}>
                {/* <TextInput  placeholderColor="#c4c3cb" /> */}
                <View style={styles.container}>

                  <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'black',backgroundColor:'#D3D3D3', }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    itemTextStyle={styles.itemTextStyle}
                    data={tehsil}
                    search
                    labelField="label"
                    valueField="value"
                    placeholder={'تحصیل منتخب کریں'}
                    searchPlaceholder="Search..."
                    value={tehsil_id}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                        setTehsilId(item.value);
                        setFocus(false);
                    }}
                  />
                </View>
                
              </View>

              <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>پاس ورڈ:</Text>
              <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:5, height:40 }}>
                <TextInput  
                placeholderColor="#c4c3cb" 
                secureTextEntry={true} 
                placeholderTextColor='grey'
                placeholder="اپنا پاس ورڈ درج کریں"
                value={password}
                onChangeText={(password)=> setPassword(password)}
                style={[styles.registerFormTextInput,{borderColor: !password && errorValidate ? 'red':'#fff'}]}
              />
              </View>
              
              <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>پاس ورڈ کی تصدیق کریں:</Text>
              <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderEndColor:'#d3d3d3',borderRadius:5, height:40 }}>
                <TextInput  
                placeholderColor="#c4c3cb"  
                placeholderTextColor='grey'
                secureTextEntry={true} 
                placeholder="تصدیقی پاس ورڈ درج کریں"
                style={[styles.registerFormTextInput,{borderColor: !password && errorValidate ? 'red':'#fff'}]}
                />
              </View>
              
              <TouchableOpacity  
                onPress={handleRegisterUser}
                style={styles.ButtonStyle}
                activeOpacity={0.5}>
            
                <Text style={[styles.text,{textAlign:'center'}]}>Register</Text>
            

              </TouchableOpacity>
              <TouchableOpacity
              onPress={() => navigation.navigate('Login')}>
              <Text style={[styles.Text]}>پہلے سے صارف ہیں؟ لاگ اِن کرنے کیلئے کلک کریں</Text>

              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
        {/* <Footer /> */}
      </View>
     
   
	</ImageBackground>
	</View>
);
};

export default Register;

const styles = StyleSheet.create({
  registerFormTextInput:{
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
  icon: {
    marginRight: 5,
  },

  placeholderStyle: {
    color:'grey',
    fontSize: 14,
    margin:2
  },
  selectedTextStyle: {
    fontSize: 16,
  },
img: {
	height: screenHeight,
	width: screenWidth,
	justifyContent: 'center',
	alignItems: 'center',
  opacity: 0.9
},
text:{
  color:'white',
  fontSize:15,
  fontFamily: "sans-serif",

},
ButtonStyle:{
  justifyContent: 'center',
  alignItems: 'center',
  width:'40%',
  padding:10,
  borderRadius: 12,
  backgroundColor: '#3a4e35',
  marginTop:10,
  marginLeft:80
},
Text:{
  color:'#002D62',
  textAlign: 'center',
  fontSize:14,
  marginTop:10,
  textDecorationLine: 'underline',
},
itemTextStyle:{
  color:'black'
},
selectedTextStyle: {
  fontSize: 16,
  color:'black'
},
inputSearchStyle : {
  color:'black'
}
});
