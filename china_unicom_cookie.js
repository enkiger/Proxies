/**
 * @file china_unicom_cookie.js
 * @description 适用 Quantumult X 的联通 App Cookie 抓取脚本
 * 触发通知后，Cookie 会被自动复制到系统剪贴板
 */

const cookieName = '中国联通';
const cookieKey = 'chavy_cookie_10010'; // 保持与主流联通脚本的 Key 一致，方便通用

if ($request && $request.headers) {
  // 获取请求头中的 Cookie
  const CookieVal = $request.headers['Cookie'] || $request.headers['cookie'];
  
  if (CookieVal) {
    // 检查是否包含联通的关键登录凭证（如 t3_token、ecs_token 等）
    if (CookieVal.indexOf('t3_token') !== -1 || CookieVal.indexOf('devicedid') !== -1) {
      const saveResult = $prefs.setValueForKey(CookieVal, cookieKey);
      
      if (saveResult) {
        $notify(
          `${cookieName} - Cookie 获取成功 🎉`,
          '点击或下拉通知，Cookie 已自动复制到剪贴板！',
          `${CookieVal.substring(0, 50)}... [已自动复制完整内容]`,
          { "update-pasteboard": CookieVal } // 核心：圈X特有属性，触发通知即写入剪贴板
        );
      } else {
        $notify(cookieName, '写入本地缓存失败 ⚠️', '请尝试重启 Quantumult X 后重试');
      }
    }
  }
}

$done({});
