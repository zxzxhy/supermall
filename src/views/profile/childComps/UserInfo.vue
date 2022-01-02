<template>
  <div id="user-info">
      <slot name="user-icon">
<svg t="1641117890502" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11629" width="64" height="64"><path d="M510.919389 63.950498c247.345388 0 447.860191 200.514803 447.86019 447.861214 0 247.348458-200.514803 447.861214-447.86019 447.861214-247.348458 0-447.863261-200.51378-447.863261-447.861214 0-247.345388 200.514803-447.861214 447.863261-447.861214z" fill="#EEEEEE" p-id="11630"></path><path d="M510.919389 515.965312c79.150688 0 143.314033-64.425312 143.314033-143.899365 0-79.473029-64.163345-143.898341-143.314033-143.898341-79.151711 0-143.317103 64.425312-143.317103 143.898341-0.001023 79.475076 64.164369 143.899364 143.317103 143.899365z m221.060744 175.867449l1.068332-0.402159c-35.032888-88.682785-121.280204-151.399175-222.129076-151.399175-99.597369 0-184.944176 61.173245-220.793662 148.112316l0.494257 0.200568a35.121915 35.121915 0 0 0-2.565429 13.20065c0 19.475564 15.798824 35.266202 35.291784 35.266201 14.758122 0 27.392884-9.05626 32.661887-21.906939l0.575099 0.233314c25.224498-60.507072 84.822874-103.028515 154.336064-103.028515 70.109778 0 130.129756 43.259246 154.97256 104.59622l0.252757-0.095168c5.65479 11.939937 17.815761 20.201088 31.912827 20.201088 19.48989 0 35.289738-15.789615 35.289738-35.266201a35.281551 35.281551 0 0 0-1.367138-9.7122z" fill="#CCCCCC" p-id="11631"></path></svg>
      </slot>
      <div class="login-info left">
        <slot name="user-nickname">
          <div>登录/注册</div>
        </slot>
        <div class="phone">
          <slot name="user-phone">暂无绑定手机号</slot>
        </div>
      </div>
      <span class="enter">
        <svg t="1641117954394" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13799" width="20" height="20"><path d="M709.845333 250.346667a22.4 22.4 0 0 1 0.533334-30.848 20.48 20.48 0 0 1 29.717333 0.64l272.426667 292.693333-272.426667 292.650667a20.458667 20.458667 0 0 1-29.717333 0.64c-8.32-8.32-8.746667-21.973333-0.533334-30.848l242.346667-262.464-242.346667-262.464z" fill="#e6e6e6" p-id="13800"></path></svg>
      </span>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
};
</script>

<style scoped>
#user-info {
  display: flex;
  background-color: var(--color-tint);
  padding: 15px;
  margin-top: -5px;
}

#user-info .privateImage-svg {
  width: 60px;
  height: 60px;
  background-color: #fff;
  border-radius: 30px;
}

.left {
  flex: 1;
}

#user-info .arrow-svg {
  width: 11px;
  height: 22px;
  margin-top: 18px;
}

#user-info .login-info {
  color: #fff;
  margin: 10px 0 0 10px;
}

#user-info .login-info .phone {
  position: relative;

  font-size: 13px;
  margin-top: 5px;
  font-weight: 300;
}

#user-info .login-info .phone .icon-mobile {
  position: absolute;
  width: 12px;
  height: 18px;
  left: -15px;
  top: 0px;
}
.enter {
  margin-top: 20px
}
</style>
