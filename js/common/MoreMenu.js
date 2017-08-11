/**
 * Created by jianadmin on 2017/5/19.
 */
/**
 * 更多菜单
 * @flow
 */
'use strict';
import React, {Component, PropTypes} from 'react';

import {
    TouchableOpacity,
    Text,
    View,
} from 'react-native'

import AboutMePage from '../page/about/AboutMePage'

export const MORE_MENU = {
    Custom_Theme: '自定义主题',
    About_Author: '关于作者',
};

export default class MoreMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            buttonRect: {},
        }
    }

    static propTypes = {
        contentStyle: View.propTypes.style,
        menus: PropTypes.array.isRequired,
        anchorView: PropTypes.func,
    };

    /**
     * 打开更多菜单
     */
    open() {
        this.showPopover();
    }

    showPopover() {
        if (!this.props.anchorView)return;
        let anchorView = this.props.anchorView();
        anchorView.measure((ox, oy, width, height, px, py) => {
            this.setState({
                isVisible: true,
                buttonRect: {x: px, y: py, width: width, height: height}
            });
        });
    }

    closePopover() {
        this.setState({isVisible: false});
    }

    onMoreMenuSelect(tab) {
        this.closePopover();
        if(typeof(this.props.onMoreMenuSelect)=='function')this.props.onMoreMenuSelect(tab);
        let TargetComponent, params = {...this.props, menuType: tab};
        switch (tab) {

            case MORE_MENU.Custom_Theme:

                break;
            case MORE_MENU.About_Author:
                TargetComponent = AboutMePage;
                break;
        }

        if (TargetComponent) {
            this.props.navigator.push({
                component: TargetComponent,
                params: params,
            });
        }

    }

    renderMoreView() {
        let view = <Popover
            isVisible={this.state.isVisible}
            fromRect={this.state.buttonRect}
            placement="bottom"
            contentMarginRight={20}
            onClose={()=>this.closePopover()}
            contentStyle={{opacity: 0.82, backgroundColor: '#343434'}}
            style={{backgroundColor: 'red'}}>
            <View style={{alignItems: 'center'}}>
                {this.props.menus.map((result, i, arr) => {
                    return <TouchableOpacity key={i} onPress={()=>this.onMoreMenuSelect(arr[i])}
                                             underlayColor='transparent'>
                        <Text
                            style={{fontSize: 18, color: 'white', padding: 8, fontWeight: '400'}}>
                            {arr[i]}
                        </Text>
                    </TouchableOpacity>
                })
                }
            </View>
        </Popover>;
        return view;
    }

    render() {
        return this.renderMoreView();
    }
}
