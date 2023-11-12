const { ApolloServer, gql } = require("apollo-server");
const fs = require("fs");
const path = require("path");

const links = [
  {
    id: "link-0",
    description: "チュートリアアル",
    url: "sample.com",
  },
];

/**
 * GraphQLのスキーマ定義
 * スキーマ => データ構造
 */
// const typeDefs = gql``; 移動したからいらない

/**
 * リゾルバ関数
 * スキーマ定義で決めた、雛型にその通りの実態を入れる（解決）役割
 * typeDefsで決めたQueryとinfoで名前が一致している必要がある
 */
const resolvers = {
  Query: {
    info: () => "News",
    feed: () => links,
  },

  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${links.length + 1}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
  },
};

const server = new ApolloServer({
  // __dirname <- server.jsのpathが入ってる
  // "schema.graphql" <- 上の中のどれか
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
});

server.listen().then(({ url }) => console.log(`${url}でサーバーを起動中`));
