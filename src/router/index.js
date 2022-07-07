import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入父路由
import Layout from '@/views/Layout'

// 路由懒加载
const Home = () => import('@/views/Home')
const Information = () => import('@/views/Information')
const FindHouse = () => import('@/views/FindHouse')
const My = () => import('@/views/My')
const Login = () => import('@/views/Login')
const Register = () => import('@/views/Register')
const Favorate = () => import('@/views/Favorate')
const MyRent = () => import('@/views/MyRent')
const CityList = () => import('@/views/CityList')
const HouseDetails = () => import('@/views/HouseDetails')
const GoRent = () => import('@/views/GoRent')
const RentSearch = () => import('@/views/RentSearch')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: 'home', component: Home },
      { path: 'information', component: Information },
      { path: 'findhouse', component: FindHouse },
      { path: 'my', component: My, name: 'my' }
    ]
  },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/favorate', component: Favorate },
  { path: '/myrent', component: MyRent },
  { path: '/citylist', component: CityList },
  { path: '/houseDetails/:id', component: HouseDetails, name: 'houseDetails', props: true },
  { path: '/gorent', component: GoRent, name: 'gorent' },
  { path: '/rentsearch', component: RentSearch }
]

const router = new VueRouter({
  routes
})

export default router
