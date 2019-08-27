var express = require('express');
var router = express.Router();
const { getTag,getRecent,getArticleAll,getLine,getArticle,getDetail,newBlog,updateBlog,delBlog } = require ('../controller/blog');
const { SuccessModel,ErrorModel} = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck')

/**
 * 0.get请求
 * 1.返回格式自动将JSON转换为字符串  res.end(JSON.stringify(blogData));
 * 2.返回格式自动设置为JSON  res.setHeader('Content-type','application/json');
 */

// 获取文章不重复标签
router.post('/tag', function(req, res, next) {

    const result = getTag();
    return result.then(tagData => {
        //必须用tagData[0]，即tagData中的第一个对象
        if(tagData[0])
            res.json( new SuccessModel(tagData) );
        else
            res.json( new ErrorModel('未找到') );
    }); 
});

// 根据获取最新文章数据
router.post('/recent', function(req, res, next) {
    const currentPage = req.body.currentPage;
    const pageSize = req.body.pageSize;

    const result = getRecent(currentPage,pageSize);
    return result.then(recentData => {
        //必须用recentData[0]，即recentData中的第一个对象
        if(recentData[0])
            res.json( new SuccessModel(recentData) );
        else
            res.json( new ErrorModel('未找到') );
    }); 
});

// 获取文章总数
router.post('/count', function(req, res, next) {
    //req.query系统提供，可获得get请求地址栏中的参数
    const articletype = req.body.articletype;
    const keyword = req.body.keyword;

    const result = getArticleAll(articletype,keyword);
    return result.then(articleData => {
        //必须用articleData[0]，即articleData中的第一个对象
        if(articleData[0])
            res.json( new SuccessModel(articleData[0]['count(*)']) );
        else
            res.json( new ErrorModel('未找到') );
    }); 
});

// 获取文章目录[id、title、createdate]
router.post('/line', function(req, res, next) {

    const result = getLine();
    return result.then(lineData => {
        //必须用articleData[0]，即articleData中的第一个对象
        if(lineData[0])
            res.json( new SuccessModel(lineData) );
        else
            res.json( new ErrorModel('未找到') );
    }); 
});

// 根据页码、文章类型获取数据
router.post('/article', function(req, res, next) {
    //req.query系统提供，可获得get请求地址栏中的参数
    const articletype = req.body.articletype;
    const keyword = req.body.keyword;
    const currentPage = req.body.currentPage;
    const pageSize = req.body.pageSize;

    const result = getArticle(articletype,keyword,currentPage,pageSize);
    return result.then(articleData => {
        //必须用listData[0]，即listData中的第一个对象
        if(articleData[0])
            res.json( new SuccessModel(articleData) );
        else
            res.json( new ErrorModel('未找到') );
    }); 
});

// 获取文章详情
router.get('/detail', function(req, res, next) {
    const result = getDetail(req.query.id)
    return result.then(data => {
        if(data)
            res.json( new SuccessModel(data) );   
        else
            res.json( new ErrorModel('未找到') );
    })
});

// 新建文章
router.post('/new', loginCheck, (req, res, next) => {
// router.post('/new', (req, res, next) => {
    const result = newBlog(req.body)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
})

// 更新文章
router.post('/update', loginCheck, (req, res, next) => {
// router.post('/update', (req, res, next) => {
    const result = updateBlog(req.body)
    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel()
            )
        } else {
            res.json(
                new ErrorModel('更新博客失败')
            )
        }
    })
})

// 删除文章
router.post('/delete', loginCheck, (req, res, next) => {
// router.post('/delete',  (req, res, next) => {
    const result = delBlog(req.body.id)
    return result.then(val => {
        if (val) {
            res.json(
                new SuccessModel()
            )
        } else {
            res.json(
                new ErrorModel('删除博客失败')
            )
        }
    })
})


module.exports = router;
