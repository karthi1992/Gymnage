import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  TextInput,
  ListView,
  AsyncStorage,
  Navigator
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
let arrayData = [];

class ItemScreen extends Component {

  state={
    todoData:this.props.todoData
  }

  backBtnCallback(){
    this.props.navigator.replaceWithAnimation({id:'HomePage', sceneConfig:Navigator.SceneConfigs.HorizontalSwipeJumpFromRight})
  }

  itemCallback(){
    if(this.props.todoData != this.state.todoData){
      AsyncStorage.multiGet(['todoList'], (err, stores) => {
        var arr = JSON.parse(stores[0][1])
        var ary = []
        var finalArray = []
        for(var j=0;j<arr.length;j++){
          ary.push(arr[j].todoData)
        }
        var index = ary.indexOf(this.props.todoData)
        arr[index].todoData = this.state.todoData
        arr[index].activityAccomplished = false
        AsyncStorage.setItem('todoList', JSON.stringify(arr))
        this.props.navigator.replaceWithAnimation({id:'HomePage', sceneConfig:Navigator.SceneConfigs.HorizontalSwipeJumpFromRight, done:false})
      })
    }else{
      AsyncStorage.multiGet(['todoList'], (err, stores) => {
        var arr = JSON.parse(stores[0][1])
        var ary = []
        var finalArray = []
        for(var j=0;j<arr.length;j++){
          ary.push(arr[j].todoData)
        }
        var index = ary.indexOf(this.props.todoData)
        arr[index].activityAccomplished = true
        AsyncStorage.setItem('todoList', JSON.stringify(arr))
        this.props.navigator.replaceWithAnimation({id:'HomePage', sceneConfig:Navigator.SceneConfigs.HorizontalSwipeJumpFromRight, done:true, propsData:this.props.todoData})
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex:0.12, backgroundColor:'#00CF87', flexDirection:'row'}}>
          <TouchableOpacity onPress={this.backBtnCallback.bind(this)} style={{flex:0.2, alignItems:'center', justifyContent:'center'}}>
            <View>
              <Image resizeMode='contain' source={require('../images/backArrow.png')} style={{height:responsiveHeight(4), width:responsiveWidth(8), marginTop:responsiveHeight(2)}} />
            </View>
          </TouchableOpacity>
          <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text style={{fontSize:responsiveFontSize(3), paddingTop:responsiveHeight(2), color:'#ffffff'}}>Item Screen</Text>
          </View>
          <View style={{flex:0.2}} />
        </View>
        <View style={{flex:1,}}>
          <View style={{flex:0.1, borderBottomWidth:1, borderBottomColor:'rgba(0,0,0,0.1)'}}>
            <TextInput
            style={styles.textInputText}
            selectionColor={'#00CF87'}
            placeholder={'Add items to your list'}
            placeholderTextColor={'gray'}
            onChangeText={(todoData)=>{
                this.setState({todoData})
              }}
            value={this.state.todoData}
            />
          </View>
          <View style={{flex:1}}>
            <View style={{flex:0.2}}>
              <View style={{flex:0.3}} />
              <View style={{flex:1, flexDirection:'row'}}>
                <View style={{flex:0.2}} />
                <TouchableOpacity onPress={this.itemCallback.bind(this)} style={{flex:1, backgroundColor:'#00CF87', alignItems:'center', justifyContent:'center', borderRadius:8}}>
                  <View>
                  {
                    this.props.todoData == this.state.todoData ?
                    <Text style={{fontSize:responsiveFontSize(2.5), color:'#ffffff'}}>Done</Text>
                    :
                    <Text style={{fontSize:responsiveFontSize(2.5), color:'#ffffff'}}>Update</Text>
                  }
                  </View>
                </TouchableOpacity>
                <View style={{flex:0.2}} />
              </View>
              <View style={{flex:0.3}} />
            </View>
            <View style={{flex:1}} />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'space-between',
  },
  coverImage:{
    flex:1
  },
  textInputContainer:{
    flex:4,
    borderRadius:8,
    borderWidth:1,
    borderColor:'#00CF87'
  },
  textInputText:{
    flex:1,
    fontSize:responsiveFontSize(2),
    color:'#00CF87',
    paddingLeft:10
  }
})
export default ItemScreen;
