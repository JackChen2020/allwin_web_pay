
import { CoreRequest } from './fetch'

//获取二维码
export function qrcode_order_get(options) {
  options['url']='/api/paycall/qrcode_order_get'
  options['method']='post'
  CoreRequest(options)
}