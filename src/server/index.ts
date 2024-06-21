import fastify from "fastify";
import { kvClient } from "../database/redisdb";
import { ValidaToken } from "../lib/validaToken";

const app = fastify();

type IssueTypes = {
  name: string;
  description_html: string;
};

/**Rota para criar issues no banco Redis */
app.post("/issue", async function (request, reply) {
  const { authorization } = request.headers;
  const token = authorization?.slice(7) || "";
  const istokenValid = await ValidaToken(token);

  if (!istokenValid) {
    console.log("Não Autorizado");
    return;
  }

  const { name, description_html } = request.body as IssueTypes;
  const issue = { name, description_html };

  await kvClient.rpush("issues", issue);

  reply.send({ message: `${name}, criada com sucesso!` });
});

/**Servidor */
app.listen({ port: 3333 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening on ${address}`);
});
