const { exec } = require("../db/mysql");
const xss = require("xss");

const getTag = () => {
    const sql = `select distinct label from blogs order by id desc`;
    return exec(sql);
};

const getRecent = (currentPage,pageSize) => {
    const start = (currentPage-1) * pageSize;
    const sql = `select id,title,author,commentcount from blogs order by id desc limit ${start}, ${pageSize}`;
    return exec(sql);
};

const getArticleAll = (articletype,keyword) => {
   const key  = xss(keyword);
   let sql = `select count(*) from blogs where 1=1 `;
   if(articletype)
        sql += `and articletype = '${articletype}' `;
    if(key)
        sql += `and title like '%${key}%' `;
    // 倒序排列
    sql += `order by id desc`;
    return exec(sql);
};

const getLine = () => {
    const sql = `select id,title,createdate from blogs  order by id desc`;
    return exec(sql);
};

const getArticle = (articletype,keyword,currentPage,pageSize) => {
   const key = xss(keyword);
   const start = (currentPage-1) * pageSize;
   let sql = `select * from blogs where 1=1 `;
   if(articletype)
        sql += `and articletype = '${articletype}' `;
    if(key)
        sql += `and title like '%${key}%' `;
        // 倒序排列 分页查询
    sql += `order by id desc limit ${start}, ${pageSize}`;
    return exec(sql);
};

const getDetail = (id) => {
    const sql = `select * from blogs where id = '${id}'`;
    return exec(sql).then(rows => {
        return rows[0];
    });
};

//ES6新语法 blogData如果没有的默认为空对象
const newBlog = (blogData={}) => {
    //blogData是一个博客对象，包含title content属性
    const title = blogData.title;
    const author = blogData.author;
    const label = blogData.label;
    const option = blogData.option;
    const content = blogData.content;
    const createdate = blogData.createdate;
    
    const sql = `insert into blogs(title,content,label,author,createdate,commentcount,articletype)
     values('${title}','${content}','${label}','${author}','${createdate}','0','${option}')`;
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


const updateBlog = (blogData={}) => {
    const id = blogData.id;
    const title = blogData.title;
    const author = blogData.author;
    const label = blogData.label;
    const option = blogData.option;
    const content = blogData.content;
    const sql = `update blogs set title = '${title}', author = '${author}', label = '${label}', articletype = '${option}', content = '${content}' where id = '${id}'`;
    return exec(sql).then(updateData => {
        // console.log(updateData);
        if(updateData.affectedRows > 0){
            return true;
        }else{
            return false;
        }
    });
};

const delBlog = (id) => {
    const sql = `delete from blogs where id = '${id}'`;
    return exec(sql).then(deleteData => {
        if(deleteData.affectedRows > 0)
            return true;
        else
            return false;
    });
}



module.exports = {
    getTag,
    getRecent,
    getArticleAll,
    getLine,
    getArticle,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}