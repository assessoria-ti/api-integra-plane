import fastify from "fastify";
import { kv } from "@vercel/kv";
import { kvClient } from "../database/redisdb";

const app = fastify();

type IssueTypes = {
  name: string;
};

app.post("/issue", async function (request, reply) {
  const { name } = request.body as IssueTypes;
  const issue = { name: name };

  await kvClient.rpush("issues", issue);
  //await kvClient.lpush("issue", issue);

  reply.send({ message: `${name}, criada com sucesso!` });
});

app.get("/issue", async function (request, reply) {
  const issuesLength = await kvClient.llen("issues");

  const lastIssue = await kvClient.rpop("issues", issuesLength);

  reply.send(lastIssue);
});

app.listen({ port: 3333 }, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  console.log(`Server is now listening on ${address}`);
});

//"start": "node public/index.js"
