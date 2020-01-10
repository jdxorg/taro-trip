import Taro, { Config } from '@tarojs/taro'
import { WebView } from '@tarojs/components';

export default class Camera extends Taro.Component {

  config: Config = {
    navigationBarTitleText: '旅拍',
  }

  onShareAppMessage = (options: any) => {
    console.log('onShareAppMessage', options)
  }
  
  render(){
    return (
      <WebView 
        src='https://developers.weixin.qq.com/miniprogram/dev/component/web-view.html' 
        onMessage={
          (event: any) => {
            console.log('onMessage', event)
          }
        }
        onLoad={
          (event: any) => {
            console.log('onLoad', event)
          }
        }
        onError={
          (event: any) => {
            console.log('onError', event)
          }
        }
      />
    );
  }
}