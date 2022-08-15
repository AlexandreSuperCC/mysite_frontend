import { createRouter, createWebHistory } from 'vue-router'
import {ElMessageBox} from "element-plus";

const Login = () => import('@/views/login/Login')
const Home = () => import('@/views/index/Home')
const Article = () => import('@/views/index/Article')
const UploadFile = () => import('@/views/index/UploadFile')
const Markdown = () => import('@/views/index/Markdown')
const SearchEngine = () => import('@/views/index/searchEngine/SearchEngine')
const AboutMe = () => import('@/views/index/myinfo/AboutMe')
const MyStory = () => import('@/views/index/myinfo/MyStory')
const ErrorPage = () => import('@/components/common/ErrorPage')
import store from "@/store"

const routes = [
  {
    path:'',
    redirect:'/login'
  },
  {
    path:'/login',
    component:Login
  }
  ,{
    path: '/home',
    component:Home,
    redirect: '/home/article',
    children:[
      {
        path:'article',
        component:Article
      },{
        path: 'uploadFile',
        component:UploadFile
      },{
        path: 'markdown',
        component:Markdown
      },{
        path: 'searchEngine',
        component:SearchEngine
      },
      {
        path:'aboutMe',
        component:AboutMe
      },
      {
        path: 'myStory',
        component:MyStory
      }
    ]
  },
  {
    //实现了自己的解析系统，该系统允许路由排名并启用动态路由
    path: '/:pathMatch(.*)',
    redirect: '/404',
  },
  {
    path: '/404',
    component:ErrorPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

//if you haven't exited but close the page, you can enter the page without login again
router.beforeEach((to,from,next)=>{
  if(to.path==='/login') {
    next();
    return;
  }
  const token = sessionStorage.getItem('token')
  if (token) {
    if(to.path==='/home/uploadFile'||to.path==='/home/markdown'){
      let role = store.getters.userRole
      if(role!==0){
        ElMessageBox.alert("Not authorized","Sorry!",{
          confirmButtonText:'OK'
        })
        return;
      }
    }
    next();
    return;
  }
  if(!token && to.path!='/login'){
    next({path:'/login'})
    return;
  }else{
    next()
  }
})

export default router
