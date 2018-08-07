import React, { Component } from 'react';
import './z-footer.scss';
import { connect } from 'react-redux'
import routeConfig from '../../../router/index'

class Zfooter extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isShowFooter: true,
      tarBar: [{
        id: 1,
        icon: 'icon-Home',
        name: '首页',
        path: '/'
      }, {
        id: 2,
        icon: 'icon-Market',
        name: '供应商',
        path: '/supplier'
      }, {
        id: 3,
        icon: 'icon-Category',
        name: '分类',
        path: '/category'
      }, {
        id: 4,
        icon: 'icon-Cart',
        name: '购物车',
        path: '/cart'
      }, {
        id: 5,
        icon: 'icon-My',
        name: '我的',
        path: '/profile'
      }]
    }
    this.goUrl = this.goUrl.bind(this)
  }
  goUrl (path) {
    if (path === '/cart' || path === '/profile') {
      let userInfo = window.localStorage.getItem('user-info')
      if (userInfo) {
        this.props.history.push(path)
      } else {
        this.props.history.push('/login')
      }
    } else {
      this.props.history.push(path)
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
      let route = routeConfig.find(route => route.path === this.state.currentRoute)
      let showFooter = true
      if (route && route.meta) {
        showFooter = route.meta.showFooter || false
      }
      this.setState({
        isShowFooter: showFooter
      })
    })
  }
  render() {
    let footer = null
    if (this.state.isShowFooter) {
      footer = <div className='z-footer'>
        {
          this.state.tarBar.map(item => {
            return (
              <div className='z-footer-box' key={item.id} onClick={() => {this.goUrl(item.path)}}>
                <div className='z-footer-icon'>
                  <span className={`iconfont ${item.icon} ${this.state.currentRoute === item.path ? 'active' : ''}`}></span>
                </div>
                <div className={`z-footer-icon-name ${this.state.currentRoute === item.path ? 'active' : ''}`}>{item.name}</div>
              </div>
            )
          })
        }
      </div>
    }
    return (
      <div>
        {footer}
      </div>
    );
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
)(Zfooter)
