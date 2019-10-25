import Taro, { Config } from '@tarojs/taro'
import { View,Image,Text } from '@tarojs/components';
import headerImg from '@/assets/images/bpic10773_s.jpg'
import './index.scss'

export default class Target extends Taro.Component {

  config: Config = {
    navigationBarTitleText:'目的地',
  }

  async componentDidMount(){
    const location = await Taro.getLocation({
      type:'gcj02'
    })
    console.log('location',location)
  }

  render(){
    return (
      <View>
        <View className="header">
          <Image className='header-img' src={headerImg} ></Image>
          <View className='city-picker' onClick={()=>{
            Taro.navigateTo({
              url:'/packageA/pages/location/index'
            })
          }} >
            <View className="cn">
              <Text>深圳</Text>
              <View className='at-icon at-icon-chevron-down'></View>
            </View>
            <Text className='en'>SHENZHEN</Text>
          </View>
        </View>
      </View>
    );
  }
}