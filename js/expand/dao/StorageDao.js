/**
 * Created by jianadmin on 2017/5/19.
 */

'use strict';

import {
    AsyncStorage,
} from 'react-native';

import ThemeFactory,{ThemeFlags} from '../../../res/styles/ThemeFactory'

export default class StorageDao{

    /**
     * 根据key获取值
     * @param {Promise}
     * */
    getThemeByKey(key){
        return new Promise((resolve,reject)=>{
            AsyncStorage.getItem(key,(error,result)=>{
                if(error){
                    reject(error);
                    return;
                }
                resolve(result)
            })
        })
    }
    /**
     * 根据key值保存值
     * */
    static saveByKey(key,values){
        AsyncStorage.setItem(key,values,(error=>{}))
    }
}

