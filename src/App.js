import React, { Component } from 'react'
import CustomRouter from '@/router/index.js'
import './assets/iconfont/iconfont.css'
import './App.scss'
import Header from '@/component/pubilc/z-header/z-header'
import Footer from '@/component/pubilc/z-footer/z-footer'
import { Route } from 'react-router-dom'
import initReactFastclick from 'react-fastclick'
import axios from 'axios'
import '~/css/main.scss'
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import createHistory from "history/createBrowserHistory"
// import { applyMiddleware } from "redux"
import { ConnectedRouter } from "react-router-redux"
import '../src/assets/css/z-1px.scss'
import Zloading from '@/component/widget/z-loading/z-loading'
// routerMiddleware

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// 配置请求前处理
axios.interceptors.request.use(config => {
  let Authorization = window.localStorage.getItem('Authorization') || ''
  config.headers.common['X-freshjn-Authorization'] = Authorization
  return config
}, error => {
  return Promise.reject(error)
})

// fastclick
initReactFastclick()

// 创建 Redux 的 store 对象
// const middleware = routerMiddleware(history);
const store = configureStore()
// store.subscribe(() => {
//     let state = store.getState() //这就是你获取到的数据state tree，由于使用了subscribe，当数据更改时会重新获取
// })

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: 1
    }
  }
  componentDidMount () {
    console.log(this.props, '+++')
  }
  render () {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div className="app">
            <Header history={history}/>
              <div className="router-view">
                {
                  CustomRouter.map((route, idx) => {
                    return (<Route path={route.path} component={route.component} exact={route.exact} key={idx} />)
                  })
                }
              </div>  
            <Footer history={history}/>
            <Zloading />
          </div>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
