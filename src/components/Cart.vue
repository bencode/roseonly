<template>
  <div class="mycart">
    <h2>购物车</h2>
    <div class="mylist">
      <ul>
        <li v-for="(item,index) in items" v-if="item.count!=0">
          <input type="checkbox" v-model="item.selected">
          <router-link :to="`/detail/pid/${item.pid}/cid/${item.cid}`" class="img-link">
            <img :src="`/static/img/product/${item.simg}`" alt="">
          </router-link>
          <div class="desc">
            {{item.name + item.series + item.sub_series + item.qty + item.size}}
            <div class="qty">
              <span @click="reduce(item.count,index)"> - </span>
              <span class="count">{{item.count}}</span>
              <span @click="add(item.count,index)"> + </span>
            </div>
          </div>
          <span class="price">￥ {{item.price}}</span>
        </li>
      </ul>
    </div>
    <div>
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
  function postData(data) {
    const url = 'http://localhost:8060/cart/count';
    console.log(data);
    this.$http.post(url,data,{emulateJSON: false}).then(res => {
      this.items = res.body;
      console.log('.......');
      console.log(this.items)
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
        this.items[i].count = count;
        const data = this.items ;
        postData.call(this,data);
      },
      add (count,i) {
        count++;
        this.items[i].count = count;
        const data = this.items ;
        postData.call(this,data);
      },
      getAll (v) {
        console.log(v);
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
        margin-right: 2rem;
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
