
import Taro, { Component, Config } from '@tarojs/taro'
import '@tarojs/async-await'
import { Provider } from '@tarojs/redux'
import './services'
import './utils/taro'
import dva from './utils/dva'
import models from './models/index'
import globalData, { setGlobalData } from './utils/store'

import Index from './pages/index'
import './app.scss'

const dvaApp = dva.createApp({
  initialState: {},
  models: models
})

const store = dvaApp.getStore()

const backgroundAudioManager = Taro.getBackgroundAudioManager()
// 如果需要在 h5 环境中开启 React Devtools
// 取消以下注释：
// if (process.env.NODE_ENV !== 'production' && process.env.TARO_ENV === 'h5')  {
//   require('nerv-devtools')
// }

class App extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    pages: [
      'pages/index/index',
      'pages/target/index',
      'pages/camera/index',
      'pages/travel/index',
      'pages/mine/index',
    ],
    subPackages:[
      {
        root:'packageA',
        pages:[
          'pages/demo/index',
          'pages/login/index',
        ]
      }
    ],
    preloadRule:{
      'pages/index/index':{
        'network':'all',
        'packages':['packageA']
      }
    },
    tabBar:{
      color:'#bfbfbf',
      selectedColor:'#1296db',
      list: [
        {
          pagePath: "pages/index/index",
          text: "首页",
          iconPath: "assets/images/home.png",
          selectedIconPath: "assets/images/home-select.png"
        },
        {
          pagePath: "pages/target/index",
          text: "目的地",
          iconPath: "assets/images/target.png",
          selectedIconPath: "assets/images/target-select.png"
        },
        {
          pagePath: "pages/camera/index",
          text: "旅拍",
          iconPath: "assets/images/camera.png",
          selectedIconPath: "assets/images/camera-select.png"
        },
        {
          pagePath: "pages/travel/index",
          text: "行程",
          iconPath: "assets/images/travel.png",
          selectedIconPath: "assets/images/travel-select.png"
        },
        {
          pagePath: "pages/mine/index",
          text: "我的",
          iconPath: "assets/images/mine.png",
          selectedIconPath: "assets/images/mine-select.png"
        }
      ]
    },
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#19A0F1',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'white',
      enablePullDownRefresh: true
    }
  }

  async componentDidMount () {
    setGlobalData('backgroundAudioManager', backgroundAudioManager)

    // 获取参数
    const referrerInfo = this.$router.params.referrerInfo as any;
    const query = this.$router.params.query as any;
    !globalData.extraData && (globalData.extraData = {});
    if (referrerInfo && referrerInfo.extraData) {
      globalData.extraData = referrerInfo.extraData;
    }
    if (query) {
      globalData.extraData = {
        ...globalData.extraData,
        ...query
      };
    }

    // 获取设备信息
    const sys = await Taro.getSystemInfo();
    sys && (globalData.systemInfo = sys);
    console.log('sys',sys)
    // 获取网络信息
    const net = await Taro.getNetworkType()
    store.dispatch({
      type: 'app/updateState',
      payload: {
        isConnected: net.networkType != 'none',
        networkType: net.networkType
      }
    })

    Taro.onNetworkStatusChange((res) => {
      store.dispatch({
        type: 'app/updateState',
        payload: {
          ...res
        }
      })
    })
  }

  componentDidShow () {}

  componentDidHide () {}

  /**
   * 在微信/百度/字节跳动/支付宝小程序中这一生命周期方法对应 onError，H5/RN 中尚未实现
    程序发生脚本错误或 API 调用报错时触发，微信小程序中也可以使用 Taro.onError 绑定监听
   */
  componentDidCatchError (error) {

    console.log('componentDidCatchError',error)
  }

  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <Index />
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
