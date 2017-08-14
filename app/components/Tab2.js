import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Modal,
  TextInput,
  ListView,
  AsyncStorage,
  Navigator
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import PopUp from './PopUp';
let closeButton = require('../images/close.png');
let cautionIcon = require('../images/caution.jpeg');
let textEmpty = "Please enter text.";
let arrayData = [];

class Tab2 extends Component {

  constructor(){
    super();
    const ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
    this.state = {
      addItem:'',
      emptyItem:false
    }
  }

  addItemCallback(){
    if(this.state.addItem != ''){
      this.setState({emptyItem:false})
      AsyncStorage.getItem('todoList', (err, result) => {
        const id = [{'todoData':this.state.addItem, 'activityAccomplished':false}]
        if (result !== null) {
          var newIds = JSON.parse(result).concat(id);
          AsyncStorage.setItem('todoList', JSON.stringify(newIds));
          this.props.navigator.replaceWithAnimation({id:'HomePage', sceneConfig:Navigator.SceneConfigs.HorizontalSwipeJumpFromRight})
        } else {
          AsyncStorage.setItem('todoList', JSON.stringify(id));
          this.props.navigator.replaceWithAnimation({id:'HomePage', sceneConfig:Navigator.SceneConfigs.HorizontalSwipeJumpFromRight})
        }
      });
    }else{
      this.setState({emptyItem:true})
    }
  }

  closePopUp(){
    this.setState({emptyItem:false})
  }

  render() {
    return (
      <View style={styles.container}>
        <PopUp
          visible={this.state.emptyItem}
          closePopUp={this.closePopUp.bind(this)}
          closeImage={closeButton}
          titleImageStyle={styles.cautionStyle}
          tilteImage={cautionIcon}
          contentDisplay={textEmpty}
          onRequestClose={this.closePopUp.bind(this)}
        />
        <View style={{flex:1}}>
          <View style={{flex:0.2}}>
            <View style={{flex:0.3}} />
            <View style={{flex:1}}>
              <View style={{flex:1, flexDirection:'row'}}>
                <View style={{flex:0.3}} />
                <View style={styles.textInputContainer}>
                  <TextInput
                  style={styles.textInputText}
                  selectionColor={'#00CF87'}
                  placeholder={'Add items to your list'}
                  placeholderTextColor={'#D3D3D3'}
                  onChangeText={(addItem)=>{
                    this.setState({addItem})
                  }}
                  value={this.state.addItem}
                  />
                </View>
                <View style={{flex:0.3}} />
                <TouchableOpacity onPress={this.addItemCallback.bind(this)} style={styles.addButton}>
                  <View>
                    <Text style={styles.addText}>Add</Text>
                  </View>
                </TouchableOpacity>
                <View style={{flex:0.3}} />
              </View>
              <View style={{flex:0.6}} />
            </View>
          </View>
          <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text style={{fontSize:responsiveFontSize(2), color:'#00CF87'}}>Click on the add button to add items to your list.</Text>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'space-between'
  },
  coverImage:{
    flex:1
  },
  addText:{
    fontSize:responsiveFontSize(2.5),
    color:'#ffffff'
  },
  addButton:{
    flex:2,
    backgroundColor:'#00CF87',
    borderRadius:8,
    alignItems:'center',
    justifyContent:'center'
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
    color:'#00CF83',
    paddingLeft:10
  },
  cautionStyle:{
    height:responsiveHeight(8),
    width:responsiveWidth(14)
  },
})
export default Tab2;
