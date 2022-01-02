<template>
  <div class="profile">
    <nav-bar class="profile-navbar">
      <template #center>
        <div>xxx商城</div>
      </template></nav-bar
    >
    <user-info></user-info>
    <section class="account">
      <div class="account-item">
        <div class="number"><span class="balance">0.00</span>元</div>
        <div class="account-info">我的余额</div>
      </div>
      <div class="account-item">
        <div class="number"><span class="balance">0</span>个</div>
        <div class="account-info">我的优惠</div>
      </div>
      <div class="account-item">
        <div class="number"><span class="balance">0</span>分</div>
        <div class="account-info">我的积分</div>
      </div>
    </section>
    <list-view :list-data="orderList" class="order-list"></list-view>
    <list-view :list-data="serviceList" class="service-list"></list-view>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import UserInfo from "./childComps/UserInfo.vue";
import ListView from "./childComps/ListView";

export default {
  data() {
    return {
      orderList: ["我的消息", "积分商城", "会员卡"],
      serviceList: ["我的购物车" , "下载购物APP"],
    };
  },
  components: {
    NavBar,
    UserInfo,
    ListView,
  },
};
</script>

<style>
.profile {
  background-color: #f2f2f2;
}
.profile-navbar {
  font-weight: 700;
  color: #fff;
  background-color: var(--color-tint);
}
.account {
  display: flex;
}

.account-item {
  width: 100%;
  background-color: #fff;
  margin-right: 1px;
  text-align: center;
}

.account-item:last-of-type {
  margin-right: 0;
}

.account-item {
  color: #666;
  font-size: 13px;
  padding: 18px;
}

.account-item .balance {
  font-size: 24px;
  font-weight: 700;
  color: #ff5f3e;
}

.account-info {
  margin-top: 6px;
}

.order-list,
.service-list {
  margin-top: 12px;
}
.service-list {
  height: 91px;
}
</style>