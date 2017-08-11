import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity
} from 'react-native';
export default class Test extends Component {
    constructor(props){
        super(props);
        this.state={
            data:0
        }
        this._index=0;
        this._timer=null;
    }
    countTime(){
        this._timer=setInterval(()=>{this.setState({data:this._index--}); if(this.state.data<=0){
            this._timer && clearInterval(this._timer);
            alert("时间到了");
        }},1000);
    }
    stopTime(){
        this._timer && clearInterval(this._timer);
    }
    componentWillUnmount() {
        this._timer && clearInterval(this._timer);
    }
    render() {
        return (
            <View style={styles.container}>
                <Text>请选择时长(s)</Text>
                <TextInput onChangeText={(txt)=>{this.setState({data:txt});this._index=txt;}}>

                </TextInput>
                <View style={styles.showTime}>
                    <Text style={styles.timeText}>
                        {this.state.data}
                    </Text>
                </View>
                <View style={styles.btngroup}>
                    <TouchableOpacity style={styles.btn} onPress={this.countTime.bind(this)

                    }>
                        <Text>开始</Text>

                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={this.stopTime.bind(this)}>
                        <Text>暂停</Text>

                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
    },
    btngroup:{
        flexDirection:'row',

        justifyContent:'space-around'
    },
    showTime:{
        height:100,
        alignItems:'center'
    },
    btn:{
        justifyContent:'center',
        width:60,
        height:40,
        backgroundColor:'#7ecfe8',
        alignItems:'center'

    },
    timeText:{
        color:'red',
        fontSize:22,
    }

})



AppRegistry.registerComponent('Test', () => Test);