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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.default = {
    students() {
        return __awaiter(this, void 0, void 0, function* () {
            const students = yield mongoose_1.models.Students.find({});
            return students;
        });
    },
    teachers() {
        return __awaiter(this, void 0, void 0, function* () {
            const teachers = yield mongoose_1.models.Teachers.find({});
            return teachers;
        });
    },
    points() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield mongoose_1.models.Points.find({});
            return result;
        });
    },
};
//# sourceMappingURL=query.js.map