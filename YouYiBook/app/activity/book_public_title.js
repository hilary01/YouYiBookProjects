import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    TouchableOpacity,
    StatusBar
} from 'react-native';
const BACKICON = require('../img/btn_titel_back.png');
const TITLELOG = require('../img/title_logo.png');
const FITERIMG = require('../img/btn_titel_filter.png');
export default class PublicTitle extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    animated={true}
                    hidden={false}
                    backgroundColor={'#028CE5'}
                    barStyle={'default'}
                    networkActivityIndicatorVisible={true}
                />
                <View style={styles.left_view} >

                    <TouchableOpacity onPress={() => this.props._backOnclick()} >
                        <Image style={styles.left_icon} source={this.props.leftIcon}></Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.textview}>
                    <Image source={TITLELOG} style={{ height: 32, width: 32 }} />
                    <Text style={styles.textstyle} numberOfLines={1}>{this.props.title}</Text>
                </View>
                <View style={styles.right_view} >
                    <TouchableOpacity onPress={() => this.props._finishOnlcik()} >

                        <Image style={{
                            marginRight: 10,
                            justifyContent: 'center',
                            width: this.props.imgWidth,
                            height: this.props.imgHeight
                        }} source={this.props.finishIcon}></Image>

                    </TouchableOpacity>

                </View>
            </View>
        );
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
    },
    textview: {
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
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    left_view: {
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

    }
});
