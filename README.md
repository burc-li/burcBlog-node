# burcBlog-node
本仓库是网站 http://www.burc.com.cn 的后台源码。

首先下载前端源码 [burcBlog-react](https://github.com/burc-li/burcBlog-react)，打包

###  1. 准备工作

`db/sql.sql` 是建表语句，需利用navicat等工具手动创建

`conf/db.js` 是数据库配置，需要修改 MySQL账号密码等信息

### 2. redis

[redis安装教程](https://www.runoob.com/redis/redis-install.html)

打开一个 cmd 窗口 使用 cd 命令切换目录到 Redis 运行：

```
.\redis-server.exe redis.windows.conf
```

这时候另启一个 cmd 窗口，原来的不要关闭，不然就无法访问服务端了

切换到 redis 目录下运行:

```
.\redis-cli.exe -h 127.0.0.1 -p 6379
```

### 3. nginx

[nginx安装教程](https://blog.csdn.net/ZYS10000/article/details/118559788)

配置 `Nginx/conf/nginx.conf` ，设置反向代理 例如监听8080端口

启动 nginx：打开 niginx目录，直接双击 nginx.exe，双击后一个黑色的弹窗一闪而过

### 4. 启动前端服务

打开一个 cmd 窗口，使用 cd 命令切换到 build 的目录运行：

```
http-server -p 8001
```

### 5. 启动node服务

打开一个 cmd 窗口，使用 cd 命令切换到 node 的目录运行：

```
npm run dev
```

浏览器输入即可访问
http://localhost:8080/index

如要详细了解项目是如何工作的，请参考 http://www.burc.com.cn
