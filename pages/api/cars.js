//API route for using the async func in redis.js also for using the right ops on backend
import { createCar } from "../../lib/redis";

//api endpoint
export default async function handler(req, res) {
  const id = await createCar(req.body.id);
  res.status(200).json({ id });
}
