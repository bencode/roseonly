<template>
  <div class="container">
    <slot name="title">
      <h2>标题</h2>
    </slot>
    <div class="list_box">
      <ul class="list">
        <v-touch tag="li" v-for="(item,index) in items" @panstart="moveStart()" @panleft="moveLeft(index,$event)" @panright="moveRight(index,$event)" @panend = "finishMove">
          <!--<slot name="mainContent">-->
            <!--<div class="main">-->
              <!--<div class="checkbox">-->
                <!--<input type="checkbox" v-model="item.selected" :id="`label${index}`">-->
                <!--<label :for="`label${index}`" :class="{bgposition: item.selected}"></label>-->
              <!--</div>-->
              <!--<router-link :to="`/detail/pid/${item.pid}/cid/${item.cid}`" class="img-link">-->
                <!--<img :src="`/static/img/product/${item.simg}`" alt="">-->
              <!--</router-link>-->
              <!--<div class="desc">-->
                <!--<b>{{item.name}}</b>-->
                <!--<br> {{item.series}}  {{item.qty + item.size}}-->
                <!--<div class="qty">-->
                  <!--<span @click="reduce(item.count,index)"> - </span>-->
                  <!--<input type="text" :value="item.count" class="count" @change="input(item.count,index)" v-model.lazy.number="item.count">-->
                  <!--<span @click="add(item.count,index)"> + </span>-->
                <!--</div>-->
              <!--</div>-->
              <!--<span class="price">￥ {{item.price}}</span>-->
            <!--</div>-->
          <!--</slot>-->
          <slot name="rightBtn">
            <div class="delete">删除</div>
          </slot>
        </v-touch>
      </ul>
    </div>
  </div>
</template>

<script>
//  import bus from './bus.js';
//  bus.$on('selectedItem',function(items) {
//    console.log(items);
//    return itemsList = items;
//  });
//  function postData(count,i) {
//    const url = 'http://localhost:8060/cart/count';
//    this.items[i].count = count;
//    const cartItems = JSON.stringify(this.items);
//    const data ={cartItems};
//    this.$http.post(url,data,{emulateJSON: true}).then(res => {
//      this.items = res.body;
//    })
//  }
const rex = /\.*translateX\((.*)px\)/;
const lis = document.querySelectorAll('.list li');
const delegation = 100;//删除按钮的宽
let move = 0;
let translateX;

  export default {
    name: 'container',
    data () {
      return {
//        items: [],
//        inputCount: '',
//        transform: 'translateX(0)',
//        move: 0
      }
    },
    computed: {
//      selItems: function () {
//        return this.items.filter((v) => {
//          return v.selected === true
//        })
//      },

    },
    created: function () {
    },
//    mounted:function(){
//        var $this=this;														//将$this保存 区分以下触发事件的this
//        var container = document.querySelectorAll('.list li');
//        for(var i = 0; i < container.length; i++){                          //为每个特定DOM元素绑定touchstart touchmove时间监听 判断滑动方向
//            var x,  X;
//            container[i].addEventListener('touchstart', function(event) {   //记录初始触控点横坐标
//                x = event.changedTouches[0].pageX;
//            });
//            container[i].addEventListener('touchmove', function(event){
//                X = event.changedTouches[0].pageX;                          //记录当前触控点横坐标
//                if($this.expansion){                                       //判断是否展开，如果展开则收起
//                    $this.expansion.className = "";
//                }
//                if(X - x > 10){                                             //右滑
//                    this.className = "";                                    //右滑收起
//                }
//                if(x - X > 10){                                             //左滑
//                    this.className = "swipeleft";                           //左滑展开
//                    $this.expansion = this;
//                }
//            });
//        }
//    },
    methods: {
      moveStart (){
        for(let i=0;i<lis.length;i++){//开始滑动时，将所有的li的位移设置为0
          lis[i].style.transform = 'translateX(' + 0 + 'px)';
        }
      },
      moveLeft (i,e) {
        translateX = parseFloat(rex.exec(lis[i].style.transform)[1]);//读取已有位移
        move = translateX + e.deltaX;//新位移 = 已有位移 + x轴移动距离
        console.log(move);
        if(move<-delegation) {
          move = -delegation;
        }
        lis[i].style.transform = 'translateX(' + move + 'px)';
      },
      moveRight (i,e) {
        translateX = parseFloat(rex.exec(lis[i].style.transform)[1]);
        move = translateX + e.deltaX;
        console.log(move);
        if(move>0) {
          move = 0;
        }
        lis[i].style.transform = 'translateX(' + move + 'px)';
      },
      finishMove (i,e) {
        if(e.deltaX>0){//右滑结束
          if(e.deltaX>delegation/2){
              lis[i].style.transform = 'translateX(' + 0 + 'px)';
          }else{
              lis[i].style.transform = 'translateX(' + (-delegation) + 'px)';
          }
        }
        if(e.deltaX<0){//左滑结束
          if(e.deltaX<-delegation/2){
              lis[i].style.transform = 'translateX(' + (-delegation) + 'px)';
          }else{
              lis[i].style.transform = 'translateX(' + 0 + 'px)';
          }
        }
      }
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
  .list_box{
    background: #ddd;
    width: 100%;
    overflow: hidden;
    li {
      display: flex;
      /*border: 1px solid #e1e1e1;*/
      /*background: #fff;*/
      /*margin-bottom: 1.5%;*/
      /*align-items: center;*/
      /*flex-wrap: nowrap;*/
      /*white-space: nowrap;*/
      width:125%;
      overflow: hidden;
      .main{
        display: flex;
        /*border: 1px solid #e1e1e1;*/
        background: #fff;
        margin-bottom: 1.5%;
        align-items: center;
        /*overflow: hidden;*/
        width: 100%;
      }
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
        vertical-align: middle;
        margin: 2rem 0;
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
        width: 30%;
      }
    }
    .delete {
      width:10rem;
      background: #c71f2c;
      line-height: 14rem;
      height:14rem;
      color: #fff;
      font-weight: bold;
      text-align: center;
      display: inline-block;

    }
  }
  .footer{
    position: fixed;
    width: 100%;
    bottom: 0;
  }

</style>
