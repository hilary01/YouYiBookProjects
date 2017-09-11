import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Dimensions,
    StatusBar
} from 'react-native';
import PDFView from 'react-native-pdf-view';
import RNFS from 'react-native-fs';
var { height, width } = Dimensions.get('window');
var count = 1;
var index = 1;
var pdfPath = '';
const BACKICON = require('../img/btn_titel_back.png');
import PublicTitle from '../activity/book_public_title';
export default class PdfReadView extends Component {
    static navigationOptions = ({ navigation, screenProps }) => ({
        // 这里面的属性和App.js的navigationOptions是一样的。
        header: null,
    });
    constructor(props) {
        super(props);
        this.state = {
            isPdfDownload: false,
            pageCount: 1,
        };
        this.pdfView = null;
        // RNFS.DocumentDirectoryPath
    }

    componentDidMount() {
        pdfPath = RNFS.DocumentDirectoryPath + '/' + this.props.navigation.state.params.book_id + '.pdf';
        alert(pdfPath);
    }

    //3秒之后缩放1.5倍
    zoom(val = 2.0) {
        this.pdfView && setTimeout(() => {
            this.pdfView.setNativeProps({ zoom: val });
        }, 3000);
    }
    /**开始拖拽 */
    _onScrollBeginDrag() {
        console.log("开始拖拽");
        //两种清除方式 都是可以的没有区别  
    }
    /**停止拖拽 */
    _onScrollEndDrag() {
        index++;
        if (index > count) {

            index = 1;
        }
        this.setState({
            pageCount: index

        })
        console.log("停止拖拽");

    }
    /**2.手动滑动分页实现 */
    _onAnimationEnd(e) {
        //求出偏移量  
        let offsetX = e.nativeEvent.contentOffset.x;
        //求出当前页数  
        // let pageIndex = Math.floor(offsetX / ScreenWidth);
        //更改状态机  
        // this.setState({ currentPage: pageIndex });
    }
    backOnclik = () => {
        const { goBack } = this.props.navigation;
        goBack();
    }
    finishOnlcik = () => {

    }
    render() {

        return (
            <View state={styles.page}>
                <StatusBar
                    animated={true}
                    hidden={false}
                    backgroundColor={'#F3F3F3'}
                    barStyle={'default'}
                    networkActivityIndicatorVisible={true}
                />
                <PublicTitle _backOnclick={() => this.backOnclik()} _finishOnlcik={() => this.finishOnlcik()} title='阅读器' finishIcon={null} leftIcon={BACKICON} />
                <ScrollView style={styles.pdfcontainer}
                    automaticallyAdjustContentInsets={false}
                    showsVerticalScrollIndicator={false}
                    scrollsToTop={true}
                    onMomentumScrollEnd={(e) => { this._onAnimationEnd(e) }}
                    //开始拖拽  
                    onScrollBeginDrag={() => { this._onScrollBeginDrag() }}
                    //结束拖拽  
                    onScrollEndDrag={() => { this._onScrollEndDrag() }}  >
                    <PDFView ref={(pdf) => { this.pdfView = pdf; }}
                        key="sop"
                        path={this.pdfPath}
                        pageNumber={this.state.pageCount}
                        style={styles.pdf}
                        onLoadComplete={(pageCount) => {
                            count = pageCount;
                            this.pdfView.setNativeProps({
                                zoom: 1.5
                            });
                        }}
                        style={styles.pdf} />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pdfcontainer: {
        height: height
    },
    pdf: {
        height: height
    }, page: {
        height: height,
        backgroundColor: '#DEDEDE'


    }
});