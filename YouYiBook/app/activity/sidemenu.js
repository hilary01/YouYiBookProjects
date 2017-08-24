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
import Menu from '../activity/menu'; //导入菜单组件
import PublicTitle from '../activity/book_main_title';
import Global from '../utils/global';
const uri_image_menu = 'http://image18-c.poco.cn/mypoco/myphoto/20160605/09/17351665220160605093956066.png';

const { width, height } = Dimensions.get('window');
import Toast, { DURATION } from 'react-native-easy-toast';
const menuView = null;
import MainActivity from '../main'
var isFristLoad = true;
export default class SideMenus extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        // 这里面的属性和App.js的navigationOptions是一样的。
        header: null,
    });
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }


    // updateMenuState(isOpen) {
    //     this.setState({
    //         isOpen: isOpen
    //     });
    // }

    onMenuItemSelected = (item) => {
        this.setState({
            isOpen: false,

        });
    }
    showToast() {
        // this.refs.toast.show(this.state.selectedItem, 1000);

    }
    menuCallBack(menu) {
        var menuEntity = Global.menuEntity;
        this.setState({
            isOpen: false,

        });
        // alert(menuEntity.name);
    }
    onMenuItemOnclik = () => {
        var isOp = this.state.isOpen;
        this.setState({
            isOpen: !isOp,

        });
    }
    fiterOnlcik = () => {

        alert('fiterOnlcik');
    }
    searchOnlcik = () => {

        alert('searchOnlcik');
    }

    render() {
        menuView = <Menu ref='menuV' onItemSelected={this.menuCallBack.bind(this)} />
        var menuEntity = Global.menuEntity;
        return (
            // <PdfRead/>
            <SideMenu
                menu={menuView}
                isOpen={this.state.isOpen}
                openMenuOffset={width / 4 * 3}
            /* onChange={(isOpen) => this.updateMenuState(isOpen)} */
            >
                <View style={styles.page}>

                    <PublicTitle _menuOnclick={() => this.onMenuItemOnclik()} _filterOnlcik={() => this.filterOnlcik()} _searchOnlcik={() => this.searchOnlcik()} />
                    <View style={{ height: 1, width: width, backgroundColor: '#00B11D' }} />
                    <MainActivity />

                </View>
                <Toast ref="toast" />
            </SideMenu>
        );

    }
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        backgroundColor: '#f2f2f2',
    },
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
