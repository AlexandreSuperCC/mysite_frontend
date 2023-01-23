import { createRouter, createWebHistory } from 'vue-router'
import {ElMessageBox} from "element-plus";

const Index = () => import('@/views/Index')
const Login = () => import('@/views/login/Login')
const Home = () => import('@/views/index/Home')
const Article = () => import('@/views/index/Article')
const UploadFile = () => import('@/views/index/UploadFile')
const Markdown = () => import('@/views/index/Markdown')
const SearchEngine = () => import('@/views/index/searchEngine/SearchEngine')
const AboutMe = () => import('@/views/index/myinfo/AboutMe')
const MyStory = () => import('@/views/index/myinfo/MyStory')
const MyProject = () => import('@/views/index/myCreation/MyProject')
const ErrorPage = () => import('@/components/common/ErrorPage')
import store from "@/store"

const routes = [
  {
    path:'',
    redirect:'/home/index'
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
        path:'index',
        component:Index
      },
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
      },
      {
        path: 'myProject',
        component:MyProject
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
  const adminPages = store.getters.constants[adminPages]
  if(to.path.indexOf(adminPages)===-1) {
    next();
    return;
  }else{
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
    }else{
      next({path:'/login'})
      return;
    }
  }
})

export default router
