import * as actionTypes from '../mutation-types.js'

const initialState = {
  name: 'yang',
  age: 18
}

export default function userInfo (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_USERINFO:
      // 数组和对象要用这种方式
      return Object.assign({}, state, {
        // userInfo: action.data,
        ...action.data
      })
    default:
      return state
  }
}