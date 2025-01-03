const mysql = require('mysql');
const { MYSQL_CONF } = require("../conf/db");


// //创建连接对象
const conn = mysql.createPool(MYSQL_CONF);

//开始连接
// conn.connect();

//统一执行 SQL 的函数
function exec(sql, params = []) {
  return new Promise((resolve, reject) => {
      conn.query(sql, params, (err, result) => {
          if (err) {
              reject(err);
              return;
          }
          resolve(result);
      });
  });
}
//escape是mysql原生提供的函数
module.exports = { 
    exec,
    escape:mysql.escape };

