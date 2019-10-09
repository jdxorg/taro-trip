import Taro, { Config } from '@tarojs/taro'
import { connect } from '@tarojs/redux'
import { View, Image, Text, Button  } from '@tarojs/components';
import { AtGrid, AtList, AtListItem, AtAvatar, AtIcon } from "taro-ui"
import './index.scss'
import userDefaultLogo from '../../assets/images/user-logo.png'

interface IMineProps {
  user?: any
}

const navs = [
  {
    image:'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
    value:'全部订单'
  },
  {
    image:'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
    value:'待付款'
  },
  {
    image:'https://img10.360buyimg.com/jdphoto/s72x72_jfs/t5872/209/5240187906/2872/8fa98cd/595c3b2aN4155b931.png',
    value:'未出行'
  },
]

@connect(({ app }) => ({
  ...app
}))
export default class Mine extends Taro.Component<IMineProps> {

  config: Config = {
    navigationBarTitleText:'我的',
    navigationBarTextStyle: "white",
    // navigationStyle:'custom'
  }

  actions: Map<number,() => void> = new Map([
    [
      0,
      (): void => {
        this.$preload('key', 'val') //传参
        Taro.navigateTo({
          url:'/packageA/pages/demo/index'
        })
      },
    ],
    [
      1,
      (): void => {
        this.$preload('key', 'val') //传参
        Taro.navigateTo({
          url:'/packageTaroUI/index/index'
        })
      },
    ],
  ])

  //预加载钩子
  componentWillPreload(params) {
    console.log('componentWillPreload',params)
  }

  handleLoginClick(){
    Taro.navigateTo({
      url:'/packageA/pages/login/index'
    })
  }

  handleNavigate(value){
    const action = this.actions.get(value)
    action && action.call(this)
  }

  onCantact(e) {
    console.log(e)
  }
  render(){
    const { user } = this.props
    return (
      <View className='main'>
        <View className='at-row at-row__justify--center top'>
          {
            user ? 
            <View className='at-col logo'>
              <AtAvatar className='user-logo' circle image={user.avatarUrl?user.avatarUrl:userDefaultLogo} />
              <Text className='username'>{user.nickName||user.phone}</Text>
            </View>
          : 
          <View className='at-col login'>
            <View className='title'>登录携程，开启旅程</View>
            <View className='button' onClick={this.handleLoginClick.bind(this)} >登录/注册</View>
          </View>
          }
        </View>
        <View className='nav'>
          <AtGrid 
            columnNum = {navs.length}
            data={navs} 
            hasBorder = {false}
          />
        </View>
        <View className='list'>
          <AtList hasBorder = {false}>
            <AtListItem title='Demo 分包测试' arrow='right' onClick={this.handleNavigate.bind(this,0)} />
            <AtListItem title='Taro UI Demo' arrow='right' onClick={this.handleNavigate.bind(this,1)} />
            <AtListItem title='优惠券' arrow='right' />
            <AtListItem title='我的特权' arrow='right' />
            <AtListItem 
              title='签到'
              arrow='right'
              extraText='签到到深圳'
            />
            <AtListItem
              arrow='right'
              title='我的旅行'
              extraText='查看我的足迹'
            />
            <AtListItem title='我的收藏' arrow='right' hasBorder={false} />
          </AtList>
        </View>
        <Button className='contact-btn' openType='contact' onContact={this.onCantact.bind(this)} >
          <AtIcon value='phone' size='14' color='#19A0F1'></AtIcon>
          联系客服
        </Button>
      </View>
    );
  }
}