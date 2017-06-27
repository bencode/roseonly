<template>
  <div class="register-box">
    <h2>会员注册</h2>
    <form method="post">
      <ul class="register-info">
        <li>
          国家和地区：<input type="select" name="country" v-model="country"  :value="country">
        </li>
        <li>
          <span class="ctr-code">+86</span><input type="text" name="account" placeholder="请输入手机号码/邮箱" v-model="account" :value="account">
        </li>
        <li>
          图片码：<input type="select" name="imgcode" placeholder="请输入图片码" v-model="imgCode" :value="imgCode">
          <img src="" alt="图片码" class="img-code" :title="correctImgCode">
        </li>
        <li>
          短信码：<input type="select" name="msgCode"  placeholder="请输入验证码"  v-model="msgCode" :value="msgCode">
          <span class="msg-code">{{correctMsgCode}}</span>
        </li>
        <li>
          密码：<input type="password" name="pwd" placeholder="请输入6-20位数字/字母密码" v-model="pwd" :value="pwd">
        </li>
      </ul>
      <p class="recall-code">没有收到短信验证码？请使用<a href="">语音验证码</a></p>
      <button type="button" @click="postData">注册</button>
    </form>
    <p class="to-register">
      <router-link to="/register">已有账号登录</router-link>
    </p>
    <div class="countries">

    </div>

  </div>
</template>

<script>
  export default {
    name: 'register-box',
    data () {
      return {
        country: '中国',
        account: '',
        imgCode: '',
        msgCode: '',
        pwd: '',
        correctMsgCode: '1234',
          //'获取验证码',
        correctImgCode: '1234',
      //'获取图片码',
      }
    },
    methods: {
      postData () {
        if(testAccount(this.account) === false || this.imgCode != this.correctImgCode || this.msgCode != this.correctMsgCode || testPwd(this.pwd) === false ){
          return
        };
        //通过ajax提交至后台查询
        var url = 'http://localhost:8060/register';
        var data = {country: this.country, account: this.account, pwd: this.pwd,};
        // POST /someUrl
        this.$http.post(url, data, {emulateJSON: true}).then(res => {//请求成功时的回调
          //alert('服务器请求成功');
          console.log(res.body);//response.body服务器发送的结果对象
          if(res.body.code === 1){
            alert("注册成功");
            setTimeout(function(){
              window.location = '/order'
            },3000)
          }else if(res.body.code === 2){
            alert(res.body.msg);
          }
        }, res => {//请求失败时的回调
          alert('服务器请求失败，请重新注册')
        });

      }
    }
  }
</script>

<style scoped lang='less'>
  .register-box {
    margin-top: 5rem;
    background: #f5f5f5;
    line-height: 5rem;
    padding: 0 1.5rem;
  input{
    font-size: 1.4rem;
    padding: 0 1rem;
    outline: none;
    border: none;
    width: 80%;
  }
  h2 {
    text-align: center;
    border-bottom: 1px solid #efefef;
    margin-bottom: 2rem;
  }
  ul.register-info {
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
  input[name=imgCode],input[name=msgCode]{
    width: 50%;
  }
  .img-code, .msg-code {
    vertical-align: middle;
    width: 8rem;
    height: 3.5rem;
    display: inline-block;
    background: rgb(210, 210, 210);
    border: none;
    border-radius: 3px;
    overflow: hidden;
    line-height: 3.5rem;
    padding: 0 .5rem;
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
  .recall-code {
    text-align: center;
  a{
    display: inline;
  }
  }
  .to-register {
    text-align: center;
  }

  }
</style>
