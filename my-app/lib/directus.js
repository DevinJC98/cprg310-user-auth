import { authentication, createDirectus, rest } from "@directus/sdk";

//this code is only used to reference directus in other scripts
const client = createDirectus("http://localhost:8055")
  .with(rest())
  .with(authentication("cookie", { credentials: "include" }));

export default client;
