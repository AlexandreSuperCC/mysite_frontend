# mysiteclient

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
//使用依赖patch-package：在package.json里加上"postinstall": "patch-package"执行n-i会自动为依赖包打补丁
npx patch-package package-name
npm run build
```

### bug
1. 第一次登录页面没有反应
2. md文件展示页面分类栏溢出的时候是向下扩展的不是横向扩展
### to be optimized
1. 在TimeLine.vue里drawer里的上海大学和fff的图片都是固定的

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

#### using mouse-click stars effect on Login.vue
* 资源地址：C:\Users\ycao\Desktop\document\web\learning\frontend\js\js星星点击特效\jquery-mouse-star-animation\js\mouseStarsOld.js
* 来自于：https://www.imooc.com/article/31174