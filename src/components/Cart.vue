<template>
  <div class="mycart">
    <h2>购物车</h2>
    <div class="mylist">
      <ul>
        <li v-for="(item,index) in items" v-if="item.count!=0">
          <div class="checkbox">
            <input type="checkbox" v-model="item.selected" :id="`label${index}`">
            <label :for="`label${index}`" :class="{bgposition: item.selected}"></label>
          </div>
          <router-link :to="`/detail/pid/${item.pid}/cid/${item.cid}`" class="img-link">
            <img :src="`/static/img/product/${item.simg}`" alt="">
          </router-link>
          <div class="desc">
            <b>{{item.name}}</b>
            <br> {{item.series}}  {{item.qty + item.size}}
            <div class="qty">
              <span @click="reduce(item.count,index)"> - </span>
              <input type="text" :value="item.count" class="count">
              <span @click="add(item.count,index)"> + </span>
            </div>
          </div>
          <span class="price">￥ {{item.price}}</span>
        </li>
      </ul>
    </div>
    <div class="footer">
      <pay-footer @input="getAll" :allItems="items" :selItems="selItems" ></pay-footer>
    </div>
  </div>
</template>

<script>
  import payFooter from './Pay_footer.vue'
  import bus from './bus.js';
  bus.$on('selectedItem',function(items) {
    console.log(items);
    return itemsList = items;
  });
  function postData(count,i) {
    const url = 'http://localhost:8060/cart/count';
    this.items[i].count = count;
    const cartItems = JSON.stringify(this.items);
    const data ={cartItems};
    this.$http.post(url,data,{emulateJSON: true}).then(res => {
      this.items = res.body;
    })
  }

  export default {
    name: 'mycart',
    data () {
      return {
        items: [],
        count: '',
      }
    },
    computed: {
      selItems: function () {
        return this.items.filter((v) => {
          return v.selected === true
        })
      },
    },
    components: {
      payFooter
    }
    ,
    created: function () {
      const url = 'http://localhost:8060/cart';
      this.$http.get(url,{emulateJSON: true}).then(res => {
        this.items = res.body;
      },res => {});
    },
    methods: {
      reduce (count,i) {
        count--;
        if(count <= 0 ) {
         count = 0;
        }
        postData.call(this,count,i);
      },
      add (count,i) {
        count++;
        postData.call(this,count,i);
      },
      getAll (v) {
        if(v){
          this.selAll = true;
          this.items.forEach(function(v) {
            v.selected = true;
          })
           //请求服务器
        }else{
          this.selAll = false;
          this.items.forEach(function(v) {
            v.selected = false;
          })
          //请求服务器
        }
      },
    }
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
      border: 1px solid #e1e1e1;
      background: #fff;
      padding: 1rem;
      margin-bottom: 1.5%;
      align-items: center;
      .checkbox{
        width: 10%;
        text-align: center;
        margin-right: 1rem;
      }
      .img-link{
        width: 30%;
      }
      img{
        width:10rem;
        padding: .5rem;
        border: 1px solid #aaa;
      }
      .desc{
        width: 30%;
        margin: 0 2rem;
      }
      .qty{
        /*font-size: 0;*/
        margin-top: 2rem;
        display:flex;

        span{
          display: inline-block;
          border: 1px solid #aaa;
          width: 2.4rem;
          height: 2.4rem;
          line-height: 2.4rem;
          text-align: center;
          font-size: 2rem;
        }
        .count{
          width: 3rem;
          border: 1px solid #aaa;
          outline: none;
          border-right: none;
          border-left: none;
          text-align: center;
          font-size: 1.4rem;
        }

      }
      .price {
        font-weight: bold;
        font-size: 1.6rem;
        white-space: nowrap;
      }
    }
  }
  .footer{
    position: fixed;
    width: 100%;
    bottom: 0;
  }

</style>
