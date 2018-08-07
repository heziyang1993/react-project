import Home from '@/component/page/home/home.jsx'
import Category from '@/component/page/category/category.jsx'
import Profile from '@/component/page/profile/profile.jsx'
import Login from '@/component/page/login/login.jsx'

const CustomRouter = [{
  path: '/',
  component: Home,
  exact: true,
  meta: {
    showHeader: false,
    showFooter: true,
    title: '首页'
  }
}, {
  path: '/category',
  component: Category,
  meta: {
    showHeader: false
  }
}, {
  path: '/profile',
  component: Profile,
  meta: {
    showHeader: false,
    showFooter: false
  }
}, {
  path: '/login',
  component: Login,
  meta: {
    showHeader: true,
    showFooter: false,
    showBack: true,
    title: ''
  }
}]
export default CustomRouter