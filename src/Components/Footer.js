
import React from 'react';
import {
  View,
  Image

} from 'react-native';

import regIMage9 from '../../assets/images/PWDfooter.png';
import regIMage10 from   '../../assets/images/pitb.png';

const Footer = () =>{
    return (
    <View style={{backgroundColor:'#0C2D48',height:'15%',width:'130%',paddingTop:10,marginLeft:-40}}>
      <View style={{flexDirection: 'row',flex:1}}>          
        <Image source={regIMage9} style={{height:'50%',width:'35%'}}/>
        <Image source={regIMage10} style={{height:'50%',width:'10%',marginLeft:'35%'}}/>  
      </View>     
    </View>
        
  );
}

export default Footer;