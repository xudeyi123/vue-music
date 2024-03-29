function hasClass(el, className) {
    const reg = new RegExp("(^|\\s)" + className + "(\\s|$)");
    return reg.test(el.className);
}

export function addClass(el, className) {
    if (hasClass(el, className)) {
        return;
    }

    let newClass = el.className.split(" ");
    newClass.push(className);
    el.className = newClass.join(" ");
}

export function getData(el, name, val) {
    const prefix = "data-";
    if (val) {
        return el.setAttribute(prefix + name, val);
    } else {
        return el.getAttribute(prefix + name);
    }
}

let elementStyle = document.createElement('div').style

let vendor = (() => {
    let transformNames = {
        webkit : 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transfrom'
    }

    for (const key in transformNames) {
        if (elementStyle[transformNames[key]] !== undefined) {
            return key
        }
    }
    return false
})()

export function prefixStyle(style) {
    if(vendor === false) {
        return false
    }

    if(vendor === 'standard') {
        return style
    }

    return vendor + style.charAt(0).toLocaleUpperCase() + style.substr(1)
}
