import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  TextInput,
  ListView,
  AsyncStorage
} from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
let arrayData = []

class Tab1 extends Component {

  constructor(){
    super();
    const ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
    this.state = {
      todoList:ds,
      addItem:'',
      emptyList:true
    }
  }

  componentDidMount(){
    AsyncStorage.getItem('todoList', (err, result) => {
      if (result !== null) {
        this.setState({emptyList:false})
        var newIds = JSON.parse(result);
        this.setState({todoList:this.state.todoList.cloneWithRows(JSON.parse(result))})
      } else {
        this.setState({emptyList:true})
      }
    });
  }

  _renderRow(rowData){
    return(
      <TouchableOpacity onPress={()=>{
        this.props.navigator.replaceWithAnimation({id:'ItemScreen', todoData:rowData.todoData})
        }} style={styles.renderRowContainer}>
        <View style={{flex:1}}>
          <Text style={styles.renderRowText}>{rowData.todoData}</Text>
        </View>
        {
          rowData.activityAccomplished ?
          <View style={{flex:0.2}}>
            <Image resizeMode='contain' source={require('../images/doneButton.png')} style={{height:responsiveHeight(5), width:responsiveWidth(10)}}/>
          </View>
          :
          null
        }
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.todoListContainer}>
          <View style={{flex:0.5}} />
          <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text style={styles.todoListText}>My Todo List</Text>
          </View>
          <View style={{flex:0.5}} />
        </View>
        <View style={{flex:1}}>
        {
          this.state.emptyList ?
          <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text style={{fontSize:responsiveFontSize(2.5), color:'#00CF87'}}>Your todolist is empty.</Text>
          </View>
          :
          <View style={{flex:1}}>
            <ListView
            dataSource={this.state.todoList}
            keyboardShouldPersistTaps={'handled'}
            horizontal={false}
            scrollEnabled={true}
            renderRow={(rowData) => this._renderRow(rowData)}
           />
          </View>
        }
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
  todoListContainer:{
    flex:0.14,
    backgroundColor:'#00CF87',
    flexDirection:'row'
  },
  todoListText:{
    fontSize:responsiveFontSize(3),
    marginTop:responsiveHeight(2),
    color:'#ffffff',
    fontWeight:'500'
  },
  coverImage:{
    flex:1
  },
  renderRowContainer:{
    flex:1,
    flexDirection:'row',
    borderBottomWidth:1,
    borderBottomColor:'rgba(0,0,0,0.4)',
    justifyContent:'center',
    backgroundColor:'transparent',
    paddingTop:20,
    paddingBottom:20
  },
  renderRowText:{
    fontSize:responsiveFontSize(2.5),
    color:'#000000',
    paddingLeft:20
  }
})
export default Tab1;
