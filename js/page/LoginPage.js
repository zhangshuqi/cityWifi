/**
 * Created by jianadmin on 2017/5/19.
 */

import React, {Component} from 'react';
import {
    WebView,
    View,
    TouchableOpacity,
    Image,
    Text,
    TextInput,
    StyleSheet,
    AppRegistry,
    Navigator
} from 'react-native';

import NavigationBar from '../common/NavigationBar'
import CustomThemePage from './my/CustomTheme'
import BaseComponent from './BaseComponent'
import GlobalStyles from '../../res/styles/GlobalStyles'
import DataRepository from '../expand/dao/DataRepository'
import ToastUtil from '../util/ToastUtil'
import HomePage from './HomePage'
import ThemeDao from '../expand/dao/ThemeDao'
import StorageDao from '../expand/dao/StorageDao'

const URL = 'http://wifi.hktfi.com/ws/user/verifyLogin.do?phone=';
const VERIFY_URL = 'http://wifi.hktfi.com/ws/user/verifyPhone.do?phone=';
const VERIFY = '&verify=';
const LOGIN_URL = 'http://192.168.88.254:2060/wifidog/auth?token=123&mod=1&ot=0';

export default class LoginPage extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            theme: this.props.theme,
            customThemeViewVisible: false,
            url: "http://app.hktfi.com",
            title: '',
            canBack: false,
            liked: true,
            count: '获取验证码',
        };
        this.dataRepository = new DataRepository();
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
            onClose={() => this.setState({customThemeViewVisible: false})}
        />)
    }

    componentDidMount() {
        new ThemeDao().getTheme().then((data) => {
            this.theme = data;
        });
    }

    onLogin() {
        let url = this.genUrl(this.text, this.verify);
        this.dataRepository.fetchNetRepositry(url)
            .then(result => {
                if (!JSON.parse(result.jsonStr).success) {
                    ToastUtil.show(result.jsonStr.msg);
                    return;
                }
                if (JSON.parse(result.jsonStr).success) {
                    this.onVerify();
                    this.addLoginState();
                    this.props.navigator.resetTo({
                        component: HomePage,
                        params: {
                            theme: this.theme,
                        }
                    });
                   // ToastUtil.show(result.jsonStr.msg);
                }
            })
            .catch(error => {
                this.setState({
                    result: JSON.stringify(error)
                })
            })
    }

    onVerify() {
        this.dataRepository.fetchNetRepositry(LOGIN_URL)
            .catch(error => {
            })
    }

    addLoginState() {
        StorageDao.saveByKey('login_key', this.text);
        StorageDao.saveByKey(this.text, this.verify);
    }

    genUrl(key, verify) {
        return URL + key + VERIFY + verify;
    }

    genVerifyUrl(key) {
        return VERIFY_URL + key;
    }

    getVerify() {
        if (!(/^1\d{10}$/.test(this.text))) {
            ToastUtil.show("请填写正确的手机号码");
            return false;
        }
        if (this.state.liked) {
            this.countTime();
            let url = this.genVerifyUrl(this.text);
            this.dataRepository.fetchNetRepositry(url)
                .then(result => {
                    //ToastUtil.show(result);
                    if (!JSON.parse(result.jsonStr).success) {
                         ToastUtil.show(result.jsonStr.msg);
                        this.interval && clearInterval(this.interval);
                        this.setState({
                            liked: true,
                            count: '重新获取',
                        });
                    }
                })
                .catch(error => {
                    ToastUtil.show(error.toString());
                })
        }
    }

    countTime() {
        var number = 60;
        this.interval = setInterval(() => {
            this.setState({
                count: number-- + 's后重新获取',
                liked: false
            });
            if (number <= 0) {
                this.interval && clearInterval(this.interval);
                this.setState({
                    liked: true,
                    count: '重新获取',
                });
            }
        }, 1000);
    }

    render() {
        const navigationBar =
            <NavigationBar
                // style={this.state.theme.styles.navBar}
                title='登录连接'
            />;

        return (
            <View style={GlobalStyles.root_container}>
                {navigationBar}
                <View
                    style={loginStyle.loginView}
                >
                    <TextInput
                        style={loginStyle.loginInput}
                        placeholder={'手机号'}
                        placeholderTextColor={'#b2b2b2'}
                        keyboardType={'numeric'}
                        underlineColorAndroid="transparent"
                        onChangeText={text => this.text = text}
                    ></TextInput>
                </View>
                <View
                    style={loginStyle.loginView}
                >
                    <TextInput
                        underlineColorAndroid="transparent"
                        placeholder={'验证码'}
                        placeholderTextColor={'#b2b2b2'}
                        keyboardType={'numeric'}
                        style={loginStyle.input_password}
                        onChangeText={text => this.verify = text}
                    ></TextInput>
                    <Text
                        style={loginStyle.loginVerify}
                        onPress={() => {
                            this.getVerify()
                        }}
                    >{this.state.count}</Text>
                </View>
                <View style={loginStyle.loginView1}>
                    <Text
                        style={loginStyle.loginText}
                        onPress={() => {
                            this.onLogin()
                        }}
                    >登录</Text>
                </View>
                {this.renderCustomThemeView()}
            </View>
        );
    }
}

const loginStyle = StyleSheet.create({
    loginView: {
        flexDirection: 'row',
        borderBottomColor: '#E9E9E9',
        alignItems: 'center',
        borderBottomWidth: 0.5,
    },
    loginView1: {
        marginTop: 30,
        borderRadius: 5,
        borderWidth: 0,
        height: 38,
        backgroundColor: '#2196F3',
        marginHorizontal: 14,
        justifyContent: 'center',
        borderBottomColor: '#2196F3',
    },
    loginInput: {
        flex: 1,
        fontSize: 14,
        paddingVertical: 8,
        paddingLeft: 10,
    },
    input_password: {
        flexGrow: 4,
        fontSize: 14,
        paddingVertical: 8,
        paddingLeft: 10,
    },
    loginVerify: {
        fontSize: 14,
        marginRight: 10,
        textAlign: 'center',
        flexGrow: 1,
    },
    loginText: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        flex: 1,
        paddingTop: 5,
    }
});
AppRegistry.registerComponent('LoginPage', () => LoginPage);
