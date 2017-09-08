import React, { Component } from 'react';
import {
    AppRegistry,
    ListView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
    StatusBar,
    Image,
    InteractionManager,
    FlatList,
    ToastAndroid
} from 'react-native';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import LoadView from '../view/loading';
import NetUitl from '../utils/netUitl';
import StringBufferUtils from '../utils/StringBufferUtil';
var BASEURL = 'http://drmlum.rdgchina.com/drmapp/copyright/list';
import Global from '../utils/global';
import StringUtil from '../utils/StringUtil';
import Dimensions from 'Dimensions';
var screenW = Dimensions.get('window').width;
// var RETURN_ICON = require('./images/tabs/icon_return.png');
export default class BookShelfActivity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            dataSource: new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 }),

        };
        this._data = [];
    }

    componentDidMount() {
        // this.getData();
    }
    componentWillUnmount() {

    }

    getData() {


        if (!this.state.show_foot) {

            this.setState({
                show: true
            });
        }
        StringBufferUtils.init();
        StringBufferUtils.append('userid=' + Global.userId);
        StringBufferUtils.append('&&status=' + typeId);
        StringBufferUtils.append('&&pageNo=' + pageNum);
        StringBufferUtils.append('&&recordsperpage=' + 10);
        let params = StringBufferUtils.toString();
        this.fetchData(params);


    }
    fetchData(param) {
        //get请求,以百度为例,没有参数,没有header
        var that = this;
        NetUitl.post(BASEURL, param, '', function (set) {
            //下面的就是请求来的数据
            if (null != set && set.return_code == '0') {
                totalPage = set.totalPage;
                that.addItemKey(set.result);
                pageNum++;
            } else {
                that.setState({
                    show: false
                });

            }




        })

    }
    //整合数据
    addItemKey(rulelist) {
        var that = this;
        if (null != rulelist && rulelist.length > 0) {

            //整合法规数据

            for (var i = 0; i < rulelist.length; i++) {
                rulelist[i].key = rulelist[i].id;

            }

            that._data = that._data.concat(rulelist);


            that.setState({
                dataSource: that.state.dataSource.cloneWithRows(that._data),
                show: false
            });


        } else {
            that.setState({
                show: false,
            });
        }


    }
    deleteRow(data, rowId) {
        // rowMap[`${secId}${rowId}`].closeRow();

        this.deleteMethord(data.id, rowId);
    }

    /**
     * 删除版权
     * @param {*} id 
     */
    deleteMethord(id, rowId) {
        this.setState({
            show: true

        })
        StringBufferUtils.init();
        StringBufferUtils.append('id=' + id);
        let params = StringBufferUtils.toString();
        this.deleteData(params, rowId);
    }
    deleteData(param, rowId) {
        //get请求,以百度为例,没有参数,没有header
        var that = this;
        NetUitl.post(DELETE_URL, param, '', function (set) {
            //下面的就是请求来的数据
            if (null != set && set.return_code == '0') {
                var list = that._data;
                //移除列表中下标为index的项
                delete list[rowId];
                //更新列表的状态
                that._data = list;
                that.setState({
                    dataSource: that.state.dataSource.cloneWithRows(list),
                    show: false
                });
                ToastAndroid.show(set.msg, ToastAndroid.SHORT);
            } else {
                ToastAndroid.show(set.msg, ToastAndroid.SHORT);
                that.setState({
                    show: false
                });

            }




        })

    }
    _backOnclick() {
        this.props.navigator.pop(
            {

            }
        );

    }



    //点击列表点击每一行
    clickItem(item) {
        // this.props.navigator.push({
        //     component: CopyRightDetail,
        //     params: {
        //         detail_id: item.id

        //     }
        // })
    }
    _separator = () => {
        return <View style={{ height: 1, backgroundColor: '#e2e2e2' }} />;
    }


    // 返回国内法规Item
    _renderSearchItem = (itemData, index) => {
        return (
            <View style={{ height: 100, justifyContent: 'center', marginTop: 1, backgroundColor: 'white' }}>
                <TouchableOpacity onPress={() => this.clickItem(itemData, index)} activeOpacity={0.8}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <CachedImage style={{ height: 80, width: 60, marginLeft: 10 }} source={{ uri: itemData.book_icon }} />
                        <View style={{ height: 100, flexDirection: 'column', justifyContent: 'center' }}>
                            <Text style={styles.news_item_title} numberOfLines={1}>{itemData.book_name}</Text>
                            <Text style={styles.rule_item_time}>作者:{itemData.book_author}</Text>
                            <Text style={styles.rule_item_time} numberOfLines={1}>出版社:{itemData.publisher_name}</Text>

                        </View>

                    </View>
                </TouchableOpacity>
            </View>
        );
    }
    //此函数用于为给定的item生成一个不重复的key
    _keyExtractor = (item, index) => item.key;
    render() {
        let self = this;
        return (
            <View style={styles.container}>
                {this.state.show == true ? (<LoadView />) : (null)}
                <SwipeListView
                    dataSource={this.state.dataSource}
                    renderRow={(data, secId, rowId, rowMap) => (
                        <SwipeRow
                            disableLeftSwipe={false}
                            disableRightSwipe={true}
                            leftOpenValue={0}
                            rightOpenValue={-80}
                        >
                            <View style={styles.rowBack}>
                                <TouchableOpacity style={[styles.backRightBtn, styles.backRightBtnRight]} onPress={_ => this.deleteRow(data, rowId)}>
                                    <Text style={styles.backTextWhite}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                            {this._renderSearchItem(data)}
                        </SwipeRow>
                    )}
                />


            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1
    },
    standalone: {
        marginTop: 30,
        marginBottom: 30,
    },
    standaloneRowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        justifyContent: 'center',
        height: 50,
    },
    standaloneRowBack: {
        alignItems: 'center',
        backgroundColor: '#8BC645',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15
    },
    backTextWhite: {
        color: '#FFF',
        textAlign: 'center'
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 90,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 80,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 60,
    },
    backRightBtnRight: {
        backgroundColor: '#ff9602',
        right: 0,
        height: 88,
        marginTop: 1,

    },
    controls: {
        alignItems: 'center',
        marginBottom: 30
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 5
    },
    switch: {
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'black',
        paddingVertical: 10,
        width: 100,
    },
    top_name: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#000000',
        fontSize: 14,
    }, top_select_name: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#ff9602',
        fontSize: 14,
    }
});
