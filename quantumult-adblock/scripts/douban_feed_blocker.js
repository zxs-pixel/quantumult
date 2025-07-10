let body = $response.body;
let obj = JSON.parse(body);

function filterAdItems(data) {
  return data.filter(item => {
    if (!item) return false;
    const adKeys = ['ad', 'ad_id', 'advertise', 'promotion', 'adgroup_id', 'ad_content', 'ad_info', 'type'];
    for (let key of adKeys) {
      if ((item[key] && typeof item[key] === 'object') || ['ad', 'promotion', 'ad_card'].includes(item.type)) {
        return false; // 广告项，剔除
      }
    }
    return true;
  });
}

if (Array.isArray(obj.items)) {
  obj.items = filterAdItems(obj.items);
}
if (Array.isArray(obj.recommendations)) {
  obj.recommendations = filterAdItems(obj.recommendations);
}
if (Array.isArray(obj.data)) {
  obj.data = filterAdItems(obj.data);
}

$done({ body: JSON.stringify(obj) });
