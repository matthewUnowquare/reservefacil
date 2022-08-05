const path = require("path");
const { loadFilesSync } = require("@graphql-tools/load-files");

const typeDefs = loadFilesSync(path.join(process.cwd(), "**/*.typeDef.js"));

module.exports = typeDefs;