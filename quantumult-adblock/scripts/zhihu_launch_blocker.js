let body = $response.body;
let obj = JSON.parse(body);

// 处理 launch 为 JSON 字符串的情况
if (obj && typeof obj.launch === "string") {
  let launchObj = JSON.parse(obj.launch);

  // 清空广告数组
  if (launchObj.ads) {
    launchObj.ads = [];
  }

  // 关键：模拟广告“已展示完成”的状态字段
  launchObj.show_time = 0;
  launchObj.count_down = 0;
  launchObj.display_time = 0;

  obj.launch = JSON.stringify(launchObj);
}

$done({ body: JSON.stringify(obj) });
