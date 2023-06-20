import { createClient } from "contentful";

type Config = {
  space: string;
  accessToken: string;
};

const config: Config = {
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
};

const client = createClient(config);

export default client;
