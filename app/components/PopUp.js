import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Modal
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

class PopUp extends Component {
  render(){
    return(
      <Modal
       animationType={"slide"}
       transparent={true}
       visible={this.props.visible}
        >
        <View style={styles.container}>
          <View style={styles.flexOne}>
            <View style={styles.flexOne} />
            <View style={{flex:0.15, flexDirection:'row'}}>
              <View style={{flex:0.3}} />
              <View style={{flex:1, backgroundColor:'white', flexDirection:'row', borderTopLeftRadius:5, borderTopRightRadius:5}}>
                <View style={{flex:0.25}} />
                <View style={{flex:1, alignItems:'center'}} />
                <TouchableOpacity onPress={()=>this.props.closePopUp()} style={{flex:0.25}}>
                  <View style={styles.closeImageContainer}>
                    <Image resizeMode='contain' source={this.props.closeImage} style={{height:20, width:20}} />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{flex:0.3}} />
            </View>
          </View>
          <View style={{flex:0.5, flexDirection:'row'}}>
            <View style={{flex:0.3}} />
              <View style={{flex:1, backgroundColor:'white', borderBottomLeftRadius:5, borderBottomRightRadius:5}}>
                <View style={{flex:0.6}}>
                  <View style={{flex:1.4, alignItems:'center', justifyContent:'flex-start'}}>
                    <Image resizeMode='contain' source={this.props.tilteImage} style={this.props.titleImageStyle} />
                  </View>
                </View>
                <View style={{flex:0.6}}>
                  <View style={{flex:0.1, alignItems:'center', justifyContent:'center'}}>
                  </View>
                  <View style={styles.contentDisplayContainer}>
                    <Text style={styles.contentDisplayStyle}>{this.props.contentDisplay}</Text>
                  </View>
                </View>
              </View>
            <View style={{flex:0.3}} />
          </View>
          <View style={{flex:0.85}}>
            <View style={{flex:0.25}} />
            <View style={{flex:1, flexDirection:'row'}}>
              <View style={{flex:0.2}} />
              <TouchableOpacity onPress={()=>this.props.pageRedirection()} style={{flex:1, backgroundColor:this.props.bgColor, alignItems:'center', justifyContent:'center', borderRadius:8}}>
                <View>
                  <Text style={styles.loginText}>{this.props.loginText}</Text>
                </View>
              </TouchableOpacity>
              <View style={{flex:0.2}} />
            </View>
            <View style={styles.flexOne} />
            <View style={styles.flexOne} />
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'space-between',
    backgroundColor:'rgba(0,0,0,0.7)'
  },
  closeImageContainer:{
    flex:0.25,
    alignItems:'center',
    justifyContent:'center'
  },
  flexOne:{
    flex:1
  },
  contentDisplayContainer:{
    flex:3.5,
    alignItems:'center',
    justifyContent:'flex-start',
    borderBottomLeftRadius:5,
    borderBottomRightRadius:5,
    padding:12
  },
  contentDisplayStyle:{
    fontSize:responsiveFontSize(2),
    color:'#4f5560',
    textAlign:'center'
  },
  loginText:{
    fontSize:responsiveFontSize(3),
    color:'white'
  }
})

export default PopUp;
