/*
* 阿里云盘 refresh_token 自动获取脚本
* 适用平台: Quantumult X
*/

const $ = new Env("阿里云盘获取Token");

if ($request && $response) {
  try {
    const body = JSON.parse($response.body);
    const refreshToken = body.refresh_token;
    
    if (refreshToken) {
      // 1. 保存到本地存储（防止丢失，备用）
      $.setdata(refreshToken, "ali_refresh_token");
      
      // 2. 发送系统通知
      const userName = body.nick_name || body.user_name || "阿里云盘用户";
      const notifyTitle = `🎉 阿里云盘 Token 获取成功`;
      const notifyContent = `【${userName}】的 refresh_token：\n\n${refreshToken}\n\n👉 长按通知或进入圈X日志即可复制。`;
      
      $.msg(notifyTitle, "", notifyContent);
      console.log(`[阿里云盘] 成功获取并保存 Token: ${refreshToken}`);
    } else {
      console.log("[阿里云盘] 响应体中未找到 refresh_token");
    }
  } catch (e) {
    console.log(`[阿里云盘] 解析响应体失败: ${e}`);
  }
}

$.done();

// ==================== 圈 X 简易环境兼容盒 ====================
function Env(name) {
  return {
    name,
    msg: (title, subtitle, body) => $notify(title, subtitle, body),
    setdata: (val, key) => $prefs.setValueForKey(val, key),
    getdata: (key) => $prefs.valueForKey(key),
    done: () => $done({})
  };
}
