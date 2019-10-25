import Taro, { Config } from '@tarojs/taro'
import { AtList,AtListItem } from 'taro-ui'

export default class TaroUiIndex extends Taro.Component<any> {

  config: Config = {
    navigationBarTitleText:'TaroUI Demo'
  }

  render(){
    return (
      <AtList>
        <AtListItem title='Fab 浮动按钮' arrow='right' onClick={()=> Taro.navigateTo({url:'/packageTaroUI/Fab/index'})} />
        <AtListItem title='Article 文章样式' arrow='right' onClick={()=> Taro.navigateTo({url:'/packageTaroUI/Article/index'})} />
        <AtListItem title='Countdown 倒计时' arrow='right' onClick={()=> Taro.navigateTo({url:'/packageTaroUI/Countdown/index'})} />
        <AtListItem title='Form 表单' arrow='right' onClick={()=> Taro.navigateTo({url:'/packageTaroUI/Form/index'})} />
        <AtListItem title='RichText 富文本' arrow='right' onClick={()=> Taro.navigateTo({url:'/packageTaroUI/RichText/index'})} />
      </AtList>
    )
  }
}