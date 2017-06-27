<template>
  <div class="mycart">
    <h2>购物车</h2>
    <div class="mylist">
      <ul>
        <li v-for="item in items">
          <input type="radio">
          <router-link :to="`/detail/pid/${item.pid}/cid/${item.cid}`" class="img-link">
            <img :src="item.cimg" alt="">
          </router-link>
          <div class="desc">
            mmmmmmmm
            <div class="qty">
              <span @click="reduce"> - </span>
              <span class="count">{{item.count}}</span>
              <span @click="add"> + </span>
            </div>
          </div>

        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import bus from './bus.js';
  var itemsList;
  bus.$on('selectedItem',function(items) {
    console.log(items);
    return itemsList = items;
  })

  export default {
    name: 'mycart',
    data () {
      return {
//        items: [{pid:1,cid:1,cimg:"/static/img/product/p5_zs.png"},{pid:2,cid:1,cimg:"/static/img/product/p5_cx.png"}],
        items: itemsList,
        //count: 0,
      }
    },
    created: function () {
//      console.log(this.items);
//      bus.$on('selectedItem',function(items){
//          console.log(this.items);
//        this.items = items;
//        console.log(items);
//
//        console.log(this.items);
//      }.bind(this));


//      var url = 'http://localhost:8060/cart';
//      var data = {pid: this.items.pid, cid: this.items.cid};
      //this.$http.post(url,data,{emulateJSON: true}).then(res => {},res => {})
    },
    methods: {
      reduce () {
        this.count--;
        if(this.count <= 0 ) {
            this.count = 0;
        }
      },
      add () {
        this.count++;
      }
    },

  }
</script>

<style scoped lang='less'>
  h2{
    margin-top: 5rem;
    text-align: center;
    height: 5rem;
    line-height: 5rem;
    border-bottom: 1px solid #e1e1e1;
    background: #ddd;
  }
  .mylist{
    background: #ddd;
    li {
      display: flex;
      flex-wrap: wrap;
      border: 1px solid #e1e1e1;
      background: #fff;
      padding: 1rem;
      margin-bottom: 1.5%;
      .img-link{
        width: 30%;
      }
      img{
        width:90%;
        padding: 5%;
        border: 1px solid #aaa;
      }
      .desc{
        width: 30%;
      }
      .qty{
        font-size: 0;
        span{
          display: inline-block;
          border: 1px solid #aaa;
          width: 2rem;
          text-align: center;
          font-size: 1.6rem;
        }
        .count{
          width: 3rem;
          border-right: none;
          border-left: none;
        }

      }
    }
  }

</style>
