import CryptoJS from 'crypto-js/crypto-js'

export function timestampToTime (unixtimestamp1){

  var unixtimestamp = new Date(unixtimestamp1*1000);
  var year = 1900 + unixtimestamp.getYear();
  var month = "0" + (unixtimestamp.getMonth() + 1);
  var date = "0" + unixtimestamp.getDate();
  var hour = "0" + unixtimestamp.getHours();
  var minute = "0" + unixtimestamp.getMinutes();
  var second = "0" + unixtimestamp.getSeconds();
  return year + "-" + month.substring(month.length-2, month.length)  + "-" + date.substring(date.length-2, date.length)
      + " " + hour.substring(hour.length-2, hour.length) + ":"
      + minute.substring(minute.length-2, minute.length) + ":"
      + second.substring(second.length-2, second.length);
}

// export function imgjoin(img){
//
//   const upload_url = config.devServer.proxy[Object.keys(config.devServer.proxy)[1]].target
//
//   return upload_url+img
// }

function PrefixInteger(num, length) {
 return (Array(length).join('0') + num).slice(-length);
}

export function timeformart(t){
  var d = new Date(t);
  return PrefixInteger(d.getHours(),2) + ':' + PrefixInteger(d.getMinutes(),2) + ':' + PrefixInteger(d.getSeconds(),2);
}

export function dateformart(t){
  var d = new Date(t);
  return PrefixInteger(d.getFullYear(),4) + '-' + PrefixInteger(d.getMonth()+1,2) + '-' + PrefixInteger(d.getDate(),2);
}

/**
 * @param {Function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @return {*}
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function() {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function(...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}


//解密方法
export function Decrypt(word) {
  let key = CryptoJS.enc.Utf8.parse("LXJMTZCVFKQZNQ2J");
  let iv = key

  let base64 = CryptoJS.enc.Base64.parse(word);
  let src = CryptoJS.enc.Base64.stringify(base64);

  var decrypt = CryptoJS.AES.decrypt(src, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  var decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

export function Encrypt(word) {
  let key = CryptoJS.enc.Utf8.parse("LXJMTZCVFKQZNQ2J");
  let iv = key

  let srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  // console.log("-=-=-=-", encrypted)
  //console.log(CryptoJS.enc.Base64.stringify(encrypted))
  let data = CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  return data
}

