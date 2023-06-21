const fastify = require("fastify")({ logger: true });
const path = require("path");

// read a configuration object from the file config.json
// const config =
// @todo use the configuration value for routes `/${COLLECTION_ROUTE}
// and `/${ITEM_ROUTE}`

const COLLECTION_ROUTE = "files";
const ITEM_ROUTE = "file";

fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/public/",
});

fastify.register(require("@fastify/cors"), { cors: "*" });

fastify.get("/", (req, reply) => {
  reply.code(200).sendFile("hello.json");
});

fastify.get(`/${COLLECTION_ROUTE}`, (req, reply) => {
  reply.code(200).sendFile("hello.json");
});

fastify.get(`/${ITEM_ROUTE}:id`, (req, reply) => {
  reply.code(200).sendFile("hello.json");
});

// Run the server!
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
  // Server is now listening on ${address}
});
