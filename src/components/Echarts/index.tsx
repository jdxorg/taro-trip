import Taro, { Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import * as echarts from './ec-canvas/echarts';
import './index.scss'

export enum EchartEnum {

  /**
   * 柱形图
   */
  bar='bar',

  /**
   * 散点图
   */
  scatter='scatter', 

  /**
   * 饼图
   */
  pie='pie',

  /**
   * 折线图
   */
  line='line',

  /**
   * 漏斗图
   */
  funnel='funnel',

  /**
   * 仪表盘
   */ 
  gauge='gauge',

  /**
   * k线图
   */ 
  k='k', 

  /**
   * 雷达图
   */
  radar='radar',

  /**
   * 热力图
   */
  heatmap='heatmap', 

  /**
   * 树图
   */
  tree='tree',

  /**
   * 矩形树图
   */
  treemap='treemap', 

  /**
   * 旭日图
   */
  sunburst='sunburst', 

  /**
   * 地图
   */
  map='map',

  /**
   * 关系图
   */
  graph='graph', 

  /**
   * 箱型图
   */
  boxplot='boxplot', 

  /**
   * 平行坐标图
   */
  parallel='parallel',

  /**
   * 桑基图
   */
  sankey='sankey',

  /**
   * 主题河流图
   */
  themeRiver='themeRiver',
}

export declare type EchartType = 'bar' | 'scatter' | 'pie' | 'line' | 'funnel' | 'gauge' | 'k' | 'radar' | 'heatmap'
| 'tree' | 'treemap' | 'sunburst' | 'map' | 'graph' | 'boxplot' | 'parallel' | 'sankey' | 'themeRiver'

export interface IEchartType {

  /**
   * dom id
   */
  id?:string;

  /**
   * canvas 画布id
   */
  canvasId?:string;

  /**
   * echart 配置项
   */
  options?:object;

  /**
   * 图表类型 如bar(柱状图),pie(饼图),line(折线图等)
   */
  type: EchartType;

  /**
   * 是否懒加载
   */
  lazyLoad?: boolean;

  /**
   * canvas width
   */
  width?:number;

  /**
   * canvas height
   */
  height?:number;

  /**
   * 初始化回调函数，参数为 chart ，可以通过 chart 做事件绑定等操作	
   */
  onInitCallBack?:(chart: any) => Promise<void>,

  /**
   * 画布父容器style
   */
  style?:string;
}

export default class Echart extends Taro.Component<IEchartType>{

  config: Config = {
    usingComponents: {
      'ec-canvas': './ec-canvas/ec-canvas' // 书写第三方组件的相对路径
    }
  }

  constructor(props: any){
    super(props)
    //将组件实例传递给父组件
    props.ref && props.ref(this)
  }

  state = {
    ec: {
      lazyLoad: true
    }
  }

  actions = new Map([
    [EchartEnum.bar, () => require('./options/bar')],
    [EchartEnum.scatter, () => require('./options/scatter')],
    [EchartEnum.line, () => require('./options/line')],
    [EchartEnum.pie, () => require('./options/pie')],
    [EchartEnum.funnel, () => require('./options/funnel')],
    [EchartEnum.gauge, () => require('./options/gauge')],
    [EchartEnum.k, () => require('./options/k')],
    [EchartEnum.radar, () => require('./options/radar')],
    [EchartEnum.heatmap, () => require('./options/heatmap')],
    [EchartEnum.tree, () => require('./options/tree')],
    [EchartEnum.treemap, () => require('./options/treemap')],
    [EchartEnum.sunburst, () => require('./options/sunburst')],
    [EchartEnum.map, () => require('./options/map')],
    [EchartEnum.graph, () => require('./options/graph')],
    [EchartEnum.boxplot, () => require('./options/boxplot')],
    [EchartEnum.parallel, () => require('./options/parallel')],
    [EchartEnum.sankey, () => require('./options/sankey')],
    [EchartEnum.themeRiver, () => require('./options/themeRiver')],
  ])
  //动态引入方式不被支持 会报错
  // async importOption(type:string){
  //   const option = await import(
  //     `./options/${type}.ts`
  //   );
  //   return option
  // }

  initChart({
    canvas,
    width,
    height,
    option,
    type,
    poi,
    onInitCallBack
  }){
    let chart: any = null
    if (process.env.TARO_ENV==='weapp'){
      chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      canvas.setChart(chart);
    }
    else if (process.env.TARO_ENV === 'h5'){
      chart = echarts.init(this.ec.vnode.dom)
    }
    if (type === EchartEnum.map){
      const geoJson = require('./options/mapData')
      poi && echarts.registerMap(poi, geoJson);
    }
    chart && chart.setOption(option);
    onInitCallBack && onInitCallBack(chart)
    return chart;
  }

  echartInit(data, poi=''){
    const {type, options, style, onInitCallBack}: any = this.props
    const action = this.actions.get(type);
    let option: any = action && action.call(this, {});
    option = {...option.default, ...options, ...data}
    this.Canvas = this.$scope.selectComponent(`#mychart-dom-${type}`)
    this.Canvas&&this.Canvas.init((canvas, width, height): any => {
      const chart = this.initChart({
        canvas,
        width: style&&style.width?style.width:width,
        height: style&&style.height?style.height:height,
        option,
        type,
        poi,
        onInitCallBack
      })
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart
    })
  }
  render(){
    let { id, canvasId, type, style=''} = this.props
    id = id||`mychart-dom-${type}`
    canvasId = canvasId||`mychart-${type}`

    /**
     * 不支持render中，使用函数多条件渲染
     * h5不报错，但是编译成小程序时 会报错
     */
    return (
      <View>
        {
          process.env.TARO_ENV === 'weapp' && 
          <View className='container' key={id} style={style}>
            <ec-canvas 
              id={id} 
              canvas-id={canvasId} 
              ec={this.state.ec}
            ></ec-canvas>
          </View>
        }
        {
          process.env.TARO_ENV === 'h5' && 
          <View
            style={`${style || 'height: 200px'}`}
            ref={(ec: any) => {
              this.ec = ec;
            }}
            id={id}
          ></View>
        }
      </View>
    )
  }
}