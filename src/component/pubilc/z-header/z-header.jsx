import React, { Component } from 'react';
import './z-header.scss';
import { connect } from 'react-redux'
import routeConfig from '../../../router/index'

class Zheader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentRoute: '',
      currentTitle: '',
      isShowHeader: true,
      isShowBack: false
    }
  }
  componentWillMount () {
    this.getType()
  }
  componentWillReceiveProps () {
    this.getType()
  }
  getType () {
    this.setState({
      currentRoute: this.props.history.location.pathname
    }, () => {
      let showHeader = true
      let title = null
      let showBack = true
      let route = routeConfig.find(route => route.path === this.state.currentRoute)
      if (route && route.meta) {
        showHeader = route.meta.showHeader || false
      }
      if (route && route.meta) {
        title = route.meta.title || ''
      }
      if (route && route.meta) {
        showBack = route.meta.showBack || false
      }
      this.setState({
        isShowHeader: showHeader,
        currentTitle: title,
        isShowBack: showBack
      })
    })
  }
  goBack () {
    this.props.history.go(-1)
  }
  render () {
    let headers = null
    if (this.state.isShowHeader) {
      let left = null
      let right = null
      if (this.props.children) {
        left = this.props.children.find(dom => dom.props.slot === 'left')
        right = this.props.children.find(dom => dom.props.slot === 'right')
      } else {
        if (this.state.isShowBack) {
          left = <span className='iconfont icon-arrowleft' onClick={this.goBack.bind(this)}></span>
        }
      }
      headers = <div className='z-header'>
                  <div className='z-header-left'>{left}</div>
                  <div className='z-header-main'>{this.state.currentTitle}</div>
                  <div className='z-header-right'>{right}</div>
                </div>
    } else {
      headers = ''
    }
    return (
      <div>
        {headers}
      </div>
    )
  }
}

// 添加到state
function mapStateToProps(state) {
  return {
    publicConfig: {
      showHeader: state.publicConfig.showHeader,
    }
  }
}

export default connect(
  mapStateToProps
)(Zheader)
