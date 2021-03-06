import "reflect-metadata";
import "./utils/env";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import session from "express-session";
import connectRedis from "connect-redis";
import cors from "cors";
import { createSchema } from "./utils/createSchema";
import { redis } from "./redis";
import helmet from "helmet";
import HlsApi from "./routes/HlsApi";
import bodyParser = require("body-parser");

const main = async () => {
  await createConnection();

  const schema = await createSchema();

  const apolloServer = new ApolloServer({
    schema,
    context: ({ req, res }: any) => ({ req, res })
  });

  const app = Express();

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use("/api", HlsApi);

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: process.env.DOMAIN_NAME
    })
  );
  app.use(helmet());

  app.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: "qid",
      secret: process.env.REDIS_SECRET,
      resave: false,
      saveUnitialized: false
    } as any)
  );

  apolloServer.applyMiddleware({ app });

  app.listen(process.env.PORT, () => {
    console.log(
      `Server started on http://${process.env.DOMAIN_NAME}:${
        process.env.PORT
      }/graphql`
    );
  });
};

main();
