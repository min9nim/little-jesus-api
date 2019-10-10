"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const R = __importStar(require("ramda"));
exports.any = R.any, exports.assoc = R.assoc, exports.always = R.always, exports.and = R.and, exports.or = R.or, exports.propOr = R.propOr, exports.assocPath = R.assocPath, exports.each = R.forEach, exports.map = R.map, exports.reduce = R.reduce, exports.pipe = R.pipe, exports.split = R.split, exports.equals = R.equals, exports.join = R.join, exports.concat = R.concat, exports.complement = R.complement, exports.uniq = R.uniq, exports.find = R.find, exports.difference = R.difference, exports.differenceWith = R.differenceWith, exports.findIndex = R.findIndex, exports.propEq = R.propEq, exports.propSatisfies = R.propSatisfies, exports.pathEq = R.pathEq, exports.pathSatisfies = R.pathSatisfies, exports.clone = R.clone, exports.eqProps = R.eqProps, exports.filter = R.filter, exports.identity = R.identity, exports.isNil = R.isNil, exports.flip = R.flip, exports.ifElse = R.ifElse, exports.empty = R.empty, exports.pick = R.pick, exports.mergeLeft = R.mergeLeft, exports.mergeRight = R.mergeRight, exports.mergeAll = R.mergeAll, exports.not = R.not, exports.omit = R.omit, exports.curry = R.curry, exports.set = R.set, exports.over = R.over, exports.includes = R.includes, exports.head = R.head, exports.last = R.last, exports.update = R.update, exports.adjust = R.adjust, exports.insert = R.insert, exports.remove = R.remove, exports.without = R.without, exports.trim = R.trim, exports.append = R.append, exports.prepend = R.prepend, exports.T = R.T, exports.F = R.F, exports.nth = R.nth, exports.contains = R.contains, exports.evolve = R.evolve, exports.prop = R.prop, exports.path = R.path, exports.props = R.props, exports.lensProp = R.lensProp, exports.lensPath = R.lensPath, exports.dropLast = R.dropLast, exports.view = R.view, exports.__ = R.__, exports.addIndex = R.addIndex;
exports.overWrite = exports.mergeLeft;
exports._ = exports.__;
exports.overWithObject = exports.curry((lens, overWithObject, object) => exports.set(lens, overWithObject(object), object));
// export function exclude(predi){
//   return filter(complement(predi))
// }
exports.OR = (pred1, pred2) => {
    return (value) => exports.or(pred1(value), pred2(value));
};
function AND(pred1, pred2) {
    return (value) => exports.and(pred1(value), pred2(value));
}
exports.AND = AND;
exports.exclude = exports.pipe(exports.complement, exports.filter);
exports.isNotNil = exports.complement(exports.isNil);
function merge(...args) {
    return Object.assign({}, ...args);
}
exports.merge = merge;
function wrapWith(wrapper) {
    return (str) => {
        if (!str) {
            return '';
        }
        return wrapper + str + wrapper;
    };
}
exports.wrapWith = wrapWith;
function tag(tagName, className) {
    return (str) => {
        if (!str) {
            return str;
        }
        let classStr = '';
        if (className) {
            classStr = ` class="${className}"`;
        }
        return `<${tagName}${classStr}>${str}</${tagName}>`;
    };
}
exports.tag = tag;
exports.HIGHLIGHT_DELIMETER = ' ';
exports.highlight = (word) => {
    return (str) => {
        if (!word) {
            return str;
        }
        const regStr = word
            .split(exports.HIGHLIGHT_DELIMETER)
            .filter((word) => word !== '')
            .join('|');
        const reg = new RegExp(`(${regStr})`, 'gi');
        return str.replace(reg, '<mark>$1</mark>');
    };
};
function intervalCall(interval = 1000) {
    // interval 시간 안에 다시 호출된 함수 콜은 무시한다
    let elapsed = true;
    return (fn) => {
        // console.log('call')
        if (!elapsed) {
            // console.log('무시됨')
            return; // 마지막 호출 후 제한된 경과시간이 지나지 않은 경우 리턴
        }
        elapsed = false;
        fn();
        setTimeout(() => {
            elapsed = true;
        }, interval);
    };
}
exports.intervalCall = intervalCall;
exports.slice = (list, begin, end) => {
    if (typeof list === 'number') {
        let begin = list;
        let end = begin;
        return (list) => Array.prototype.slice.call(list, begin, end);
    }
    return list.slice(begin, end);
};
function removeTag(html) {
    if (html === undefined) {
        return '';
    }
    return html.replace(/(<([^>]+)>)/gi, '');
}
exports.removeTag = removeTag;
function peek(...args) {
    return (value) => {
        // console.log('peek called')
        console.log(...args, value); // eslint-disable-line
        return value;
    };
}
exports.peek = peek;
function go(...args) {
    // @ts-ignore
    return exports.pipe(...args.slice(1))(args[0]);
}
exports.go = go;
function constant(value) {
    return () => value;
}
exports.constant = constant;
exports.cnst = constant;
exports.noop = () => { }; // eslint-disable-line
// export const indexMap = addIndex<any>(map)
exports.indexMap = (...args) => {
    if (args.length === 1) {
        return (list) => {
            Array.prototype.map.call(list, args[0]);
        };
    }
    return Array.prototype.map.call(args[1], args[0]);
};
//# sourceMappingURL=functional.js.map