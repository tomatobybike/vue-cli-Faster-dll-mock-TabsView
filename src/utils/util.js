function isMobile () {
  const userAgent = navigator.userAgent.toLowerCase()
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
}

function elPagerLayout () {
  return !isMobile() ? 'total, sizes, prev, pager, next, jumper' : 'total,prev, next, jumper'
}

const core = {
  isMobile: isMobile(),
  elPager: {
    layout: elPagerLayout(),
    pageSizes: [20, 50, 100]
  },
  clone (origin) {
    let originProto = Object.getPrototypeOf(origin)
    return Object.assign(Object.create(originProto), origin)
  }
}

export default core
