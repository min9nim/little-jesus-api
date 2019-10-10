"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const db_info_1 = __importDefault(require("../../db-info"));
const mongoose_schema_1 = __importDefault(require("./mongoose-schema"));
function startDB() {
    mongoose_schema_1.default();
    mongoose_1.default.connect(db_info_1.default, { useNewUrlParser: true });
}
exports.default = startDB;
const db = mongoose_1.default.connection;
db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', function () {
    console.log('DB connected');
});
//# sourceMappingURL=start-db.js.map