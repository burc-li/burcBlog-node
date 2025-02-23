const env = process.env.NODE_ENV // 环境参数

// 配置
let MYSQL_CONF
let REDIS_CONF

if (env === 'dev') {
  // mysql
  MYSQL_CONF = {
    host: '127.0.0.1',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'blog',
  }

  // redis
  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1',
  }
}

if (env === 'production') {
  // mysql
  MYSQL_CONF = {
    host: '192.168.1.11',
    user: 'root',
    password: '123456',
    port: '3306',
    database: 'blog',
  }

  // redis
  REDIS_CONF = {
    host: '192.168.1.11',
    port: 6379,
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF,
}
