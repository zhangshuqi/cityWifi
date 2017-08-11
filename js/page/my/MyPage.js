/**
 * Created by jianadmin on 2017/5/19.
 */

import React, {Component} from "react";

import {
    StyleSheet,
    View,
    Image,
    Text,
    ScrollView,
    TouchableHighlight
} from "react-native";

import NavigationBar from '../../common/NavigationBar'
import {MORE_MENU} from '../../common/MoreMenu'
import BaseComponent from '../BaseComponent'
import CustomThemePage from './CustomTheme'
import GlobalStyles from '../../../res/styles/GlobalStyles'
import ViewUtils from '../../util/ViewUtils'
import AboutMePage from '../about/AboutMePage'

export default class MyPage extends BaseComponent {
    constructor(props){
        super(props);
        this.state={
            customThemeViewVisible:false,
            theme:this.props.theme
        };
    }

    onClick(tab) {
        let TargetComponent, params = {...this.props,menuType: tab};
        switch (tab) {
            case MORE_MENU.Custom_Theme:
                this.setState({customThemeViewVisible:true});
                break;
            case MORE_MENU.About_Author:
                TargetComponent=AboutMePage;
                break;

            /**
             * case '更新':
             * this.update();
             * break;
             */

             }
        if (TargetComponent) {
            this.props.navigator.push({
                component: TargetComponent,
                params: params,
            });
        }
    }

    renderCustomThemeView(){
        return (<CustomThemePage
            visible={this.state.customThemeViewVisible}
            {...this.props}
            onClose={()=>this.setState({customThemeViewVisible:false})}
        />)
    }

    getItem(tag, icon, text) {
        return ViewUtils.getSettingItem(()=>this.onClick(tag), icon, text,this.state.theme.styles.tabBarSelectedIcon,null);
    }

    render() {
        const navigationBar =
            <NavigationBar
                style={this.state.theme.styles.navBar}
                title='我的'/>;
        return (
            <View style={GlobalStyles.root_container}>
                {navigationBar}
                <ScrollView >
                    {/*logo*/}
                    <TouchableHighlight>
                        <View style={[styles.item, {height: 90}]}>
                            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                                <Image source={require('../../../res/images/logo.png')}
                                       style={{width: 80, height: 80, marginRight: 10}}/>
                                <Text>智慧城市</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                    <View style={GlobalStyles.line}/>

                    {/*设置*/}
                    <Text style={styles.groupTitle}>设置</Text>
                    {/*选择皮肤*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.Custom_Theme, require('./img/ic_view_quilt.png'), '选择皮肤')}
                    {/*关于我们*/}
                    <View style={GlobalStyles.line}/>
                    {this.getItem(MORE_MENU.About_Author, require('./img/ic_insert_emoticon.png'), '关于我们')}
                    <View style={GlobalStyles.line}/>
                </ScrollView>
                {this.renderCustomThemeView()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        padding: 10, height: 60,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    groupTitle: {
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 5,
        fontSize: 12,
        color: 'gray'

    },
});