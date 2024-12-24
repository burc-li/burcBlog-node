const { exec,escape } = require("../db/mysql");
const xss = require("xss");

const getComment = (blogid) => {
   let sql = `select * from comments where 1=1 `;
   if(blogid)
        sql += `and blogid = '${blogid}' `;
        // 倒序排列
    sql += `order by id desc`;
    return exec(sql);
};


//ES6新语法 commentData如果没有的默认为空对象
const newComment = (commentData={}) => {

    //escape防止sql注入  若使用escape()函数，则sql语句中的值不加单引号
    // username = escape(username);
    // const sql = `
    //     select * from admin where username = ${username} and password  = ${password}
    // `;

    //commentData是一个评论对象，包含commentData content...属性
    const blogid = commentData.blogid;
    let content = xss(commentData.content);
    content = escape(content);
    let fromname = xss(commentData.fromname);
    fromname = escape(fromname);
    const toname = xss(commentData.toname);
    let email = xss(commentData.email);
    email = escape(email);
    const createdate = commentData.createdate;

    const sql_add = `update blogs set commentcount = commentcount+1 where id = '${blogid}'`;
    exec(sql_add);
    
    const sql = `insert into comments(email,content,blogid,fromname,toname,commentdate)
     values(${email},${content},'${blogid}',${fromname},'${toname}','${createdate}')`;
    return exec(sql).then(insertData => {
        // console.log(insertData);
        return {
            id:insertData.insertId
        }
    });
    
    // return{
    //     id:3 //表示新建博客，插入到数据表里面的id
    // }
};


const delComment = (id,blogid) => {

    const sql_sub = `update blogs set commentcount = commentcount-1 where id = '${blogid}'`;
    exec(sql_sub);

    const sql = `delete from comments where id = '${id}'`;
    return exec(sql).then(commentData => {
        if(commentData.affectedRows > 0)
            return true;
        else
            return false;
    });
}



module.exports = {
    getComment,
    newComment,
    delComment
}