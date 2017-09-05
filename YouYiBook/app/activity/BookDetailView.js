import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    StatusBar,
    Image
} from 'react-native';

var { height, width } = Dimensions.get('window');
const BACKICON = require('../img/btn_titel_back.png');
const TITLELOG = require('../img/title_logo.png');
const FAVORITEICON = require('../img/btn_title_favorite.png');
const SHAREICON = require('../img/btn_title_share.png');
import CustomBtn from '../view/CustomButton';
import NetUitl from '../utils/netUitl';
import LoadView from '../view/loading';
import StringBufferUtils from '../utils/StringBufferUtil';
import stringUtil from '../utils/StringUtil';
const BASEURL = 'http://121.42.238.246:8080/unitrip_bookstore/bookstore/bookInfo';
var menus = ['电子书', '纸质书'];
export default class BookDetail extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        // 这里面的属性和App.js的navigationOptions是一样的。
        header: null,
    });
    constructor(props) {
        super(props);
        this.state = {
            bookId: '',
            show: false,
            menuList: []
        };

    }
    getData(bookId) {
        StringBufferUtils.init();
        StringBufferUtils.append('book_id=' + bookId);
        let params = StringBufferUtils.toString();
        this.fetchData(params);

    }
    componentDidMount() {
        this.initMenu();
        var bookIds = this.props.navigation.state.params.book_id;
        this.getData(bookIds);
    }
    /**
   * 初始化排序
   * 
   */
    initMenu() {
        var topMenu = [];
        for (var i = 0; i < menus.length; i++) {
            var obj = new Object();
            obj.name = menus[i];
            obj.id = i;
            if (i == 0) {

                obj.select = true;
            } else {

                obj.select = false;
            }
            topMenu.push(obj);

        }
        this.setState({

            menuList: topMenu
        })


    }
    _menuClickListener(item, j) {
        var menu_list = this.state.menuList;
        for (var i = 0; i < menu_list.length; i++) {
            menu_list[i].select = false;

        }
        menu_list[j].select = true;
        this.setState({
            menuList: menu_list,
            // show: true

        })



    }
    renderMenuseItem(item, i) {
        return <View style={{ marginTop: 5, marginBottom: 5 }}>
            <TouchableOpacity onPress={() => this._menuClickListener(item, i)}>
                {this._getSelectText(i, item)}

            </TouchableOpacity>

        </View>;
    }

    _getSelectText(i, item) {
        if (item.select) {

            return <View style={i == 0 ? styles.leftSelectBtn : styles.rightSelectBtn}>

                <Text style={styles.select_txt} >{item.name}</Text>

            </View>
        } else {

            return <View style={i == 0 ? styles.leftUnSelectBtn : styles.rightUnSelectBtn}>

                <Text style={styles.unselect_txt}>{item.name}</Text>
            </View>
        }


    }
    // 数据请求
    fetchData(params) {
        var that = this;
        console.log(BASEURL + params);
        NetUitl.post(BASEURL, params, '', function (responseData) {
            //下面的就是请求来的数据
            if (null != responseData && responseData.return_code == '0') {
                console.log(responseData);

            } else {
                that.setState({
                    show: false
                });

            }
        })
    }
    backOnclik = () => {
        const { goBack } = this.props.navigation;
        goBack();
    }
    favoriteOnlcik() {
        alert('favoriteOnlcik');

    }
    shareOnlcik() {
        alert('shareOnlcik');

    }
    onClick() {


    }
    render() {
        var menuLists = this.state.menuList;
        return (
            <View state={styles.page}>
                {this.state.show == true ? (<LoadView size={10} color="#FFF" />) : (null)}
                <View style={styles.container}>
                    <StatusBar
                        animated={true}
                        hidden={false}
                        backgroundColor={'#028CE5'}
                        barStyle={'default'}
                        networkActivityIndicatorVisible={true}
                    />
                    <View style={styles.left_view} >

                        <TouchableOpacity onPress={() => this.backOnclik()} >
                            <Image style={styles.left_icon} source={BACKICON}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.textview}>
                        <Image source={TITLELOG} style={{ height: 32, width: 32 }} />
                        <Text style={styles.textstyle} numberOfLines={1}>书籍详情</Text>
                    </View>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}>


                        <View style={styles.right_view} >
                            <TouchableOpacity onPress={() => this.favoriteOnlcik()} >

                                <Image style={styles.right_icon} source={FAVORITEICON}></Image>

                            </TouchableOpacity>

                        </View>
                        <View style={styles.right_view} >
                            <TouchableOpacity onPress={() => this.shareOnlcik()} >

                                <Image style={styles.right_icon} source={SHAREICON}></Image>

                            </TouchableOpacity>

                        </View>

                    </View>
                </View>
                <View style={{ height: 1, width: width, backgroundColor: '#1CA831' }} />
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#DEDEDE', justifyContent: 'center' }}>


                    {
                        menuLists.map((item, i) => this.renderMenuseItem(item, i))
                    }
                </View>
                <CustomBtn textColor='white' textSize={14} btnTxt='购买' _BtnOnlcik={() => this.onClick()} bgColor='#1CA831' btnWidth={80} btnHeight={30} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 45,
        alignSelf: 'stretch',
        backgroundColor: '#E1E7E3',
        justifyContent: 'space-between'
    }, page: {
        flex: 1,
        backgroundColor: '#F0F0F2'


    }, textview: {
        flexDirection: 'row',
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textstyle: {
        fontSize: 18,
        color: '#1FA82D',
        textAlign: 'center',
        paddingLeft: 10,
    },
    right_view: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10
    },
    right_icon: {
        width: 39,
        height: 30,
        marginRight: 10,
        justifyContent: 'center'

    }, left_view: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: 30,
        marginLeft: 5
    },
    left_icon: {
        width: 39,
        height: 30,
        marginLeft: 10,
        justifyContent: 'center'

    }, leftSelectBtn: {
        width: (width - 40) / 4,
        padding: 5,
        backgroundColor: '#009C18',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        flexDirection: 'row',
        borderRightWidth: 1,
        borderRightColor: '#e2e2e2',


    }, leftUnSelectBtn: {
        width: (width - 40) / 4,
        padding: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        flexDirection: 'row',
        borderRightWidth: 1,
        borderRightColor: '#e2e2e2'


    }, rightSelectBtn: {
        width: (width - 40) / 4,
        padding: 5,
        backgroundColor: '#009C18',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        flexDirection: 'row'



    }, rightUnSelectBtn: {
        width: (width - 40) / 4,
        padding: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5,
        flexDirection: 'row'


    }, normalselectBtn: {
        width: (width - 40) / 4,
        padding: 5,
        backgroundColor: '#009C18',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRightWidth: 1,
        borderRightColor: '#e2e2e2',
        borderLeftWidth: 1,
        borderLeftColor: '#e2e2e2'



    }
    , normalBtn: {
        width: (width - 40) / 4,
        padding: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRightWidth: 1,
        borderRightColor: '#e2e2e2',
        borderLeftWidth: 1,
        borderLeftColor: '#e2e2e2'




    }, normaloneBtn: {
        width: (width - 40) / 4,
        padding: 5,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderLeftWidth: 1,
        borderLeftColor: '#e2e2e2'




    }, select_txt: {
        fontSize: 14,
        color: 'white'

    }, unselect_txt: {
        fontSize: 14,
        color: '#666666'

    }
});