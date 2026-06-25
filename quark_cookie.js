/**
 * 脚本名称：夸克网盘抽奖凭证自动获取 (圈X专用防白屏版)
 */

const $ = new Env('夸克网盘Cookie获取');

// 兼容不同的拦截模式获取 URL
const currentUrl = (typeof $request !== 'undefined' && $request) ? $request.url : '';

if (currentUrl && currentUrl.indexOf("kps=") > -1 && currentUrl.indexOf("sign=") > -1 && currentUrl.indexOf("vcode=") > -1) {
    
    // 自动格式化为青龙环境变量所需的标准格式
    const qlCookie = `user=账号1; url=${currentUrl};`;
    
    // 1. 持久化存储到圈X本地
    $.setdata(qlCookie, "quark_ql_cookie");
    
    // 2. 打印到圈X日志中
    console.log("\n====== 🍏 成功获取夸克网盘青龙环境变量 🍏 ======");
    console.log(qlCookie);
    console.log("================================================\n");
    
    // 3. 手机弹窗通知
    $.notify("夸克网盘", "🎉 成功获取抽奖 Cookie", "请前往圈X日志或长按弹窗复制最新凭证。");
}

// 必须调用 $done({}) 确保将控制权完全交还给网页，防止白屏
$.done({});

// ================== 圈X标准环境垫片 ==================
function Env(name) {
    return {
        name,
        setdata: (v, k) => $prefs.setValueForKey(v, k),
        getdata: (k) => $prefs.valueForKey(k),
        notify: (t, s, c) => $notify(t, s, c),
        done: (o = {}) => $done(o)
    }
}
