import fastify from "fastify";

const app = fastify();

app.post("/issue", function (request, reply) {
  reply.send({ issue: "Criada com sucesso!" });
});

app.get("/", function (request, reply) {
  reply.send({ message: "API executando" });
});

app.listen({ port: 3333 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening on ${address}`);
});

//"start": "node public/index.js"
