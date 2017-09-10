export function getStyle(el,style){
    return parseInt(window.getComputedStyle(el, false)[style])
}

export function getDeviceRatio(){
	var isAndroid = window.navigator.appVersion.match(/android/gi);
    var isIPhone = window.navigator.appVersion.match(/iphone/gi);
    var devicePixelRatio = window.devicePixelRatio;
    var dpr;
    if (isIPhone) {
        // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
        if (devicePixelRatio >= 3) {                
            dpr = 3;
        } else if (devicePixelRatio >= 2){
            dpr = 2;
        } else {
            dpr = 1;
        }
    } else {
        // 其他设备下，仍旧使用1倍的方案
        dpr = 1;
    }
    return dpr
}


		