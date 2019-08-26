import Taro, { Config } from '@tarojs/taro'
import { View } from '@tarojs/components';

export default class Target extends Taro.Component {

  config: Config = {
    navigationBarTitleText:'目的地',
  }

  render(){
    return (
      <View>目的地</View>
    );
  }
}