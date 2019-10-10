"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./pure"));
const pure_1 = require("./pure");
function markError(args) {
    // 예외에 부가정보를 세팅한다
    return (e) => {
        Object.assign(e, args);
        throw e;
    };
}
exports.markError = markError;
// 디버깅용 전역함수
// global.log = (...args: any[]): void => {
//   const serialized = args.map((arg) => {
//     if(typeof arg === 'object'){
//       return JSON.stringify(arg, null, 2)
//     }else if(typeof arg === 'function'){
//       return arg.toString()
//     }
//     return arg
//   })
//   // eslint-disable-next-line
//   console.log(...serialized)
// }
// global.peek = peek
function installScript(apiUrl) {
    return new Promise((resolve) => {
        const script = window.document.createElement('script');
        const load = () => {
            if (!script.readyState || /loaded|complete/.test(script.readyState)) {
                setTimeout(() => {
                    resolve();
                }, 500);
            }
        };
        script.src = apiUrl;
        script.onload = load;
        script.onreadystatechange = load;
        window.document.getElementsByTagName('head')[0].appendChild(script);
    });
}
exports.installScript = installScript;
function forceFileDownload(blob, name) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', name);
    link.click();
}
exports.forceFileDownload = forceFileDownload;
function download({ uri, name }) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield window.fetch(uri);
        const blob = yield response.blob();
        forceFileDownload(blob, name);
    });
}
exports.download = download;
function getHostname(url) {
    let start = url.indexOf('://') + 3;
    let end = url.indexOf('/', start);
    return url.slice(start, end);
}
exports.getHostname = getHostname;
function getProtocol(url) {
    let end = url.indexOf('://') + 3;
    return url.slice(0, end);
}
exports.getProtocol = getProtocol;
exports.appendQueryParams = (paramObj) => {
    return pure_1.assignQueryParams(location.href)(paramObj);
};
function copyToClipboard(val) {
    let t = document.createElement('textarea');
    document.body.appendChild(t);
    t.value = val;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);
}
exports.copyToClipboard = copyToClipboard;
//# sourceMappingURL=index.js.map