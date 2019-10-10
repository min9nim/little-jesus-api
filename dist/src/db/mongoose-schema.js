"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const teacherSchema = new mongoose_1.default.Schema({
    name: String,
    students: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Students' }],
});
const studentSchema = new mongoose_1.default.Schema({
    name: String,
    birth: String,
});
const pointSchema = new mongoose_1.default.Schema({
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Students' },
    date: String,
    attendance: Boolean,
    recitation: Boolean,
    meditation: Number,
});
function registerSchema() {
    mongoose_1.default.model('Teachers', teacherSchema),
        mongoose_1.default.model('Students', studentSchema);
    mongoose_1.default.model('Points', pointSchema);
}
exports.default = registerSchema;
//# sourceMappingURL=mongoose-schema.js.map