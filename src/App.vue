<template>
  <div id="app">
    <header id="header">
      <top>
        <div slot="nav-bar" class="icon-bar">
          <span></span>
          <span></span>
        </div>
        <div slot="logo" class="main-logo">
          <router-link to="/index">
            <img src="/static/img/nav_logo.png" alt="头部logo">
          </router-link>
        </div>
        <div slot="aside" class="user">
          <router-link to="/cart" class="cart-link">
            <img class="cart" src="/static/img/nav_car.png" alt="购物车">
            <span class="count" v-show="count">{{count}}</span>
          </router-link>
        </div>
      </top>
    </header>
    <!--<img src="./assets/logo.png">-->
    <router-view></router-view>
    <footer id="footer-nav" v-if="showNav">
      <footer-nav>
        <ul class="nav">
          <li>
            <router-link to="/index" class="home" :style="{backgroundPosition: homeBgp}">主页</router-link>
          </li>
          <li>
            <router-link to="/group" class="group" :style="{backgroundPosition: groupBgp}">分类</router-link>
          </li>
          <li>
            <router-link to="/activity" class="activity" :style="{backgroundPosition: actBgp}">活动</router-link>
          </li>
          <li>
            <router-link to="/cart" class="shoppingCart" :style="{backgroundPosition: cartBgp}">购物袋</router-link>
          </li>
          <li>
            <router-link :to="personalCenter" class="personal" :style="{backgroundPosition: personalBgp}">我的</router-link>
          </li>
        </ul>
      </footer-nav>
    </footer>
  </div>
</template>

<script>
import top from './components/Top.vue';
import footerNav from './components/Footer.vue';
//非父子组件间传值用 event bus 方法: 发送方bus.$emit,接收方bus.$on
import bus from './components/bus.js';
export default {
  name: 'app',
  data () {
    return {
      homeBgp: '-5px 0',
      groupBgp: '-54px 0',
      actBgp: '-108px 0',
      cartBgp: '-153px 0',
      personalBgp: '-290px 0',
      showNav: true,
      cartItems: '',
      count: 0
    }
  },
  computed : {
     personalCenter () {
       const uid = sessionStorage.uid;
       console.log(uid);
       if(uid){
         return '/personal_center'
       }else{
         return '/login'
       }
     }
  },
  components: {
    top,
    footerNav
  },
  watch: {
    //路由变化，脚步点亮导航变化
    '$route' : 'changeFooterNav',
  },
  created: function () {
    bus.$on('addCount', function (count) {
      this.count += count;
    }.bind(this))
  },
  mounted: function () {
    switch (this.$route.name) {
      case 'index':
        this.homeBgp = '-27px 0';
        break;
      case 'group':
        this.groupBgp = '-76px 0';
        break;
      case 'activity':
        this.actBgp = '-130px 0';
        break;
      case 'cart':
        this.cartBgp = '-185px 0';
        this.showNav = false;
        break;
      case 'myCenter':
        this.personalBgp = '-312px 0';
        break;
      case 'detail':
        this.showNav = false;
    }

  },
  methods: {
    changeFooterNav () {
      switch (this.$route.name) {
        case 'index':
          this.homeBgp = '-27px 0';
          this.groupBgp = '-54px 0';
          this.actBgp = '-108px 0';
          this.cartBgp =  '-153px 0';
          this.personalBgp = '-290px 0';
          this.showNav = true;
          break;
        case 'group':
          this.groupBgp = '-76px 0';
          this.homeBgp = '-5px 0';
          this.actBgp = '-108px 0';
          this.cartBgp =  '-153px 0';
          this.personalBgp = '-290px 0';
          break;
        case 'activity':
          this.actBgp = '-130px 0';
          this.groupBgp = '-54px 0';
          this.homeBgp = '-5px 0';
          this.cartBgp =  '-153px 0';
          this.personalBgp = '-290px 0';
          break;
        case 'cart':
          this.showNav = false;
          this.count = 0;
//          this.cartBgp = '-185px 0';
//          this.groupBgp = '-54px 0';
//          this.homeBgp = '-5px 0';
//          this.actBgp = '-108px 0';
//          this.personalBgp = '-290px 0';
          break;
        case 'myCenter':
          this.personalBgp = '-312px 0';
          this.groupBgp = '-54px 0';
          this.homeBgp = '-5px 0';
          this.actBgp = '-108px 0';
          this.cartBgp =  '-153px 0';
          break;
        case 'login':
          this.personalBgp = '-290px 0';
          this.groupBgp = '-54px 0';
          this.homeBgp = '-5px 0';
          this.actBgp = '-108px 0';
          this.cartBgp =  '-153px 0';
          break;
        case 'detail':
          this.showNav = false;
      }
      //向服务器发送请求，获取是否购物车有产品，如果有购物袋红点凸显
      const url = 'http://localhost:8060/index/cartItems';
      const data ={data: 'shoppingCart'};
      this.$http.post(url,data,{emulateJSON: true}).then(res=>{
        if(res.body.data == true){
          this.cartBgp = '-220px 0';
        }
      })
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
#header {
  position: fixed;
  width: 100%;
  z-index:99;
  top:0
}
#footer-nav {
  a {
    text-indent: -9999px;
    background: url("/static/img/btn_menu.png") no-repeat;
    background-size: auto 100%;
    width: 22px;
  }
  .shoppingCart {
    width: 35px
  }
}
#header {
.icon-bar{
  width: 20%;
}
.main-logo{
  width: 60%;
}
.user {
  width: 20%;
  display: flex;
  justify-content: flex-end;
  align-content: center;
  margin-right: 2rem;
}
.cart-link {
  white-space: nowrap;
}
.count {
  display: inline-block;
  line-height: 5rem;
  color: #fff;
  font-weight: bold;
  margin-left: -.3rem;
}
.main-logo img {
  height: 3rem;
  margin-top: 1rem;
  vertical-align: top;
}
.user img {
  height: 2.5rem;
  margin-top: 1rem;
  vertical-align: top;
}
.user > img:first-child {
  margin-right: 1rem;
}
.icon-bar > span:first-child{
  margin-top: 1.8rem;
  margin-bottom: 1rem;

}
.icon-bar > span {
  display: block;
  width: 2rem;
  height: 0.2rem;
  background: #fff;
  margin-left: 2rem;
}

}
</style>
