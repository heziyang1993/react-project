import * as actionTypes from '../mutation-types.js'
export function setUserInfo (data) {
  return {
    type: actionTypes.SET_USERINFO,
    data
  }
}