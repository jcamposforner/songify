import { v4 } from "uuid";
import { redis } from "../../redis";
import { confirmationUserPrefix } from "../constants/redisPrefixes";

export const createConfirmationUrl = async (userId: number) => {
  const token = v4();
  redis.set(confirmationUserPrefix + token, userId, "ex", 60 * 60 * 24); // 1 day

  return `http://${process.env.DOMAIN_NAME}/user/confirm/${token}`;
};
