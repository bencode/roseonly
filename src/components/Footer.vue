<template>
  <div class="footer-container">
    <div class="lf">客服</div>
    <div class="md">
      <router-link to="/login">立即购买</router-link>
    </div>
    <div class="rt" @click="addToCart">加入购物车</div>
    <div class="modal" :style="styleObj" v-if="showModal">
      <modal @input="isShowing"></modal>
    </div>
  </div>
</template>

<script>
import top from './Top.vue'
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
      //console.log(this.colors);
      var cimg = this.colors.filter( (v) => v.isCurrent === true)[0].co_img;
      this.selected.push({pid:this.$route.params.pid, cid: this.$route.params.cid, cimg: cimg, count: 1});
      console.log(this.selected);
      this.showModal = true;
      this.styleObj.height = window.screen.height +'px';
      //引入购物车动画插件
      rocketcss('.color-img li.current','.cart', 'rocketPulseHole',1000);
      $('.cart').addClass('targetPulse');
      bus.$emit('addCount', count)//点击一次向购物车增加1
      bus.$emit('selectedItem',this.selected);//发送选中的产品，颜色，数量到购物车组件
//      console.log(this.colors);
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
    display: flex;
    justify-content: space-between;
    font-size: 1.6rem;
    color: #fff;
    line-height: 4.5rem;
    font-weight: bold;
    > div {
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


</style>
