var express = require('express');
var router = express.Router();
const { getComment,newComment,delComment } = require ('../controller/comment');
const { SuccessModel,ErrorModel} = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck')

/**
 * 0.get请求
 * 1.返回格式自动将JSON转换为字符串  res.end(JSON.stringify(blogData));
 * 2.返回格式自动设置为JSON  res.setHeader('Content-type','application/json');
 */
router.post('/list', function(req, res, next) {
    //req.query系统提供，可获得get请求地址栏中的参数
    const blogid = req.body.blogid;

    const result = getComment(blogid);
    return result.then(commentData => {
        //必须用commentData[0]，即commentData中的第一个对象
        if(commentData[0])
            res.json( new SuccessModel(commentData) );
        else
            res.json( new ErrorModel('未找到') );
    }); 
});


router.post('/new', (req, res, next) => {
// router.post('/new', (req, res, next) => {
    const result = newComment(req.body)
    return result.then(data => {
        res.json(
            new SuccessModel(data)
        )
    })
})



router.post('/delete', loginCheck, (req, res, next) => {
// router.post('/delete',  (req, res, next) => {
    const result = delComment(req.body.id,req.body.blogid)
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
