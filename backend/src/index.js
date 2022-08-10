const express = require("express");
const app = express();
const PORT = process.env.PORT || 3400;
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const { ApolloServer } = require("apollo-server");
const schema = require("./Apollo");

connectDB();

// app.use(
//   bodyParser.urlencoded({
//     extended: true,
//   })
// );

// /**
// * @V1 - Version 1 of the API
// *
// */
// router(app);

// app.listen(PORT, () => {
//   console.log(`Server listening on port ${PORT}`);
// });

const server = new ApolloServer({
  schema,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

app.use(errorHandler);
