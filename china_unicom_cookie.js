/**
 * @file china_unicom_cookie.js
 * @description 联通 Cookie & Token 双重合并抓取版
 */

const cookieName = '中国联通';
const cookieKey = 'chavy_cookie_10010';
const tokenKey = 'chavy_token_10010';

if ($request && $request.headers) {
  const CookieVal = $request.headers['Cookie'] || $request.headers['cookie'];
  
  if (CookieVal) {
    // 1. 如果是 Token 请求
    if (CookieVal.indexOf('ecs_token') !== -1 || CookieVal.indexOf('t3_token') !== -1) {
      $prefs.setValueForKey(CookieVal, tokenKey);
      
      // 尝试读取之前存的 Cookie 拼在一起
      const oldCookie = $prefs.valueForKey(cookieKey) || '';
      const combined = `【Token】:\n${CookieVal}\n\n【Cookie】:\n${oldCookie}`;
      
      $notify(
        `${cookieName} - Token 获取成功 🔑`,
        '已将 Token 和 Cookie 合并复制到剪贴板！',
        `${CookieVal.substring(0, 40)}...`,
        { "update-pasteboard": combined }
      );
    } 
    // 2. 如果是普通 Cookie 请求
    else if (CookieVal.indexOf('devicedid') !== -1 || CookieVal.indexOf('ecs_cook') !== -1) {
      $prefs.setValueForKey(CookieVal, cookieKey);
      
      // 尝试读取之前存的 Token 拼在一起
      const oldToken = $prefs.valueForKey(tokenKey) || '';
      const combined = `【Token】:\n${oldToken}\n\n【Cookie】:\n${CookieVal}`;
      
      $notify(
        `${cookieName} - Cookie 获取成功 🍪`,
        '已将 Token 和 Cookie 合并复制到剪贴板！',
        `${CookieVal.substring(0, 40)}...`,
        { "update-pasteboard": combined }
      );
    }
  }
}

$done({});
