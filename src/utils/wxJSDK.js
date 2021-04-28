// 获取配置参数的接口
function getSdkSetting() {
  return {};
}

import { Base64 } from "js-base64";

/**
 *
 * @param {Array} jsApiList  要调用的微信API
 * @param {String} _url  当前页面的地址
 * @returns
 */

export const wxJSDK = (jsApiList = [], _url = location.href) => {
  // 调用接口获取初始化jssdk参数、签名等
  const href = `${_url.split("#")[0]}`;
  return new Promise((resolve, reject) => {
    getSdkSetting({ url: Base64.encode(href) }).then(res => {
      wechrt.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: res.appId, // 必填，公众号的唯一标识
        timestamp: res.timestamp, // 必填，生成签名的时间戳
        nonceStr: res.nonceStr, // 必填，生成签名的随机串
        signature: res.signature, // 必填，签名
        jsApiList: [
          // 必填，需要使用的JS接口列表
          ...jsApiList,
          "updateAppMessageShareData",
          "updateTimelineShareData",
          "onMenuShareAppMessage", //旧的接口，即将废弃
          "onMenuShareTimeline", //旧的接口，即将废弃
          "onMenuShareWeibo",
          "openLocation"
        ]
      });

      wechat.ready(() => {
        resolve(true);
      });

      wechat.error(function(err) {
        reject(err);
      });
    });
  });
};

// 兼容h5 ios分享
export function h5Share(shareData) {
  const shareFunc =
    wechat.updateAppMessageShareData || wechat.onMenuShareAppMessage;
  const shareTimeLineFunc =
    wechat.updateTimelineShareData || wechat.onMenuShareTimeline;
  shareFunc(shareData);
  shareTimeLineFunc(shareData);
}

// 兼容 ios分享的使用方式
// wxJSDK(["onMenuShareAppMessage"]).then(() => {
//   h5Share({
//     title: "",
//     desc: "",
//     link: "",
//     imgUrl: ""
//   });
// });
