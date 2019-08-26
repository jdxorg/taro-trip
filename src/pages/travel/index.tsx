import Taro, { Config } from '@tarojs/taro'
import { View } from '@tarojs/components';

export default class Travel extends Taro.Component {

  config: Config = {
    navigationBarTitleText:'行程',
  }

  render(){
    return (
      <View>行程</View>
    );
  }
}