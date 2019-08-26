import Taro, { Config } from '@tarojs/taro'
import { View } from '@tarojs/components';

export default class Camera extends Taro.Component {

  config: Config = {
    navigationBarTitleText:'旅拍',
  }

  render(){
    return (
      <View>旅拍</View>
    );
  }
}