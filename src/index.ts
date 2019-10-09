const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Teacher {
    name: String
    students: [Student]
  }

  type Student {
    name: String
    birth: String # YYYYMMDD
  }

  type Point {
    owner: Student
    date: String # YYYYMMDD
    attendance: Boolean
    recitation: Boolean
    meditation: Int
  }

  type Query {
    students: [Student]
  }
`;

const students = [
  {
    name: "이정우",
    birth: "20051011"
  },
  {
    name: "김하람",
    birth: "20050104"
  }
];

const resolvers = {
  Query: {
    students: () => students
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen({port: 4060}).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
