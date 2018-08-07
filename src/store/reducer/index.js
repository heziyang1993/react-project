import { combineReducers } from 'redux'
import userInfo from './userInfo.js'
import publicConfig from './publicConfig'
import { routerReducer } from "react-router-redux"

export default combineReducers({
    userInfo,
    publicConfig,
    router: routerReducer
})