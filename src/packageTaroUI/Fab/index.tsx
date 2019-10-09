import Taro from '@tarojs/taro'
import { AtFab } from 'taro-ui'
import { View,Text } from '@tarojs/components'
import './index.scss'

const Fab: Taro.FC<any> = props => {
  
  return (
    <View style={{position:'fixed',margin:'20px'}}>
      <AtFab 
        size='small'
      >
        <Text className='at-fab__icon at-icon at-icon-add'></Text>
      </AtFab>
    </View>
  )
}

export default Fab

