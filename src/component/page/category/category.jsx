import React, { Component } from 'react';

class Category extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  click () {
    this.props.history.push('/')
  }
  componentWillReceiveProps () {
    console.log(this.props)
  }
  render() {
    return (
      <div className='home'>
        分类也
        <span onClick={this.click.bind(this)}>点击</span>
      </div>
    )
  }
}
export default Category
