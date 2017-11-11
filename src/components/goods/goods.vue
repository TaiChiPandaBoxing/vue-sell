<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" :key="index" class="menu-item" :class="{'current': currentIndex === index}" @click="selectMenu(index, $event)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="(item, index) in goods" :key="index" class="food-list" ref="foodGroup">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li @click="selectFood(food, $event)" v-for="(food, key) in item.foods" :key="key" class="food-item border-1px">
              <div class="icon">
                <img width="57" height="57" :src="food.icon" alt="食物图片">
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                  <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cart-control :food="food"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shop-cart ref="shopCart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shop-cart>
    <food :food="selectedFood" ref="food"></food>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import ShopCart from '@/components/shopcart/shopcart'
import CartControl from '@/components/cartcontrol/cartcontrol'
import Food from '@/components/food/food'
import Bus from '@/common/js/EventBus'
const ERROR_OK = 0
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0,
      selectedFood: {}
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.$http.get('/api/goods').then((response) => {
      if (response.data.errno === ERROR_OK) {
        this.goods = response.data.data
        // console.log(this.goods)
        // DOM更新了，操作DOM时需要在this.$nextTick()里或延迟加载
        setTimeout(() => {
          this._initScroll()
          this._calculateHeight()
        }, 20)
      }
    })
    Bus.$on('cart.add', (el) => {
      this.$nextTick(() => {
        this.$refs.shopCart.drop(el)
      })
    })
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    selectFoods () {
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }
        })
      })
      return foods
    }
  },
  methods: {
    selectMenu (index, event) {
      // better-scroll可以监听到该事件，浏览器原生不能监听到，防止PC端出现两次点击
      if (!event._constructed) {
        return
      }
      const foodList = this.$refs.foodGroup
      let el = foodList[index]
      this.foodsScroll.scrollToElement(el, 300)
    },
    selectFood (food, event) {
      if (!event._constructed) {
        return
      }
      this.selectedFood = food
      this.$refs.food.show()
    },
    // addFood (target) {
    //   this._drop(target)
    // },
    // 子组件事件触发
    // _drop (target) {
    //     // 体验优化，异步执行下落动画
    //   this.$nextTick(() => {
    //     // 父组件传递给子组件
    //     this.$refs.shopcart.drop(target)
    //   })
    // },
    _initScroll () {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        click: true,
        probeType: 3 // 设置该值实时检测滚动的位置
      })
      this.foodsScroll.on('scroll', (pos) => {
        // 拿到实时的y坐标
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight () {
      // 获取食物的li Dom节点列表
      const list = this.$refs.foodGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    }
  },
  components: {
    ShopCart,
    CartControl,
    Food
  }
}
</script>

<style lang="stylus" scoped>
@import "~@/common/stylus/mixin"
.goods
  display: flex
  position: absolute
  top: 174px
  bottom: 46px
  width: 100%
  overflow: hidden
  .menu-wrapper
    flex: 0 0 80px
    width: 80px
    background: #f3f5f7
    .menu-item
      display: table
      width: 56px
      height: 54px
      padding: 0 12px
      line-height: 14px
      &.current
        position: relative
        z-index: 10
        margin-top: -1px
        background: #fff
        font-weight: 700
        .text
          border-none() 
      .icon
        display: inline-block
        vertical-align: top
        width: 12px
        height: 12px
        margin-right: 2px
        background-size: 12px 12px
        background-repeat: no-repeat
        &.decrease
          bg-image('decrease_3')
        &.discount
          bg-image('discount_3')
        &.guarantee
          bg-image('guarantee_3')
        &.invoice
          bg-image('invoice_3')
        &.special
          bg-image('special_3')
      .text
        display: table-cell
        width: 56px
        vertical-align: middle
        border-1px(rgba(7, 17, 27, .2))
        font-size: 12px
  .foods-wrapper
    flex: 1
    .title
      padding-left: 14px
      height: 26px
      line-height: 26px
      border-left: 2px solid #d9dde1
      font-size: 12px
      color: rgb(147, 153, 159)
      background: #f3f5f7
    .food-item
      display: flex
      margin: 18px
      padding-bottom: 18px
      border-1px(rgba(7, 17, 27, .2))
      $:last-child
        border-none()
        margin-bottom: 0
      .icon
        flex: 0 0 57px
        margin-right: 10px
      .content
        flex: 1
        .name
          margin: 2px 0 8px
          height: 14px
          line-height: 14px
          font-size: 14px
          color: rgb(7, 17, 27)
        .desc, .extra
          font-size: 10px
          color: rgb(147, 153, 159)
        .desc
          margin-bottom: 8px
          line-height: 12px
        .extra
          line-height: 10px
          .count
            margin-right: 12px
        .price
          font-weight: 700px
          line-height: 24px
          .now
            margin-right: 8px
            font-size: 14px 
            color: rgb(240, 20, 20)
          .old
            text-decoration: line-through
            font-size: 10px
            color: rgb(147, 153, 159)
        .cartcontrol-wrapper
          position: absolute
          right: 0
          bottom: 12px
</style>
