A simple web service for serving JSON files from disk. This is useful
for developing of mocking an API that returns documents in JSON
format.

It is built using the [fastify framework](https://www.fastify.io/).

There are two default endpoints:

| endpoint   | description                        |
| ---------- | ---------------------------------- |
| /files     | returns a list of all files        |
| /file/<id> | returns a single file with id <id> |

Currently, `<id>` is a filename. For example, `/files/01-some-document`
will serve the file at path `public/01-some-document.json`.

If you would like to use a route other than `files`, you can
configure an alias in `config.json`. This is the default file:

```json
{
  "collection": "files",
  "item": "file"
}
```

If you want to mock an API that returns recipes, you can update
`config.json` like this:

```json
{
  "collection": "recipes",
  "item": "recipe"
}
```

The endpoints would become:

| endpoint     | description                               |
| ------------ | ----------------------------------------- |
| /recipes     | returns a collection of all files (items) |
| /recipe/<id> | returns a single file (item) with id <id> |

Port is also configurable:

```json
{
  "collection": "stories",
  "item": "story",
  "port": 2000
}
```

The default port is 3000.
