/**
 * Created by wificityios on 2017/6/8.
 * Desc:Toast工具类
 */
import React,{Component} from 'react';
import {ToastAndroid} from 'react-native';

export default class ToastUtil{
    static show(hint){
        ToastAndroid.show(hint,ToastAndroid.SHORT);
    }
}