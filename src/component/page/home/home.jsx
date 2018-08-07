import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Actions from '../../../store/actions/index'
import './home.scss'
import Zselect from '../../widget/z-select/z-select'
// import { CSSTransition } from 'react-transition-group';
class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentCity: '广州',
      isSearchFocus: false
    }
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.chooseCity = this.chooseCity.bind(this)
  }
  chooseCity () {
    
  }
  handleFocus () {
    this.setState({
      isSearchFocus: true
    })
  }
  handleBlur () {
    this.setState({
      isSearchFocus: false
    })
  }
  componentDidMount () {
    this.props.action.setUserInfo({
      name: 'fam'
    })
  }
  click () {
    this.props.history.push('/category')
  }
  render() {
    let homeContent = null
    if (this.state.isSearchFocus) {
      homeContent = (
        // <CSSTransition classNames='col-fade' timeout={500} in={this.state.isSearchFocus} unmountOnExit>
          <div className='home-search-page'>
            <p></p>
          </div>
        // </CSSTransition>
      )
    } else {
      homeContent = <Zselect />
    }
    return (
      <div className='home'>
      {
        !this.state.isSearchFocus ? (
          <header className='home-header'>
            <div className='home-city' onClick={this.chooseCity}>
              {this.state.currentCity}
            </div>
            <div className='home-search'>
              <input type="text" onFocus={this.handleFocus} onBlur={this.handleBlur}/>
            </div>
            <div className='home-scan'></div>
          </header>
        ) : ''
      }
        <div className='home-content'>
          {homeContent}
        </div>
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
)(Home)
