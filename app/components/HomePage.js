import React, { Component } from 'react';
import {
  Text,
  Navigator,
  TouchableOpacity,
  Image,
  View,
  AsyncStorage,
  StyleSheet
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Tab1 from './Tab1';
import Tab2 from './Tab2';

class HomePage extends Component {

  render() {
    return (
      <View style={styles.container}>
        <ScrollableTabView tabBarActiveTextColor={'#ffffff'} tabBarUnderlineStyle={{backgroundColor:'#ffffff'}} tabBarBackgroundColor={'#00CF87'} contentProps={{ bounces: true, keyboardShouldPersistTaps: true }} tabBarPosition='bottom'>
          <Tab1 propsData={this.props.propsData} done={this.props.done} navigator={this.props.navigator} tabLabel="Tab1" />
          <Tab2 navigator={this.props.navigator} tabLabel="Tab2" />
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#ffffff'
  }
})

export default HomePage;
