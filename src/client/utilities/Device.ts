var isAndroid = /Android/.test(navigator.userAgent)
var isiOS = /(iPad|iPhone|iPod)/.test(navigator.userAgent)
var isMobile = /Mobi/.test(navigator.userAgent)

const scalePixel = devicePixelRatio

const Device = {
  isAndroid,
  isiOS,
  isMobile,
  scalePixel : scalePixel,
  resolution : {
      get width (){ return  scalePixel * innerWidth},
      get height (){ return  scalePixel * innerHeight},
  }
};


export default Device;