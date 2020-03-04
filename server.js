const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const path = require("path");

const app = express();

app.use(cors());
//only have one endpoint /graphql, we point to our schema.
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.use("/", (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, "./client/index.html"));
});

app.use("/", (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}...`));
