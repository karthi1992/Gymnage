import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  Navigator,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import Splashscreen from './app/components/Splashscreen';
import HomePage from './app/components/HomePage';
import ItemScreen from './app/components/ItemScreen';

Navigator.prototype.replaceWithAnimation = function (route) {
  const activeLength = this.state.presentedIndex + 1;
  const activeStack = this.state.routeStack.slice(0, activeLength);
  const activeAnimationConfigStack = this.state.sceneConfigStack.slice(0, activeLength);
  const nextStack = activeStack.concat([route]);
  const destIndex = nextStack.length - 1;
  const nextSceneConfig = this.props.configureScene(route, nextStack);
  const nextAnimationConfigStack = activeAnimationConfigStack.concat([nextSceneConfig]);

  const replacedStack = activeStack.slice(0, activeLength - 1).concat([route]);
  this._emitWillFocus(nextStack[destIndex]);
  this.setState({
    routeStack: nextStack,
    sceneConfigStack: nextAnimationConfigStack,
  }, () => {
    this._enableScene(destIndex);
    this._transitionTo(destIndex, nextSceneConfig.defaultTransitionVelocity, null, () => {
      this.immediatelyResetRouteStack(replacedStack);
    });
  });
};

class Gymnage extends Component {

  render() {
    return (
      <Navigator
        ref={(component) => this._navigator = component}
        initialRoute={{id: 'Splashscreen', name: 'Index'}}
        renderScene={this.renderScene.bind(this)}
        configureScene={(route, routeStack) => {
        if (route.sceneConfig) {
          return route.sceneConfig;
        }
            return Navigator.SceneConfigs.HorizontalSwipeJump;
          }} />

    );
  }

  renderScene(route, navigator) {
    var routeId = route.id;
    if (routeId === 'Splashscreen') {
      return (
        <Splashscreen
          navigator={navigator} />
      );
    }
    if (routeId === 'HomePage') {
      return (
        <HomePage
          navigator={navigator}
          done={route.done}
          propsData={route.propsData} />
      );
    }
    if (routeId === 'ItemScreen') {
      return (
        <ItemScreen
          navigator={navigator}
          todoData={route.todoData} />
      );
    }
  }
}

AppRegistry.registerComponent('Gymnage', () => Gymnage);
