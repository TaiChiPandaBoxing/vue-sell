/**
 * 解析url参数
 * @example ?id=12345&a=b
 * @return Object {id: 12345, a: b}
 */
export function urlParse () {
  let url = window.location.search
  let obj = {}
  let reg = /[?&][^?&]+=[^?&]+/g
  let array = url.match(reg)
  if (array) {
    array.forEach((item) => {
      let aTemp = item.substring(1).split('=')
      let key = decodeURIComponent(aTemp[0])
      let val = decodeURIComponent(aTemp[1])
      obj[key] = val
    })
  }
  return obj
}
