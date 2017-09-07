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
    StatusBar

} from 'react-native';
import SideMenu from 'react-native-side-menu';
import Menu from '../activity/menu'; //导入菜单组件
import MainPublicTitle from '../activity/book_main_title';
import Global from '../utils/global';
const uri_image_menu = 'http://image18-c.poco.cn/mypoco/myphoto/20160605/09/17351665220160605093956066.png';
const FITERIMG = require('../img/btn_titel_filter.png');
const { width, height } = Dimensions.get('window');
const menuView = null;
import MainActivity from '../main';
import LoginActivity from '../activity/CenterLoginView';
var isFristLoad = true;
const SEARCHIMG = require('../img/btn_titel_search.png');
const OUTLOGINICON = require('../img/btn_logout.png');
const FINDPASSICON = require('../img/btn_title_findpwd.png');
export default class SideMenus extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        // 这里面的属性和App.js的navigationOptions是一样的。
        header: null,
    });
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            showFilter: false,
            whichFlag: 1,
            menuIndex: 0,
            outLogin: false,
            rightIcons: FINDPASSICON,
            width: 39,
            height: 30
        };
    }
    componentDidMount() {

        if (Global.isLogin == undefined) {
            Global.isLogin = false;
        }
    }



    onMenuItemSelected = (item) => {
        this.setState({
            isOpen: false,

        });
    }
    showToast() {
        // this.refs.toast.show(this.state.selectedItem, 1000);

    }
    menuCallBack(menu) {

        this.setState({
            isOpen: false,

        });
        var icon;
        Global.menuEntity = menu;
        var out_login = menu.id == 3 ? true : false;
        if (Global.isLogin == true && menu.id == 3) {

            icon = OUTLOGINICON;
        } else if (Global.isLogin == false && menu.id == 3) {
            icon = FINDPASSICON

        } else {
            icon = SEARCHIMG
        }
        var width = (Global.isLogin == false && menu.id == 3) ? 56 : 39;
        this.setState({
            outLogin: out_login,
            rightIcons: icon,
            menuIndex: Global.menuEntity.id,
            width: width
        })

    }
    onMenuItemOnclik = () => {

        var isOp = this.state.isOpen;
        this.setState({
            isOpen: !isOp,

        });
    }
    fiterOnlcik = () => {
        const { navigate } = this.props.navigation;
        navigate('filterView', {
            // 跳转的时候携带一个参数去下个页面
            callback: (publishId, provinceId, cityId) => {
                var obj = new Object();
                obj.pId = publishId;
                obj.prId = provinceId;
                obj.cId = cityId;
                Global.publishId = publishId;
                Global.provinceId = provinceId;
                Global.cityId = cityId;
                this._updateData(obj);
            }
        });
    }
    /**
     * 
     * @param {*更新数据} publishId 
     * @param {*} provinceId 
     * @param {*} cityId 
     */
    _updateData = (obj) => {
        var flag = this.state.whichFlag;
        this.refs.mainView.updateUi(obj, flag);
    }
    _changeRightIcon = () => {

        this.setState({
            rightIcons: OUTLOGINICON,
            width: 39
        })
    }
    fiterIcon = (flag, arg) => {

        this.setState({
            showFilter: flag,
            whichFlag: arg
        })
    }
    searchOnlcik = () => {

        if (this.state.outLogin == true) {

            alert('退出登录');

        } else {
            const { navigate } = this.props.navigation;
            navigate('searchView');
        }
    }

    showView() {
        const { navigate } = this.props.navigation;
        switch (this.state.menuIndex) {
            case 0://书城
                return <MainActivity changeIcon={this.fiterIcon.bind(this)} ref='mainView' navigation={navigate} />
                break
            case 1://书架
                return <Text>书架</Text>
                break
            case 2://购物车
                return <Text>购物车</Text>
                break
            case 3://个人中心
                return <LoginActivity _changeRightIcon={this._changeRightIcon.bind(this)} />
                break
            case 4://游逸天下
                return <Text>游逸天下</Text>
                break
            case 5://更多
                return <Text>更多</Text>
                break
        }

    }

    render() {
        menuView = <Menu ref='menuV' onItemSelected={this.menuCallBack.bind(this)} />
        var menuEntity = Global.menuEntity;
        return (
            <SideMenu
                menu={menuView}
                isOpen={this.state.isOpen}
                openMenuOffset={width / 4 * 3}
            /* onChange={(isOpen) => this.updateMenuState(isOpen)} */
            >
                <View style={styles.page}>
                    <StatusBar
                        animated={true}
                        hidden={false}
                        backgroundColor={'#F3F3F3'}
                        barStyle={'default'}
                        networkActivityIndicatorVisible={true}
                    />
                    <MainPublicTitle _menuOnclick={() => this.onMenuItemOnclik()} _filterIconOnlcik={() => this.fiterOnlcik()} _searchOnlcik={() => this.searchOnlcik()} filterIcon={this.state.showFilter == true ? FITERIMG : null} rightIcon={(this.state.outLogin == true || Global.isLogin == true) ? this.state.rightIcons : SEARCHIMG} width={this.state.width} height={30} />
                    <View style={{ height: 1, width: width, backgroundColor: '#00B11D' }} />
                    {this.showView()}

                </View>
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
