import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Actions from '../../../store/actions/index'

class Profile extends Component {
  // constructor (props) {
  //   super(props)
    
  // }
  componentDidMount () {
    this.props.action.setUserInfo({
      name: 'fam'
    })
  }
  render() {
    return (
      <div className='profile'>
        {this.props.userInfo.name}
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
)(Profile)
