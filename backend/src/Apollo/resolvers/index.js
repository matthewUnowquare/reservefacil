const { loadFilesSync } = require("@graphql-tools/load-files");
const { mergeResolvers } = require("@graphql-tools/merge");
const path = require("path");

const resolvers = loadFilesSync(path.join(process.cwd(), "**/*.resolver.js"));

module.exports = mergeResolvers(resolvers);