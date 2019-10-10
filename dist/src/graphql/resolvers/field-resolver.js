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
    Teacher: {
        students: ({ _id }) => __awaiter(void 0, void 0, void 0, function* () {
            const teacher = yield mongoose_1.models.Teachers.findOne({ _id })
                .populate('students')
                .exec();
            return teacher.students;
        }),
    },
    Point: {
        owner({ owner }) {
            return __awaiter(this, void 0, void 0, function* () {
                const student = yield mongoose_1.models.Students.findOne({ _id: owner });
                return student;
            });
        },
    },
};
//# sourceMappingURL=field-resolver.js.map