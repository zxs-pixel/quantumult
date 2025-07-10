let body = $response.body;
let obj = JSON.parse(body);

function isAd(item) {
  const adTypes = ['feed_ad', 'slot_event_card', 'pin_ad', 'market_card', 'banner_card'];
  const adIndicators = ['ad', 'ads', 'ad_info', 'ad_json', 'promotion'];
  return (
    adTypes.includes(item.card_type) ||
    adTypes.includes(item.type) ||
    (item.extra && adIndicators.some(k => item.extra.hasOwnProperty(k))) ||
    item.has_ad ||
    item.source === '广告'
  );
}

if (obj.data && Array.isArray(obj.data)) {
  obj.data = obj.data.filter(item => !isAd(item));
}

$done({ body: JSON.stringify(obj) });
