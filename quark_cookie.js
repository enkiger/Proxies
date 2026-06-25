/**
 * 脚本名称：夸克网盘抽奖凭证自动获取 (圈X专用重写版)
 * 适用端：夸克 APP 真实环境
 */

const $ = new Env('夸克网盘Cookie获取');
const currentUrl = $request.url;

// 精准匹配是否包含核心三个参数
if (currentUrl.indexOf("kps=") > -1 && currentUrl.indexOf("sign=") > -1 && currentUrl.indexOf("vcode=") > -1) {
    
    // 自动格式化为青龙环境变量所需的标准格式
    const qlCookie = `user=账号1; url=${currentUrl};`;
    
    // 1. 持久化存储到圈X本地（防止日志刷新找不到了）
    $.setdata(qlCookie, "quark_ql_cookie");
    
    // 2. 打印到圈X日志中（可在网络活动日志里一键复制）
    console.log("\n====== 🍏 成功获取夸克网盘青龙环境变量 🍏 ======");
    console.log(qlCookie);
    console.log("================================================\n");
    
    // 3. 手机弹窗通知
    $.notify("夸克网盘", "🎉 成功获取抽奖 Cookie", "请前往圈X日志或长按弹窗复制最新凭证。");
}

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
