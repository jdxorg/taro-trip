import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import './index.scss'

/**
 * index.state 参数类型
 *
 * @export
 * @interface IndexState
 */
export interface IndexState {
  month: number
  day: number
}

/**
 * index.props 参数类型
 *
 * @export
 * @interface IndexProps
 */
export interface IndexProps {
  dispatch?: any,
  data?: Array<DataInterface>,
}

export interface DataInterface {
  day: number
  des: string
  lunar: string
  month: number
  pic: string
  title: string
  year: number
  _id: string
}

@connect(({ demo }) => ({
  ...demo
}))
export default class Demo extends Component<IndexProps, IndexState> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: 'Demo'
  }

  state = {
    month: 0,
    day: 0
  }

  // 获取今日数据
  async getData(month: number, day: number) {
    const { dispatch } = this.props
    await dispatch({
      type: 'demo/getLists',
      payload: {
        month: month,
        day: day
      }
    })
  }


  // 获取系统当前时间并请求参数
  getDate() {
    const myDate = new Date()
    const m = myDate.getMonth() + 1
    const d = myDate.getDate()
    this.setState({
      month: m,
      day: d
    })
    this.getData(m, d)
  }


  componentWillMount () { 
    // console.log('componentWillMount',this.$router)
    this.getDate()
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    const { month, day } = this.state
    const { data } = this.props
    return (
      <View className='fx-index-wrap'>
        <View className='index-topbar'>
          <Text>{`${month}月${day}日`}</Text>
          <View>历史上的今天都发生了这些大事</View>
        </View>
        <View className='index-list'>
          {
            data && data.map((item, index) => {
              return <View className='index-li' key={index}>
                <View className='index-bg' style={`background-image: url(${item.pic})`}></View>
                <View className='index-info'>
                  <View className='index-title'>{item.title}</View>
                  <View className='index-des'>{item.des}</View>
                </View>
              </View>
            })
          }
        </View>
      </View>
    )
  }
}
