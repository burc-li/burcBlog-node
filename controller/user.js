const { exec,escape } = require("../db/mysql");
const {genPassword} = require("./crypto");

const login = (username,password) => {

    //escape防止sql注入  若使用escape()函数，则sql语句中的值不加单引号
    username = escape(username);
    //genPassword进行md5密码加密
    password = genPassword(password);
    password = escape(password);
    console.log('username', username)
    console.log('password', password)
    const sql = `
        select * from admin where username = ${username} and password  = ${password}
    `;
    // console.log(sql)
    //返回一个proimise对象，其resolve传递的数据就是rows[0]
    //上面的代码使用then方法，依次指定了两个回调函数。第一个回调函数完成以后，会将返回结果作为参数，传入第二个回调函数。
    return exec(sql).then( rows => {
      console.log('rows', rows)
        return rows[0];
    });
};
module.exports = { login };