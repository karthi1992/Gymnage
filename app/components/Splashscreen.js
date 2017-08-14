import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  Navigator,
  TouchableOpacity,
  Image,
  View,
  Animated,
  Easing
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

class Splashscreen extends Component {

  constructor () {
    super()
    this.spinValue = new Animated.Value(0)
  }

  componentDidMount(){
    setTimeout(
      ()=>{
        this.props.navigator.replaceWithAnimation({id:'HomePage'})
      },3000
    )
    this.spin()
  }

  spin(){
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear
      }
    ).start()
  }

  render() {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    })
    return (
      <Animated.View style={styles.container}>
        <Animated.Text style={{fontSize:responsiveFontSize(4), color:'#ffffff', transform:[{rotate:spin}]}}>TODO LIST</Animated.Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#2ecc71'
  }
})

export default Splashscreen;
