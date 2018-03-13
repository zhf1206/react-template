(function(psdw) {
  let dpr = window.devicePixelRatio;
  let htmlDOM = document.documentElement;
  let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  let recalc = function() {
    let htmlWidth = htmlDOM.clientWidth || document.body.clientWidth;
    let scale = htmlWidth / psdw;
    let rem = 10 * scale;
    htmlDOM.style.fontSize = rem + 'px';
    htmlDOM.setAttribute('data-dpr', dpr);
  }
  if(!document.addEventListener) return;
  window.addEventListener(resizeEvt, recalc, false);
  document.addEventListener('DOMContentLoaded', recalc, false);
  // window.addEventListener("load", recalc, false);
})(375)