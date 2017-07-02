<template>
  <div class="footer-container">
    <slot>
      <!--<ul class="nav">-->
        <!--<li class="lf">客服</li>-->
        <!--<li class="md">-->
          <!--<router-link to="/login">立即购买</router-link>-->
        <!--</li>-->
        <!--<li class="rt" @click="addToCart">加入购物车</li>-->
        <!--<li class="modal" :style="styleObj" v-if="showModal">-->
          <!--<modal @input="isShowing"></modal>-->
        <!--</li>-->
      <!--</ul>-->
    </slot>
  </div>
</template>

<script>
import modal from './Modal.vue'
import bus from './bus.js';
export default {
  name: 'footer-container',
  props: ['colors'],
  data () {
    return {
      showModal: false,
      styleObj: {
        height: 0
      },
      selected : [],
    }
  },
  components: {
     modal
  },
  methods: {
    addToCart () {
      let count = 1;
      var cimg = this.colors.filter( (v) => v.isCurrent === true)[0].co_img;
      console.log(this.selected);
      this.showModal = true;
      this.styleObj.height = window.screen.height +'px';
      //引入购物车动画插件
      rocketcss('.color-img li.current','.cart', 'rocketPulseHole',1000);
      $('.cart').addClass('targetPulse');
      bus.$emit('addCount', count)//点击一次向购物车增加1

      //点击'加入购物车'，使用Ajax向服务端发送当前产品数据
      var url = 'http://localhost:8060/add_to_cart'
      var pid = this.$route.params.pid;
      var cid = this.$route.params.cid;
      var data = {pid: pid, cid: cid, cimg: cimg, count: 1};
      this.$http.post(url,data,{emulateJSON: true});
    },
    isShowing (bool) {
      this.showModal = bool;


    },


  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .footer-container {
    position: fixed;
    bottom:0;
    z-index: 99;
    width:100%;
    height: 4.5rem;

    font-size: 1.6rem;
    color: #fff;
    line-height: 4.5rem;
    font-weight: bold;
    .nav {
      display: flex;
      justify-content: space-between;
      >li {
        text-align: center;
        background: #414141;
        width: 33.33%;
      }
      .lf {
        border-right: 2px solid #ddd;
        background: url("../../static/img/icon_kefu.png") no-repeat #414141 12% 50%;
        background-size: 2.5rem;
      }
      .md a {
        color:#fff;
      }
      .rt {
        background: #c71f2c;
      }
      .modal {
        /*background: rgba(0, 0, 0, 0.3);*/
        /*z-index: 100;*/
        position: fixed;
        width: 100%;
        top: 0;
        background: none;

      }
    }

  }


</style>
