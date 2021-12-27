## frontend
### @click-native-prevent 
click事件的native修饰
1. 在封装好的组件上使用，所以要加上.native才能click
2. prevent就相当于..event.preventDefault() 防止提交表单等原生操作

### controller api接口取值为null
![](../../../../screenshot/Screen Shot 2021-10-26 at 11.18.11 PM.png)
链接: https://blog.csdn.net/xiaozhu0301/article/details/113379458?spm=1001.2101.3001.6650.4&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-4.no_search_link&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7Edefault-4.no_search_link

### 拦截不到session
现在options请求可以通过，但是无法获取session里面的数据，而在登录成功时明明把用户数据放进了session里，可取出来时为null，这是因为前后端分离的项目每次请求的sessionid都不同，所以取不出来数据，原因如下：
在前后端分离的项目中，浏览器第一次访问服务器时，在响应头中会包含set-cookie，里面放置着JSESSIONID，浏览器则会将JSESSIONID设置到Cookies中保存。当浏览器再次发送请求到服务器时，会在请求头中携带cookie信息，其内容即为JSESSIONID。当用户访问服务器的时候会为每一个用户开启一个session，JSESSIONID就是被用来判断当前用户对应于哪个session的。
解决sessionid不一致的问题方法
原文链接：https://blog.csdn.net/weixin_45059962/article/details/111104137

### throw后代码执行与否
1. 运行时异常是RuntimeException类及其子类的异常，是非受检异常，如NullPointerException、IndexOutOfBoundsException等。由于这类异常要么是系统异常，无法处理，如网络问题；
要么是程序逻辑错误，如空指针异常；JVM必须停止运行以改正这种错误，所以运行时异常可以不进行处理（捕获或向上抛出，当然也可以处理），而由JVM自行处理。Java Runtime会自动catch到程序throw的RuntimeException，然后停止线程，打印异常。
2. 非运行时异常是RuntimeException以外的异常，类型上都属于Exception类及其子类，是受检异常。非运行时异常必须进行处理（捕获或向上抛出），如果不处理，程序将出现编译错误。一般情况下，API中写了throws的Exception都不是RuntimeException。


### search
```js

      allFiles.filter&&allFiles.filter(
        (data) =>
          !search || data.fname.toLowerCase().includes(search.toLowerCase())
      )
    
```


### important vuex 刷新后没有值
你需要知道JavaScript代码是运行在内存中的，代码运行时的所有变量，函数，也都是保存在内存中的。刷新页面，以前申请的内存被释放，重新加载脚本代码，变量重新赋值，所以这些数据要想储存就必须储存在外部

### force rerender
重新生成dom 元素，每次都执行created() 函数。这时候就用到了vue中的key 属性。
key属性和react 的key属性基本上是一样的（个人理解，如果有错误还请拍砖指正）。
key 属性不是给开发人员用的，而是用来 给vue 元素渲染的时候用的，每次渲染的时候会去拿这个key 值做对比，如果这一次的key 值和上一次的key值是不一样的才会重新渲染dom 元素，否则保持上一次的元素状态。
————————————————
原文链接：https://blog.csdn.net/shi851051279/article/details/92802027

### 组件缓存问题
App.vue 和 Home.vue 都套了router-view, 所以在App.vue里include Home.vue下的子组件死活缓存不了
### 刷新返回原来组件
```js
:default-active="$route.path"//1. 对比于 [important vuex 刷新后没有值] 刷新后还是在的
:router="true"               //2. 需要加上第一句话，否则只是去了路由里的组件，组件按钮不会亮
```
### this.$nextTick()的用法
* 概念
将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。它跟全局方法 Vue.nextTick 一样，不同的是回调的 this 自动绑定到调用它的实例上。类似代码放在setTimeout(fn, 0)中执行。
* 应用场景
在Vue生命周期的created()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中
在created()钩子函数执行的时候DOM 其实并未进行任何渲染，而此时进行DOM操作无异于徒劳，所以此处一定要将DOM操作的js代码放进Vue.nextTick()的回调函数中。与之对应的就是mounted()钩子函数，因为该钩子函数执行时所有的DOM挂载和渲染都已完成，此时在该钩子函数中进行任何DOM操作都不会有问题 。
在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候，这个操作都应该放进Vue.nextTick()的回调函数中。

### vue实现点击一个按钮出现弹框，点击弹框外关闭弹框
https://www.cnblogs.com/kirin1105916774/p/12150261.html
### vue项目引入markdown
https://www.jianshu.com/p/99a11910830f
### tips
#### 只能输入数字
```html
onkeyup="value=value.replace(/[^\d]/g,'')
```
#### 去重
```js
this.allCatFile = temCatFile.filter((cat,index,temCatFile)=>temCatFile.indexOf(cat,0)===index)//过滤掉重复数据
```
#### vue中通过变量名的字符串，来获取变量并使用
如，有一变量isShow，通过this[`${"isShow"}`]可以获取到变量。
例，原：this.isShow = false ，现：this[`${"isShow"}`] = false 。
```js
switch1(param) {undefined
      this[`${param}`] = !this[`${param}`];
}
``` 
## backend 
### swagger
http://localhost:8081/swagger-ui.html
### constructer
写了有参构造函数一定要写无参构造函数！！！
### 实现热部署
https://blog.csdn.net/quan278905570/article/details/116804938
### List<Map> vs List<Object>
获取对象里面比较少的数据的时候用 List<Map>
```java
<!--public List<Map<String,Object>> getMyUser()-->
<select id="getMyUser" resultType="map">
  select * from myuser
</select>
```
![](../../../../screenshot/Screen Shot 2021-12-25 at 1.29.29 PM.png)