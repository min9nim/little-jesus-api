"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const start_db_1 = __importDefault(require("./db/start-db"));
const resolvers_1 = __importDefault(require("./graphql/resolvers"));
const type_defs_1 = __importDefault(require("./graphql/type-defs"));
start_db_1.default();
const server = new apollo_server_1.ApolloServer({ typeDefs: type_defs_1.default, resolvers: resolvers_1.default });
const port = process.env.PORT || 4040;
server.listen({ port }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
//# sourceMappingURL=index.js.map