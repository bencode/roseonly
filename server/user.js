/**
 * Created by yupeiying on 6/23/17.
 */
const qs = require('querystring');
const pool = require('./pool');


// //前后端端口不一样，跨域获取文件，对后端响应头作设置
// const setCors = function(req,res){
//   // 获取请求头url,并解析
//   const parsed = parseUrl(req.header('referer') || '');
//   if (parsed.host) {
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
//     res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,HEAD');
//     res.header('Access-Control-Allow-Origin', `${parsed.protocol}//${parsed.host}`);
//   }
// };
module.exports ={
  login: (req,res)=>{
    //console.log(req.body.pwd);
    var acct = req.body.account;
    var pwd = req.body.pwd;
    var ctry = req.body.country;
    //req.on('data',(buf)=>{
     // var obj = qs.parse(buf.toString());
      //console.log(obj);
      pool.getConnection((err,conn)=>{
        conn.query('SELECT * FROM user Where country=? AND account=? AND password=?',[ctry,acct,pwd],(err,result)=>{
          //console.log(result)
          if(result.length>=1){
            var output = {
              code: 1,
              msg: "登录成功",
              uid: result[0].uid,
              uname:result[0].username,
            }
          }else {
            var output = {
              code: 2,
              msg: "登录失败，请重新登录",
            }
          }
          res.json(output);
          conn.release();
        })
      })
    //})
  },
  register: (req,res)=>{
    console.log(req.body);
    var acct = req.body.account;
    var pwd = req.body.pwd;
    var ctry = req.body.country;

    pool.getConnection((err,conn)=>{
      "use strict";
      conn.query('INSERT INTO user VALUES (null,?,?,?,?,now())', ['',acct,pwd,ctry], (err,result)=>{
        console.log(result);
        if(result.affectedRows>=1){
          var output = {
            code: 1,
            msg:'注册成功',
            uid: result.uid
          }
        }else{
          var output = {
            code: 2,
            msg:'注册失败，请重新注册'
          }
        }
        res.json(output);
        conn.release;
      });
    })
  }
}

