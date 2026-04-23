const { MongoClient, ServerApiVersion } = require("mongodb");

export const collections = {
  PRODUCTS: "products",
  USERS: "users",
};

const uri = process.env.DB_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export const dbConnect = async (cname) => {
  const db = process.env.DB_NAME;
  return await client.db(db).collection(cname);
};
