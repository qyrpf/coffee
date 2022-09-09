# coffee
## 文件介绍
- admin:后台管理系统（前端）

- server：服务端代码（后端）

- web：前台销售系统（前端）

- resource：所需的一些资料:答辩ppt、mongodb数据、参考项目代码(百度云下载链接：https://pan.baidu.com/share/init?surl=TPqjvWjRM4GK7-5hfN2Q7g 提取码：zz4z)

  
## 技术栈
Vue2.0 + Node + MongoDB



## 参考项目
在完成本项目的开发参考了两套教程视频，根据自己毕设老师的意见，进行结合和修改。
这是刚毕业的时候写的，比较菜，可能有些地方写的没那么好。还是推荐大家去看原始的教程视频。
两套教程的源码我放在：\resource\参考项目代码（resource在我分享的百度云链接里下载）
教程视频来源：

- [NodeJs + VueJs (Express + ElementUI) 全栈开发王者荣耀手机端官网](https://www.bilibili.com/video/BV1A4411Y7fi?from=search&amp;seid=65010397618975880&amp;spm_id_from=333.337.0.0)（这套代码写的特别好！！能完整敲一遍，找工作很加分的！！）

- Vue2.0+Node.js+MongoDB全栈打造商城系统-慕课网（该教程在慕课网已经下架了~）

  

## 启动项目
1. node和npm版本号
```shell
PS C:\coffeeReservate> npm -v
6.14.15
PS C:\coffeeReservate> node -v
v14.18.0
PS C:\coffeeReservate>
```
2. 三个文件夹在集成终端打开下载依赖包

```shell
PS C:\coffeeReservate\admin> npm i
PS C:\coffeeReservate\server> npm i
PS C:\coffeeReservate\web> npm i
```
3.连接MongoDB数据库
```shell
PS C:\coffeeReservate> mongod --dbpath <数据库地址>
PS C:\coffeeReservate> mongo
```
需要初始化数据，可连接resource文件夹中的MongoDB文件=>\resource\MongoDB

4.启动server服务
```shell
PS C:\coffeeReservate\server> node index
(node:16072) DeprecationWarning: current Server Discovery and Monitoring engine is deprecated, and will be removed in a future version. To use the new Server Discover and Monitoring engine, pass option { useUnifiedTopology: true } to the MongoClient constructor.
(Use `node --trace-deprecation ...` to show where the warning was created)
http://localhost:3000
MongoDB connected success
```
连接成功啦！

1. 启动前后台页面（admin和web）
```shell
PS C:\coffeeReservate\admin> npm run dev
PS C:\coffeeReservate\web>  npm run dev
```
6. 若数据库引入的是 resource\MongoDB
admin后台系统账号密码为： admin 123456