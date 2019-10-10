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
const utils_1 = require("~/utils");
exports.default = {
    addStudentToTeacher(_, { teacherName, studentName }) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield mongoose_1.models.Students.findOne({ name: studentName });
            if (!student) {
                throw Error('student not found');
            }
            const teacher = yield mongoose_1.models.Teachers.findOneAndUpdate({ name: teacherName }, { $push: { students: student._id } }, { new: true });
            if (!teacher) {
                throw Error('teacher not found');
            }
            return teacher;
        });
    },
    createTeacher(_, { name }) {
        return __awaiter(this, void 0, void 0, function* () {
            const teacher = yield mongoose_1.models.Teachers.create({ name, students: [] });
            return teacher;
        });
    },
    createStudent(_, { name, birth }) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield mongoose_1.models.Students.create({
                name,
                birth,
            });
            return student;
        });
    },
    createPoint(_, { owner, date, attendance, recitation, meditation }) {
        return __awaiter(this, void 0, void 0, function* () {
            const point = yield mongoose_1.models.Points.create({ owner, date, attendance, recitation, meditation });
            return point;
        });
    },
    removeStudent(_, { _id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const student = yield mongoose_1.models.Students.findOneAndRemove({ _id });
            return student;
        });
    },
    removePoint(_, { _id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const point = yield mongoose_1.models.Points.findOneAndRemove({ _id });
            return point;
        });
    },
    updateStudent(_, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const tobe = utils_1.exclude(utils_1.isNil)(utils_1.omit(['_id'], args));
            const student = yield mongoose_1.models.Students.findOneAndUpdate({ _id: args._id }, tobe, { new: true });
            return student;
        });
    },
    updateTeacher(_, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const tobe = utils_1.exclude(utils_1.isNil)(utils_1.omit(['_id'], args));
            const teacher = yield mongoose_1.models.Teachers.findOneAndUpdate({ _id: args._id }, tobe, { new: true });
            return teacher;
        });
    },
    updatePoint(_, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const tobe = utils_1.exclude(utils_1.isNil)(utils_1.omit(['_id'], args));
            const point = yield mongoose_1.models.Points.findOneAndUpdate({ _id: args._id }, tobe, { new: true });
            return point;
        });
    },
};
//# sourceMappingURL=mutation.js.map