import { createRouter, createWebHistory } from 'vue-router'

const Login = () => import('@/views/login/Login')
const Home = () => import('@/views/index/Home')
const Article = () => import('@/views/index/Article')
const UploadFile = () => import('@/views/index/UploadFile')
const Markdown = () => import('@/views/index/Markdown')
const SearchEngine = () => import('@/views/index/searchEngine/SearchEngine')
const AboutMe = () => import('@/views/index/myinfo/AboutMe')

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
      }
    ]
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
    next();
    return;
  }
  if(!token && to.path!='/login'){
    next({path:'/login'})
  }else{
    next()
  }
})

export default router
