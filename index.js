const fastify = require("fastify")({ logger: true });
const path = require("path");

fastify.register(require("@fastify/static"), {
  root: path.join(__dirname, "public"),
  prefix: "/public/",
});

fastify.register(require("@fastify/cors"), { cors: "*" });

fastify.get("/", (req, reply) => {
  reply.code(200).sendFile("hello.json");
});

// Run the server!
fastify.listen({ port: 3000 }, (err, address) => {
  if (err) throw err;
  // Server is now listening on ${address}
});
