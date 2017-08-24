/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {
    StackNavigator,
    TabNavigator,
} from 'react-navigation';

import React from 'react';

import CardStackStyleInterpolator from 'react-navigation/src/views/CardStackStyleInterpolator';


import {
    Image,
    StyleSheet,
    Text,
    AsyncStorage
} from 'react-native';
import sidemenu from './sidemenu';
import detail from '../main';

/**
 * 1、Test1是通过普通的属性创建的Tabbar和导航
 * 2、Test2是在页面中通过属性创建Tabbar和导航
 * 3、Test3是通过封装navigationOptions实现Tabbar和导航的
 */






// 初始化StackNavigator
const MyNav = StackNavigator({
    main: {
        screen: sidemenu,
       
    },
    // 将需要跳转的页面注册在这里，全局才可以跳转
    detail: {
        screen: detail
    },

}, {
    initialRouteName:'main'
    });

const TabOptions = (tabBarTitle, normalImage, selectedImage, navTitle) => {
    // console.log(navigation);
    const tabBarLabel = tabBarTitle;
    const tabBarIcon = (({ tintColor, focused }) => {
        return (
            <Image
                source={!focused ? normalImage : selectedImage}
                style={[{ height: 35, width: 35 }, { tintColor: tintColor }]}
            />
        )
    });
    const headerTitle = navTitle;
    const headerTitleStyle = { fontSize: 22, color: 'white', alignSelf: 'center' };
    // header的style
    const headerStyle = { backgroundColor: '#4ECBFC' };
    const tabBarVisible = true;
    // const header = null;
    return { tabBarLabel, tabBarIcon, headerTitle, headerTitleStyle, headerStyle, tabBarVisible };
};

export default MyNav;