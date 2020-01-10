import Taro, { Config } from '@tarojs/taro'
import { View, Map  } from '@tarojs/components';
import markerIcon from '@/assets/images/icons/pictorialbar.png'
import pieIcon from '@/assets/images/icons/pie.png'

export default class Travel extends Taro.Component {

  config: Config = {
    navigationBarTitleText: '行程',
  }
  constructor(props: any){
    super(props)
    this.onClick.bind(this)
    this.onMarkerTap.bind(this)
    this.onLabelTap.bind(this)
    this.onControlTap.bind(this)
    this.onCalloutTap.bind(this)
    this.onUpdated.bind(this)
    this.onRegionChange.bind(this)
  }
  state = {
    markers: [
      {
        iconPath: markerIcon,
        id: 0,
        latitude: 23.099994,
        longitude: 113.324520,
        width: 50,
        height: 50,
        title: '测试标注点',
        callout: {
          content: '我是标注点气泡content文本',
          color: '#EE2C2C',
          borderColor: '#FFA500',
          bgColor: '#CDCD00',
          display: 'ALWAYS',
          borderRadius: 20,
          borderWidth: 2,
          padding: 5,
          textAlign: 'center'
        },
        label: {
          content: '我是气泡上的label',
          color: '#9A32CD',
          borderColor: '#B3EE3A',
          bgColor: '#8EE5EE',
          borderWidth: 2,
          borderRadius: 20,
          padding: 5,
          textAlign: 'center'
        }
      }
    ],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: '#8A2BE2',
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: pieIcon,
      position: {
        left: 0,
        top: 300 - 50,
        width: 50,
        height: 50
      },
      clickable: true
    }],
    circle: [{
      longitude: 113.327621,
      latitude: 23.099994,
      color: '#006400',
      fillColor: '#CD0000',
      radius: 20,
      strokeWidth: 5
    }]
  }
  onClick(e){
    console.log('onClick', e)
  }
  onMarkerTap(e){
    console.log('onMarkerTap', e)
  }
  onLabelTap(e){
    console.log('onLabelTap', e)
  }
  onControlTap(e){
    console.log('onControlTap', e)
  }
  onCalloutTap(e){
    console.log('onCalloutTap', e)
  }
  onUpdated(e){
    console.log('onUpdated 地图渲染更新完成', e)
  }
  onRegionChange(e){
    console.log('onRegionChange 视野发生变化时触发', e)
  }
  render(){
    const { markers, polyline, controls, circle }: any = this.state
    return (
      <View>
        <Map
          longitude={113.324520}
          latitude={23.099994}
          scale={16} //缩放级别 3-20
          show-location //显示带有方向的当前定位点 默认false
          markers={markers} //标记点
          polyline={polyline} //路线
          controls={controls} //圆
          circles={circle}
          //缩放视野以包含所有给定的坐标点
          //是否开启俯视 默认false
          //是否支持旋转 默认 false
          //是否开启卫星图
          //显示指南针 默认false
          //是否开启实时路况 默认false
          
          onClick={this.onClick}
          onMarkerTap={this.onMarkerTap}
          onControlTap={this.onControlTap}
          onCalloutTap={this.onCalloutTap}
          onUpdated={this.onUpdated}
          onRegionChange={this.onRegionChange}
          style={{width: '100vw', height: '100vh'}}
        ></Map>
      </View>
    );
  }
}