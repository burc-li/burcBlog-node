const crypto = require("crypto");

//密匙
const SECRET_key = "123456@#";

//md5加密
function md5(content){
    let md5 = crypto.createHash('md5');
    return md5.update(content).digest('hex');
}

//加密函数
function genPassword(password){
    const str = `password=${password}&key=${SECRET_key}`;
    return md5(str);
}

//打印加密之后的密码
// console.log(genPassword('123'));

module.exports = {genPassword};