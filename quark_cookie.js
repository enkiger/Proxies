/**
 * 脚本名称：夸克网盘抽奖凭证自动获取 (动态参数拼接版)
 */

const $ = new Env('夸克网盘Cookie获取');

const currentUrl = (typeof $request !== 'undefined' && $request) ? $request.url : '';

if (currentUrl && currentUrl.indexOf("kps=") > -1 && currentUrl.indexOf("sign=") > -1 && currentUrl.indexOf("vcode=") > -1) {
    
    // 1. 精准提取出 URL 中的核心加密三参数
    const kps = currentUrl.match(/kps=([^&]*)/)[0];
    const sign = currentUrl.match(/sign=([^&]*)/)[0];
    const vcode = currentUrl.match(/vcode=([^&]*)/)[0];
    
    // 2. 强行手动拼装成标准的抽奖奖励接口链接
    const targetRewardUrl = `https://drive-m.quark.cn/1/clouddrive/act/growth/reward?_=${Date.now()}&${kps}&${sign}&${vcode}`;
    
    // 3. 组合成青龙面板所需的标准格式
    const qlCookie = `user=账号1; url=${targetRewardUrl};`;
    
    // 持久化存储
    $.setdata(qlCookie, "quark_ql_cookie");
    
    console.log("\n====== 🍏 成功获取夸克网盘青龙环境变量 🍏 ======");
    console.log(qlCookie);
    console.log("================================================\n");
    
    $.notify("夸克网盘", "🎉 成功无感获取抽奖 Cookie", qlCookie);

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
