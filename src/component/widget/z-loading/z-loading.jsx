import React, { Component } from 'react'
import { connect } from 'react-redux'
import './z-loading.scss'

function Loading (props) {
  if (!props.isShow) {
    return null
  }
  return (
    <div className='z-loading'>
      <img src={require('../../../assets/img/loading.gif')} alt=""/>
    </div>
  )
}
class Zloading extends Component {
  // constructor (props) {
  //   super(props)
    
  // }
  componentDidMount () {
    // this.props.action.setUserInfo({
    //   name: 'fam'
    // })
  }
  render() {
    return (
      <Loading isShow={this.props.isShowLoading}/>
    )
  }
}

// 添加到state
function mapStateToProps(state) {
  return {
    isShowLoading: state.publicConfig.isShowLoading
  }
}

export default connect(
  mapStateToProps,
)(Zloading)
