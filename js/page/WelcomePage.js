/**
 * Created by jianadmin on 2017/5/19.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
} from 'react-native'

import HomePage from './HomePage'
import ThemeDao from '../expand/dao/ThemeDao'
import SplashScreen from 'react-native-splash-screen'
import LoginPage from './LoginPage'
import StorageDao from '../expand/dao/StorageDao'
import DataRepository from '../expand/dao/DataRepository'
//import NetUitl from '../util/NetUitl'

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    tips: {
        fontSize: 29
    }
});
const LOGIN_URL = 'http://192.168.88.254:2060/wifidog/auth?token=123&mod=1&ot=0';
export default class WelcomePage extends Component {
    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository();
        //get请求,以百度为例,没有参数,没有header
        //NetUitl.get('http://192.168.88.254:2060/wifidog/auth?token=123&mod=1&ot=0','',function (set) {
            //下面是请求下来的数据
            //console.log(set)
        //})

    }

    componentDidMount() {
        new ThemeDao().getTheme().then((data)=>{
            this.theme=data;
        });
        new StorageDao().getThemeByKey('login_key').then((data)=>{
            if(data != null){

                // 4小时ping一次
                this.onVerify();
                this.componentUrl = HomePage;
            }else{
                this.componentUrl = LoginPage;
            }
        });
        this.timer=setTimeout(()=> {
            SplashScreen.hide();
            this.props.navigator.resetTo({
                component: this.componentUrl,
                params:{
                    theme:this.theme,
                }
            });
        }, 5000);
    }
    componentWillUnmount(){
        this.timer&&clearTimeout(this.timer);
    }
    onVerify(){
        this.dataRepository.fetchNetRepositry(LOGIN_URL)
            .catch(error=>{})
    }
    render() {
        return null;
    }
}

