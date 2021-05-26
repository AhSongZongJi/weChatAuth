<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
import { inWechat, getUrlParam, getHrefParser } from "./utils/index";
export default {
  created() {
    // 判断当前是不是在微信环境
    if (!inWechat()) return;
    // 公众号的id
    const appid = "wx06ce01cd60358ab8"; //自己的测试号
    // 分解url
    const href = window.location.href;
    const arr = href.split("#");
    const beforeHash = arr[0];
    const afterHash = arr[1];
    const proto = beforeHash.substring(0, beforeHash.indexOf("?"));
    // 如果地址栏里面有code表示不需要重新授权
    const redirect_uri = encodeURIComponent(beforeHash + "#/" + Math.random()); //跳转到一个不存在的路由 防止出现跳转到首页;
    if (getUrlParam("code")) {
      /***
      // 发请求openId
       todo......
        */
      localStorage.setItem("openId", "111");
      window.location.replace = `${proto}#${getUrlParam("state")}`;
    }
    if (localStorage.getItem("openId")) return;
    //  微信地址重定向 需要授权
    const url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=${encodeURIComponent(
      afterHash
    )}#wechat_redirect`;
    window.location.href = url;
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
