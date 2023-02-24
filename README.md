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
//npx patch-package package-name
npm run build
```

### notes
in this application, ycao's id is always 0

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
