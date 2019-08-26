import Taro from '@tarojs/taro'
import { View, Image, Swiper, SwiperItem  } from '@tarojs/components'
import './index.scss'


interface IBannerProps {
  banners: object[],
  className?: string
}

export default class Banner extends Taro.Component<IBannerProps> {

  constructor(props){
    super(props)
  }
  render(){
    const { banners = [] } = this.props
    return(
      <View className='banner' >
        <Swiper
          className='swiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          circular
          indicatorDots
          autoplay>
            {
              banners.map((p: any,_)=>{
                return (
                  <SwiperItem key={_.toString()} >
                    <View className='swiper-item'>
                      <Image className="img"  src={p.image} />
                    </View>
                  </SwiperItem>
                )
              })
            }
        </Swiper>
      </View>
    );
  }
}
