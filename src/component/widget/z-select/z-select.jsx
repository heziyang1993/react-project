import React, { Component } from 'react'
import { connect } from 'react-redux'
import './z-select.scss'

class Zselect extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [[{
        value: 1,
        type: 'one',
        id: 1
      }, {
        value: 2,
        type: 'one',
        id: 2
      }], [{
        value: 1,
        type: 'two',
        id: 3
      }, {
        value: 2,
        type: 'two',
        id: 4
      }]],
      selectedData: [],
      totalData: 0
    }
    this.selectUnit = this.selectUnit.bind(this)
    this.selectAll = this.selectAll.bind(this)
    this.selectBlock = this.selectBlock.bind(this)
  }
  selectAll () {
    let allData = [...this.state.data]
    let selectData = [...this.state.selectedData]
    allData = [].concat.apply([], allData)
    let length = allData.length
    this.setState({
      totalData: length
    })
    if (selectData.length !== length) {
      this.setState({
        selectedData: allData,
      })
    } else {
      this.setState({
        selectedData: []
      })
    }
  }
  selectBlock (item) {
    let arr = [...this.state.selectedData]
    let temp = []
    item.forEach(block => {
      // 找是否有已经选择的选项
      let selected = arr.find(select => select.id === block.id)
      if (!selected) {
        arr.push(block)
      }
      temp.push(selected)
    })
    // 不存在undefined说明已经是全选状态
    // 在已选择的数组，找到temp的内容，进行去重
    if (temp.indexOf(undefined) < 0) {
      for (let i = 0; i < temp.length; i++) {
        for (let j = 0; j < arr.length; j++) {
          if (temp[i].id === arr[j].id) {
            arr.splice(j, 1)
          }
        }
      }
    }
    this.setState({
      selectedData: arr
    }, () => {
      console.log(this.state.selectedData)
    })
  }
  selectUnit (ele, currentBlock) {
    let arr = [...this.state.selectedData]
    let item, idx = null
    this.state.selectedData.forEach((selected, objId) => {
      if (selected.id === ele.id) {
        item = selected
        idx = objId
        return
      }
    })
    if (!item) {
      arr.push(ele)
    } else {
      arr.splice(idx, 1)
    }
    this.setState({
      selectedData: arr
    })
  }
  componentDidMount () {
    // this.props.action.setUserInfo({
    //   name: 'fam'
    // })
  }
  render() {
    return (
      <div className='z-select'>
        <span onClick={this.selectAll} className={this.state.selectedData.length !== 0 && ((this.state.selectedData.length) === +this.state.totalData) ? 'active' : ''}>all</span>
        {
          this.state.data.map((item, id) => {
            let temp = []
            item.forEach(block => {
              // 找是否有已经选择的选项
              let selected = this.state.selectedData.find(select => select.id === block.id)
              temp.push(selected)
            })
            let items = item.map((ele, idx) => {
              return (
                <span key={idx} className={this.state.selectedData.find(selected => selected && selected.id === ele.id) ? 'active' : ''} onClick={(e) => {this.selectUnit(ele, id, e)}}>{ele.value}</span>
              )
            })
            return (
              <div key={id}>
                <span onClick={(e) => {this.selectBlock(item, e)}} className={temp.indexOf(undefined) < 0 ? 'active' : ''}>选择</span>
                {items}
              </div>
              
            )
          })
        }
      </div>
    )
  }
}

// 添加到state
function mapStateToProps(state) {
  return {
    
  }
}

export default connect(
  mapStateToProps,
)(Zselect)
