/**
 * Created by jianadmin on 2017/5/19.
 */

import React, {Component} from 'react';
import {
    DeviceEventEmitter,
    BackAndroid,
    ToastAndroid
} from 'react-native';

import {ACTION_HOME}from './HomePage'

//标记是第几次按下返回键
let isFirstQuit = 0;
export default class BaseComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theme:this.props.theme,
        }
    }
    componentWillMount(){
        BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    componentWillUnmount() {
        if (this.baseListener) {
            this.baseListener.remove();
        }
        BackAndroid.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }

    componentDidMount(){
        this.baseListener = DeviceEventEmitter.addListener('ACTION_BASE',
            (action,params) => this.onBaseAction(action,params));
    }

    /**
     * 监听安卓物理返回键事件,页面返回功能正常，
     * 但是退出目前有些问题，只有第一次可以退出App，第二次就会报错
     */
    onBackAndroid() {
        if (isFirstQuit == 0) {
            ToastAndroid.show('连续按两次退出应用！', ToastAndroid.SHORT);
            isFirstQuit = 1;
            this.timer = setTimeout(()=> {
                isFirstQuit = 0;
            }, 2000)
            return true;
        } else if (isFirstQuit == 1) {
            return false;//返回false，表示执行系统默认实现
        }

    };

    /**
     * 通知回调事件处理
     * @param action
     * @param params
     */
    onBaseAction(action,params){
        if(ACTION_HOME.A_THEME===action){
            this.onThemeChange(params)
        }
    }

    /**
     * 当主题改变后更新主题
     * @param theme
     */
    onThemeChange(theme){
        if(!theme)return;
        this.setState({
            theme:theme
        })
    }
}