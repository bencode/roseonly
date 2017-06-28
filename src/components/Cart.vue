<template>
  <div class="mycart">
    <h2>购物车</h2>
    <div class="mylist">
      <ul>
        <li v-for="item in items">
          <input type="radio">
          <router-link :to="`/detail/pid/${item.pid}/cid/${item.cid}`" class="img-link">
            <img :src="`/static/img/product/${item.current_col_img}`" alt="">
          </router-link>
          <div class="desc">
            {{item.name + item.series + item.sub_series + item.qty + item.size}}
            <div class="qty">
              <span @click="reduce(item.count)"> - </span>
              <span class="count">{{count = item.count}}</span>
              <span @click="add(item.count)"> + </span>
            </div>
          </div>
          <span class="price">￥ {{item.price}}</span>

        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import bus from './bus.js';
  bus.$on('selectedItem',function(items) {
    console.log(items);
    return itemsList = items;
  })

  export default {
    name: 'mycart',
    data () {
      return {
        items: [],
        count: '',
      }
    },
    created: function () {
      var url = 'http://localhost:8060/cart';
      this.$http.get(url,{emulateJSON: true}).then(res => {
        console.log(res.body)
        this.items = res.body;
      },res => {})

    },
    methods: {
      reduce (count) {
        this.count--;
        if(this.count <= 0 ) {
          this.count = 0;
        }

        console.log(this.count);
      },
      add (count) {
        this.count++;

        console.log(this.count);
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
      align-items: center;
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
        margin-top: 2rem;
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
      .price {
        font-weight: bold;
        font-size: 1.6rem;
      }
    }
  }

</style>
