# burcBlog-node
本仓库是网站 http://www.burc.com.cn 的后台源码。

```
#首先下载burcBlog-react
#按照步骤打包build

#db/sql.sql建库文件

#修改conf/db.js 改成自己的数据库信息

#安装redis

#打开一个 cmd 窗口 使用 cd 命令切换目录到 Redis 运行：
redis-server.exe redis.windows.conf

#这时候另启一个 cmd 窗口，原来的不要关闭，不然就无法访问服务端了。
#切换到 redis 目录下运行:
redis-cli.exe -h 127.0.0.1 -p 6379

安装nginx

#配置nginx.conf 设置反向代理 例如监听8080端口

#启动
#打开niginx目录，直接双击nginx.exe，双击后一个黑色的弹窗一闪而过

#打开一个 cmd 窗口 使用 cd 命令切换到build 的目录运行：
http-server -p 8001

#打开一个 cmd 窗口 使用 cd 命令切换到node 的目录运行：
npm run dev

#浏览器输入：
http://localhost:8080/index
```
要详细了解项目是如何工作的，请参考 http://www.burc.com.cn
