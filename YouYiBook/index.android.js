/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ViewPagerAndroid,
  ScrollView,
  Navigator,
  View,
  ListView,
  Dimensions,
  WebView,
  ToastAndroid,
  Button,
  DrawerLayoutAndroid,

} from 'react-native';

import SideMenu from 'react-native-side-menu';
import Menu from './app/activity/menu'; //导入菜单组件

const uri_image_menu = 'http://image18-c.poco.cn/mypoco/myphoto/20160605/09/17351665220160605093956066.png';

const { width, height } = Dimensions.get('window');
import Toast, { DURATION } from 'react-native-easy-toast';
class YouYiBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedItem: 'About',
    };
  }

  toggle() {
    this.refs.toast.show('toggle',1000);
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({
      isOpen: isOpen
    });
  }

  onMenuItemSelected = (item) => {
    this.setState({
      isOpen: false,
      selectedItem: item,
    });
  }
  showToast() {

    this.refs.toast.show(this.state.selectedItem,1000);
  }
  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />

    return (
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        openMenuOffset={width/4*3}
        onChange={(isOpen) => this.updateMenuState(isOpen)}
      >
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to React Native!
            </Text>
          <Text style={[styles.instructions, { color: 'red' }]} onPress={() => this.showToast(this.state.selectedItem)}>
            当前选中的菜单是: {this.state.selectedItem}
          </Text>
        </View>

        <Button style={styles.button} onPress={() => this.toggle()} title="我是button，点击打开侧边栏" >
          <Image
            source={{ uri: uri_image_menu, width: 32, height: 32, }} />
        </Button>
        <Toast ref="toast" />
      </SideMenu>
    );
  }
}

const styles = StyleSheet.create({

  button: {
    position: 'absolute',
    top: 20,
    padding: 10,
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('YouYiBook', () => YouYiBook);
