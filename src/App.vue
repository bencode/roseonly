<template>
  <div id="app">
    <header id="header">
      <top></top>
    </header>
    <!--<img src="./assets/logo.png">-->
    <router-view></router-view>
    <footer id="footer-nav">
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
export default {
  name: 'app',
  data () {
    return {
      homeBgp: '-5px 0',
      groupBgp: '-54px 0',
      actBgp: '-108px 0',
      cartBgp: '-153px 0',
      personalBgp: '-290px 0'
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
    '$route' : 'changeFooterNav'
  },
  mounted: function () {
    switch (this.$route.path) {
      case '/index':
        this.homeBgp = '-27px 0';
        break;
      case '/group':
        this.groupBgp = '-76px 0';
        break;
      case '/activity':
        this.actBgp = '-130px 0';
        break;
      case '/cart':
        this.cartBgp = '-185px 0';
        break;
      case '/personal_center':
        this.personalBgp = '-312px 0';
        break;
    }
  },
  methods: {
    changeFooterNav () {
      switch (this.$route.path) {
        case '/index':
          this.homeBgp = '-27px 0';
          this.groupBgp = '-54px 0';
          this.actBgp = '-108px 0';
          this.cartBgp =  '-153px 0';
          this.personalBgp = '-290px 0';
          break;
        case '/group':
          this.groupBgp = '-76px 0';
          this.homeBgp = '-5px 0';
          this.actBgp = '-108px 0';
          this.cartBgp =  '-153px 0';
          this.personalBgp = '-290px 0';
          break;
        case '/activity':
          this.actBgp = '-130px 0';
          this.groupBgp = '-54px 0';
          this.homeBgp = '-5px 0';
          this.cartBgp =  '-153px 0';
          this.personalBgp = '-290px 0';
          break;
        case '/cart':
          this.cartBgp = '-185px 0';
          this.groupBgp = '-54px 0';
          this.homeBgp = '-5px 0';
          this.actBgp = '-108px 0';
          this.personalBgp = '-290px 0';
          break;
        case '/personal_center':
          this.personalBgp = '-312px 0';
          this.groupBgp = '-54px 0';
          this.homeBgp = '-5px 0';
          this.actBgp = '-108px 0';
          this.cartBgp =  '-153px 0';
          break;
        case '/login':
            this.personalBgp = '-290px 0';
            this.groupBgp = '-54px 0';
            this.homeBgp = '-5px 0';
            this.actBgp = '-108px 0';
            this.cartBgp =  '-153px 0';
            break;
      }
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
  /*.home {*/
    /*background-position: -5px 0;*/
  /*}*/
  /*.group {*/
    /*background-position: -54px 0;*/
  /*}*/
  /*.activity {*/
    /*background-position: -108px 0;*/
  /*}*/
  .shoppingCart {
    width: 35px
  }
  /*.personal {*/
    /*background-position: -290px 0;*/
  /*}*/
}
</style>
