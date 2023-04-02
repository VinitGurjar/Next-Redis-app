import { Client, Entity, Schema, Repository } from "redis-om";

const Client = new Client();

//Opens a connection if it is'nt open
async function connect() {
  if (!Client.isOpen()) {
    await Client.open(process.env.REDIS_URL);
  }
}

//Entity is like a DB table and write schema in it
class Car extends Entity {}
let schema = new Schema(
  Car,
  {
    //Hash or properties
    make: { type: "string" },
    model: { type: "string" },
    image: { type: "string" },
    description: { type: "string" },
  },
  {
    //Redis json module : now our redis will act like a Document oriented DB
    dataStructure: "JSON",
  }
);

//Handling the basic process
export async function craeteCar(data) {
  //Connect to the DB client
  await connect();

  //Creating a repo by mixing schema and client
  const repository = new Repository(schema, client);

  //Creating new data
  const car = repository.createEntity(/*JS object*/ data);

  //commiting to the DB
}
