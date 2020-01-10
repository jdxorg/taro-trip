import Taro, {Config, useState} from '@tarojs/taro'
import { View, RichText } from '@tarojs/components'

const RichTextPage: Taro.FC<any> = props => {
  
  const [nodes]: any = useState([{
    name: 'div',
    attrs: {
      class: 'div_class',
      style: 'line-height: 60px; color: red;'
    },
    children: [{
      type: 'text',
      text: 'Hello World!'
    }]
  }])
  return (
    <View>
      <RichText nodes={nodes} />
      <editor></editor>
    </View>
  )
}
RichTextPage.config = {
  navigationBarTitleText: 'RichText'
}
export default RichTextPage

