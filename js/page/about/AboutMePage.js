/**
 * Created by jianadmin on 2017/5/19.
 */
/**
 * AboutPage
 * 关于
 * @flow
 */
'use strict';

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Linking,
    Clipboard
} from 'react-native';

import WebViewPage from '../../page/WebViewPage'
import Toast, {DURATION} from 'react-native-easy-toast'
import GlobalStyles from '../../../res/styles/GlobalStyles'
import ViewUtils from '../../util/ViewUtils'
import AboutCommon from './AboutCommon'
import config from '../../../res/data/config.json'

const FLAG = {
    BLOG: {
        name: '官方网站',
        items: {
            PERSONAL_BLOG: {
                title: '公司网站',
                url: 'http://m.hktchn.com',
            },
        }
    },
    CONTACT: {
        name: '联系方式',
        items: {
            QQ: {
                title: '电话',
                account: '0731-85229780',
            },
            Email: {
                title: 'Email',
                account: 'sales@hktchn.com',
            },
        }
    },
    QQ: {
        name: '业务交流',
        items: {
            MD: {
                title: '移动应用定制',
                account: '0731-85229780',
            },
            RN: {
                title: '无线城市接入',
                account: '0731-85229780',
            }
        },
    },
};
export default class AboutMePage extends Component {
    constructor(props) {
        super(props);
        this.aboutCommon = new AboutCommon(props, (dic)=>this.updateState(dic), config);
        this.state = {
            projectModels: [],
            author: config.author,
            showRepository: false,
            showBlog: false,
            showQQ: false,
            showContact: false
        }
    }

    updateState(dic) {
        this.setState(dic);
    }

    /**
     * 获取item右侧图标
     * @param isShow
     */
    getClickIcon(isShow) {
        return isShow ? require('../../../res/images/ic_tiaozhuan_up.png') : require('../../../res/images/ic_tiaozhuan_down.png');
    }

    onClick(tab) {
        let TargetComponent, params = {...this.props, menuType: tab};
        switch (tab) {
            case FLAG.BLOG.items.CSDN:
            case FLAG.BLOG.items.PERSONAL_BLOG:
                TargetComponent = WebViewPage;
                params.title=tab.title;
                var url=tab.url;
                params.url=url;
                break;
            case FLAG.CONTACT.items.Email:
                var url='mailto://'+tab.account;
                Linking.canOpenURL(url).then(supported => {
                    if (!supported) {
                        console.log('Can\'t handle url: ' + url);
                    } else {
                        return Linking.openURL(url);
                    }
                }).catch(err => console.error('An error occurred', err));
                break;

            case FLAG.BLOG:
                this.updateState({showBlog: !this.state.showBlog});
                break;
            case FLAG.QQ:
                this.updateState({showQQ: !this.state.showQQ});
                break;
            case FLAG.CONTACT:
                this.updateState({showContact: !this.state.showContact});
                break;
            case FLAG.CONTACT.items.QQ:
                Clipboard.setString(tab.account);
                this.toast.show('电话:' + tab.account + '已复制到剪切板。');
                break;
            case FLAG.QQ.items.MD:
            case FLAG.QQ.items.RN:
                Clipboard.setString(tab.account);
                this.toast.show('电话:' + tab.account + '已复制到剪切板。');
                break;
        }
        if (TargetComponent) {
            this.props.navigator.push({
                component: TargetComponent,
                params: params,
            });
        }
    }

    /**
     * 显示列表数据
     * @param dic
     * @param isShowAccount
     */
    renderItems(dic, isShowAccount) {
        if (!dic)return null;
        let views = [];
        for (let i in dic) {
            let title = isShowAccount ? dic[i].title + ':' + dic[i].account : dic[i].title;
            views.push(
                <View key={i}>
                    {ViewUtils.getSettingItem(()=>this.onClick(dic[i]), '', title,this.props.theme.styles.tabBarSelectedIcon)}
                    <View style={GlobalStyles.line}/>
                </View>
            )
        }
        return views;
    }

    render() {
        let content = <View>
            {ViewUtils.getSettingItem(()=>this.onClick(FLAG.BLOG), require('../../../res/images/ic_computer.png'), FLAG.BLOG.name, this.props.theme.styles.tabBarSelectedIcon,
                this.getClickIcon(this.state.showBlog))}
            <View style={GlobalStyles.line}/>
            {this.state.showBlog ? this.renderItems(FLAG.BLOG.items) : null}

           {ViewUtils.getSettingItem(()=>this.onClick(FLAG.QQ), require('../../../res/images/ic_share.png'), FLAG.QQ.name, this.props.theme.styles.tabBarSelectedIcon,
                this.getClickIcon(this.state.showQQ))}
            <View style={GlobalStyles.line}/>
            {this.state.showQQ ? this.renderItems(FLAG.QQ.items, true) : null}

            {ViewUtils.getSettingItem(()=>this.onClick(FLAG.CONTACT), require('../../../res/images/ic_contacts.png'), FLAG.CONTACT.name, this.props.theme.styles.tabBarSelectedIcon,
                this.getClickIcon(this.state.showContact))}
            <View style={GlobalStyles.line}/>
            {this.state.showContact ? this.renderItems(FLAG.CONTACT.items, true) : null}
        </View>;
        return (
            <View style={styles.container}>
                {this.aboutCommon.render(content, this.state.author)}
                <Toast ref={e=>this.toast = e}/>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

