/**
 * Created by yupeiying on 6/23/17.
 */
const pool = require('./pool');
function getConn() {
    return new Promise((resolve, reject) => {
        pool.getConnection((e, conn) => {
            e ? reject(e) : resolve(conn);
        });
    });
}
async function getData(req, conn) {
    const pid = req.params.pid;
    const cid = req.params.cid;
    const sql1 = `SELECT * FROM ro_color WHERE pid=? And cid=? `;
    const sql2 = `SELECT * FROM rec_item`;
    let data = [];
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
async function getColorImg(conn, pid, cid) {
  return await execQuery(conn, 'SELECT current_col_img FROM ro_color WHERE pid=? AND cid=?', [pid, cid]);
}
async function getProduct(conn, pid) {
  return await execQuery(conn, 'SELECT * FROM ro_item WHERE pid=?', [pid]);
}
async function getMain(conn){
  return await execQuery(conn,'SELECT * FROM ro_item')
}
module.exports ={
  main: async(req, res)=>{
    const conn = await getConn();
    const roseItems = await getMain(conn);
    res.json(roseItems); //把指定的对象转换为JSON字符串，并输出给客户端 = JSON.stringify + write + setHeader
    conn.release();
    // pool.getConnection((err, conn)=>{
    //   conn.query('SELECT * FROM ro_item',(err, result)=>{
    //     const roseItems = result;
    //     //setCors(req,res);
    //     res.json(roseItems); //把指定的对象转换为JSON字符串，并输出给客户端 = JSON.stringify + write + setHeader
    //     conn.release();
    //   })
    // })
  },
  detail: async (req, res)=> {
    const conn = await getConn();
    getData(req, conn).then(data => {
      res.json(data);
      conn.release();
    });
  },
  addCart: (req,res) => {
    const items = req.session.items || [];
    const pid = req.body.pid;
    const cid = req.body.cid;
    const count = Number(req.body.count) || 1;
    const item = items.find(item => item.pid === pid && item.cid === cid);
    if (item) {
      item.count = item.count + count;
    } else {
      items.push({ pid, cid, count });
    }
    req.session.items = items;
    res.json({ success: true });
  },
  cart:  async (req,res) => {
    const items = req.session.items || [];
    const conn = await getConn();
    let itemsList = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const color = await getColorImg(conn, item.pid, item.cid);
      const simg = color[0].current_col_img;
      const product = await getProduct(conn,item.pid);
      product[0].simg = simg;
      product[0].count = item.count;
      product[0].selected = true;
      itemsList.push(product[0]);
  }
    conn.release();
    res.json(itemsList);

  },
  count: (req,res) => {
    const items = JSON.parse(req.body.cartItems);
    const sessionItems = req.session.items;//读取session
    //判断如果前台发过来的pid，cid和session里的匹配，就把count设置为前台发来的
    items.forEach((v) => {
      sessionItems.forEach((d) => {
        if(v.pid == d. pid && v.cid == d.cid) {
          d.count = v.count
        }
      })
    })
    req.session.items = sessionItems;//保存session
    //连接数据库，查看产品数量
    res.json(items);
  },
  delete: (req,res) => {
    const items = JSON.parse(req.body.cartItems);
    req.session.items = items;
    res.json(items);
  },
  cartItems: (req,res)=>{
   const sessionItems =  req.session.items ;
   if( sessionItems.length != 0) {
     res.json({data: true});
   }else {
     res.json({data: false})
   }
  }
};
