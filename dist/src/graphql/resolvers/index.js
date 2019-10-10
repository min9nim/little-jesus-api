"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const query_1 = __importDefault(require("./query"));
const mutation_1 = __importDefault(require("./mutation"));
const field_resolver_1 = __importDefault(require("./field-resolver"));
exports.default = Object.assign({ Query: query_1.default,
    Mutation: mutation_1.default }, field_resolver_1.default);
//# sourceMappingURL=index.js.map