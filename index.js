const tracer = require("dd-trace").init();
const fastify = require("fastify")({ logger: true });
const path = require("path");
const fs = require("node:fs");

const staticPath = path.join(__dirname, "public");

const config = JSON.parse(fs.readFileSync("config.json", "utf8"));
const COLLECTION_ROUTE = config.collection || "files";
const ITEM_ROUTE = config.item || "file";
const PORT = config.port || 3000;

fastify.register(require("@fastify/static"), {
  root: staticPath,
  prefix: "/public/",
});

fastify.register(require("@fastify/cors"), { cors: "*" });

fastify.get("/", (req, reply) => {
  reply.code(200).send({ message: "Welcome to the JSON file server API!" });
});

// Return all files concatenated into a single JSON array
fastify.get(`/${COLLECTION_ROUTE}`, (req, reply) => {
  const contents = [];
  const files = fs
    .readdirSync(staticPath)
    .filter((file) => file.endsWith(".json"));
  files.forEach((file) => {
    const content = JSON.parse(
      fs.readFileSync(`${staticPath}/${file}`, "utf8")
    );
    contents.push(content);
  });
  reply.code(200).send(contents);
});

// Return a single JSON file
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
