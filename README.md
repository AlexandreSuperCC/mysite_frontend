# Personal Website ⚡️ 

> http://www.cklovery.life

## Installation & Deployment 📦

### Project setup

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
//npx patch-package package-name
npm run build
```

### notes

1. in this application, ycao's id is always 0
2. after the version 1/3/2023 userId is deprecated because it is useless in my website app

### tomcat

1. add index.html as error page

2. in server.xml

   ```xml
   <Connector port="80" protocol="HTTP/1.1"
              connectionTimeout="20000"
              redirectPort="8443" 
              relaxedPathChars="[]|"
              relaxedQueryChars="[]|{}"/>
   ```

## Sections 📚

✔️ Home\
✔️ About Me\
✔️ My Story\
✔️ My Project\
\
✔️ Admin Login\
✔️ Dashboard\
<img src="http://assets.cklovery.life/2023/04/13154655-dashboard.png"  width="500" height="300">\
\
✔️ Markdown Editor\
<img src="http://assets.cklovery.life/2023/04/13154652-markdown.png"  width="500" height="300">\
\
✔️ Upload File\
<img src="http://assets.cklovery.life/2023/04/13154637-upload.png"  width="500" height="300">\
\
✔️ My Notepad\
<img src="http://assets.cklovery.life/2023/04/13154678-notepad.png"  width="500" height="300">
