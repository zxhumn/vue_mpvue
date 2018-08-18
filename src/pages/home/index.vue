<template>
  <view>
    <!-- 轮播图 -->
    <!-- 1.0 轮播图 -->
    <swiper class="slide" circular indicator-active-color="#ffffff" :indicator-dots="true" :autoplay="true" :interval="3000"
      :duration="1000">
      <block v-for="item in slidesList" :key="item.goods_id">
        <navigator :url="item.navigator_url">
          <swiper-item>
            <image :src="item.image_src" class="slide-image" />
          </swiper-item>
        </navigator>
      </block>
    </swiper>
    <!-- 2.0 菜单 -->
    <view class="menu">
      <block v-for="item in menus" :key="item.name">
        <view class="menu-item">
          <navigator open-type="switchTab" :url="item.navigator_url">
            <image :src="item.image_src" />
          </navigator>
        </view>
      </block>
    </view>
    <!--楼层数据  -->
    <view class="floor">
      <block v-for="(item,index) in floorsData" :key="index">
        <view class="floor-head">
          <image :src="item.floor_title.image_src" />
        </view>
        <view class="floor-body">
          <view class="floor-body-left">
            <image :src="item.product_list[0].image_src" />
          </view>
          <view class="floor-body-right">
            <block v-for="(subitem, subindex) in item.product_list" :key="subindex">
              <view class="floor-body-right-item" v-if="subindex>0" :style="{'width':subitem.image_width+'rpx'}">
                <image :src="subitem.image_src" />
              </view>
            </block>
          </view>
        </view>
      </block>
    </view>
    <!-- 4.0 底部提示 -->
    <view class="end-tips">
      <text class="iconfont icon-xiao"></text>
      <text>&nbsp;我是有底线的哦</text>
    </view>
    <!-- 5.0 回到顶部 -->
    <view @click="goToTop" class="tips" v-if="isShowToTop">
      <view>
        <image src="../../../static/img/arrow_top@2x.png" />
      </view>
      <text class="tips-title">顶部</text>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
        slidesList: [],
        menus: [],
        floorsData: [],
        isShowToTop:false,
      }
    },
    onPageScroll:function(e){
        if(e.scrollTop>80){
            if(this.isShowToTop) return;
            this.isShowToTop = true;
        }else{
            if(!this.isShowToTop) return;
            this.isShowToTop = false;
        }
    },
    onLoad() {
      this.getSlidesData();
      this.getCatitemsData();
      this.getFloorsData();
    },
    methods: {
      // 获取轮播数据
      async getSlidesData() {
        const result = await this.$axios.get('api/public/v1/home/swiperdata');
        // console.log(result)
        this.slidesList = result.data.message;
      },
      //   获取分类
      async getCatitemsData() {
        const result = await this.$axios.get('api/public/v1/home/catitems');
        // console.log(result)
        this.menus = result.data.message;
      },
      //   获取楼层数据
      async getFloorsData() {
        const result = await this.$axios.get('api/public/v1/home/floordata');
        // console.log(result)
        this.floorsData = result.data.message;
      },
      goToTop(){
          wx.pageScrollTo({
            scrollTop: 0, //滚动到页面的目标位置（单位px）,
            duration: 300 //滚动动画的时长，默认300ms，单位 ms,
          });
      }
    }
  }

</script>

<style lang="less" scoped>
  .slide {
    width: 750rpx;
    height: 400rpx;
    &-image {
      width: 100%;
      height: 100%;
    }
  }

  .menu {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: #ffffff;
    width: 750rpx;
    height: 160rpx;
    &-item {
      width: 25%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      image {
        width: 120rpx;
        height: 120rpx;
      }
    }
  }

  .floor {
    background-color: #ffffff;
    margin-top: 20rpx;
    &-head {
      width: 750rpx;
      height: 100rpx;
      margin: 10rpx 0px 0px 16rpx;
      image {
        width: 100%;
        height: 100%;
      }
    }
    &-body {
      width: 100%;
      padding: 20rpx 16rpx 0rpx 16rpx;
      display: flex;
      &-left {
        width: 232rpx;
        height: 386rpx;
        image {
          width: 100%;
          height: 100%;
        }
      }
      &-right {
        display: flex;
        flex-wrap: wrap;
        flex: 1;
        &-item {
          height: 188rpx;
          width: 200rpx;
          margin: 0 0 16rpx 16rpx;
          image {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }

  .end-tips {
    display: flex;
    height: 88rpx;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: #888888;
  }

  .tips {
    background-color: rgba(255, 255, 255, 0.8);
    position: fixed;
    height: 50px;
    width: 50px;
    right: 20px;
    bottom: 30px;
    border-radius: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    image {
      width: 20px;
      height: 10px;
    }
    &-title {
      font-size: 12px;
      margin-top: 3px;
      color: #888888;
      margin-bottom: 3px;
    }
  }

</style>
