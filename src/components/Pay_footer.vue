<template>
  <ul class="pay-footer">
    <li class="lt">
      <input type="checkbox" name="" id="selectAll" v-model="selAll" checked @click="sendAll(selAll)">
      <label for="selectAll" @click="sendData()">全选</label>
    </li>
    <li class="md">
      合计： ￥{{amount}}
    </li>
    <li class="rt">
      <router-link to="/login" >去结算({{qty}})</router-link>
    </li>
  </ul>
</template>

<script>
import top from './Top.vue'
import modal from './Modal.vue'
import bus from './bus.js';
export default {
  name: 'payFooter',
  props: ['selItems'],
  data () {
    return {
      selAll: true
    }
  },
  computed: {
    amount: function() {//总金额Array reduce API ，一定要写初始值，否则报错
      return this.selItems.reduce( function (p,v){
          return  p + v.price * v.count;

      },0);
    },
    qty: function() {
        return this.selItems.reduce( function (p,v){
            return p+v.count
        },0)
    }
  },
  methods: {
    sendAll (selAll) {
      this.selAll = selAll;
      this.$emit('input',this.selAll);
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  ul.pay-footer {
    display: flex;
    justify-content: space-between;
    font-size: 1.6rem;
    color: #fff;
    line-height: 4.5rem;
    font-weight: bold;
    > li {
      text-align: center;
      background: #414141;
      width: 33.33%;
    }
    .lf {
      background-size: 2.5rem;
    }
    .rt {
      background: #c71f2c;
      width: 40%;
      a{
        color:#fff;
      }
    }
  }


</style>
