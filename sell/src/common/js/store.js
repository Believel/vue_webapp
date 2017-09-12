/**
 * 存储值
 * @param id
 * @param key
 * @param value
 */
export function saveToLocal(id, key, value) {
  let seller = window.localStorage.__seller__;
  if (!seller) {
    seller = {};
    seller[id] = {};
  } else {
    // 解析成对象
    seller = JSON.parse(seller);
    if (!seller[id]) {
      seller[id] = {};
    }
  }
  seller[id][key] = value;
  // 解析为字符串
  window.localStorage.__seller__ = JSON.stringify(seller);
};

/**
 * 读取存取的值
 * @param id
 * @param key
 * @param def
 */
export function loadFromLocal(id, key, def) {
  let seller = window.localStorage.__seller__;
  if (!seller) {
    return def;
  }
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return def;
  }
  let ret = seller[key];
  console.log(ret);
  return ret || def;
};
