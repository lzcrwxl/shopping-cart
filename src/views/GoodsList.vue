<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span slot="bread">Goods</span>
    </nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price" @click="sortGoods">Price
            <svg class="icon icon-arrow-short" :class="{'sort-up':sortFlag}" xmlns="http://www.w3.org/2000/svg">
              <symbol id="icon-arrow-short" viewBox="0 0 25 32">
                <title>arrow-short</title>
                <path class="path1" d="M24.487 18.922l-1.948-1.948-8.904 8.904v-25.878h-2.783v25.878l-8.904-8.904-1.948 1.948 12.243 12.243z"></path>
              </symbol>
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" :class="{'cur':priceChecked=='all'}" @click="getAllPrice">All</a></dd>
              <dd v-for="(price,index) in priceFilter" >
                <a href="javascript:void(0)" :class="{'cur':priceChecked==index}" @click="setPriceFilter(index)">{{price.startPrice}}-{{price.endPrice}}</a>
              </dd>
             <!-- <dd>
                <a href="javascript:void(0)">100 - 500</a>
              </dd>
              <dd>
                <a href="javascript:void(0)">500 - 1000</a>
              </dd>
              <dd>
                <a href="javascript:void(0)">1000 - 2000</a>
              </dd>-->
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in goodsList">
                  <div class="pic">
                    <a href="#"><img v-lazy="'/static/'+item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
                <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
                  <img src="../assets/loading-spinning-bubbles.svg" alt="" v-show="loading">
                </div>
                <!--<li>
                  <div class="pic">
                    <a href="#"><img src="static/2.jpg" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">XX</div>
                    <div class="price">1000</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn&#45;&#45;m">加入购物车</a>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="pic">
                    <a href="#"><img src="static/3.jpg" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">XX</div>
                    <div class="price">500</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn&#45;&#45;m">加入购物车</a>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="pic">
                    <a href="#"><img src="static/4.jpg" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">XX</div>
                    <div class="price">2499</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn&#45;&#45;m">加入购物车</a>
                    </div>
                  </div>
                </li>-->
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
    <modal :mdShow="mdShow" @close="closeModal">
      <p slot="message">
        请先登陆，否则无法加入到购物车中
      </p>
      <div slot="btnGroup">
        <a class="btn btn--m" style="width:100%;" @click="mdShow=false">关闭</a>
      </div>
    </modal>
    <modal :mdShow="mdShowCart" @close="closeModal">
      <p slot="message">

        <svg class="icon-status-ok">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
        </svg>
        <span>加入购物车成功！</span>
      </p>
      <div slot="btnGroup" style="text-align: center">
        <a class="btn btn--m" @click="mdShowCart=false">继续购物</a>
        <router-link class="btn btn--m" to="/cart">查看购物车</router-link>
      </div>
    </modal>
    <nav-footer></nav-footer>
  </div>
</template>
<style>
  .sort-up{
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
    transition: all .3s ease-out;
  }
  .btn:hover{
    background-color: #ffe5e6;
    transition: all .3s ease-out;
  }
</style>
<script>
  import './../assets/css/base.css'
  import './../assets/css/product.css'
  import NavHeader from '@/components/Header.vue'
  import NavFooter from '@/components/Footer.vue'
  import NavBread from '@/components/NavBread.vue'
  import axios from 'axios'
  import Modal from "@/components/Modal"

  export default{
    data(){
      return {
        goodsList:[],
        sortFlag:true,
        page:1,
        pageSize:8,
        busy:true,
        loading:false,
        mdShow:false,
        mdShowCart:false,
        priceFilter:[
          {
            startPrice:'0.00',
            endPrice:'100.00'
          },
          {
            startPrice:'100.00',
            endPrice:'500.00'
          },
          {
            startPrice:'500.00',
            endPrice:'1000.00'
          },
          {
            startPrice:'1000.00',
            endPrice:'2000.00'
          },
        ],
        priceChecked:'all',
        filterBy:false,
        overLayFlag:false
      }
    },
    components: {
      NavHeader,
      NavFooter,
      NavBread,
      Modal
    },
    mounted: function () {
      this.getGoodsList()
    },
    methods: {
      getGoodsList(flag){
        var param={
          page:this.page,
          pageSize:this.pageSize,
          sort:this.sortFlag?1:-1,
          priceLevel:this.priceChecked
        }
        this.loading=true;
        axios.get("/goods/list",{
          params:param
        }).then((result)=>{
          var res=result.data;
          this.loading=false;
          if(res.status=="0"){
            if(flag){
              this.goodsList=this.goodsList.concat(res.result.list);
              if(res.result.count==0){
                this.busy=true;
              }else {
                this.busy=false;
              }
            }else {
              this.goodsList=res.result.list;
              this.busy=false;
            }
          }else {
            this.goodsLIst=[]
          }
        })
      },
      sortGoods(){
        this.sortFlag=!this.sortFlag;
        this.page=1;
        this.getGoodsList();
      },
      showFilterPop(){
        this.filterBy=true;
        this.overLayFlag=true;
      },
      setPriceFilter(index){
        this.priceChecked=index;
        this.page=1;
        this.getGoodsList()
        this.closePop();
      },
      getAllPrice(){
        this.priceChecked='all';
        this.page=1;
        this.getGoodsList();
      },
      closePop(){
        this.filterBy=false;
        this.overLayFlag=false;
      },
      loadMore(){
        this.loading=true;
        setTimeout(() => {
          this.page++;
          this.getGoodsList(true)
          this.busy = false;
        }, 500);
      },
      addCart(productId){
        axios.post("/goods/addCart",{productId}).then((res)=>{
          let resData=res.data;
          if(res.data.status==0){
            this.mdShowCart=true;
            this.$store.commit('updateCartCount',1)
          }else {
            if(resData.status=="10001"){
              this.mdShow=true;
            }else {
              console.log(res.data);
            }
          }
        })
      },
      closeModal(){
        this.mdShow=false;
      }
    }
  }
</script>
