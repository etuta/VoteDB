const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path"); // eslint-disable-line global-require
const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[process.env.NODE_ENV || "development"]);
const { Model, ValidationError } = require("objection");
const Voters = require("./models/Voters.js");

Model.knex(knex);

const { wrapError, DBError } = require("db-errors");

// Resolve client build directory as absolute path to avoid errors in express
const buildPath = path.resolve(__dirname, "../client/build");

const app = express();

const corsOptions = {
  methods: ["GET", "PUT", "POST", "DELETE"],
  origin: "*",
  allowedHeaders: ["Content-Type", "Accept", "X-Requested-With", "Origin"]
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.get("/api/voters", (request, response, next) => {
  Voters.query().then(voters => {
    response.send(voters);
  }, next); // <- Notice the "next" function as the rejection handler
});

app.post("/api/voters", (request, response, next) => {
  Voters.query()
    .insertAndFetch(request.body)
    .then(voters => {
      response.send(voters);
    }, next); // <- Notice the "next" function as the rejection handler
});
app.delete("/api/voters/:id", (request, response, next) => {
  Voters.query()
    .deleteById(request.params.id)
    .then(() => {
      response.sendStatus(200);
    }, next); // <- Notice the "next" function as the rejection handler
  // response.sendStatus(200);
});

app.put("/api/voters/:id", (request, response, next) => {
  // Now update the database entry
  // articles[request.params.id] = request.body;
  // articles[request.params.id] = request.body;
  const { id, ...updatedVoter } = request.body;
  // request.params.id is a string, and so needs to be converted to an integer before comparison
  if (id !== parseInt(request.params.id, 10)) {
    throw new ValidationError({
      statusCode: 400,
      message: "URL id and request id do not match"
    });
  }
  // Now update the database entry

  Voters.query()
    .updateAndFetchById(id, updatedVoter)
    .then(voter => {
      response.send(voter);
    }, next);
});

app.use((error, request, response, next) => {
  if (response.headersSent) {
    next(error);
  }
  const wrappedError = wrapError(error);
  if (wrappedError instanceof DBError) {
    response.status(400).send(wrappedError.data || wrappedError.message || {});
  } else {
    response
      .status(wrappedError.statusCode || wrappedError.status || 500)
      .send(wrappedError.data || wrappedError.message || {});
  }
});

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  // Serve any static files as first priority
  app.use(express.static(buildPath));
}

// TODO: Add any middleware here

// TODO: Add your routes here

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  // All remaining requests return the React app, so it can handle routing.
  app.get("*", (request, response) => {
    response.sendFile(path.join(buildPath, "index.html"));
  });
}

module.exports = {
  app,
  knex
};
