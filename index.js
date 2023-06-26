const fastify = require("fastify")({ logger: true });
const path = require("path");
const fs = require("node:fs");

const staticPath = path.join(__dirname, "public");

// read a configuration object from the file config.json
// and parse
const config = JSON.parse(fs.readFileSync("config.json", "utf8"));

const COLLECTION_ROUTE = config.collection || "files";
const ITEM_ROUTE = config.item || "file";
const PORT = config.port || 3000;

fastify.log.warn(`Collection route: ${COLLECTION_ROUTE}`);
fastify.log.warn(`Item route: ${ITEM_ROUTE}`);

fastify.register(require("@fastify/static"), {
  root: staticPath,
  prefix: "/public/",
});

fastify.register(require("@fastify/cors"), { cors: "*" });

fastify.get("/", (req, reply) => {
  reply.code(200).sendFile("hello.json");
});

fastify.get(`/${COLLECTION_ROUTE}`, (req, reply) => {
  const files = fs
    .readdirSync(staticPath)
    .filter((file) => file.endsWith(".json"));
  fastify.log.info(files);
  reply.code(200).send(files);
});

fastify.get(`/${ITEM_ROUTE}/:id`, (req, reply) => {
  const file = `${req.params.id}.json`;
  if (fs.existsSync(`${staticPath}/${file}`)) {
    reply.code(200).sendFile(file);
  } else {
    reply.code(404).send({ error: "File not found" });
  }
});

// Run the server!
fastify.listen({ port: PORT }, (err, address) => {
  if (err) throw err;
  // Server is now listening on ${address}
});
