/**
 * Created by jianadmin on 2017/5/19.
 */
import React, {Component} from 'react';
import {
    WebView,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';

import Toast, {DURATION} from 'react-native-easy-toast'
import NavigationBar from '../common/NavigationBar'
import CustomThemePage from './my/CustomTheme'
import BaseComponent from './BaseComponent'
import GlobalStyles from '../../res/styles/GlobalStyles'

export default class FavoritePage extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            theme: this.props.theme,
            customThemeViewVisible: false,
            url: "http://app.hktfi.com/yiyuan.dhtml",
            title: '',
            canBack: false,
        };
    }

    onBack() {
        //如果网页还有上级页面（可返回）
        if (this.state.canBack) {
            this.webView.goBack();
        } else {
            //提示不能返回上一页面了
            this.toast.show('宝宝，退无可退啦！', DURATION.LENGTH_SHORT);

            //重新渲染
            this.forceUpdate();
        }
    }

    onNavigationStateChange(e) {
        this.setState({
            title: e.title,
            //设置是否要以返回上级页面
            canBack: e.canGoBack
        })
    }

    renderCustomThemeView() {
        return (<CustomThemePage
            visible={this.state.customThemeViewVisible}
            {...this.props}
            onClose={()=>this.setState({customThemeViewVisible: false})}
        />)
    }

    onBackButton(image) {
        return <TouchableOpacity
            style={{padding: 8}}
            onPress={() => {
                this.onBack();
            }}>
            <Image
                style={{width: 26, height: 26, tintColor: 'white'}}
                source={image}/>
        </TouchableOpacity>;
    }

    render() {
        const navigationBar =
            <NavigationBar
                style={this.state.theme.styles.navBar}
                title='智慧医疗'
                leftButton={this.onBackButton(require('../../res/images/ic_arrow_back_white_36pt.png'))}
            />;

        return (
            <View style={GlobalStyles.root_container}>
                {navigationBar}
                <WebView
                    ref={webView=>this.webView=webView}
                    startInLoadingState={true}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
                    source={{uri:this.state.url}}/>
                <Toast ref={toast=>{
                    this.toast=toast
                }}/>
                {this.renderCustomThemeView()}
            </View>
        );
    }
}

