const http = require('http');
const express = require('express');
const pathUtil = require('path');
const fs = require('fs');
// const qs = require('querystring');
const mysql = require ('mysql');
const pool = require ('./pool');
const parseUrl = require('url').parse;
//const ejs = require('ejs');
const user = require('./user');
const cors = require('cors');
const bodyParser = require("body-parser");
const session = require('express-session');
const cookieParser = require('cookie-parser');

//Here we are configuring express to use body-parser as middle-ware.
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(pathUtil.join(__dirname, '../static')));
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60 * 1000 * 60 * 24} //cookie保存24小时
}))
http.createServer(app).listen(8060);

//前后端端口不一样，跨域获取文件，对后端响应头作设置
const setCors = function(req,res){
  // 获取请求头url,并解析
  const parsed = parseUrl(req.header('referer') || '');
  if (parsed.host) {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,HEAD');
    res.header('Access-Control-Allow-Origin', `${parsed.protocol}//${parsed.host}`);
  }
};
app.get('/index', (req, res)=>{
  pool.getConnection((err, conn)=>{
    conn.query('SELECT * FROM ro_item',(err, result)=>{
      var roseItems = result;
      setCors(req,res);
      res.json(roseItems); //把指定的对象转换为JSON字符串，并输出给客户端 = JSON.stringify + write + setHeader
      //console.log(dataImg);
      conn.release();
    })
  })
});

app.get('/detail/pid/:pid/cid/:cid', (req, res)=>{
  // var pid = req.params.pid;
  // var cid = req.params.cid;
  // console.log(req.params);
  pool.getConnection((err, conn)=>{
    getData(req, conn).then(data => {
      setCors(req,res);
      res.json(data);
      conn.release();
    });
    // var select1 = `SELECT * FROM ro_color WHERE pid=? And cid=? `;
    // var select2 = `SELECT * FROM rec_item`;
    // var data = [];
    // conn.query(select1,[pid,cid],(err, result)=>{
    //   setCors(req,res);
    //   var cItem = result;
    //   data[0] = cItem
    //   conn.query(select2,(err,result)=>{
    //     setCors(req,res);
    //     var recItem = result;
    //     data[1] = recItem;
    //     res.json(data);
    //     conn.release();
    //   })
    // });
    //
    // // res.json(data);
  })
});
async function getData(req, conn) {
  var pid = req.params.pid;
  var cid = req.params.cid;
  var sql1 = `SELECT * FROM ro_color WHERE pid=? And cid=? `;
  var sql2 = `SELECT * FROM rec_item`;
  var data = [];
  data[0] = await execQuery(conn, sql1, [pid, cid]);
  data[1] = await execQuery(conn, sql2);
  return data;
}
async function execQuery(conn, sql, args = []) {// args = []表示参数为数组
  return new Promise((resolve, reject) => {
    conn.query(sql, args, (e, result) => {
      e ? reject(e) : resolve(result);
    });
  });
}

var issue2options = {
  origin: true,
  methods: ['POST'],
  credentials: true,
  maxAge: 3600
};
app.post('/login',cors(),user.login);
app.post('/register',cors(),user.register)

app.post('/add_to_cart',cors(),(req,res) => {
  var items = req.session.items;
  if (!items) {
    items = [];
    req.session.items = items;
  }
  var pid = req.body.pid;
  var cid = req.body.cid;
  var count = req.body.count;
  items.push({pid:pid, cid: cid, count:count});
  res.json({success: true});
})

// app.post('/change_count',cors(),(req,res) => {
//     var p_id = req.body.pid;
//     var c_id = req.body.cid;
//     var count = req.body.count;
//     items.forEach(function(v){
//         if(v.pid == p_id && v.cid == c_id){
//             v.count = count;
//         }
//     })
// })

app.get('/cart',cors(),(req,res) => {
  var items = req.session.items;
  console.log(items);
  if(items){
      pool.getConnection((err, conn) => {
          var output = [];
          for(var i = 0; i < items.length;i++) {
              conn.query('SELECT current_col_img FROM ro_color WHERE pid=? AND cid=?', [items[i].pid, items[i].cid], (err, result) => {
                  if (result.length > 0) {
                      var simg = result[0].current_col_img;
                      conn.query('SELECT * FROM ro_item WHERE pid=?', [items[i].pid], (err, result) => {
                          //console.log(result)
                          result[0].simg = simg;
                           output.push = result[0];

                          // if (items.length === 0) {
                          //     items.push(result[0]);
                          // } else {
                          //     //判断保存的产品中是否有相同的，如果有直接增加数量，否则添加新产品对象
                          //     console.log(sel_Item);
                          //     if (items.some((v) => {
                          //             return (v.pid == p_id && v.cid == c_id)
                          //         })) {
                          //         items.forEach((v) => {
                          //             if (v.pid == p_id && v.cid == c_id) {
                          //                 v.count = Number(v.count) + Number(count);
                          //                 return;
                          //             }
                          //         })
                          //     } else {
                          //         items.push(result[0]);
                          //     }
                          // }

                      })
                  }
              })

          }
          console.log(output)
          res.json(output);
          conn.release();

      })
  }

})
















// const renderCache = new Map();
// function render(name, data) {
//   let fn = renderCache.get(name);
//   if (!fn) {
//     const path = pathUtil.join(__dirname, '../templates', name);
//     const tpl = fs.readFileSync(path, 'utf-8');
//     fn = ejs.compile(tpl);
//     renderCache.set(name, fn);
//   }
//   return fn(data);
// }










