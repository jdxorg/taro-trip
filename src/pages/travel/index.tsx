import Taro, { Config } from '@tarojs/taro'
import { View,Video,Button,Input,Image } from '@tarojs/components';
import hongbao from '../../assets/images/hongbao.jpg'
import globalData from '../../utils/store';

let videoContext = null
export default class Travel extends Taro.Component {

  config: Config = {
    navigationBarTitleText:'行程',
  }

  state={
    src:'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
    inputValue:'',
    danmuList:[
      {
        text: '第 1s 出现的弹幕',
        color: '#ff0000',
        time: 1
      },
      {
        text: '第 3s 出现的弹幕',
        color: '#ff00ff',
        time: 3
    }],
    animationData:[]
  }

  componentDidMount(){
    videoContext = Taro.createVideoContext('myVideo')
    var animation = Taro.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    this.animation = animation
    console.log('Travel componentDidMount',globalData.systemInfo)
  }
  getRandomColor () {
    let rgb = []
    for (let i = 0 ; i < 3; ++i){
      let color = Math.floor(Math.random() * 256).toString(16)
      color = color.length == 1 ? '0' + color : color
      rgb.push(color)
    }
    return '#' + rgb.join('')
  }

  sendDanMu(){
    console.log('danmu',this.state.inputValue)
    if(videoContext){
      videoContext.sendDanmu({
        text:this.state.inputValue,
        color:this.getRandomColor()
      })
    }
  }

  chooseVideo(){
    Taro.chooseVideo({
      sourceType:['album','camera'],
      maxDuration:120,
      camera:['front','back'],
      success:(res: any)=>{
        this.setState({
          src:res.tempFilePath
        })
      }
    })
  }

  onInput(e){
    this.setState({
      inputValue:e.detail.value
    })
  }

  onFullscreenChange(event){
    console.log('onFullscreenChange',event)
  }

  onHongBaoClick(){
    console.log('onHongBaoClick')
    this.animation.opacity(0).step()
    this.setState({
      animationData:this.animation.export()
    })
  }
  onShowHongBao(){
    const screenWidth = globalData.systemInfo?globalData.systemInfo.screenWidth:375
    this.animation.translateX((screenWidth+90)/2).rotate(360).step({ duration:1000 })
    this.setState({
      animationData:this.animation.export()
    })
  }
  render(){
    const screenWidth = globalData.systemInfo?globalData.systemInfo.screenWidth:375
    return (
      <View>
        <Video 
          id="myVideo"
          src={this.state.src}
          enable-danmu 
          danmu-btn
          controls
          autoplay
          show-mute-btn={true}
          enable-play-gesture
          danmu-list={this.state.danmuList}
          style={{width:'100%'}}
          onFullscreenChange={this.onFullscreenChange.bind(this)}
         ></Video>
         <Input onInput={this.onInput.bind(this)} focus={true} placeholder="弹幕内容" />
         <Button onClick={this.sendDanMu.bind(this)}>发送弹幕</Button>
         <Button onClick={this.chooseVideo.bind(this)}>选择视频</Button>
         <Button onClick={this.onShowHongBao.bind(this)}>视频红包</Button>
         <Image 
            src={hongbao} 
            mode="scaleToFill" 
            onClick={this.onHongBaoClick.bind(this)}
            style={{
              width:'90px',
              height:'90px',
              position:'absolute',
              top:'70px',
              left:`${-screenWidth-90}px`,
              right:0,
              margin:'0 auto',
            }} 
            animation={this.state.animationData}
          >
         </Image>
      </View>
    );
  }
}