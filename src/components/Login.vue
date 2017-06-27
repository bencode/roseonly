<template>
    <div class="login-box">
      <h2>会员登录</h2>
      <form method="post">
        <ul class="login-info">
          <li>
            国家和地区：<input type="select" name="country" value="中国" ref="country">
          </li>
          <li>
            <span class="ctr-code">+86</span><input type="text" name="account" placeholder="请输入手机号码/邮箱" ref="account">
          </li>
          <li>
            密码：<input type="password" name="pwd" placeholder="请输入密码" ref="pwd">
          </li>
        </ul>
        <p class="recall-pwd"><a href="">找回密码</a></p>
        <button type="button" @click="postData">登录</button>
      </form>
      <p class="to-register">
        <router-link to="/register">快速注册</router-link>
      </p>
      <div class="countries">

      </div>

    </div>
</template>

<script>


  export default {
    name: 'app',
    data () {
      return {
          msg: ''
      }
    },
    // 组件创建完后获取数据，
//    created () {
//      this.postData()
//    },
    methods: {
      postData () {
      //验证账号和密码格式
        let country = this.$refs.country.value;
        let account = this.$refs.account.value;
        let pwd = this.$refs.pwd.value;
        //console.log(account,pwd);
        if(testAccount(account) === false || testPwd(pwd) === false ){
            return
        };
        //通过ajax提交至后台查询
        var url = 'http://localhost:8060/login';
        var data = {account: account, pwd: pwd, country: country};
        // POST /someUrl
        this.$http.post(url, data, {emulateJSON: true}).then(res => {//请求成功时的回调
          //alert('服务器请求成功');
          console.log(res.body);//response.body服务器发送的结果对象
          if(res.body.code === 1){
            setTimeout(function(){
              window.location = '/order'
            },3000)
          }else if(res.body.code === 2){
            alert(res.body.msg);
          }
        }, res => {//请求失败时的回调
          alert('服务器请求失败，请重新登录')
        });

      }
    },


  }
</script>

<style scoped lang='less'>
  .login-box {
    margin-top: 5rem;
    background: #f5f5f5;
    line-height: 5rem;
    padding: 0 1.5rem;
    input{
      font-size: 1.4rem;
      padding: 0 1rem;
      outline: none;
      border: none;
    }
    h2 {
      text-align: center;
      border-bottom: 1px solid #efefef;
      margin-bottom: 2rem;
    }
    ul.login-info {
      background: #fff;
      padding: 0 2em;
      overflow: hidden;
      li {
        border-bottom: 1px solid #efefef;
        height: 5rem;
        white-space: nowrap;
        .ctr-code {
          border-right: 1px solid #efefef;
          display: inline-block;
          padding: 0 1rem;
        }

      }
    }
  button {
    height: 5rem;
    text-align: center;
    width: 100%;
    background: rgb(225, 225, 225);
    color:#fff;
    font-size: 1.8rem;
    font-weight: bold;
    border: none;
    border-radius: 3px;

  }
  .recall-pwd {
    text-align: right;
    a{
      display: inline;
    }
  }
  .to-register {
    text-align: center;
  }

  }

</style>
