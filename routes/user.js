var express = require('express');
var router = express.Router();
const { login } = require("../controller/user");
const { SuccessModel, ErrorModel } = require("../model/resModel");


router.post('/login', function(req, res, next) {
    const { username,password } = req.body; 
    // const { username,password } = req.query;
    const result = login(username,password);
    // console.log(result);
    //返回一个promise对象，其resolve传递的对象就是 new SuccessModel()或new ErrorModel('登录失败')
    return result.then(data => {
        if(data){
            //设置session
            req.session.username = data.username;
            // 自动同步到 redis，下一句不需要
            // set(req.sessionId,req.session);
            res.json(
                new SuccessModel('登录成功')
            ) 
            return; 
        }
        res.json(
             new ErrorModel('登录失败')
        )
    });
});

router.post('/islogin', function(req, res, next) {
    console.log(req.session)
    // 自动同步到 redis，下一句不需要
    // set(req.sessionId,req.session);
    if(req.session.username){
        res.json(
            new SuccessModel('已登录')
        ) 
        return; 
    }
    res.json(
            new ErrorModel('未登录')
    )
});

router.post('/logout', function(req, res, next) {
    //注销清空session
    req.session.username = '';
    console.log(req.session)
    // 自动同步到 redis，下一句不需要
    // set(req.sessionId,req.session);
    if(!req.session.username){
        res.json(
            new SuccessModel('注销成功')
        ) 
        return; 
    }
    res.json(
            new ErrorModel('注销失败')
    )
});
// router.get('/login-test', (req, res, next) => {
//     if (req.session.username) {
//         res.json({
//             errno: 0,
//             msg: '已登录'
//         })
//         return
//     }
//     res.json({
//         errno: -1,
//         msg: '未登录'
//     })
// })

// router.get('/session-test',(req,res,next) => {
//     const session = req.session;
//     if(session.count == null){
//         session.count = 0;
//     }
//     session.count++;
//     res.json({
//         "sessionCount":session.count
//     })
//     // res.json({
//     //     "sessionCount":"session.count"
//     // })
// });
module.exports = router;
