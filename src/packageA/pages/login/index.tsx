import Taro, { Config } from '@tarojs/taro'
import { connect } from '@tarojs/redux';
import { View, Image, Button } from '@tarojs/components';
import { AtButton, AtModal, AtModalContent  } from 'taro-ui'
import { JdxLogin } from '../../../components'
import globalData from '../../../utils/store';
import appLogo from '../../../assets/images/logo.png'
import loginBackground from '../../../assets/images/780.jpg'
import wechat from '../../../assets/images/wechat.png'
import './index.scss'

interface ILoginProps {
  dispatch: any
}

interface ILoginState {
  loginType?: number
}

@connect(({ loginModel }) => ({
  ...loginModel,
}))
export default class Login extends Taro.Component<ILoginProps, ILoginState> {

  config: Config = {
    navigationBarTitleText: '会员登录',
  }

  handleOtherPhone() {
    this.setState({
      loginType: 1
    })
  }
  async onGetPhoneNumber(event){console.log(event)
    if (event.detail.errMsg !== 'getPhoneNumber:ok') {return}
    try {
      const session = await Taro.checkSession()
    } catch (error) {
      const res = await Taro.login()

      /**
       * 登录过程： 
      1、发起code到 第三方服务器 
      2、第三方服务器发送参数appid+appsecret+code 调用code2session接口
      3、微信服务器  生成openId+session_key 返回给第三方服务器 
      4、第三方服务器根据session_key自定义登录状态 返回自定义状态给客户端
      5、客户端发起业务请求携带自定义登录态
      6、服务器通过自定义登录态查询openId和session_key 返回业务数据
        */
    }
    const { dispatch } = this.props
    dispatch({
      type: 'loginModel/login',
      payload: {
        user: {
          phone: '1111111'
        }
      }
    }).then(() => {
      Taro.navigateBack()
    })
  }
  async onGetUserInfo(event){
    const user = event.detail.userInfo
    const { dispatch } = this.props
    dispatch({
      type: 'loginModel/login',
      payload: {
        user
      }
    }).then(() => {
      Taro.navigateBack()
    })
  }
  render(){
    const { loginType = 0 } = this.state
    const { windowWidth = 375, screenHeight = 667, statusBarHeight =20 } = globalData.systemInfo||{}
    return (
      <View className='login-form' >
        <Image src={loginBackground} className='login-bg' style={{width: `${windowWidth}px`, height: `${screenHeight-statusBarHeight-44}px`}} />
        <Image src={appLogo} className='app-logo' />
        <Button 
          className='phone-btn'
          openType='getPhoneNumber'
          onGetPhoneNumber={this.onGetPhoneNumber.bind(this)}
        >
          手机号一键登录
        </Button>
        
        <Button 
          className='phone-btn-1'
          onClick={this.handleOtherPhone.bind(this)}
        >
          其他手机号登录
        </Button>
        <Button
          className='wechat-btn'
          openType='getUserInfo'
          onGetUserInfo={this.onGetUserInfo.bind(this)}
        >
          <Image className='img' src={wechat} />
        </Button>
        <AtModal isOpened={loginType===1}>
          <AtModalContent>
            <JdxLogin />
          </AtModalContent>
        </AtModal>
      </View>
    );
  }
}