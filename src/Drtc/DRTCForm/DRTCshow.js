
import React, { useEffect,useState }  from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
map,
  ImageBackground,
  title,
  TouchableOpacity,
  ToastAndroid,
  loading,

} from 'react-native';


// import datatable  start
// import * as React from 'react';

// import datatable end

import syncStorage from 'react-native-sync-storage';


import { KeyboardAvoidingView,  TextInput  } from "react-native";

// datatable start
const optionsPerPage = [2, , 4];
const DRTCshow = ({navigation}) => {
  const [aid, setaid]        = useState('');
  const [name, setname]        = useState('');
  const [tehsil_id, settehsil]      = useState('');
  const [dname, setdname]      = useState('');
  const [dfile, setdfile]  = useState('');
  const [afile, setafile]  = useState('');
  const [dincome, setdincome]  = useState('');
  const [residence, setresidence]  = useState('');
  const [gc, setgc]              = useState('');
  const [gcp, setgcp]              = useState('');
  const [ accountn, setaccountn]                = useState('');
  const [accounthn, setaccounthn]    = useState('');
  const [accountr, setaccountr]            = useState('');
  const [appdate, setappdate]            = useState('');
  const [tehsilname, settehsilname]            = useState('');

  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);
   const pwdInfoID                   = syncStorage.get('pwdinfo_id');


  useEffect(() =>{
    getdrtcdetail();
    getdrtctehsilData();
  }, []);


  const getdrtcdetail = (drtcdetail) =>{

    // console.log('pwdinfoDetail', pwdinfoDetailid)
     console.log('Board id',pwdInfoID )
    fetch(`https://dpmis.punjab.gov.pk/api/app/formdrtc/${pwdInfoID }`, {
      method: 'GET',
      headers:{
        'Accept': 'application/json',
        'Content-Type':'application/json',
        'secret':'f08md117'
      },
    })
    .then(drtcdetail => drtcdetail.json())
    .then(respdrtcdetail => {

      console.log('response  detail',respdrtcdetail['formdrtc basic info'][0])
      const aid   = respdrtcdetail['formdrtc basic info'][0]. aid;
        console.log('aid', aid)
        const name   = respdrtcdetail['formdrtc basic info'][0].name;
        console.log('name', name)
      const tehsil_id   = respdrtcdetail['formdrtc basic info'][0].tehsil_id;
        console.log('tehsil', tehsil_id)



        const dname   = respdrtcdetail['formdrtc basic info'][0].dname;
        console.log('dname', dname)
        const dfile    = respdrtcdetail['formdrtc basic info'][0].dfile;
        console.log('dfile', dfile)
        const afile    = respdrtcdetail['formdrtc basic info'][0].afile;
        console.log('afile', afile)
        const dincome   = respdrtcdetail['formdrtc basic info'][0].dincome;
        console.log('dincome', dincome)
        const residence   = respdrtcdetail['formdrtc basic info'][0].residence;
        console.log('residence', residence)
        const gc   = respdrtcdetail['formdrtc basic info'][0].gc;
        console.log('gc', gc)
        const gcp   = respdrtcdetail['formdrtc basic info'][0].gcp;
        console.log('gcp', gcp)
        const accountn   = respdrtcdetail['formdrtc basic info'][0].accountn;
        console.log('accountn', accountn)
        const accounthn  = respdrtcdetail['formdrtc basic info'][0].accounthn;
        console.log('accounthn', accounthn)
        const accountr   = respdrtcdetail['formdrtc basic info'][0].accountr;
        console.log('accountr', accountr)
        const appdate   = respdrtcdetail['formdrtc basic info'][0].appdate;
        console.log('appdate', appdate)
        const renderItem = (item: any) => {
            return (
              <View style={styles.item}>
                <Text style={styles.selectedTextStyle}>{item.label}</Text>
                <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
              </View>
            );
          };
          setdincome(dincome);

          setresidence(residence);
          settehsil(tehsil_id);

          setaid(aid);
          setname(name);
          setdname(dname);
          setdfile(dfile);
          setafile(afile);
          setgc(gc);
          setgcp(gcp)
          setaccountn(accountn)
          setaccounthn(accounthn)
          setaccountr (accountr )
        setappdate(appdate)
     settehsilname(tehsilname);
        getdrtctehsilData(tehsil_id)
    });

  }
  const getdrtctehsilData = (tehsil_id) =>{

    console.log('tehsil functino', tehsil_id)
    // console.log('Board id', BoardID)
    fetch(`https://dpmis.punjab.gov.pk/api/app/tehsilid/${tehsil_id}`,{
      method: 'GET',
      headers:{
        'Accept': 'application/json',
          'Content-Type':'application/json',
          'secret':'f08md117'
      },
    })
    .then(resptehsil_id => resptehsil_id.json())
    .then(resptehsil_idName => {
        console.log('tehsil1', resptehsil_idName.tehsilid)

      const tehsil_idReponse = resptehsil_idName.tehsilid;
      console.log('sdasdasdsadas', tehsil_idReponse[0])
      const tehsilname   = tehsil_idReponse[0].tname;
      console.log('sdas', tehsilname )
      settehsilname(tehsilname);
    });
  }


  return (
    <View style={{padding:30, flex:1, justifyContent:'center'}}>
    <View style={{width:'100%',backgroundColor:'#fff', height:500,padding:30, borderRadius:30}}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      contentInsetAdjustmentBehavior="always"
      keyboardDismissMode="on-drag"
      >
      <KeyboardAvoidingView enabled>

    <View>



    <View
    style={styles.row}>
    <Text style={{color:'black',fontSize:16,textAlign: 'center',textDecorationLine: 'underline',fontWeight:'bold' }}>DRTC Application Detail</Text>
    </View>
    <Text style={{marginTop:10,fontWeight:"bold",color:"#000000"}}>Monthly Income(In Rs.): (ماہانہ آمدنی روپے میں)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={dincome}
                  style={[styles.DRTCshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={dincome}

                />
                </View>


    <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Residence: (رہائش گاہ)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={residence}
                  style={[styles.DRTCshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={residence}

                />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Select Tehsil: (تحصیل منتخب کریں۔)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                   placeholder={tehsilname}
                  style={[styles.DRTCshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={tehsilname}

                />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Application Date: (تاریخ درخواست)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={appdate}
                  style={[styles.DRTCshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={appdate}

                />
                </View>
                <Text style={{marginTop:10,fontWeight:"bold",color:"#000000"}}>Account No: (اکاؤنٹ کا نمبر)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={accountn}
                  style={[styles.DRTCshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={accountn}

                />
                </View>

                <Text style={{marginTop:10,fontWeight:"bold",color:"#000000"}}>Account Holder Name: (کھاتہ دار کا نام)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={accounthn}
                  style={[styles.DRTCshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={accounthn}

                />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Relationship with Account Holder: (اکاؤنٹ ہولڈر کے ساتھ رشتہ)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={accountr}
                  style={[styles.DRTCshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={accountr}

                />
                </View>
                <View>
                <Text style={[styles.logoText,{textAlign: 'center',color: '#002D62', fontWeight: "bold",fontSize: 14}]}>Note:Preference will be given to those applicant who are not geting any Other facility from government:</Text>
                </View>

                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Avail Any Government Service: (کوئی بھی سرکاری سروس حاصل کریں۔)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={gcp}
                  style={[styles.DRTCshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={gcp}

                />
                </View>
                <Text >Government Services: (سرکاری خدمات)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={gc}
                  style={[styles.DRTCshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={gc}

                />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Requested Application For (درخواست کس کے لیے مانگی گئی۔)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={aid}
                  style={[styles.DRTCshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={aid}

                />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Device Name (ڈیوائس کا نام)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={dname}
                  style={[styles.DRTCshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={dname}

                />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>(In case of Assistive device Attach Assessment by specialist of respective disability if needed)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={dfile}
                  style={[styles.DRTCshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={dfile}

                />
                </View>
                <Text style={{marginTop:15,fontWeight:"bold",color:"#000000"}}>Attach Affidavit(In case Not avail Any Service)</Text>
                <View style={{marginTop:10,backgroundColor:'#D3D3D3',borderRadius:3, height:40}}>
                <TextInput
                  placeholderColor="#c4c3cb"
                  placeholder={afile}
                  style={[styles.DRTCshowFormTextInput
                    // ,{borderColor: !firstName && errorValidate ? 'red':'#fff'}
                  ]}

                   value={afile}

                />
                </View>

                </View>

                </KeyboardAvoidingView>
            </ScrollView>
            </View>
            </View>
  );

}
const styles = StyleSheet.create({

  logoImage:{
    width: '100%',
    height: '120%',
    resizeMode: 'contain',
    marginTop:'10%'

  },
  Header:{
   height:90,
   backgroundColor: 'white',
   borderBottomWidth: 0
  },
  row:{
    backgroundColor: 'white',
    borderBottomWidth: 0,

  },
  Row:{
    backgroundColor: 'white',
    borderBottomWidth: 0,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  Row1:{
    backgroundColor: 'white',
    borderBottomWidth: 0,
    flexDirection:'row',
    justifyContent:'space-between',
    // marginTop:10
  },
  TextStyle:{
    color:'black',
    fontSize:12,
    textAlign: 'left',
    fontWeight:'bold',
    marginTop:10
  },
  InnerText:{
    color:'black',
    fontWeight:'normal',
    textDecorationLine: 'underline'
  }
});
export default DRTCshow;
