import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import PDFView from 'react-native-pdf-view';
import RNFS from 'react-native-fs';

const pdfDownloadURL = 'http://image.tianjimedia.com/imagelist/2009/190/caq4z56jadof.pdf';
var { height, width } = Dimensions.get('window');
var count = 1;
import Toast, { DURATION } from 'react-native-easy-toast';
var index = 1;
export default class PdfDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPdfDownload: false,
            pageCount: 1,
        };
        this.pdfView = null;
        this.pdfPath = RNFS.DocumentDirectoryPath + '/test.pdf'
        // RNFS.DocumentDirectoryPath
    }

    componentDidMount() {
        var tempLength = 0;
        var that = this;
        var totalSize = 0;
        var DownloadFileOptions = {
            fromUrl: pdfDownloadURL,          // URL to download file from
            toFile: this.pdfPath, // Local filesystem path to save the file to
            begin: function (val) {
                // that.refs.toast.show('下载开始', 1000);
            },
            progress: function (val) {
                tempLength = parseInt(val.bytesWritten);
                totalSize = parseInt(val.contentLength);
                if (tempLength + '' == totalSize + '') {

                    // that.refs.toast.show('下载完成', 1000);
                }
            },
        }
        var result = RNFS.downloadFile(DownloadFileOptions);
        console.log(result);

        // var _this = this;
        // result.then(function (val) {
        //     _this.setState({
        //         isPdfDownload: true,
        //     });
        // }, function (val) {
        //     console.log('Error Result:' + JSON.stringify(val));
        // }
        // ).catch(function (error) {
        //     console.log(error.message);
        // });
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
    render() {

        return (
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
                <Toast ref="toast" />
            </ScrollView>
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
    }
});