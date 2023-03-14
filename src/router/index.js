import { createRouter, createWebHistory } from 'vue-router'

const Index = () => import('@/views/Index')
const Login = () => import('@/views/login/Login')
const Home = () => import('@/views/index/Home')
const Member = () => import('@/views/index/Member')
const Article = () => import('@/views/index/Article')
const UploadFile = () => import('@/views/index/UploadFile')
const Markdown = () => import('@/views/index/Markdown')
const IdMarkdown = () => import('@/views/index/ViewMd/IdMarkdown')
const SearchEngine = () => import('@/views/index/searchEngine/SearchEngine')
const AboutMe = () => import('@/views/index/myinfo/AboutMe')
const MyStory = () => import('@/views/index/myinfo/MyStory')
const MyProject = () => import('@/views/index/myCreation/MyProject')
const Dashboard = () => import('@/views/index/Dashboard')
const Notepad = () => import('@/components/notepad/Notepad')
const ErrorPage = () => import('@/components/common/ErrorPage')
import store from "@/store"
import { loginRequiredMethodsCheck } from '../utils/utils';

const routes = [
  {
    path:'',
    redirect:'/home/index'
  },
  {
    path:'/login',
    meta: {
      title: 'Login'
    },
    component:Login
  },
  {
    path: '/member',
    component:Member,
    redirect: '/member/dashboard',
    children:[
      {
        path: 'dashboard',
        meta: {
          title: 'Dashboard'
        },
        component:Dashboard
      },
      {
        path: 'notepad',
        meta: {
          title: 'Notepad'
        },
        component:Notepad
      },
      {
        path: 'uploadFile',
        meta: {
          title: 'Upload File'
        },
        component:UploadFile
      },{
        path: 'markdown',
        meta: {
          title: 'Markdown'
        },
        component:Markdown
      },{
        path: 'markdown/:mid',
        meta: {
          title: 'Markdown'
        },
        component:IdMarkdown
      },{
        path: 'searchEngine',
        component:SearchEngine
      },
    ]
  }
  ,{
    path: '/home',
    component:Home,
    redirect: '/home/article',
    children:[
      {
        path:'index',
        meta: {
          title: 'Welcome'
        },
        component:Index
      },
      {
        path:'article',
        meta: {
          title: 'Article'
        },
        component:Article
      },
      {
        path:'aboutMe',
        meta: {
          title: 'Me'
        },
        component:AboutMe
      },
      {
        path: 'myStory',
        meta: {
          title: 'Bienvenue'
        },
        component:MyStory
      },
      {
        path: 'myProject',
        meta: {
          title: 'My Project'
        },
        component:MyProject
      },
    ]
  },
  {
    //实现了自己的解析系统，该系统允许路由排名并启用动态路由
    path: '/:pathMatch(.*)',
    redirect: '/404',
  },
  {
    path: '/404',
    meta: {
      title: 'Oops!'
    },
    component:ErrorPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

let curTimeOut;

//if you haven't exited but close the page, you can enter the page without login again
router.beforeEach((to,from,next)=>{

  curTimeOut&&clearTimeout(curTimeOut)
  
  if(to.path==='/home/index'){
    let documentTitle = 'Welcome to cklovery.life!' +  " ";

    (function titleMarquee() {
      document.title = documentTitle = documentTitle.substring(1) + documentTitle.substring(0,1);
      curTimeOut = setTimeout(titleMarquee, 300);
    })();
  }else if(store.getters.constants.myStatus){
    const prefix='Cklovery: ';
    const pl = prefix.length;
    let documentTitle = prefix+' '+store.getters.constants.myStatus+  " ";
  
    (function titleMarquee() {
      documentTitle = 'Cklovery: ' + documentTitle.substring(pl+1) + documentTitle.substring(pl,pl+1);
      document.title = documentTitle;
      curTimeOut = setTimeout(titleMarquee, 300);
    })();
  }else{
    document.title = 'Cklovery: '+`${to.meta.title}`||"Bienvenue";
  }

  const adminPages = store.getters.constants.adminPages
  if(adminPages.indexOf(to.path)===-1&&!to.path.startsWith('/member')) {
    next();
    return;
  }else{
    if (loginRequiredMethodsCheck()) {
      const redirect= JSON.stringify({
        'url':to.path,
      })
      next({path:'/login',query:{redirect}})
      return;
    }else{
      next()
      return;
    }
  }
})

export default router
