import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Actions from '../../../store/actions/index'
import './login.scss'
import { getVerifyCode, codeSignIn } from '@/api'
import { checkPhone } from '@/utils'

class Login extends Component {
  constructor (props) {
    super(props)
    this.state = {
      mobile: '',
      code: '',
      isShowCountDown: false,
      countDown: 60,
      timer: null
    }
    this.getCode = this.getCode.bind(this) 
    this.mobileInput = this.mobileInput.bind(this)
    this.codeInput = this.codeInput.bind(this)
    this.submit = this.submit.bind(this)
  }
  getCode () {
    if (!checkPhone(this.state.mobile).valid) {
      return false
    }
    this.props.action.setLoadingShow(true)
    let params = {
      mobile: this.state.mobile,
      type: 'LOGIN'
    }
    getVerifyCode(params).then(res => {
      this.setState({
        isShowCountDown: true
      }, () => {
        this.startCountDown()
        this.props.action.setLoadingShow(false)
      })
    }).catch(res => {
      this.props.action.setLoadingShow(false)
    })
  }
  // 倒计时60秒
  startCountDown () {
    let seconds = this.state.countDown
    this.timer = setInterval(() => {
      this.setState({
        countDown: seconds--
      })
      if (seconds < 0) {
        clearInterval(this.timer)
        this.setState({
          countDown: 60,
          isShowCountDown: false
        })
      }
    }, 1000)
  }
  // 获取手机号
  mobileInput (e) {
    this.setState({
      mobile: e.target.value
    })
  }
  // 获取验证码
  codeInput (e) {
    this.setState({
      code: e.target.value
    })
  }
  // 登录
  submit () {
    var params = {
      mobile: this.state.mobile,
      verification_code: this.state.code
    }
    codeSignIn(params).then(res => {
      console.log(res, 'res')
      let info = JSON.stringify(res.data)
      window.localStorage.setItem('user-info', info)
      window.localStorage.setItem('Authorization', res.token)
      this.props.history.replace('/')
    })
  }
  componentDidMount () {
    console.log(this.props.action)
    // this.props.action.setUserInfo({
    //   name: 'fam'
    // })
  }
  componentWillUnmount () {
    if (this.timer) {
      clearInterval(this.timer)
    }
    this.setState({
      isShowCountDown: false
    })
  }
  render() {
    let codeButton = null
    if (this.state.isShowCountDown) {
      codeButton = <span className='code-button z-1px-all'>{this.state.countDown}</span>
    } else {
      codeButton = <span className='code-button z-1px-all' onClick={this.getCode}>获取验证码</span>
    }
    return (
      <div className='login'>
        <div className='login-logo'>
          <img src={require('../../../assets/img/new-logo.png')} alt=''/>
        </div>
        <div className='login-input z-1px-b'>
          <input type="tel" maxLength='11' placeholder='请输入号码' value={this.state.mobile} onChange={this.mobileInput}/>
          {codeButton}
        </div>
        <div className='login-input z-1px-b'>
          <input type="tel" maxLength='6' placeholder='请输入验证码' value={this.state.code} onChange={this.codeInput}/>
        </div>
        <div className='login-button' onClick={this.submit}>登录</div>
      </div>
    )
  }
}

// 添加到state
function mapStateToProps(state) {
  return {
    userInfo: {
      name: state.userInfo.name,
      age: state.userInfo.age
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    // setUserInfo: () => { dispatch({type: 'setUserInfo'}) }
    action: bindActionCreators(Actions, dispatch) // this.props.action
    // ...bindActionCreators(Actions, dispatch)   // 直接将方法放到props下面
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
