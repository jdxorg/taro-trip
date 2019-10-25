import Taro, { Config } from '@tarojs/taro';
import { View, Image, Button } from '@tarojs/components'
import './index.scss'
import bar from '@/assets/images/icons/bar.png'
import boxplot from '@/assets/images/icons/boxplot.png'
import funnel from '@/assets/images/icons/funnel.png'
import gauge from '@/assets/images/icons/gauge.png'
import graph from '@/assets/images/icons/graph.png'
import heatmap from '@/assets/images/icons/heatmap.png'
import k from '@/assets/images/icons/k.png'
import line from '@/assets/images/icons/line.png'
import map from '@/assets/images/icons/map.png'
import parallel from '@/assets/images/icons/parallel.png'
import pie from '@/assets/images/icons/pie.png'
import radar from '@/assets/images/icons/radar.png'
import sankey from '@/assets/images/icons/sankey.png'
import scatter from '@/assets/images/icons/scatter.png'
import sunburst from '@/assets/images/icons/sunburst.png'
import themeRiver from '@/assets/images/icons/themeRiver.png'
import tree from '@/assets/images/icons/tree.png'
import treemap from '@/assets/images/icons/treemap.png'
// import custom from '../../../../assets/images/icons/custom.png'
// import pictorial from '../../../../assets/images/icons/pictorial.png'

class Echarts extends Taro.Component<{}>{

  config: Config = {
    navigationBarTitleText: 'Echarts'
  }
  render(){
    const charts = [
      {
        id: 'bar',
        name: '柱状图',
        img:bar
      }, {
        id: 'scatter',
        name: '散点图',
        img:scatter
      }, {
        id: 'pie',
        name: '饼图',
        img:pie
      }, {
        id: 'line',
        name: '折线图',
        img:line
      }, {
        id: 'funnel',
        name: '漏斗图',
        img:funnel
      }, {
        id: 'gauge',
        name: '仪表盘',
        img:gauge
      }, {
        id: 'k',
        name: 'K 线图',
        img:k
      }, {
        id: 'radar',
        name: '雷达图',
        img:radar
      }, {
        id: 'heatmap',
        name: '热力图',
        img:heatmap
      }, {
        id: 'tree',
        name: '树图',
        img:tree
      }, {
        id: 'treemap',
        name: '矩形树图',
        img:treemap
      }, {
        id: 'sunburst',
        name: '旭日图',
        img:sunburst
      }, {
        id: 'map',
        name: '地图',
        img:map
      }, {
        id: 'graph',
        name: '关系图',
        img:graph
      }, {
        id: 'boxplot',
        name: '箱型图',
        img:boxplot
      }, {
        id: 'parallel',
        name: '平行坐标图',
        img:parallel
      }, {
        id: 'sankey',
        name: '桑基图',
        img:sankey
      }, {
        id: 'themeRiver',
        name: '主题河流图',
        img:themeRiver
      }
    ]
  
    const chartsWithoutImg = [{
      id: 'lazyLoad',
      name: '延迟加载图表'
    }, {
      id: 'multiCharts',
      name: '一个页面中多个图表'
    }, {
      id: 'move',
      name: '页面不阻塞滚动'
    }, {
      id: 'saveCanvas',
      name: '保存 Canvas 到本地文件'
    }]
  
    const open = (chart: any) => {
      Taro.navigateTo({
        url:`/packageA/pages/echarts/chart/index?type=${chart.id}&title=${chart.name}`
      })
    }
    return (
      <View className="panel">
        {
          charts.map((chart: any) => {
            return (
              <View className="chart-with-img">
                <Image src={chart.img} mode="aspectFit" onClick={()=>open(chart)} ></Image>
                {chart.name}
              </View>
            )
          })
        }
        {/* {
          chartsWithoutImg.map((chart: any) => {
            return (
              <View className="chart-without-img">
                <Button onClick={open}>{chart.name}</Button>
              </View>
            )
          })
        } */}
      </View>
    )
  }
}

export default Echarts