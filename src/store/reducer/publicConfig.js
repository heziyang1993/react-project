import * as actionTypes from '../mutation-types.js'

const initialState = {
  isShowLoading: false
}

export default function publicConfig (state = initialState, action) {
  switch (action.type) {
    case actionTypes.ISSHOWLOADING:
      // 数组和对象要用这种方式
      return Object.assign({}, state, {
        isShowLoading: action.data
      })
    default:
      return state
  }
}
