const { exec } = require("../db/mysql");
const xss = require("xss");

const getTag = () => {
    const sql = `SELECT label
                FROM (
                    SELECT label, ROW_NUMBER() OVER (PARTITION BY label ORDER BY id DESC) AS row_num
                    FROM blogs
                ) sub
                WHERE row_num = 1`;
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
    const params = [
      blogData.title,
      blogData.abstract,
      blogData.content,
      blogData.label,
      blogData.author,
      blogData.createdate,
      0, // 默认评论数为 0
      blogData.option
  ];
    
    const sql = `insert into blogs(title,abstract,content,label,author,createdate,commentcount,articletype)
     values(?, ?, ?, ?, ?, ?, ?, ?)`;
     console.log('params', )
    return exec(sql, params).then(insertData => {
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
    const params = [
      blogData.title || '',
      blogData.author || '',
      blogData.label || '',
      blogData.option || '',
      blogData.abstract || '',
      blogData.content || '',
      blogData.id
  ];
    const sql = `UPDATE blogs 
                 SET title = ?, author = ?, label = ?, articletype = ?, abstract = ?, content = ? 
                 WHERE id = ?`;
    return exec(sql, params).then(updateData => {
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