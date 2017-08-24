import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import WeixinTabBar from './view/MainTopTabBar';

export default class MainActivity extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tabNames: ['推荐', '系列书籍', '排行', '分类'],
        };
    }

    render() {
        let tabNames = this.state.tabNames;
        let tabIconNames = this.state.tabIconNames;
        return (
            <ScrollableTabView
                renderTabBar={() => <WeixinTabBar tabNames={tabNames} tabIconNames={tabIconNames} />}
                tabBarPosition='top'>

                <View style={styles.content} tabLabel='key1'>
                    <Text>#1</Text>
                </View>

                <View style={styles.content} tabLabel='key2'>
                    <Text>#2</Text>
                </View>

                <View style={styles.content} tabLabel='key3'>
                    <Text>#3</Text>
                </View>

                <View style={styles.content} tabLabel='key4'>
                    <Text>#4</Text>
                </View>
            </ScrollableTabView>
        );
    }
}

const styles = StyleSheet.create({
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EBEBEB',
        flex: 1
    }
});