"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./functional"));
function setAwait(timeout) {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}
exports.setAwait = setAwait;
function esModule(_module) {
    return _module.default || _module;
}
exports.esModule = esModule;
function removeExt(file) {
    return file.replace(/\.(\w*)$/, '');
}
exports.removeExt = removeExt;
function getFileName(path, ext = false) {
    const getFileNameRegex = /[^\\/]+\.[^\\/]+$/;
    const [file = null] = path.match(getFileNameRegex) || [];
    const name = file || path;
    return ext ? name : removeExt(name);
}
exports.getFileName = getFileName;
function nl2br(str) {
    if (!str) {
        return '';
    }
    return str.replace(/\r\n|\n/g, '<br />');
}
exports.nl2br = nl2br;
function createRandomString(length = 5) {
    let text = '';
    // noinspection SpellCheckingInspection
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    Array.from(Array(length)).forEach(() => {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    });
    return text;
}
exports.createRandomString = createRandomString;
exports.getQueryParams = (url) => {
    const params = {};
    const idx = url.indexOf('?') + 1;
    const fromIdx = url.slice(idx);
    // @ts-ignore
    fromIdx.replace(/([^(?|#)=&]+)(=([^&]*))?/g, ($0, $1, $2, $3) => {
        params[$1] = $3;
    });
    // console.log(params)
    return params;
};
exports.setQueryParams = paramObj => {
    const params = Object.entries(paramObj)
        .map(([key, value]) => {
        let valueStr = value;
        if (Array.isArray(value)) {
            valueStr = value.join(',');
        }
        return key + '=' + valueStr;
    })
        .join('&');
    window.history.pushState({}, '', '?' + params);
};
exports.assignQueryParams = (url) => {
    return paramObj => {
        exports.setQueryParams(Object.assign([], exports.getQueryParams(url), paramObj));
    };
};
function delay(fn, ms) {
    return new Promise(resolve => {
        const timeout = setTimeout(() => {
            fn();
            resolve(timeout);
        }, ms);
    });
}
exports.delay = delay;
function onlyNumber(event) {
    if (event.keyCode < 48 || event.keyCode > 57) {
        event.returnValue = false;
    }
}
exports.onlyNumber = onlyNumber;
function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
exports.numberWithCommas = numberWithCommas;
function address({ clientPostCode, clientAddress1, clientAddress2 }) {
    const postcode = clientPostCode ? '(' + clientPostCode + ') ' : '';
    const address1 = clientAddress1 || '';
    const address2 = clientAddress2 || '';
    return postcode + address1 + ' ' + address2;
}
exports.address = address;
function enableUrl(str) {
    if (!str) {
        return '';
    }
    const isUrl = /((?:http|https?|ftps?|sftp):\/\/(?:[a-z0-9-]+\.)+[a-z0-9]{2,4}\S*)/gi;
    if (isUrl.test(str)) {
        return str.replace(isUrl, '<a href="$1">$1</a>');
    }
    const wwwStart = /(www\.(?:[a-z0-9-]+\.)+[a-z0-9]{2,4}\S*)/gi;
    if (wwwStart.test(str)) {
        return str.replace(wwwStart, '<a href="http://$1">$1</a>');
    }
    return str;
}
exports.enableUrl = enableUrl;
function removeTypeName(obj) {
    if (!obj || typeof obj !== 'object') {
        return;
    }
    const keys = Object.keys(obj);
    keys.forEach((key) => {
        if (typeof obj[key] && typeof obj[key] === 'object') {
            removeTypeName(obj[key]);
        }
        if (key === '__typename') {
            delete obj.__typename;
        }
    });
}
exports.removeTypeName = removeTypeName;
//# sourceMappingURL=index.js.map