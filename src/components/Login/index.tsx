import Taro, { Config } from '@tarojs/taro'
import { View, Image } from '@tarojs/components';
import { AtForm, AtInput, AtButton  } from 'taro-ui'

interface ILoginState {
  username?: string,
  code?: string
}
export default class LoginForm extends Taro.Component<{}, ILoginState> {

  state = {
    username: '',
    code: ''
  }

  onSubmit(event) {
    console.log('onSubmit', this.state)
  }

  usernameOnChange(value) {
    this.setState({
      username: value
    })
  }
  codeOnChange(value) {
    this.setState({
      code: value
    })
  }
  render(){
    const { username, code } = this.state
    return (
      <View className='login-form' >
        <AtForm onSubmit={this.onSubmit.bind(this)} reportSubmit >
          <AtInput 
            name='username'
            placeholder='请输入手机号' 
            type='phone'
            value={username}
            onChange={this.usernameOnChange.bind(this)}
            clear
          />
          <AtInput 
            name='code'
            placeholder='请输入验证码'
            maxLength={4}
            value={code}
            onChange={this.codeOnChange.bind(this)}
            clear
          >
            <AtButton>获取动态码</AtButton>
          </AtInput>
          <AtButton formType='submit' >登录</AtButton>
        </AtForm>
      </View>
    );
  }
}