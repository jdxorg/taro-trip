import Taro, { Config } from '@tarojs/taro'
import { View } from '@tarojs/components';
import { AtSearchBar, AtTabs, AtTabsPane, AtIndexes   } from 'taro-ui'
import './index.scss'
import { cityList } from '../../../assets/data/city'

export default class Location extends Taro.Component<any> {

  config: Config = {
    navigationBarTitleText: '城市列表'
  }

  state = {
    searchValue: '',
    currentTab: 0
  }

  render(){
    const { searchValue, currentTab } = this.state
    return (
      <View>
        <View className='search-bar'>
          <AtSearchBar
            actionName='搜一下'
            showActionButton
            fixed
            value={searchValue}
            onChange={(value: string) => {
              this.setState({
                searchValue: value
              })
            }}
            onActionClick={() => {
              console.log('search')
            }}
          />
        </View>
        <View className='navbar'>
          <AtTabs 
            current={currentTab} 
            tabList={[
              {title: '国内'},
              {title: '海外'}
            ]} 
            onClick={(value: number) => {
              this.setState({
                currentTab: value
              })
            }}
          >
            <AtTabsPane current={currentTab} index={0} >
              <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;' >标签页一的内容</View>
            </AtTabsPane>
            <AtTabsPane current={currentTab} index={1}>
              <View style='padding: 100px 50px;background-color: #FAFBFC;text-align: center;'>标签页二的内容</View>
            </AtTabsPane>
          </AtTabs>
        </View>
        <View className='indexes'>
          <AtIndexes
            animation
            list={cityList}
            onClick={(item: object) => {
              console.log(item)
            }}
          >
            <View>自定义内容</View>
          </AtIndexes>
        </View>
      </View>
    )
  }
}