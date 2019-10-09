import Taro from '@tarojs/taro'
import { AtCountdown } from 'taro-ui'
import { View } from '@tarojs/components'

const Countdown: Taro.FC<any> = props => {
  
  return (
    <View>
      <AtCountdown
        isCard
        isShowDay
        format={{ hours: ':', minutes: ':', seconds: '' }}
        day={2}
        hours={1}
        minutes={1}
        seconds={10}
      />
    </View>
  )
}

export default Countdown

