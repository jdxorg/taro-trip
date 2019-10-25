import Taro,{Config} from '@tarojs/taro'
import Echart,{EchartType,IEchartType,EchartEnum} from '../../../../components/Echarts'

interface IState {
  type:string;
}

export default class Bar extends Taro.Component<{},IState> {
  config: Config = {
    navigationBarTitleText:'',
  }

  componentWillMount(){
    const {type,title} = this.$router.params
    Taro.setNavigationBarTitle({ title })
    this.setState({ type })
  }

  componentDidMount(){
    const {type} = this.$router.params
    let data: any = null
    switch(type){
      case EchartEnum.bar: 
        data = {
          yAxis: [
            {
              type: 'category',
              axisTick: { show: false },
              data: ['test', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
              axisLine: {
                lineStyle: {
                  color: '#999'
                }
              },
              axisLabel: {
                color: '#666'
              }
            }
          ],
        };
      break;
    }
    this.Chart.echartInit(data,type===EchartEnum.map?'henan':null)
  }

  render(){
    let type: EchartType = this.state.type as EchartType
    return <Echart type={type} ref={(node: any) =>(this.Chart = node)} />
  }
}
