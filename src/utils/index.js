



//判断当前环境（微信/其他）
export const inWechat = function () {
    let ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == "micromessenger") {
        console.log("微信中")
        return true
    } else {
        // console.log("其他（浏览器等等）")
        return false
    }
}



// 获取url地址栏指定的字段
export const getUrlParam = function (name) {
    //封装方法
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象

    var r = window.location.search.substr(1).match(reg); //匹配目标参数

    if (r != null) return unescape(r[2]);

    return null; //返回参数值
}


export  function getHrefParser() {
  const href = window.location.href;
  const arr = href.split('#');
  const beforeHash = arr[0];
  const afterHash = arr[1];
  const proto = beforeHash.substring(0, beforeHash.indexOf('?'));
  const query = beforeHash.substring(beforeHash.indexOf('?'));
  return {
    beforeHash,
    afterHash:decodeURIComponent(afterHash),
    proto,
    query: query ? queryString.parse(query) : {}
  };
}