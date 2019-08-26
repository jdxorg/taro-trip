import Taro, { Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux'
import { AtGrid, AtSearchBar } from "taro-ui"
import {JdxBanner} from '../../components/index'; 
import './index.scss'

interface IIndexProps {
  dispatch?: any,
  data?: IDataType
}

interface IDataType {
  navbars: any[],
  banners: any[]
}

interface IIndexState {
  keywords: string
}
const mainNavs = [
  {
    image:'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
    value:'酒店'
  },
  {
    image:'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
    value:'机票'
  },
  {
    image:'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
    value:'火车票·抢票'
  },
  {
    image:'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
    value:'民宿'
  },
  {
    image:'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
    value:'汽车票·船票'
  },
  {
    image:'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
    value:'专车·租车'
  },
  {
    image:'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
    value:'交通·酒店'
  },
  {
    image:'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
    value:'旅游'
  },
  {
    image:'https://img20.360buyimg.com/jdphoto/s72x72_jfs/t15151/308/1012305375/2300/536ee6ef/5a411466N040a074b.png',
    value:'高铁游'
  },
]
const subMenus = [
  {
    image:'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
    value:'自由行',
  },
  {
    image:'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
    value:'自由行',
  },
  {
    image:'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
    value:'自由行',
  },
  {
    image:'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
    value:'自由行',
  },
  {
    image:'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
    value:'自由行',
  },
  {
    image:'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
    value:'自由行',
  },
  {
    image:'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
    value:'自由行',
  },
  {
    image:'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
    value:'自由行',
  },
  {
    image:'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
    value:'自由行',
  },
  {
    image:'https://img12.360buyimg.com/jdphoto/s72x72_jfs/t6160/14/2008729947/2754/7d512a86/595c3aeeNa89ddf71.png',
    value:'自由行',
  },
]
@connect(({ index,app }) => ({
  ...index,
  ...app
}))
export default class Index extends Taro.Component<IIndexProps,IIndexState> {

  config: Config = {
    navigationBarTitleText: '首页',
    navigationBarBackgroundColor:'#fff',
    navigationBarTextStyle:'black'
  }

  state = {
    keywords:'',
  }

  componentWillMount () { 
    this.init()
  }

  init() {
    const {dispatch}  = this.props
    dispatch({
      type: 'index/getHome'
    })
  }
  
  onChange() {}
  render(){
    const { data } = this.props
    const { banners,navbars } = data as IDataType
    const { keywords } = this.state
    const navs = navbars?navbars.map((p: any,_)=>{
      return {image:p.image,value:p.name}
    }):[]
    return(
      <View>
        <View className='search' >
          <AtSearchBar
            value={keywords}
            onChange={this.onChange.bind(this)}
          />
        </View>
        
        <JdxBanner {...{banners}}  />

        <View className='nav-1'> 
          <AtGrid 
            columnNum = {navs.length}
            data={navs} 
            hasBorder = {false}
          />
        </View>

        <View className='nav-2'>
          <AtGrid 
            columnNum = {3}
            data={mainNavs} 
          />
        </View>

        <View className='nav-3'>
          <AtGrid 
            columnNum = {5}
            data={subMenus} 
            hasBorder = {false} 
          />
        </View>
      </View>
    );
  }
}

