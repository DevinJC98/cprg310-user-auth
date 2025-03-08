import { authentication, createDirectus, rest } from "@directus/sdk";

const client = createDirectus("http://localhost:8055")
  .with(rest())
  .with(authentication("cookie", { credentials: "include" }));

export default client;
